import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { DEFAULT_PROGRESS } from '../src/utils/storage.ts';
import { firstPendingStep, listJourneySteps, resolveJourney } from '../src/utils/journey.ts';

// Stable legacy progress IDs; no reorder is allowed to invalidate a checked item.
const LEGACY_IDS = [
  'm01','m02','m03','m04','m05','m06',
  'v101','v102','v103','v104','v105','v106','v107',
  'v201','v202','v203','v204','v205','v206',
  'v301','v302','v303','v304',
  'b01','b02','b03','b04','b05','b06','b062','b063','b07',
  'i01','i02','i03','i04','i05','i06',
  'p01','p02','p03','p04','p05','p06',
  'u01','u02','u03','u04','u05','u06','u07','u08','d01'
];
const NEW_IDS = ['v108','v109','v110','v111','m07','v305','b08','b09','p07','m08','m09','v112','v113','v114','v306','b10','b11','b12','p08'];
const flat = listJourneySteps(PHASES);
const order = new Map(flat.map(({ event }, i) => [event.id, i]));
const phaseId = id => flat.find(x => x.event.id === id)?.phase.id;
const before = (a,b) => {
  assert.ok(order.has(a), 'Marco ausente: ' + a);
  assert.ok(order.has(b), 'Marco ausente: ' + b);
  assert.ok(order.get(a) < order.get(b), `Dependência quebrada: ${a} precisa vir antes de ${b}`);
};

test('compatibilidade: todos os IDs do progresso antigo continuam únicos e publicados', () => {
  assert.equal(PHASES.length, 9);
  assert.equal(flat.length, 72);
  assert.equal(new Set(flat.map(s => s.event.id)).size, 72);
  assert.equal(LEGACY_IDS.length, 53);
  assert.equal(NEW_IDS.length, 19);
  assert.deepEqual(new Set(flat.map(s => s.event.id)), new Set([...LEGACY_IDS, ...NEW_IDS]));
  assert.equal(PHASES.flatMap(p => p.achievements).length, 60);
  assert.ok(QUEST_GUIDES.length >= 82);
});

test('cronologia verificável: pré-requisitos e três pontos sem retorno', () => {
  for (const [a,b] of [
    ['m01','m08'],['m08','m02'],['m02','m09'],['m03','m09'],['m09','v101'],['m01','m06'],['m06','m02'],
    ['v101','v108'],['v108','v109'],['v108','v110'],['v108','v111'],
    ['v103','v112'],['v103','v111'],['v111','v113'],['v108','v112'],['v108','m04'],['m04','v110'],['m04','v107'],['m03','m07'],['v108','m07'],
    ['v109','v104'],['v110','v201'],['v206','v114'],['v201','v107'],['v107','v202'],['v104','v301'],
    ['v202','v305'],['v301','v305'],['v305','v303'],
    ['v303','v304'],['v304','v302'],['v304','v306'],['v306','b01'],['v302','b01'],
    ['b01','b10'],['b10','b02'],['b02','b11'],['b11','b12'],['b12','p08'],['b01','b08'],['b08','b09'],['b09','p04'],
    ['p04','p07'],['p07','p05'],['p05','p08'],['p08','p06'],
    ['u04','u05'],['u06','u05'],['u05','u08']
  ]) before(a,b);
  assert.equal(phaseId('m04'),'vernworth1');
  assert.equal(phaseId('v302'),'vernworth3');
  assert.equal(phaseId('b09'),'battahl');
  assert.equal(phaseId('p07'),'preend');
  assert.equal(phaseId('m09'),'melve');
  assert.equal(phaseId('p08'),'preend');
  assert.equal(phaseId('v113'),'vernworth1');
  assert.equal(phaseId('b11'),'battahl');
  assert.equal(phaseId('b12'),'battahl');
});

test('novas etapas têm guia ou instrução completa e fonte independente', () => {
  const guideByNew = new Map([
    ['v108','seat_sovran'],['v109','disas_plot'],['v110','monster_culling'],
    ['v111','caged_magistrate'],['m07','beren_final_lesson'],['v305','home_hearth'],
    ['b08','flickering_shadows'],['b09','convergence'],['p07','new_godsway'],
    ['m09','one_eyed_interloper'],['v112','gift_giving'],['v113','magisterial_amenity'],
    ['v114','prey_for_pack'],['v306','gossamer_clouds'],['b10','welcome_battahl'],
    ['b11','tensions_highroad'],['b12','noble_exchange'],['p08','clash_conclusion']
  ]);
  for(const [id,guideId] of guideByNew){
    const event = flat.find(s => s.event.id === id)?.event;
    assert.ok(event);
    assert.match(event.source,/^https:\/\//);
    assert.ok(event.note.length > 100,id);
    assert.ok(questGuidesForEvent(id).some(guide => guide.id === guideId),`Guia não vinculado: ${id} ↔ ${guideId}`);
  }
});


test('avisos de missões perdíveis incluem pré-requisitos legíveis e proteção antes da coroação', () => {
  const byId = id => flat.find(({ event }) => event.id === id)?.event;
  for (const id of ['m04','v107','v202','v305','v302','b09','p07']) {
    const item = byId(id);
    assert.ok(item?.prerequisites?.length > 45, `${id}: sem pré-requisitos legíveis`);
    assert.match(item.source, /^https:\/\//);
  }
  assert.equal(byId('m04').risk,'critico');
  assert.match(byId('m04').note, /primeira visita|Retorne|retorne cedo/i);
  assert.match(byId('m04').failureRisk, /Norbert/);
  assert.match(byId('v107').note, /Invasores Escamosos/);
  assert.match(byId('v107').failureRisk, /O Banquete da Farsa/);
  assert.match(byId('v202').note, /adie este marco/);
});

test('progresso antigo permanece concluído sem sobrescrever etapa fixada ou adiada', () => {
  const historical = {
    ...DEFAULT_PROGRESS,
    steps: Object.fromEntries(LEGACY_IDS.map(id=>[id,true])),
    activeStepId:'v304',
    deferredStepIds:['v302','p04']
  };
  assert.ok(LEGACY_IDS.every(id=>historical.steps[id]));
  assert.equal(resolveJourney(PHASES,historical).target.event.id,'v304');
  assert.equal(resolveJourney(PHASES,historical).kind,'completed-active');
  const first = firstPendingStep(PHASES,historical);
  assert.ok(first);
  assert.ok(NEW_IDS.includes(first.event.id));
  assert.equal(historical.steps[first.event.id],undefined);
  assert.deepEqual(historical.deferredStepIds,['v302','p04']);
});
