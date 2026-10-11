/**
 * Guias de missões verificadas em fontes independentes; não confundir com os 53
 * marcos editoriais do roteiro, que agrupam várias missões.
 * Títulos de itens mágicos em EN evitam traduções PT-BR sem prova primária.
 */
export interface QuestGuide {
  id: string;
  title: string;
  original: string;
  region: string;
  giver: string;
  relatedEventIds: readonly string[];
  preparation: readonly string[];
  steps: readonly string[];
  completion: string;
  references: readonly string[];
}

export interface ForgeryItem {
  id: string;
  item: string;
  forged: string;
  obtain: string;
  originalTo: string;
  copyTo: string;
  action: string;
  references: readonly string[];
}

const POWERPYX_GRIMOIRES = 'https://www.powerpyx.com/dragons-dogma-2-all-grimoire-locations/';
const GAME8_APPRAISAL = 'https://game8.co/games/Dragons-Dogma-2/archives/The-Sorcerers-Appraisal';

export const FORGERY_ITEMS: readonly ForgeryItem[] = [
  {
    id: 'fulminous_shield', item: 'Fulminous Shield', forged: 'Fruminous Shield',
    obtain: 'Compre de Dudley em Melve, perto da entrada norte.',
    originalTo: 'Trysha (Magia Vertiginosa)',
    copyTo: 'Myrddin (O Julgamento do Feiticeiro)',
    action: 'Separe o original antes de criar a falsificação. Se negociar com Wendy na Vila Sem Nome por Howling Blizzard, ofereça uma cópia.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'nations_death_knell', item: "Nation's Death Knell", forged: "Nation's Death Knock",
    obtain: 'Há exemplares na Caverna da Cascata e no Campo de Batalha Antigo.',
    originalTo: 'Trysha',
    copyTo: 'Myrddin (ou entregue um segundo original, se preferir)',
    action: 'Dois exemplares originais permitem economizar uma falsificação.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'howling_blizzard', item: 'Howling Blizzard', forged: 'Hurling Blizzard',
    obtain: "No baú da Caverna da Cascata, junto de Nation's Death Knell.",
    originalTo: 'Trysha',
    copyTo: 'Myrddin',
    action: 'Não troque o único original por engano.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'towering_earth', item: 'Towering Earth', forged: 'Lowering Earth',
    obtain: 'Peça a Waldhar depois de encontrar o magistrado e sua nova biblioteca.',
    originalTo: 'Trysha',
    copyTo: 'Myrddin',
    action: 'Copie antes de entregar.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'let_there_be_light', item: 'Let There Be Light', forged: 'Let There Be Lite',
    obtain: 'Encontre no andar superior da casa de Myrddin, na Cidade de Descanso da Fronteira.',
    originalTo: 'Trysha',
    copyTo: 'Myrddin',
    action: 'Pegue o livro antes de concluir as entregas.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'jadeite_orb', item: 'Jadeite Orb (Orbe de Jadeíta)', forged: 'Imitation Jadeite Orb',
    obtain: 'Compre o orbe com Ibrahim na Cidade de Descanso da Fronteira.',
    originalTo: 'Everard',
    copyTo: 'Offulve',
    action: 'Everard verifica a autenticidade com Ibrahim; não troque os destinatários.',
    references: ['https://game8.co/games/Dragons-Dogma-2/archives/Hunt-for-the-Jadeite-Orb', 'https://www.windowscentral.com/gaming/dragons-dogma-2-hunt-for-the-jadeite-orb-quest-guide-location-who-to-give-it-to-and-all-outcomes']
  },
  {
    id: 'transference_souls_2', item: 'On the Transference of Souls 2', forged: 'On the Transit of Souls 2',
    obtain: 'Compre o segundo tomo com Ibrahim para a missão de Isaac em Bakbattahl.',
    originalTo: 'Guarde com você',
    copyTo: 'Isaac',
    action: 'Entregar a cópia protege a família de Isaac; entregar o original produz outro desfecho.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Short-Sighted-Ambition']
  },
  {
    id: 'gaol_key', item: 'Gaol Key (Chave da Prisão)', forged: 'Cópia funcional da Gaol Key',
    obtain: 'Receba de Brant em O Magistrado Aprisionado.',
    originalTo: 'Devolva a Brant ao concluir a missão',
    copyTo: 'Guarde com você',
    action: 'Ibrahim produz uma cópia funcional. Essa falsificação é para uso próprio, não para entregar a NPCs.',
    references: ['https://game8.co/games/Dragons-Dogma-2/archives/448892', 'https://www.windowscentral.com/gaming/dragons-dogma-2-guide-the-caged-magistrate-quest-walkthrough']
  }
];

