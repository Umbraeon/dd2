import { Phase, SphinxRiddle, MaisterSkill, BarbecueMeat, GlossaryTerm } from '../types/roadmap';

export const ROADMAP_METADATA = {
  title: "Dragon’s Dogma 2 — Compêndio PT-BR de Jornada e Conquistas",
  researchDate: "2026-10-11",
  gameSteamAppId: 2054970,
  baseAchievements: 54,
  darkArisenAchievements: 6,
  totalAchievements: 60,
  disclaimer: "Rota comunitária resumida, adaptada de um guia de 2024. Os marcos não representam todas as missões individualmente e nem cada instrução foi validada de forma independente. A expansão Dark Arisen tem seção própria com rotas ainda em verificação.",
  sources: {
    steam_pt: { label: "Steam Conquistas (PT-BR)", url: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian" },
    steam_en: { label: "Steam Achievements (Global)", url: "https://steamcommunity.com/stats/2054970/achievements" },
    route_guide: { label: "Guia Cronológico de Missões (2024)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
    achievement_guide: { label: "Guia Complementar de Conquistas", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3195173063" },
    points_of_no_return: { label: "Game8: Pontos Sem Retorno", url: "https://game8.co/games/Dragons-Dogma-2/archives/447927" },
    sphinx_powerpyx: { label: "PowerPyx: Enigmas da Esfinge", url: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/" },
    maister_skills: { label: "TrueAchievements: 12 Ensinamentos de Mestres", url: "https://www.trueachievements.com/a429012/master-of-the-maisters-achievement" },
    caves_guide: { label: "PowerPyx: 50 Cavernas (Turista)", url: "https://www.powerpyx.com/dragons-dogma-2-all-cave-locations-tourist-trophy/" },
    barbecue_guide: { label: "PlayStationTrophies: 16 Churrascos", url: "https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/the-barbecue-maister.html" },
    phantom_oxcart: { label: "PowerPyx: Carroça Fantasma", url: "https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/" },
    gigantus_guide: { label: "TrueAchievements: Gigantus Rápido", url: "https://www.trueachievements.com/a429009/gigantus-i-hardly-knew-ye-achievement" },
    unmoored_compendium: { label: "Quest Compendium: Mundo Desancorado", url: "https://questcompendium.com/guides/dragon-s-dogma-2/achievements/" },
    reapers_scorn: { label: "TrueAchievements: Desprezo pelo Ceifador", url: "https://www.trueachievements.com/a429033/reapers-scorn-achievement" },
    cyclops_abridged: { label: "TrueAchievements: Ciclopes na Ponte", url: "https://www.trueachievements.com/a429024/cyclops-abridged-achievement" },
    short_sighted: { label: "PowerPyx: Short-Sighted Ambition", url: "https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/" },
    dlc_trueachievements: { label: "TrueAchievements: Dark Arisen DLC", url: "https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen" },
    mapgenie: { label: "MapGenie: Mapa Interativo Geral", url: "https://mapgenie.io/dragons-dogma-2/maps/world" }
  }
};

export const PHASES: Phase[] = [
  {
    id: "melve",
    title: "01 · MELVE",
    subtitle: "Prólogo, Acampamento e Primeira Vila",
    slug: "Melve",
    cue: "Anote o local do primeiro Memento do Buscador que encontrar.",
    events: [
      {
        id: "m01",
        title: "Conclua o Prólogo até alcançar o Posto Avançado da Guarda",
        type: "historia",
        note: "Desperte nas prisões de escavação, escape com a ajuda da esfinge/grifo e chegue ao Posto Avançado de Guarda nas Fronteiras. A memória como Nascen é restaurada.",
        achievements: [1, 2],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "m02",
        title: "Resolva as missões de novatos antes de se afastar do posto",
        type: "missao",
        note: "Priorize 'Provações de um Novo Recruta' (Ordeals of a New Recruit): fale com Phill, ajude Accardo contra as harpias e volte a Phill. A ampulheta no diário indica missão temporizada. Depois faça 'Um Fornecedor em Apuros' (The Provisioner's Plight) com Geoffrey.",
        achievements: [],
        risk: "alerta",
        source: "https://dragonsdogma2.kiranico.com/pt-BR/data/quests",
        extraSources: ["https://www.powerpyx.com/dragons-dogma-2-ordeals-of-a-new-recruit-walkthrough/", "https://game8.co/games/Dragons-Dogma-2/archives/Ordeals-of-a-New-Recruit"],
        failureRisk: "O resgate de Accardo é temporizado. Ajude-o assim que receber a missão e retorne a Phill."
      },
      {
        id: "m03",
        title: "Conheça Beren e prepare a rota de grimórios genuínos",
        type: "missao",
        note: "Converse com Beren no acampamento e encontre Trysha na missão 'Magia Vertiginosa' (Spellbound). Antes de entregar grimórios, reserve pelo menos três originais para Trysha e prepare três falsificações diferentes para Myrddin. O passo a passo está na ficha desta etapa.",
        achievements: [],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992",
        failureRisk: "Antes de entregar os grimórios, preserve originais para Trysha; ela não aceita falsificações para avançar normalmente."
      },
      {
        id: "m04",
        title: "Siga para Melve e conclua as tarefas locais imediatas",
        type: "missao",
        note: "Em Melve, ajude Flora em 'Bravura Revigorante' (Medicament Predicament), entregando o revigorante de frutas. Para 'Problemas Aninhados' (Nesting Troubles), fale com Lennart, jogue barris explosivos no ninho, VOLTE a Lennart, jogue o jarro de veneno no mesmo local e RETORNE a Lennart para encerrar. Ian inicia outra missão, 'A Tímida Bravura dos Irmãos' (Brothers Brave and Timid), para resgatar Norbert.",
        achievements: [],
        risk: "normal",
        source: "https://dragonsdogma2.kiranico.com/pt-BR/data/quests",
        extraSources: ["https://www.powerpyx.com/dragons-dogma-2-nesting-troubles-walkthrough/"]
      },
      {
        id: "m05",
        title: "Execute as ações dos sistemas básicos na exploração inicial",
        type: "conquista",
        note: "Monte um acampamento em uma fogueira, embarque em uma carroça de bois, alterne sua vocação na guilda, use uma Pedra-barca para teletransporte e reviva dois peões caídos de uma só vez.",
        achievements: [4, 5, 6, 7, 8],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "m06",
        title: "Registre o local do primeiro Memento do Buscador",
        type: "alerta",
        note: "Ao coletar seu primeiro Memento do Buscador, anote o local ou tire uma captura de tela. Essa informação será útil no Enigma de Ruminação da Esfinge.",
        achievements: [],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/",
        failureRisk: "Guarde o local do primeiro memento para não precisar procurá-lo novamente durante o enigma."
      }
    ],
    achievements: [
      {
        id: 1,
        category: "História e Finais",
        title: "Primeiro gosto de liberdade",
        original: "First Taste of Freedom",
        tip: "Escape da prisão de escravos no prólogo da campanha. Desbloqueio automático garantido pela história.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/d8b6bfbea2c502f4b595b41d3cabb835c1df7394.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 2,
        category: "História e Finais",
        title: "Nascen",
        original: "Arisen",
        tip: "Avance pela narrativa até recuperar suas lembranças como Nascen no posto avançado.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/67532ad63f9e665fb005a9e94d26ba8786959b0c.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 4,
        category: "Exploração e Combate",
        title: "Armar a Barraca",
        original: "An In-Tents Adventure",
        tip: "Encontre uma fogueira de acampamento em campo aberto, utilize um kit de acampamento no inventário e descanse até o amanhecer ou entardecer.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/eea8e5ef36237d943b969bce539f5a6a8b0ba8c8.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 5,
        category: "Exploração e Combate",
        title: "Uma única velocidade",
        original: "One Speed Only",
        tip: "Aproxime-se de um ponto de carruagem de bois (oxcart), pague a taxa ao cocheiro, sente no banco traseiro e inicie o trajeto.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/cc49ad577eacc109391c660ed58ceb9f1158a240.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 6,
        category: "Vocações e Peões",
        title: "Versátil",
        original: "Versatile",
        tip: "No salão das guildas de vocações (em Melve ou Vernworth), troque sua vocação inicial por qualquer outra que esteja disponível.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/3fd772818b6ff2e5402f24116b61e6054f3c72af.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 7,
        category: "Exploração e Combate",
        title: "A uma pedra de distância",
        original: "Just a Stone's Throw Away",
        tip: "Use uma Pedra-barca (Ferrystone) a partir do seu inventário para se teletransportar até um Cristal de Porto (Portcrystal) já ativado.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/74db14c48390d3ae2c32805acf81affd70b750ec.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 8,
        category: "Vocações e Peões",
        title: "Vão Ficar Aí o Dia Todo?",
        original: "Quit Playing Dead",
        tip: "Em combate, aguarde dois de seus peões caírem próximos um do outro e pressione o botão de reviver no meio de ambos para levantá-los em um único movimento.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/b70fb90b77958c7e37d8461e1f25c54a5654bc67.jpg",
        phase: "melve",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "vernworth1",
    title: "02 · VERNWORTH · PARTE 1",
    subtitle: "A Capital, Guilda, Bairros e Primeiras Missões de Brant",
    slug: "Vernworth pt.1",
    cue: "Antes de concluir 'O Banquete da Farsa' (Feast of Deception), confira as missões secundárias de Vernworth que podem ficar indisponíveis.",
    events: [
      {
        id: "v101",
        title: "Chegue a Vernworth na história principal",
        type: "historia",
        note: "Acompanhe a escolta de carroça ou siga a pé até as portas da capital de Vermund com o Capitão Brant.",
        achievements: [3],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v102",
        title: "Ative a Guilda e inicie missões urbanas prioritárias",
        type: "missao",
        note: "Fale com Klaus na Guilda de Vocações para 'Frustração Vocacional' (Vocation Frustration), entregando a espada de duas mãos e o cajado de arquimago da mina de Trevo. Ajude Glyndwr em 'O Dom do Arco' (Gift of the Bow) com um arco fabricado por humanos.",
        achievements: [],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v103",
        title: "Execute as tarefas dos bairros e dos pobres",
        type: "missao",
        note: "Conclua 'A Caixa Ornamentada' (The Ornate Box): compre a caixa e entregue a Sven ao longo de 3 encontros na praça; depois conclua 'A História sob a Profundez' (The Heel of History) e 'O Magistrado Aprisionado' (The Caged Magistrate) com o Magistrado Waldhar nas celas do castelo.",
        achievements: [],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v104",
        title: "Participe do baile de máscaras com traje nobre",
        type: "conquista",
        note: "Durante a missão de Brant 'O Trono Roubado' (The Stolen Throne), equipe a Túnica da Corte, Calças da Corte e a Máscara do Baile antes de adentrar o salão real à noite.",
        achievements: [12],
        risk: "cuidado",
        source: "https://steamcommunity.com/stats/2054970/achievements",
        failureRisk: "Entrar sem traje de corte fará a guarda atacar e impedirá a conquista nessa tentativa."
      },
      {
        id: "v105",
        title: "Adquira sua própria residência em Vernworth",
        type: "conquista",
        note: "Aceite o pedido de Mildred nos bairros residenciais ('Um Lugar para Chamar de Lar' — A Place to Call Home). Cuide da casa por uma semana no jogo e, ao retorno dela, compre o imóvel por 20.000 moedas de ouro.",
        achievements: [10],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v106",
        title: "Desenvolva o peão principal e afinidade máxima com um NPC",
        type: "conquista",
        note: "Defina uma missão de peão na Fenda, ensine uma Especialização usando um pergaminho e eleve a afinidade de um NPC ao máximo (dando presentes diários que ele aprecie).",
        achievements: [11, 14, 16, 17],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v107",
        title: "Retorne a Melve: Revinda da Calamidade (Readvent of Calamity)",
        type: "alerta",
        note: "Após algumas missões de Brant, retorne a Melve via carroça. Um dragão menor atacará o vilarejo; este é o gatilho da missão crítica de Ulrika e do Lanceiro Místico com Sigurd. NÃO termine O Banquete da Farsa (Feast of Deception) antes de resolver essa cadeia!",
        achievements: [],
        risk: "critico",
        source: "https://game8.co/games/Dragons-Dogma-2/archives/447927"
      }
    ],
    achievements: [
      {
        id: 3,
        category: "História e Finais",
        title: "Trono do Substituto",
        original: "Seat of the Proxy",
        tip: "Chegue a Vernworth, a capital do reino de Vermund, progredindo na campanha principal.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/fce6124f01dd857c5e1a8cb77170fcd17dee545d.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 10,
        category: "Atividades e Afinidade",
        title: "Lar, Doce Lar",
        original: "A House? In This Economy?",
        tip: "Compre uma casa própria em Vernworth por 20.000 de ouro de Mildred ou em Bakbattahl por 30.000.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/301624b7e7dfea44e7bf84354f12ca54a898ffaa.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 11,
        category: "Vocações e Peões",
        title: "Desejo feito na fenda",
        original: "Wish upon the Rift",
        tip: "Interaja com uma Pedra da Fenda principal e defina uma missão para o seu peão principal (ex.: matar monstros ou entregar um item em troca de ouro).",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/ca5bb6477abecd02b97be8eb1585f2259c871412.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 12,
        category: "História e Finais",
        title: "Noite da nobreza",
        original: "Nobles' Night Out",
        tip: "Compareça ao baile de máscaras no castelo vestido formalmente com a túnica, calças da corte e máscara durante a missão O Trono Roubado (The Stolen Throne).",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/a217af141dfbed605e58d8e6d7488d3e6e6bb1dd.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 14,
        category: "Vocações e Peões",
        title: "Um peão de muitos talentos",
        original: "A Pawn of Many Talents",
        tip: "Ensine uma especialização ao peão principal usando um pergaminho obtido de missões ou afinidade com NPCs (ex.: Cirurgião de Flora ou Colecionador).",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/70dfdb5ea086a82bfeaab3b7ba1066c5ccaaf49f.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 16,
        category: "Vocações e Peões",
        title: "Especialista",
        original: "The Specialist",
        tip: "Alcance o ranque máximo (ranque 9) em qualquer uma das vocações disponíveis derrotando inimigos enquanto atua na classe.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/7897657f4723760988cfe0b347a1ca6dce202306.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 17,
        category: "Atividades e Afinidade",
        title: "Além da afinidade",
        original: "Affinity and Beyond",
        tip: "Alcance o nível máximo de afeição com qualquer NPC (as bochechas dele ficarão rosadas e ele deixará presentes na porta da sua casa).",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/9f0a5693684798ee5615ff6666e7102adbac7355.jpg",
        phase: "vernworth1",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "vernworth2",
    title: "03 · VERNWORTH · PARTE 2",
    subtitle: "Campo de Batalha Antigo, Ponte de Ciclope e Primeira Fase da Esfinge",
    slug: "Vernworth pt.2",
    cue: "Antes dos enigmas da Esfinge, confira suas opções de salvamento e prepare cada resposta.",
    events: [
      {
        id: "v201",
        title: "Avance pela Vila Sem Nome e Aldeia de Harve",
        type: "missao",
        note: "Explore Harve para resgatar soldados sauros ('Elimine os Monstros' — Monster Culling) e siga até a Vila Sem Nome ('O Vilarejo sem Nome' — The Nameless Village) para obter as habilidades iniciais do Ladrão com Flaude e Srail.",
        achievements: [],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v202",
        title: "Acompanhe Ulrika em Melve e Harve ('Revinda da Calamidade' — Readvent of Calamity)",
        type: "missao",
        note: "Depois do ataque do dragão em Melve, fale com Ulrika. Quando ela fugir, encontre-a em Harve ('As Mãos Atadas que Abraçam a Causa' — Trouble on the Cape). Defenda os moradores dos sauros e acompanhe a nomeação dela como líder.",
        achievements: [],
        risk: "critico",
        source: "https://game8.co/games/Dragons-Dogma-2/archives/447927",
        failureRisk: "Conclua a história de Ulrika em Melve e Harve antes de avançar a coroação."
      },
      {
        id: "v203",
        title: "Resgate Gregor no Pântano ('Até que a Morte Nos Separe' — Till Death Do Us Part)",
        type: "missao",
        note: "Ouça os rumores sobre a trama de Ludolph contra Gregor em Vernworth. Corra até os pântanos enevoados no noroeste para salvar Gregor do Dullahan (Cavaleiro Sem Cabeça) antes que ele morra.",
        achievements: [],
        risk: "alerta",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992",
        failureRisk: "Resgate Gregor assim que receber a missão. Adiar pode impedir o desfecho desejado."
      },
      {
        id: "v204",
        title: "Tente a ponte improvisada com ciclope no vão do desfiladeiro",
        type: "conquista",
        note: "No caminho para o Campo de Batalha Antigo (ou próximo à cachoeira), ataque as pernas de um ciclope para que ele tropece e caia sobre um abismo. Atravesse correndo pelo corpo dele enquanto ele ainda estiver vivo!",
        achievements: [42],
        risk: "cuidado",
        source: "https://www.trueachievements.com/a429024/cyclops-abridged-achievement",
        failureRisk: "Se seus peões matarem o ciclope antes de você atravessar, a conquista não contará. Considere colocá-los no modo 'Esperar' ou dispensá-los temporariamente."
      },
      {
        id: "v205",
        title: "Chegue ao Santuário da Montanha e resolva os 5 enigmas da Esfinge",
        type: "alerta",
        note: "No Santuário da Montanha, resolva os enigmas dos Olhos, Loucura, Sabedoria, Convicção e Ruminação. Este último pede o Memento do Descobridor no lugar de seu primeiro Memento do Buscador, em até sete dias no jogo.",
        achievements: [39],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/",
        failureRisk: "Confira cada resposta antes de entregá-la. Se errar um enigma, não poderá obter a recompensa daquele desafio nesta campanha."
      },
      {
        id: "v206",
        title: "Coordene a troca de grimórios genuínos e falsos",
        type: "missao",
        note: "Trysha ('Magia Vertiginosa' — Spellbound) exige grimórios autênticos; Myrddin ('O Julgamento do Feiticeiro' — The Sorcerer's Appraisal) aceita versões falsificadas feitas por Ibrahim. Separe três originais para Trysha e três falsificações diferentes para Myrddin. Veja a lista de livros e os destinos na aba Guias e cópias.",
        achievements: [],
        risk: "cuidado",
        source: "https://www.trueachievements.com/a429012/master-of-the-maisters-achievement"
      }
    ],
    achievements: [
      {
        id: 42,
        category: "Exploração e Combate",
        title: "Ciclopes na ponte",
        original: "Cyclops Abridged",
        tip: "Derrube um ciclope vivo sobre uma fenda para criar uma ponte improvisada e caminhe/corra pelas costas dele antes que ele consiga se levantar.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/4368f57d54ee0bb6b8eaf26f4025c04c538ecfd3.jpg",
        phase: "vernworth2",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "vernworth3",
    title: "04 · VERNWORTH · PARTE 3",
    subtitle: "Wilhelmina, Tramas da Corte e Ponto de Não Retorno da Coroação",
    slug: "Vernworth pt.3",
    cue: "Antes de avançar 'O Banquete da Farsa' (Feast of Deception), confira as missões pendentes de Vermund.",
    events: [
      {
        id: "v301",
        title: "Conclua as investigações de conspiração no castelo",
        type: "missao",
        note: "Termine 'O Plano de Disa' (Disa's Plot), investigando o escritório da rainha regente; 'Uma Sombra à Espreita' (The Arisen's Shadow), capturando Bermudo nas ruas de Vernworth e optando por poupá-lo ou prendê-lo; e as tarefas de Sven.",
        achievements: [],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "v302",
        title: "Prepare a missão de Wilhelmina e cumpra seu prazo quando disponível",
        type: "alerta",
        note: "Conheça Wilhelmina durante a história e desenvolva afinidade. Os walkthroughs divergem sobre o momento exato de ativar 'As Rosas Têm Espinhos' (Every Rose Has Its Thorn), mas vários a situam após 'O Banquete da Farsa' (Feast of Deception); NÃO exija concluí-la antes da coroação. Assim que ela pedir ajuda, reúna as evidências em até três dias, conforme o diário localizado.",
        achievements: [],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/",
        extraSources: ["https://www.neoseeker.com/dragons-dogma-2/guides/Every_Rose_Has_Its_Thorn", "https://dragonsdogma2.kiranico.com/pt-BR/data/quests"],
        failureRisk: "Depois de aceitar ajudar Wilhelmina, reúna as provas dentro de três dias."
      },
      {
        id: "v303",
        title: "Confira as missões pendentes antes da coroação",
        type: "checkpoint",
        note: "PARE antes de concluir 'O Banquete da Farsa' (Feast of Deception) com Brant. Termine a linha de Ulrika em Melve e Harve ('Revinda da Calamidade' — Readvent of Calamity, entre outras missões); confira as missões de Ian, Lennart, Sven ('A Caixa Ornamentada' — The Ornate Box) e Klaus ('Frustração Vocacional' — Vocation Frustration). Algumas deixam de poder ser INICIADAS, mas isso não prova que toda missão ABERTA falhe ao aceitar a coroação. 'As Rosas Têm Espinhos', de Wilhelmina, pode surgir após essa etapa: volte a procurá-la cedo. Antes de avançar, confira os tipos de salvamento da sua versão; pousada não é sinônimo de salvamento manual intermediário.",
        achievements: [],
        risk: "critico",
        source: "https://game8.co/games/Dragons-Dogma-2/archives/447927",
        extraSources: ["https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/", "https://steamcommunity.com/app/2054970/discussions/0/4352240417148094670/?ctp=2"],
        failureRisk: "Antes da coroação, confira as missões de Vermund que ainda pretende concluir."
      },
      {
        id: "v304",
        title: "Realize a Coroação e receba a autorização para Battahl",
        type: "historia",
        note: "Conclua 'O Banquete da Farsa' (Feast of Deception). Brant libera a sequência para Battahl ('Nação da Chama Luzente' — Nation of the Lambent Flame). Antes de sair por muito tempo de Vernworth, procure Wilhelmina no Rose Chateau Bordelrie: guias situam aqui uma oportunidade de ativar 'As Rosas Têm Espinhos'. Se ela pedir ajuda, priorize o prazo de três dias para reunir provas; afinidade e gatilhos narrativos podem influenciar. Depois prossiga para o Posto de Controle da Fronteira.",
        achievements: [],
        risk: "normal",
        source: "https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/",
        extraSources: ["https://www.neoseeker.com/dragons-dogma-2/guides/Every_Rose_Has_Its_Thorn"]
      }
    ],
    achievements: []
  },
  {
    id: "battahl",
    title: "05 · BATTAHL",
    subtitle: "Deserto de Bakbattahl, Carroça Fantasma, Medusa e 2ª Fase da Esfinge",
    slug: "Battahl",
    cue: "Entrar na Carroça Fantasma exige ficar sem armas e armaduras. Conclua os 5 enigmas finais da Esfinge e mate-a antes que fuja!",
    events: [
      {
        id: "b01",
        title: "Atravesse a fronteira (normal e clandestinamente)",
        type: "conquista",
        note: "Para a conquista 'Tô Dentro!', pegue carona escondido dentro de uma carruagem nobre que cruza o portão fechado sem exibir permissão (salve antes para não gerar hostilidade). Depois use sua permissão oficial para 'Através da fronteira'.",
        achievements: [13, 35],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "b02",
        title: "Execute as missões locais de Bakbattahl",
        type: "missao",
        note: "Progrida 'Piedade entre Ladrões' (Mercy among Thieves), no esconderijo dos Ladrões de Coral com Hugo; 'Orações Ensombradas' (Shadowed Prayers), para capturar o assassino da imperatriz Nadinia; e 'Uma Proposta Venenosa' (A Poisonous Proposal).",
        achievements: [],
        risk: "alerta",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "b03",
        title: "Proteja a família de Isaac em 'Ambição Cega' (Short-Sighted Ambition)",
        type: "checkpoint",
        note: "Isaac pede o segundo tomo 'On the Transference of Souls 2'. Vá ao Ibrahim na Fronteira e crie a falsificação 'On the Transit of Souls 2'. Entregue APENAS a falsificação para que o experimento falhe inofensivamente e a esposa e filha de Isaac sobrevivam!",
        achievements: [],
        risk: "cuidado",
        source: "https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/",
        failureRisk: "Entregar o tomo original mata a esposa e a filha de Isaac em uma explosão horrível."
      },
      {
        id: "b04",
        title: "Desbloqueie o Lanceiro Místico e o Ilusionista",
        type: "conquista",
        note: "Fale com Sigurd se ainda não o encontrou em Melve e visite o Santuário Reverente no deserto para falar com o espírito de Luz e destravar Ilusionista.",
        achievements: [18, 24],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "b05",
        title: "Infiltre-se em 'A Carroça Fantasma' (The Phantom Oxcart)",
        type: "alerta",
        note: "À noite perto de Vernworth, após ouvir rumores, aguarde a carroça fantasma. DESEQUIPE TODAS AS ARMAS E ARMADURAS, aproxime-se do cocheiro, converse e ENTRE dentro da carroça. Não reaja quando os guardas baterem nos peões até cruzar o portão de Battahl!",
        achievements: [33],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/",
        failureRisk: "Apenas seguir a carroça a pé ou atacar o cocheiro invalida a conquista 'Já Chegamos?'."
      },
      {
        id: "b06",
        title: "Segunda localização da Esfinge: 4 enigmas em ordem variável",
        type: "alerta",
        note: "No Santuário da Fronteira (Frontier Shrine), a Esfinge apresentará 4 enigmas em ordem aleatória: Memória (conte os baús abertos e empilhe estátuas), Competição (use o anel fraco e jogue o inimigo do precipício), Diferenciação (traga Dante ou Vergil conforme o cabelo pedido) e Futilidade (entregue o vaso ou use a Sealing Phial/Ferrystone para trazer o NPC até ele!).",
        achievements: [39],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/",
        failureRisk: "Antes de responder à Memória, conte os baús desbloqueados. Na Futilidade, prefira levar Maurits até o vaso."
      },
      {
        id: "b062",
        title: "Derrote a Esfinge e obtenha a Pedra de Despertar Eterna",
        type: "conquista",
        note: "Antes do último enigma, esteja de Arqueiro e tenha a Flecha da Ruína (Unmaking Arrow). Quando a Esfinge tentar partir, inicie o combate, use a flecha, pegue a Chave da Sabedoria e abra o baú dourado.",
        achievements: [51],
        risk: "critico",
        source: "https://www.trueachievements.com/a429033/reapers-scorn-achievement"
      },
      {
        id: "b063",
        title: "Derrote a Medusa e obtenha uma Cabeça Preservada",
        type: "conquista",
        note: "No covil da Medusa (Nera-Do Cavern), use a vocação de Ladrão com adagas de raio ou golpe pesado na cabeça enquanto ela estiver atordoada para decapitá-la na primeira barra de vida. Guarde a cabeça preservada imediatamente no baú para não estragar e use-a para petrificar outra Medusa.",
        achievements: [38, 48, 53],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3195173063"
      },
      {
        id: "b07",
        title: "Explore cavernas até totalizar 50 para 'Turista'",
        type: "conquista",
        note: "O troféu exige descobrir e entrar em 50 CAVERNAS/MASMORRAS distintas, não meros pontos de interesse. Consulte o registro no diário de aventura.",
        achievements: [46],
        risk: "cuidado",
        source: "https://www.powerpyx.com/dragons-dogma-2-all-cave-locations-tourist-trophy/"
      }
    ],
    achievements: [
      {
        id: 13,
        category: "História e Finais",
        title: "Através da fronteira",
        original: "Across the Border",
        tip: "Atravesse o grande portão do Posto de Controle da Fronteira no caminho para Battahl usando a permissão legal.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/e0e2aab300eb80f65166c61afc14b344b6dbab33.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 18,
        category: "Vocações e Peões",
        title: "Destinos Duplos",
        original: "Duo Destinies",
        tip: "Desbloqueie a vocação Lanceiro Místico (Mystic Spearhand) conversando com Sigurd em Melve ou na Torre do Sopro do Dragão.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/831a4e1e28bbf38ca0475f722b271d3ce7e2d2b6.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 24,
        category: "Vocações e Peões",
        title: "Ilusionista por Natureza",
        original: "Trickster of the Trade",
        tip: "Desbloqueie a vocação Ilusionista (Trickster) conversando com o oráculo Luz no Santuário Reverente no caminho de Battahl.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/fe621bf3ab2dc643ffa68e129636c5d752c147c3.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 33,
        category: "Desafios Perdíveis",
        title: "Já Chegamos?",
        original: "Are We There Yet?",
        tip: "Durante 'A Carroça Fantasma' (The Phantom Oxcart), retire armas e roupas, fale com o cocheiro disfarçado de peão e ENTRE na carroça. Apenas seguir a pé não desbloqueia a conquista.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/f298893741bd5f1ac1eab6159ff96ab27163def3.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 35,
        category: "História e Finais",
        title: "Tô Dentro!",
        original: "I'm In",
        tip: "Passe pelo portão do Posto da Fronteira sem permissão, escondido dentro da carruagem real que o atravessa. Faça backup na pousada antes.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/5c5c3d9a43d1c77492b6a9f8f7adc128ce046efe.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 38,
        category: "Exploração e Combate",
        title: "Cabeças rolando!",
        original: "Off with Its Head!",
        tip: "Decapite uma Medusa viva em combate direcionando ataques cortantes ao pescoço.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/63caf516121513f946c03d12d9a38fb36bf94e76.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 39,
        category: "Desafios Perdíveis",
        title: "Marcas completas",
        original: "Full Marks",
        tip: "Resolva todos os 10 enigmas da Esfinge (5 no Santuário da Montanha e 5 no Santuário da Fronteira, incluindo Ruminação e os 4 aleatórios).",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/49604ea8d56fbe2ce564e771efc006fbc0ed2b34.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 46,
        category: "Exploração e Combate",
        title: "Turista",
        original: "The Tourist",
        tip: "Descubra e adentre 50 cavernas ou masmorras diferentes (não apenas marcos geográficos comuns). Acompanhe a contagem no histórico do jogo.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/1e0dc75a1e0aa030b537291f15bcc5925eba1c2d.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.powerpyx.com/dragons-dogma-2-all-cave-locations-tourist-trophy/"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 48,
        category: "Exploração e Combate",
        title: "Cabeça no lugar",
        original: "Getting a Head",
        tip: "Obtenha uma Cabeça de Medusa Preservada. Corte o pescoço da criatura antes que a primeira barra de vida acabe e guarde-a imediatamente no armazém para evitar decomposição.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/326953b76883beef91e4c3a252469829e467866d.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 51,
        category: "Desafios Perdíveis",
        title: "Desprezo pelo ceifador",
        original: "Reaper's Scorn",
        tip: "Utilize uma Pedra de Despertar Eterna (obtida derrotando a Esfinge e abrindo o baú de ouro) para ressuscitar simultaneamente duas ou mais pessoas em um necrotério.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/4fa9771d1dfc35d6d384e4b5b24a0571ce8413a1.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.trueachievements.com/a429033/reapers-scorn-achievement"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 53,
        category: "Exploração e Combate",
        title: "Olho por olho",
        original: "An Eye for an Eye",
        tip: "Equipe e aponte uma Cabeça de Medusa Preservada em direção a uma Medusa viva para petrificá-la instantaneamente.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/4d8411af17f7f00742d9595cbf0d725346ad5b7f.jpg",
        phase: "battahl",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "volcanic",
    title: "06 · ILHA VULCÂNICA",
    subtitle: "Gruta de Drabnir, Acampamento das Termas, Arqueiro Mágico e Chefe de Guerra",
    slug: "Volcanic Island",
    cue: "Leve 3 licores de lagarto (Newt Liqueur) para Lamond nas termas e ajude Gautstafr com suas dores na coluna.",
    events: [
      {
        id: "i01",
        title: "Atravesse a Gruta de Drabnir para a Ilha Vulcânica",
        type: "conquista",
        note: "Desça pelo sul de Battahl e cruze a caverna escura da Gruta de Drabnir para alcançar a Ilha Vulcânica de Agamen sem depender do portão trancado do Palácio de Spellseal.",
        achievements: [19, 20],
        risk: "normal",
        source: "https://steamcommunity.com/stats/2054970/achievements"
      },
      {
        id: "i02",
        title: "Suba até a Torre do Sopro do Dragão (Dragonsbreath Tower)",
        type: "conquista",
        note: "Suba o cume no sudoeste de Battahl / entrada da ilha para encontrar a torre de nidificação dos dragões e reencontrar Sigurd.",
        achievements: [22],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "i03",
        title: "Desbloqueie Arqueiro Mágico com Cliodhna e Gautstafr",
        type: "conquista",
        note: "Ajude o anão Gautstafr na estrada pegando 3 flores de ervas e escoltando-o até as termas do acampamento na missão 'A Fonte do Contentamento' (Put a Spring in Thy Step). Sua esposa Cliodhna desbloqueia Arqueiro Mágico.",
        achievements: [23],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "i04",
        title: "Tome um banho nas fontes termais do acampamento",
        type: "conquista",
        note: "Pague a taxa e entre nas águas termais do Acampamento da Ilha Vulcânica para curar cicatrizes e recuperar o vigor.",
        achievements: [21],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "i05",
        title: "Entregue 3 Licores de Lagarto a Lamond para Chefe de Guerra",
        type: "conquista",
        note: "Lamond está sentado na entrada das termas ('O Sábio Beberrão' — The Sotted Sage). Entregue 3 garrafas de Newt Liqueur (feitas combinando Fruit Wine com Saurian Tail ou compradas no Higgs' Tavern Stand) para desbloquear a vocação Warfarer.",
        achievements: [26],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "i06",
        title: "Resolva as missões de forja e afeto da ilha",
        type: "missao",
        note: "Complete 'Vontade Resistente, Forja Ardente' (Steeled Resolve, Blazing Forge) com Sara e Brokkr para destravar a melhor forja de estilo anão do jogo.",
        achievements: [],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      }
    ],
    achievements: [
      {
        id: 19,
        category: "História e Finais",
        title: "Onde Tudo Começou...",
        original: "Back Where It All Began",
        tip: "Retorne à Ilha Vulcânica de Agamen, o local onde o Nascen trabalhou inicialmente como prisioneiro nas escavações.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/2d52e9c2c8a6e1cd9e12e0a6487320dc23d8a9d7.jpg",
        phase: "volcanic",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 20,
        category: "Exploração e Combate",
        title: "Espero que tenha trazido lanterna",
        original: "Hope You Brought a Lantern",
        tip: "Atravesse a Gruta de Drabnir no sul de Battahl para alcançar a Ilha Vulcânica.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/1b950e20b12df90137acc4d857542d9916c30ce0.jpg",
        phase: "volcanic",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 21,
        category: "Atividades e Afinidade",
        title: "Isto curará suas feridas",
        original: "This'll Cure What Ails Ye",
        tip: "Mergulhe nas fontes termais públicas do Acampamento da Ilha Vulcânica de Agamen.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/1f1092ccb581ac3b0537fc4cdda49f1e150a4aa3.jpg",
        phase: "volcanic",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 22,
        category: "História e Finais",
        title: "Poleiro do dragão",
        original: "Roost of the Dragon",
        tip: "Suba e alcance o topo da Torre do Sopro do Dragão (Dragonsbreath Tower).",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/b15db869aa7a6b221322dd894cd779df2a967fb4.jpg",
        phase: "volcanic",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 23,
        category: "Vocações e Peões",
        title: "Flechas e Entoações",
        original: "Arrows and Incantations",
        tip: "Desbloqueie a vocação Arqueiro Mágico (Magick Archer) concluindo a escolta de Gautstafr e falando com Cliodhna na Ilha Vulcânica.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/4911de91fbb1e628a60b3964cdf6b00bcbe10cc6.jpg",
        phase: "volcanic",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 26,
        category: "Vocações e Peões",
        title: "Nascen Para Toda Obra",
        original: "Jack of All Trades, Master of...All Trades",
        tip: "Desbloqueie a vocação Chefe de Guerra (Warfarer) entregando 3 Licores de Lagarto para Lamond nas fontes termais.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/57518c39c6acb0a164e7237831a58ede104cc2c4.jpg",
        phase: "volcanic",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "preend",
    title: "07 · CHECAGEM ANTES DO FINAL / GIGANTUS",
    subtitle: "Varredura 100%, 16 Churrascos, 12 Mestres, 80 Mementos e Derrota do Colosso",
    slug: "Antes do final",
    cue: "Antes do Gigantus, confira as tarefas opcionais, os ensinamentos de mestres e as conquistas que deseja concluir.",
    events: [
      {
        id: "p01",
        title: "Checklist de conquistas cumulativas e combate",
        type: "conquista",
        note: "Complete ações pendentes: voar com harpia via sinalizador, voar nas asas do grifo uma 2ª vez, recuperar item de saqueador que te roubou, conseguir uma insígnia de peão e ressuscitar um defunto no necrotério.",
        achievements: [9, 15, 25, 27, 29, 30, 32, 34, 45, 47, 49, 54],
        risk: "normal",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "p02",
        title: "Conclua os 16 preparos do Mestre do Churrasco (The Barbecue-Maister)",
        type: "conquista",
        note: "Asse cada um dos 8 tipos de carne uma vez de DIA e uma vez à NOITE no acampamento (total de 16 cenas gravadas em vídeo real). Use a matriz 8×2 deste guia para marcar cada uma!",
        achievements: [52],
        risk: "cuidado",
        source: "https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/the-barbecue-maister.html"
      },
      {
        id: "p03",
        title: "Aprenda TODOS os 12 ensinamentos de maestria (Mestre dos Mestres)",
        type: "alerta",
        note: "São 10 vocações, mas 12 ensinamentos a APRENDER (usar o pergaminho no inventário!). Ladrão possui 2 (Flaude e Srail) e Feiticeiro possui 2 (Trysha e Myrddin). Não basta guardá-los no baú!",
        achievements: [50],
        risk: "critico",
        source: "https://www.trueachievements.com/a429012/master-of-the-maisters-achievement"
      },
      {
        id: "p04",
        title: "Prepare-se antes do confronto com Gigantus",
        type: "checkpoint",
        note: "Antes de avançar 'Um Novo Chamado Divino' (A New Godsway) e a rota de 'O Guardião Gigantus' (The Guardian Gigantus), revise as missões pendentes. A atualização 3.2 distingue salvamento automático, intermediário e último descanso na pousada. Confira o registro disponível antes de seguir.",
        achievements: [],
        risk: "critico",
        source: "https://www.pushsquare.com/news/2026/09/colossal-game-changing-dragons-dogma-2-patch-3-2-out-now-on-ps5",
        extraSources: ["https://www.gamespot.com/gallery/dragons-dogma-2-gigantus-achievement-guide/2900-5209/"]
      },
      {
        id: "p05",
        title: "Derrote o Gigantus rapidamente ('Gigantus, nem sei quem é')",
        type: "conquista",
        note: "Para deter Gigantus rapidamente, prepare-se antes da marcha e ataque seus cristais com balistas, flechas ou Flecha da Ruína (Unmaking Arrow).",
        achievements: [44],
        risk: "critico",
        source: "https://www.gamespot.com/gallery/dragons-dogma-2-gigantus-achievement-guide/2900-5209/",
        extraSources: ["https://www.trueachievements.com/a429009/gigantus-i-hardly-knew-ye-achievement"],
        failureRisk: "Para buscar a conquista, detenha Gigantus antes que ele conclua sua marcha."
      },
      {
        id: "p06",
        title: "Suba a Torre do Luar (Moonglint Tower) até o confronto",
        type: "historia",
        note: "Confira as missões pendentes antes de avançar 'Um Novo Chamado Divino' (A New Godsway). Depois, siga para a Torre do Luar e o confronto com Phaesus e o Dragão.",
        achievements: [],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/"
      }
    ],
    achievements: [
      {
        id: 9,
        category: "História e Finais",
        title: "Prazeres do Myrmecoleão",
        original: "Myrmecoleon Delights",
        tip: "Entre no bordel Rose Chateau Bordelrie nos nobres de Vernworth. A descrição oficial exige apenas entrar nas dependências.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/179831dabbbc836240d879c3e0f0577579bb6892.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 15,
        category: "Atividades e Afinidade",
        title: "O Salvador",
        original: "The Savior",
        tip: "Use uma Pedra de Despertar para reviver uma pessoa morta no mundo ou no necrotério.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/cea826b9a4c8c3ec354d22e570284dbdecfebcea.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 25,
        category: "Exploração e Combate",
        title: "Antes do alvorecer",
        original: "Before Dawn Breaks",
        tip: "Derrote um Dullahan (Cavaleiro Sem Cabeça). Encontro garantido durante a missão Até que a Morte nos Separe ou à noite em florestas densas.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/737f80232be7050eda583b2bc34867a09f00ed3e.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 27,
        category: "Exploração e Combate",
        title: "Repetição grífica",
        original: "The Regriffining",
        tip: "A descrição oficial pede voar nas asas de um grifo UMA SEGUNDA VEZ. Suba nas costas do grifo e segure firme até que ele decole e pouse no ninho.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/30f99e22f59c37b338cada930d5b936fd0661ea4.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 29,
        category: "Exploração e Combate",
        title: "Forja dracônica",
        original: "Dragon Forged",
        tip: "Leve Cristais da Vida da Serpe (WLC) ao Forjado pelo Dragão (Dragonforged) e forje o aprimoramento dracônico de ranque 4 em uma arma ou armadura.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/6446a625d81c55fdfa8c03ffd699df5559cc2ecc.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 30,
        category: "Exploração e Combate",
        title: "Os espólios vão para o vencedor",
        original: "To the Victor Go the Spoils",
        tip: "Durante um combate contra ladrões/saqueadores, deixe um deles roubar um item seu e então mate-o imediatamente para reaver o espólio.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/4c92468f5df2eee212671acd466e034bccb8d1c5.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 32,
        category: "Vocações e Peões",
        title: "Medalha de honra",
        original: "A Badge of Honor",
        tip: "Conquiste qualquer Insígnia de Peão (Pawn Badge) derrotando monstros da meta do peão (ex.: matar 30 ciclopes ou grifos com ele).",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/f6e090c3a6a02cda519f0f2a4d8721f1a78a97c2.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 34,
        category: "Atividades e Afinidade",
        title: "Você não Morre tão Cedo",
        original: "Thought I'd Lost You",
        tip: "Vá ao necrotério em Vernworth ou Bakbattahl, encontre um corpo de NPC no caixão e use uma Pedra de Despertar para ressuscitá-lo.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/72e34e01494c86653b5fb359cf4a8bcd31061788.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 44,
        category: "História e Finais",
        title: "Gigantus, nem sei quem é",
        original: "Gigantus, I Hardly Knew Ye",
        tip: "Na missão 'O Guardião Gigantus' (The Guardian Gigantus), destrua rapidamente todos os pontos fracos do colosso antes que ele alcance o ponto final de sua caminhada. Antes da marcha, confira quais tipos de salvamento ainda são recuperáveis na sua versão; o descanso na pousada pode atualizar o registro da pousada.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/37ca1039d5c0f50beb3fb75665ed98a0daa806f6.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.trueachievements.com/a429009/gigantus-i-hardly-knew-ye-achievement"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 45,
        category: "Exploração e Combate",
        title: "Viagem de harpia",
        original: "Harpy Joyride",
        tip: "Acenda um Sinalizador de Harpia (Harpysnare Smoke Beacon), espere uma harpia descer atraída pela fumaça e agarre-se nas garras dela para voar alto.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/c8195be7d2bb4face6c7ed45f0bc5b73d56aaad1.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 47,
        category: "Exploração e Combate",
        title: "Especialista em coleta",
        original: "The Collector",
        tip: "Colete 80 Mementos do Buscador (Seeker's Tokens) espalhados pelo mundo e entregue-os na Guilda de Vocações.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/4783867055108df85989ad91438ffc384ad1cbc0.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 49,
        category: "Atividades e Afinidade",
        title: "Mestre da filantropia",
        original: "The Philanthropist",
        tip: "Conquiste a afeição máxima de pelo menos 50 pessoas no mundo através de presentes diários e oferecendo rodadas de bebida em tavernas.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/19605037186a177c4a10a3e98f89ffd31b656f42.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 50,
        category: "Vocações e Peões",
        title: "Mestre dos Mestres",
        original: "Master of the Maisters",
        tip: "Obtenha E APRENDA (usar pergaminhos) os 12 ensinamentos de maestria das 10 vocações (Ladrão e Feiticeiro têm 2 mestres cada).",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/f81a6e88d17343787f4bc35578909f5ee612c080.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.trueachievements.com/a429012/master-of-the-maisters-achievement"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 52,
        category: "Desafios Perdíveis",
        title: "Mestre do churrasco",
        original: "The Barbecue-Maister",
        tip: "Asse cada um dos 8 tipos de carne de DIA e à NOITE em fogueiras de acampamento (16 combinações no total). Acompanhe no rastreador do guia.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/cfc9260c1278c9ae0df1319f82980ead6b86cf9c.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/the-barbecue-maister.html"],
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 54,
        category: "Atividades e Afinidade",
        title: "Tem Nascen pra todo mundo",
        original: "Plenty Arisen to Go Round",
        tip: "Faça duas pessoas com afeição máxima se encontrarem na sua casa em Vernworth ou Bakbattahl até começarem uma briga de ciúmes.",
        missable: false,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/01833715162035fd6aecdc9e9a5b88dcff744369.jpg",
        phase: "preend",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "unmoored",
    title: "08 · FINAIS E MUNDO DESANCORADO",
    subtitle: "Final Convencional do Trono, Quebra do Ciclo e Evacuações",
    slug: "Unmoored World",
    cue: "Se quiser buscar os dois finais na mesma campanha, não inicie Novo Jogo+ após obter 'Paz'.",
    events: [
      {
        id: "u01",
        title: "Conquiste o final comum no trono ('Paz')",
        type: "conquista",
        note: "Para o final comum, derrote o Dragão e permaneça no trono durante os créditos para obter 'Paz'. Se também pretende buscar o final verdadeiro na mesma campanha, não inicie Novo Jogo+. Procure o Pioneiro (Pathfinder) no salão para retornar ao voo do Dragão.",
        achievements: [40],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/",
        extraSources: ["https://www.gamespot.com/gallery/dragons-dogma-2-true-ending-unmoored-world-guide/2900-5194/"]
      },
      {
        id: "u02",
        title: "Entre no Mundo Desancorado ('Dogma do Dragão 2')",
        type: "conquista",
        note: "Durante o voo nas costas do Dragão em direção à arena, escale até o coração brilhante sob o peito dele, abra o inventário, selecione a 'Lâmina da Perdição dos Deuses Potencializada' (Empowered Godsbane Blade) e use-a em você mesmo. Ambos cairão no mar sem água.",
        achievements: [28],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/"
      },
      {
        id: "u03",
        title: "Recupere seu Peão Principal no Santuário do Leito Marinho",
        type: "missao",
        note: "Acorde no Santuário do Leito Marinho (Seafloor Shrine). Siga até o local indicado no mapa para reencontrar seu peão e estabelecer a base de refúgio dos sobreviventes.",
        achievements: [],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "u04",
        title: "Conclua as cinco missões de evacuação do Mundo Desancorado",
        type: "conquista",
        note: "Para realizar as CINCO MISSÕES de evacuação de 'Átrios da Primeira Aurora' (Halls of the First Dawn), visite: Vernworth — 'A Determinação do Príncipe Regente' (Sven/Brant); Bakbattahl — 'Instabilidade Civil' (Menella/Nadinia); Jardim Sagrado — 'Raízes Errantes' (Taliesin); Acampamento Vulcânico — 'A Importância de Ajudar Ernesto' (Ernesto); e Local de Escavação — 'Pastor de Peões' (Henrique). Acampamento e escavação são missões distintas.",
        achievements: [36],
        risk: "critico",
        source: "https://dragonsdogma2.kiranico.com/pt-BR/data/quests",
        extraSources: ["https://www.powerpyx.com/dragons-dogma-2-halls-of-the-first-dawn-walkthrough/", "https://game8.co/games/Dragons-Dogma-2/archives/Halls-of-the-First-Dawn"]
      },
      {
        id: "u05",
        title: "Enfrente os feixes de prova sem ativar o feixe final",
        type: "conquista",
        note: "Verifique no mapa os feixes de prova ainda acessíveis, inclusive em Vernworth, Jardim Sagrado e Bakbattahl; algumas resoluções envolvem Talos e dependem do estado da campanha. NÃO confunda a contagem de provas com uma lista fixa de quatro feixes periféricos. O marcador AZUL do Templo Abissal está ligado à evacuação; o feixe VERMELHO FINAL dessa região encerra a sequência. Deixe o feixe final para depois das evacuações, provas e atividades opcionais.",
        achievements: [37],
        risk: "critico",
        source: "https://www.powerpyx.com/dragons-dogma-2-halls-of-the-first-dawn-walkthrough/",
        extraSources: ["https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/", "https://game8.co/games/Dragons-Dogma-2/archives/449759"],
        failureRisk: "Conclua as tarefas pendentes do Mundo Desancorado antes de ativar o feixe vermelho final do Templo Abissal."
      },
      {
        id: "u06",
        title: "Reative o Gigantus no Mundo Desancorado ('Eu, Talos')",
        type: "conquista",
        note: "Na Ilha Vulcânica, aproxime-se dos restos caídos de Talos. Seu peão assumirá o controle do colosso e destruirá as duas monstruosidades que marcham pela praia.",
        achievements: [41],
        risk: "cuidado",
        source: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992"
      },
      {
        id: "u07",
        title: "Compre a lendária espada 'Dogma do Dragão'",
        type: "conquista",
        note: "O Forjado pelo Dragão agora reside no Santuário do Leito Marinho. Compre a espada Dragon's Dogma por 110 Cristais da Vida da Serpe (WLC).",
        achievements: [43],
        risk: "cuidado",
        source: "https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/"
      },
      {
        id: "u08",
        title: "Encerre o ciclo pelo feixe final ('Encerramento')",
        type: "conquista",
        note: "Após derrotar todos os chefes e evacuar todas as capitais, aproxime-se do feixe final no Santuário do Leito Marinho para acionar o clímax e libertar o mundo do ciclo. AVISO: A conquista NÃO é desbloqueada no modo Casual!",
        achievements: [31],
        risk: "critico",
        source: "https://steamcommunity.com/stats/2054970/achievements",
        failureRisk: "Jogar no Modo Casual bloqueia permanentemente a conquista 'Encerramento' nesta campanha."
      }
    ],
    achievements: [
      {
        id: 28,
        category: "História e Finais",
        title: "Dogma do Dragão 2",
        original: "Dragon's Dogma 2",
        tip: "Durante o voo do Dragão nas costas dele, use a Godsbane potencializada no coração para abrir a fenda e ingressar no Mundo Desancorado.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/0af56eabd0de206b85fceb830c1a994ffef1a75c.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 31,
        category: "História e Finais",
        title: "Encerramento",
        original: "Closure",
        tip: "Presencie o fim do Mundo Desancorado interagindo com o feixe de luz final. Conquista bloqueada se você estiver jogando no Modo Casual.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/de4b7c10ff88e7fa5327156c4c4ce5d7c8a841c7.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 36,
        category: "Mundo Desancorado",
        title: "O Guardião",
        original: "The Guardian",
        tip: "Conduza as populações de Vernworth, Bakbattahl, Bosque Sagrado e Ilha Vulcânica com segurança até o Santuário do Leito Marinho no Mundo Desancorado.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/2d568e4f10da9e8132afcf004f1ef0c9106d01c0.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 37,
        category: "Mundo Desancorado",
        title: "O Herói",
        original: "The Hero",
        tip: "Enfrente e supere as ameaças dos feixes de luz vermelha que caem sobre o Mundo Desancorado antes de ativar o feixe final.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/961eb12f26c65977f49bc3339ad924c0553093b4.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 40,
        category: "História e Finais",
        title: "Paz",
        original: "Peace",
        tip: "Derrote o Dragão na arena convencional e assuma o trono de Sovran em Vernworth. Faça este final primeiro antes de ir para o Mundo Desancorado.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/670924457b37f8a6806df0756a18a0bcd9574186.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 41,
        category: "Mundo Desancorado",
        title: "Eu, Talos",
        original: "I, Talos",
        tip: "Reative o Gigantus adormecido na Ilha Vulcânica no Mundo Desancorado e faça-o lutar novamente.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/815f085ca4059eb54899b91bca60d5404e5b0551.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        nameStatus: "Localização oficial PT-BR confirmada"
      },
      {
        id: 43,
        category: "Mundo Desancorado",
        title: "Dogma do Dragão",
        original: "Dragon's Dogma",
        tip: "Compre a arma Dragon's Dogma por 110 Cristais da Vida da Serpe com o Forjado pelo Dragão no Santuário do Leito Marinho.",
        missable: true,
        dlc: false,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/1563812616b88f6ad88e23e1802880ff04845e76.jpg",
        phase: "unmoored",
        validation: "Requisito oficial conferido na Steam PT-BR",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements?l=brazilian",
        sourceExtra: ["https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/"],
        nameStatus: "Localização oficial PT-BR confirmada"
      }
    ]
  },
  {
    id: "dlc",
    title: "09 · DARK ARISEN (EXPANSÃO)",
    subtitle: "Seis conquistas da expansão",
    slug: "Dark Arisen",
    cue: "Seis conquistas adicionais de Dark Arisen.",
    events: [
      {
        id: "d01",
        title: "Consulte as conquistas de Dark Arisen",
        type: "conquista",
        note: "A expansão Dark Arisen acrescenta seis conquistas às 54 do jogo-base. Abra as fichas para consultar os objetivos e marque apenas as conquistas obtidas no jogo.",
        achievements: [55, 56, 57, 58, 59, 60],
        risk: "normal",
        source: "https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/",
        extraSources: ["https://www.thebiglead.com/dragons-dogma-2-dark-arisen-how-to-start/", "https://www.capcom.co.jp/ir/english/news/html/e260610.html", "https://steamcommunity.com/stats/2054970/achievements"]
      }
    ],
    achievements: [
      {
        id: 55,
        category: "Dark Arisen (DLC)",
        title: "Terras Esquecidas do Norte",
        original: "The Forgotten North",
        tip: "Alcance Norgan.",
        missable: false,
        dlc: true,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/38d3cf867cc1d816df4c5e26cda10cb748c230b8.jpg",
        phase: "dlc",
        validation: "Descrição pública da conquista; passo a passo e perdibilidade ainda não testados em jogo",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements",
        sourceExtra: ["https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen", "https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/"],
        nameStatus: "Título PT-BR registrado em listas atuais de conquistas; gatilho não reproduzido"
      },
      {
        id: 56,
        category: "Dark Arisen (DLC)",
        title: "Antagonista do Dogma",
        original: "Dogma Defied",
        tip: "Chegue ao fim da Provação Final (The Final Trial) sem recuperar o medidor de perda de vida.",
        missable: false,
        dlc: true,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/e5480e4d3147e62fa33b0bac572cb3c183e68e3a.jpg",
        phase: "dlc",
        validation: "Descrição pública da conquista; passo a passo e perdibilidade ainda não testados em jogo",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements",
        sourceExtra: ["https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen", "https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/"],
        nameStatus: "Título PT-BR registrado em listas atuais de conquistas; gatilho não reproduzido"
      },
      {
        id: 57,
        category: "Dark Arisen (DLC)",
        title: "Dogma Defendido",
        original: "Dogma Defended",
        tip: "Atenda ao pedido do guardião de Norgan.",
        missable: false,
        dlc: true,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/f73a45653008d60e1e0fa7b788882512c4ffb246.jpg",
        phase: "dlc",
        validation: "Descrição pública da conquista; passo a passo e perdibilidade ainda não testados em jogo",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements",
        sourceExtra: ["https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen", "https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/"],
        nameStatus: "Título PT-BR registrado em listas atuais de conquistas; gatilho não reproduzido"
      },
      {
        id: 58,
        category: "Dark Arisen (DLC)",
        title: "Mestre do Strike",
        original: "Strike!",
        tip: "Destrua cinco barreiras de olhos malignos simultaneamente em um único golpe.",
        missable: false,
        dlc: true,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/622189a1c911b9188379cd45e3725fc49c059599.jpg",
        phase: "dlc",
        validation: "Descrição pública da conquista; passo a passo e perdibilidade ainda não testados em jogo",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements",
        sourceExtra: ["https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen", "https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/"],
        nameStatus: "Título PT-BR registrado em listas atuais de conquistas; gatilho não reproduzido"
      },
      {
        id: 59,
        category: "Dark Arisen (DLC)",
        title: "Reunidos",
        original: "Reunited",
        tip: "Conclua o pedido especial de Eir.",
        missable: false,
        dlc: true,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/e3c64285aeb6bf2249a92516ebe628bf285a0bb9.jpg",
        phase: "dlc",
        validation: "Descrição pública da conquista; passo a passo e perdibilidade ainda não testados em jogo",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements",
        sourceExtra: ["https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen", "https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/"],
        nameStatus: "Título PT-BR registrado em listas atuais de conquistas; gatilho não reproduzido"
      },
      {
        id: 60,
        category: "Dark Arisen (DLC)",
        title: "Abominável Ladrão das Neves",
        original: "Abominable Snowstash",
        tip: "Recupere os itens roubados no covil do Troll das Neves (Snowfoot).",
        missable: false,
        dlc: true,
        icon: "https://shared.fastly.steamstatic.com/community_assets/images/apps/2054970/9665a146ef860935b919937b332bce2127d9e710.jpg",
        phase: "dlc",
        validation: "Descrição pública da conquista; passo a passo e perdibilidade ainda não testados em jogo",
        sourceUrl: "https://steamcommunity.com/stats/2054970/achievements",
        sourceExtra: ["https://www.trueachievements.com/game/Dragons-Dogma-2/dlc/Dark-Arisen", "https://www.exophase.com/game/dragon-s-dogma-2-steam/achievements/pt/"],
        nameStatus: "Título PT-BR registrado em listas atuais de conquistas; gatilho não reproduzido"
      }
    ]
  }
];

export const SPHINX_RIDDLES: SphinxRiddle[] = [
  {
    id: "sphinx_eyes",
    number: 1,
    location: "mountain",
    namePt: "Enigma dos Olhos",
    nameEn: "Riddle of Eyes",
    summary: "Entrar na caverna indicada e recuperar o item de maior valor.",
    solution: "Não vá até o fim da caverna cheia de ogros! O baú correto está escondido logo acima do arco de entrada da caverna. Suba a saliência e abra o baú para pegar o Frasco Selante (Sealing Phial). Entregue-o à Esfinge."
  },
  {
    id: "sphinx_madness",
    number: 2,
    location: "mountain",
    namePt: "Enigma da Loucura",
    nameEn: "Riddle of Madness",
    summary: "Apresentar a pessoa mais amada pelo Nascen sobre o pedestal.",
    solution: "Carregue no colo o seu Peão Principal (ou qualquer NPC com bochechas coradas por afeição alta, como Ulrika) e coloque-o sobre o pedestal em frente à Esfinge antes de falar com ela."
  },
  {
    id: "sphinx_wisdom",
    number: 3,
    location: "mountain",
    namePt: "Enigma da Sabedoria",
    nameEn: "Riddle of Wisdom",
    summary: "Trazer o parente da Esfinge até ela.",
    solution: "Vá a uma Pedra da Fenda, procure um peão oficial criado pela Capcom chamado 'SphinxParent', 'SphinxMother' ou 'SphinxFather' (geralmente nos Peões Oficiais ou filtrando por nome). Contrate-o, leve-o até o pedestal e fale com a Esfinge."
  },
  {
    id: "sphinx_conviction",
    number: 4,
    location: "mountain",
    namePt: "Enigma da Convicção",
    nameEn: "Riddle of Conviction",
    summary: "Entregar o seu bem mais precioso.",
    solution: "A Esfinge duplicará o item exato que você entregar! Entregue um Cristal de Porto (Portcrystal) para obter um segundo cristal idêntico sem custo."
  },
  {
    id: "sphinx_rumination",
    number: 5,
    location: "mountain",
    namePt: "Enigma da Ruminação",
    nameEn: "Riddle of Rumination",
    summary: "Retornar ao local onde encontrou seu primeiro Memento do Buscador dentro de 7 dias.",
    solution: "Retorne ao lugar em que coletou seu primeiro Memento do Buscador. Pegue o Memento do Descobridor (Finder's Token) nesse local e entregue-o à Esfinge dentro de sete dias no jogo."
  },
  {
    id: "sphinx_reunification",
    number: 6,
    location: "reunification",
    namePt: "Reunião (Mudança de Santuário)",
    nameEn: "Riddle of Reunification",
    summary: "A Esfinge bate as asas para voar para o Santuário da Fronteira.",
    solution: "Quando a Esfinge partir, você pode agarrar-se a ela e subir até suas costas para viajar até o Santuário da Fronteira. Também é possível chegar a esse santuário a pé, a oeste da Cidade de Descanso da Fronteira."
  },
  {
    id: "sphinx_memory",
    number: 7,
    location: "frontier",
    namePt: "Enigma da Memória",
    nameEn: "Riddle of Memory",
    isRandomOrder: true,
    summary: "Colocar no pedestal o número exato de estátuas correspondente aos enigmas já respondidos.",
    solution: "Conte quantos baús de recompensa da Esfinge você já desbloqueou nos dois santuários, incluindo o baú da Reunião. Coloque essa quantidade de estátuas diante dela e confirme a resposta. A ordem dos desafios da fronteira varia."
  },
  {
    id: "sphinx_contest",
    number: 8,
    location: "frontier",
    namePt: "Enigma da Competição",
    nameEn: "Riddle of Contest",
    isRandomOrder: true,
    summary: "Derrotar o guerreiro armado enquanto equipado com o Anel da Derisão.",
    solution: "A Esfinge equipa em você o Ring of Derision (que reduz seu dano a quase zero). Simplesmente agarre o oponente no chão e jogue-o penhasco abaixo, ou empurre-o no abismo!"
  },
  {
    id: "sphinx_diff",
    number: 9,
    location: "frontier",
    namePt: "Enigma da Diferenciação",
    nameEn: "Riddle of Differentiation",
    isRandomOrder: true,
    summary: "Encontrar e trazer Dante ou Vergil conforme a imagem mostrada.",
    solution: "Compare o retrato mostrado pela Esfinge com o registro dos NPCs: Dante tem cabelo liso e circula ao NORTE do portão da Cidade de Descanso da Fronteira; Vergil tem cabelo cacheado e circula ao SUL do mesmo portão, ainda na Cidade de Descanso da Fronteira (lado de Battahl). Não vá ao centro de Bakbattahl. Use o Frasco Selante ou leve a pessoa correta até o pedestal."
  },
  {
    id: "sphinx_futility",
    number: 10,
    location: "frontier",
    namePt: "Enigma da Futilidade",
    nameEn: "Riddle of Futility",
    summary: "Entregar o frágil vaso de cerâmica para Maurits em Bakbattahl sem quebrá-lo.",
    solution: "Não tente carregar o vaso a pé pelo deserto cheio de harpias! Em vez disso, vá até Bakbattahl, pegue Maurits no colo (ou guarde-o na Sealing Phial), use uma Pedra-barca para voltar ao Santuário da Fronteira e coloque Maurits ao lado do vaso!"
  }
];

export const MAISTER_SKILLS: MaisterSkill[] = [
  {
    id: "fighter_lennart",
    vocationPt: "Guerreiro",
    vocationEn: "Fighter",
    skillPt: "Golpe Feroz",
    skillEn: "Riotous Fury",
    npc: "Lennart",
    location: "Melve ou Aldeia de Harve",
    questOrCondition: "Conclua 'Revinda da Calamidade' (Readvent of Calamity) e aumente afinidade conversando ou entregando presentes.",
    missableNote: "Perdível se Ulrika ou Melve forem ignoradas antes da coroação."
  },
  {
    id: "archer_taliesin",
    vocationPt: "Arqueiro",
    vocationEn: "Archer",
    skillPt: "Flecha Celestial",
    skillEn: "Heavenly Shot",
    npc: "Taliesin",
    location: "Bosque Sagrado (Sacred Arbor)",
    questOrCondition: "Conclua a cadeia de Glyndwr ('O Dom do Arco' — Gift of the Bow; e 'A Prova de Arco e Flecha' — A Trial of Archery) salvando a irmã dele Doireann."
  },
  {
    id: "thief_flaude",
    vocationPt: "Ladrão (1 de 2)",
    vocationEn: "Thief (1 of 2)",
    skillPt: "Lâminas Flamejantes",
    skillEn: "Blades of the Pyre",
    npc: "Flaude",
    location: "Vila Sem Nome (Nameless Village)",
    questOrCondition: "Fale com Flaude na mansão superior da vila fingindo ser o mestre do vilarejo."
  },
  {
    id: "thief_srail",
    vocationPt: "Ladrão (2 de 2)",
    vocationEn: "Thief (2 of 2)",
    skillPt: "Forma Sem Forma",
    skillEn: "Formless Feint",
    npc: "Srail",
    location: "Subsolo da Vila Sem Nome",
    questOrCondition: "Pule o fosso de plataformas na caverna subterrânea e fale com o verdadeiro líder Srail."
  },
  {
    id: "mage_eini",
    vocationPt: "Mago",
    vocationEn: "Mage",
    skillPt: "Tormenta Celestial",
    skillEn: "Celestial Paean",
    npc: "Eini",
    location: "Casa de Eini (norte de Melve)",
    questOrCondition: "Conclua 'Magia Vertiginosa' (Spellbound) com Trysha sem que ela morra no surto mágico; depois fale com a avó Eini."
  },
  {
    id: "sorcerer_trysha",
    vocationPt: "Feiticeiro (1 de 2)",
    vocationEn: "Sorcerer (1 of 2)",
    skillPt: "Chuva de Meteoros",
    skillEn: "Meteoron",
    npc: "Trysha",
    location: "Casa de Eini",
    questOrCondition: "Entregue pelo menos 3 grimórios originais a Trysha, espere o surto mágico, agarre-a sem atacá-la até cansar e descanse."
  },
  {
    id: "sorcerer_myrddin",
    vocationPt: "Feiticeiro (2 de 2)",
    vocationEn: "Sorcerer (2 of 2)",
    skillPt: "Redemoinho",
    skillEn: "Maelstrom",
    npc: "Myrddin",
    location: "Posto da Fronteira (Checkpoint Rest Town)",
    questOrCondition: "Entregue pelo menos 3 grimórios (podem ser as FALSIFICAÇÕES feitas por Ibrahim) vestindo traje da corte."
  },
  {
    id: "warrior_beren",
    vocationPt: "Guerreiro Pesado",
    vocationEn: "Warrior",
    skillPt: "Arco do Conquistador",
    skillEn: "Arc of Might",
    npc: "Beren",
    location: "Acampamento de Fronteira / Casa de Infância de Beren em Battahl",
    questOrCondition: "Conclua 'Treino Leonino' (Claw Them Into Shape) e 'A Última Lição de Beren' (Beren's Final Lesson); visite Beren do outro lado da fronteira."
  },
  {
    id: "mystic_spearhand_sigurd",
    vocationPt: "Lanceiro Místico",
    vocationEn: "Mystic Spearhand",
    skillPt: "Fúria Selvagem",
    skillEn: "Wild Furie",
    npc: "Sigurd",
    location: "Melve, Aldeia de Harve ou Torre do Sopro do Dragão",
    questOrCondition: "Derrote o dragão infectado na Torre do Sopro do Dragão e fale com Sigurd com afinidade alta."
  },
  {
    id: "trickster_luz",
    vocationPt: "Ilusionista",
    vocationEn: "Trickster",
    skillPt: "Ilusão do Dragão",
    skillEn: "Dragon's Delusion",
    npc: "Luz",
    location: "Santuário Reverente (Reverent Shrine)",
    questOrCondition: "Suba na escada de trás do santuário até o telhado e fale com a verdadeira forma física de Luz."
  },
  {
    id: "magick_archer_cliodhna",
    vocationPt: "Arqueiro Mágico",
    vocationEn: "Magick Archer",
    skillPt: "Flecha do Mártir",
    skillEn: "Martyr's Bolt",
    npc: "Cliodhna",
    location: "Cabana de Cliodhna / Ilha Vulcânica",
    questOrCondition: "Conclua 'A Fonte do Contentamento' (Put a Spring in Thy Step) levando Gautstafr até as fontes termais do acampamento."
  },
  {
    id: "warfarer_lamond",
    vocationPt: "Chefe de Guerra",
    vocationEn: "Warfarer",
    skillPt: "Reordenar",
    skillEn: "Rearmament",
    npc: "Lamond",
    location: "Fontes Termais da Ilha Vulcânica",
    questOrCondition: "Entregue 3 garrafas de Licor de Lagarto (Newt Liqueur) em 'O Sábio Beberrão' (The Sotted Sage)."
  }
];

export const BARBECUE_MEATS: BarbecueMeat[] = [
  {
    id: "meat_scrag",
    namePt: "Carne Ressecada",
    nameEn: "Scrag of Meat",
    howToGet: "Dropada frequentemente de pequenos animais (lobos, javalis, cervos, goblins)."
  },
  {
    id: "meat_aged_scrag",
    namePt: "Carne Ressecada Curada",
    nameEn: "Aged Scrag of Meat",
    howToGet: "Deixe a Carne Ressecada no inventário por 1 ou 2 dias in-game até amadurecer (não deixe apodrecer!)."
  },
  {
    id: "meat_rotten_scrag",
    namePt: "Carne Ressecada Podre",
    nameEn: "Rotten Scrag of Meat",
    howToGet: "Deixe a carne passar do ponto curado no inventário até ficar esverdeada/podre."
  },
  {
    id: "meat_steak",
    namePt: "Filé Nobre",
    nameEn: "Beast-Steak",
    howToGet: "Dropada de bestas maiores (bois selvagens, javalis nobres, minotauros, ogros)."
  },
  {
    id: "meat_aged_steak",
    namePt: "Filé Nobre Curado",
    nameEn: "Aged Beast-Steak",
    howToGet: "Mantenha o Filé Nobre no inventário por 1 a 2 dias in-game até o estágio curado."
  },
  {
    id: "meat_rotten_steak",
    namePt: "Filé Nobre Podre",
    nameEn: "Rotten Beast-Steak",
    howToGet: "Deixe o Filé Nobre no inventário até apodrecer completamente."
  },
  {
    id: "meat_dried",
    namePt: "Carne Seca",
    nameEn: "Dried Meat",
    howToGet: "Combine 2 Carnes Ressecadas Curadas no menu de criação de itens."
  },
  {
    id: "meat_exquisite_dried",
    namePt: "Carne Seca Excelente",
    nameEn: "Exquisite Dried Meat",
    howToGet: "Combine 2 Filés Nobres Curados no menu de criação de itens."
  }
];

export const RISK_CHECKPOINTS = [
  {
    id: "cp1_feast",
    phaseId: "vernworth3",
    title: "Antes da Coroação ('O Banquete da Farsa' — Feast of Deception)",
    dangerLevel: "Crítico",
    description: "Antes de avançar a coroação em 'O Banquete da Farsa' (Feast of Deception), confira as missões que ainda pretende concluir em Vermund.",
    verificationList: [
      "Concluiu 'Revinda da Calamidade' (Readvent of Calamity) e acompanhou Ulrika em Melve e Harve?",
      "Concluiu 'A Caixa Ornamentada' (The Ornate Box) com o jovem Sven nos mercados?",
      "Concluiu 'Frustração Vocacional' (Vocation Frustration) na Guilda de Vocações?",
      "Concluiu 'Uma Sombra à Espreita' (The Arisen's Shadow) capturando o espião Bermudo?",
      "Planejou procurar Wilhelmina no Rose Chateau logo após a coroação, quando guias situam a missão 'As Rosas Têm Espinhos'?",
      "Conferiu a diferença entre salvamento intermediário e último descanso na pousada na sua versão, sem contar com recuperação garantida?"
    ]
  },
  {
    id: "cp2_gigantus",
    phaseId: "preend",
    title: "Antes de Interceptar o Gigantus ('O Guardião Gigantus' — The Guardian Gigantus)",
    dangerLevel: "Crítico",
    description: "Prepare seus equipamentos antes da marcha de Gigantus e tente detê-lo o mais cedo possível.",
    verificationList: [
      "Conferiu os tipos de save da atualização 3.2 antes da marcha e qual estado é realmente recuperável?",
      "Possui a Flecha da Ruína (Unmaking Arrow) ou build de arqueiro com flechas explosivas/balistas preparadas?",
      "Está preparado para deter o colosso cedo, sem depender de uma cena automática nem presumir troféu instantâneo?"
    ]
  },
  {
    id: "cp3_confrontation",
    phaseId: "unmoored",
    title: "Antes do Confronto com o Dragão (Moonglint Tower)",
    dangerLevel: "Crítico",
    description: "Para tentar os finais comum e verdadeiro na mesma campanha, conclua 'Paz' e evite iniciar Novo Jogo+ antes de continuar a história.",
    verificationList: [
      "Revisou atividades pendentes ANTES de avançar 'Um Novo Chamado Divino' (A New Godsway) e conferiu os saves recuperáveis?",
      "Sabe que deve derrotar o dragão e sentar no trono para a conquista 'Paz'?",
      "Sabe que NÃO deve iniciar Novo Jogo+ antes de tentar interagir com o Pioneiro (Pathfinder) e retornar ao voo do Dragão?"
    ]
  },
  {
    id: "cp4_unmoored_evac",
    phaseId: "unmoored",
    title: "Mundo Desancorado: Evacuações e Feixe Vermelho Final",
    dangerLevel: "Crítico",
    description: "Descansos podem avançar a névoa do Mundo Desancorado. O marcador azul do Templo Abissal participa da evacuação; o feixe vermelho FINAL encaminha o encerramento da campanha. Não confunda ambos.",
    verificationList: [
      "Evitou descansar em demasia no Mundo Desancorado para conter a névoa?",
      "Concluiu as CINCO missões de evacuação: Vernworth, Bakbattahl, Jardim Sagrado, Acampamento Vulcânico e Local de Escavação (Henrique)?",
      "Revisou os feixes de prova restantes no mapa, incluindo a participação possível de Talos, sem contar o feixe vermelho final como periférico?",
      "Reativou o Gigantus na praia ('Eu, Talos')?",
      "Revisou itens, conquistas e tarefas opcionais pendentes ANTES de ativar o feixe vermelho final?",
      "Confirmou que NÃO está no Modo Casual (o Modo Casual anula a conquista 'Encerramento')?"
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { pt: "Nascen", en: "Arisen", category: "NPC", notes: "O protagonista escolhido cujo coração foi tomado pelo dragão." },
  { pt: "Peão", en: "Pawn", category: "NPC", notes: "Habitantes da Fenda dedicados a servir o Nascen." },
  { pt: "Pedra-barca", en: "Ferrystone", category: "Item", notes: "Pedra mágica consumível usada para teletransporte rápido a um Cristal de Porto." },
  { pt: "Cristal de Porto", en: "Portcrystal", category: "Item", notes: "Âncora teletransportadora fixa ou portátil." },
  { pt: "Memento do Buscador", en: "Seeker's Token", category: "Item", notes: "Moedas douradas colecionáveis espalhadas pelo mapa (total de 240 no jogo, 80 para a conquista)." },
  { pt: "Memento do Descobridor", en: "Finder's Token", category: "Item", notes: "Item único que surge no local exato do primeiro Memento do Buscador durante a Esfinge." },
  { pt: "Pedra de Despertar", en: "Wakestone", category: "Item", notes: "Pedra usada para ressuscitar um indivíduo caído." },
  { pt: "Pedra de Despertar Eterna", en: "Eternal Wakestone", category: "Item", notes: "Pedra especial obtida da Esfinge que ressuscita dezenas de mortos em raio amplo." },
  { pt: "Flecha da Ruína", en: "Unmaking Arrow", category: "Item", notes: "Flecha de uso único que mata instantaneamente qualquer criatura ou chefe." },
  { pt: "Lâmina da Perdição dos Deuses Potencializada", en: "Empowered Godsbane Blade", category: "Item", notes: "Espada mística entregue por Ambrosius necessária para abrir o Mundo Desancorado." },
  { pt: "Cristal da Vida da Serpe", en: "Wyrmslife Crystal (WLC)", category: "Item", notes: "Sangue cristalizado de dragões usado para compras lendárias e forja dracônica." },
  { pt: "Mundo Desancorado", en: "Unmoored World", category: "Local", notes: "O mundo pós-apocalíptico desprovido de mar acessado no desfecho verdadeiro." },
  { pt: "Posto de Controle da Fronteira", en: "Checkpoint Rest Town", category: "Local", notes: "Vila na fronteira entre Vermund e Battahl onde mora o falsificador Ibrahim." },
  { pt: "Santuário do Leito Marinho", en: "Seafloor Shrine", category: "Local", notes: "Ruínas submersas que se tornam o refúgio seguro durante o Mundo Desancorado." },
  { pt: "Chefe de Guerra", en: "Warfarer", category: "Vocação", notes: "Vocação avançada capaz de empunhar qualquer tipo de arma." },
  { pt: "Lanceiro Místico", en: "Mystic Spearhand", category: "Vocação", notes: "Vocação híbrida focada em lâmina dupla e magias de paralisia/escudo." },
  { pt: "Ilusionista", en: "Trickster", category: "Vocação", notes: "Vocação avançada que manipula fumaça e espectros para confundir inimigos." },
  { pt: "Arqueiro Mágico", en: "Magick Archer", category: "Vocação", notes: "Vocação avançada de longo alcance que dispara setas mágicas teleguiadas." },
  { pt: "O Norte Esquecido", en: "The Forgotten North", category: "Conquista", notes: "Conquista da DLC Dark Arisen (chegar a Norgan). Nome PT-BR provisório.", isDlcProvisional: true },
  { pt: "Dogma Desafiado", en: "Dogma Defied", category: "Conquista", notes: "Conquista da DLC Dark Arisen (The Final Trial sem curar a perda). Nome PT-BR provisório.", isDlcProvisional: true },
  { pt: "Dogma Defendido", en: "Dogma Defended", category: "Conquista", notes: "Conquista da DLC Dark Arisen (pedido do guardião de Norgan). Nome PT-BR provisório.", isDlcProvisional: true },
  { pt: "Strike!", en: "Strike!", category: "Conquista", notes: "Conquista da DLC Dark Arisen (quebrar 5 barreiras de olhos malignos). Nome original mantido.", isDlcProvisional: true },
  { pt: "Reunidos", en: "Reunited", category: "Conquista", notes: "Conquista da DLC Dark Arisen (pedido de Eir). Nome PT-BR provisório.", isDlcProvisional: true },
  { pt: "Esconderijo Abominável", en: "Abominable Snowstash", category: "Conquista", notes: "Conquista da DLC Dark Arisen (covil do snowfoot). Nome PT-BR provisório.", isDlcProvisional: true }
];
