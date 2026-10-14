import test from 'node:test';
import assert from 'node:assert/strict';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { PHASES, SPHINX_RIDDLES } from '../src/data/roadmapData.ts';

const guide = id => QUEST_GUIDES.find(x => x.id === id);
test('onda 17: Sphinx tem dez enigmas, incluindo Reunião e quatro finais variáveis', () => {
  const sphinx = guide('game_of_wits');
  assert.ok(sphinx);
  assert.equal(sphinx.title, 'Um Jogo de Perspicácia');
  assert.deepEqual(sphinx.relatedEventIds, ['m06', 'v205', 'b06', 'b062']);
  assert.equal(SPHINX_RIDDLES.length, 10);
  assert.equal(SPHINX_RIDDLES.filter(x => x.location === 'mountain').length, 5);
  assert.equal(SPHINX_RIDDLES.filter(x => x.location === 'reunification').length, 1);
  assert.equal(SPHINX_RIDDLES.filter(x => x.location === 'frontier').length, 4);
  assert.match(sphinx.preparation.join(' '), /SETE DIAS/);
  for(const term of ['Finder’s Token','REUNIÃO', 'Memória', 'Unmaking Arrow', 'Arqueiro', 'corpo\/pernas']) {
    assert.ok(sphinx.steps.join(' ').includes(term), term);
  }
  assert.match(sphinx.preparation.join(' '), /não conclui automaticamente/);
  const items=QUEST_ITEM_REQUIREMENTS.game_of_wits.items;
  assert.equal(items.length,3);
  assert.ok(items.some(x=>x.name==='Sealing Phial' && !x.optional));
  assert.ok(items.some(x=>x.name==="Finder's Token" && !x.optional));
  assert.ok(items.some(x=>x.name==='Unmaking Arrow' && x.optional));
  assert.ok(QUEST_NAME_INDEX.some(x=>x.english==='A Game of Wits' && x.ptBR===sphinx.title));
});

test('onda 17: Oskar, sino e grimório condicional sem inventar título oficial', () => {
  const oskar=guide('tolled_to_rest');
  assert.ok(oskar);
  assert.equal(oskar.title, 'Tolled to Rest');
  assert.deepEqual(oskar.relatedEventIds, ['v205']);
  assert.match(oskar.preparation.join(' '), /PT-BR NÃO CONFIRMADO/);
  for(const term of ['Oskar', 'sino', 'Nation’s Death Knell', 'Ancient Battleground Key']) {
    assert.ok(oskar.steps.join(' ').includes(term), term);
  }
  assert.equal(QUEST_NAME_INDEX.some(x=>x.english==='Tolled to Rest'),false);
  const items=QUEST_ITEM_REQUIREMENTS.tolled_to_rest.items;
  assert.equal(items.length,1);
  assert.equal(items[0].name,"Nation's Death Knell");
  assert.equal(items[0].optional,true);
  assert.match(QUEST_ITEM_REQUIREMENTS.tolled_to_rest.guidance,/RECOMPENSA/);
  assert.equal(PHASES.flatMap(p=>p.events).length,72);
  assert.equal(new Set(PHASES.flatMap(p=>p.achievements.map(a=>a.id))).size,60);
});
