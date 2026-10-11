import test from 'node:test';
import assert from 'node:assert/strict';
import { FORGERY_ITEMS, QUEST_GUIDES, questGuidesForEvent } from '../src/data/questGuides.ts';
import { PHASES } from '../src/data/roadmapData.ts';

const knownEvents = new Set(PHASES.flatMap(phase => phase.events.map(event => event.id)));
const recipe = id => {
  const value = FORGERY_ITEMS.find(item => item.id === id);
  assert.ok(value, `Item ausente: ${id}`);
  return value;
};

test('guias cobrem missões individuais sem alterar o roteiro persistido', () => {
  assert.equal(QUEST_GUIDES.length, 16);
  assert.equal(new Set(QUEST_GUIDES.map(guide => guide.id)).size, QUEST_GUIDES.length);
  for (const guide of QUEST_GUIDES) {
    assert.ok(guide.steps.length >= 4, `Passos insuficientes em ${guide.id}`);
    assert.ok(guide.preparation.length > 0);
    assert.ok(guide.references.every(url => url.startsWith('https://')));
    assert.ok(guide.relatedEventIds.every(id => knownEvents.has(id)), `Marco desconhecido em ${guide.id}`);
  }
  assert.equal(questGuidesForEvent('b03')[0].id, 'short_sighted');
  assert.equal(questGuidesForEvent('m02')[0].id, 'new_recruit');
  assert.equal(questGuidesForEvent('m04').length, 3);
  assert.equal(questGuidesForEvent('m02').length, 2);
  assert.equal(questGuidesForEvent('v102').length, 3);
  assert.equal(questGuidesForEvent('v103').length, 3);
  assert.equal(questGuidesForEvent('v107').length, 1);
  assert.equal(questGuidesForEvent('v202').length, 1);
  assert.ok(questGuidesForEvent('v206').some(guide => guide.id === 'spellbound'));
  assert.ok(questGuidesForEvent('v103').some(guide => guide.id === 'caged_magistrate'));
  assert.equal(PHASES.flatMap(phase => phase.events).length, 53);
});

test('falsificações preservam destinos originais e não confundem Trysha e Myrddin', () => {
  assert.equal(FORGERY_ITEMS.length, 8);
  assert.equal(new Set(FORGERY_ITEMS.map(item => item.id)).size, FORGERY_ITEMS.length);
  for (const item of FORGERY_ITEMS) {
    assert.ok(item.references.length >= 2);
    assert.ok(item.references.every(url => url.startsWith('https://')));
    assert.ok(item.originalTo && item.copyTo && item.forged);
  }
  for (const id of ['fulminous_shield','nations_death_knell','howling_blizzard','towering_earth','let_there_be_light']) {
    assert.match(recipe(id).originalTo, /Trysha/);
    assert.match(recipe(id).copyTo, /Myrddin/);
  }
  assert.equal(recipe('jadeite_orb').originalTo, 'Everard');
  assert.equal(recipe('jadeite_orb').copyTo, 'Offulve');
  assert.match(recipe('transference_souls_2').originalTo, /Guarde/);
  assert.equal(recipe('transference_souls_2').copyTo, 'Isaac');
  assert.match(recipe('gaol_key').originalTo, /Brant/);
  assert.match(recipe('gaol_key').copyTo, /Guarde/);
});

test('fichas não exigem cinco grimórios nem prometem todos os itens funcionando após cópia', () => {
  const trysha = QUEST_GUIDES.find(guide => guide.id === 'spellbound');
  const myrddin = QUEST_GUIDES.find(guide => guide.id === 'sorcerers_appraisal');
  assert.ok(trysha && myrddin);
  assert.match(trysha.preparation.join(' '), /três grimórios autênticos/);
  assert.match(myrddin.preparation.join(' '), /três falsificações/);
  assert.doesNotMatch(trysha.steps.join(' '), /cinco.*obrigat/i);
  assert.match(recipe('gaol_key').action, /cópia funcional/i);
});

const guide = id => {
  const result = QUEST_GUIDES.find(item => item.id === id);
  assert.ok(result, `Guia ausente: ${id}`);
  return result;
};

test('onda 2: missões de Melve e Vernworth têm etapas sem misturar destinos', () => {
  const ids = [
    'provisioners_plight', 'brothers_brave', 'vocation_frustration',
    'gift_of_bow', 'trial_of_archery', 'heel_of_history',
    'ornate_box', 'readvent_calamity'
  ];
  for (const id of ids) {
    assert.ok(guide(id).steps.length >= 5, `Poucas etapas em ${id}`);
    assert.equal(guide(id).references.length, 2, `Fontes em ${id}`);
  }
  assert.match(guide('provisioners_plight').steps.join(' '), /três Harspuds e os dois Salubrious Draughts/);
  assert.match(guide('provisioners_plight').completion, /Geoffrey/);
  assert.match(guide('brothers_brave').completion, /escolta/);
  assert.match(guide('vocation_frustration').preparation.join(' '), /consome as armas/i);
  assert.match(guide('gift_of_bow').preparation.join(' '), /Arqueiro/);
  assert.match(guide('trial_of_archery').steps.join(' '), /Doireann/);
  assert.match(guide('heel_of_history').steps.join(' '), /Malcolm/);
  assert.match(guide('ornate_box').steps.join(' '), /outros dois dias/);
});

test('Revinda da Calamidade: sem gatilho inventado e com retorno a Lennart', () => {
  const ulrika = guide('readvent_calamity');
  assert.match(ulrika.steps.join(' '), /Harve/);
  assert.match(ulrika.completion, /Lennart/);
  assert.doesNotMatch(ulrika.preparation.join(' '), /atravesse a fronteira|obrigatório ir a Battahl|guias divergem/i);
});
