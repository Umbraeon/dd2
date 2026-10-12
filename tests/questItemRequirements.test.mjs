import test from 'node:test';
import assert from 'node:assert/strict';
import { QUEST_GUIDES, FORGERY_ITEMS } from '../src/data/questGuides.ts';
import { PHASES } from '../src/data/roadmapData.ts';
import { QUEST_ITEM_REQUIREMENTS, QUESTS_WITHOUT_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';

const withItems = Object.keys(QUEST_ITEM_REQUIREMENTS);
const noItems = [...QUESTS_WITHOUT_ITEM_REQUIREMENTS];

test('inventário editorial inclui TODAS as fichas e exige origem, quantidade e destino de cada item', () => {
  const ids = QUEST_GUIDES.map(guide => guide.id).sort();
  assert.equal(QUEST_GUIDES.length, 37);
  assert.equal(withItems.length, 24);
  assert.equal(noItems.length, 13);
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
  assert.deepEqual(originals.items.map(item => item.name), titles);
  assert.deepEqual(fakes.items.slice(1).map(item => item.name), titles);
  for (const entry of originals.items) {
    assert.equal(entry.forgery, 'original');
    assert.match(entry.quantity, /3 dos 5/);
    assert.match(entry.use, /original a Trysha/);
    assert.ok(entry.where.length > 35);
  }
  for (const entry of fakes.items.slice(1)) {
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
