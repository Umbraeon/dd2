import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { DEFAULT_PROGRESS } from '../src/utils/storage.ts';
import { firstPendingStep, listJourneySteps } from '../src/utils/journey.ts';

const steps = listJourneySteps(PHASES);
const stage = id => {
  const result = steps.find(({ event }) => event.id === id);
  assert.ok(result, `Marco não encontrado: ${id}`);
  return result;
};

test('entrada em Battahl reconhece permissões condicionais e tarefa na fronteira, antes da cidade', () => {
  const border = stage('b01').event;
  assert.match(border.note, /Cidade de Descanso da Fronteira/);
  assert.match(border.note, /humano/);
  assert.match(border.note, /Máscara de Ferídeo/);
  assert.match(border.note, /Uma Sombra à Espreita/);
  assert.match(border.note, /Piedade entre Ladrões/);
  assert.ok(border.note.indexOf('Piedade entre Ladrões') < border.note.indexOf('Rockmouse'));
  assert.match(stage('b02').event.note, /primeira travessia/);
  assert.equal(stage('b01').phase.id, 'battahl');
});

test('Vernworth separa missão principal, cadeia opcional de Sven e divergência do baile posterior', () => {
  assert.match(stage('v104').event.note, /Correspondência Mascarada.*Masked Correspondence/);
  assert.match(stage('v104').event.note, /NÃO é condição para concluir/);
  const exchange = stage('b12').event;
  assert.match(exchange.note, /Game8 exige/);
  assert.match(exchange.note, /PowerPyx descreve/);
  assert.match(exchange.prerequisites ?? '', /Correspondência Mascarada/);
  assert.ok((exchange.extraSources ?? []).some(source => source.includes('A-Noble-Exchange')));
  assert.equal(stage('b12').phase.id, 'battahl', 'marco da janela de retorno, não novo capítulo geográfico');
});

test('missões compostas não ocultam urgência da cerimônia nem impõem prazo a todo o grupo', () => {
  const group = stage('b02').event;
  assert.match(group.note, /Orações Ensombradas.*Shadowed Prayers/);
  assert.match(group.note, /cerimônia.*pela manhã/);
  assert.match(group.note, /NÃO deve ser adiada/);
  assert.match(group.failureRisk ?? '', /identifique o assassino imediatamente/);
  assert.notEqual(group.isTimed, true, 'grupo inteiro não é necessariamente temporizado');
  assert.match(group.note, /gatilhos próprios/);
});

test('atividade de Glyndwr tem janelas e viagens distintas, sem ser etapa urbana obrigatória', () => {
  const row = stage('v102').event;
  assert.match(row.note, /O Dom do Arco.*Gift of the Bow/);
  assert.match(row.note, /A Prova de Arco e Flecha.*A Trial of Archery/);
  assert.match(row.note, /só fica disponível depois de concluir/);
  assert.match(row.note, /Bosque Sagrado/);
});

test('compatibilidade: mesmos 72 IDs, 60 conquistas, índice de progresso inalterado', () => {
  assert.equal(steps.length, 72);
  assert.equal(new Set(steps.map(({event}) => event.id)).size, 72);
  assert.equal(PHASES.flatMap(p=>p.achievements).length, 60);
  const p = { ...DEFAULT_PROGRESS, steps: { m01: true, b01: true }, activeStepId: 'b01' };
  const pending = firstPendingStep(PHASES, p);
  assert.ok(pending);
  assert.equal(p.steps.b01, true);
  assert.equal(p.activeStepId, 'b01');
});
