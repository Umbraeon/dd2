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
  assert.equal(QUEST_GUIDES.length, 27);
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
  assert.equal(questGuidesForEvent('v202').length, 4);
  assert.equal(questGuidesForEvent('v301').length, 2);
  assert.equal(questGuidesForEvent('v303').length, 6);
  assert.equal(questGuidesForEvent('v304').length, 2);
  assert.equal(questGuidesForEvent('v104').length, 1);
  assert.equal(questGuidesForEvent('v201').length, 3);
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

test('onda 3: investigação, baile e coroação têm sequências individualizadas', () => {
  const ids = ['disas_plot', 'stolen_throne', 'arisen_shadow',
    'nameless_village', 'feast_deception', 'home_hearth'];
  for (const id of ids) {
    const entry = guide(id);
    assert.ok(entry.steps.length >= 4, `Passo a passo curto: ${id}`);
    assert.equal(entry.references.length, 2);
  }
  assert.match(guide('disas_plot').steps.join(' '), /evidência.*Disa|carta.*evidência/i);
  assert.match(guide('stolen_throne').steps.join(' '), /passagem secreta/);
  assert.match(guide('arisen_shadow').steps.join(' '), /Bermudo/);
  assert.match(guide('nameless_village').steps.join(' '), /Flaude.*Srail/);
  assert.match(guide('feast_deception').steps.join(' '), /missões pendentes antes de confirmar/);
  assert.match(guide('home_hearth').steps.join(' '), /quatro espadas/);
  assert.match(guide('home_hearth').completion, /Ulrika/);
  assert.doesNotMatch(guide('feast_deception').completion, /todas as missões abertas.*canceladas/i);
});

test('passos de coronação e Wilhelmina não expõem hipóteses internas', () => {
  const copy = [...QUEST_GUIDES.filter(g => ['feast_deception', 'home_hearth'].includes(g.id))
    .flatMap(g => [...g.preparation, ...g.steps, g.completion])].join(' ');
  assert.doesNotMatch(copy, /walkthroughs divergem|fonte única|não comprovado|em auditoria|não foi reproduzido/i);
});

test('onda 4: cinco missões novas possuem passos, fontes e destinos independentes', () => {
  const ids = ['monster_culling', 'scaly_invaders', 'trouble_cape', 'till_death', 'every_rose'];
  for (const id of ids) {
    const entry = guide(id);
    assert.ok(entry.steps.length >= 5, `Passos incompletos: ${id}`);
    assert.equal(entry.references.length, 2, `Duas fontes em ${id}`);
    assert.ok(entry.relatedEventIds.every(eventId => knownEvents.has(eventId)));
    assert.ok(entry.completion.length > 35, `Conclusão incompleta: ${id}`);
  }
  assert.match(guide('monster_culling').steps.join(' '), /Mina de Trevo.*Harve.*Floresta Oriental/s);
  assert.match(guide('scaly_invaders').steps.join(' '), /segundo grupo/);
  assert.match(guide('trouble_cape').steps.join(' '), /Zoran/);
  assert.match(guide('till_death').completion, /objetivos distintos/);
  assert.match(guide('every_rose').steps.join(' '), /Sven.*Patrick.*Murder Report.*Bribery Investigation Findings/s);
  assert.match(guide('every_rose').preparation.join(' '), /três dias no jogo/);
  assert.match(guide('every_rose').completion, /depois que você aceita/);
  assert.equal(questGuidesForEvent('v201').filter(g => ['monster_culling', 'scaly_invaders'].includes(g.id)).length, 2);
  assert.equal(questGuidesForEvent('v203').find(g => g.id === 'till_death')?.id, 'till_death');
});
