import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES } from '../src/data/roadmapData.ts';
import { DEFAULT_PROGRESS } from '../src/utils/storage.ts';
import { resolveJourney } from '../src/utils/journey.ts';

const events = PHASES.flatMap(phase => phase.events);
const event = id => events.find(item => item.id === id);

test('Wilhelmina: flag de prazo preservada, condição explícita sem inferir início pelo progresso', () => {
  const rose = event('v302');
  assert.equal(rose.isTimed, true);
  assert.equal(rose.isMissable, true);
  assert.match(rose.timedTrigger, /aceitar ajudar Wilhelmina/);
  assert.match(rose.failureRisk, /Depois de aceitar/);
  for (const activeStepId of [undefined, 'v302']) {
    const progress = { ...structuredClone(DEFAULT_PROGRESS), activeStepId };
    const before = JSON.stringify(progress);
    resolveJourney(PHASES, progress);
    assert.equal(JSON.stringify(progress), before, 'navegar/fixar não inicia relógio');
  }
});

test('regras de classificação existentes permanecem intactas', () => {
  assert.equal(events.length, 72);
  assert.equal(PHASES.flatMap(phase => phase.achievements).length, 60);
  assert.equal(event('b02').isTimed, undefined, 'grupo heterogêneo sem prazo único');
  assert.equal(event('m02').timedTrigger, undefined, 'não atribuir gatilho desconhecido por inferência');
});
