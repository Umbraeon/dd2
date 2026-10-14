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
  itemPt?: string;
  forged: string;
  forgedPt?: string;
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
    id: 'fulminous_shield', item: 'Fulminous Shield', itemPt: 'Escudo Fulminante',
    forged: 'Fruminous Shield', forgedPt: 'Escudo Fulgentante',
    obtain: 'Compre de Dudley perto da entrada norte de Melve por 5.000 G (ele pode mudar de local após a compra, aparecendo no Posto do Retiro). Cópia com Ibrahim custa 6.000 G.',
    originalTo: 'Trysha (Magia Vertiginosa)',
    copyTo: 'Myrddin (O Julgamento do Feiticeiro)',
    action: 'Separe o original antes de criar a falsificação. Se negociar com Wendy no Vilarejo sem Nome por Howling Blizzard, ofereça uma cópia.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'nations_death_knell', item: "Nation's Death Knell", itemPt: "Dobre de Finados da Nação",
    forged: "Nation's Death Knock", forgedPt: "Dobla de Finados da Nação",
    obtain: 'Um exemplar em baú no 2º piso da Gruta da Cachoeira (Caverna da Cascata), junto de Howling Blizzard; outro em pedestal no 2º piso da fortaleza do Antigo Campo de Batalha (Campo de Batalha Antigo) (missão Tolled to Rest). Dois originais existem no jogo.',
    originalTo: 'Trysha',
    copyTo: 'Myrddin (ou entregue um segundo original, se preferir)',
    action: 'Dois exemplares originais permitem economizar uma falsificação.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'howling_blizzard', item: 'Howling Blizzard', itemPt: 'Nevasca Uivante',
    forged: 'Hurling Blizzard', forgedPt: 'Nevasca Ululante',
    obtain: "No baú do 2º piso da Gruta da Cachoeira (Caverna da Cascata) junto de Nation's Death Knell (abrir o baú invoca um Wight). Alternativamente, troque Fruminous Shield (Escudo Fulgentante) com Wendy no Vilarejo sem Nome.",
    originalTo: 'Trysha',
    copyTo: 'Myrddin',
    action: 'Não troque o único original por engano.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'towering_earth', item: 'Towering Earth', itemPt: 'Terra Imponente',
    forged: 'Lowering Earth', forgedPt: 'Terra Impendente',
    obtain: 'Receba de Waldhar após O Magistrado Aprisionado, na biblioteca subterrânea das galerias da Mão Graciosa (Bairro Pobre de Vernworth). Volte a conversar com ele se não receber na primeira interação.',
    originalTo: 'Trysha',
    copyTo: 'Myrddin',
    action: 'Copie antes de entregar.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'let_there_be_light', item: 'Let There Be Light', itemPt: 'Que Haja Luz',
    forged: 'Let There Be Lite', forgedPt: 'Que Haja Lustre',
    obtain: 'Pegue sobre a mesa no andar superior da casa de Myrddin no Posto do Retiro (Cidade de Descanso da Fronteira); entre pela sacada a partir da parede externa para evitar conflito com ele.',
    originalTo: 'Trysha',
    copyTo: 'Myrddin',
    action: 'Pegue o livro antes de concluir as entregas.',
    references: [POWERPYX_GRIMOIRES, GAME8_APPRAISAL]
  },
  {
    id: 'jadeite_orb', item: 'Jadeite Orb (Orbe de Jadeíta)', itemPt: 'Esfera de Jade',
    forged: 'Imitation Jadeite Orb', forgedPt: 'Esfera de Jaspe',
    obtain: 'Compre a Esfera de Jade (Jadeite Orb) com Ibrahim por 7.500 G no Posto do Retiro (Cidade de Descanso da Fronteira) e encomende a falsificação por 2.000 G.',
    originalTo: 'Everard',
    copyTo: 'Offulve',
    action: 'Everard verifica a autenticidade com Ibrahim; entregue o original (Esfera de Jade) a ele e a cópia (Esfera de Jaspe) a Offulve.',
    references: ['https://game8.co/games/Dragons-Dogma-2/archives/Hunt-for-the-Jadeite-Orb', 'https://www.windowscentral.com/gaming/dragons-dogma-2-hunt-for-the-jadeite-orb-quest-guide-location-who-to-give-it-to-and-all-outcomes']
  },
  {
    id: 'transference_souls_2', item: 'On the Transference of Souls 2', itemPt: 'A Transferência de Almas 2',
    forged: 'On the Transit of Souls 2', forgedPt: 'A Transparência de Almas 2',
    obtain: 'Compre o segundo tomo com Ibrahim por 2.000 G no Posto do Retiro para a missão de Isaac em Bakbattahl, e encomende a cópia por 2.400 G.',
    originalTo: 'Guarde com você',
    copyTo: 'Isaac',
    action: 'Entregar a cópia (A Transparência de Almas 2) protege a família de Isaac; entregar o original produz tragédia familiar.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Short-Sighted-Ambition']
  },
  {
    id: 'gaol_key', item: 'Gaol Key (Chave da Prisão)', itemPt: 'Chave da Prisão',
    forged: 'Makeshift Gaol Key (Chave Frágil da Prisão)', forgedPt: 'Chave Frágil da Prisão',
    obtain: 'Receba de Brant em O Magistrado Aprisionado. Ibrahim produz a cópia funcional descartável (Chave Frágil da Prisão) por 3.000 G no Posto do Retiro.',
    originalTo: 'Devolva a Brant ao concluir a missão',
    copyTo: 'Guarde com você',
    action: 'Ibrahim produz uma cópia funcional descartável (quebra após 1 uso). Essa falsificação é para uso próprio em celas futuras, não para entregar a Brant.',
    references: ['https://game8.co/games/Dragons-Dogma-2/archives/448892', 'https://www.windowscentral.com/gaming/dragons-dogma-2-guide-the-caged-magistrate-quest-walkthrough']
  }
];

