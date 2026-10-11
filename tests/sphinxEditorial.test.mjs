import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PHASES, SPHINX_RIDDLES } from '../src/data/roadmapData.ts';

const modal = readFileSync(new URL('../src/components/SphinxTrackerModal.tsx', import.meta.url), 'utf8');
const byId = id => {
  const riddle = SPHINX_RIDDLES.find(item => item.id === id);
  assert.ok(riddle, `Enigma ausente: ${id}`);
  return riddle;
};

test('a Esfinge preserva dez enigmas sem avisos absolutos por desafio', () => {
  assert.equal(SPHINX_RIDDLES.length, 10);
  assert.equal(new Set(SPHINX_RIDDLES.map(item => item.id)).size, 10);
  assert.ok(SPHINX_RIDDLES.every(item => !item.warning));
  assert.doesNotMatch(modal, /a Esfinge voará embora para sempre e os baús trancarão/i);
  assert.doesNotMatch(modal, /cada enigma[^.]*prazo de (?:7|sete) dias/i);
  assert.match(modal, /pode continuar os demais/i);
});

test('o prazo de sete dias pertence à Ruminação e não aos demais enigmas', () => {
  assert.match(byId('sphinx_rumination').solution, /sete dias no jogo/i);
  for (const riddle of SPHINX_RIDDLES.filter(item => item.id !== 'sphinx_rumination')) {
    assert.doesNotMatch(riddle.solution, /prazo de (?:7|sete) dias/i);
  }
});

test('Memória permite contar baús desbloqueados e usa ordem variável da fronteira', () => {
  assert.match(byId('sphinx_memory').solution, /baús de recompensa/i);
  assert.match(byId('sphinx_memory').solution, /Reunião/i);
  assert.match(byId('sphinx_memory').solution, /ordem.+varia/i);
});

test('Diário não declara fim da Esfinge ao errar vaso ou número de estátuas', () => {
  const events = PHASES.flatMap(phase => phase.events);
  for (const id of ['v205', 'b06']) {
    const entry = events.find(event => event.id === id);
    assert.ok(entry, id);
    assert.doesNotMatch(entry.failureRisk, /tranca permanentemente os baús restantes|encerra o evento/i);
    assert.match(entry.failureRisk, /Confira|Antes de responder/i);
  }
  const final = events.find(entry => entry.id === 'b062');
  assert.ok(final);
  assert.match(final.note, /Antes do último enigma/);
});
