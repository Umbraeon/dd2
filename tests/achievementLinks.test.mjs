import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { resolveAchievementLinks } from '../src/utils/achievementLinks.ts';
import { DEFAULT_PROGRESS, validateImportData } from '../src/utils/storage.ts';

const events = PHASES.flatMap(phase => phase.events);
const catalogue = PHASES.flatMap(phase => phase.achievements);

test('global catalogue resolves all 60 unique IDs in 61 event references', () => {
  const referenced = events.flatMap(event => event.achievements);
  assert.equal(referenced.length, 61);
  assert.equal(new Set(referenced).size, 60);
  assert.equal(catalogue.length, 60);
  assert.equal(new Set(catalogue.map(a => a.id)).size, 60);
  assert.deepEqual([...new Set(referenced.filter((id, idx) => referenced.indexOf(id) !== idx))], [39]);
  for (const event of events) {
    const resolved = resolveAchievementLinks(event.achievements, PHASES);
    assert.equal(resolved.linked.length, event.achievements.length, event.id);
    assert.deepEqual(resolved.missingIds, [], event.id);
    assert.deepEqual(resolved.duplicateIds, [], event.id);
    assert.deepEqual(resolved.duplicateCatalogueIds, []);
    assert.deepEqual(resolved.linked.map(l => l.achievement.id), event.achievements, event.id);
  }
});

test('empty, single, 5, 6, and 12 associations are read without truncating data', () => {
  for (const count of [0, 1, 5, 6, 12]) {
    const candidate = events.find(event => event.achievements.length === count);
    assert.ok(candidate, 'no event with ' + count + ' links');
    const resolved = resolveAchievementLinks(candidate.achievements, PHASES);
    assert.equal(resolved.linked.length, count);
  }
});

test('global lookup uses actual home chapter, not the event chapter', () => {
  const otherPhase = PHASES.find(p => p.achievements.length && p.id !== PHASES[0].id);
  assert.ok(otherPhase);
  const achievement = otherPhase.achievements[0];
  const found = resolveAchievementLinks([achievement.id], PHASES);
  assert.equal(found.linked[0].phaseId, otherPhase.id);
  assert.equal(found.linked[0].achievement.icon, achievement.icon);
  assert.equal(found.linked[0].achievement.title, achievement.title);
});

test('missing and repeated IDs degrade safely; catalogue collisions are reported', () => {
  const a = catalogue[0];
  const result = resolveAchievementLinks([a.id, a.id, 999999, 999999], PHASES);
  assert.deepEqual(result.linked.map(l => l.achievement.id), [a.id]);
  assert.deepEqual(result.missingIds, [999999]);
  assert.deepEqual(result.duplicateIds, [a.id, 999999]);
  const duplicateCatalogue = [{ ...PHASES[0], achievements: [a, a] }];
  assert.deepEqual(resolveAchievementLinks([a.id], duplicateCatalogue).duplicateCatalogueIds, [a.id]);
});

test('link lookup never writes or infers progress, including after v3 import', () => {
  const progress = structuredClone(DEFAULT_PROGRESS);
  const step = events.find(e => e.achievements.length > 0);
  const id = step.achievements[0];
  progress.steps[step.id] = true;
  resolveAchievementLinks(step.achievements, PHASES);
  assert.equal(progress.achievements[id], undefined);
  progress.achievements[id] = true;
  progress.steps[step.id] = false;
  resolveAchievementLinks(step.achievements, PHASES);
  assert.equal(progress.steps[step.id], false);
  const parsed = validateImportData(JSON.stringify({ app: 'dd2-100-roadmap-ptbr', progress }));
  assert.equal(parsed.valid, true);
  assert.deepEqual(parsed.data.steps, progress.steps);
  assert.deepEqual(parsed.data.achievements, progress.achievements);
});