export const QUEST_GUIDES: readonly QuestGuide[] = [
  {
    id: 'nation_lambent_flame', title: 'Nação da Chama Luzente', original: 'Nation of the Lambent Flame',
    region: 'Vernworth, Posto de Controle da Fronteira e estrada até Bakbattahl',
    giver: 'Brant, após O Banquete da Farsa',
    relatedEventIds: ['v304', 'b01'],
    preparation: [
      'Depois de O Banquete da Farsa, fale com Brant e examine qual permissão de fronteira recebeu. A decisão sobre Bermudo em Uma Sombra à Espreita pode mudar o tipo de passe.',
      'Antes de sair de Vernworth, conclua as missões opcionais que ainda deseja fazer, principalmente as cadeias de Ulrika e Wilhelmina. A viagem é longa e a fronteira separa duas regiões.',
      'Na versão com Border Entry Permit comum, qualquer raça pode cruzar pelo portão. Com Beastren Border Entry Permit, personagens humanos precisam de Beastren Mask para usar a passagem oficial.'
    ],
    steps: [
      'Saia de Vernworth pelo noroeste e siga até a Cidade de Descanso da Fronteira. O carro de boi da saída noroeste pode encurtar o caminho, mas é possível sofrer ataques durante o trajeto.',
      'No Posto de Controle da Fronteira, confira o passe no inventário. Se Brant interrogou Bermudo, o Border Entry Permit comum permite solicitar passagem ao guarda sem disfarce.',
      'Se recebeu Beastren Border Entry Permit, apresente-o como beastren; sendo humano, compre e equipe Beastren Mask na loja de Ibrahim antes de falar com o guarda.',
      'Para tentar a conquista Tô Dentro!, considere a alternativa clandestina: esconda-se na parte traseira de uma carruagem nobre que atravessa o portão. A passagem ilegal é opcional e pode provocar reação dos guardas se você for descoberto.',
      'Depois de cruzar, siga pelas estradas de Battahl rumo ao sul até Bakbattahl. Prepare poções, acampamento e peões para os grupos de inimigos no percurso.',
      'Na entrada da cidade, procure a hospedaria Rockmouse’s Burrow e converse com Menella, seguindo a indicação da missão.',
      'Receba a Battahl Residence Permit de Menella e confira a conclusão da missão no diário. Essa permissão facilita as futuras travessias regulares da fronteira.'
    ],
    completion: 'A conversa com Menella em Rockmouse’s Burrow encerra Nação da Chama Luzente. A travessia clandestina para Tô Dentro! é um objetivo opcional distinto da conclusão da missão principal.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-nation-of-the-lambent-flame-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Nation-of-the-Lambent-Flame',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Arisens-Shadow'
    ]
  },
  {
    id: 'new_godsway', title: 'Um Novo Chamado Divino', original: 'A New Godsway',
    region: 'Bakbattahl, laboratório Forbidden Magick Research Lab sob Flamebearer Palace',
    giver: 'Ambrosius',
    relatedEventIds: ['p04', 'p07'],
    preparation: [
      'Conclua Convergence e tenha consigo a Dulled Godsbane Blade obtida com Rothais; então procure Ambrosius no Forbidden Magick Research Lab, sob o palácio de Bakbattahl.',
      'Antes de entregar os cristais e avançar para a missão seguinte, revise missões opcionais, conquistas de oportunidade única, equipamentos, vocações e os salvamentos que sua versão realmente permite recuperar.',
      'Para tentar a conquista de derrotar Gigantus rapidamente, providencie com antecedência uma Unmaking Arrow e esteja pronto para usar Arqueiro com arco; a flecha é consumível e exige planejamento.'
    ],
    steps: [
      'Vá ao Flamebearer Palace em Bakbattahl e entre no Forbidden Magick Research Lab, em um nível inferior; procure Ambrosius e entregue a Dulled Godsbane Blade.',
      'Concorde em conseguir quinze Wyrmslife Crystals para o pesquisador. Você pode obtê-los ao enfrentar dracos e outros dragões, inclusive na rota de Dragonsbreath Tower.',
      'Prepare seu grupo para os combates com dragões e reúna pelo menos quinze Wyrmslife Crystals; confirme no inventário antes de retornar.',
      'Antes de concluir a entrega, faça sua revisão de missões pendentes e anote suas opções reais de salvamento. Não presuma que um salvamento automático permitirá voltar a esse ponto.',
      'Retorne ao laboratório e entregue os quinze Wyrmslife Crystals a Ambrosius.',
      'Passe aproximadamente um dia no jogo, fora do laboratório, e retorne a Ambrosius para receber a Empowered Godsbane Blade.',
      'Confira no diário a conclusão de Um Novo Chamado Divino e o início da missão O Guardião Gigantus.'
    ],
    completion: 'Receber a Empowered Godsbane Blade encerra a missão e inicia a próxima etapa. A exploração do caminho para Gigantus e da torre seguinte pode levar ao trecho final da campanha; complete primeiro tudo que não quiser arriscar.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-new-godsway-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/A-New-Godsway',
      'https://www.gamerguides.com/dragons-dogma-2/guide/walkthrough/bakbattahl/dragons-dogma-2-convergence-walkthrough'
    ]
  },
  {
    id: 'guardian_gigantus', title: 'O Guardião Gigantus', original: 'The Guardian Gigantus',
    region: 'Sul de Bakbattahl, portão Spellseal, Ilha Vulcânica de Agamen e acesso a Moonglint Tower',
    giver: 'Missão principal iniciada após Um Novo Chamado Divino',
    relatedEventIds: ['p04', 'p05'],
    preparation: [
      'Confira a conclusão de Um Novo Chamado Divino e a posse da Empowered Godsbane Blade. Antes de atravessar o Spellseal Door ao sul de Bakbattahl, revise conteúdo opcional, equipamentos e salvamentos disponíveis.',
      'Se pretende a conquista por deter Gigantus rapidamente, prepare a vocação Arqueiro com um arco e uma Unmaking Arrow; esse item é consumido ao disparar e costuma acionar salvamento.',
      'O combate contra Gigantus pode ser deixado aos NPCs para continuar a história, mas ignorá-lo não garante a conquista de derrota rápida.'
    ],
    steps: [
      'Siga a missão na direção do Spellseal Door, ao sul de Bakbattahl, no caminho percorrido por Phaesus; a cena apresenta o Gigantus emergindo do mar.',
      'Se busca a conquista da derrota rápida, aja assim que puder alcançar o Gigantus: com arco equipado, dispare uma Unmaking Arrow no corpo dele, preferencialmente enquanto ainda está na parte inicial da travessia.',
      'Depois do disparo, observe os cristais e estacas se soltando. O Gigantus ainda pode continuar andando por algum tempo; não interprete o efeito como morte instantânea nem conte com uma segunda flecha.',
      'Sem Unmaking Arrow, use as balistas existentes ao longo do percurso para atingir os cristais/estacas brilhantes no corpo do Gigantus, ou suba nele com cuidado para atacar os pontos fracos.',
      'Acompanhe o avanço em direção à Ilha Vulcânica e ao Local de Escavação até ele ser imobilizado. Se optar por ignorar o combate, a campanha prossegue, mas a recompensa de derrota rápida pode ficar indisponível.',
      'Após a queda de Gigantus, prossiga até a entrada de Moonglint Tower. Reavalie suas tarefas antes de subir para o confronto final, pois entrar no trecho superior pode avançar a campanha sem retorno simples.',
      'Siga as indicações do diário de missões no acesso à torre e prepare seu grupo para a sequência de confrontos da próxima missão.'
    ],
    completion: 'A passagem para Moonglint Tower encerra a sequência de O Guardião Gigantus. Derrotar o colosso rapidamente é objetivo separado da progressão da campanha; não é necessário prometer troféu automático por simplesmente alcançá-lo.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-guardian-gigantus-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Guardian-Gigantus',
      'https://www.gamerguides.com/dragons-dogma-2/guide/walkthrough/bakbattahl/dragons-dogma-2-a-new-godsway-walkthrough'
    ]
  },
  {
    id: 'legacy', title: 'Legado', original: 'Legacy',
    region: 'Moonglint Tower, voo do Dragão, salão do trono de Vernworth e acesso ao Mundo Desancorado',
    giver: 'Missão principal iniciada ao alcançar o topo da Torre do Luar',
    relatedEventIds: ['p06', 'u01', 'u02'],
    preparation: [
      'A entrada no trecho final da Torre do Luar, depois de O Guardião Gigantus, leva ao confronto de Legado. Revise missões opcionais e suas opções reais de salvamento ANTES de continuar; não pressuponha que poderá recuperar o estado anterior.',
      'Esta ficha contém spoilers dos finais. Na rota comum, você segue no voo e enfrenta o Dragão; para o Mundo Desancorado, use a Empowered Godsbane Blade sobre o coração do Dragão durante o voo.',
      'Se deseja tentar os dois caminhos na mesma campanha, não selecione Novo Jogo+ antes de conferir as opções de continuidade disponibilizadas pela sua versão do jogo.'
    ],
    steps: [
      'Suba a Moonglint Tower e enfrente o falso Sobran e seus guardas. Sobreviver até o ritual de Phaesus avançar já pode desencadear a cena; não é necessário prometer derrotar todos antes disso.',
      'Quando o Dragão aparecer e oferecer uma decisão, afastar-se dele representa a rota de rendição. Para prosseguir ao confronto, aproxime-se e ataque-o.',
      'Durante o voo nas costas do Dragão, decida qual final deseja agora. Permanecer nele até o pouso leva à luta da rota comum; a escolha para o Mundo Desancorado precisa ser feita ainda no voo.',
      'Na rota comum, derrote o Dragão na arena, atacando a cabeça e o coração quando estiver exposto. Após a luta, no salão do trono, permaneça sentado até o fim dos créditos se buscar a conquista Paz.',
      'Se concluiu a rota comum e quer explorar outro final, NÃO inicie Novo Jogo+. Verifique a opção de retomar do último save; no salão do trono, procure o Pioneiro (Pathfinder) brilhante e converse novamente quando ele reaparecer para voltar ao voo.',
      'Para entrar diretamente no Mundo Desancorado durante o voo, desça pelo corpo do Dragão até a região do coração brilhante sob o peito. Abra o inventário, selecione Empowered Godsbane Blade e escolha usá-la em si mesmo enquanto estiver no local correto.',
      'Após a cena, confirme a chegada ao Mundo Desancorado e siga a sequência de recuperação do Peão Principal, provações e evacuações. Não interaja precipitadamente com o farol vermelho final do Santuário do Leito Marinho: ele encerra essa parte da campanha.'
    ],
    completion: 'Legado encaminha para um final da campanha comum ou para a rota do Mundo Desancorado. A conquista Paz exige a condição do trono na rota comum; entrar no Mundo Desancorado e concluir suas provações são etapas distintas. O resultado disponível depende da decisão durante o voo.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-legacy-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Legacy',
      'https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/'
    ]
  },
  {
    id: 'spring_thy_step', title: 'A Fonte do Contentamento', original: 'Put a Spring in Thy Step',
    region: 'Ilha Vulcânica de Agamen, estrada após Drabnir’s Grotto, casa Windwalker’s Home e fontes de Geyser Hamlet',
    giver: 'Gautstafr',
    relatedEventIds: ['i03', 'p03'],
    preparation: [
      'Chegue à Ilha Vulcânica de Agamen pelo caminho de Drabnir’s Grotto e procure Gautstafr, o anão com dores nas costas, na estrada. Não é preciso entrar na torre do confronto final para chegar até ele.',
      'Guarde três ervas/flores colhidas no mundo para entregar a Gautstafr. Leve curativos, pois ele precisará ser escoltado por um caminho com monstros.'
    ],
    steps: [
      'Encontre Gautstafr na estrada após a saída de Drabnir’s Grotto, fale com ele sobre as dores nas costas e aceite buscar flores silvestres.',
      'Entregue três ervas ou flores silvestres. Morningtide, Pitywort e outras ervas encontradas na vegetação da região podem servir.',
      'Siga a indicação até Windwalker’s Home, a casa de Gautstafr em uma pequena ilha ao norte da estrada; entre, converse com ele e conheça sua esposa, Cliodhna.',
      'Quando Gautstafr voltar a reclamar da coluna, ofereça-se para acompanhá-lo até as fontes termais de Geyser Hamlet.',
      'Escolte Gautstafr ao Acampamento da Ilha Vulcânica. Mantenha-se próximo dele, derrote as criaturas pelo caminho e, se for mais prático, carregue-o nos trechos seguros.',
      'Dentro do acampamento, suba as rampas de madeira e a escada que levam às fontes termais; acompanhe Gautstafr até o ponto da missão.',
      'Após a cena com Cliodhna, confirme o desbloqueio da vocação Arqueiro Mágico. Fale novamente com ela para obter Spellbow’s Paradox, o ensinamento de Mestre; se não receber o pergaminho, tente reencontrá-la na casa após algum tempo.'
    ],
    completion: 'A chegada de Gautstafr às termas encerra A Fonte do Contentamento e libera Arqueiro Mágico. Use Spellbow’s Paradox no inventário para aprender Martyr’s Bolt (Flecha do Mártir); confira o pergaminho separadamente da conclusão.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-put-a-spring-in-thy-step-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Put-a-Spring-in-Thy-Step',
      'https://www.neoseeker.com/dragons-dogma-2/guides/Put_a_Spring_in_Thy_Step'
    ]
  },
  {
    id: 'sotted_sage', title: 'O Sábio Beberrão', original: 'The Sotted Sage',
    region: 'Acampamento da Ilha Vulcânica, fontes de Geyser Hamlet; bebidas em Bakbattahl',
    giver: 'Lamond',
    relatedEventIds: ['i05', 'p03'],
    preparation: [
      'Encontre Lamond perto das termas, depois de subir as rampas e a escada do Acampamento da Ilha Vulcânica. A conversa inicia a missão independentemente da primeira resposta.',
      'Separe três Newt Liqueur (Licor de Lagarto). Uma garrafa pode ser encontrada na casa de Gautstafr, visitada em A Fonte do Contentamento.',
      'Para comprar bebidas em Higgs’s Tavern Stand, em Bakbattahl, personagens humanos precisam vestir uma Beastren Mask antes de mover os sacos para o cercado; sem a máscara, a ação pode provocar hostilidade dos guardas.'
    ],
    steps: [
      'Converse com Lamond próximo às fontes termais do Acampamento da Ilha Vulcânica e identifique o pedido de Newt Liqueur.',
      'Consiga três unidades no total. Você pode combinar Fruit Wine com Saurian Tail, procurar garrafas pelo mundo ou comprar bebidas no comércio secreto de Higgs em Bakbattahl.',
      'Se optar por Higgs’s Tavern Stand e seu personagem for humano, equipe uma Beastren Mask, mova um dos sacos do lado de fora para o cercado e entre quando o acesso ao comerciante for liberado.',
      'Suba ao piso superior do estabelecimento, procure o vendedor por trás da porta e compre as unidades necessárias. Evite fazer a manobra sem a máscara para não provocar confrontos.',
      'Volte a Lamond e entregue as três garrafas de Newt Liqueur; se já entregou uma na primeira conversa, ela faz parte das três exigidas.',
      'Confirme o desbloqueio da vocação Chefe de Guerra (Warfarer), então converse com Lamond novamente até receber Grandmaster’s Path. Em algumas situações, pode ser necessário melhorar sua afinidade.',
      'Abra o inventário e use Grandmaster’s Path para aprender Rearmament (Reordenar), habilidade de Mestre; possuir o pergaminho sem usá-lo não conta como aprendizado.'
    ],
    completion: 'Entregar três Newt Liqueur conclui O Sábio Beberrão e libera Chefe de Guerra. O pergaminho Grandmaster’s Path é uma recompensa a confirmar e utilizar separadamente para aprender Rearmament.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-sotted-sage-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Sotted-Sage',
      'https://www.gamespot.com/app.php/articles/dragons-dogma-2-warfarer-newt-liqueur-guide/1100-6522105/'
    ]
  },
  {
    id: 'beren_claw', title: 'Treino Leonino', original: 'Claw Them Into Shape',
    region: 'Moonglow Garden, a oeste do Posto Avançado da Fronteira, e Vernworth',
    giver: 'Beren',
    relatedEventIds: ['m03', 'p03'],
    preparation: [
      'Após avançar No Rastro do Dragão (In Dragon’s Wake), procure Beren na tenda perto de Moonglow Garden, a oeste do Posto Avançado da Fronteira. Se ele não estiver lá, procure-o treinando soldados no posto ou volte à tenda depois de descansar.',
      'Separe três espadas comuns, compradas ou encontradas. Você também precisará chegar a Vernworth para recrutar Humphrey.'
    ],
    steps: [
      'Converse com Beren perto da tenda em Moonglow Garden e aceite ajudá-lo a conseguir três espadas para treino e um recruta motivado.',
      'Leve três espadas de qualquer tipo para Beren; se necessário, compre armas simples no Posto Avançado da Fronteira.',
      'Em Vernworth, vá ao Bairro Comercial perto da barbearia de Clovis, encontre Humphrey e diga a ele que Beren procura um soldado motivado.',
      'Retorne a Beren e confirme os dois objetivos: as três espadas entregues e a indicação de Humphrey.',
      'Vá à área de treinamento do Posto Avançado e participe do duelo com Beren. Empurrá-lo para fora do círculo vence a luta, mas perder não impede a continuação da missão.',
      'Quando um soldado avisar de um ataque de goblins, siga Beren pelo caminho indicado até encontrar os sobreviventes e descobrir o que aconteceu com os recrutas.',
      'Depois da conversa final com Beren, confira a conclusão no diário; esta é a primeira das duas missões da sequência.'
    ],
    completion: 'A conversa após a investigação do ataque encerra Treino Leonino. Volte a procurar Beren em Moonglow Garden para iniciar A Última Lição de Beren.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-claw-them-into-shape-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Claw-Them-Into-Shape']
  },
  {
    id: 'beren_final_lesson', title: 'A Última Lição de Beren', original: "Beren's Final Lesson",
    region: 'Moonglow Garden; depois, Beren’s Childhood Home no lado de Battahl da fronteira',
    giver: 'Beren',
    relatedEventIds: ['m07', 'p03'],
    preparation: [
      'Conclua Treino Leonino e avance a campanha pelo menos até O Trono do Sobran (Seat of the Sovran). Depois, reencontre Beren perto da tenda em Moonglow Garden.',
      'A técnica de Mestre da vocação Guerreiro é uma recompensa posterior, na casa de infância de Beren em Battahl; não termina automaticamente junto com a luta contra o ciclope.'
    ],
    steps: [
      'Volte a Moonglow Garden e aproxime-se de Beren depois de completar Treino Leonino; acompanhe a conversa sobre sua dispensa do posto.',
      'Defenda os recrutas quando o ciclope aparecer. Lute ao lado de Beren e dos demais soldados, procurando evitar que os recrutas morram.',
      'Derrote o ciclope, converse com Beren e deixe passar aproximadamente um dia no jogo, usando o acampamento próximo se quiser.',
      'Retorne à tenda em Moonglow Garden e fale novamente com Beren antes de ele partir; isso conclui A Última Lição de Beren e rende a espada Lifetaker.',
      'Mais tarde, atravesse a fronteira rumo a Battahl e procure Beren’s Childhood Home ao sul da Cidade de Descanso da Fronteira, no lado de Battahl.',
      'Converse com Beren na casa de infância para receber o pergaminho Champion’s Fable. Se não o entregar, aumente a afinidade com presentes ou uma escolta e tente conversar novamente.',
      'Use o pergaminho Champion’s Fable pelo inventário para aprender Arc of Might, a técnica de Mestre de Guerreiro.'
    ],
    completion: 'A segunda conversa na tenda encerra a missão; a obtenção e o uso de Champion’s Fable em Battahl são a etapa posterior para liberar Arc of Might.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-berens-final-lesson-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Berens-Final-Lesson', 'https://www.powerpyx.com/dragons-dogma-2-all-maisters-teachings-locations/']
  },
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
    region: 'Cidade de Descanso da Fronteira (Checkpoint Rest Town), a oeste de Vernworth', giver: 'Myrddin',
    relatedEventIds: ['v206', 'p03'],
    preparation: ['Esta missão começa com Myrddin em sua mansão na Cidade de Descanso da Fronteira, e não em Melve nem dentro de Vernworth. Saia de Vernworth pela estrada oeste ou pelo carro de boi que vai à cidade fronteiriça.', 'Leve a túnica e as calças da corte, que podem ser obtidas em Vernworth, e equipe ambas para entrar na residência de Myrddin.', 'Separe três falsificações de grimórios diferentes; reserve os originais para Trysha, cuja missão começa perto de Melve.'],
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
    relatedEventIds: ['v111'],
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
      'Encontre Kendrick diante da Mão Graciosa no Bairro Pobre. Ofereça comida e 1.000 moedas de ouro para iniciar a busca por Malcolm.',
      'Pergunte por Malcolm a Harvey, perto dos escombros; Rick, no mirante; e Aimee, dentro da Mão Graciosa.',
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
    preparation: ['Enquanto estiver cumprindo as missões de Brant em Vernworth, volte a Melve antes de concluir O Banquete da Farsa.', 'Se encontrar o ataque em Melve, dê prioridade a esta sequência antes de concluir O Banquete da Farsa.'],
    steps: [
      'Quando o dragão atacar Melve, ajude os moradores a repelir a criatura. Se Sigurd estiver presente, fale com ele para liberar Lanceiro Místico.',
      'Retorne a Melve depois de algum tempo e converse com Ulrika na casa dela.',
      'Após os acontecimentos com Ulrika, fale com Lennart quando ele pedir notícias sobre ela.',
      'Vá à Aldeia de Harve e procure Ulrika. A cadeia de missões da vila pode começar com As Mãos Atadas que Abraçam a Causa.',
      'Depois de falar com Ulrika em Harve, retorne a Melve e conte a Lennart que a encontrou.'
    ],
    completion: 'A conversa de retorno com Lennart encerra esta missão; a história de Ulrika continua em outras missões.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-readvent-of-calamity-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Readvent-of-Calamity']

  },
  {
    id: 'disas_plot', title: 'O Plano de Disa', original: "Disa's Plot",
    region: 'Vernworth e Castelo de Vernworth', giver: 'Capitão Brant',
    relatedEventIds: ['v109'],
    preparation: ['Encontre Brant à noite na Stardrop Inn e pergunte sobre a rainha regente.', 'A investigação acontece no castelo durante a noite.'],
    steps: [
      'Aceite a missão com Brant, na Stardrop Inn, à noite.',
      'Vá ao Castelo de Vernworth pelo Bairro Nobre. Durante a noite, entre pela guarita na parte posterior do castelo.',
      'Na guarita, você pode pegar um uniforme de guarda em um baú. Suba as escadas até os escritórios no segundo andar.',
      'Entre na sala indicada e pegue a carta sobre a mesa como evidência dos planos de Disa.',
      'Depois da cena com Sven, saia do castelo e entregue a carta a Brant na taverna.'
    ],
    completion: 'Brant recebe a evidência e encerra a investigação.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-disas-plot-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Disas-Plot']
  },
  {
    id: 'stolen_throne', title: 'O Trono Roubado', original: 'The Stolen Throne',
    region: 'Vernworth, salão de baile do castelo', giver: 'Capitão Brant',
    relatedEventIds: ['v104'],
    preparation: ['Tenha a Túnica da Corte, as Calças da Corte e a máscara que Brant entrega.', 'Há trajes de corte na residência do Comissário (Comptroller) no Bairro Nobre.'],
    steps: [
      'Fale com Brant à noite sobre o baile de máscaras e receba a máscara.',
      'Equipe máscara, Túnica da Corte e Calças da Corte antes de ir ao salão de baile do castelo.',
      'Vá ao salão à noite. Se o baile não estiver acontecendo, descanse e tente na noite seguinte.',
      'Depois da cena de entrada, procure o corredor nos fundos do salão e atravesse a parede que esconde uma passagem secreta.',
      'Siga pelo corredor oculto até o Rose Chateau para descobrir o que está acontecendo com o falso soberano.',
      'Retorne a Brant na Stardrop Inn e conte o que descobriu.'
    ],
    completion: 'O relatório a Brant conclui a missão. Comparecer ao baile trajado também permite acompanhar a conquista relacionada.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-stolen-throne-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Stolen-Throne']
  },
  {
    id: 'arisen_shadow', title: 'Uma Sombra à Espreita', original: "The Arisen's Shadow",
    region: 'Bairro Comercial de Vernworth', giver: 'Inicia-se durante as investigações de Brant',
    relatedEventIds: ['v301', 'v303'],
    preparation: ['Resolva esta missão antes de concluir O Banquete da Farsa.', 'Procure alguém que passa a fugir quando você se aproxima no Bairro Comercial.'],
    steps: [
      'Depois de avançar as investigações em Vernworth, observe o personagem que segue você pelo Bairro Comercial.',
      'Quando ele fugir, persiga-o pelas ruas até conseguir alcançá-lo.',
      'Agarre Bermudo com o comando de agarrar, em vez de atacá-lo à distância.',
      'Após a conversa, escolha entre soltá-lo ou entregá-lo às autoridades; as opções têm resultados diferentes.'
    ],
    completion: 'A decisão sobre Bermudo encerra a missão.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-arisens-shadow-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Arisens-Shadow']
  },
  {
    id: 'nameless_village', title: 'O Vilarejo sem Nome', original: 'The Nameless Village',
    region: 'Leste de Vermund, Vila Sem Nome', giver: 'Capitão Brant',
    relatedEventIds: ['v201', 'v303'],
    preparation: ['Pergunte a Brant sobre o falso soberano antes de concluir O Banquete da Farsa.', 'A estrada direta está bloqueada; contorne pela Floresta Oriental para chegar à vila.'],
    steps: [
      'Converse com Brant à noite e aceite investigar a Vila Sem Nome.',
      'Siga para leste de Vernworth, contorne o bloqueio na estrada e entre na vila pela floresta.',
      'Visite a mansão no alto da vila e converse com Flaude, incluindo a opção de perguntar sobre o símbolo de latão.',
      'Procure a entrada das Profundezas da Vila Sem Nome atrás da mansão e avance pelo percurso de plataformas.',
      'Fale com Srail na sala ao final e receba a evidência sobre o falso soberano.',
      'Retorne a Brant na Stardrop Inn, à noite, e apresente as informações encontradas.'
    ],
    completion: 'Brant recebe a evidência. Flaude e Srail também são relevantes para os ensinamentos de mestre da vocação Ladrão.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-the-nameless-village-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/The-Nameless-Village']
  },
  {
    id: 'feast_deception', title: 'O Banquete da Farsa', original: 'Feast of Deception',
    region: 'Vernworth, Stardrop Inn', giver: 'Capitão Brant',
    relatedEventIds: ['v303', 'v304'],
    preparation: [
      'Conclua O Vilarejo sem Nome e Uma Sombra à Espreita se ainda pretende fazer essas missões.',
      'Revise as tarefas pendentes de Melve e Harve, especialmente a linha de Ulrika.',
      'Equipe Túnica da Corte e Calças da Corte antes de conversar com Brant.'
    ],
    steps: [
      'Depois das investigações de Brant, volte à Stardrop Inn à noite com o traje de corte equipado.',
      'Converse com Brant sobre a coroação e acompanhe a cena de preparação.',
      'Espere o tempo pedido por Brant e volte a falar com ele na taverna à noite.',
      'Quando Brant perguntar se você está pronto para avançar, confira as missões pendentes antes de confirmar.',
      'Confirme a decisão para iniciar a tentativa de entrada na coroação. A cena termina com a reação do peão e o recuo do grupo.',
      'Volte à Stardrop Inn e converse com Brant para receber o próximo destino da história.'
    ],
    completion: 'A missão termina após a nova conversa com Brant, que encaminha a viagem para Battahl.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-feast-of-deception-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Feast-of-Deception']
  },
  {
    id: 'home_hearth', title: 'Lar é Onde o Coração Está', original: 'Home Is Where the Hearth Is',
    region: 'Melve e Aldeia de Harve', giver: 'Lennart',
    relatedEventIds: ['v305'],
    preparation: ['Acompanhe a sequência de Ulrika em Harve e retorne a Melve para encontrar a vila ocupada por soldados.', 'Se ajudou Ian e Norbert anteriormente, os irmãos podem ajudar você a recuperar as armas.'],
    steps: [
      'Na entrada de Melve, converse com o guarda e consiga passagem para a vila.',
      'Entre na casa de Ulrika e converse com Lennart sobre como ajudar os moradores.',
      'Obtenha quatro espadas: procure as armas confiscadas no depósito, aproveitando a distração dos irmãos, ou leve quatro do seu inventário.',
      'Entregue as quatro espadas a Lennart e, ao sair, ajude os moradores a repelir os soldados.',
      'Depois de algum tempo no jogo, vá a Harve e conte a Ulrika o que aconteceu em Melve.',
      'Volte ao cais de Harve à noite e fale com Ulrika para concluir esta etapa da história.'
    ],
    completion: 'A conversa noturna com Ulrika encerra a missão e a cadeia de eventos iniciada em Melve.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-home-is-where-the-hearth-is-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Home-is-Where-the-Hearth-is']
  },

  {
    id: 'monster_culling', title: 'Elimine os Monstros', original: 'Monster Culling',
    region: 'Vernworth, Mina de Trevo, Aldeia de Harve e Floresta Oriental',
    giver: 'Capitão Brant',
    relatedEventIds: ['v110'],
    preparation: [
      'Após chegar a Vernworth, fale com Brant na Stardrop Inn à noite e pergunte sobre o extermínio de monstros.',
      'Prepare-se para três locais diferentes; na Mina de Trevo há também armas ligadas a Frustração Vocacional.'
    ],
    steps: [
      'Aceite Elimine os Monstros com Brant na Stardrop Inn, durante a noite.',
      'Na Mina de Trevo, a oeste da capital, derrote os goblins que cercam os soldados e fale com eles. Aproveite a passagem para recolher as armas de Frustração Vocacional, caso ainda precise delas.',
      'Siga para a Aldeia de Harve, entre na Stormwind Cave e elimine os sáurios que prendem os soldados.',
      'Acompanhe os soldados resgatados até a saída da caverna. Ao sair, você poderá ajudar Fyoran na missão Invasores Escamosos.',
      'Na Floresta Oriental, a leste de Vernworth, encontre o grupo de soldados atacado perto de sua carga, derrote os monstros e converse com os sobreviventes.',
      'Após resolver os três locais, volte à Stardrop Inn à noite e relate o resultado a Brant.'
    ],
    completion: 'O relatório dos três resgates a Brant encerra a missão principal. As missões de Harve continuam separadas.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-monster-culling-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Monster-Culling']
  },
  {
    id: 'scaly_invaders', title: 'Invasores Escamosos', original: 'Scaly Invaders',
    region: 'Aldeia de Harve',
    giver: 'Fyoran',
    relatedEventIds: ['v201', 'v202'],
    preparation: [
      'Na missão Elimine os Monstros, resgate os soldados da caverna de Harve e encontre Fyoran ao sair.',
      'Esta missão ocorre em duas visitas: a primeira luta não conclui a tarefa.'
    ],
    steps: [
      'Converse com Fyoran na Aldeia de Harve, depois de resgatar os soldados na missão de Brant.',
      'Derrote os sáurios que invadiram a vila e volte a falar com Fyoran.',
      'Deixe a região para que a reconstrução avance e passe alguns dias no jogo.',
      'Retorne a Harve e converse com Fyoran quando os sáurios invadirem novamente a vila.',
      'Derrote o segundo grupo de sáurios e confirme a conclusão com Fyoran.'
    ],
    completion: 'A segunda defesa da vila encerra Invasores Escamosos. A história de Ulrika em Harve continua em uma missão separada.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-scaly-invaders-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Scaly-Invaders']
  },
  {
    id: 'trouble_cape', title: 'As Mãos Atadas que Abraçam a Causa', original: 'Trouble on the Cape',
    region: 'Aldeia de Harve e Stormwind Cave',
    giver: 'Ulrika',
    relatedEventIds: ['v202', 'v303'],
    preparation: [
      'Procure Ulrika em Harve durante a sequência de Revinda da Calamidade, depois de ajudá-la em Melve.',
      'A retomada da aldeia em Invasores Escamosos faz parte da preparação para essa história.'
    ],
    steps: [
      'Ao encontrar Ulrika em Harve, acompanhe a discussão dela com os moradores e aceite ajudar no resgate.',
      'Siga Ulrika e os guardas até a entrada da Stormwind Cave, ao sul da vila.',
      'Avance pela caverna e elimine os sáurios que atacam o grupo.',
      'Encontre Zoran nas partes internas da caverna e liberte-o dos monstros.',
      'Escolte Zoran de volta à Aldeia de Harve com Ulrika e acompanhe a conversa dos moradores.'
    ],
    completion: 'A volta de Zoran encerra o resgate e avança a história de Ulrika em Harve.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-trouble-on-the-cape-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Trouble-on-the-Cape']
  },
  {
    id: 'till_death', title: 'Até que a Morte Nos Separe', original: 'Till Death Do Us Part',
    region: 'Vernworth e Pântano Nebuloso',
    giver: 'Margit, após conversar com Oswald',
    relatedEventIds: ['v203'],
    preparation: [
      'Em Vernworth, procure Oswald perto da fonte na entrada do Bairro Nobre; depois fale com Margit, perto da casa de Gregor.',
      'Vá preparado para proteger Gregor de um Dullahan à noite no Pântano Nebuloso.'
    ],
    steps: [
      'Ouça Oswald falar da expedição de Gregor e procure Margit no Bairro Nobre.',
      'Converse com Margit sobre Ser Ludolph, conte o que sabe e aceite socorrer Gregor.',
      'Vá ao Pântano Nebuloso, a noroeste da capital, e siga a trilha até o local indicado na missão.',
      'Encontre Gregor enfrentando o Dullahan e ajude-o a sobreviver à batalha. Para salvar Gregor, basta mantê-lo vivo até a criatura fugir; derrotar o Dullahan nessa luta também pode render a conquista relacionada.',
      'Volte à casa de Margit, em Vernworth, e fale com ela para encerrar o resgate.'
    ],
    completion: 'O retorno a Margit conclui a missão; a sobrevivência de Gregor e a conquista por derrotar o Dullahan são objetivos distintos.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-till-death-do-us-part-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Till-Death-Do-Us-Part']
  },

  {
    id: 'mercy_thieves', title: 'Piedade entre Ladrões', original: 'Mercy among Thieves',
    region: 'Cidade de Descanso da Fronteira, lado de Battahl, e estrada para Bakbattahl',
    giver: 'Lyssandro, após conversar com os guardas próximos ao portão',
    relatedEventIds: ['b01', 'b02'],
    preparation: [
      'Atravesse o portão da fronteira para o lado de Battahl; esta missão começa antes de chegar ao centro de Bakbattahl.',
      'Os guardas próximos ao portão e Lyssandro investigam os roubos das Serpentes de Coral; a história de Hugo continua em outra missão.'
    ],
    steps: [
      'Do lado de Battahl da Cidade de Descanso da Fronteira, ouça os guardas sobre os ataques às carroças e procure Lyssandro, de roupas claras, nas proximidades.',
      'Converse com Toumi, o menino junto às tendas, ofereça comida quando ele pedir e volte a falar com Lyssandro sobre as Serpentes de Coral.',
      'Siga a estrada principal para o sul, a pé, conversando com sobreviventes e observando o local de uma carroça saqueada.',
      'Depois do encontro com os bandidos na estrada, persiga Hugo e siga o caminho da caverna marcado pela missão.',
      'Derrote os dois bandidos que guardam a entrada e avance pelo esconderijo. Se Hugo derrubar uma ponte, use o caminho alternativo com outra ponte ou as escadas.',
      'Prossiga até os guardas se juntarem a você; enfrente os membros da gangue e avance até a última cena envolvendo Hugo e o chefe dos bandidos.'
    ],
    completion: 'A sequência final no esconderijo encerra Piedade entre Ladrões. Hugo será importante em uma missão posterior; esta ficha não garante seu destino nessa etapa.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-mercy-among-thieves-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Mercy-Among-Thieves']
  },
  {
    id: 'shadowed_prayers', title: 'Orações Ensombradas', original: 'Shadowed Prayers',
    region: 'Bakbattahl, Flamebearer Palace (nome EN do local)',
    giver: 'Menella',
    relatedEventIds: ['b02'],
    preparation: [
      'Depois de Nação da Chama Luzente, procure Menella na entrada do palácio. Ela pede ajuda para impedir um ataque à imperatriz Nadinia.',
      'A identificação durante a cerimônia é urgente: depois que Menella iniciar as preces, não se afaste para outras tarefas.'
    ],
    steps: [
      'Fale com Menella no acesso ao Flamebearer Palace e aceite ajudar a proteger Nadinia.',
      'Retorne ao local indicado pela missão pela manhã para participar da cerimônia.',
      'Ouça a descrição de Menella: o assassino usa o cabelo preso e tem um ferimento no braço direito.',
      'Durante as preces, observe os fiéis nas escadas e procure o homem com cabelo amarrado, túnica azul-escura e marca avermelhada no braço direito.',
      'Aproxime-se do suspeito e use o comando de agarrar para prendê-lo antes que a cerimônia termine; não o confunda com outros participantes.',
      'Assista ao desfecho da cerimônia e confira a conclusão no diário de missões.'
    ],
    completion: 'Prender o suspeito correto impede o atentado e conclui Orações Ensombradas. A escolha errada ou a demora pode mudar o resultado; não conte com recarga automática.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-shadowed-prayers-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/Shadowed-Prayers']
  },
  {
    id: 'poisonous_proposal', title: 'Uma Proposta Venenosa', original: 'A Poisonous Proposal',
    region: 'Bakbattahl, casa de Jarle e arredores',
    giver: 'Jarle',
    relatedEventIds: ['b02'],
    preparation: [
      'Encontre Jarle em sua casa no noroeste de Bakbattahl, em frente à estalagem Rockmouse’s Burrow, depois de Nação da Chama Luzente.',
      'Você precisa retornar a ele ainda envenenado duas vezes; poções e peões que curam veneno podem encerrar o efeito antes da conversa.'
    ],
    steps: [
      'Converse com Jarle em casa e aceite participar do estudo sobre venenos.',
      'Procure um Asp nos arredores da cidade e deixe que seu ataque cause envenenamento. Volte imediatamente a Jarle enquanto o efeito ainda estiver ativo.',
      'Depois da avaliação, encontre uma Venin Harpy nos locais indicados pelo mapa; deixe que ela o envenene e retorne a Jarle ainda sob o efeito.',
      'Quando Jarle pedir para testar a quimera em si mesmo, encontre-o no local de reunião marcado ao norte de Bakbattahl.',
      'Entre com Jarle no covil da quimera. Preserve a cabeça de serpente da cauda para que ela consiga envenená-lo e evite derrotar o monstro antes de ele receber o veneno.',
      'Proteja Jarle durante o combate; depois que ele for envenenado e sair do covil, encontre-o novamente em sua casa para saber como ficou.'
    ],
    completion: 'Conversar com Jarle após o experimento da quimera conclui Uma Proposta Venenosa; não é necessário matar a quimera antes de ele ser envenenado.',
    references: ['https://www.powerpyx.com/dragons-dogma-2-a-poisonous-proposal-walkthrough/', 'https://game8.co/games/Dragons-Dogma-2/archives/A-Poisonous-Proposal']
  },
  {
    id: 'dreams_apart', title: 'Destinos Separados', original: 'Dreams Apart',
    region: 'Mundo Desancorado — Bakbattahl, Laboratório de Pesquisa de Magia Proibida',
    giver: 'Início automático ao entrar no Mundo Desancorado',
    relatedEventIds: ['u03'],
    preparation: [
      'SPOILERS DO FINAL VERDADEIRO. Esta missão começa automaticamente depois de entrar no Mundo Desancorado pela rota de Legado.',
      'O Peão Principal está em Bakbattahl, NÃO no Santuário do Leito Marinho. Evite combates desnecessários enquanto estiver sem ele.'
    ],
    steps: [
      'Ao recuperar o controle, selecione Destinos Separados no diário e siga em direção a Bakbattahl.',
      'Entre no Laboratório de Pesquisa de Magia Proibida, na área do Palácio da Chama Luzente, onde você já havia tratado com Ambrosius em Um Novo Chamado Divino.',
      'Suba as escadas até o andar superior do laboratório e encontre Phaesus na sala indicada.',
      'Converse com Phaesus e acompanhe a cena para recuperar seu Peão Principal.'
    ],
    completion: 'Peão Principal reunido ao grupo. Siga então ao Santuário do Leito Marinho para organizar as evacuações; essa é uma etapa distinta.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-dreams-apart-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Dreams-Apart'
    ]
  },
  {
    id: 'halls_first_dawn', title: 'Átrios da Primeira Aurora', original: 'Halls of the First Dawn',
    region: 'Mundo Desancorado — Santuário do Leito Marinho e cinco assentamentos',
    giver: 'Rothais, no Santuário do Leito Marinho (com Luz)',
    relatedEventIds: ['u04', 'u08'],
    preparation: [
      'SPOILERS DO FINAL VERDADEIRO. Reúna seu Peão Principal em Destinos Separados e prepare pedras de transporte e recursos de cura antes das viagens.',
      'O tempo e os descansos têm consequências no Mundo Desancorado: priorize as evacuações e as provas. NÃO ative o feixe VERMELHO FINAL do Santuário do Leito Marinho enquanto houver tarefas pendentes.'
    ],
    steps: [
      'Chegue ao Santuário do Leito Marinho pelo leito do mar agora exposto; procure Rothais e Luz na área central e acompanhe a explicação sobre acolher sobreviventes. O marcador azul do santuário está ligado a essa etapa, não à conclusão final.',
      'Organize a retirada de Vernworth em A Determinação do Príncipe Regente: fale com Brant e resolva os pedidos de Sven.',
      'Evacue também Bakbattahl (Instabilidade Civil), Jardim Sagrado (Raízes Errantes), Acampamento da Ilha Vulcânica (A Importância de Ajudar Ernesto) e Local de Escavação (Pastor de Peões). As duas localidades vulcânicas exigem missões separadas.',
      'Resolva as provas dos feixes vermelhos periféricos que ainda estiverem disponíveis, considerando o estado de Talos e os eventos do seu jogo.',
      'Confira as cinco evacuações e objetivos restantes antes de interagir com o feixe vermelho FINAL no Santuário do Leito Marinho, que avança para o encerramento.'
    ],
    completion: 'Cinco evacuações concluídas e sobreviventes encaminhados ao santuário; não confunda essa condição com já ter ativado o feixe final.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-halls-of-the-first-dawn-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Halls-of-the-First-Dawn'
    ]
  },
  {
    id: 'regentkins_resolve', title: 'A Determinação do Príncipe Regente', original: "The Regentkin's Resolve",
    region: 'Mundo Desancorado — Vernworth, Estalagem Stardrop e Castelo de Vernworth',
    giver: 'Capitão Brant, na Estalagem Stardrop',
    relatedEventIds: ['u04'],
    preparation: [
      'Missão de evacuação de Vernworth no Mundo Desancorado, relacionada a Átrios da Primeira Aurora.',
      'Não há item obrigatório para coletar nem necessidade de falsificação: a missão depende de conversar com Sven, reunir Disa e liberar as carroças.'
    ],
    steps: [
      'Fale com o Capitão Brant na Estalagem Stardrop, em Vernworth, para iniciar a evacuação.',
      'No segundo andar do Castelo de Vernworth, procure Sven em seus aposentos e pergunte o que está impedindo a retirada dos moradores.',
      'Encontre Disa em seus aposentos, também no segundo andar. Após a conversa, carregue-a até o quarto de Sven para que os dois conversem.',
      'Vá à área das carroças de boi a oeste/noroeste de Vernworth. Encontre Allard e afaste-o das carroças: intimidá-lo ou agarrá-lo costuma fazê-lo fugir, sem necessidade de matá-lo.',
      'Volte aos aposentos de Sven e comunique que as carroças estão disponíveis, concluindo a evacuação de Vernworth.'
    ],
    completion: 'Vernworth evacuada. A conclusão conta para uma das cinco retiradas exigidas por Átrios da Primeira Aurora; ainda restam as demais localidades.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-regentkins-resolve-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Regentkins-Resolve'
    ]
  },
  {
    id: 'civil_unrest', title: 'Instabilidade Civil', original: 'Civil Unrest',
    region: 'Mundo Desancorado — Bakbattahl, caminho do Palácio da Chama Luzente',
    giver: 'Menella, perto do caminho do palácio',
    relatedEventIds: ['u04'],
    preparation: [
      'Depois de iniciar Átrios da Primeira Aurora no Santuário do Leito Marinho, procure Menella em Bakbattahl. A ativação pode variar com o progresso das provas e com a sobrevivência dos personagens.',
      'Uma das três discussões pode ser resolvida oferecendo uma fruta fresca à criança; guarde uma antes de chegar ao mercado. Não é preciso falsificar nada.'
    ],
    steps: [
      'Na subida para o Palácio da Chama Luzente, encontre Menella perto do caminho das carroças e aceite ajudar a conter os conflitos da cidade.',
      'No entorno da Guilda das Vocações, ouça Scario e Nabrah e aceite testemunhar o duelo para que se resolva sem agressão sua.',
      'Perto do mercado e da estalagem Pilgrims’ Inn, encontre Glintt e Nomos. Diga que nenhum dos dois está errado; quando as crianças pedirem, entregue uma fruta que não esteja podre.',
      'Na entrada do Bairro Residencial, Grantt e Abba podem avançar contra você. Para um desfecho pacífico, defenda-se ou aguente os ataques até que se cansem, sem matá-los.',
      'Após as três disputas, volte a Menella e depois fale com a imperatriz Nadinia em seus aposentos no Palácio da Chama Luzente para confirmar a evacuação.'
    ],
    completion: 'Bakbattahl aceita evacuar. Soluções violentas podem alterar recompensas ou o resultado dos conflitos, embora walkthroughs relatem que a evacuação ainda pode acontecer.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-civil-unrest-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450312'
    ]
  },
  {
    id: 'wandering_roots', title: 'Raízes Errantes', original: 'Wandering Roots',
    region: 'Mundo Desancorado — Jardim Sagrado (Sacred Arbor), a noroeste de Vernworth',
    giver: 'Glyndwr, na plataforma circular de entrada do Jardim Sagrado',
    relatedEventIds: ['u04'],
    preparation: [
      'Comece Átrios da Primeira Aurora. Leve um peão com especialização Woodland Wordsmith (intérprete de élfico), se disponível.',
      'Há duas rotas para convencer Taliesin: plantar um ramo da Árvore Sagrada no santuário, caso tenha desenvolvido a cadeia The Ailing Arborheart e Out of the Forest, Into the Forge; OU insistir nas conversas ao longo de dias. O ramo não é obrigatório para a alternativa de diálogo.'
    ],
    steps: [
      'Entre no Jardim Sagrado e fale com Glyndwr na plataforma redonda perto da entrada. Siga-o até Taliesin, seu pai.',
      'Converse com Taliesin na casa do arborista; ele teme que os elfos não sobrevivam longe da Árvore Sagrada.',
      'Rota do ramo, se disponível no estado da sua campanha: receba o Arborheart Cutting de Taliesin, vá ao setor de terra do Santuário do Leito Marinho e plante-o no círculo de pedras indicado pelo marcador de missão.',
      'Retorne a Taliesin e conte que o ramo foi plantado; ele concordará em evacuar seu povo.',
      'Rota alternativa se não tiver a cadeia de missões pronta: esgote o diálogo de Taliesin, volte a conversar após a passagem de tempo e repita até ele ceder. Descansos fazem o Mundo Desancorado avançar; organize outras tarefas antes de escolher essa rota.'
    ],
    completion: 'Taliesin aceita a evacuação do Jardim Sagrado. Não é necessário ter um Arborheart Cutting se conseguir convencê-lo pelo diálogo.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-wandering-roots-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450033'
    ]
  },
  {
    id: 'aiding_ernesto', title: 'A Importância de Ajudar Ernesto', original: 'The Importance of Aiding Ernesto',
    region: 'Mundo Desancorado — Acampamento da Ilha Vulcânica de Agamen',
    giver: 'Ernesto, no portão norte do Acampamento da Ilha Vulcânica',
    relatedEventIds: ['u04'],
    preparation: [
      'Comece Átrios da Primeira Aurora no Santuário do Leito Marinho. Esta é a retirada do ACAMPAMENTO, separada da missão Pastor de Peões no Local de Escavação.',
      'Pedra de transporte e cristal de porto no acampamento são opcionais para abreviar a escolta; você também pode conduzir os dois personagens caminhando.'
    ],
    steps: [
      'Entre no Acampamento da Ilha Vulcânica pelo portão norte e fale com Ernesto, que não quer abandonar os moradores.',
      'Siga o marcador para oeste do acampamento até a casa de Gautstafr e Cliodhna. Converse com eles e convença-os a acompanhar você; enfrente perigos que impeçam a saída, conforme o estado de sua partida.',
      'Escolte o casal ao acampamento. Gautstafr anda devagar: mantenha o grupo junto, limpe o caminho ou carregue-o; um teleporte até um cristal de porto próximo é alternativa, não exigência.',
      'Depois de entregar o casal a Ernesto, procure Lamond perto das fontes termais e converse com ele sobre a evacuação. Se a conversa permitir, convide-o a proteger Gautstafr e Cliodhna.',
      'Volte a Ernesto e confirme que o casal e Lamond estão prontos; encerre a retirada do acampamento.'
    ],
    completion: 'Acampamento da Ilha Vulcânica evacuado. Ainda é necessário ir ao Local de Escavação para completar Pastor de Peões — são duas retiradas independentes.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-importance-of-aiding-ernesto-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450317'
    ]
  },
  {
    id: 'shepherd_pawns', title: 'Pastor de Peões', original: 'Shepherd of the Pawns',
    region: 'Mundo Desancorado — Local de Escavação, Ilha Vulcânica de Agamen',
    giver: 'Henrique, no portão do Local de Escavação',
    relatedEventIds: ['u04'],
    preparation: [
      'Comece Átrios da Primeira Aurora no Santuário do Leito Marinho. Esta missão NÃO é a evacuação do Acampamento Vulcânico feita por Ernesto.',
      'Henrique entrega a chave do alojamento do capataz para recuperar o Diminished Godsway (cajado); guarde esse item e leve-o diretamente a ele. Não há necessidade de encomendar falsificação.'
    ],
    steps: [
      'Vá ao Local de Escavação, próximo do Acampamento da Ilha Vulcânica, e derrote o Golem mágico que bloqueia a área da entrada.',
      'Converse com Henrique no portão e acompanhe-o até as celas onde os peões se abrigaram. Receba a Overseer’s Lodge Key.',
      'Volte em direção ao portão onde o Golem estava e suba até os alojamentos na encosta. Procure a segunda cabana trancada e abra-a com a chave de Henrique.',
      'Recolha dentro do alojamento o Diminished Godsway, objeto que ajuda Henrique a convencer os peões a abandonar o local.',
      'Retorne às celas e entregue o Diminished Godsway diretamente a Henrique. Confira a confirmação da retirada do Local de Escavação no diário.'
    ],
    completion: 'Peões do Local de Escavação evacuados. A entrega do Diminished Godsway a Henrique é obrigatória nesta rota e distinta da conversa com Ernesto no acampamento.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-shepherd-of-the-pawns-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450321'
    ]
  },
  {
    id: 'scholarly_pursuit', title: 'A Missão dos Eruditos', original: 'A Scholarly Pursuit',
    region: 'Mundo Desancorado — Bakbattahl, entrada do Palácio da Chama Luzente',
    giver: 'Feixe vermelho de Bakbattahl; Phaesus participa da missão',
    relatedEventIds: ['u05'],
    preparation: [
      'SPOILERS DO MUNDO DESANCORADO. Esta missão é a prova do feixe vermelho de Bakbattahl, não a evacuação Instabilidade Civil nem o feixe FINAL do Santuário do Leito Marinho.',
      'O marcador pode ficar acessível apenas depois de outras provas, conforme o estado da campanha. Proteja Phaesus durante a travessia e tenha recursos de cura ou uma Pedra do Despertar disponíveis para imprevistos.',
      'Para acionar o feixe vermelho, use a Lâmina da Perdição dos Deuses Potencializada (Empowered Godsbane Blade) quando o jogo solicitar.'
    ],
    steps: [
      'Em Bakbattahl, procure o feixe vermelho no caminho de acesso ao Palácio da Chama Luzente e interaja com ele, usando a Godsbane Potencializada quando solicitado.',
      'Assista à queda da estátua do dragão e à chegada de Phaesus. Aproximar-se da barreira pelo lado da frente não resolve o bloqueio; prepare-se para contorná-la.',
      'Acompanhe Phaesus pela rota lateral e pelas dependências do Laboratório de Pesquisa de Magia Proibida, derrotando inimigos que surgirem no trajeto.',
      'Durante o caminho, desvie dos pedregulhos que caem e proteja Phaesus; ele precisa chegar com você à parte traseira do palácio.',
      'Aproxime-se da estátua do dragão por trás da barreira e atravesse a área indicada para destruí-la e concluir a prova de Bakbattahl.'
    ],
    completion: 'A estátua do dragão de Bakbattahl é destruída. A Missão dos Eruditos termina sem exigir a ativação do feixe vermelho FINAL do Santuário do Leito Marinho.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-scholarly-pursuit-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/A-Scholarly-Pursuit',
      'https://www.neoseeker.com/dragons-dogma-2/guides/A_Scholarly_Pursuit'
    ]
  },
  {
    id: 'when_wills_collide', title: 'Quando as Vontades São Conflituantes', original: 'When Wills Collide',
    region: 'Mundo Desancorado — Ilha Vulcânica de Agamen, local da queda de Talos',
    giver: 'Evento com Phaesus junto aos restos do Gigantus (Talos)',
    relatedEventIds: ['u05', 'u06'],
    preparation: [
      'SPOILERS DO MUNDO DESANCORADO. Recupere o Peão Principal em Destinos Separados antes de procurar Talos; a sequência depende do estado em que o Gigantus terminou O Guardião Gigantus.',
      'Procure no mapa o ícone de Talos na Ilha Vulcânica de Agamen. Se a missão ainda não surgir, confira o avanço de Átrios da Primeira Aurora e os diálogos de Phaesus/Ambrosius. Os guias divergem quanto ao gatilho exato.',
      'Não confunda a cena de Talos enfrentando monstros com o feixe vermelho FINAL do Santuário do Leito Marinho. Evite seguir para o encerramento enquanto houver evacuações pendentes.'
    ],
    steps: [
      'Depois de recuperar seu peão, retorne à Ilha Vulcânica de Agamen e encontre os restos de Talos onde ele caiu durante O Guardião Gigantus.',
      'Aproxime-se da carcaça do Gigantus e converse com Phaesus ou acompanhe o evento no local. Se não houver marcador, procure Ambrosius no Laboratório de Pesquisa de Magia Proibida e verifique a progressão das provas.',
      'Na sequência cinematográfica, seu Peão Principal pode entrar em Talos e fazê-lo se erguer novamente; acompanhe o que acontece sem abandonar a área.',
      'Observe Talos confrontar as monstruosidades do Mundo Desancorado. A quantidade de encontros e a disponibilidade do evento podem variar com onde e como Talos foi imobilizado na história.',
      'Confirme a conclusão de Quando as Vontades São Conflituantes no diário; volte às evacuações e às provas que permanecerem pendentes antes de finalizar a campanha.'
    ],
    completion: 'O evento de reativação de Talos é registrado. Ele pode contar para a conquista Eu, Talos; não é o comando de encerrar o Mundo Desancorado.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-when-wills-collide-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/450352'
    ]
  },
  {
    id: 'phantom_oxcart', title: 'A Carroça Fantasma', original: 'The Phantom Oxcart',
    region: 'Vermund — estrada ao norte de Vernworth e rota noturna até Bakbattahl',
    giver: 'Conversa sobre carroça noturna perto do terminal oeste de Vernworth',
    relatedEventIds: ['b05'],
    preparation: [
      'Esta missão noturna costuma aparecer depois de avançar Nação da Chama Luzente e retornar de Bakbattahl para Vermund. Escute a conversa sobre uma carroça que trafega de madrugada.',
      'Para a conquista relacionada à viagem, prefira se disfarçar de peão: remova TODAS as armas e peças de armadura equipadas antes de conversar com o cocheiro, guardando-as no inventário.',
      'Durante o trajeto, não equipe armas, não dê comandos aos peões e evite atacar guardas antes de a encenação revelar a fraude. Preserve o documento recolhido até falar com Brant.'
    ],
    steps: [
      'À noite, perto do terminal oeste das carroças de Vernworth, ouça os viajantes comentarem sobre a carroça misteriosa para ativar a investigação.',
      'Siga o marcador até a estrada/cruzamento ao norte de Vernworth, encontre a Carroça Fantasma e intercepte Navil, o soldado envolvido. Decida se o entrega ou o deixa partir e recolha a prova que ele fornece.',
      'À noite, converse com o Capitão Brant na Estalagem Stardrop e mostre a prova. Ele sugerirá investigar a rota seguindo a carroça ou embarcando disfarçado.',
      'Para a rota do disfarce, volte à carroça à noite SEM armas nem armaduras equipadas; converse com o cocheiro e entre no espaço dos peões sem revelar que é um Nascen.',
      'Quando a viagem parar por ataque de monstros, participe sem equipar armas nem comandar seus peões, depois retome o trajeto. Na parada da fronteira, não revide as agressões dos guardas enquanto o disfarce for necessário.',
      'Ao chegar ao destino em Bakbattahl, quando for descoberto, equipe os itens e enfrente os guardas hostis. Recolha as Labor Requisition Orders (ordens de requisição de trabalho) obtidas no conflito.',
      'Volte a Brant na Estalagem Stardrop em Vernworth e entregue as ordens para concluir A Carroça Fantasma.'
    ],
    completion: 'Brant recebe as Labor Requisition Orders. Embarcar e completar o percurso como peão é a rota vinculada à conquista de viajar na carroça, enquanto apenas segui-la pode ter resultado distinto.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/',
      'https://www.polygon.com/dragons-dogma-2-guide/24111543/phantom-oxcart-quest-walkthrough-location-start-navil-disguise'
    ]
  },
  {
    id: 'gaoled_awakening', title: 'O Despertar na Prisão', original: 'Gaoled Awakening',
    region: 'Prólogo — Local de Escavação, prisão e pedreira',
    giver: 'Fiska, supervisor da escavação; missão inicial automática',
    relatedEventIds: ['m01'],
    preparation: [
      'É a primeira missão da história, logo após criar o personagem. Siga o tutorial; não há objeto raro para guardar nem falsificação necessária.',
      'A criatura que chega à pedreira dá início à fuga. A fuga aérea ocorre nas asas de um GRIFO, não da Esfinge.'
    ],
    steps: [
      'Saia da cela e obedeça às ordens de Fiska, seguindo Rook até a área da escavação.',
      'Desça a encosta, localize uma pedra grande entre as rochas e pegue-a usando o comando de agarrar.',
      'Carregue a pedra de volta até Rook; a movimentação no acampamento será interrompida por uma agitação.',
      'Suba em direção à entrada da escavação para investigar o tumulto e prepare-se para o combate tutorial.',
      'Pegue a arma indicada, defenda-se da criatura até a cena seguinte e, quando receber a ordem de fugir, siga Rook até o penhasco.',
      'Salte do precipício na sequência de fuga; o grifo leva seu personagem para longe do Local de Escavação, iniciando A História se Inicia.'
    ],
    completion: 'Fuga concluída depois do ataque à escavação e do voo no grifo; prossiga com Justinn e o posto de fronteira.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-gaoled-awakening-walkthrough/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'tales_beginning', title: 'A História se Inicia', original: "Tale's Beginning",
    region: 'Prólogo — encosta da cachoeira e Posto Avançado da Guarda nas Fronteiras',
    giver: 'Justinn, soldado que encontra o Nascen após a fuga',
    relatedEventIds: ['m01'],
    preparation: [
      'Começa após O Despertar na Prisão. Recrute seu Peão Principal na Pedra de Fenda do posto; os peões de apoio são opcionais.',
      'Antes de seguir para Melve, descanse na hospedagem do posto para fechar esta etapa. Não é exigida compra de equipamento.'
    ],
    steps: [
      'Após a cena da cachoeira, converse com Justinn e siga o soldado pela trilha que leva ao posto de fronteira.',
      'Derrote os goblins que bloqueiam a passagem; mantenha-se junto ao grupo até chegar ao Posto Avançado da Guarda nas Fronteiras.',
      'No posto, interaja com a Pedra de Fenda e crie ou confirme seu Peão Principal, que passará a acompanhá-lo na jornada.',
      'Converse com Luksa sobre peões e pedras, se desejar, e tente seguir pela saída em direção a Melve.',
      'Quando o guarda recomendar um descanso, volte à tenda da hospedagem, fale com o responsável e use o primeiro repouso gratuito.'
    ],
    completion: 'Depois do descanso, termina A História se Inicia e fica disponível No Rastro do Dragão, rumo a Melve.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-tales-beginning-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Tales-Beginning',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'in_dragons_wake', title: 'No Rastro do Dragão', original: "In Dragon's Wake",
    region: 'Vermund — Posto Avançado, Melve, estrada até Vernworth',
    giver: 'Após a hospedagem do posto, missão principal iniciada automaticamente',
    relatedEventIds: ['v101'],
    preparation: [
      'Antes de deixar o posto de fronteira, considere concluir Provações de um Novo Recruta e Um Fornecedor em Apuros, cujas fichas já existem.',
      'Acompanhe Gregor até Vernworth. O capitão Brant NÃO é quem escolta você na estrada: a reunião com Brant ocorre na capital, posteriormente.'
    ],
    steps: [
      'Saia do Posto Avançado em direção ao sul e siga o caminho indicado até Melve; na trilha ficam oportunidades de missões como Treino Leonino, de Beren.',
      'Ao entrar em Melve, suba a colina da aldeia destruída e acompanhe a cena que recupera lembranças do ataque do Dragão.',
      'Encontre Lennart nas proximidades da Estalagem de Tristan em Melve; converse sobre vocações e receba as orientações iniciais.',
      'Siga até a saída da aldeia e fale com Gregor, que organiza a escolta até Vernworth. Prepare suprimentos antes da marcha.',
      'Acompanhe Gregor pela estrada; enfrente harpias e, quando surgir, o ciclope da passagem. O combate pode ser listado como Intruso de um Olho Só, uma missão breve adicional.',
      'Chegue às portas de Vernworth com a escolta. A investigação do falso soberano e o contato com Brant começam na sequência.'
    ],
    completion: 'Chegada à capital, sem perder as missões locais que queira resolver em Melve. Prossiga com O Trono do Sobran.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'seat_sovran', title: 'O Trono do Sobran', original: 'Seat of the Sovran',
    region: 'Vernworth — Estalagem Stardrop, centro da cidade',
    giver: 'Capitão Brant, na Estalagem Stardrop à noite',
    relatedEventIds: ['v101', 'v108'],
    preparation: [
      'Após chegar a Vernworth em No Rastro do Dragão, procure Brant NA CIDADE, não no posto avançado.',
      'Converse com Brant à noite. Se ainda for dia, peça ao atendente da Estalagem Stardrop que avance o horário.'
    ],
    steps: [
      'Entre em Vernworth após o evento de chegada com Gregor; acompanhe a apresentação da situação política da cidade.',
      'Encontre a Estalagem Stardrop, na praça principal de Vernworth, e vá até lá depois de escurecer.',
      'Fale com o Capitão Brant no balcão e siga-o até os fundos da estalagem para uma conversa reservada.',
      'Ouça o plano para investigar o falso Sobran e selecione as opções de diálogo disponíveis para obter as tarefas.',
      'Aceite Elimine os Monstros, O Plano de Disa e O Magistrado Aprisionado. Essas investigações podem ser concluídas em ordens diferentes.'
    ],
    completion: 'Abertura da sequência de investigações de Brant em Vernworth. As três missões abertas têm guias individuais no Compêndio.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-seat-of-the-sovran-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Seat-of-the-Sovran',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'unsettling_encounter', title: 'Um Encontro Perturbador', original: 'An Unsettling Encounter',
    region: 'Vernworth — Estalagem Stardrop e Castelo de Vernworth, aposentos de Allard',
    giver: 'Capitão Brant, na conversa noturna após outras investigações no castelo',
    relatedEventIds: ['v301', 'v303'],
    preparation: [
      'Depois de avançar as investigações de Brant, especialmente O Trono Roubado, fale com ele à noite na Estalagem Stardrop. Evite avançar a coroação sem concluir esta investigação.',
      'A missão exige encontrar uma carta escondida no quarto de Allard; não compre nem falsifique o documento em Ibrahim.'
    ],
    steps: [
      'À noite, converse com Brant na Estalagem Stardrop em Vernworth e aceite investigar o ministro Allard.',
      'Vá ao Castelo de Vernworth pelo Bairro Nobre; se a entrada principal estiver fechada, use a passagem da guarita de guarda para alcançar o interior.',
      'Suba ao segundo andar e aguarde a conversa entre Allard e seu acompanhante; entre nos aposentos quando os dois saírem.',
      'Examine o canto esquerdo da parede dos aposentos e empurre o painel escondido para revelar uma saleta secreta.',
      'Pegue a Battahli-Crested Letter (carta com brasão de Battahl) sobre a mesa e acompanhe a cena que ocorre ao sair do esconderijo.',
      'Retorne à Estalagem Stardrop à noite, converse com Brant sobre os rumores de Allard e entregue a carta encontrada.'
    ],
    completion: 'Brant recebe a carta que prova a ligação de Allard com Battahl. A missão pode repercutir em tramas de Wilhelmina e deve ser concluída antes de avançar a coroação.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-an-unsettling-encounter-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/An-Unsettling-Encounter',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'flickering_shadows', title: 'Sombras Trêmulas', original: 'Flickering Shadows',
    region: 'Battahl — Bakbattahl, Costa de Olta’Battahl, Santuário Reverente e Harve',
    giver: 'Início da investigação do chamado divino ao entrar em Bakbattahl',
    relatedEventIds: ['b08'],
    preparation: [
      'Começa após Nação da Chama Luzente, quando você chega a Bakbattahl e busca informações sobre o chamado divino.',
      'Leve recursos de viagem: a missão percorre locais distantes e termina falando com o Ancião de Harve. O cristal azul PEQUENO para Ambrosius é obtido na costa, e não comprado.'
    ],
    steps: [
      'Entre no Distrito Mercantil de Bakbattahl e acompanhe a conversa que encaminha sua investigação sobre o chamado divino.',
      'Siga para a Costa de Olta’Battahl a leste/nordeste da cidade e encontre Ambrosius. Derrote as harpias que o ameaçam, conforme o estado de seu jogo.',
      'Procure Small Blue Crystal Shards na água e nas margens próximas; pegue pelo menos um e entregue a Ambrosius quando ele pedir uma amostra.',
      'Visite o Santuário à Beira da Baía (Bay Wayside Shrine) e converse com o Forjado pelo Dragão sobre os cristais do chamado divino.',
      'Vá ao Santuário Reverente (Reverent Shrine), a noroeste de Bakbattahl, e converse com Luz. Esse encontro também pode desbloquear a vocação Ilusionista.',
      'Volte ao vilarejo de Harve em Vermund e fale com o Ancião à beira-mar. Se ele não estiver disponível, retorne em outro horário; a conversa libera Convergência.'
    ],
    completion: 'Informações coletadas com Ambrosius, o Forjado pelo Dragão, Luz e o Ancião de Harve; a história avança para Convergência.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-flickering-shadows-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Flickering-Shadows',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'convergence', title: 'Convergência', original: 'Convergence',
    region: 'Harve — Caverna da Tempestade e Templo Abissal (Santuário do Leito Marinho)',
    giver: 'Início automático após Sombras Trêmulas e conversa com o Ancião de Harve',
    relatedEventIds: ['b09'],
    preparation: [
      'Esta etapa é da HISTÓRIA PRINCIPAL, antes do Guardião Gigantus, e NÃO é a sequência de evacuação do Mundo Desancorado.',
      'O objeto Dulled Godsbane Blade (Sucessão Vil sem poder) é RECEBIDO de Rothais como recompensa, não um item exigido antes de entrar na caverna.'
    ],
    steps: [
      'Após falar com o Ancião em Sombras Trêmulas, siga até a Caverna da Tempestade, próxima à praia do vilarejo de Harve.',
      'Entre na passagem que se abriu na caverna e avance pelos túneis até a entrada das ruínas reveladas pelo recuo do mar.',
      'Desça as escadarias do Templo Abissal e atravesse a sala grande pelo lado sul, seguindo o caminho principal.',
      'Aproxime-se do salão do trono e converse com Rothais, o antigo Sobran de Vermund, para conhecer a origem do chamado divino.',
      'Receba a Dulled Godsbane Blade (Sucessão Vil), que será necessária na próxima missão, Um Novo Chamado Divino.',
      'Para sair, volte pelas ruínas. É possível encontrar uma pedra de transporte num baú ou utilizar a lâmina no mecanismo azul para subir por uma rota de saída.'
    ],
    completion: 'Convergência termina após encontrar Rothais e receber a lâmina. Continue em Um Novo Chamado Divino levando o item original.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-convergence-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Convergence',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'place_call_home', title: 'Um Lugar para Chamar de Lar', original: 'A Place to Call Home',
    region: 'Vernworth — rua ao sul da Estalagem Stardrop e Bairro Popular',
    giver: 'Mildred, perto da rua ao sul da Estalagem Stardrop durante o dia',
    relatedEventIds: ['v105'],
    preparation: [
      'Após O Trono do Sobran, procure Mildred durante o dia na rua ao sul da Estalagem Stardrop. Se ela não aparecer, volte após algum tempo.',
      'Para comprar a casa e obter a conquista de residência própria, reserve 20.000 moedas de ouro. O empréstimo inicial da casa é gratuito.'
    ],
    steps: [
      'Passe pela rua ao sul da Estalagem Stardrop em Vernworth durante o dia até Mildred abordá-lo; aceite encontrá-la na residência.',
      'Siga o marcador até a casa de Mildred, no Bairro Popular, na parte leste da cidade, e converse com ela diante da entrada.',
      'Aceite cuidar da residência enquanto Mildred viaja. A cama poderá ser utilizada sem pagar hospedagem.',
      'Deixe transcorrer uma semana no jogo, jogando normalmente ou descansando repetidas vezes na cama da casa, até a missão indicar o retorno de Mildred.',
      'Quando Mildred regressar, fale com ela em frente à residência e aceite a oferta de compra por 20.000 G.',
      'Confirme que a casa passou a ser sua e que a conquista de adquirir residência foi registrada.'
    ],
    completion: 'Casa de Vernworth adquirida por 20.000 G. Ela passa a servir como local de descanso e acesso ao armazenamento.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-place-to-call-home-walkthrough/',
      'https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/vernworth/a-place-to-call-home-walkthrough',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'dulled_steel', title: 'Lâmina Cega, Forja Fria', original: 'Dulled Steel, Cold Forge',
    region: 'Vernworth — Castelo; Bakbattahl — Forja de Brokkr e Ruínas da Escavação',
    giver: 'Roman, soldado no pátio do Castelo de Vernworth',
    relatedEventIds: ['i06'],
    preparation: [
      'Depois de O Trono do Sobran, fale com Roman no pátio do castelo e RECEBA a Dulled Regalia Sword (Espada Régia cega). Mantenha a espada no inventário ao oferecê-la a Sara; não a deixe no depósito.',
      'São exigidos pelo menos 15 Glimmercoal (carvões lustrazul), encontrados nas Ruínas da Escavação a sudoeste de Bakbattahl. Recolher até 25 é opcional e pode render recompensa melhor.',
      'Glimmercoal e Glymercole são materiais DIFERENTES. Apague a lanterna na caverna: o minério certo brilha em verde no escuro.'
    ],
    steps: [
      'No pátio do Castelo de Vernworth, aceite a missão de Roman e receba a Espada Régia cega, um objeto de missão que deve ser preservado.',
      'Viaje até Bakbattahl e entre na Forja de Brokkr. Fale com Brokkr no cômodo dos fundos; ele se recusa a restaurar a espada.',
      'Na saída, converse com Sara, sua aprendiz; espere Brokkr sair do estabelecimento e fale com ela novamente para saber do combustível necessário.',
      'Vá às Ruínas da Escavação (Digger’s Ruins), a sudoeste de Bakbattahl, e recolha no mínimo 15 carvões lustrazul. No escuro, os depósitos corretos brilham em verde.',
      'Retorne à Forja de Brokkr e ENTREGUE entre 15 e 25 carvões lustrazul a Sara; 25 é opcional, não a quantidade mínima exigida.',
      'Com a Espada Régia cega no inventário, aceite confiar sua restauração a Sara. Isso encerra Lâmina Cega, Forja Fria e abre a continuação Vontade Resistente, Forja Ardente.'
    ],
    completion: 'Sara assume a restauração da espada. Concluir essa etapa NÃO devolve imediatamente a arma restaurada: siga para Vontade Resistente, Forja Ardente.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-dulled-steel-cold-forge-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Dulled-Steel-Cold-Forge',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'steeled_resolve', title: 'Vontade Resistente, Forja Ardente', original: 'Steeled Resolve, Blazing Forge',
    region: 'Bakbattahl — Forja de Brokkr; Ilha Vulcânica — Caverna na Base da Montanha; Vernworth',
    giver: 'Sara, na Forja de Brokkr, após Lâmina Cega, Forja Fria',
    relatedEventIds: ['i06'],
    preparation: [
      'É continuação direta de Lâmina Cega, Forja Fria. A espada original deve estar com Sara; não é preciso comprar outra, recuperar um novo carvão ou criar falsificação.',
      'Quando a missão indicar que Sara DESAPARECEU na Ilha Vulcânica, priorize resgatá-la. Fontes divergem sobre o prazo exato; evite descansar por vários dias após saber do desaparecimento.'
    ],
    steps: [
      'Após entregar a espada a Sara, afaste-se da Forja de Brokkr e deixe algum tempo passar, depois retorne e pergunte sobre o progresso.',
      'Saia mais uma vez e volte à forja; Brokkr informa que Sara foi à Caverna na Base da Montanha (Mountain Base Cave), na Ilha Vulcânica de Agamen.',
      'Viaje até a Caverna na Base da Montanha e elimine inimigos pelo caminho, abrindo uma rota segura antes de localizar Sara na área da fornalha.',
      'Converse com Sara e ESCOLTE-a para fora pela mesma rota. Mantenha-a por perto e afaste monstros antes que prejudiquem sua fuga.',
      'Após alcançar a saída, volte à Forja de Brokkr em Bakbattahl, onde Sara entrega a Espada Régia restaurada.',
      'Retorne a Vernworth e entregue a espada restaurada a Roman, no pátio do castelo, para concluir a missão.'
    ],
    completion: 'Roman recebe a Espada Régia restaurada. A cadeia também libera o serviço de aprimoramento de estilo anão na forja, conforme progressão da campanha.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-steeled-resolve-blazing-forge-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Steeled-Resolve-Blazing-Forge',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'prey_for_pack', title: 'A Presa da Alcateia', original: 'Prey for the Pack',
    region: 'Cidade de Descanso da Fronteira — estrada a leste e Caverna Pútrida',
    giver: 'Morris, dono da farmácia na Cidade de Descanso da Fronteira',
    relatedEventIds: ['v206'],
    preparation: [
      'MISSÃO COM PRAZO: Rodge foi levado por lobos. Ao ativá-la, vá imediatamente resgatá-lo. O prazo exato não está confirmado e pode variar; NÃO durma dias para procurar pistas.',
      'Você pode ir diretamente à Caverna Pútrida (Putrid Cave), a leste da cidade, sem conversar com todos os moradores. Não há item obrigatório de inventário.'
    ],
    steps: [
      'Passe pela farmácia de Morris, no centro da Cidade de Descanso da Fronteira, e aceite procurar seu neto Rodge, levado por lobos.',
      'Para investigar, pergunte a Alsa sobre as flores Moonglow e a Jacint sobre o jardim de flores de Rodge; essas conversas são opcionais.',
      'Siga pela estrada que sai da cidade para leste até o canteiro de flores azuis Moonglow. À noite, as flores e pétalas brilhantes ajudam a localizar o caminho.',
      'Acompanhe a trilha de flores até a Caverna Pútrida, próxima ao lago; você também pode ir direto ao local de dia para evitar perder tempo.',
      'Entre na caverna e DERROTE os lobos imediatamente para manter Rodge vivo. Confira se o garoto o acompanha ao sair.',
      'Escolte Rodge em segurança de volta à farmácia de Morris e fale com o avô para encerrar a missão.'
    ],
    completion: 'Rodge retorna vivo para Morris. Se você demorar demais, a caverna pode conter apenas um retalho de roupa e a missão terá um desfecho pior, embora ainda possa ser encerrada.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-prey-for-the-pack-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Prey-for-the-Pack',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'every_rose', title: 'As Rosas Têm Espinhos', original: 'Every Rose Has Its Thorn',
    region: 'Vernworth — Rose Chateau Bordelrie, Bairro Nobre; mansões de Patrick e Allard',
    giver: 'Wilhelmina, no Rose Chateau',
    relatedEventIds: ['v302'],
    preparation: [
      'ALERTA DE PRAZO: depois que você oferecer ajuda a Wilhelmina, terá apenas TRÊS DIAS NO JOGO para investigar Allard. Reúna as duas provas antes de se distrair com outra missão.',
      'O gatilho pode exigir conhecer Wilhelmina nas missões O Trono Roubado/Um Encontro Perturbador, aumentar sua afinidade (flores ajudam) e voltar ao Rose Chateau à noite depois de algum tempo. Walkthroughs divergem sobre o limite da janela de ativação.',
      'As provas DESTA missão são Murder Report e Bribery Investigation Findings: não confundir com a Battahli-Crested Letter de Um Encontro Perturbador. Comprar a casa de Mildred é opcional e afeta um bilhete posterior.'
    ],
    steps: [
      'Após O Banquete da Farsa, visite Wilhelmina à noite no Rose Chateau e converse/entregue flores se for necessário aumentar afinidade. Se ela estiver ocupada com um cliente, examine o quadro com olho mágico nos aposentos e assista à cena; aceite ajudá-la.',
      'COM A MISSÃO ATIVA, fale com Sven no Castelo de Vernworth à noite. Procure Patrick em sua mansão no Bairro Nobre e aceite que ele distraia Allard para permitir investigar a casa dele.',
      'Entre na mansão de Allard à noite, depois que Patrick o atrair para fora; no andar superior, examine o quadro na parede para obter o Murder Report. Não ataque nem mate Allard prematuramente.',
      'Pegue também o Bribery Investigation Findings na casa perto da barbearia de Clovis, ao norte de Vernworth; se o documento não aparecer, consulte Brant antes de prosseguir, sem entregar a prova errada.',
      'Volte ao Capitão Brant à noite, na Estalagem Stardrop. Apresente primeiro Bribery Investigation Findings e depois Murder Report; aceite a oferta de auxílio de Brant para escapar dos guardas.',
      'No Rose Chateau, ENTREGUE Murder Report a Wilhelmina, escolha continuar ajudando, entre na sala com Allard e agarre-o quando ela pedir. Fuja pela janela e siga a ajuda de Brant.',
      'Após a fuga, deixe passar aproximadamente um dia e volte a Wilhelmina. Se comprou a casa de Mildred, confira também a porta da residência para um bilhete opcional.'
    ],
    completion: 'A trama de Wilhelmina termina após o encontro posterior. Perder o prazo de três dias ou denunciar a conspiração a Allard pode mudar o resultado e impedir sua rota preferida.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/',
      'https://www.rpgsite.net/guide/15670-dragons-dogma-2-every-rose-has-its-thorn-how-to-romance-wilhelmina-complete-her-quest',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'saint_slums', title: 'A Santa dos Cortiços', original: 'Saint of the Slums',
    region: 'Vernworth — Cortiços, Casa Mãos Caridosas; Posto do Retiro',
    giver: 'Elena, abadessa da Casa Mãos Caridosas',
    relatedEventIds: ['v103'],
    preparation: [
      'Reúna TRÊS Miasmites derrotando fantasmas/Phantoms durante a noite: são o pedido inicial de Elena, não um medicamento para comprar.',
      'No porão, recolha Unlabeled Medicine e Records of Treatment. A prova deve ser investigada por Radcliff ANTES de prender Elena.',
      'Para prender a abadessa, use AGARRAR — apenas conversar, atacar ou tentar entregá-la manualmente aos guardas não substitui esse comando.'
    ],
    steps: [
      'Nos Cortiços de Vernworth, escute a queixa de Vlasiy sobre seu filho Lubomir. Ofereça ajuda a Elena e ENTREGUE três Miasmites, obtidas de fantasmas à noite.',
      'Siga Elena pela Casa Mãos Caridosas. Fale com o paciente Lubomir, saia e ouça Lottie mencionar a sala de doentes do porão; retorne a Lubomir para aceitar investigar.',
      'Desça ao porão da casa, entre na sala dos doentes e passe pela cortina branca até o depósito: recolha Unlabeled Medicine e Records of Treatment sem descartá-los.',
      'Mostre os indícios a Lubomir; converse com Bruno na taverna dos Cortiços e, se possível, com Jehan. À noite, testemunhe o encontro de Elena com Alois na praça do Bairro Popular.',
      'Viaje ao Posto do Retiro e ENTREGUE Unlabeled Medicine ao médico Radcliff. Deixe um dia passar para ele analisar a substância e retorne para ouvir seu parecer.',
      'Com as provas reunidas, volte à Casa Mãos Caridosas, encontre Elena perto do porão e use AGARRAR nela: os guardas a prendem automaticamente.'
    ],
    completion: 'Elena é detida após a investigação. Os registros e a medicina identificada são evidência, não objetos de falsificação.',
    references: [
      'https://www.gamesradar.com/dragons-dogma-2-saint-of-the-slums/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Saint-of-the-Slums',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'candle_storm', title: 'Como uma Vela na Tempestade', original: 'A Candle in the Storm',
    region: 'Ilha Vulcânica — Acampamento; Bakbattahl — prisão e estrada oeste',
    giver: 'Menella, no Acampamento da Ilha Vulcânica',
    relatedEventIds: ['b02', 'i04'],
    preparation: [
      'Só avance após salvar Nadinia em Orações Ensombradas (Shadowed Prayers). Procure Menella no Acampamento da Ilha Vulcânica, perto das termas.',
      'Reserve 5.000 G para subornar Herman na prisão de Bakbattahl; sem esse pagamento ele pode não contar quem encomendou o atentado.',
      'DECISÃO DE RISCO: na encenação final, apoie a imperatriz Nadinia. Sacar a arma e apontá-la na direção dela pode revelar o mandante SEM matá-la; não golpeie Nadinia de verdade.'
    ],
    steps: [
      'Após Orações Ensombradas, encontre Menella no Acampamento da Ilha Vulcânica e aceite investigar quem ordenou o atentado contra Nadinia.',
      'Viaje à prisão de Bakbattahl pela estrada além dos Depósitos de Tintas. Fale com Herman na cela e PAGUE 5.000 G para obter a informação sobre os Cobras-Corais.',
      'Volte ao Acampamento Vulcânico e relate a informação a Menella; ela pede divulgar uma falsa localização da imperatriz para atrair os mandantes.',
      'Retorne à prisão de Bakbattahl e fale com Ashe na cela, espalhando a informação falsa conforme indicado pelo diário.',
      'Encontre Menella no lado oeste de Bakbattahl e acompanhe-a até a casa no exterior da cidade; concorde em proteger Nadinia no plano de emboscada.',
      'Quando o mandante chegar e exigir a morte da imperatriz, SAQUE a arma na direção de Nadinia sem atacá-la efetivamente e aguarde a reação de Menella; a encenação revela o conspirador.',
      'Converse com Menella após a cena e confirme o desfecho no diário.'
    ],
    completion: 'Mandante identificado com Nadinia preservada na rota protegida. Atacar o próprio mandante cedo ou escolher contra a imperatriz altera o desfecho e as recompensas.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-candle-in-the-storm-walkthrough/',
      'https://www.gamesradar.com/dragons-dogma-2-a-candle-in-the-storm/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'pilfered_path', title: 'Provações do Pobre Desgarrado', original: 'Off the Pilfered Path',
    region: 'Bakbattahl — prisão; Vermund — Campo de Batalha Antigo',
    giver: 'Hugo, após Piedade entre Ladrões e sua prisão em Bakbattahl',
    relatedEventIds: ['b02', 'b03'],
    preparation: [
      'ALERTA DE MORTE: se Hugo descobrir quem matou seus pais, poderá ir atrás de Lanzo. Localize Lanzo no Campo de Batalha Antigo antes do confronto ou chegue rapidamente para impedir que Hugo morra.',
      'Para obter uma boa saída para Hugo, deixe uma vaga de trabalho disponível: segurança do Rose Chateau após As Rosas Têm Espinhos OU loja de Isaac desocupada após o final alternativo de Ambição Cega.',
      'IMPORTANTE: o caminho seguro da família de Isaac (entregar LIVRO FALSO) preserva a família e NÃO libera necessariamente sua loja para Hugo. Não sacrifique personagens sem entender a escolha.'
    ],
    steps: [
      'Depois de Piedade entre Ladrões, vá à prisão de Bakbattahl, pelo caminho perto dos Depósitos de Tintas, e converse com Hugo em sua cela.',
      'Fale repetidas vezes com o prisioneiro Brefft para descobrir a verdade sobre os pais de Hugo e o esconderijo atual dos Cobras-Corais com Lanzo no Campo de Batalha Antigo.',
      'Escolha se contará a verdade a Hugo. Avisá-lo pode levá-lo a fugir em busca de vingança; se fizer isso, siga imediatamente ao Campo de Batalha Antigo e derrote Lanzo antes que Hugo morra.',
      'Como alternativa, fale com Dietrich e o carcereiro Ekertt para negociar a soltura de Hugo. Walkthroughs relatam pagamentos sucessivos de 1.000 G, 2.500 G e 5.000 G, com esperas entre as tentativas.',
      'Quando Hugo sair da prisão ou encontrar você no Campo de Batalha Antigo, converse com ele sobre uma vida honesta e sugira um trabalho viável em seu estado da campanha.',
      'Se completou As Rosas Têm Espinhos e a vaga do Rose Chateau estiver disponível, recomende-o como segurança; se a loja de Isaac estiver vazia pelo OUTRO desfecho de Ambição Cega, essa é uma alternativa.',
      'Confira a conclusão da missão e as consequências no diário; a disponibilidade de empregos, diálogo e soltura pode variar segundo decisões anteriores.'
    ],
    completion: 'Hugo pode sair vivo e conseguir trabalho, sair sem colocação ou morrer na vingança. As ações anteriores em Wilhelmina e Isaac mudam as opções: não prometer uma rota universal.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-off-the-pilfered-path-walkthrough/',
      'https://www.gamesradar.com/dragons-dogma-2-off-the-pilfered-path/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'beggars_tale', title: 'O Conto do Mendigo', original: "A Beggar's Tale",
    region: 'Vernworth — fonte do Bairro Mercantil, Taverna do Walter, Bairro Popular e mansão Baldwin',
    giver: 'Benton, perto da fonte onde Albert conta histórias durante o dia',
    relatedEventIds: ['v103'],
    preparation: [
      'SPOILERS DE ESCOLHAS: entregar as vestes do mendigo a Hilda tende a preservar Albert e Celina; entregar a Celina pode causar a morte dos dois. Entregar a Albert mantém seu segredo.',
      'Só há UM Beggar’s Garb para escolher a quem entregar. Falsificar a roupa não garante novas recompensas nem desfaz a decisão.',
      'Para economizar tempo, pode ir diretamente à casa de Albert no sudeste do Bairro Popular depois que ele sair, em vez de vigiá-lo durante o dia inteiro.'
    ],
    steps: [
      'Na praça do Bairro Mercantil de Vernworth, fale com Benton perto da fonte e ouça sua suspeita sobre a renda de Albert, que se apresenta como mendigo.',
      'Acompanhe Albert até o fim da tarde: ele visita a Taverna do Walter nos Cortiços e depois entra na casa no sudeste do Bairro Popular.',
      'Espere Albert sair da casa com roupas de nobre e entre enquanto a porta estiver destrancada. Recolha Beggar’s Garb (vestes do mendigo) dentro da residência.',
      'ESCOLHA SEU DESFECHO ANTES DA ENTREGA: leve o traje a Hilda na Mansão Baldwin, no Bairro Nobre, para que Albert abandone o disfarce; volte a falar com ela após alguns dias.',
      'Alternativa: entregue a roupa diretamente a Albert para preservar a vida dupla e receber ouro; a história não é exposta.',
      'Evite entregar a roupa a Celina na Taverna do Walter se quiser preservar os personagens: após alguns dias ela descobre a traição e a rota pode terminar com a morte de Celina e Albert.',
      'Confira no diário o encerramento da missão e a recompensa do personagem escolhido; a escolha não pode ser corrigida por uma segunda entrega do mesmo item.'
    ],
    completion: 'Três conclusões possíveis: Hilda força Albert a trabalhar; Albert compra seu silêncio; Celina descobre a verdade com resultado trágico. A rota Hilda é preferível para preservar personagens.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-beggars-tale-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/A-Beggars-Tale',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'ailing_arborheart', title: 'A Dor do Coração do Jardim', original: 'The Ailing Arborheart',
    region: 'Jardim Sagrado — Coração do Jardim; Bakbattahl — Forja de Brokkr',
    giver: 'Doireann, no Coração do Jardim depois de A Prova de Arco e Flecha',
    relatedEventIds: ['v106', 'i06', 'u04'],
    preparation: [
      'Complete A Prova de Arco e Flecha (A Trial of Archery) e resgate Doireann. Um peão com especialização Woodland Wordsmith ajuda a traduzir a palavra élfica gwyfencha.',
      'Gwyfencha é scalecinder (cinza de escama), resíduo de forja de Battahl. NÃO tente obtê-lo de dragões nem confunda com Glimmercoal ou Glymercole.',
      'Se Sara não oferecer a conversa sobre gwyfencha, avance sua linha de forja de Roman (Lâmina Cega, Forja Fria e Vontade Resistente, Forja Ardente); guias variam quanto à necessidade dessa cadeia antes de falar com ela.'
    ],
    steps: [
      'Após salvar Doireann durante A Prova de Arco e Flecha, retorne ao Jardim Sagrado e encontre-a junto ao Coração do Jardim, a árvore adoecida.',
      'Converse com Doireann, observe a árvore e pergunte sobre gwyfencha. Use peão intérprete se disponível ou converse com Glyndwr para esclarecer o termo.',
      'Entenda que gwyfencha corresponde à cinza de escama produzida por ferreiros battahlianos; não existe item obrigatório para ENTREGAR nesta primeira parte.',
      'Viaje até Bakbattahl e procure Sara na Forja de Brokkr, no sul da cidade. Pergunte sobre obter cinza de escama para salvar a árvore.',
      'Depois da conversa com Sara, confira a conclusão de A Dor do Coração do Jardim no diário; a sequência Da Floresta à Forja começa em seguida.'
    ],
    completion: 'Sara explica uma maneira de obter a cinza de escama para Doireann, liberando a continuação. Nenhuma entrega de cinza é exigida nesta etapa.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-ailing-arborheart-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Ailing-Arborheart',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'forest_to_forge', title: 'Da Floresta à Forja', original: 'Out of the Forest, Into the Forge',
    region: 'Jardim Sagrado — Doireann; Bakbattahl — Forja de Brokkr e Caverna dos Retardatários',
    giver: 'Sara, continuação automática de A Dor do Coração do Jardim',
    relatedEventIds: ['i06', 'u04'],
    preparation: [
      'Prepare UMA MAÇÃ APODRECIDA e UM PEIXE APODRECIDO para o nutriabh. Deixe frutas e peixes estragarem no inventário ao passar tempo; os produtos frescos não substituem os apodrecidos.',
      'O trecho da caverna é CRONOMETRADO. Organize inventário e grupo ANTES de entregar o nutriabh a Sara. Há até SEIS montes de cinza de escama; conseguir os seis é recomendação, não pré-requisito rígido universal de conclusão.',
      'Um cristal de porto em Bakbattahl e uma pedra de transporte podem encurtar a viagem com Doireann; não são itens obrigatórios desta missão.'
    ],
    steps: [
      'Depois de falar com Sara, volte ao Jardim Sagrado e relate a Doireann que ferreiros de Battahl conhecem a cinza de escama, mas precisam de nutriabh.',
      'Obtenha uma maçã e um peixe e deixe ambos apodrecerem no inventário. ENTREGUE a maçã apodrecida e o peixe apodrecido a Doireann para que ela prepare o prato.',
      'Escolte Doireann até Bakbattahl e encontre Sara na Forja de Brokkr; use viagem rápida apenas se houver ponto de transporte válido.',
      'Entregue o nutriabh a Sara e siga-a com Doireann até a Caverna dos Retardatários (Stragglers’ Cave), próxima de Bakbattahl.',
      'Quando Brokkr se afastar com o prato, entre IMEDIATAMENTE na caverna e recolha os montes de Scalecinder (cinza de escama). Quebre caixas e investigue os cantos; são seis montes conhecidos.',
      'Quando Sara chamar, saia e entregue a cinza coletada a Doireann. Coletar os seis montes protege o melhor desfecho da árvore, mas a quantidade recebida pode variar.',
      'Volte ao Jardim Sagrado depois da missão para conferir como o Coração do Jardim reagiu; a recuperação da árvore também ajuda a contextualizar a evacuação no Mundo Desancorado.'
    ],
    completion: 'Cinza de escama entregue a Doireann; missão encerrada com recompensa. Se não encontrar os seis montes, não assuma derrota automática: confira o diário e o resultado no jogo.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-out-of-the-forest-into-the-forge-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Out-of-the-Forest-Into-the-Forge',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'blue_sunbright_house', title: 'A Casa da Luz-Solaris Azul', original: 'House of the Blue Sunbright',
    region: 'Vernworth — Cortiços, Bairro Nobre e Mansão Townsend; estrada para Melve',
    giver: 'Diana, criada da família Townsend, após A Dádiva da Caridade',
    relatedEventIds: ['v103'],
    preparation: [
      'Complete A Dádiva da Caridade (The Gift of Giving) para ajudar Daphne. A missão seguinte depende dela e da aproximação da criada Diana.',
      'Antes de permitir a viagem de Sebastian, reúna TRÊS suprimentos: Misshapen Eye (olho disforme de ciclope), Detoxifying Decoction (antídoto) e Waking Powder (pó despertador).',
      'ALERTA DE MORTE: sem os suprimentos corretos Sebastian pode ficar preso ou morrer na estrada para Melve. Se ele não voltar após um dia ou dois, NÃO espere passivamente: vá resgatá-lo perto de Melve.'
    ],
    steps: [
      'Depois de ajudar Daphne nos Cortiços, passe perto da escadaria que liga o Bairro Mercantil aos Cortiços para Diana abordá-lo; encontre-a na Mansão Townsend no Bairro Nobre.',
      'Converse com Diana e com a família e procure Daphne perto da Casa Mãos Caridosas, nos Cortiços. Convide-a a se passar por Sebastian durante uma viagem e ESCOLTE-a até a mansão.',
      'Antes de Sebastian partir, obtenha um Misshapen Eye, saqueando um ciclope derrotado. Uma alternativa relatada é Rugged Bone, mas o olho é a opção mais consistentemente documentada.',
      'Compre ou fabrique UM Detoxifying Decoction (cura envenenamento) e UM Waking Powder (acorda quem dorme); são encontrados entre os itens de Philbert no Bairro Mercantil.',
      'ENTREGUE a Sebastian os três suprimentos no diálogo de preparo e só então permita que ele viaje para Melve.',
      'Passe aproximadamente um dia e retorne à Mansão Townsend. Se Diana informar que Sebastian desapareceu, vá IMEDIATAMENTE à estrada próxima de Melve, enfrente os monstros e socorra-o; trate veneno se for necessário.',
      'Depois que Sebastian voltar, fale com Diana e Daphne na mansão para acompanhar o encerramento e a recompensa.'
    ],
    completion: 'Sebastian pode voltar sozinho se partir equipado; sem suprimentos, resgate-o rapidamente para evitar sua morte. A missão revela a ligação de Daphne com a família Townsend.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-house-of-the-blue-sunbright-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/House-of-the-Blue-Sunbright',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'gift_giving', title: 'A Dádiva da Caridade', original: 'The Gift of Giving',
    region: 'Vernworth — Cortiços e Casa Mãos Caridosas',
    giver: 'Daphne, menina que circula pelos Cortiços',
    relatedEventIds: ['v103'],
    preparation: [
      'É a missão que antecede A Casa da Luz-Solaris Azul: termine os pedidos de Daphne antes de procurar Diana e Sebastian na Mansão Townsend.',
      'Prepare 1 Bunch of Flowers (buquê de flores), 1 Silver Ore (minério de prata), 2 Gold Ore (minérios de ouro) e remédios contra intoxicação.',
      'FONTES DIVERGEM sobre o último pedido: PowerPyx e GamerGuides relatam CINCO Detoxifying Decoctions/Panaceas; Game8 relata TRÊS. Para evitar retornar ao mercado, leve CINCO e confirme a quantidade pedida no diário.',
      'O buquê pode MURCHAR se ficar muito tempo no inventário; entregue assim que prepará-lo. Os minérios não precisam ser fabricados nem falsificados.'
    ],
    steps: [
      'Depois de No Rastro do Dragão, vá aos Cortiços de Vernworth, encontre Daphne perto da Casa Mãos Caridosas e aceite ajudá-la.',
      'Junte duas espécies de flores e combine-as em um Bunch of Flowers; também pode usar um buquê já guardado. ENTREGUE-o a Daphne antes que murche.',
      'Minere 1 Silver Ore em cavernas, como a Mina de Trevo, ou compre-o de um mercador. Volte aos Cortiços e entregue o minério de prata a Daphne.',
      'Deixe passar cerca de um dia no jogo, retorne à Casa Mãos Caridosas e converse de novo com Daphne para receber o pedido seguinte.',
      'Recolha e ENTREGUE 2 Gold Ore a Daphne. Minérios encontrados na Mina de Trevo ou já guardados no inventário servem.',
      'Adquira remédios contra intoxicação, como Detoxifying Decoction; eles podem ser comprados na loja de Philbert no Bairro Mercantil ou preparados com Pitywort e Syrupwort Leaf.',
      'Leve até cinco remédios e ENTREGUE a quantidade efetivamente solicitada a Daphne. PowerPyx/GamerGuides registram cinco; Game8, três. Confira o marcador da missão na sua versão.',
      'Depois de concluir, continue visitando os Cortiços para encontrar Diana: esta missão é a pré-condição narrativa de A Casa da Luz-Solaris Azul.'
    ],
    completion: 'Daphne recebe flores, minério de prata, dois minérios de ouro e os remédios contra intoxicação. A relação construída nos Cortiços permite continuar a história dela com Sebastian.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-the-gift-of-giving-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/The-Gift-of-Giving',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'oxcart_courier', title: 'Correio por Carroça', original: 'Oxcart Courier',
    region: 'Vernworth — estação norte de carroças; Melve — Lennart',
    giver: 'Donovan, responsável pela carroça ao norte de Vernworth',
    relatedEventIds: ['v102'],
    preparation: [
      'Começa após No Rastro do Dragão e a chegada a Vernworth. Donovan entrega a Letter to Ser Lennart; NÃO é a carta de Sven nem a prova de A Carroça Fantasma.',
      'Donovan entrega 200 G para a viagem de ida e volta. A carroça pode ser atacada na estrada: ajude a defendê-la, mas se ela quebrar, é possível prosseguir a pé até Melve.',
      'Lennart pode estar junto ao poço da parte destruída da vila, na estalagem, em casa ou perto do arco em ruínas, dependendo do estado de Melve.'
    ],
    steps: [
      'Vá à Estação Norte de Carroças de Vernworth durante o dia e espere a carroça que parte para Melve. Converse com Donovan e aceite entregar a Letter to Ser Lennart.',
      'Embarque na carroça, pague a tarifa com o dinheiro recebido e solicite seguir viagem; prepare-se para defender a carroça se monstros atacarem no trajeto.',
      'Se a carroça for destruída, não abandone a missão. Siga a estrada até Melve por conta própria: o objetivo importante é ENTREGAR a carta.',
      'Em Melve, procure Lennart perto do poço na parte danificada da vila. Se não estiver lá, verifique a estalagem, sua casa próxima ou o arco em ruínas a noroeste.',
      'Fale com Lennart e ENTREGUE a Letter to Ser Lennart. Se outra tarefa em Melve interromper a conversa, conclua o diálogo e fale novamente com ele.',
      'Retorne a Vernworth e converse com Donovan na estação norte para confirmar a entrega e receber a recompensa.'
    ],
    completion: 'Carta entregue a Lennart, Donovan informado. Não é necessário manter a carroça intacta até Melve se conseguir completar o percurso a pé.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-oxcart-courier-walkthrough/',
      'https://clair.6fast.com/dragons-dogma-2/guide/side-quests/vernworth/oxcart-courier-walkthrough',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'magisterial_amenity', title: 'Cortesia Magisterial', original: 'A Magisterial Amenity',
    region: 'Vernworth — arquivo subterrâneo da Casa Mãos Caridosas e Salão de Máscaras do castelo',
    giver: 'Waldhar, no arquivo sob os Cortiços, após O Magistrado Aprisionado',
    relatedEventIds: ['v103', 'v301'],
    preparation: [
      'Conclua O Magistrado Aprisionado e A História sob a Profundez para liberar o arquivo subterrâneo onde Waldhar passa a estudar. Converse repetidas vezes com ele até receber a busca pelos óculos.',
      'Os Exquisite Spectacles (óculos requintados) estão em um depósito atrás do Salão de Máscaras do castelo. Vá durante o DIA para evitar exigência de traje nobre durante um baile.',
      'O objeto original deve ser ENTREGUE a Waldhar; não há compra nem falsificação necessária.'
    ],
    steps: [
      'Vá aos Cortiços de Vernworth e desça até o arquivo da Casa Mãos Caridosas, descoberto durante A História sob a Profundez.',
      'Converse com Waldhar até ele pedir que recupere seus Exquisite Spectacles, confiscados pelos guardas.',
      'Dirija-se ao complexo do Castelo de Vernworth e entre no Salão de Máscaras, no lado oeste do terreno do palácio.',
      'Na parte dos fundos do salão, entre na sala de depósito e recolha os Exquisite Spectacles. Visitar durante o dia reduz interferência da festa de máscaras.',
      'Retorne ao arquivo sob os Cortiços e ENTREGUE os óculos originais a Waldhar.',
      'Confirme a conclusão e recolha a recompensa, o tomo Winter’s Path.'
    ],
    completion: 'Óculos devolvidos a Waldhar no arquivo subterrâneo; ele entrega Winter’s Path como recompensa.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-magisterial-amenity-walkthrough/',
      'https://dragonsdogma.fandom.com/wiki/A_Magisterial_Amenity',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'gossamer_clouds', title: 'Um Véu de Finas Nuvens', original: 'A Veil of Gossamer Clouds',
    region: 'Vernworth — quarto de Sven no Castelo; Bakbattahl — Laboratório de Pesquisa de Magia Proibida',
    giver: 'Sven, em seus aposentos no segundo andar do Castelo de Vernworth',
    relatedEventIds: ['v304', 'b02'],
    preparation: [
      'Começa depois de O Banquete da Farsa. Sven entrega uma Unfinished Letter; para a MELHOR RECOMPENSA, investigue Phaesus no laboratório em Bakbattahl ANTES de encerrar a missão.',
      'Há dois caminhos com recompensas diferentes: analisar a carta com Waldhar pode encerrar mais cedo, com menos ouro e SEM Ferrystone; investigar o laboratório e entregar a Letter to Lord Phaesus concede a recompensa maior.',
      'Não confunda Unfinished Letter com a Letter to Lord Phaesus, nem com a carta a Lennart de Correio por Carroça.'
    ],
    steps: [
      'Após O Banquete da Farsa, vá ao quarto de Sven, no segundo andar do Castelo de Vernworth, e receba a Unfinished Letter. Leia-a para identificar o nome Phaesus.',
      'Para a rota de melhor recompensa, viaje até Bakbattahl. Use a passagem atrás dos Depósitos de Tintas, atravessando a ponte curta até o Laboratório de Pesquisa de Magia Proibida, ou entre pelo complexo do palácio se disponível.',
      'No laboratório, contorne a grande estátua/corpo de dragão e escute dois pesquisadores conversando sobre a correspondência que veio de Vermund.',
      'Quando os pesquisadores saírem, entre no Laboratorium — Workshop #2 e recolha a Letter to Lord Phaesus sobre a mesa.',
      'Volte ao quarto de Sven no Castelo de Vernworth e MOSTRE a Letter to Lord Phaesus; conclua a missão com a recompensa maior, relatada como 20.000 G e uma Ferrystone.',
      'Rota alternativa: Waldhar no arquivo sob a Casa Mãos Caridosas pode interpretar a Unfinished Letter. Apresentar apenas essa análise a Sven encerra mais cedo, porém fontes relatam 14.000 G e ausência de Ferrystone.'
    ],
    completion: 'A investigação é entregue a Sven. Para preservar a recompensa maior, leve a carta do laboratório; a análise isolada de Waldhar é um caminho alternativo de recompensa menor.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-veil-of-gossamer-clouds-walkthrough/',
      'https://www.neoseeker.com/dragons-dogma-2/guides/A_Veil_of_Gossamer_Clouds',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'game_of_wits', title: 'Um Jogo de Perspicácia', original: 'A Game of Wits',
    region: 'Campo de Batalha Antigo → Santuário da Montanha → Santuário da Fronteira',
    giver: 'Esfinge, no Santuário da Montanha, após atravessar a Caverna do Fim do Mundo',
    relatedEventIds: ['m06', 'v205', 'b06', 'b062'],
    preparation: [
      'ALERTA PERDÍVEL: respostas erradas podem bloquear a conquista de resolver todos os dez enigmas nesta campanha. Faça um salvamento na hospedaria antes de se comprometer, sem confundir salvamento normal com salvamento da hospedaria.',
      'Registre ONDE pegou o primeiro Memento do Buscador desta campanha. A Ruminação concede somente SETE DIAS no jogo para buscar ali o Finder’s Token e entregá-lo.',
      'Leve um Peão Principal, prepare acesso a uma Pedra da Fenda para contratar SphinxParent/SphinxMother/SphinxFather e não gaste o Sealing Phial antes de apresentá-lo no enigma dos Olhos.',
      'O rastreador Esfinge em Ferramentas traz as respostas individuais dos dez desafios e registra o local do primeiro memento; consultá-lo não conclui automaticamente esta missão.'
    ],
    steps: [
      'Saindo da Cidade de Descanso da Fronteira, alcance o Campo de Batalha Antigo, atravesse a fortaleza e a Caverna do Fim do Mundo até o Santuário da Montanha. Converse com a Esfinge para iniciar A Game of Wits.',
      'Resolva os CINCO enigmas iniciais: Olhos (Sealing Phial no baú sobre a entrada da caverna), Loucura (apresente seu Peão Principal ou alguém com afinidade suficiente), Sabedoria (traga um peão com nome SphinxParent/SphinxMother/SphinxFather), Convicção (entregue um item que deseja duplicar) e Ruminação (Finder’s Token do PRIMEIRO memento).',
      'Na Ruminação, só inicie a contagem quando estiver preparado. Volte ao local exato de seu primeiro Seeker’s Token, recolha o Finder’s Token e entregue à Esfinge em até sete dias do jogo.',
      'Quando a Esfinge voar, localize-a novamente no Santuário da Fronteira, a oeste da Cidade de Descanso da Fronteira. Essa REUNIÃO conta como o sexto enigma, mesmo sem resposta verbal.',
      'Resolva os quatro desafios restantes na ORDEM QUE SURGIREM, que pode variar: Futilidade (leve Maurits até o vaso, em vez de transportar o vaso frágil), Diferenciação (compare Dante e Vergil), Competição (arremesse o adversário apesar do Ring of Derision) e Memória (número exato de enigmas anteriores resolvidos corretamente).',
      'Na Memória, conte os baús de recompensa liberados por respostas corretas, INCLUINDO a Reunião. Respostas erradas não contam; confirme as estátuas somente depois de revisar o total.',
      'Abra o baú do enigma da Memória para obter a Unmaking Arrow. ANTES da despedida da Esfinge, equipe a vocação Arqueiro. A flecha é um meio recomendado de concluir o combate, não a única técnica relatada.',
      'Após o último desafio, não deixe a Esfinge fugir: inicie o combate e, se usar a Unmaking Arrow, atire no corpo/pernas DEPOIS do início do combate, não na cabeça. Recolha a chave deixada por ela e abra o grande baú dourado.',
      'Confira a missão no diário e, se for seu objetivo, use a Eternal Wakestone em um grupo de pelo menos duas pessoas mortas para a conquista relacionada. Essa recompensa é posterior aos enigmas.'
    ],
    completion: 'Os dez enigmas incluem a Reunião, e a missão é concluída com o confronto final contra a Esfinge. O grande baú exige a chave obtida no combate; errar enigmas prejudica a conquista de todos os acertos.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-a-game-of-wits-walkthrough/',
      'https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/',
      'https://www.rpgsite.net/guide/15635-dragons-dogma-2-a-game-wit-where-to-find-how-to-solve-all-sphinxs-riddles'
    ]
  },
  {
    id: 'tolled_to_rest', title: 'Tolled to Rest', original: 'Tolled to Rest',
    region: 'Estrada e ruínas do Campo de Batalha Antigo, a nordeste da Cidade de Descanso da Fronteira',
    giver: 'Oskar, na estrada de acesso ao Campo de Batalha Antigo',
    relatedEventIds: ['v205'],
    preparation: [
      'Título de missão em PT-BR NÃO CONFIRMADO por catálogo localizado ou captura da build: a ficha usa o nome inglês Tolled to Rest, sem tradução inventada.',
      'Encontre Oskar sob ataque de monstros na estrada. Proteja-o antes de entrar na fortaleza: ele precisa chegar à sala do sino.',
      'Na sala do sino há um exemplar ORIGINAL de Nation’s Death Knell (Dobre de Finados da Nação), útil para Magia Vertiginosa e O Julgamento do Feiticeiro. Não entregue um grimório importante à pessoa errada.'
    ],
    steps: [
      'Vá para o Campo de Batalha Antigo, seguindo a estrada a nordeste da Cidade de Descanso da Fronteira, e encontre Oskar, vestido de vermelho, entre os inimigos.',
      'Derrote os monstros que o atacam e fale com Oskar para aceitar a escolta até o cenotáfio no interior das ruínas.',
      'Acompanhe Oskar pelo castelo e pelas passarelas, eliminando inimigos, sobretudo esqueletos. Não o deixe isolado durante o percurso.',
      'Passe pela muralha superior e atravesse a abertura que leva ao lado interno de uma porta anteriormente bloqueada; abra caminho para Oskar.',
      'Chegue com ele à sala do sino. Se o grimório Nation’s Death Knell estiver no pedestal, deixe Oskar concluir a interação; se já o recolheu em outra visita, confira inventário e depósito porque Game8 relata que pode ser necessário apresentá-lo para resolver a etapa.',
      'Depois de Oskar tocar o sino, receba a Ancient Battleground Key e confirme a conclusão da missão no diário. A chave abre a sala trancada em frente para saque opcional.',
      'Antes de sair, localize o Nation’s Death Knell ORIGINAL disponível na área e guarde-o para as missões de Trysha/Myrddin, planejando as cópias com Ibrahim quando necessário.'
    ],
    completion: 'Oskar chega ao sino, toca-o e entrega a Ancient Battleground Key. O grimório pode ser recolhido para outra missão; a chave é recompensa, não pré-requisito para a escolta.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-tolled-to-rest-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Tolled-to-Rest',
      'https://www.rpgsite.net/guide/15635-dragons-dogma-2-a-game-wit-where-to-find-how-to-solve-all-sphinxs-riddles'
    ]
  },
  {
    id: 'masked_correspondence', title: 'Correspondência Mascarada', original: 'Masked Correspondence',
    region: 'Vernworth — aposentos de Sven no Castelo e Salão de Máscaras',
    giver: 'Sven, em seu quarto no segundo andar do Castelo de Vernworth',
    relatedEventIds: ['v104'],
    preparation: [
      'Título PT-BR Correspondência Mascarada pareado no catálogo Kiranico PT-BR, sem confirmação direta em save do jogo.',
      'Antes de avançar demais a história em Vernworth, visite Sven após O Trono do Sobran e A Caixa Ornamentada. Fontes divergem sobre o gatilho e possível limite de disponibilidade; conferir se Sven oferece a carta no diário da sua campanha.',
      'LEVE o traje cortesão (Courtly Tunic e Courtly Breeches) e a Eventide Mask, obtidos ou usados em O Trono Roubado. O baile ocorre à noite, e não em todas as noites.',
      'ALERTA: você recebe UMA Letter to Lord Patrick. Um guia relata falha ao entregar a pessoa errada; confirme o nome do NPC antes de selecionar Entregar.'
    ],
    steps: [
      'Entre no Castelo de Vernworth e procure o quarto de Sven no segundo andar, a noroeste. Converse com ele e aceite levar a Letter to Lord Patrick.',
      'Confira que recebeu a Letter to Lord Patrick. NÃO confunda essa carta com a Unfinished Letter e a Letter to Lord Phaesus de Um Véu de Finas Nuvens.',
      'Vista Courtly Tunic, Courtly Breeches e Eventide Mask e vá ao Salão de Máscaras, na ala oeste dos terrenos do castelo, DURANTE UMA NOITE DE BAILE; se não houver festa, retorne na noite seguinte.',
      'Dentro do salão, procure Lord Patrick: capa AZUL e máscara preta/dourada sobre os olhos, sem o adorno de juba das máscaras de outros nobres. Não entregue a qualquer convidado.',
      'Confirme o nome Lord Patrick na interação e ENTREGUE a carta original somente a ele.',
      'Retorne aos aposentos de Sven no segundo andar e informe que a carta foi entregue. Verifique a conclusão no diário e a recompensa, descrita nas fontes como 900 XP, 6.000 G e um Onyx.'
    ],
    completion: 'Lord Patrick recebe a carta correta no baile; Sven é informado posteriormente. A disponibilidade inicial e o ponto exato de corte na história não foram verificados em save da versão vigente.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-masked-correspondence-walkthrough/',
      'https://www.gamerguides.com/dragons-dogma-2/guide/side-quests/vernworth/masked-correspondence-walkthrough',
      'https://samurai-gamers.com/dragons-dogma-2/dd2-vernworth-side-quest-masked-correspondence-walkthrough/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'welcome_battahl', title: 'De Volta a Battahl', original: 'Welcome to Battahl',
    region: 'Bakbattahl — Bairro Mercantil, em frente à taverna Wanderer’s Haven',
    giver: 'Roger e seus valentões abordam o Nascen ao se aproximar da taverna',
    relatedEventIds: ['b02'],
    preparation: [
      'Título PT-BR De Volta a Battahl pareado no catálogo Kiranico PT-BR, sem confirmação direta em save do jogo. A abordagem ocorre após chegar a Bakbattahl, normalmente na sequência de Nação da Chama Luzente.',
      'Essa missão apresenta o mercenário RAGHNALL e é o pré-requisito narrativo documentado de Tensions on the Highroad.',
      'Há resultados diferentes: derrotar todos os três valentões antes da intervenção de Raghnall pode render mais ouro; caso intervenha, normalmente há duelo individual contra Taleef. Fontes secundárias divergem nos detalhes de derrota e recompensa.',
      'Se vencer, guarde o Fruit Wine de recompensa se quiser usá-lo futuramente para produzir Newt Liqueur em O Sábio Beberrão. Esse vinho NÃO é item que você precisa trazer para começar a missão.'
    ],
    steps: [
      'Chegue a Bakbattahl e passe em frente à taverna Wanderer’s Haven no Bairro Mercantil; Roger e seu grupo iniciam uma provocação e combate.',
      'Defenda-se dos três valentões. Se vencê-los antes da intervenção de Raghnall, há relatos de uma recompensa em ouro maior (13.500 G), sem duelo separado.',
      'Se Raghnall interromper o combate, ele pedirá uma luta justa de um contra um contra Taleef, um adversário de espada pesada. Seus peões não participam desse duelo.',
      'Derrote Taleef esquivando dos golpes largos e contra-atacando, para obter o encerramento favorável; fontes relatam 8.500 G e Fruit Wine nessa rota.',
      'Se for derrotado, a missão pode ser encerrada mesmo assim, mas Game8 relata perda de 3.000 G e ausência de Fruit Wine. NÃO tratar vitória/recompensa máxima como garantidas.',
      'Após a conversa final com Roger e Raghnall, confira o diário. Mais adiante, retorne a Vernworth e procure Simon, que pode iniciar Tensions on the Highroad.'
    ],
    completion: 'Confronto com o grupo de Roger concluído e Raghnall apresentado. A quantidade de ouro e o recebimento de Fruit Wine dependem do resultado.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-welcome-to-battahl-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Welcome-to-Battahl',
      'https://www.neoseeker.com/dragons-dogma-2/guides/Welcome_to_Battahl',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'tensions_highroad', title: 'Tensão na Estrada', original: 'Tensions on the Highroad',
    region: 'Vernworth → estrada do Posto de Controle da Fronteira → Caverna Guerco',
    giver: 'Simon, soldado próximo à estação norte de carroças de Vernworth',
    relatedEventIds: ['v304', 'b02'],
    preparation: [
      'Título PT-BR Tensão na Estrada pareado no catálogo Kiranico PT-BR (sem teste em save). Depois de Welcome to Battahl, RETORNE a Vernworth e procure Simon perto da estação norte/fonte. Não assuma que a missão dispara antes da apresentação de Raghnall.',
      'Simon pede escolta de Ser Augustin, opositor político da rainha regente. O objetivo muda após a intervenção de Raghnall; a carroça NÃO é o objetivo final.',
      'Há uma escolha entre Simon/soldados e Raghnall. As duas rotas chegam à fuga pela Caverna Guerco; Game8 recomenda apoiar Raghnall por sua disposição posterior, mas o ganho de afinidade não foi testado em save.',
      'Concluir essa missão é pré-requisito relatado para encontrar Raghnall em Clash and Conclusion, na Torre do Luar.'
    ],
    steps: [
      'Após terminar Welcome to Battahl, volte a Vernworth. Procure Simon na região da estação norte de carroças/fonte e aceite escoltar Ser Augustin.',
      'Dirija-se à bifurcação da estrada perto da Cidade de Descanso da Fronteira, onde a carroça de Augustin aguarda a escolta.',
      'Proteja a carroça até Raghnall aparecer e interromper o trajeto. Escolha apoiar Raghnall ou os soldados — ambos os caminhos resultam em perseguição.',
      'Siga Raghnall e Augustin rumo à Caverna Guerco; não continue simplesmente escoltando uma carroça que já abandonou a rota.',
      'Dentro da caverna, uma queda separa você dos peões. Prossiga a pé até reencontrar Raghnall e ajude-o contra os inimigos.',
      'Enfrente os Saurianos e siga junto de Raghnall até a saída. Ele revela o plano de incriminá-lo pelo ataque a Augustin.',
      'Saia da Caverna Guerco e confira a conclusão. Na progressão posterior de O Guardião Gigantus, prepare-se para o encontro individual com Raghnall na Torre do Luar.'
    ],
    completion: 'Você e Raghnall saem da Caverna Guerco e a missão é concluída, independentemente do lado inicialmente escolhido. A etapa abre caminho ao confronto posterior.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-tensions-on-the-highroad-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Tensions-on-the-Highroad',
      'https://samurai-gamers.com/dragons-dogma-2/dd2-vernworth-side-quest-tensions-on-the-highroad-walkthrough/',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    id: 'clash_conclusion', title: 'Confronto Final', original: 'Clash and Conclusion',
    region: 'Ilha Vulcânica de Agamen — Torre do Luar (Moonglint Tower)',
    giver: 'Raghnall, que intercepta o caminho durante O Guardião Gigantus',
    relatedEventIds: ['p06'],
    preparation: [
      'Título PT-BR Confronto Final pareado no catálogo Kiranico PT-BR (sem teste em save). Esta luta é CONDICIONAL: fontes indicam que é necessário ter concluído Tensions on the Highroad antes de subir a Torre do Luar.',
      'É um duelo com Raghnall durante a história principal O Guardião Gigantus. Não é necessário carregar item de entrega ou falsificação.',
      'A derrota de Raghnall pode matá-lo. Game8 menciona possibilidade de ressuscitá-lo com Wakestone, mas sem benefício adicional observado; não prometa consequência positiva nem a exija.'
    ],
    steps: [
      'Complete Welcome to Battahl, depois Tensions on the Highroad, antes de iniciar a subida final da Torre do Luar.',
      'Progrida na missão principal O Guardião Gigantus e vá à Torre do Luar na Ilha Vulcânica de Agamen.',
      'Ao subir a torre, Raghnall pode bloquear sua passagem e exigir um duelo um contra um. Caso não apareça, revise se a cadeia anterior foi cumprida; o gatilho foi descrito em guias de 2024.',
      'Lute com cautela: Raghnall é ágil e usa ataques de guerreiro. Esquive, abra espaço e contra-ataque; ataques à distância também podem funcionar.',
      'Derrote Raghnall para encerrar Clash and Conclusion. Revivê-lo com Wakestone é uma escolha separada, não um passo obrigatório de conclusão.',
      'Continue a subir a torre em direção aos eventos de Phaesus e à missão principal Legado. Não confunda este duelo com a luta anterior contra Taleef em Bakbattahl.'
    ],
    completion: 'Raghnall é vencido na Torre do Luar, a passagem fica livre e a história principal pode prosseguir. O encontro depende da cadeia anterior.',
    references: [
      'https://www.powerpyx.com/dragons-dogma-2-clash-and-conclusion-walkthrough/',
      'https://game8.co/games/Dragons-Dogma-2/archives/Clash-and-Conclusion',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests'
    ]
  },
  {
    "id": "case_sculptors_block",
    "title": "A Inspiração de um Escultor",
    "original": "A Case of Sculptor's Block",
    "region": "Vernworth (Bairro Nobre) → oficina de Fulvio em Bakbattahl → Ninho do Grifo do Ermo",
    "giver": "Klark, junto à propriedade dele no Bairro Nobre de Vernworth",
    "relatedEventIds": [
      "b02"
    ],
    "preparation": [
      "MISSÃO COM RECOMPENSA VARIÁVEL: Klark pede uma escultura de grifo, mas Fulvio precisa completar o desenho DURANTE o combate. Matar o grifo muito depressa ou deixá-lo fugir pode produzir estátua inferior.",
      "Rota mais controlável: obter uma cabeça de Medusa ainda ativa, preferencialmente Preserved Medusa Head, e petrificar o grifo enquanto Fulvio observa. É OPCIONAL para concluir a missão, mas relevante ao melhor resultado. A cabeça perde potência com o tempo; guardar em depósito desacelera a deterioração, segundo guias comunitários.",
      "Alternativa sem Medusa: mantenha o grifo vivo e distraído, proteja Fulvio e aguarde a confirmação do desenho. Não confie em um número exato de minutos: os walkthroughs divergem.",
      "A missão e a tradução PT-BR estão pareadas no catálogo Kiranico; procedimentos e valores baseiam-se em walkthroughs da versão original, não em teste no save da expansão."
    ],
    "steps": [
      "Em Vernworth, vá à propriedade de Klark no Bairro Nobre e aceite procurar o escultor Fulvio em Battahl.",
      "Viaje para Bakbattahl, entre na oficina de Fulvio ao sul do bairro residencial e converse sobre seu esboço de um grifo.",
      "ANTES de acompanhar Fulvio até o ninho, decida se quer usar uma cabeça ativa de Medusa. Para obtê-la, enfrente a Medusa na caverna Caliginous Depths (região da floresta de Wyrmsblood, ao sudoeste de Battahl) e decapite-a; leve a cabeça rapidamente.",
      "Encontre Fulvio perto de Wasteland Griffin’s Nest, a noroeste de Bakbattahl, e acompanhe-o até o grifo. Evite provocar um combate antecipado longe dele.",
      "Com Medusa, equipe a cabeça como item de uso e direcione o olhar petrificante ao grifo antes que o desenho termine. Sem Medusa, segure a atenção do monstro, não o mate precocemente e proteja Fulvio.",
      "Observe o comentário de Fulvio sobre a qualidade do esboço. Se o grifo morrer cedo ou escapar e ele reclamar, a missão pode avançar mesmo com resultado inferior; não prometa a recompensa máxima.",
      "Espere alguns dias e volte à oficina de Fulvio em Bakbattahl para saber se a escultura está pronta; então retorne ao segundo piso da propriedade de Klark em Vernworth e assista à apresentação."
    ],
    "completion": "A apresentação da escultura conclui a missão. Fontes descrevem 7.000 G no pior resultado, 14.000 G em desenho prolongado e 18.500 G com petrificação; os valores e a condição intermediária divergem entre walkthroughs e não foram testados nesta build.",
    "references": [
      "https://www.powerpyx.com/dragons-dogma-2-a-case-of-sculptors-block-walkthrough/",
      "https://www.neoseeker.com/dragons-dogma-2/guides/A_Case_of_Sculptors_Block",
      "https://game8.co/games/Dragons-Dogma-2/archives/A-Case-of-Sculptors-Block",
      "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
    ]
  },
  {
    "id": "noble_exchange",
    "title": "Uma Nobre Troca",
    "original": "A Noble Exchange",
    "region": "Vernworth — Salão de Máscaras do Castelo, durante um baile noturno",
    "giver": "Nobre mascarado que oferece o Paragon Staff no Salão de Máscaras",
    "relatedEventIds": [
      "v104"
    ],
    "preparation": [
      "MISSÃO DE ESCOLHA: depois de Correspondência Mascarada e de avançar a história, participe de outro baile à noite. Game8 indica Correspondência Mascarada como pré-requisito; PowerPyx localiza o desbloqueio em uma janela narrativa posterior. Confira se o evento acontece no seu diário.",
      "Vá com vestes cortesãs e máscara de baile, como em O Trono Roubado. Receber o Paragon Staff é parte do evento, NÃO o prêmio certo da missão.",
      "ALERTA DE PERDA: a maneira de lidar com o Paragon Staff afeta a suspeita, o ouro e a oportunidade de comprá-lo mais tarde com Ibrahim. Para manter a opção de compra, DESCARTE o item atrás do biombo do vestiário, não o venda nem o entregue a NPC aleatório.",
      "Guia PowerPyx simplifica a rota de 7.500 G como apenas prender o ladrão; Neoseeker acrescenta descarte antes da captura para evitar o comprometimento pelo bastão. A sequência descarte + captura é a orientação conservadora, mas não foi testada em save."
    ],
    "steps": [
      "Visite o Salão de Máscaras de Vernworth em noite de baile; se não houver evento, tente outra noite e confira a progressão da missão Correspondência Mascarada.",
      "Fale com o nobre mascarado que apresenta a troca de presentes. Ele coloca o Paragon Staff no seu inventário. Lembre de sua aparência, pois ele é o suspeito central.",
      "Circule entre os demais convidados e aceite os presentes automáticos. Não é preciso doar itens próprios para cumprir esta fase.",
      "Aguarde Olven, o guarda, anunciar o roubo do Paragon Staff e avisar que todos serão revistados. Não saia com o bastão em mãos sem escolher o desfecho.",
      "ROTA de maior controle: vá ao vestiário, atrás do biombo, e selecione Descartar no Paragon Staff. Isso impede que o item roubado permaneça no seu inventário durante a inspeção.",
      "Volte ao salão e agarre o mesmo nobre que entregou o bastão; ele confessará o roubo. Neoseeker associa descarte + captura a 7.500 G e possibilidade de comprar o bastão mais tarde; PowerPyx relata 7.500 G ao capturar sem citar descarte prévio.",
      "ALTERNATIVA: apenas descarte o bastão e aceite a revista para terminar sem capturar o ladrão. PowerPyx relata 3.000 G nessa rota, mas Neoseeker descreve variação; não garanta o valor. Após alguns dias, Ibrahim no Posto do Retiro pode vendê-lo por 60.000 G se foi descartado."
    ],
    "completion": "Olven encerra a investigação e a missão termina após a revista ou confissão. A escolha pode afetar a recompensa e a futura venda do Paragon Staff; relatos variam em rotas intermediárias.",
    "references": [
      "https://www.powerpyx.com/dragons-dogma-2-a-noble-exchange-walkthrough/",
      "https://www.neoseeker.com/dragons-dogma-2/guides/A_Nobles_Exchange",
      "https://game8.co/games/Dragons-Dogma-2/archives/A-Noble-Exchange",
      "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
    ]
  },
  {
    "id": "twixt_rock_hard_place",
    "title": "Entre Dois Fogos",
    "original": "'Twixt a Rock and a Hard Place",
    "region": "Bakbattahl → Gruta de Drabnir → Acampamento da Ilha Vulcânica → Local da Escavação",
    "giver": "Akakios, comerciante beastren na borda oeste do Bairro Mercantil de Bakbattahl",
    "relatedEventIds": [
      "b02",
      "p04"
    ],
    "preparation": [
      "CADEIA DE DUAS ENTREGAS: Akakios entrega uma Letter of Request para Ernesto; depois a missão aponta Barbas, no Local da Escavação. Não confunda carta de missão com cartas de Sven ou de Phaesus.",
      "Prepare lanterna, curativos e capacidade de sobrevivência antes de atravessar a Gruta de Drabnir. PowerPyx recomenda nível em torno de 30+ para o trajeto perigoso; não é requisito obrigatório de nível.",
      "RISCO DE NPC AUSENTE: Ernesto costuma enfrentar monstros junto ao portão norte do Acampamento da Ilha Vulcânica. Se ele sumir, verifique se morreu na morgue de Bakbattahl e use uma Wakestone, se necessário.",
      "O título Entre Dois Fogos e os dois objetivos foram comparados ao catálogo Kiranico PT-BR, sem verificação de item_id ou cena no save atual."
    ],
    "steps": [
      "Encontre Akakios no limite oeste do Bairro Mercantil de Bakbattahl. Aceite o pedido e receba a primeira Letter of Request dirigida a Ernesto.",
      "Viaje ao sul/sudoeste de Battahl e atravesse Drabnir’s Grotto para alcançar a Ilha Vulcânica de Agamen; siga para leste até o Acampamento da Ilha Vulcânica.",
      "Procure Ernesto, guerreiro beastren de armadura vermelha, geralmente perto do portão norte e de combates com monstros. Proteja-o antes de iniciar a conversa.",
      "Se Ernesto não estiver na área indicada, procure seu registro na morgue de Bakbattahl. A ressuscitação com Wakestone é uma RECUPERAÇÃO CONDICIONAL se ele estiver morto, não pré-requisito para todos.",
      "Entregue a primeira Letter of Request a Ernesto. Depois da conversa, acompanhe a atualização no diário para a segunda carta destinada a Barbas.",
      "Vá para leste ao Local da Escavação (Excavation Site, região inicial da campanha) e fale com Barbas logo após a entrada, conferindo que a carta atual foi destinada a ele.",
      "Entregue a correspondência a Barbas e confirme a conclusão; os walkthroughs relatam 2.500 XP, 20.000 G e uma Ferrystone COMO RECOMPENSA, não item que você deva carregar."
    ],
    "completion": "As duas entregas — Ernesto e Barbas — ficam registradas no diário. O risco principal é a sobrevivência/localização de Ernesto durante a primeira entrega.",
    "references": [
      "https://www.powerpyx.com/dragons-dogma-2-twixt-a-rock-and-a-hard-place-walkthrough/",
      "https://game8.co/games/Dragons-Dogma-2/archives/Twixt-a-Rock-and-a-Hard-Place",
      "https://www.neoseeker.com/dragons-dogma-2/guides/Twixt_A_Rock_and_a_Hard_Place",
      "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
    ]
  },
  {
    "id": "crossing_shadow",
    "title": "Cruzando às Sombras",
    "original": "Crossing in Shadow",
    "region": "Vernworth — sua casa → cidade à noite → Rose Chateau Bordelrie",
    "giver": "Vera, assistente da imperatriz Nadinia, que procura sua casa à noite",
    "relatedEventIds": [
      "b02"
    ],
    "preparation": [
      "GATILHO POSTERIOR A NADINIA: complete Um Lugar para Chamar de Lar e tenha a própria residência em Vernworth; complete Como uma Vela na Tempestade (A Candle in the Storm) antes de voltar à casa à noite.",
      "ESCOLTA DISCRETA: Vera conduz o percurso, Nadinia está disfarçada e os peões ficam para trás. Não corra muito à frente ou abandone a rota: há relatos de eventos de guardas que deixam de disparar corretamente.",
      "RISCO CRÍTICO: durante a caminhada, um homem procurado pede ajuda porque é perseguido por um soldado. ACEITAR AJUDÁ-LO pode levá-lo à prisão e ENCERRAR a missão. Recuse para preservar a escolta.",
      "No encontro anterior, pagar cerca de 1.000 G ao comerciante pela medicina é ação opcional associada a melhor resultado; GOLD É MOEDA, não objeto de missão para coletar ou falsificar."
    ],
    "steps": [
      "Confirme Um Lugar para Chamar de Lar e Como uma Vela na Tempestade no diário; depois volte à sua residência de Vernworth à noite.",
      "Converse com Vera quando ela aparecer e aceite ajudar a imperatriz Nadinia a viajar incógnita pela capital.",
      "Siga Vera e Nadinia a uma distância curta e sem chamar atenção. Seus peões não acompanham essa escolta.",
      "Em um ponto do caminho, alguém precisa comprar remédio. Se quiser a rota de melhor resultado descrita pelo PowerPyx, fale com o vendedor e pague os 1.000 G, depois volte a seguir Vera.",
      "MAIOR RISCO: um homem abordará você enquanto foge de um soldado. RECUSAR o pedido é a opção segura; aceitá-lo pode provocar prisão imediata e interrupção do objetivo.",
      "Continue atrás de Vera até o Rose Chateau Bordelrie. Evite atacar guardas ou criar aglomeração; espere Nadinia entrar.",
      "Acompanhe a cena final no Rose Chateau e confira a missão concluída. PowerPyx relata 4.000 XP, 20.000 G e um Sunbloom como recompensas."
    ],
    "completion": "Nadinia chega ao Rose Chateau sem identidade exposta e o objetivo de escolta é cumprido. Falha por detenção é um resultado distinto, não conclusão ideal.",
    "references": [
      "https://www.powerpyx.com/dragons-dogma-2-crossing-in-shadow-walkthrough/",
      "https://game8.co/games/Dragons-Dogma-2/archives/Crossing-in-Shadow",
      "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"
    ]
  },
  {
    id: 'hand_that_guides', title: 'A Mão que Guia', original: 'The Hand That Guides',
    region: 'Local da Escavação — prólogo',
    giver: 'Progressão automática durante a fuga do local de trabalho dos peões',
    relatedEventIds: ['m01'],
    preparation: [
      'Missão curta dentro da sequência do prólogo. Não é uma segunda viagem nem uma tarefa que exige retornar ao Local da Escavação.',
      'O catálogo de objetivos EN/PT-BR registra somente defender-se do monstro e fugir. Não há item coletável, falsificação, prazo ou recompensa próprios comprovados para esta ficha.'
    ],
    steps: [
      'Siga a sequência inicial de O Despertar na Prisão no Local da Escavação até a chegada da grande criatura semelhante a uma serpente.',
      'Quando a perturbação começar, assuma a arma disponibilizada pela história e concentre-se em sobreviver ao ataque.',
      'Acompanhe o objetivo do diário “Defenda-se do monstro”; lute apenas enquanto o jogo mantiver essa instrução.',
      'Quando o objetivo mudar para “Fuja para viver”, priorize a fuga pela rota aberta pela sequência, sem insistir em derrotar definitivamente a criatura.',
      'Continue a transição de fuga do prólogo e confira no diário o avanço para A História se Inicia. A luta e a fuga são dois objetivos da mesma missão.'
    ],
    completion: 'A sequência deixa a fase de combate/fuga e o diário avança à missão A História se Inicia. Não é exigida vitória permanente contra a criatura nem um objeto para entregar.',
    references: [
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests',
      'https://dragonsdogma2.kiranico.com/en/data/quests'
    ]
  },
  {
    id: 'one_eyed_interloper', title: 'Intruso de um Olho Só', original: 'One-Eyed Interloper',
    region: 'Vermund — estrada com Gregor em direção a Vernworth',
    giver: 'Progressão automática ao acompanhar Gregor em No Rastro do Dragão',
    relatedEventIds: ['v101'],
    preparation: [
      'Missão principal curta de combate no caminho para a capital. Ela surge ao seguir Gregor; não exige procurar um NPC diferente para aceitá-la.',
      'O deslizamento e a cachoeira podem ser usados na luta. A Missive to the Captain (carta ao capitão) é recebida de Gregor APÓS o combate, não é um item que você precise obter previamente.',
      'Confira o grupo antes de avançar; a criatura bloqueia a estrada. Nenhum prazo ou opção de resultado alternativo foi confirmado no material consultado.'
    ],
    steps: [
      'Em No Rastro do Dragão, acompanhe Gregor rumo a Vernworth até que um ciclope interrompa o caminho.',
      'Se estiver disponível, jogue uma pedra ou barril explosivo na barreira próxima à cachoeira para soltar a água e causar dano ao ciclope. É uma estratégia OPCIONAL, não condição da vitória.',
      'Lute com os aliados de Gregor e seus peões. Para combate corpo a corpo, ataque as pernas por trás e evite os golpes largos do ciclope.',
      'Quando ele se desequilibrar, aproveite para derrubá-lo e concentrar ataques na cabeça; continue até o objetivo “Derrote o ciclope” ser cumprido.',
      'Após a batalha, converse com Gregor e receba a Missive to the Captain (carta ao capitão), conforme o walkthrough; prossiga rumo a Vernworth a pé ou utilizando o transporte disponível.',
      'Confirme o objetivo “Prossiga até Vernworth” para seguir à próxima etapa principal, O Trono do Sobran.'
    ],
    completion: 'O ciclope foi derrotado, a estrada liberada e o avanço a Vernworth está disponível. A carta de Gregor é recebida após a luta; não foi tratada como item de requisito ou falsificação.',
    references: [
      'https://game8.co/games/Dragons-Dogma-2/archives/One-Eyed-Interloper',
      'https://dragonsdogma2.kiranico.com/pt-BR/data/quests',
      'https://dragonsdogma2.kiranico.com/en/data/quests'
    ]
  },
];

/** O índice é editorial e não representa a totalidade das missões do jogo. */
export const questGuidesForEvent = (eventId: string): readonly QuestGuide[] =>
  QUEST_GUIDES.filter(guide => guide.relatedEventIds.includes(eventId));
