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
  assert.equal(QUEST_GUIDES.length, 44);
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
  assert.equal(questGuidesForEvent('v303').length, 5);
  assert.equal(questGuidesForEvent('v304').length, 2);
  assert.equal(questGuidesForEvent('v104').length, 1);
  assert.equal(questGuidesForEvent('v201').length, 3);
  assert.ok(questGuidesForEvent('v206').some(guide => guide.id === 'spellbound'));
  assert.ok(questGuidesForEvent('v103').some(guide => guide.id === 'caged_magistrate'));
  assert.deepEqual(
    questGuidesForEvent('u03').map(guide => guide.id),
    ['dreams_apart'],
    'O Peão Principal deve ser recuperado em Bakbattahl'
  );
  for (const id of ['halls_first_dawn', 'regentkins_resolve']) {
    assert.ok(questGuidesForEvent('u04').some(guide => guide.id === id));
  }
  assert.ok(questGuidesForEvent('u08').some(guide => guide.id === 'halls_first_dawn'));
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

test('onda 4: quatro missões novas possuem passos, fontes e destinos independentes', () => {
  const ids = ['monster_culling', 'scaly_invaders', 'trouble_cape', 'till_death'];
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
  assert.match(guide('till_death').steps.join(' '), /basta mantê-lo vivo/);
  assert.equal(questGuidesForEvent('v201').filter(g => ['monster_culling', 'scaly_invaders'].includes(g.id)).length, 2);
  assert.equal(questGuidesForEvent('v203').find(g => g.id === 'till_death')?.id, 'till_death');
});

test('onda 5: Bakbattahl separa perseguição, atentado urgente e experimentos de veneno', () => {
  for (const id of ['mercy_thieves', 'shadowed_prayers', 'poisonous_proposal']) {
    const q = guide(id);
    assert.ok(q.steps.length >= 5);
    assert.equal(q.references.length, 2);
    assert.ok(q.relatedEventIds.every(eventId => knownEvents.has(eventId)));
    assert.ok(q.completion.length > 45);
  }
  assert.match(guide('mercy_thieves').steps.join(' '), /Lyssandro.*Toumi.*Hugo/s);
  assert.match(guide('mercy_thieves').completion, /missão posterior/);
  assert.match(guide('shadowed_prayers').preparation.join(' '), /urgente/);
  assert.match(guide('shadowed_prayers').steps.join(' '), /braço direito.*agarrar/s);
  assert.match(guide('poisonous_proposal').steps.join(' '), /Asp.*Venin Harpy.*quimera/s);
  assert.match(guide('poisonous_proposal').preparation.join(' '), /ainda envenenado/);
  assert.equal(questGuidesForEvent('b02').filter(q => ['mercy_thieves', 'shadowed_prayers', 'poisonous_proposal'].includes(q.id)).length, 3);
  assert.equal(PHASES.flatMap(phase => phase.events).length, 53);
});

test('Beren: duas missões próprias, encadeamento e Mestre de Guerreiro', () => {
  const first = guide('beren_claw');
  const second = guide('beren_final_lesson');
  assert.equal(first.title, 'Treino Leonino');
  assert.equal(second.title, 'A Última Lição de Beren');
  assert.deepEqual(first.relatedEventIds, ['m03', 'p03']);
  assert.deepEqual(second.relatedEventIds, ['m03', 'p03']);
  assert.ok(first.references.length >= 2);
  assert.ok(second.references.length >= 2);
  assert.match(first.steps.join(' '), /três espadas.*Humphrey.*duelo.*goblins/s);
  assert.match(first.steps.join(' '), /perder não impede/);
  assert.match(second.preparation.join(' '), /Treino Leonino/);
  assert.match(second.steps.join(' '), /ciclope.*Lifetaker.*Childhood Home.*Champion.s Fable.*Arc of Might/s);
  assert.equal(questGuidesForEvent('m03').filter(q => ['beren_claw', 'beren_final_lesson'].includes(q.id)).length, 2);
  assert.equal(questGuidesForEvent('p03').filter(q => ['beren_claw', 'beren_final_lesson'].includes(q.id)).length, 2);
  assert.equal(questGuidesForEvent('m03').length, 3);
  assert.equal(questGuidesForEvent('p03').length, 6);
  const step = PHASES.flatMap(phase => phase.events).find(event => event.id === 'm03');
  assert.match(step.note, /Treino Leonino.*A Última Lição de Beren.*Champion.s Fable/s);
  assert.equal(PHASES.flatMap(phase => phase.events).length, 53);
});

