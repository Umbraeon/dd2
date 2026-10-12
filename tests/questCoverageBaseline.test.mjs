import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { baselineRoster, buildQuestCoverage, normalizeQuestName } from '../scripts/report-quest-coverage.mjs';

test('histórico de 2024 tem exatamente 16 principais e 64 secundárias, sem duplicidade', () => {
  assert.equal(baselineRoster.main.length, 16);
  assert.equal(baselineRoster.side.length, 64);
  assert.match(baselineRoster.source.purpose, /NOT an exhaustive official catalogue/);
  const names = [...baselineRoster.main, ...baselineRoster.side].map(normalizeQuestName);
  assert.equal(new Set(names).size, 80);
});

test('inventário detecta lacunas sem confundir guias com nomes PT-BR ou 53 marcos', () => {
  const report = buildQuestCoverage(baselineRoster);
  assert.equal(report.summary.historicalTotal, 80);
  assert.equal(report.summary.withIndividualGuide + report.unlistedGuides.length, QUEST_GUIDES.length);
  assert.equal(report.summary.withoutIndividualGuide, 80 - report.summary.withIndividualGuide);
  assert.equal(report.summary.withoutTitleInCurrentIndex, 80 - report.summary.withTitleInCurrentIndex);
  assert.equal(report.summary.historicalMainWithoutGuide, 0, 'As 16 missões principais históricas precisam ter ficha');
  assert.ok(!report.missingGuide.some(q => q.english === 'An Unsettling Encounter'));
  assert.ok(!report.missingLocalization.includes('An Unsettling Encounter'));
  assert.equal(QUEST_NAME_INDEX.find(q => q.english === 'An Unsettling Encounter')?.ptBR, 'Um Encontro Perturbador');
  assert.ok(report.titleIndexOutsideBaseline.some(q => q.english === 'Chilling Tidings'));
  assert.equal(report.summary.titlesOutsideHistoricalBaseline, QUEST_NAME_INDEX.length - report.summary.withTitleInCurrentIndex);
  const dlc = JSON.parse(readFileSync(new URL('../docs/audit/dark-arisen-candidate-quest-roster-2026-10-12.json', import.meta.url), 'utf8'));
  const candidateNames = new Set([
    ...dlc.candidateMainRows, ...dlc.candidateSideRows, ...dlc.separateFromBoth
  ].map(normalizeQuestName));
  for (const outside of report.unlistedGuides) {
    assert.ok(candidateNames.has(normalizeQuestName(outside.english)),
      `Guia de quest fora do catálogo 2024 precisa de categoria e fonte explícitas: ${outside.english}`);
  }
  assert.match(report.warning, /NOT an exhaustive/);
});

test('inventário recusa uma base histórica com nomes repetidos após normalização', () => {
  assert.throws(() => buildQuestCoverage({ source: baselineRoster.source, main: ['Disa’s Plot'], side: ["Disa's Plot"] }), /duplicate/);
});
