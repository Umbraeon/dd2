import test from 'node:test';
import assert from 'node:assert/strict';
import { QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { QUEST_ITEM_REQUIREMENTS, QUESTS_WITHOUT_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { PHASES } from '../src/data/roadmapData.ts';

const get = id => QUEST_GUIDES.find(q => q.id === id);
const chain=['welcome_battahl','tensions_highroad','clash_conclusion'];
const knownEvents=new Set(PHASES.flatMap(p=>p.events.map(e=>e.id)));

test('onda 18: carta única de Patrick e roupas do baile sem tradução inventada', () => {
  const q=get('masked_correspondence');
  assert.ok(q);
  assert.equal(q.title,'Masked Correspondence');
  assert.deepEqual(q.relatedEventIds,['v104']);
  assert.match(q.preparation.join(' '),/TÍTULO PT-BR NÃO COMPROVADO/);
  assert.match(q.preparation.join(' '),/UMA Letter to Lord Patrick/);
  assert.match(q.preparation.join(' '),/ENTREGAR/i);
  assert.match(q.steps.join(' '),/Lord Patrick/);
  assert.match(q.steps.join(' '),/capa AZUL/);
  assert.match(q.steps.join(' '),/Sven/);
  assert.match(q.steps.join(' '),/Unfinished Letter/);
  const items=QUEST_ITEM_REQUIREMENTS.masked_correspondence.items;
  assert.equal(items.length,3);
  assert.deepEqual(items.map(i=>i.name),['Letter to Lord Patrick','Courtly Tunic + Courtly Breeches','Eventide Mask']);
  assert.equal(items[0].forgery,'original');
  assert.ok(items.slice(1).every(i=>i.forgery==='not-applicable'));
  assert.match(items[0].use,/ENTREGUE exclusivamente/);
  assert.ok(questGuidesForEvent('v104').some(q=>q.id==='masked_correspondence'));
});

test('onda 18: cadeia de Raghnall exige apresentação, escolta e duelo na torre', () => {
  const [welcome,tensions,clash]=chain.map(get);
  for (const q of [welcome,tensions,clash]) {
    assert.ok(q);
    assert.ok(q.steps.length>=6);
    assert.ok(q.references.length>=2);
    assert.ok(q.relatedEventIds.every(id=>knownEvents.has(id)));
    assert.match(q.preparation.join(' '),/TÍTULO PT-BR NÃO COMPROVADO/);
    assert.ok(QUESTS_WITHOUT_ITEM_REQUIREMENTS.includes(q.id),q.id);
    assert.ok(!QUEST_ITEM_REQUIREMENTS[q.id]);
  }
  assert.match(welcome.preparation.join(' '),/Fruit Wine.*recompensa/i);
  assert.match(welcome.steps.join(' '),/Taleef/);
  assert.match(welcome.steps.join(' '),/Raghnall/);
  assert.match(welcome.steps.join(' '),/13\.500 G/);
  assert.match(tensions.steps.join(' '),/Simon/);
  assert.match(tensions.steps.join(' '),/Augustin/);
  assert.match(tensions.steps.join(' '),/Caverna Guerco/);
  assert.match(tensions.preparation.join(' '),/Welcome to Battahl/);
  assert.match(clash.preparation.join(' '),/CONDICIONAL/);
  assert.match(clash.steps.join(' '),/O Guardião Gigantus/);
  assert.match(clash.steps.join(' '),/Wakestone/);
  assert.match(clash.steps.join(' '),/Taleef/);
  assert.ok(questGuidesForEvent('p06').some(q=>q.id==='clash_conclusion'));
});

test('onda 18: 4 títulos permanecem EN; preservar marcos, conquistas e índice PT-BR', () => {
  const en=['Masked Correspondence','Welcome to Battahl','Tensions on the Highroad','Clash and Conclusion'];
  for (const name of en) {
    assert.ok(QUEST_GUIDES.some(g=>g.original===name && g.title===name));
    assert.ok(!QUEST_NAME_INDEX.some(n=>n.english===name),'Não inventar tradução oficial: '+name);
  }
  assert.equal(QUEST_GUIDES.length,76);
  assert.equal(QUEST_NAME_INDEX.length,74);
  assert.equal(PHASES.flatMap(p=>p.events).length,53);
  assert.equal(new Set(PHASES.flatMap(p=>p.achievements.map(a=>a.id))).size,60);
});
