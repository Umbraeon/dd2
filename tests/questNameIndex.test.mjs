import test from 'node:test';
import assert from 'node:assert/strict';
import { QUEST_NAME_INDEX, questNamesForEvent } from '../src/data/questNameIndex.ts';
import { PHASES } from '../src/data/roadmapData.ts';

test('63 pares únicos do mapeamento têm nomes EN/PT-BR não vazios', () => {
  assert.equal(QUEST_NAME_INDEX.length, 63);
  assert.equal(new Set(QUEST_NAME_INDEX.map(item => item.english)).size, 63);
  assert.equal(new Set(QUEST_NAME_INDEX.map(item => item.ptBR)).size, 63);
  for (const item of QUEST_NAME_INDEX) {
    assert.ok(item.ptBR.trim() && item.english.trim());
    assert.ok(item.eventIds.length >= 1);
  }
});

test('7 amostras PAK reportadas têm chave, recurso e hash; 52 pareadas e 4 de catálogo Kiranico', () => {
  const samples = QUEST_NAME_INDEX.filter(item => item.evidence === 'pak_sample_reported');
  assert.equal(samples.length, 7);
  for (const item of samples) {
    assert.match(item.titleKey, /^Mes_.*_log_title$/);
    assert.match(item.resourcePath, /^natives\/stm\/message\/questlog\/.+\.msg\.24$/);
    assert.match(item.sha256, /^[A-F0-9]{64}$/);
  }
  assert.equal(QUEST_NAME_INDEX.filter(item => item.evidence === 'paired_catalog').length, 52);
  assert.ok(QUEST_NAME_INDEX.filter(item => item.evidence === 'paired_catalog').every(item => !item.sha256 && !item.titleKey));
});

test('cada nome referencia um marco conhecido, ou anotação auxiliar MAISTER', () => {
  const ids = new Set(PHASES.flatMap(p => p.events.map(e => e.id)));
  for (const item of QUEST_NAME_INDEX) {
    for (const id of item.eventIds)
      assert.ok(ids.has(id) || id.startsWith('MAISTER:'), 'Referência sem alvo: ' + id);
  }
  assert.equal(questNamesForEvent('d01').length, 2);
  assert.deepEqual(questNamesForEvent('d01').map(x => x.ptBR), ['Notícias Congelantes', 'Rituais Perdidos']);
  const mercy = QUEST_NAME_INDEX.find(x => x.ptBR === 'Piedade entre Ladrões');
  assert.equal(mercy.english, 'Mercy among Thieves');
  assert.ok(questNamesForEvent('b02').includes(mercy));
});

test('índice é somente leitura; marcos e conquistas existentes permanecem estáveis', () => {
  assert.equal(PHASES.length, 9);
  assert.equal(PHASES.flatMap(p => p.events).length, 53);
  assert.equal(PHASES.flatMap(p => p.achievements).length, 60);
  assert.deepEqual(questNamesForEvent('___inexistente___'), []);
});

test('três novos nomes PT-BR são sustentados por catálogo localizado, não hashes PAK inventados', () => {
  const expected = [
    ['An Unsettling Encounter', 'Um Encontro Perturbador'],
    ['Flickering Shadows', 'Sombras Trêmulas'],
    ['Convergence', 'Convergência']
  ];
  assert.equal(QUEST_NAME_INDEX.filter(x => x.evidence === 'kiranico_ptbr').length, 4);
  for (const [english, ptBR] of expected) {
    const q = QUEST_NAME_INDEX.find(x => x.english === english);
    assert.ok(q);
    assert.equal(q.ptBR, ptBR);
    assert.equal(q.evidence, 'kiranico_ptbr');
    assert.equal(q.sourceUrl, 'https://dragonsdogma2.kiranico.com/pt-BR/data/quests');
    assert.equal(q.sha256, undefined);
    assert.equal(q.titleKey, undefined);
  }
});

test('A Presa da Alcateia tem nome do catálogo PT-BR e não inventa hash de PAK', () => {
  const q = QUEST_NAME_INDEX.find(row => row.english === 'Prey for the Pack');
  assert.ok(q);
  assert.equal(q.ptBR, 'A Presa da Alcateia');
  assert.equal(q.evidence, 'kiranico_ptbr');
  assert.equal(q.sourceUrl, 'https://dragonsdogma2.kiranico.com/pt-BR/data/quests');
  assert.deepEqual(q.eventIds, ['v206']);
  assert.equal(q.sha256, undefined);
});
