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
  }
];

/** O índice é editorial e não representa a totalidade das missões do jogo. */
export const questGuidesForEvent = (eventId: string): readonly QuestGuide[] =>
  QUEST_GUIDES.filter(guide => guide.relatedEventIds.includes(eventId));
