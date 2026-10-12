import test from 'node:test';
import assert from 'node:assert/strict';
import { QUEST_GUIDES, FORGERY_ITEMS } from '../src/data/questGuides.ts';
import { PHASES } from '../src/data/roadmapData.ts';
import { QUEST_ITEM_REQUIREMENTS, QUESTS_WITHOUT_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';

const withItems = Object.keys(QUEST_ITEM_REQUIREMENTS);
const noItems = [...QUESTS_WITHOUT_ITEM_REQUIREMENTS];

test('inventário editorial inclui TODAS as fichas e exige origem, quantidade e destino de cada item', () => {
  const ids = QUEST_GUIDES.map(guide => guide.id).sort();
  assert.equal(QUEST_GUIDES.length, 44);
  assert.equal(withItems.length, 28);
  assert.equal(noItems.length, 16);
  assert.deepEqual([...withItems, ...noItems].sort(), ids, 'Cada guia deve ser classificado e nenhum pode ficar sem avaliação de itens');
  assert.equal(new Set([...withItems, ...noItems]).size, ids.length);
  for (const [id, section] of Object.entries(QUEST_ITEM_REQUIREMENTS)) {
    assert.ok(section.guidance.length > 25, id);
    assert.ok(section.items.length >= 1, id);
    for (const item of section.items) {
      for (const field of ['name', 'quantity', 'where', 'use']) {
        assert.ok(item[field]?.length >= (field === 'quantity' ? 1 : 3), id + ': ' + field);
      }
      assert.ok(['original', 'copy', 'optional', 'not-applicable'].includes(item.forgery), id);
    }
    assert.ok((section.references ?? []).every(url => url.startsWith('https://')));
  }
});

test('Trysha: cinco livros localizados, três originais diferentes; Myrddin: três cópias de títulos diferentes', () => {
  const originals = QUEST_ITEM_REQUIREMENTS.spellbound;
  const fakes = QUEST_ITEM_REQUIREMENTS.sorcerers_appraisal;
  const titles = FORGERY_ITEMS.slice(0, 5).map(book => book.item);
  const copyOptions = fakes.items.filter(item => item.forgery === 'copy');
  const conditionalRing = fakes.items.find(item => item.name === 'Turquoise Ring');
  assert.ok(conditionalRing?.optional, 'Anel Turquesa precisa constar como item condicional');
  assert.match(conditionalRing.where, /Trysha/);
  assert.deepEqual(originals.items.map(item => item.name), titles);
  assert.deepEqual(copyOptions.map(item => item.name), titles);
  for (const entry of originals.items) {
    assert.equal(entry.forgery, 'original');
    assert.match(entry.quantity, /3 dos 5/);
    assert.match(entry.use, /original a Trysha/);
    assert.ok(entry.where.length > 35);
  }
  for (const entry of copyOptions) {
    assert.equal(entry.forgery, 'copy');
    assert.match(entry.use, /falsificação/);
    assert.match(entry.use, /Ibrahim/);
  }
  const all = originals.items.map(x => x.where).join(' ');
  assert.match(all, /Dudley.*5.000 G/);
  assert.match(all, /Campo de Batalha Antigo/);
  assert.match(all, /Caverna da Cascata/);
  assert.match(all, /Wendy/);
  assert.match(all, /Waldhar/);
  assert.match(all, /Myrddin/);
  assert.match(fakes.guidance, /Turquoise Ring/);
  assert.match(fakes.items[0].name, /Courtly Tunic/);
  assert.equal(fakes.items[0].forgery, 'not-applicable');
});

test('itens sensíveis: preservar versões e não falsificar itens comuns desnecessariamente', () => {
  assert.match(QUEST_ITEM_REQUIREMENTS.jadeite.items[0].use, /ORIGINAL a Everard.*CÓPIA a Offulve/);
  assert.match(QUEST_ITEM_REQUIREMENTS.short_sighted.items[0].use, /família de Isaac/);
  assert.match(QUEST_ITEM_REQUIREMENTS.new_godsway.items.find(x => x.name === 'Wyrmslife Crystals').quantity, /^15$/);
  assert.match(QUEST_ITEM_REQUIREMENTS.sotted_sage.items.find(x => x.name === 'Newt Liqueur').quantity, /3 garrafas/);
  assert.match(QUEST_ITEM_REQUIREMENTS.nesting.items.map(x => x.name).join(' / '), /Barris explosivos.*Jarro de veneno/);
  assert.match(QUEST_ITEM_REQUIREMENTS.nation_lambent_flame.guidance, /não há requisito universal de máscara/);
  assert.equal(QUEST_ITEM_REQUIREMENTS.guardian_gigantus.items[0].optional, true);
});

test('prólogo: grifo, nunca esfinge/grifo; preserva 53 marcos e 60 conquistas', () => {
  const all = PHASES.flatMap(phase => phase.events);
  const intro = all.find(event => event.id === 'm01');
  assert.ok(intro);
  assert.match(intro.note, /ataque de um grifo/);
  assert.doesNotMatch(intro.note, /esfinge\/grifo/i);
  assert.equal(all.length, 53);
  const allAchievements = new Set(PHASES.flatMap(p => p.achievements.map(a => a.id)));
  assert.equal(allAchievements.size, 60);
});

test('itens possuem traduções oficiais da build e identificação das falsificações em PT-BR', () => {
  const expectedGrimoires = [
    { name: 'Fulminous Shield', namePt: 'Escudo Fulminante', forged: 'Fruminous Shield', forgedPt: 'Escudo Fulgentante' },
    { name: "Nation's Death Knell", namePt: 'Dobre de Finados da Nação', forged: "Nation's Death Knock", forgedPt: 'Dobla de Finados da Nação' },
    { name: 'Howling Blizzard', namePt: 'Nevasca Uivante', forged: 'Hurling Blizzard', forgedPt: 'Nevasca Ululante' },
    { name: 'Towering Earth', namePt: 'Terra Imponente', forged: 'Lowering Earth', forgedPt: 'Terra Impendente' },
    { name: 'Let There Be Light', namePt: 'Que Haja Luz', forged: 'Let There Be Lite', forgedPt: 'Que Haja Lustre' }
  ];

  for (const expected of expectedGrimoires) {
    const book = FORGERY_ITEMS.find(item => item.item === expected.name);
    assert.ok(book, `Livro ausente em FORGERY_ITEMS: ${expected.name}`);
    assert.equal(book.itemPt, expected.namePt);
    assert.equal(book.forged, expected.forged);
    assert.equal(book.forgedPt, expected.forgedPt);

    const tryshaItem = QUEST_ITEM_REQUIREMENTS.spellbound.items.find(item => item.name === expected.name);
    assert.ok(tryshaItem);
    assert.equal(tryshaItem.namePt, expected.namePt);
    assert.equal(tryshaItem.forgedName, expected.forged);
    assert.equal(tryshaItem.forgedNamePt, expected.forgedPt);

    const myrddinItem = QUEST_ITEM_REQUIREMENTS.sorcerers_appraisal.items.find(item => item.name === expected.name);
    assert.ok(myrddinItem);
    assert.equal(myrddinItem.namePt, expected.namePt);
  }

  // Falsificações e itens-chave verificados na instalação
  assert.equal(QUEST_ITEM_REQUIREMENTS.jadeite.items[0].namePt, 'Esfera de Jade / Esfera de Jaspe');
  assert.equal(QUEST_ITEM_REQUIREMENTS.jadeite.items[0].forgedNamePt, 'Esfera de Jaspe');

  assert.equal(QUEST_ITEM_REQUIREMENTS.short_sighted.items[0].namePt, 'A Transferência de Almas 2 / A Transparência de Almas 2');
  assert.equal(QUEST_ITEM_REQUIREMENTS.short_sighted.items[0].forgedNamePt, 'A Transparência de Almas 2');

  assert.equal(QUEST_ITEM_REQUIREMENTS.caged_magistrate.items[0].namePt, 'Chave da Prisão / Chave Frágil da Prisão');
  assert.equal(QUEST_ITEM_REQUIREMENTS.caged_magistrate.items[0].forgedNamePt, 'Chave Frágil da Prisão');

  assert.equal(QUEST_ITEM_REQUIREMENTS.new_godsway.items[0].namePt, 'Espada da Sucessão Vil Cega');
  assert.equal(QUEST_ITEM_REQUIREMENTS.new_godsway.items[1].namePt, 'Cristal de Serserpe');

  assert.equal(QUEST_ITEM_REQUIREMENTS.sotted_sage.items[0].namePt, 'Licor de Salamandra');
  assert.equal(QUEST_ITEM_REQUIREMENTS.sotted_sage.items[1].namePt, 'Máscara de Leoterian');

  assert.equal(QUEST_ITEM_REQUIREMENTS.sorcerers_appraisal.items[0].namePt, 'Túnica Cortês + Calção Cortês');
});


test('quatro evacuações: distinguir materiais condicionais de objetos de entrega obrigatória', () => {
  const map = QUEST_ITEM_REQUIREMENTS;
  const food = map.civil_unrest.items;
  assert.equal(food.length, 1);
  assert.equal(food[0].optional, true);
  assert.match(food[0].use, /Glintt e Nomos/);
  const cutting = map.wandering_roots.items;
  assert.equal(cutting.length, 1);
  assert.equal(cutting[0].optional, true);
  assert.match(map.wandering_roots.guidance, /conversas com Taliesin/);
  assert.equal(map.aiding_ernesto.items.length, 2);
  assert.ok(map.aiding_ernesto.items.every(item => item.optional), 'Teleporte não pode ser marcado obrigatório');
  assert.match(map.aiding_ernesto.guidance, /Não há item obrigatório/);
  const shepherd = map.shepherd_pawns.items;
  assert.equal(shepherd.length, 2);
  assert.ok(shepherd.every(item => !item.optional));
  assert.match(shepherd[0].where, /Henrique/);
  assert.match(shepherd[1].where, /cabana trancada/);
  assert.match(shepherd[1].use, /Henrique/);
  assert.equal(shepherd[1].forgery, 'original');
});
