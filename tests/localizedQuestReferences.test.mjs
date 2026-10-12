import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES, MAISTER_SKILLS, RISK_CHECKPOINTS } from '../src/data/roadmapData.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';

const contentStrings = [
  ...PHASES.flatMap(phase => [
    phase.cue,
    ...phase.events.flatMap(event => [event.title, event.note, event.failureRisk, event.prerequisites].filter(Boolean)),
    ...phase.achievements.map(achievement => achievement.tip)
  ]),
  ...MAISTER_SKILLS.flatMap(skill => [skill.questOrCondition, skill.missableNote].filter(Boolean)),
  ...RISK_CHECKPOINTS.flatMap(checkpoint => [checkpoint.title, checkpoint.description, ...checkpoint.verificationList])
];

test('nomes de missões EN referidos em orientações têm o nome PT-BR na mesma frase', () => {
  const bilingual = new Set();
  for (const line of contentStrings) {
    for (const quest of QUEST_NAME_INDEX) {
      if (!line.includes(quest.english)) continue;
      assert.ok(line.includes(quest.ptBR), `${quest.english} aparece sozinho em: ${line}`);
      bilingual.add(quest.english);
    }
  }
  assert.ok(bilingual.size >= 28, `Só ${bilingual.size} títulos EN/PT-BR encontrados nas orientações`);
  assert.ok(contentStrings.some(line => line.includes('Piedade entre Ladrões') && line.includes('Mercy among Thieves')));
  assert.ok(contentStrings.some(line => line.includes('A Prova de Arco e Flecha') && line.includes('A Trial of Archery')));
});

test('avisos de coroação e saves não garantem perda irreversível ou rollback automático', () => {
  const preCoronation = PHASES.find(phase => phase.id === 'vernworth3');
  assert.ok(preCoronation);
  assert.match(preCoronation.cue, /O Banquete da Farsa/);
  assert.doesNotMatch(preCoronation.cue, /cancela missões antigas pendentes/i);
  const checkpoint = RISK_CHECKPOINTS.find(x => x.id === 'cp1_feast');
  assert.ok(checkpoint);
  assert.match(checkpoint.title, /O Banquete da Farsa/);
  const gig = PHASES.flatMap(phase => phase.achievements).find(ach => ach.id === 44);
  assert.ok(gig);
  assert.match(gig.tip, /salvamento|pousada/i);
  assert.doesNotMatch(gig.tip, /Salve antes na pousada!/i);
});

test('IDs, totais e índice de 70 referências não foram alterados', () => {
  const events = PHASES.flatMap(phase => phase.events);
  const achievements = PHASES.flatMap(phase => phase.achievements);
  assert.equal(events.length, 53);
  assert.equal(achievements.length, 60);
  assert.equal(RISK_CHECKPOINTS.length, 4);
  assert.equal(QUEST_NAME_INDEX.length, 70);
});
