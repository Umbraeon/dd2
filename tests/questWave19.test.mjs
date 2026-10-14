import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { QUEST_ITEM_REQUIREMENTS, QUESTS_WITHOUT_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { PHASES } from '../src/data/roadmapData.ts';
import { baselineRoster, buildQuestCoverage } from '../scripts/report-quest-coverage.mjs';

const byId=id=>QUEST_GUIDES.find(q=>q.id===id);
const gate=JSON.parse(readFileSync(new URL('../docs/audit/quest-coverage-quality-gate-2026-10-12.json',import.meta.url),'utf8'));

test('onda 19: todos os 80 itens do roster PowerPyx histórico têm ficha distinta',()=>{
  const report=buildQuestCoverage(baselineRoster);
  assert.equal(QUEST_GUIDES.length,82);
  assert.equal(gate.publishedGuideRegistry.length,82);
  assert.equal(baselineRoster.main.length,16);
  assert.equal(baselineRoster.side.length,64);
  assert.equal(report.summary.withoutIndividualGuide,0,'Pendente no comparador histórico');
  assert.equal(report.summary.historicalMainWithoutGuide,0);
  assert.equal(report.summary.historicalSideWithoutGuide,0);
  assert.equal(QUEST_NAME_INDEX.length,82);
  assert.equal(PHASES.length,9);
  assert.equal(PHASES.flatMap(p=>p.events).length,71);
  assert.equal(PHASES.flatMap(p=>p.achievements).length,60);
});

test('escultor: opcional de Medusa e risco de estátua inferior',()=>{
  const guide=byId('case_sculptors_block');
  assert.equal(guide.title,'A Inspiração de um Escultor');
  assert.ok(guide.relatedEventIds.includes('b02'));
  assert.match(guide.preparation.join(' '),/OPCIONAL/);
  assert.match(guide.steps.join(' '),/Klark/);
  assert.match(guide.steps.join(' '),/Fulvio/);
  assert.match(guide.steps.join(' '),/Medusa/);
  assert.match(guide.completion,/7.000 G.*14.000 G.*18.500 G/);
  const req=QUEST_ITEM_REQUIREMENTS.case_sculptors_block;
  assert.equal(req.items.length,1);
  assert.equal(req.items[0].forgery,'optional');
  assert.equal(req.items[0].optional,true);
});

test('baile: esconder bastão roubado e apreender ladrão, com fontes divergentes',()=>{
  const guide=byId('noble_exchange');
  assert.equal(guide.title,'Uma Nobre Troca');
  assert.ok(questGuidesForEvent('v104').some(q=>q.id===guide.id));
  for(const keyword of ['Olven','Paragon Staff','Descartar','7.500 G','3.000 G','60.000 G']){
    const text=[...guide.preparation,...guide.steps,guide.completion].join(' ');
    assert.ok(text.includes(keyword),keyword);
  }
  const req=QUEST_ITEM_REQUIREMENTS.noble_exchange;
  assert.equal(req.items.length,1);
  assert.match(req.items[0].use,/DESCARTE/);
  assert.match(req.guidance,/Neoseeker.*PowerPyx/);
});

test('duas cartas originais: Akakios → Ernesto → Barbas, morgue e Ferrystone de recompensa',()=>{
  const guide=byId('twixt_rock_hard_place');
  assert.equal(guide.title,'Entre Dois Fogos');
  const body=guide.steps.join(' ');
  assert.match(body,/Akakios/);
  assert.match(body,/Ernesto/);
  assert.match(body,/Barbas/);
  assert.match(body,/morgue de Bakbattahl/);
  assert.match(guide.completion,/duas entregas/);
  const req=QUEST_ITEM_REQUIREMENTS.twixt_rock_hard_place;
  assert.deepEqual(req.items.map(i=>i.name),['Letter of Request (Akakios → Ernesto)','Letter of Request (Ernesto → Barbas)']);
  assert.ok(req.items.every(x=>x.forgery==='original'));
  assert.match(req.guidance,/Ferrystone é PRÊMIO/);
});

test('Nadinia: pré-requisitos e recusa de fugitivo; moeda não vira requisito inventariado',()=>{
  const guide=byId('crossing_shadow');
  assert.equal(guide.title,'Cruzando às Sombras');
  assert.match(guide.preparation.join(' '),/Um Lugar para Chamar de Lar/);
  assert.match(guide.preparation.join(' '),/Como uma Vela na Tempestade/);
  assert.match(guide.steps.join(' '),/Vera/);
  assert.match(guide.steps.join(' '),/Nadinia/);
  assert.match(guide.steps.join(' '),/RECUSAR/);
  assert.match(guide.preparation.join(' '),/1.000 G/);
  assert.match(guide.completion,/sem identidade exposta/);
  assert.ok(QUESTS_WITHOUT_ITEM_REQUIREMENTS.includes('crossing_shadow'));
  assert.equal(QUEST_ITEM_REQUIREMENTS.crossing_shadow,undefined);
});

test('quatro traduções respaldadas por Kiranico, nenhum ID PAK inventado',()=>{
  const pairs=[
    ["A Case of Sculptor's Block","A Inspiração de um Escultor"],
    ['A Noble Exchange','Uma Nobre Troca'],
    ["'Twixt a Rock and a Hard Place",'Entre Dois Fogos'],
    ['Crossing in Shadow','Cruzando às Sombras']
  ];
  for(const [en,pt] of pairs) {
    assert.ok(QUEST_GUIDES.some(q=>q.original===en&&q.title===pt));
    const mapped=QUEST_NAME_INDEX.find(q=>q.english===en);
    assert.ok(mapped);
    assert.equal(mapped.ptBR,pt);
    assert.equal(mapped.evidence,'kiranico_ptbr');
    assert.equal(mapped.sourceUrl,'https://dragonsdogma2.kiranico.com/pt-BR/data/quests');
    assert.equal(mapped.sha256,undefined);
  }
  assert.deepEqual(gate.notInLocalizationIndexFrom2024,['Hunt for the Jadeite Orb','Tolled to Rest']);
});
