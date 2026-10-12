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
      {
        name: 'Turquoise Ring',
        namePt: 'Anel Turquesa',
        quantity: '1, condicional (se você já aprendeu Meteoron com Trysha)',
        where: 'Recebido de Trysha como recompensa de Magia Vertiginosa (Spellbound), após entregar os grimórios autênticos e concluir o evento com ela.',
        use: 'Se Myrddin questionar quem ensinou Meteoron, mostre sua ligação com Trysha tendo o anel no inventário ou equipado; se necessário, equipe-o e volte a conversar após descansar. Essa condição varia conforme o estado da missão e não é universal.',
        forgery: 'not-applicable',
        optional: true
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
  },
  civil_unrest: {
    guidance: 'A fruta é uma opção para resolver PACIFICAMENTE a discussão das crianças no mercado; não é requisito universal para evacuar Bakbattahl. Os demais conflitos se resolvem por ações e diálogo.',
    items: [{
      name: 'Fruta fresca (não estragada)',
      quantity: '1 unidade, apenas para resolução pacífica no mercado',
      where: 'Compre frutas nos vendedores de Bakbattahl ou use uma maçã/outra fruta não estragada guardada no inventário.',
      use: 'Na discussão de Glintt e Nomos, diga que nenhum dos dois está errado; entregue a fruta às crianças quando pedirem. Não é necessária para soluções alternativas.',
      forgery: 'not-applicable',
      optional: true
    }],
    references: [
      'https://game8.co/games/Dragons-Dogma-2/archives/450312',
      'https://www.neoseeker.com/dragons-dogma-2/walkthrough/Civil_Unrest'
    ]
  },
  wandering_roots: {
    guidance: 'O ramo serve SOMENTE para a rota de plantio, caso tenha progredido na história da Árvore Sagrada. É possível evacuar os elfos sem o ramo insistindo nas conversas com Taliesin, mas passar dias pode afetar o Mundo Desancorado.',
    items: [{
      name: 'Arborheart Cutting (ramo da Árvore Sagrada)',
      quantity: '1 ramo, apenas se escolher a rota de plantio',
      where: 'Recebido de Taliesin no Jardim Sagrado quando a campanha permite a rota após The Ailing Arborheart e Out of the Forest, Into the Forge.',
      use: 'No Santuário do Leito Marinho, localize o pequeno círculo de pedras e plante o ramo. Volte a Taliesin para informar o resultado; não precisa falsificar.',
      forgery: 'not-applicable',
      optional: true
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-wandering-roots-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450033'
    ]
  },
  aiding_ernesto: {
    guidance: 'Não há item obrigatório de inventário na escolta. Os recursos abaixo são conveniências OPCIONAIS: andar com Gautstafr e Cliodhna também funciona.',
    items: [
      {
        name: 'Portcrystal (cristal de porto)',
        quantity: '1 opcional e reutilizável, se não houver ponto próximo',
        where: 'Use um cristal de porto que já possui; posicioná-lo junto ao Acampamento da Ilha Vulcânica acelera o retorno do casal.',
        use: 'Coloque no acampamento antes da escolta. Sem ele, simplesmente volte caminhando com o casal.',
        forgery: 'not-applicable',
        optional: true
      },
      {
        name: 'Ferrystone (pedra de transporte)',
        quantity: '1 opcional, consumida na viagem',
        where: 'Obtida de recompensas, baús ou vendedores; precisa haver um ponto de teleporte válido no destino.',
        use: 'Após convencer os dois, segure/carregue Gautstafr e use a pedra para retornar ao acampamento se houver cristal de porto. Caso contrário, escolte a pé.',
        forgery: 'not-applicable',
        optional: true
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-importance-of-aiding-ernesto-walkthrough/',
      'https://www.neoseeker.com/dragons-dogma-2/walkthrough/The_Importance_of_Aiding_Ernesto'
    ]
  },
  shepherd_pawns: {
    guidance: 'Esta missão exige uma chave para ABRIR a porta e um objeto para ENTREGAR. A chave vem de Henrique; o Diminished Godsway está no alojamento trancado e deve ser devolvido a Henrique. Nenhuma falsificação é necessária.',
    items: [
      {
        name: 'Overseer’s Lodge Key (chave do alojamento do capataz)',
        quantity: '1, recebida durante a missão',
        where: 'Henrique entrega após você derrotar o Golem mágico e acompanhá-lo das portas do Local de Escavação às celas.',
        use: 'Abra a segunda cabana nos alojamentos da encosta, perto do caminho da entrada. Guarde a chave até abrir a porta.',
        forgery: 'not-applicable'
      },
      {
        name: 'Diminished Godsway (cajado debilitado)',
        quantity: '1, obrigatório para entregar',
        where: 'Dentro da segunda cabana trancada na colina perto do portão do Local de Escavação; abra com a chave de Henrique.',
        use: 'Entregue o objeto ORIGINAL a Henrique junto às celas para permitir a evacuação dos peões. Não encomende falsificação.',
        forgery: 'original'
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-shepherd-of-the-pawns-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450321'
    ]
  },
  scholarly_pursuit: {
    guidance: 'Para investigar o FEIXE VERMELHO de Bakbattahl, tenha a Godsbane Potencializada recebida durante a história. É um item da missão principal, não um recurso para comprar ou falsificar. NÃO confunda esta prova com o feixe final do Santuário do Leito Marinho.',
    items: [{
      name: 'Empowered Godsbane Blade',
      namePt: 'Lâmina da Perdição dos Deuses Potencializada',
      quantity: '1 item-chave já obtido na campanha',
      where: 'Recebido na missão principal Um Novo Chamado Divino (A New Godsway), após entregar a Ambrosius a lâmina restaurada.',
      use: 'Interaja com o feixe vermelho diante do Palácio da Chama Luzente em Bakbattahl e use a lâmina quando o jogo solicitar. Ela não precisa ser entregue a Phaesus nem falsificada.',
      forgery: 'original'
    }],
    references: [
      'https://game8.co/games/Dragons-Dogma-2/archives/A-Scholarly-Pursuit',
      'https://www.powerpyx.com/dragons-dogma-2-a-scholarly-pursuit-walkthrough/'
    ]
  },
  phantom_oxcart: {
    guidance: 'Para entrar como peão, DESEQUIPE todo o equipamento visível; não é preciso adquirir uma fantasia. Recolha as ordens dos guardas em Bakbattahl e ENTREGUE-as a Brant. O item abaixo é prova obtida no fim do trajeto, não algo que se compra antes de embarcar.',
    items: [{
      name: 'Labor Requisition Orders',
      namePt: 'Ordens de requisição de trabalho (tradução explicativa; PT-BR do inventário ainda não validado)',
      quantity: '1 documento, obrigatório para a entrega final',
      where: 'Após o trecho noturno da Carroça Fantasma e a revelação dos guardas em Bakbattahl, enfrente os guardas hostis; o documento é obtido nesse conflito.',
      use: 'Retorne à Estalagem Stardrop em Vernworth e entregue as ordens ao Capitão Brant. Preserve o documento original; não é necessário fabricar cópia.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/',
      'https://www.polygon.com/dragons-dogma-2-guide/24111543/phantom-oxcart-quest-walkthrough-location-start-navil-disguise'
    ]
  },
  unsettling_encounter: {
    guidance: 'A evidência é encontrada dentro dos aposentos de Allard no Castelo de Vernworth, após abrir a passagem da parede secreta. O documento deve ser levado ORIGINAL a Brant na Estalagem Stardrop; não precisa de falsificação.',
    items: [{
      name: 'Battahli-Crested Letter',
      namePt: 'Carta com brasão de Battahl (descrição explicativa; nome do inventário PT-BR não verificado)',
      quantity: '1 documento obrigatório',
      where: 'No aposento oculto atrás da parede falsa dos aposentos de Allard, segundo andar do Castelo de Vernworth, à noite.',
      use: 'Recolha a carta e entregue a Brant na Estalagem Stardrop, à noite, ao relatar os rumores sobre Allard.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-an-unsettling-encounter-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/An-Unsettling-Encounter'
    ]
  },
  flickering_shadows: {
    guidance: 'Ambrosius pede um fragmento PEQUENO de cristal azul obtido no litoral próximo dele. Não é o conjunto de 15 Cristais da Vida da Serpe da missão posterior Um Novo Chamado Divino.',
    items: [{
      name: 'Small Blue Crystal Shard',
      namePt: 'Pequeno fragmento de cristal azul (descrição explicativa; nome do inventário PT-BR não verificado)',
      quantity: 'Pelo menos 1 amostra',
      where: 'Na Costa de Olta’Battahl, a leste/nordeste de Bakbattahl, entre os fragmentos brilhantes no chão e na água perto de Ambrosius.',
      use: 'Entregue um fragmento a Ambrosius quando ele solicitar a amostra do chamado divino; guarde os demais para outras necessidades. Não é item para falsificação.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-flickering-shadows-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Flickering-Shadows'
    ]
  },
  place_call_home: {
    guidance: 'Mildred empresta a casa por uma semana. Para ADQUIRIR a residência e registrar a conquista, leve 20.000 G quando ela retornar. Trata-se de ouro comum, não de item para falsificação.',
    items: [{
      name: 'Gold (20,000 G)',
      namePt: '20.000 moedas de ouro',
      quantity: '20.000 G (compra opcional até a oferta; necessária para possuir a residência)',
      where: 'Acumule ouro em recompensas de missões, vendas e exploração ANTES de aceitar a oferta de compra após a semana.',
      use: 'Converse com Mildred diante da casa no Bairro Popular de Vernworth após uma semana e PAGUE 20.000 G para adquirir o imóvel. Não requer falsificação.',
      forgery: 'not-applicable'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-place-to-call-home-walkthrough/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  dulled_steel: {
    guidance: 'Há DOIS requisitos: a Espada Régia cega entregue por Roman (não guarde no depósito antes de negociar com Sara) e pelo menos 15 carvões lustrazul coletados nas Ruínas da Escavação. Você pode entregar até 25 carvões para benefício extra; NÃO confunda com Glymercole.',
    items: [
      {
        name: 'Dulled Regalia Sword',
        namePt: 'Espada Régia cega (nome de contexto da missão)',
        quantity: '1 espada, recebida de Roman',
        where: 'Roman entrega a espada no pátio do Castelo de Vernworth depois da missão O Trono do Sobran.',
        use: 'Conserve no INVENTÁRIO, não no depósito. Quando Sara se oferecer para restaurá-la na Forja de Brokkr, entregue a espada ORIGINAL a ela para encerrar a etapa.',
        forgery: 'original'
      },
      {
        name: 'Glimmercoal',
        namePt: 'Carvão lustrazul',
        quantity: '15 obrigatórios; até 25 opcionais para recompensa melhor',
        where: 'Ruínas da Escavação (Digger’s Ruins), sudoeste de Bakbattahl. Apague a lanterna para identificar o minério que brilha verde no escuro; NÃO é Glymercole.',
        use: 'Entregue de 15 a 25 carvões lustrazul a Sara na Forja de Brokkr; depois confie a espada original à aprendiz.',
        forgery: 'original'
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-dulled-steel-cold-forge-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Dulled-Steel-Cold-Forge'
    ]
  },
  steeled_resolve: {
    guidance: 'Não é preciso coletar material novo. RESGATE Sara na Caverna na Base da Montanha, recupere a espada restaurada na forja e entregue o ORIGINAL a Roman no Castelo de Vernworth.',
    items: [{
      name: 'Restored Regalia Sword',
      namePt: 'Espada Régia restaurada (descrição explicativa)',
      quantity: '1, recebida de Sara depois da escolta',
      where: 'Na Forja de Brokkr, em Bakbattahl, Sara entrega a espada depois que você a escoltar com segurança para fora da Caverna na Base da Montanha.',
      use: 'Retorne ao pátio do Castelo de Vernworth e ENTREGUE a espada restaurada a Roman. Não falsifique nem substitua pelo objeto cego.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-steeled-resolve-blazing-forge-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Steeled-Resolve-Blazing-Forge'
    ]
  },
  every_rose: {
    guidance: 'TRÊS DIAS NO JOGO após aceitar a ajuda a Wilhelmina. São DUAS evidências: Murder Report (entregue a Wilhelmina) e Bribery Investigation Findings (exibido a Brant primeiro). NÃO use a Battahli-Crested Letter de Um Encontro Perturbador como substituto.',
    items: [
      {
        name: 'Murder Report',
        namePt: 'Relatório do assassinato (nome explicativo; PT-BR do inventário não verificado)',
        quantity: '1 relatório original',
        where: 'Mansão de Allard no Bairro Nobre de Vernworth: depois de Patrick distraí-lo, examine o quadro na parede do andar superior.',
        use: 'Mostre a Brant depois do Bribery Investigation Findings e ENTREGUE a Wilhelmina no Rose Chateau para continuar o plano dentro do prazo de três dias.',
        forgery: 'original'
      },
      {
        name: 'Bribery Investigation Findings',
        namePt: 'Resultados da investigação de suborno (descrição explicativa)',
        quantity: '1 documento original',
        where: 'Casa ao norte de Vernworth, perto da barbearia de Clovis, sobre uma mesa. Caso não apareça, consulte Brant sobre a investigação.',
        use: 'MOSTRE PRIMEIRO este documento ao Capitão Brant na Estalagem Stardrop, depois apresente Murder Report e aceite a ajuda dele para fugir.',
        forgery: 'original'
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/',
      'https://www.rpgsite.net/guide/15670-dragons-dogma-2-every-rose-has-its-thorn-how-to-romance-wilhelmina-complete-her-quest'
    ]
  },
  saint_slums: {
    guidance: 'Elena requer 3 Miasmites. Depois reúna no porão Unlabeled Medicine e Records of Treatment, mostre a medicina a Radcliff no Posto do Retiro e só então AGARRE Elena para prendê-la. Sem necessidade de falsificação.',
    items: [
      {
        name: 'Miasmite',
        namePt: 'Miasmita',
        quantity: '3 unidades obrigatórias',
        where: 'Derrote fantasmas/Phantoms em Vermund durante a noite; o item pode cair dos inimigos. Também vale o estoque que já possui.',
        use: 'ENTREGUE três unidades a Elena na Casa Mãos Caridosas dos Cortiços para receber a visita guiada.',
        forgery: 'original'
      },
      {
        name: 'Unlabeled Medicine',
        namePt: 'Remédio sem rótulo (tradução explicativa)',
        quantity: '1 amostra original',
        where: 'Depósito atrás da cortina branca na enfermaria do porão da Casa Mãos Caridosas.',
        use: 'Mostre a Lubomir e ENTREGUE ao médico Radcliff no Posto do Retiro. Depois de um dia, recolha o diagnóstico antes de agarrar Elena.',
        forgery: 'original'
      },
      {
        name: 'Records of Treatment',
        namePt: 'Registros dos tratamentos (tradução explicativa)',
        quantity: '1 conjunto de registros',
        where: 'Mesmo depósito da enfermaria do porão da Casa Mãos Caridosas, junto ao remédio sem rótulo.',
        use: 'Recolha e apresente como prova a Lubomir; preserve até terminar a investigação de Elena.',
        forgery: 'original'
      }
    ],
    references: [
      'https://www.gamesradar.com/dragons-dogma-2-saint-of-the-slums/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Saint-of-the-Slums'
    ]
  },
  candle_storm: {
    guidance: 'Tenha 5.000 G para subornar Herman na prisão. Depois prepare a falsa informação sobre Nadinia e preserve a imperatriz na encenação final. NÃO dê um golpe fatal nela.',
    items: [{
      name: 'Gold (5,000 G)',
      namePt: '5.000 moedas de ouro',
      quantity: '5.000 G para o suborno de Herman',
      where: 'Ouro de missões, venda ou inventário antes de chegar à prisão de Bakbattahl.',
      use: 'PAGUE 5.000 G a Herman na cela quando ele pedir para revelar a conexão com os Cobras-Corais; depois informe Menella.',
      forgery: 'not-applicable'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-candle-in-the-storm-walkthrough/',
      'https://www.gamesradar.com/dragons-dogma-2-a-candle-in-the-storm/'
    ]
  },
  pilfered_path: {
    guidance: 'Subornos a Ekertt são uma rota OPCIONAL de soltura. Outra é impedir Lanzo e obter a liberdade de Hugo pelos eventos. Não pague tudo como se fosse obrigatório. Opções de emprego dependem do desfecho de As Rosas Têm Espinhos ou Ambição Cega.',
    items: [{
      name: 'Gold (bribes to Ekertt)',
      namePt: 'Ouro para subornos (opcional)',
      quantity: 'Até 8.500 G em parcelas relatadas de 1.000, 2.500 e 5.000 G; somente na rota de suborno',
      where: 'Ouro acumulado em Bakbattahl, missões e exploração; não é necessário se optar por outra forma de soltura.',
      use: 'Fale com Ekertt na prisão, pague a primeira parcela e retorne após a espera para saber se são necessárias outras; a rota não substitui impedir a morte de Hugo.',
      forgery: 'not-applicable',
      optional: true
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-off-the-pilfered-path-walkthrough/',
      'https://www.gamesradar.com/dragons-dogma-2-off-the-pilfered-path/'
    ]
  },
  beggars_tale: {
    guidance: 'As vestes do mendigo só devem ser ENTREGUES uma vez: Hilda é a rota com sobrevivência de Albert/Celina, Albert mantém a vida dupla e Celina pode gerar final trágico. Falsificação da roupa NÃO permite escolher múltiplas recompensas.',
    items: [{
      name: 'Beggar’s Garb',
      namePt: 'Vestes do mendigo (descrição baseada no objetivo PT-BR da missão)',
      quantity: '1 roupa original de escolha única',
      where: 'Casa de Albert no sudeste do Bairro Popular de Vernworth: espere-o sair à noite, entre na casa destrancada e recolha a roupa.',
      use: 'ESCOLHA um destino. Entregue a Hilda na Mansão Baldwin para preservar vidas; alternativamente a Albert para manter o segredo, ou a Celina para desfecho trágico. Não falsifique.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-beggars-tale-walkthrough/',
      'https://www.pcgamer.com/games/rpg/dragons-dogma-2-a-beggars-tale/'
    ]
  },
  forest_to_forge: {
    guidance: 'São necessários itens APODRECIDOS para cozinhar nutriabh, depois coletar cinza de escama em cave cronometrada. SEIS montes é quantidade máxima relatada, NÃO condição rígida comprovada para concluir. Não confunda cinza de escama com Glimmercoal da missão de Roman.',
    items: [
      {
        name: 'Rotten Apple',
        namePt: 'Maçã apodrecida',
        quantity: '1 maçã APODRECIDA',
        where: 'Colha ou compre uma maçã e mantenha no inventário enquanto passa tempo até estragar.',
        use: 'ENTREGUE a Doireann no Jardim Sagrado junto com o peixe apodrecido para produzir nutriabh.',
        forgery: 'original'
      },
      {
        name: 'Rotten Fish (e.g. Rotten Shorefish)',
        namePt: 'Peixe apodrecido',
        quantity: '1 peixe APODRECIDO',
        where: 'Pesque ou compre peixe, por exemplo em Harve, e deixe apodrecer no inventário.',
        use: 'ENTREGUE a Doireann com a maçã apodrecida; peixe fresco não serve para a receita.',
        forgery: 'original'
      },
      {
        name: 'Nutriabh',
        namePt: 'Nutriabh (nome culinário élfico)',
        quantity: '1 prato preparado por Doireann',
        where: 'Doireann o prepara no Jardim Sagrado quando recebe maçã e peixe apodrecidos.',
        use: 'ENTREGUE a Sara na Forja de Brokkr em Bakbattahl para atrair Brokkr e permitir a entrada na caverna.',
        forgery: 'original'
      },
      {
        name: 'Scalecinder',
        namePt: 'Cinza de escama',
        quantity: 'Até 6 montes conhecidos; coletar tantos quanto possível antes de o tempo acabar',
        where: 'Caverna dos Retardatários, fora de Bakbattahl, em montes próximos de caixas e objetos quebráveis. Vasculhe imediatamente quando Brokkr se afastar.',
        use: 'ENTREGUE a cinza coletada a Doireann ao sair da caverna para ajudá-la a curar o Coração do Jardim. Não equivale a Glimmercoal.',
        forgery: 'original'
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-out-of-the-forest-into-the-forge-walkthrough/',
      'https://www.neoseeker.com/dragons-dogma-2/guides/Out_of_the_Forest_Into_the_Forge'
    ]
  },
  blue_sunbright_house: {
    guidance: 'ENTREGUE OS TRÊS antes de Sebastian viajar: Misshapen Eye + Detoxifying Decoction + Waking Powder. Os itens reduzem a chance de ele ficar preso, adormecer ou morrer envenenado. Se ele não voltar, RESGATE-O perto de Melve em vez de esperar.',
    items: [
      {
        name: 'Misshapen Eye',
        namePt: 'Olho disforme (tradução explicativa)',
        quantity: '1 olho de ciclope; item mais consistentemente documentado',
        where: 'Saqueie o cadáver de um ciclope, por exemplo no caminho Melve–Vernworth. Algumas fontes aceitam Rugged Bone, mas não confie em trocas não verificadas.',
        use: 'ENTREGUE a Sebastian antes da viagem como repelente com cheiro de ciclope.',
        forgery: 'original'
      },
      {
        name: 'Detoxifying Decoction',
        namePt: 'Antídoto contra veneno (tradução explicativa)',
        quantity: '1 unidade',
        where: 'Compre no mercador Philbert em Vernworth ou fabrique com ervas adequadas.',
        use: 'ENTREGUE a Sebastian antes da viagem para tratar intoxicação; se ele sair sem o item e adoecer, leve remédio no resgate.',
        forgery: 'original'
      },
      {
        name: 'Waking Powder',
        namePt: 'Pó despertador (tradução explicativa)',
        quantity: '1 unidade',
        where: 'Compre no mercador Philbert no Bairro Mercantil de Vernworth ou fabrique com ingredientes adequados.',
        use: 'ENTREGUE a Sebastian antes da viagem para evitar ficar incapacitado por sono no caminho de Melve.',
        forgery: 'original'
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-house-of-the-blue-sunbright-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/House-of-the-Blue-Sunbright'
    ]
  },
  gift_giving: {
    guidance: 'Daphne pede flores, 1 minério de prata e 2 de ouro. No pedido final existem fontes com DIFERENTES quantidades: PowerPyx/GamerGuides pedem 5 remédios, Game8 indica 3. Leve 5 Detoxifying Decoctions ou Panaceas e entregue o que o diário de sua versão exigir. Flor murcha não equivale a buquê fresco.',
    items: [
      { name: 'Bunch of Flowers', namePt: 'Buquê de flores', quantity: '1 buquê fresco', where: 'Combine duas espécies diferentes de flores colhidas ou utilize um buquê guardado; não deixe murchar no inventário.', use: 'ENTREGUE a Daphne nos Cortiços de Vernworth logo após aceitar a missão.', forgery: 'original' },
      { name: 'Silver Ore', namePt: 'Minério de prata', quantity: '1 minério', where: 'Depósitos de minérios na Mina de Trevo e outras cavernas; ocasionalmente vendido por mercadores.', use: 'ENTREGUE a Daphne depois do buquê de flores.', forgery: 'original' },
      { name: 'Gold Ore', namePt: 'Minério de ouro', quantity: '2 minérios', where: 'Mineração em cavernas como a Mina de Trevo, vendedores ou estoque; retorne a Daphne após passar cerca de um dia.', use: 'ENTREGUE duas unidades a Daphne depois do minério de prata.', forgery: 'original' },
      { name: 'Detoxifying Decoction (or Panacea)', namePt: 'Decocção desintoxicante (ou panaceia; tradução explicativa)', quantity: '3–5, FONTES DIVERGENTES: levar 5 é precaução', where: 'Loja de Philbert no Bairro Mercantil de Vernworth; também pode combinar Pitywort com Syrupwort Leaf para fabricar a decocção.', use: 'ENTREGUE a Daphne o número solicitado pelo diário. PowerPyx/GamerGuides: 5; Game8: 3. Não confundir com as três unidades destinadas a Sebastian em outra missão.', forgery: 'original' }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-gift-of-giving-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Gift-of-Giving',
      'https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/vernworth/the-gift-of-giving-walkthrough'
    ]
  },
  oxcart_courier: {
    guidance: 'Donovan entrega a carta e 200 G para o trajeto da carroça; a missão depende da CARTA entregue a Lennart em Melve, mesmo se a carroça quebrar. Depois informe Donovan em Vernworth. Não confunda com A Carroça Fantasma.',
    items: [{
      name: 'Letter to Ser Lennart',
      namePt: 'Carta para o senhor Lennart (tradução explicativa)',
      quantity: '1 carta original recebida de Donovan',
      where: 'Donovan entrega na Estação Norte de Carroças de Vernworth quando você aceita a tarefa.',
      use: 'ENTREGUE pessoalmente a Lennart na vila de Melve; depois retorne a Donovan para concluir.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-oxcart-courier-walkthrough/',
      'https://clair.6fast.com/dragons-dogma-2/guide/side-quests/vernworth/oxcart-courier-walkthrough'
    ]
  },
  magisterial_amenity: {
    guidance: 'O objeto exigido é o par de óculos original de Waldhar, escondido em depósito ATRÁS do Salão de Máscaras do castelo. Visite durante o dia se não quiser participar do baile. A recompensa Winter’s Path é recebida DEPOIS da entrega, não pré-requisito.',
    items: [{
      name: 'Exquisite Spectacles',
      namePt: 'Óculos requintados (descrição explicativa)',
      quantity: '1 par original',
      where: 'Sala de depósito nos fundos do Salão de Máscaras, parte oeste do terreno do Castelo de Vernworth.',
      use: 'ENTREGUE a Waldhar no arquivo da Casa Mãos Caridosas, sob os Cortiços de Vernworth.',
      forgery: 'original'
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-magisterial-amenity-walkthrough/',
      'https://dragonsdogma.fandom.com/wiki/A_Magisterial_Amenity'
    ]
  },
  gossamer_clouds: {
    guidance: 'A Unfinished Letter inicia a investigação. Para a recompensa maior, busque Letter to Lord Phaesus no Laboratorium — Workshop #2 e entregue a Sven. Encerrar somente com a interpretação de Waldhar pode dar menos ouro e nenhuma Ferrystone.',
    items: [
      {
        name: 'Unfinished Letter',
        namePt: 'Carta inacabada (descrição explicativa)',
        quantity: '1 documento inicial',
        where: 'Sven entrega em seu quarto no segundo andar do Castelo de Vernworth após O Banquete da Farsa.',
        use: 'Leia para identificar Phaesus; pode ser interpretada por Waldhar na rota curta, com recompensa menor.',
        forgery: 'original'
      },
      {
        name: 'Letter to Lord Phaesus',
        namePt: 'Carta para lorde Phaesus (descrição explicativa)',
        quantity: '1 documento na rota de melhor recompensa',
        where: 'Laboratorium — Workshop #2 do Laboratório de Pesquisa de Magia Proibida, em Bakbattahl, após ouvir os pesquisadores perto da estátua de dragão.',
        use: 'ENTREGUE a Sven em Vernworth para a recompensa maior (fontes relatam 20.000 G e uma Ferrystone).',
        forgery: 'original',
        optional: true
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-veil-of-gossamer-clouds-walkthrough/',
      'https://www.neoseeker.com/dragons-dogma-2/guides/A_Veil_of_Gossamer_Clouds'
    ]
  },
  game_of_wits: {
    guidance: 'ALERTA: dez enigmas, incluindo Reunião; respostas erradas são perdíveis. Use o Rastreador da Esfinge para conferir as soluções antes de responder. O Finder’s Token exige retorno em sete dias do jogo; a Unmaking Arrow é obtida num baú da própria cadeia, não precisa ser comprada antes de começar.',
    items: [
      {
        name: 'Sealing Phial', namePt: 'Frasco Selante (denominação editorial)',
        quantity: '1 unidade, para responder ao enigma dos Olhos',
        where: 'No baú ACIMA da entrada da caverna indicada pela Esfinge no Santuário da Montanha.',
        use: 'Mostre/ENTREGUE o frasco à Esfinge como resposta aos Olhos; não o consuma antes de responder.',
        forgery: 'original'
      },
      {
        name: "Finder's Token", namePt: 'Memento do Descobridor',
        quantity: '1, encontrado dentro de SETE DIAS no jogo após ouvir Ruminação',
        where: 'Surge exatamente no local do PRIMEIRO Seeker’s Token (Memento do Buscador) encontrado na campanha em curso; confira as anotações do rastreador.',
        use: 'ENTREGUE à Esfinge no Santuário da Montanha antes do prazo de sete dias. Não substitua por um Memento do Buscador normal.',
        forgery: 'original'
      },
      {
        name: 'Unmaking Arrow', namePt: 'Flecha da Ruína (denominação editorial)',
        quantity: '1, OPCIONAL para a luta final (rota recomendada)',
        where: 'Baú aberto após resolver corretamente o enigma da Memória no Santuário da Fronteira.',
        use: 'Equipe Arqueiro; DEPOIS de iniciar combate com a Esfinge, acerte a parte não humana do corpo (por exemplo pernas). Não dispare na cabeça; existem relatos de rota alternativa de combate.',
        forgery: 'not-applicable', optional: true
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/',
      'https://www.rpgsite.net/guide/15635-dragons-dogma-2-a-game-wit-where-to-find-how-to-solve-all-sphinxs-riddles'
    ]
  },
  tolled_to_rest: {
    guidance: 'O grimoire Nation’s Death Knell é relevante para Trysha/Myrddin, mas costuma estar no pedestal da sala do sino; o objeto não deve ser confundido com a Ancient Battleground Key recebida COMO RECOMPENSA. Game8 relata procedimento especial caso o livro já tenha sido retirado.',
    items: [{
      name: "Nation's Death Knell", namePt: 'Dobre de Finados da Nação',
      quantity: '1 ORIGINAL no pedestal (ou no inventário/depósito se coletado antes)',
      where: 'Sala do sino no Campo de Batalha Antigo, destino de Oskar; existe outro exemplar na Gruta da Cachoeira.',
      use: 'Se o livro está no pedestal, permita a interação de Oskar; se o removeu previamente e a missão não avança, recupere-o e confira a solicitação no diário. Depois, preserve o original para Trysha ou Myrddin.',
      forgery: 'original', optional: true
    }],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-tolled-to-rest-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Tolled-to-Rest'
    ]
  },
  masked_correspondence: {
    guidance: 'Sven entrega UMA carta para Lord Patrick. Atenção à identidade antes de escolher Entregar: GamerGuides relata falha se a carta for dada a outro convidado. Roupas e máscara são de EQUIPAR, não devem ser entregues. Não confundir com as cartas de Um Véu de Finas Nuvens.',
    items: [
      {
        name: 'Letter to Lord Patrick', namePt: 'Carta para Lord Patrick (descrição explicativa)',
        quantity: '1 carta original, sem cópia necessária',
        where: 'Recebida de Sven no segundo andar do Castelo de Vernworth após aceitar Masked Correspondence.',
        use: 'ENTREGUE exclusivamente a Lord Patrick no baile, identificado pela capa azul e máscara preta e dourada sem juba. Depois informe Sven.',
        forgery: 'original'
      },
      {
        name: 'Courtly Tunic + Courtly Breeches', namePt: 'Túnica Cortês + Calção Cortês',
        quantity: '1 conjunto de roupa de corte equipado',
        where: 'Baús e aposentos do Bairro Nobre/Castelo de Vernworth; o conjunto é usado também em O Trono Roubado.',
        use: 'EQUIPE as duas peças para entrar discretamente no Salão de Máscaras. Não as entregue ao destinatário da carta.',
        forgery: 'not-applicable'
      },
      {
        name: 'Eventide Mask', namePt: 'Máscara de baile (tradução explicativa)',
        quantity: '1 máscara equipada',
        where: 'Obtida na campanha de O Trono Roubado com o Capitão Brant; se perdida, PowerPyx relata reposição por Ibrahim no Posto do Retiro.',
        use: 'EQUIPE junto ao traje cortesão para entrar na festa à noite. Não é um item de entrega.',
        forgery: 'not-applicable'
      }
    ],
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-masked-correspondence-walkthrough/',
      'https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/vernworth/masked-correspondence-walkthrough'
    ]
  },
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
  'poisonous_proposal', 'dreams_apart', 'halls_first_dawn',
  'regentkins_resolve', 'when_wills_collide',
  'gaoled_awakening', 'tales_beginning', 'in_dragons_wake',
  'seat_sovran', 'convergence', 'prey_for_pack', 'ailing_arborheart'
];
