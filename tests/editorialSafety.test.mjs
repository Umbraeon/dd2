import test from 'node:test';
import assert from 'node:assert/strict';
import { PHASES, RISK_CHECKPOINTS, ROADMAP_METADATA, SPHINX_RIDDLES } from '../src/data/roadmapData.ts';

const events = PHASES.flatMap(phase => phase.events);
const achievements = PHASES.flatMap(phase => phase.achievements);
const event = id => {
  const found = events.find(item => item.id === id);
  assert.ok(found, `O marco ${id} precisa continuar existindo`);
  return found;
};
const checkpoint = id => {
  const found = RISK_CHECKPOINTS.find(item => item.id === id);
  assert.ok(found, `O checkpoint ${id} precisa continuar existindo`);
  return found;
};
const fullText = value => [value.title ?? '', value.note ?? '', value.failureRisk ?? '', value.description ?? '', ...(value.verificationList ?? [])].join(' ');

test('correções não renumeram os 53 marcos, 60 conquistas ou 4 checkpoints persistidos', () => {
  assert.equal(PHASES.length, 9);
  assert.equal(events.length, 53);
  assert.equal(achievements.length, 60);
  assert.equal(new Set(events.map(item => item.id)).size, 53);
  assert.equal(new Set(achievements.map(item => item.id)).size, 60);
  assert.deepEqual(achievements.map(item => item.id).sort((a, b) => a - b), Array.from({ length: 60 }, (_, i) => i + 1));
  assert.deepEqual(RISK_CHECKPOINTS.map(item => item.id), [
    'cp1_feast', 'cp2_gigantus', 'cp3_confrontation', 'cp4_unmoored_evac'
  ]);
  assert.equal(event('u04').achievements[0], 36);
  assert.equal(event('u05').achievements[0], 37);
  assert.equal(event('p05').achievements[0], 44);
  assert.equal(event('u01').achievements[0], 40);
  assert.ok(!ROADMAP_METADATA.title.includes('100%'));
});

test('Melve distingue Phill/Accardo, Lennart e Ian sem atribuir ninhos a Ian', () => {
  const initial = fullText(event('m02'));
  const melve = fullText(event('m04'));
  assert.match(initial, /Accardo/);
  assert.match(initial, /Phill/);
  assert.doesNotMatch(initial, /resgate de Rook/i);
  assert.match(melve, /Flora/);
  assert.match(melve, /Lennart/);
  assert.match(melve, /Ian/);
  assert.match(melve, /Norbert/);
  assert.match(melve, /Problemas Aninhados/);
  assert.match(melve, /Bravura Revigorante/);
});

test('Wilhelmina não é descrita como obrigação de concluir antes da coroação', () => {
  const preparation = fullText(event('v302'));
  const before = fullText(event('v303'));
  const after = fullText(event('v304'));
  assert.match(preparation, /após 'O Banquete da Farsa' \(Feast of Deception\)/);
  assert.match(preparation, /três dias/);
  assert.match(before, /NÃO tratar|pode surgir após/i);
  assert.match(after, /Wilhelmina/);
  assert.match(checkpoint('cp1_feast').verificationList.join(' '), /logo após a coroação/);
  assert.doesNotMatch(before, /missões serão CANCELADAS se estiverem abertas/);
  assert.doesNotMatch(before, /Every Rose Has Its Thorn.*CANCELADAS/);
  assert.match(fullText(checkpoint('cp1_feast')), /O Banquete da Farsa/);
  assert.doesNotMatch(PHASES.find(phase => phase.id === 'vernworth3').cue, /cancela missões antigas pendentes/i);
});

test('checkpoints distinguem os tipos de save e nunca prometem rollback infalível', () => {
  for (const id of ['v303', 'p04', 'p05', 'p06']) {
    assert.doesNotMatch(fullText(event(id)), /salvamento manual na Pousada|restauração segura garantida/i);
  }
  assert.match(fullText(event('p04')), /salvamento automático, intermediário e último descanso na pousada/);
  assert.match(fullText(checkpoint('cp2_gigantus')), /salvamento|save/);
  assert.match(fullText(checkpoint('cp3_confrontation')), /Novo Jogo\+/);
});

