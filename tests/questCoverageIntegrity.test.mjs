import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { MAISTER_SKILLS, PHASES } from '../src/data/roadmapData.ts';
import { baselineRoster, buildQuestCoverage, normalizeQuestName } from '../scripts/report-quest-coverage.mjs';

const gate = JSON.parse(readFileSync(new URL('../docs/audit/quest-coverage-quality-gate-2026-10-12.json', import.meta.url), 'utf8'));
const normalize = normalizeQuestName;
const names = values => values.map(normalize).sort();

test('gate: toda ficha publicada até 12/10 permanece cadastrada com ID estável', () => {
  const current = new Map(QUEST_GUIDES.map(q => [q.id, q]));
  const identifiers = QUEST_GUIDES.map(q => q.id);
  assert.equal(new Set(identifiers).size, identifiers.length);
  assert.equal(new Set(QUEST_GUIDES.map(q => normalize(q.original))).size, QUEST_GUIDES.length);
  assert.equal(gate.publishedGuideRegistry.length, 31);
  for (const original of gate.publishedGuideRegistry) {
    assert.ok(current.has(original.id), `Guia perdido: ${original.id} (${original.english})`);
    assert.equal(normalize(current.get(original.id).original), normalize(original.english), `Original mudou para ${original.id}`);
  }
  assert.ok(current.size >= gate.publishedGuideRegistry.length);
  assert.ok(current.has('beren_claw') && current.has('beren_final_lesson'));
});

test('gate: não é possível adicionar outra quest ao índice PT-BR sem guia OU backlog explícito', () => {
  const present = new Set(QUEST_GUIDES.map(q => normalize(q.original)));
  const uncovered = QUEST_NAME_INDEX.filter(q => !present.has(normalize(q.english)));
  assert.deepEqual(
    names(uncovered.map(q => q.english)),
    names(gate.indexedWithoutGuide.map(q => q.english)),
    'Uma quest foi incluída ou resolvida sem atualizar o registro de lacunas auditado'
  );
  assert.equal(uncovered.length, gate.indexedWithoutGuide.length);
  assert.equal(QUEST_NAME_INDEX.length, 59);
  assert.equal(new Set(QUEST_NAME_INDEX.map(q => normalize(q.english))).size, QUEST_NAME_INDEX.length);
  for (const missing of uncovered) {
    assert.ok(missing.eventIds.length > 0, missing.english);
    const tracked = gate.indexedWithoutGuide.find(q => normalize(q.english) === normalize(missing.english));
    assert.equal(tracked.ptBR, missing.ptBR, 'Nome PT-BR alterado sem revisão: ' + missing.english);
    assert.ok(['P1', 'P2'].includes(tracked.priority));
  }
});

test('gate: catálogo de 2024 identifica 49 faltantes sem confundir marcos com quests', () => {
  const report = buildQuestCoverage(baselineRoster);
  assert.equal(report.summary.historicalTotal, 80);
  assert.ok(report.summary.historicalMainWithoutGuide <= 11);
  assert.ok(report.summary.historicalSideWithoutGuide <= 38);
  assert.ok(report.summary.withoutIndividualGuide <= 49);
  assert.ok(report.summary.withIndividualGuide >= 31);
  assert.equal(report.summary.indexedWithoutGuide, gate.indexedWithoutGuide.length);
  assert.equal(report.summary.guidesWithoutLocalizedIndex, 1);
  assert.deepEqual(report.guidesWithoutLocalizedIndex.map(q => q.id), ['jadeite']);
  assert.deepEqual(names(report.missingLocalization), names(gate.notInLocalizationIndexFrom2024));
  assert.equal(report.missingLocalization.length, 25);
  assert.equal(PHASES.flatMap(p => p.events).length, 53);
});

test('gate: títulos oficiais registrados permanecem alinhados aos guias, sem tradução nova inventada', () => {
  const lookup = new Map(QUEST_NAME_INDEX.map(q => [normalize(q.english), q]));
  for (const guide of QUEST_GUIDES) {
    const name = lookup.get(normalize(guide.original));
    if (name) assert.equal(guide.title, name.ptBR, guide.id);
  }
  assert.ok(!lookup.has(normalize('Hunt for the Jadeite Orb')), 'Rever evidência PT-BR antes de vincular Jadeite');
  assert.ok(!lookup.has(normalize('An Unsettling Encounter')), 'Não inventar título EN/PT-BR');
});

test('gate: rotas de Mestre têm vínculos explícitos para as quests ausentes', () => {
  assert.equal(MAISTER_SKILLS.length, 12);
  const warrior = MAISTER_SKILLS.find(s => s.id === 'warrior_beren');
  assert.match(warrior.questOrCondition, /Treino Leonino.*A Última Lição de Beren/);
  const missingById = new Set(gate.indexedWithoutGuide.map(q => normalize(q.english)));
  for (const english of ['Put a Spring in Thy Step', 'The Sotted Sage']) {
    assert.ok(missingById.has(normalize(english)), `Rota de Mestre esquecida: ${english}`);
  }
});
