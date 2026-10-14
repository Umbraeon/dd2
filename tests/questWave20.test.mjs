import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { QUEST_ITEM_REQUIREMENTS, QUESTS_WITHOUT_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { PHASES } from '../src/data/roadmapData.ts';
import { buildInstalledQuestEvidenceReport, parseQuestEvidenceCsv } from '../scripts/report-installed-quest-evidence.mjs';
import { baselineRoster, buildQuestCoverage } from '../scripts/report-quest-coverage.mjs';

const byId = id => QUEST_GUIDES.find(q => q.id === id);
const gate = JSON.parse(readFileSync(new URL('../docs/audit/quest-coverage-quality-gate-2026-10-12.json', import.meta.url),'utf8'));
const dlc = JSON.parse(readFileSync(new URL('../docs/audit/dlc-entry-quest-evidence-2026-10-13.json', import.meta.url),'utf8'));
const installed = buildInstalledQuestEvidenceReport(parseQuestEvidenceCsv(
  readFileSync(new URL('../docs/audit/game-localization-evidence.csv', import.meta.url), 'utf8')
));

test('onda 20: inclui dois guias além dos 80 históricos, sem confundir catálogos', () => {
  assert.equal(QUEST_GUIDES.length, 82);
  assert.equal(gate.publishedGuideRegistry.length, 82);
  assert.equal(buildQuestCoverage(baselineRoster).summary.withIndividualGuide, 80);
  assert.equal(buildQuestCoverage(baselineRoster).summary.guidesOutsideHistoricalBaseline, 2);
  assert.deepEqual(installed.observedWithoutGuide.map(q => q.english).sort(), ['Chilling Tidings', 'Lost Rites']);
  assert.deepEqual(gate.indexedWithoutGuide.map(q => q.english).sort(), ['Chilling Tidings', 'Lost Rites']);
  assert.equal(PHASES.flatMap(p => p.events).length, 62);
  assert.equal(PHASES.flatMap(p => p.achievements).length, 60);
});

test('A Mão que Guia: lutar e fugir são objetivos distintos do prólogo, sem objetos', () => {
  const q = byId('hand_that_guides');
  assert.ok(q);
  assert.equal(q.title,'A Mão que Guia');
  assert.equal(q.original,'The Hand That Guides');
  assert.deepEqual(q.relatedEventIds,['m01']);
  assert.ok(questGuidesForEvent('m01').some(x=>x.id===q.id));
  assert.match(q.steps.join(' '),/Defenda-se do monstro/);
  assert.match(q.steps.join(' '),/Fuja para viver/);
  assert.match(q.completion,/A História se Inicia/);
  assert.ok(q.references.some(x=>x.includes('kiranico.com/pt-BR/data/quests')));
  assert.ok(QUESTS_WITHOUT_ITEM_REQUIREMENTS.includes(q.id));
  assert.equal(QUEST_ITEM_REQUIREMENTS[q.id],undefined);
});

test('Intruso de um Olho Só: escolha opcional da cachoeira; carta é prêmio após o ciclope', () => {
  const q = byId('one_eyed_interloper');
  assert.ok(q);
  assert.equal(q.title,'Intruso de um Olho Só');
  assert.deepEqual(q.relatedEventIds,['v101']);
  assert.ok(questGuidesForEvent('v101').some(x=>x.id===q.id));
  assert.match(q.steps.join(' '),/cachoeira.*OPCIONAL/s);
  assert.match(q.steps.join(' '),/Gregor.*Missive to the Captain/);
  assert.match(q.steps.join(' '),/Prossiga até Vernworth/);
  assert.match(q.completion,/não foi tratada como item de requisito/);
  assert.ok(QUESTS_WITHOUT_ITEM_REQUIREMENTS.includes(q.id));
  assert.equal(QUEST_ITEM_REQUIREMENTS[q.id],undefined);
  assert.ok(q.references.some(x=>x.includes('One-Eyed-Interloper')));
});

test('nomes dos dois guias são literais catalogados na matriz extraída de 25290080',()=>{
  for(const id of ['hand_that_guides','one_eyed_interloper']){
    const guide=byId(id);
    const index=QUEST_NAME_INDEX.find(q=>q.english===guide.original);
    const observed=installed.rows.find(q=>q.english===guide.original);
    assert.ok(index && observed);
    assert.equal(guide.title,index.ptBR);
    assert.equal(guide.title,observed.ptBR);
    assert.equal(observed.guideId,id);
    assert.ok(observed.questInternalId);
    assert.match(observed.extractedFileSha256,/^[a-f0-9]{64}$/i);
  }
});

test('DLC: proveniência não vira 100% nem instrução disputada',()=>{
  assert.equal(dlc.installedBuildReported,'25290080');
  assert.equal(dlc.entries.length,2);
  for(const entry of dlc.entries){
    assert.equal(entry.coveredByIndividualGuide,false);
    const observed=installed.rows.find(x=>x.english===entry.english);
    assert.ok(observed);
    assert.equal(entry.ptBR,observed.ptBR);
    assert.ok(entry.claims.some(claim=>claim.field==='start' && claim.tier==='walkthroughAgreement'));
    assert.ok(entry.claims.every(claim=>['walkthroughAgreement','walkthroughOnly','conflicting','unverified'].includes(claim.tier)));
    assert.ok(entry.claims.flatMap(c=>c.sources).every(url=>url.startsWith('https://')));
  }
  const rites=dlc.entries.find(q=>q.english==='Lost Rites');
  assert.ok(rites.claims.some(c=>c.field==='provingGroundCompassTiming' && c.tier==='conflicting' && c.sources.length>=2));
  assert.ok(dlc.outstanding.some(text=>text.includes('questlog')));
});