test('onda 6: missões de Mestre da Ilha Vulcânica explicam pergaminhos e passos extras', () => {
  const spring = guide('spring_thy_step');
  const sage = guide('sotted_sage');
  assert.equal(spring.title, 'A Fonte do Contentamento');
  assert.equal(sage.title, 'O Sábio Beberrão');
  assert.deepEqual(spring.relatedEventIds, ['i03', 'p03']);
  assert.deepEqual(sage.relatedEventIds, ['i05', 'p03']);
  assert.match(spring.steps.join(' '), /Gautstafr.*três ervas.*Windwalker.s Home.*Geyser Hamlet/s);
  assert.match(spring.steps.join(' '), /Spellbow.s Paradox/);
  assert.match(spring.completion, /Martyr.s Bolt/);
  assert.match(sage.steps.join(' '), /Lamond.*Newt Liqueur.*Higgs.*Beastren Mask.*Grandmaster.s Path/s);
  assert.match(sage.completion, /Rearmament/);
  assert.equal(questGuidesForEvent('i03').find(q => q.id === 'spring_thy_step')?.id, 'spring_thy_step');
  assert.equal(questGuidesForEvent('i05').find(q => q.id === 'sotted_sage')?.id, 'sotted_sage');
  assert.equal(questGuidesForEvent('p03').length, 6);
  for (const id of ['spring_thy_step', 'sotted_sage']) {
    const q = guide(id);
    assert.ok(q.steps.length >= 6);
    assert.ok(q.references.length >= 2);
    assert.ok(q.preparation.length > 0);
  }
});

test('onda 7: Godsway e Gigantus distinguem itens, escolha de conquista e ponto de retorno', () => {
  const godsway = guide('new_godsway');
  const gigantus = guide('guardian_gigantus');
  assert.deepEqual(godsway.relatedEventIds, ['p04']);
  assert.deepEqual(gigantus.relatedEventIds, ['p04', 'p05']);
  assert.match(godsway.steps.join(' '), /Ambrosius.*quinze Wyrmslife Crystals.*Empowered Godsbane Blade/s);
  assert.match(godsway.preparation.join(' '), /Unmaking Arrow/);
  assert.match(gigantus.steps.join(' '), /Phaesus.*Unmaking Arrow.*balistas.*Moonglint Tower/s);
  assert.match(gigantus.preparation.join(' '), /opcional|ignorar|sem retorno|revis/i);
  assert.match(gigantus.completion, /separado da progressão da campanha/);
  assert.equal(questGuidesForEvent('p04').filter(g => ['new_godsway', 'guardian_gigantus'].includes(g.id)).length, 2);
  assert.equal(questGuidesForEvent('p05').find(g => g.id === 'guardian_gigantus')?.id, 'guardian_gigantus');
  for (const g of [godsway, gigantus]) {
    assert.ok(g.references.length >= 2);
    assert.ok(g.steps.length >= 6);
  }
  assert.equal(PHASES.flatMap(phase => phase.events).length, 53);
});

test('onda 8: chegada a Battahl diferencia permissões; Legado separa escolhas de final', () => {
  const nation = guide('nation_lambent_flame');
  const legacy = guide('legacy');
  assert.equal(nation.title, 'Nação da Chama Luzente');
  assert.equal(legacy.title, 'Legado');
  assert.deepEqual(nation.relatedEventIds, ['v304', 'b01']);
  assert.deepEqual(legacy.relatedEventIds, ['p06', 'u01', 'u02']);
  for (const entry of [nation, legacy]) {
    assert.ok(entry.steps.length >= 7);
    assert.ok(entry.references.length >= 2);
  }
  const border = [...nation.preparation, ...nation.steps, nation.completion].join(' ');
  assert.match(border, /Bermudo.*Border Entry Permit.*Beastren Border Entry Permit/s);
  assert.match(border, /Beastren Mask/);
  assert.match(border, /Menella.*Battahl Residence Permit/s);
  assert.match(border, /Tô Dentro!.*opcional/);
  const ending = [...legacy.preparation, ...legacy.steps, legacy.completion].join(' ');
  assert.match(ending, /Moonglint Tower/);
  assert.match(ending, /Pioneiro.*Empowered Godsbane Blade/s);
  assert.match(ending, /Paz/);
  assert.match(ending, /não selecione Novo Jogo\+/i);
  assert.match(ending, /farol vermelho final/);
  assert.equal(questGuidesForEvent('b01').find(g => g.id === 'nation_lambent_flame')?.id, 'nation_lambent_flame');
  assert.equal(questGuidesForEvent('p06').find(g => g.id === 'legacy')?.id, 'legacy');
  assert.equal(PHASES.flatMap(phase => phase.events).length, 53);
});

