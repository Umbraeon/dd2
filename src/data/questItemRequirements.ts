import { FORGERY_ITEMS } from './questGuides';

/**
 * Itens de missão: instruções de obtenção/entrega no ponto em que são necessárias.
 * Campos não são traduções oficiais de inventário salvo quando há prova primária.
 * Requerimentos condicionais e opcionais são explicitados; não inferir 100% da build atual.
 */
export interface QuestItemNeed {
  name: string;
  namePt?: string;
  quantity: string;
  where: string;
  use: string;
  forgery: 'original' | 'copy' | 'optional' | 'not-applicable';
  forgedName?: string;
  forgedNamePt?: string;
  optional?: boolean;
}

export interface QuestItemSection {
  guidance: string;
  items: readonly QuestItemNeed[];
  references?: readonly string[];
}

const BOOKS = FORGERY_ITEMS.slice(0, 5);
const grimoiresFor = (recipient: 'trysha' | 'myrddin'): QuestItemNeed[] =>
  BOOKS.map(book => ({
    name: book.item,
    namePt: book.itemPt,
    forgedName: book.forged,
    forgedNamePt: book.forgedPt,
    quantity: '1 se escolhido — basta selecionar 3 dos 5 títulos diferentes',
    where: book.obtain,
    use: recipient === 'trysha'
      ? 'Entregue somente o original a Trysha. Antes de entregar, solicite uma cópia a Ibrahim para preservar a opção de completar a missão de Myrddin. ' + book.action
      : 'Entregue a falsificação ' + book.forged + (book.forgedPt ? ' (' + book.forgedPt + ')' : '') + ' a Myrddin e guarde o original para Trysha. Ibrahim produz a cópia no Posto do Retiro (Cidade de Descanso da Fronteira). ' + book.action,
    forgery: recipient === 'trysha' ? 'original' : 'copy'
  }));

