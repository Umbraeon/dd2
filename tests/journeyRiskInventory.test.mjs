import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { buildJourneyRiskInventory, renderRiskMarkdown } from '../scripts/report-journey-risks.mjs';

test('inventário reproduz flags e risco de todos os marcos sem inventar verificação', () => {
  const all = PHASES.flatMap(p => p.events);
  const rows = buildJourneyRiskInventory();
  assert.equal(all.length, 72);
  assert.equal(QUEST_GUIDES.length, 82);
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length);
  assert.deepEqual(rows.map(row => row.id), all.filter(e => e.isTimed || e.isMissable || e.failureRisk).map(e => e.id));
  for (const row of rows) {
    const original = all.find(e => e.id === row.id);
    assert.equal(row.timedFlag, original.isTimed === true);
    assert.equal(row.missableFlag, original.isMissable === true);
    assert.equal(row.statedRisk, original.failureRisk ?? null);
    assert.equal(row.verification, 'needs-claim-level-review');
    assert.ok(row.sourceUrls.length > 0, row.id);
    assert.ok(row.sourceUrls.every(url => /^https:\/\//.test(url)), row.id);
    assert.equal(row.guideCount, QUEST_GUIDES.filter(g => g.relatedEventIds?.includes(row.id)).length);
  }
  assert.ok(rows.some(row => row.grouped), 'marcos agrupados devem aparecer na triagem');
  assert.match(renderRiskMarkdown(rows), /não certificação factual/);
});