test('localização de Myrddin: missão inicia na fronteira, não em Melve', () => {
  const melveGuides = questGuidesForEvent('m03');
  const vernworthGuides = questGuidesForEvent('v206');
  const myrddin = guide('sorcerers_appraisal');
  const trysha = guide('spellbound');
  assert.deepEqual(myrddin.relatedEventIds, ['v206', 'p03']);
  assert.ok(!melveGuides.some(q => q.id === myrddin.id), 'Myrddin não pode aparecer em Melve');
  assert.ok(melveGuides.some(q => q.id === trysha.id), 'Trysha deve permanecer em Melve');
  assert.ok(vernworthGuides.some(q => q.id === myrddin.id));
  assert.match(myrddin.region, /Cidade de Descanso da Fronteira/);
  assert.match(myrddin.preparation.join(' '), /não em Melve nem dentro de Vernworth/);
  const melve = PHASES.flatMap(p => p.events).find(e => e.id === 'm03');
  const route = PHASES.flatMap(p => p.events).find(e => e.id === 'v206');
  assert.match(melve.note, /A missão de Myrddin não começa aqui/);
  assert.match(route.title, /Cidade de Descanso da Fronteira/);
  assert.equal(PHASES.flatMap(p => p.events).length, 53);
});

test('Mundo Desancorado: Phaesus em Bakbattahl, cinco evacuações e feixe final protegido', () => {
  const [pawn, halls, vern] = ['dreams_apart', 'halls_first_dawn', 'regentkins_resolve']
    .map(id => QUEST_GUIDES.find(guide => guide.id === id));
  assert.match(pawn.region, /Bakbattahl/);
  assert.match(pawn.steps.join(' '), /Phaesus/);
  assert.doesNotMatch(pawn.completion, /recuper.*Santuário/i);
  assert.match(halls.preparation.join(' '), /VERMELHO FINAL/);
  assert.match(halls.steps.join(' '), /Vernworth/);
  for (const location of ['Bakbattahl', 'Jardim Sagrado', 'Acampamento da Ilha Vulcânica', 'Local de Escavação']) {
    assert.ok(halls.steps.join(' ').includes(location), location);
  }
  assert.match(vern.steps.join(' '), /Brant/);
  assert.match(vern.steps.join(' '), /Sven/);
  assert.match(vern.steps.join(' '), /Disa/);
  assert.match(vern.steps.join(' '), /Allard/);
  const u03 = PHASES.flatMap(p => p.events).find(e => e.id === 'u03');
  assert.match(u03.title, /Bakbattahl/);
  assert.match(u03.note, /Laboratório.*Phaesus/);
  assert.doesNotMatch(u03.note, /Acorde no Santuário do Leito Marinho/);
});

test('Mundo Desancorado: quatro evacuações restantes possuem gatilho, roteiro e limites explícitos', () => {
  const names = ['civil_unrest', 'wandering_roots', 'aiding_ernesto', 'shepherd_pawns'];
  const rows = names.map(id => QUEST_GUIDES.find(q => q.id === id));
  for (const [i, q] of rows.entries()) {
    assert.ok(q, names[i]);
    assert.ok(q.relatedEventIds.includes('u04'));
    assert.match(q.region, /Mundo Desancorado/);
    assert.ok(q.steps.length >= 5);
    assert.ok(q.references.length >= 2);
  }
  const [bak,elv,ern,hen] = rows;
  for (const person of ['Menella', 'Nadinia', 'Glintt', 'Nomos', 'Scario', 'Nabrah']) {
    assert.match(bak.steps.join(' '), new RegExp(person));
  }
  assert.match(elv.steps.join(' '), /Arborheart Cutting/);
  assert.match(elv.steps.join(' '), /Rota alternativa/);
  assert.match(elv.preparation.join(' '), /Woodland Wordsmith/);
  assert.match(ern.steps.join(' '), /Gautstafr/);
  assert.match(ern.steps.join(' '), /Cliodhna/);
  assert.match(ern.steps.join(' '), /Lamond/);
  assert.match(ern.completion, /Pastor de Peões/);
  assert.match(hen.steps.join(' '), /Overseer’s Lodge Key/);
  assert.match(hen.steps.join(' '), /Diminished Godsway/);
  assert.match(hen.completion, /obrigatória/);
  assert.equal(new Set(PHASES.flatMap(p => p.events).map(e => e.id)).size, 53);
});