export const QUEST_ITEM_REQUIREMENTS: Readonly<Record<string, QuestItemSection>> = {
  spellbound: {
    guidance: 'Escolha pelo menos 3 grimórios de TÍTULOS DIFERENTES entre os 5 abaixo. Trysha precisa de originais, não de cópias (entregar falsificações invalida a conclusão ideal e impede o aprendizado de Meteoron e Celestial Paean). Uma rota segura é obter os livros, fazer as cópias primeiro na loja de Ibrahim no Posto do Retiro por 6.000 G cada, e então entregar 3 originais a Trysha.',
    items: grimoiresFor('trysha'),
    references: ['https://www.powerpyx.com/dragons-dogma-2-all-grimoire-locations/', 'https://game8.co/games/Dragons-Dogma-2/archives/Spellbound']
  },
  sorcerers_appraisal: {
    guidance: 'Myrddin solicita os mesmos 5 títulos, mas a missão pode ser concluída entregando pelo menos 3 títulos DIFERENTES falsificados (produzidos com Ibrahim). Ele aceita essas cópias e concede todas as recompensas; guarde os livros autênticos para Trysha. Exige vestir Túnica Cortês e Calção Cortês para que ele atenda a porta. Se já aprendeu Meteoron com Trysha, a conversa com Myrddin pode requerer o Turquoise Ring (Anel Turquesa) dela.',
    items: [
      {
        name: 'Courtly Tunic + Courtly Breeches (traje de corte)',
        namePt: 'Túnica Cortês + Calção Cortês',
        quantity: '1 conjunto equipado',
        where: 'Casas do Bairro Nobre em Vernworth, incluindo Comptroller’s Home; também usados na missão O Trono Roubado.',
        use: 'Vista ambos antes de bater à porta de Myrddin no Posto do Retiro (Cidade de Descanso da Fronteira). Não é falsificação.',
        forgery: 'not-applicable'
      },
      ...grimoiresFor('myrddin')
    ],
    references: ['https://www.powerpyx.com/dragons-dogma-2-all-grimoire-locations/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Sorcerers-Appraisal']
  },
  jadeite: {
    guidance: 'A decisão sobre quem recebe original e cópia altera a verificação de Everard. Ibrahim só fará a cópia se você ainda tiver o original.',
    items: [{
      name: 'Jadeite Orb / Imitation Jadeite Orb',
      namePt: 'Esfera de Jade / Esfera de Jaspe',
      forgedName: 'Imitation Jadeite Orb',
      forgedNamePt: 'Esfera de Jaspe',
      quantity: '1 original + 1 cópia, para atender aos dois interessados',
      where: 'Compre a Esfera de Jade (Jadeite Orb) de Ibrahim no Posto do Retiro (Cidade de Descanso da Fronteira) por 7.500 G e solicite ali mesmo a falsificação por 2.000 G.',
      use: 'Entregue o ORIGINAL a Everard (ele verifica autenticidade com Ibrahim) e a CÓPIA a Offulve; confira os nomes na janela de entrega.',
      forgery: 'copy'
    }]
  },
  short_sighted: {
    guidance: 'O original e a falsificação de On the Transference of Souls 2 levam a consequências diferentes. Escolha o desfecho antes da entrega.',
    items: [{
      name: 'On the Transference of Souls 2 / On the Transit of Souls 2',
      namePt: 'A Transferência de Almas 2 / A Transparência de Almas 2',
      forgedName: 'On the Transit of Souls 2',
      forgedNamePt: 'A Transparência de Almas 2',
      quantity: '1 original para produzir 1 cópia',
      where: 'Compre o segundo tomo com Ibrahim no Posto do Retiro (Cidade de Descanso da Fronteira) por 2.000 G e encomende a cópia por 2.400 G.',
      use: 'Para preservar a família de Isaac, entregue a versão falsa On the Transit of Souls 2 (A Transparência de Almas 2). Não confunda os dois títulos.',
      forgery: 'copy'
    }]
  },
  caged_magistrate: {
    guidance: 'A cópia da chave é uma conveniência, não requisito para resgatar Waldhar.',
    items: [{
      name: 'Gaol Key / cópia funcional',
      namePt: 'Chave da Prisão / Chave Frágil da Prisão',
      forgedName: 'Makeshift Gaol Key',
      forgedNamePt: 'Chave Frágil da Prisão',
      quantity: '1 chave recebida; cópia opcional',
      where: 'Brant entrega a chave da prisão em Vernworth. Ibrahim pode criar uma cópia funcional descartável (Chave Frágil da Prisão) por 3.000 G no Posto do Retiro (Cidade de Descanso da Fronteira).',
      use: 'Use para abrir a prisão e devolva a original a Brant quando solicitado. Se quiser manter acesso a celas futuras, faça a cópia ANTES da devolução.',
      forgery: 'optional',
      optional: true
    }]
  },
  new_godsway: {
    guidance: 'A sequência de Ambrosius depende do item da missão principal anterior e de cristais de dragões.',
    items: [
      { name: 'Dulled Godsbane Blade', namePt: 'Espada da Sucessão Vil Cega', quantity: '1', where: 'Recebida de Rothais na missão Convergence no Santuário do Fundo do Mar.', use: 'Entregue a Ambrosius no laboratório sob o palácio de Bakbattahl; não falsifique.', forgery: 'original' },
      { name: 'Wyrmslife Crystals', namePt: 'Cristal de Serserpe', quantity: '15', where: 'Obtidos de dracos e outros dragões, inclusive na rota de Dragonsbreath Tower.', use: 'Leve os 15 a Ambrosius. A Empowered Godsbane Blade (Espada da Sucessão Vil Forte) é recebida posteriormente, não comprada.', forgery: 'not-applicable' }
    ]
  },
  guardian_gigantus: {
    guidance: 'O item de combate a seguir é OPCIONAL para uma tentativa de derrota rápida de Gigantus; a história pode prosseguir sem ele.',
    items: [{
      name: 'Unmaking Arrow',
      namePt: 'Flecha Aniquilante',
      forgedName: 'Unmasking Arrow',
      forgedNamePt: 'Flecha Cintilante',
      quantity: '1 opcional, consumível',
      where: 'Disponível como recompensa de determinados enigmas da Esfinge ou por troca especial com o Dragonforged por 8 Cristais de Serserpe; cópia com Ibrahim gera a versão inútil Flecha Cintilante.',
      use: 'Se optar pelo método, equipe arco e use a flecha no Gigantus. Não é falsificação funcional nem condição de conclusão da história.',
      forgery: 'not-applicable',
      optional: true
    }]
  },
  legacy: {
    guidance: 'Item fundamental para optar pelo Mundo Desancorado durante o voo. Não é preciso copiá-lo.',
    items: [{
      name: 'Empowered Godsbane Blade',
      namePt: 'Espada da Sucessão Vil Forte',
      quantity: '1',
      where: 'Recebida de Ambrosius ao concluir Um Novo Chamado Divino (A New Godsway).',
      use: 'Para o Mundo Desancorado, aproxime-se do coração brilhante durante o voo do Dragão e use a lâmina em você mesmo. Não a confunda com item de consumo comum.',
      forgery: 'original'
    }]
  },
  nation_lambent_flame: {
    guidance: 'A permissão que Brant entrega pode variar conforme a investigação de Bermudo; não há requisito universal de máscara.',
    items: [
      { name: 'Border Entry Permit OU Beastren Border Entry Permit', namePt: 'Perm. de Acesso à Fronteira OU Perm. Acesso à Fronteira (Leot.)', quantity: '1, conforme o estado de Uma Sombra à Espreita', where: 'Recebida de Brant em Vernworth depois de O Banquete da Farsa.', use: 'Apresente ao guarda no Posto de Controle da Fronteira (Posto do Retiro). A passagem clandestina para Tô Dentro! é alternativa opcional.', forgery: 'not-applicable' },
      { name: 'Beastren Mask', namePt: 'Máscara de Leoterian', quantity: '1, apenas para personagem humano com Beastren Border Entry Permit', where: 'Compre de Ibrahim por 8.700 G no Posto do Retiro (Cidade de Descanso da Fronteira).', use: 'Equipe para atravessar a fronteira com o passe de beastren; não é necessária para todo tipo de permissão.', forgery: 'not-applicable', optional: true }
    ]
  },
  spring_thy_step: {
    guidance: 'Flores ou ervas genéricas são aceitas para tratar Gautstafr, não três itens raros específicos.',
    items: [{ name: 'Ervas ou flores silvestres', namePt: 'Ervanária / Luzeiro / Balsamina (Greenwarish, Morningtide, Pitywort)', quantity: '3 unidades', where: 'Colha pela vegetação no caminho da Ilha Vulcânica de Agamen, como Morningtide ou Pitywort.', use: 'Entregue as três a Gautstafr antes da escolta às termas. Sem falsificação.', forgery: 'not-applicable' }]
  },
  sotted_sage: {
    guidance: 'Lamond exige três garrafas no total; as já entregues contam para a soma.',
    items: [
      { name: 'Newt Liqueur', namePt: 'Licor de Salamandra', quantity: '3 garrafas', where: 'Uma pode ser encontrada em Windwalker’s Home. Outras por mistura de Fruit Wine (Vinho de Frutas) + Saurian Tail (Cauda de Sauriano) ou no vendedor secreto de Higgs em Bakbattahl.', use: 'Entregue a Lamond perto das fontes termais. Não é item para falsificação.', forgery: 'not-applicable' },
      { name: 'Beastren Mask', namePt: 'Máscara de Leoterian', quantity: '1, condicional para humano usando o comércio secreto de Higgs', where: 'Compre de Ibrahim por 8.700 G no Posto do Retiro (Cidade de Descanso da Fronteira).', use: 'Equipe antes de mover sacos no cercado de Higgs; evita risco de hostilidade. Não é necessária para quem obtém o licor por outros meios.', forgery: 'not-applicable', optional: true }
    ]
  },
  beren_claw: {
    guidance: 'As espadas entregues a Beren são consumidas pela missão; escolha armas comuns, não suas favoritas.',
    items: [{ name: 'Espadas comuns', namePt: 'Espadas comuns de ferro', quantity: '3', where: 'Compre armas baratas nos comerciantes do Posto Avançado da Guarda ou use espadas sobressalentes encontradas pelo mundo.', use: 'Entregue as três a Beren como equipamento de treinamento; não exigem cópias.', forgery: 'not-applicable' }]
  },
  medicament: {
    guidance: 'A missão de Flora aceita o revigorante de frutas, comprado ou fabricado.',
    items: [{ name: 'Fruit Roborant', namePt: 'Revigorante de Frutas', quantity: '1', where: 'Compre na farmácia ou fabrique combinando fruta seca com erva medicinal adequada (Greenwarish / Ervanária ou Morningtide / Luzeiro).', use: 'Entregue a Flora em Melve; não precisa de original/cópia.', forgery: 'not-applicable' }]
  },
  provisioners_plight: {
    guidance: 'Duas entregas distintas para Markus após levar o recado de Geoffrey.',
    items: [
      { name: 'Harspud', namePt: 'Tubérculo Harspud', quantity: '3', where: 'Colete na região do Posto Avançado da Guarda, inclusive nas áreas indicadas pelo marcador da missão.', use: 'Entregue três a Markus. Não há falsificação.', forgery: 'not-applicable' },
      { name: 'Salubrious Draught', namePt: 'Poção Salutar', quantity: '2', where: 'Compre de comerciante ou produza combinando ingredientes medicinais, como fruta e erva (Greenwarish / Ervanária).', use: 'Entregue dois a Markus junto das Harspuds. Não há falsificação.', forgery: 'not-applicable' }
    ]
  },
  vocation_frustration: {
    guidance: 'Klaus usa os itens entregues; não entregue armas equipadas que queira conservar.',
    items: [
      { name: 'Two-Hander', namePt: 'Montante (Espada de Duas Mãos)', quantity: '1', where: 'Baú na Mina de Trevo (Trevo Mine), acessível durante a rota de Elimine os Monstros.', use: 'Entregue a Klaus na Guilda das Vocações de Vernworth para desbloquear Guerreiro.', forgery: 'not-applicable' },
      { name: 'Grievous Horns', namePt: 'Chifres Dolorosos (Cajado de Feiticeiro)', quantity: '1', where: 'Outro baú na Mina de Trevo (Trevo Mine).', use: 'Entregue a Klaus para desbloquear Feiticeiro; não são objetos a falsificar.', forgery: 'not-applicable' }
    ]
  },
  gift_of_bow: {
    guidance: 'Glyndwr precisa receber um arco físico além de você trocar para Arqueiro no treino.',
    items: [{ name: 'Arco', namePt: 'Arco de Caçador (ou qualquer arco básico)', quantity: '1 para entregar a Glyndwr', where: 'Compre um arco simples na loja de armas de Vernworth ou use um arco sobressalente.', use: 'Entregue a Glyndwr, depois equipe a vocação Arqueiro para o encontro nas ruínas. Não falsifique.', forgery: 'not-applicable' }]
  },
  heel_of_history: {
    guidance: 'Kendrick pede duas doações para iniciar a investigação do menino desaparecido.',
    items: [
      { name: 'Comida', namePt: 'Alimento qualquer (peixe, carne ou fruta comestível)', quantity: '1 alimento aceito', where: 'Itens de alimento comuns no inventário ou comprados em Vernworth.', use: 'Doe a Kendrick no Bairro Pobre.', forgery: 'not-applicable' },
      { name: 'Ouro', namePt: 'Moedas de ouro', quantity: '1.000 G', where: 'Use o ouro disponível no personagem.', use: 'Doe a Kendrick juntamente com alimento.', forgery: 'not-applicable' }
    ]
  },
  ornate_box: {
    guidance: 'Comprar ou financiar a caixa é uma escolha da missão de Sven.',
    items: [{ name: 'Ornate Box', namePt: 'Caixa Adornada', quantity: '1, conforme a escolha', where: 'Barraca do comerciante Auriol no Bairro Comercial de Vernworth.', use: 'Pode comprar a caixa para entregar a Sven, ou dar a ele o dinheiro para comprá-la. Sem falsificação.', forgery: 'not-applicable', optional: true }]
  },
  disas_plot: {
    guidance: 'A investigação exige preservar a prova encontrada no castelo.',
    items: [{ name: 'Carta de Disa (prova da investigação)', namePt: 'Carta Rasgada (Torn Letter)', quantity: '1', where: 'Sala ligada aos aposentos do castelo durante a infiltração noturna indicada pela missão.', use: 'Recolha e leve a Brant na Stardrop Inn; não copie.', forgery: 'original' }]
  },
  stolen_throne: {
    guidance: 'Traje formal para o baile, mais a máscara que Brant fornece.',
    items: [
      { name: 'Courtly Tunic + Courtly Breeches', namePt: 'Túnica Cortês + Calção Cortês', quantity: '1 conjunto equipado', where: 'Residências do Bairro Nobre em Vernworth, incluindo Comptroller’s Home, ou recompensas de certas missões.', use: 'Equipe para entrar no baile do castelo.', forgery: 'not-applicable' },
      { name: 'Eventide Mask', namePt: 'Máscara do Crepúsculo', quantity: '1', where: 'Recebida de Brant para a investigação do baile.', use: 'Equipe junto do traje quando for ao baile; não se falsifica.', forgery: 'not-applicable' }
    ]
  },
  feast_deception: {
    guidance: 'Traje da corte reaproveitado da investigação do baile.',
    items: [{ name: 'Courtly Tunic + Courtly Breeches', namePt: 'Túnica Cortês + Calção Cortês', quantity: '1 conjunto equipado', where: 'Casas do Bairro Nobre de Vernworth ou recompensas anteriores da cadeia de Sven.', use: 'Equipe para a audiência/cerimônia, conforme solicitado na missão.', forgery: 'not-applicable' }]
  },
  home_hearth: {
    guidance: 'As armas destinadas aos moradores podem ser retiradas do depósito ou obtidas fora.',
    items: [{ name: 'Espadas', namePt: 'Espadas comuns de ferro', quantity: '4', where: 'Armas confiscadas no depósito de Melve, com ajuda da distração dos irmãos, ou quatro espadas simples adquiridas previamente.', use: 'Entregue as quatro a Lennart para armar os moradores.', forgery: 'not-applicable' }]
  },
  nesting: {
    guidance: 'Primeiro destrua os ovos com explosivos, retorne a Lennart e só então use o veneno. Se o jarro cair no rio, pode haver consequência indesejada para Melve.',
    items: [
      { name: 'Barris explosivos da missão', namePt: 'Jarro Explosivo', quantity: 'Conforme necessário para atingir o ninho', where: 'Perto da margem do rio, fora da entrada de Melve.', use: 'Arremesse contra os ovos de sáurios na outra margem e relate o resultado a Lennart.', forgery: 'not-applicable' },
      { name: 'Jarro de veneno da missão', namePt: 'Jarro de Veneno', quantity: '1 jarro', where: 'No chão perto da entrada de Melve, após a primeira conversa de retorno com Lennart.', use: 'Arremesse no ninho, não na água. Não pode ser falsificado com Ibrahim.', forgery: 'not-applicable' }
    ]
  },
  nameless_village: {
    guidance: 'A investigação termina ao apresentar a Brant a prova recebida de Srail.',
    items: [{ name: 'Evidência sobre o falso soberano', namePt: 'Mandado de Prisão de Darragh (Darragh\'s Bill of Arrest)', quantity: '1 documento da investigação', where: 'Receba de Srail, após atravessar as Profundezas da Vila Sem Nome (Vilarejo sem Nome).', use: 'Leve a informação/prova a Brant na Stardrop Inn. Não é item para copiar.', forgery: 'original' }]
  }
};

/**
 * Revisão editorial das outras fichas existentes: não há um objeto a obter,
 * comprar, entregar ou falsificar para completar a missão nos walkthroughs
 * atuais. Recompensas recebidas depois não são pré-requisitos de inventário.
 * É uma revisão de fontes, NÃO validação primária da build do jogador.
 */
export const QUESTS_WITHOUT_ITEM_REQUIREMENTS: readonly string[] = [
  'beren_final_lesson', 'new_recruit', 'brothers_brave', 'trial_of_archery',
  'readvent_calamity', 'arisen_shadow', 'monster_culling', 'scaly_invaders',
  'trouble_cape', 'till_death', 'mercy_thieves', 'shadowed_prayers',
  'poisonous_proposal'
];