test('Mundo Desancorado inclui as cinco quests distintas de evacuação sem inferir gatilho exato do troféu', () => {
  const evac = fullText(event('u04'));
  for (const name of [
    'A Determinação do Príncipe Regente',
    'Instabilidade Civil',
    'Raízes Errantes',
    'A Importância de Ajudar Ernesto',
    'Pastor de Peões'
  ]) assert.ok(evac.includes(name), name);
  assert.match(evac, /Henrique/);
  assert.match(evac, /CINCO MISSÕES/);
  assert.match(evac, /não foi comprovado que 'O Guardião' só desbloqueie na quinta/);
  assert.match(fullText(checkpoint('cp4_unmoored_evac')), /Local de Escavação/);
});

test('feixe final é separado de marcador azul e das provas, sem falsa contagem fixa', () => {
  const beacons = fullText(event('u05'));
  assert.match(beacons, /AZUL/);
  assert.match(beacons, /VERMELHO FINAL/);
  assert.doesNotMatch(beacons, /4 feixes vermelhos periféricos/);
  assert.match(fullText(checkpoint('cp4_unmoored_evac')), /feixe vermelho final/);
});

test('eventos editoriais alterados têm pelo menos uma fonte direta não-vazia', () => {
  for (const id of ['m02', 'm04', 'v302', 'v303', 'v304', 'p04', 'p05', 'p06', 'u01', 'u04', 'u05']) {
    const selected = event(id);
    assert.match(selected.source, /^https:\/\//);
    assert.ok(!selected.extraSources || selected.extraSources.every(url => url.startsWith('https://')));
  }
});


test('Esfinge diferencia os gêmeos nas duas metades da Cidade de Descanso da Fronteira', () => {
  const diff = SPHINX_RIDDLES.find(item => item.id === 'sphinx_diff');
  assert.ok(diff);
  assert.match(diff.solution, /Dante.*NORTE/);
  assert.match(diff.solution, /Vergil.*SUL/);
  assert.match(diff.solution, /mesmo portão/);
  assert.doesNotMatch(diff.solution, /Vergil.*fica em Bakbattahl/);
});

test('missões m02 e m04 mostram urgência e passos que exigem retorno ao NPC', () => {
  assert.match(fullText(event('m02')), /ampulheta.*temporizada/i);
  assert.match(fullText(event('m02')), /duração do prazo não foi estabelecida/);
  assert.match(fullText(event('m04')), /barris explosivos.*VOLTE.*jarro de veneno.*RETORNE/);
});

test('DLC de 11 de outubro usa seis títulos PT-BR verificados e sem tradução provisória', () => {
  const expected = new Map([
    [55, 'Terras Esquecidas do Norte'],
    [56, 'Antagonista do Dogma'],
    [57, 'Dogma Defendido'],
    [58, 'Mestre do Strike'],
    [59, 'Reunidos'],
    [60, 'Abominável Ladrão das Neves']
  ]);
  for (const achievement of achievements.filter(item => item.dlc)) {
    assert.equal(achievement.title, expected.get(achievement.id));
    assert.doesNotMatch(achievement.title, /provisóri|\[|\]/i);
    assert.match(achievement.nameStatus, /gatilho não reproduzido/);
    expected.delete(achievement.id);
  }
  assert.equal(expected.size, 0);
  assert.match(event('d01').title, /Fale com Brant/);
  const dlc = fullText(event('d01'));
  for (const required of ['Brant', 'Stardrop Inn', 'Chilling Tidings', 'Lost Rites', 'nível 40 RECOMENDADO', 'nível 20 RECOMENDADO']) {
    assert.ok(dlc.includes(required), required);
  }
  assert.match(dlc, /Chilling Tidings — Notícias Congelantes \(PT-BR extraído do questlog/);
  assert.match(dlc, /Lost Rites — Rituais Perdidos \(PT-BR extraído do questlog/);
  assert.match(dlc, /falta captura dos títulos no diário PT-BR/i);
  assert.equal(ROADMAP_METADATA.researchDate, '2026-10-11');
});
