import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { DEFAULT_PROGRESS, loadProgress, saveProgress, validateImportData, exportProgressFile, STORAGE_KEY, allowExplicitProgressReplacement, getProgressStorageError } from '../src/utils/storage.ts';
import { listJourneySteps, firstPendingStep, resolveJourney, selectJourneyStep, deferJourneyStep, isStepCompleted, isStepDeferred } from '../src/utils/journey.ts';

const allSteps = listJourneySteps(PHASES);
const fresh = () => structuredClone(DEFAULT_PROGRESS);
function installStorage() {
  const map = new Map();
  globalThis.localStorage = {
    getItem: key => map.has(key) ? map.get(key) : null,
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: key => map.delete(key),
    clear: () => map.clear()
  };
  allowExplicitProgressReplacement();
  return map;
}

test('53 existing steps: first is only a suggestion; no mutation for a new player', () => {
  assert.equal(allSteps.length, 53);
  const p = fresh();
  const result = resolveJourney(PHASES, p);
  assert.equal(result.kind, 'suggested');
  assert.equal(result.target.event.id, allSteps[0].event.id);
  assert.equal(p.activeStepId, undefined);
  assert.deepEqual(p.steps, {});
  assert.deepEqual(p.deferredStepIds, undefined);
});

test('20/53 completed: first pending found without inferring achievements', () => {
  const p = fresh();
  for (const { event } of allSteps.slice(0, 20)) p.steps[event.id] = true;
  p.achievements[1] = true;
  assert.equal(firstPendingStep(PHASES, p).event.id, allSteps[20].event.id);
  assert.equal(resolveJourney(PHASES, p).kind, 'suggested');
});

test('nonlinear selection keeps earlier tasks pending and survives v3 serialization', () => {
  const p = selectJourneyStep(fresh(), allSteps[45].event.id);
  assert.equal(resolveJourney(PHASES, p).kind, 'active');
  assert.equal(isStepCompleted(p, allSteps[0].event.id), false);
  installStorage();
  assert.equal(saveProgress(p), true);
  const loaded = loadProgress();
  assert.equal(loaded.activeStepId, allSteps[45].event.id);
  assert.equal(resolveJourney(PHASES, loaded).target.event.id, allSteps[45].event.id);
  assert.equal(loaded.steps[allSteps[0].event.id], undefined);
});

test('deferred remains pending and selecting it recovers activity', () => {
  const id = allSteps[0].event.id;
  const postponed = deferJourneyStep(fresh(), id);
  assert.equal(isStepCompleted(postponed, id), false);
  assert.equal(isStepDeferred(postponed, id), true);
  assert.equal(resolveJourney(PHASES, postponed).target.event.id, allSteps[1].event.id);
  const back = selectJourneyStep(postponed, id);
  assert.equal(back.activeStepId, id);
  assert.equal(isStepDeferred(back, id), false);
  assert.equal(resolveJourney(PHASES, back).kind, 'active');
});

test('all deferred is not all completed; missing IDs recover without rewriting data', () => {
  const p = fresh();
  p.deferredStepIds = allSteps.map(({ event }) => event.id);
  p.activeStepId = 'old-invalid-step';
  const result = resolveJourney(PHASES, p);
  assert.equal(result.kind, 'deferred-only');
  assert.equal(result.invalidSelection, true);
  assert.equal(p.activeStepId, 'old-invalid-step');
});

test('completed selected step requires explicit transition; full journey is final', () => {
  const p = selectJourneyStep(fresh(), allSteps[39].event.id);
  p.steps[allSteps[39].event.id] = true;
  assert.equal(resolveJourney(PHASES, p).kind, 'completed-active');
  assert.equal(p.activeStepId, allSteps[39].event.id);
  for (const { event } of allSteps) p.steps[event.id] = true;
  assert.equal(resolveJourney(PHASES, p).kind, 'all-complete');
  assert.equal(firstPendingStep(PHASES, p), undefined);
  assert.equal(resolveJourney([], p).kind, 'empty');
  assert.equal(resolveJourney([{ ...PHASES[0], events: undefined }], p).kind, 'empty');
});

