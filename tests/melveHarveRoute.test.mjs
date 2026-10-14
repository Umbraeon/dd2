import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { DEFAULT_PROGRESS } from '../src/utils/storage.ts';
import { listJourneySteps, firstPendingStep } from '../src/utils/journey.ts';

const steps = listJourneySteps(PHASES);
const index = new Map(steps.map(({event},i)=>[event.id,i]));
const row = id => {
  const entry = steps.find(({event}) => event.id === id);
  assert.ok(entry, `marco ausente: ${id}`);
  return entry.event;
};
const guide = id => {
  const found = QUEST_GUIDES.find(item => item.id === id);
  assert.ok(found, `guia ausente: ${id}`);
  return found;
};

test('Melve e Harve seguem ordem editorial sem transformar o Vilarejo sem Nome em requisito de Ulrika', () => {
  for (const [before,after] of [
    ['m04','v107'],['v110','v201'],['v201','v107'],
    ['v107','v202'],['v202','v305'],['v301','v305'],['v305','v303']
  ]) assert.ok(index.get(before) < index.get(after), `rota: ${before} antes de ${after}`);
  assert.match(row('v201').note,/Vilarejo sem Nome.*paralelo|Vilarejo sem Nome.*paralel/i);
  assert.match(row('v201').prerequisites,/não pré-requisito/i);
});

test('Invasores Escamosos possui duas defesas e segunda visita, sem confundir Monster Culling com conclusão', () => {
  assert.match(row('v110').note,/primeira leva/i);
  assert.match(row('v110').note,/NÃO termina/i);
  assert.match(row('v201').note,/SEGUNDA leva/i);
  assert.match(row('v201').note,/deixe a região/i);
  assert.equal(guide('scaly_invaders').steps.length,5);
  assert.match(guide('scaly_invaders').completion,/segunda defesa/i);
  assert.ok(guide('scaly_invaders').relatedEventIds.includes('v201'));
});

test('Revinda começa no dragão e só termina depois de encontrar Ulrika e informar Lennart', () => {
  const attack = row('v107'), followup=row('v202');
  assert.match(attack.title,/INICIE Revinda da Calamidade/);
  assert.match(attack.note,/não à conclusão/i);
  assert.match(attack.failureRisk,/não equivale à missão inteira concluída/i);
  assert.match(followup.note,/Lennart EM MELVE/i);
  assert.match(followup.note,/resgate.*não aparecer/i);
  assert.match(followup.note,/adie este marco/i);
  assert.match(guide('readvent_calamity').completion,/Lennart/i);
  assert.match(guide('readvent_calamity').completion,/não encerra/i);
});

test('Zoran em Harve é condicional DURANTE ou depois, sem bloquear conclusão de Readvent', () => {
  const event=row('v202');
  assert.match(event.note,/PowerPyx descreve/i);
  assert.match(event.note,/Game8 situa/i);
  assert.match(event.note,/não deve bloquear/i);
  const side=guide('trouble_cape');
  assert.match(side.preparation.join(' '),/PowerPyx.*DURANTE/);
  assert.match(side.preparation.join(' '),/Game8/);
  assert.ok(event.extraSources.some(x=>x.includes('trouble-on-the-cape')));
});

test('Libertar Melve exige espadas e não depende obrigatoriamente de ter salvado Norbert', () => {
  const home=row('v305');
  assert.match(home.note,/QUATRO espadas/);
  assert.match(home.note,/não é requisito obrigatório/i);
  assert.match(home.note,/CAIS à NOITE/i);
  assert.match(home.prerequisites,/PowerPyx.*Game8/);
  assert.match(guide('home_hearth').preparation.join(' '),/não exige os irmãos/i);
  assert.match(row('m04').note,/primeira visita/);
  assert.match(row('m04').failureRisk,/Norbert/);
});

test('checkpoint alerta para missão iniciada mas não concluída, sem alterar IDs ou save', () => {
  const checkpoint=row('v303');
  assert.match(checkpoint.note,/v107 sozinha NÃO significa/i);
  assert.equal(steps.length,72);
  assert.equal(new Set(steps.map(({event})=>event.id)).size,72);
  assert.equal(PHASES.flatMap(p=>p.achievements).length,60);
  const progress={...DEFAULT_PROGRESS, steps:{m04:true,v107:true},activeStepId:'v202',deferredStepIds:['v305']};
  assert.equal(progress.steps.v107,true);
  assert.equal(progress.steps.v202,undefined);
  assert.equal(firstPendingStep(PHASES,progress)?.event.id === 'v202', false,
    'uma etapa anterior não concluída pode ser sugerida antes de v202');
  assert.deepEqual(progress.deferredStepIds,['v305']);
});
