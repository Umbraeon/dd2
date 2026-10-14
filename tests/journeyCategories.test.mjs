import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { journeyCategoryForEvent, JOURNEY_CATEGORY_LABELS } from '../src/utils/journeyCategory.ts';
import { QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';

const stages = PHASES.flatMap(p => p.events);
const idx = new Map(stages.map((e,i) => [e.id,i]));
const stage = id => stages.find(e => e.id === id);
const before = (a,b) => assert.ok(idx.get(a) < idx.get(b), a + ' deve anteceder ' + b);

test('todas as 71 etapas têm categoria editorial explícita, separada do risco e da conclusão', () => {
  assert.equal(PHASES.length, 9);
  assert.equal(stages.length, 71);
  assert.equal(new Set(stages.map(e=>e.id)).size,71);
  assert.equal(QUEST_GUIDES.length,82);
  assert.equal(QUEST_NAME_INDEX.length,82);
  assert.equal(PHASES.flatMap(p=>p.achievements).length,60);
  for(const e of stages) {
    assert.ok(e.journeyCategory, e.id);
    assert.ok(Object.hasOwn(JOURNEY_CATEGORY_LABELS,e.journeyCategory),e.id);
    assert.equal(journeyCategoryForEvent(e),e.journeyCategory);
    assert.ok(e.source.startsWith('https://'),e.id);
  }
  assert.equal(stage('m09').journeyCategory,'main');
  assert.equal(stage('p08').journeyCategory,'side');
  assert.equal(stage('b03').journeyCategory,'side');
  assert.equal(stage('v303').journeyCategory,'point_of_no_return');
  assert.equal(stage('p04').journeyCategory,'point_of_no_return');
  assert.equal(stage('u08').journeyCategory,'point_of_no_return');
});

test('missões embutidas ficam na posição do encontro, não em um capítulo arbitrário', () => {
  for(const [a,b] of [
    ['m01','m08'],['m08','m02'],['m02','m09'],['m09','v101'],['v101','v108'],
    ['v103','v112'],['v111','v113'],['v206','v114'],
    ['v304','v306'],['v306','b01'],['b01','b10'],['b10','b11'],
    ['b11','p08'],['p05','p08'],['p08','p06']
  ]) before(a,b);
  assert.match(stage('m09').note,/Gregor.*Intruso de um Olho Só/s);
  assert.match(stage('p08').note,/DURANTE.*O Guardião Gigantus/s);
  const guides = [
    ['m08','in_dragons_wake'],['m09','one_eyed_interloper'],
    ['v112','blue_sunbright_house'],['v113','magisterial_amenity'],
    ['v114','prey_for_pack'],['v306','gossamer_clouds'],
    ['b10','welcome_battahl'],['b11','tensions_highroad'],['p08','clash_conclusion']
  ];
  for(const [e,g] of guides) assert.ok(questGuidesForEvent(e).some(q=>q.id===g),e+' ↔ '+g);
  assert.ok(!questGuidesForEvent('v101').some(g=>g.id==='one_eyed_interloper'));
  assert.ok(!questGuidesForEvent('p06').some(g=>g.id==='clash_conclusion'));
  assert.ok(!questGuidesForEvent('v103').some(g=>g.id==='magisterial_amenity'));
  assert.ok(!questGuidesForEvent('v304').some(g=>g.id==='gossamer_clouds'));
});