test('old v3 import/export retains existing and unknown fields without timestamps changing on read', async () => {
  const map = installStorage();
  const oldBackup = { app: 'dd2-100-roadmap-ptbr', progress: {
    version: '3.0.0', updatedAt: '2025-05-01T00:00:00.000Z',
    steps: { m01: true, m02: false }, achievements: { 1: true }, sphinx: { r1: true },
    firstTokenLocation: 'local salvo', seekerTokensCount: 27,
    barbecue: { meat1: { day: true, night: false } },
    maisters: { master1: { acquired: true, learned: false } },
    confirmedCheckpoints: { cp1: true },
    extraLegacyField: { preserve: 'yes' }
  }};
  const imported = validateImportData(JSON.stringify(oldBackup));
  assert.equal(imported.valid, true);
  assert.equal(imported.data.updatedAt, oldBackup.progress.updatedAt);
  assert.deepEqual(imported.data.extraLegacyField, { preserve: 'yes' });
  map.set(STORAGE_KEY, JSON.stringify(oldBackup.progress));
  const original = map.get(STORAGE_KEY);
  const loaded = loadProgress();
  assert.equal(map.get(STORAGE_KEY), original);
  saveProgress(loaded);
  assert.equal(map.get(STORAGE_KEY), original); // no-op must not update timestamp

  let exportedBlob;
  let clickCount = 0;
  const oldCreate = URL.createObjectURL, oldRevoke = URL.revokeObjectURL, oldDocument = globalThis.document;
  URL.createObjectURL = blob => { exportedBlob = blob; return 'blob:mock'; };
  URL.revokeObjectURL = () => {};
  globalThis.document = { createElement: () => ({ click: () => { clickCount++; } }) };
  try {
    exportProgressFile(imported.data);
    const exported = JSON.parse(await exportedBlob.text());
    assert.equal(clickCount, 1);
    assert.equal(exported.app, 'dd2-100-roadmap-ptbr');
    assert.deepEqual(exported.progress, imported.data);
  } finally {
    URL.createObjectURL = oldCreate;
    URL.revokeObjectURL = oldRevoke;
    globalThis.document = oldDocument;
  }
});

test('invalid/partial/null/array backups reject without overwriting local progress', () => {
  const map = installStorage();
  const existing = JSON.stringify({ ...fresh(), steps: { m01: true } });
  map.set(STORAGE_KEY, existing);
  for (const obj of [
    null, [], {}, { progress: null }, { steps: null }, { steps: [] },
    { achievements: [] }, { steps: { m01: 'true' } }, { steps: { m01: true }, sphinx: null },
    { steps: { m01: true }, barbecue: { bad: null } },
    { steps: { m01: true }, maisters: [{ acquired: true, learned: true }] },
    { steps: { m01: true }, deferredStepIds: [null] },
    { steps: { m01: true }, activeStepId: [] }
  ]) {
    const result = validateImportData(JSON.stringify(obj));
    assert.equal(result.valid, false, JSON.stringify(obj));
    assert.equal(map.get(STORAGE_KEY), existing);
  }
});

test('invalid local progress is never silently replaced, even after editing default state', () => {
  const map = installStorage();
  map.set(STORAGE_KEY, 'null');
  const loaded = loadProgress();
  assert.ok(getProgressStorageError());
  assert.equal(saveProgress({ ...loaded, steps: { m01: true } }), false);
  assert.equal(map.get(STORAGE_KEY), 'null');
  allowExplicitProgressReplacement();
  const valid = { ...fresh(), steps: { m02: true } };
  assert.equal(saveProgress(valid), true);
  assert.equal(JSON.parse(map.get(STORAGE_KEY)).steps.m02, true);
});

test('valid import of new fields, extra fields, and falsy progress', () => {
  const p = { ...fresh(), activeStepId: 'm03', deferredStepIds: ['m01'], userExtra: 'keep' };
  const output = validateImportData(JSON.stringify({ progress: p }));
  assert.equal(output.valid, true);
  assert.equal(output.data.activeStepId, 'm03');
  assert.deepEqual(output.data.deferredStepIds, ['m01']);
  assert.equal(output.data.userExtra, 'keep');
});