export const QUEST_GUIDES: readonly QuestGuide[] = [
  {
    id: 'spellbound', title: 'Magia Vertiginosa', original: 'Spellbound',
    region: 'Casa de Eini, ao norte de Melve', giver: 'Trysha',
    relatedEventIds: ['m03', 'v206', 'p03'],
    preparation: ['Separe pelo menos três grimórios autênticos. Não entregue falsificações a Trysha.', 'Conserve cópias para a missão de Myrddin antes de entregar os originais.'],
    steps: [
      'Encontre Trysha na casa de Eini, ao norte de Melve. Converse com ela quando Eini não estiver no cômodo.',
      'Reúna pelo menos três grimórios da lista: Fulminous Shield, Howling Blizzard, Nation’s Death Knell, Towering Earth e Let There Be Light.',
      'Entregue os grimórios originais a Trysha; não use os exemplares forjados.',
      'Depois de algum tempo no jogo, volte à casa. Espere Trysha gastar sua magia, desvie dos feitiços e agarre-a quando estiver exausta. Não a ataque.',
      'Afaste-se e descanse antes de voltar. Converse novamente com Trysha e Eini para receber os ensinamentos.'
    ],
    completion: 'Conclua a missão e confira os pergaminhos recebidos de Trysha e Eini no inventário.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-spellbound-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Spellbound']
  },
  {
    id: 'sorcerers_appraisal', title: 'O Julgamento do Feiticeiro', original: "The Sorcerer's Appraisal",
    region: 'Cidade de Descanso da Fronteira', giver: 'Myrddin',
    relatedEventIds: ['m03', 'v206', 'p03'],
    preparation: ['Vista a túnica e as calças da corte para entrar na residência de Myrddin.', 'Separe três falsificações de grimórios diferentes; reserve os originais para Trysha.'],
    steps: [
      'Entre na casa de Myrddin com o traje de corte e converse com ele.',
      'Obtenha os grimórios e visite Ibrahim, na mesma cidade, para produzir cópias falsas dos volumes que pretende entregar.',
      'Retorne a Myrddin e entregue pelo menos três falsificações diferentes. Confira os nomes das cópias na tela de entrega.',
      'Após a conclusão, converse novamente com Myrddin se ainda não recebeu o ensinamento de mestre. A afinidade pode exigir uma visita posterior.'
    ],
    completion: 'Confira o pergaminho de Myrddin (Maelstrom). A conclusão da missão e a obtenção do ensinamento são pontos de acompanhamento distintos.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-sorcerers-appraisal-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Sorcerers-Appraisal']
  },
  {
    id: 'jadeite', title: 'Orbe de Jadeíta', original: 'Hunt for the Jadeite Orb',
    region: 'Cidade de Descanso da Fronteira', giver: 'Offulve e Everard',
    relatedEventIds: [],
    preparation: ['Reserve ouro para comprar o orbe e solicitar a falsificação.', 'É preciso distinguir claramente original e cópia no inventário.'],
    steps: [
      'Converse com Offulve e Everard, que procuram o mesmo orbe.',
      'Compre a Jadeite Orb autêntica com Ibrahim, na loja de sucatas da cidade.',
      'Peça a Ibrahim para criar uma falsificação do orbe e volte para buscá-la quando estiver pronta.',
      'Entregue o orbe autêntico a Everard; ele confere sua autenticidade com Ibrahim.',
      'Entregue a falsificação a Offulve para concluir a parte dele.'
    ],
    completion: 'Essa sequência permite receber as recompensas dos dois interessados, sem precisar enganar a verificação de Everard.',
    references: ['https://game8.co/games/Dragons-Dogma-2/archives/Hunt-for-the-Jadeite-Orb', 'https://www.windowscentral.com/gaming/dragons-dogma-2-hunt-for-the-jadeite-orb-quest-guide-location-who-to-give-it-to-and-all-outcomes']
  },
  {
    id: 'short_sighted', title: 'Ambição Cega', original: 'Short-Sighted Ambition',
    region: 'Bakbattahl', giver: 'Isaac, na loja de itens',
    relatedEventIds: ['b03'],
    preparation: ['Antes de entregar o segundo tomo, escolha qual desfecho deseja. A cópia preserva a família de Isaac.'],
    steps: [
      'Fale com Isaac em sua loja e ajude-o a obter um marmelo maduro. Volte após ele avançar na leitura.',
      'Compre On the Transference of Souls 2 com Ibrahim na Cidade de Descanso da Fronteira.',
      'Peça a falsificação do livro e retire On the Transit of Souls 2 quando estiver pronta.',
      'Entregue a Isaac o exemplar chamado On the Transit of Souls 2 — a falsificação. Não confunda com Transference.',
      'Acompanhe Isaac e volte à loja depois para continuar a história familiar.'
    ],
    completion: 'Com o livro forjado, Isaac abandona o ritual; a família sobrevive. Guarde o volume original.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Short-Sighted-Ambition']
  },
  {
    id: 'caged_magistrate', title: 'O Magistrado Aprisionado', original: 'The Caged Magistrate',
    region: 'Vernworth', giver: 'Capitão Brant',
    relatedEventIds: ['v103'],
    preparation: ['Brant entrega a Chave da Prisão. Se quiser continuar com uma chave funcional, solicite uma cópia a Ibrahim antes de concluir com Brant.'],
    steps: [
      'À noite, fale com Brant na taverna Stardrop Inn e aceite investigar Waldhar.',
      'Entre na prisão do castelo, use a chave fornecida por Brant e converse com Waldhar. Ele pede um local com muitos livros.',
      'Vá aos bairros pobres e ajude Kendrick em A História sob a Profundez (The Heel of History), encontrando Malcolm e a biblioteca subterrânea.',
      'Volte à cela, conte a Waldhar sobre a biblioteca e acompanhe-o até a saída da prisão.',
      'Converse com Brant à noite para concluir a missão. Ele recebe de volta a chave emprestada.'
    ],
    completion: 'O magistrado passa a frequentar a biblioteca subterrânea. A cópia de chave feita com Ibrahim fica com você.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-caged-magistrate-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Caged-Magistrate']
  },
  {
    id: 'new_recruit', title: 'Provações de um Novo Recruta', original: 'Ordeals of a New Recruit',
    region: 'Posto Avançado da Guarda, norte de Vermund', giver: 'Phill',
    relatedEventIds: ['m02'],
    preparation: ['Aceite o pedido de Phill antes de deixar o posto; o diário marca a missão como temporizada.'],
    steps: [
      'Ao sair pelo portão sul do Posto Avançado da Guarda, fale com Phill e aceite ajudar Accardo.',
      'Siga pela estrada ao sul em direção ao marcador de Accardo.',
      'Derrote as harpias que atacam o soldado. Se não tiver ataques à distância, espere as harpias descerem ou use os peões.',
      'Volte ao Posto Avançado e converse com Phill para concluir o resgate.'
    ],
    completion: 'Conversa final com Phill. Faça o resgate assim que receber a missão.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-ordeals-of-a-new-recruit-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Ordeals-of-a-New-Recruit']
  },
  {
    id: 'medicament', title: 'Bravura Revigorante', original: 'Medicament Predicament',
    region: 'Melve, junto à farmácia de Runne', giver: 'Flora',
    relatedEventIds: ['m04'],
    preparation: ['Você precisa de um Fruit Roborant (revigorante de frutas), comprado ou fabricado.'],
    steps: [
      'Fale com Flora do lado de fora da farmácia em Melve e aceite ajudá-la.',
      'Compre Fruit Roborant na farmácia ou combine fruta seca com Greenwarish/Morningtide para fabricar o item.',
      'Confira no inventário que você possui pelo menos uma unidade.',
      'Volte a Flora e entregue o revigorante para concluir a missão.'
    ],
    completion: 'Entrega do revigorante a Flora, com recompensa da missão.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-medicament-predicament-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Medicament-Predicament']
  },
  {
    id: 'nesting', title: 'Problemas Aninhados', original: 'Nesting Troubles',
    region: 'Melve, perto do poço', giver: 'Lennart',
    relatedEventIds: ['m04'],
    preparation: ['A missão aparece depois de avançar a história até Vernworth e retornar a Melve.'],
    steps: [
      'Fale com Lennart perto do poço na parte danificada de Melve.',
      'Pegue os barris explosivos perto do rio e arremesse-os no ninho de sauros na outra margem.',
      'Volte a Lennart: ele dará uma segunda tarefa, desta vez com veneno.',
      'Pegue o jarro de veneno próximo à entrada de Melve e arremesse-o no mesmo local do ninho.',
      'Retorne a Lennart para finalizar a missão.'
    ],
    completion: 'A missão só termina depois do segundo retorno a Lennart.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-nesting-troubles-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Nesting-Troubles']

  },
  {
    id: 'provisioners_plight', title: 'Um Fornecedor em Apuros', original: "The Provisioner's Plight",
    region: 'Posto Avançado da Guarda', giver: 'Geoffrey',
    relatedEventIds: ['m02'],
    preparation: ['Separe três Harspuds e dois Salubrious Draughts. Os draughts podem ser fabricados combinando frutas com ervas curativas.'],
    steps: [
      'Encontre Geoffrey entre as tendas do Posto Avançado da Guarda e aceite levar o recado.',
      'Siga pela trilha ao norte até Markus e entregue a nota do fornecedor.',
      'Recolha três Harspuds nas áreas marcadas. Prepare também dois Salubrious Draughts; uma combinação possível é maçã com Greenwarish.',
      'Entregue as três Harspuds e os dois Salubrious Draughts a Markus.',
      'Volte ao Posto Avançado e converse novamente com Geoffrey para concluir.'
    ],
    completion: 'A entrega a Markus não encerra a missão: converse com Geoffrey depois.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-provisioners-plight-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/448764']
  },
  {
    id: 'brothers_brave', title: 'A Tímida Bravura dos Irmãos', original: 'Brothers Brave and Timid',
    region: 'Melve', giver: 'Ian, perto da casa de Lennart',
    relatedEventIds: ['m04'],
    preparation: ['Aceite a missão com Ian antes de avançar muito as missões posteriores de Melve.', 'Prepare curativos e deixe os peões acompanhar o grupo.'],
    steps: [
      'Converse com Ian em Melve e concorde em procurar o irmão dele, Norbert.',
      'Siga Ian pela trilha ao norte de Melve e proteja-o dos monstros encontrados no caminho.',
      'No bosque, derrote os lobos que atacam Norbert.',
      'Quando os irmãos estiverem reunidos, acompanhe os dois de volta até Melve.',
      'Entre na vila com eles para concluir a missão.'
    ],
    completion: 'O resgate e a escolta de volta à vila fazem parte da mesma missão.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-brothers-brave-and-timid-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Brothers-Brave-and-Timid']
  },
  {
    id: 'vocation_frustration', title: 'Frustração Vocacional', original: 'Vocation Frustration',
    region: 'Vernworth e Mina de Trevo', giver: 'Klaus, na Guilda de Vocações',
    relatedEventIds: ['v102'],
    preparation: ['A missão consome as armas entregues a Klaus. Não entregue uma arma equipada que queira preservar.', 'A ida à mina também serve para cumprir parte de Elimine os Monstros, de Brant.'],
    steps: [
      'Na Guilda de Vocações de Vernworth, tente consultar Guerreiro ou Feiticeiro e converse com Klaus.',
      'Fale com Roderick na ferraria da praça para receber a indicação da Mina de Trevo.',
      'Entre na Mina de Trevo. No primeiro trecho, encontre o baú da espada de duas mãos Two-Hander.',
      'Na grande caverna de vários níveis e passarelas, desça até o piso inferior e procure o caminho lateral com o baú do cajado Grievous Horns.',
      'Leve as duas armas a Klaus e entregue-as para liberar as vocações Guerreiro e Feiticeiro.'
    ],
    completion: 'Depois da entrega das armas, as duas vocações ficam disponíveis na guilda.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-vocation-frustration-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Vocation-Frustration']
  },
  {
    id: 'gift_of_bow', title: 'O Dom do Arco', original: 'Gift of the Bow',
    region: 'Bairro Comercial de Vernworth e Ruínas da Montanha', giver: 'Glyndwr',
    relatedEventIds: ['v102'],
    preparation: ['Tenha um arco para dar a Glyndwr.', 'Na etapa de treinamento, troque para a vocação Arqueiro antes de encontrá-lo nas ruínas.'],
    steps: [
      'Encontre Glyndwr próximo à ferraria de Roderick, no Bairro Comercial de Vernworth.',
      'Entregue a ele um arco e aceite o convite para treinar.',
      'Siga até as Ruínas da Montanha, a noroeste da capital, e encontre Glyndwr no lugar marcado.',
      'Equipe a vocação Arqueiro e atire em um dos alvos suspensos entre os arcos de pedra.',
      'Converse novamente com Glyndwr para terminar o treinamento.'
    ],
    completion: 'A demonstração com arco libera a próxima missão de Glyndwr, A Prova de Arco e Flecha.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-gift-of-the-bow-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Gift-of-the-Bow']
  },
  {
    id: 'trial_of_archery', title: 'A Prova de Arco e Flecha', original: 'A Trial of Archery',
    region: 'Vernworth, Bosque Sagrado e Câmara Ancestral', giver: 'Glyndwr',
    relatedEventIds: ['v102'],
    preparation: ['Conclua O Dom do Arco antes de procurar Glyndwr novamente.', 'Reserve curativos para a caminhada e o resgate de Doireann.'],
    steps: [
      'Depois de O Dom do Arco, encontre Glyndwr novamente próximo à ferraria de Roderick em Vernworth.',
      'Vá ao ponto de encontro indicado na floresta e acompanhe Glyndwr até o Bosque Sagrado.',
      'Após a cena na vila élfica, siga até a Câmara Ancestral para procurar Doireann.',
      'Avance pela câmara até encontrar Doireann e o ogro. Quando ela cair, pegue-a no colo e leve-a para fora. Se derrotar o ogro, o caminho de saída fica mais simples.',
      'Converse com Taliesin após a retirada de Doireann para terminar a missão.'
    ],
    completion: 'Fale com Taliesin ao final. Esta missão também prepara o relacionamento com os elfos para atividades posteriores.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-a-trial-of-archery-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/A-Trial-of-Archery']
  },
  {
    id: 'heel_of_history', title: 'A História sob a Profundez', original: 'The Heel of History',
    region: 'Bairro Pobre de Vernworth', giver: 'Kendrick, diante da Mão Graciosa',
    relatedEventIds: ['v103'],
    preparation: ['Tenha comida e algum ouro para as doações pedidas por Kendrick.', 'O local descoberto nesta missão serve também para O Magistrado Aprisionado.'],
    steps: [
      'Encontre Kendrick diante da Mão Graciosa no Bairro Pobre e faça as doações solicitadas até ele pedir ajuda para procurar Malcolm.',
      'Pergunte pelo menino às crianças da vizinhança: um menino perto dos escombros, outro no mirante e uma menina dentro da Mão Graciosa.',
      'Volte a Kendrick com as informações. Siga-o até a entrada bloqueada das galerias subterrâneas.',
      'Entre no subterrâneo e procure Malcolm pelo caminho até encontrá-lo.',
      'Acompanhe Malcolm até a biblioteca escondida. Depois, informe Waldhar sobre a biblioteca na missão O Magistrado Aprisionado.'
    ],
    completion: 'Encontrar Malcolm e alcançar a biblioteca encerra a busca; a mesma biblioteca resolve a exigência de Waldhar.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-heel-of-history-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Heel-of-History']
  },
  {
    id: 'ornate_box', title: 'A Caixa Ornamentada', original: 'The Ornate Box',
    region: 'Bairro Comercial de Vernworth', giver: 'Sven, junto às lojas da praça',
    relatedEventIds: ['v103'],
    preparation: ['Reserve ouro para comprar a caixa, caso escolha entregá-la a Sven em vez de dar dinheiro.', 'Volte à praça em dias posteriores para receber as recompensas.'],
    steps: [
      'Observe Sven discutindo com Auriol em frente à loja do Bairro Comercial.',
      'Converse com Sven e escolha entre comprar a Caixa Ornamentada para ele ou dar o dinheiro solicitado.',
      'Depois que Sven sair, passe pelo menos um dia no jogo e procure-o sentado junto à fonte da praça.',
      'Fale com Sven para receber a primeira parte da recompensa. Repita as visitas à fonte em outros dois dias.',
      'Na última conversa, receba a recompensa final, incluindo o traje de corte.'
    ],
    completion: 'São encontros em dias diferentes; a primeira conversa após comprar a caixa não encerra a missão.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-ornate-box-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Ornate-Box']
  },
  {
    id: 'readvent_calamity', title: 'Revinda da Calamidade', original: 'Readvent of Calamity',
    region: 'Melve e Aldeia de Harve', giver: 'Iniciada pelo ataque do dragão em Melve',
    relatedEventIds: ['v107', 'v202'],
    preparation: ['Enquanto estiver cumprindo as missões de Brant em Vernworth, volte a Melve antes de concluir O Banquete da Farsa.', 'Não use uma condição específica de viagem como garantia de ativação: os guias divergem sobre o gatilho anterior ao ataque.'],
    steps: [
      'Quando o dragão atacar Melve, ajude os moradores a repelir a criatura. Se Sigurd estiver presente, fale com ele para liberar Lanceiro Místico.',
      'Retorne a Melve depois de algum tempo e converse com Ulrika na casa dela.',
      'Após os acontecimentos com Ulrika, fale com Lennart quando ele pedir notícias sobre ela.',
      'Vá à Aldeia de Harve e procure Ulrika. A cadeia de missões da vila pode começar com As Mãos Atadas que Abraçam a Causa.',
      'Depois de falar com Ulrika em Harve, retorne a Melve e conte a Lennart que a encontrou.'
    ],
    completion: 'A conversa de retorno com Lennart encerra esta missão; a história de Ulrika continua em outras missões.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-readvent-of-calamity-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Readvent-of-Calamity']
  }


];

/** O índice é editorial e não representa a totalidade das missões do jogo. */
export const questGuidesForEvent = (eventId: string): readonly QuestGuide[] =>
  QUEST_GUIDES.filter(guide => guide.relatedEventIds.includes(eventId));
