import fs from 'fs';
import { PHASES } from '../src/data/roadmapData.ts';

// 72 entries definitions matching PHASES 1:1
const matrixData = [
  // --- FASE 1: MELVE ---
  {
    id: "m01",
    content: "Conclua o Prólogo até alcançar o Posto Avançado da Guarda (Marco agregador do prólogo)",
    quests: "O Despertar na Prisão, A Mão que Guia, A História se Inicia / Gaoled Awakening, The Hand That Guides, Tale's Beginning",
    location: "Prisão de Escravos (Local de Escavação) → Posto Avançado da Fronteira",
    mainQuest: "Prólogo da Campanha Principal",
    relation: "DESBLOQUEIA",
    moment: "Capítulo 01 · Melve (Início absoluto da campanha)",
    prerequisites: "Nenhum (início de jogo)",
    risk: "Nenhum (obrigatório, sem prazo)",
    sources: [
      { name: "PowerPyx (Tale's Beginning)", url: "https://www.powerpyx.com/dragons-dogma-2-tales-beginning-walkthrough/" },
      { name: "Game8 (Tale's Beginning)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Tales-Beginning" }
    ],
    evidence: "Ambas as fontes documentam a rota inicial: fuga da prisão com Rook, travessia com a Mão que Guia e despertar no Posto Avançado com Justinius.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco inicial (m01)"
  },
  {
    id: "m08",
    content: "Inicie No Rastro do Dragão: do Posto Avançado até Melve (Missão individual da história)",
    quests: "No Rastro do Dragão (Parte 1: Melve) / In Dragon's Wake",
    location: "Posto Avançado da Fronteira → Melve",
    mainQuest: "No Rastro do Dragão",
    relation: "REQUER",
    moment: "Capítulo 01 · Melve (Após acordar no Posto)",
    prerequisites: "Concluir m01 (Tale's Beginning)",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (In Dragon's Wake)", url: "https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/" },
      { name: "Game8 (In Dragon's Wake)", url: "https://game8.co/games/Dragons-Dogma-2/archives/In-Dragons-Wake" }
    ],
    evidence: "Fontes confirmam que descansar na estalagem do posto ativa No Rastro do Dragão; seguir a pé para Melve, assistir ao flashback e falar com Lennart.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Separado de v101 para guiar a primeira estadia em Melve antes da escolta"
  },
  {
    id: "m06",
    content: "Registre o local do primeiro Memento do Buscador (Alerta editorial preventivo)",
    quests: "Primeiro Memento do Buscador / First Seeker's Token",
    location: "Mundo aberto (habitualmente arredores de Melve ou Posto Avançado)",
    mainQuest: "Nenhuma (Atividade de colecionável)",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 01 · Melve (Primeira coleta)",
    prerequisites: "Localizar e coletar 1 Memento do Buscador",
    risk: "Atenção (não é temporizada em si; serve para o Enigma de Ruminação da Esfinge)",
    sources: [
      { name: "PowerPyx (Sphinx Riddles)", url: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/" },
      { name: "Game8 (Riddle of Rumination)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Game-of-Wits" }
    ],
    evidence: "O 5º enigma da Esfinge (Ruminação) gera o Finder's Token no local exato do 1º Memento do jogador com prazo de 7 dias.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com alerta visual 'Atenção', sem rotular falsamente como temporizada"
  },
  {
    id: "m02",
    content: "Resolva as missões de novatos antes de se afastar do posto (Marco agregador de 2 secundárias)",
    quests: "Provações de um Novo Recruta & Um Fornecedor em Apuros / Ordeals of a New Recruit & The Provisioner's Plight",
    location: "Posto Avançado da Fronteira e arredores",
    mainQuest: "No Rastro do Dragão",
    relation: "PARALELA",
    moment: "Capítulo 01 · Melve (Antes de partir para Vernworth)",
    prerequisites: "Estar no Posto Avançado durante No Rastro do Dragão",
    risk: "Temporizada e Perdível (Accardo é atacado por harpias e morre se houver demora ou descanso)",
    sources: [
      { name: "PowerPyx (Ordeals of a New Recruit)", url: "https://www.powerpyx.com/dragons-dogma-2-ordeals-of-a-new-recruit-walkthrough/" },
      { name: "Game8 (Ordeals of a New Recruit)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Ordeals-of-a-New-Recruit" }
    ],
    evidence: "Ambas as fontes comprovam que o resgate de Accardo falha se o jogador descansar ou demorar para alcançar o ninho das harpias.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flags explícitas 'Temporizada' e 'Perdível'"
  },
  {
    id: "m03",
    content: "Inicie o treinamento com Beren e conheça Trysha (Marco agregador de 2 mestres)",
    quests: "Treino Leonino & Magia Vertiginosa / Claw Them Into Shape & Spellbound",
    location: "Jardim do Luar (Posto Avançado) & Casa de Eini (Norte de Melve)",
    mainQuest: "No Rastro do Dragão",
    relation: "PARALELA",
    moment: "Capítulo 01 · Melve (Atividades iniciais)",
    prerequisites: "Conversar com Beren no campo de treino; visitar Casa de Eini ao norte",
    risk: "Atenção (Trysha exige grimórios autênticos; cópias causam falha com ela)",
    sources: [
      { name: "PowerPyx (Claw Them Into Shape)", url: "https://www.powerpyx.com/dragons-dogma-2-claw-them-into-shape-walkthrough/" },
      { name: "Game8 (Spellbound)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Spellbound" }
    ],
    evidence: "Beren pede 3 espadas e recruta; Trysha exige grimórios autênticos para ensinar maestria sem enlouquecer com cópias.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido em Melve com aviso visual de grimórios"
  },
  {
    id: "m05",
    content: "Inicie as conquistas de sistemas e conclua-as quando desbloquear os recursos (Marco agregador de sistemas)",
    quests: "Conquistas de Sistemas Iniciais (Acampamento, Carroça, Guilda, Pedra-barca, Reviver Peões)",
    location: "Mundo aberto",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 01 · Melve e Capítulo 02 · Vernworth (Cumulativo)",
    prerequisites: "Desbloquear mecânicas no percurso",
    risk: "Nenhum (cumulativo sem prazo)",
    sources: [
      { name: "Steam Community (Achievements Roadmap)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "TrueAchievements (DD2 Achievements)", url: "https://www.trueachievements.com/game/Dragons-Dogma-2/achievements" }
    ],
    evidence: "Conquistas de mecânicas de base (Just a Stone's Throw Away, Quit Playing Dead) são cumulativas e realizáveis a qualquer momento.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration"
  },
  {
    id: "m09",
    content: "Durante No Rastro do Dragão: Intruso de um Olho Só (Missão individual embutida)",
    quests: "Intruso de um Olho Só / One-Eyed Interloper",
    location: "Estrada de Melve para Vernworth (bloqueio da garganta do rio)",
    mainQuest: "No Rastro do Dragão",
    relation: "DURANTE",
    moment: "Capítulo 01 · Melve (Durante a escolta com Gregor)",
    prerequisites: "Acompanhar Gregor na estrada de Melve em No Rastro do Dragão",
    risk: "Condicional (se viajar sem Gregor ou quebrar a passagem antes da cena, o evento não se repete)",
    sources: [
      { name: "PowerPyx (In Dragon's Wake)", url: "https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/" },
      { name: "Game8 (One-Eyed Interloper)", url: "https://game8.co/games/Dragons-Dogma-2/archives/One-Eyed-Interloper" }
    ],
    evidence: "O ciclope surge na estrada durante a escolta; derrubar a barragem inunda a área; derrotar o monstro avança Gregor. Registro no diário varia se rota for contornada.",
    divergence: "Gatilho exato de registro no diário varia se o jogador contornar o caminho",
    confidence: "CORROBORADO",
    proposal: "Classificado como during ('Durante esta missão') entre m08 e v101"
  },

  // --- FASE 2: VERNWORTH 1 ---
  {
    id: "v101",
    content: "Conclua No Rastro do Dragão e entre em Vernworth (Desfecho de missão principal)",
    quests: "No Rastro do Dragão (Chegada) / In Dragon's Wake (Arrival)",
    location: "Portões de Vernworth → Estalagem Stardrop",
    mainQuest: "No Rastro do Dragão",
    relation: "DESBLOQUEIA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Chegada à capital)",
    prerequisites: "Chegar aos portões de Vernworth após a viagem de Melve",
    risk: "Nenhum (avança mesmo se o ciclope em m09 tiver sido contornado)",
    sources: [
      { name: "PowerPyx (In Dragon's Wake)", url: "https://www.powerpyx.com/dragons-dogma-2-in-dragons-wake-walkthrough/" },
      { name: "Game8 (In Dragon's Wake)", url: "https://game8.co/games/Dragons-Dogma-2/archives/In-Dragons-Wake" }
    ],
    evidence: "Guarda aborda o Nascen nos portões; Brant intervém; No Rastro do Dragão conclui e abre O Trono do Sobran na estalagem.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Texto ajustado para explicitar que a rota continua mesmo se m09 foi contornado"
  },
  {
    id: "v108",
    content: "Fale com Brant à noite: O Trono do Sobran (Missão principal de introdução política)",
    quests: "O Trono do Sobran / Seat of the Sovran",
    location: "Estalagem Stardrop (Vernworth) à noite",
    mainQuest: "O Trono do Sobran",
    relation: "REQUER",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Primeira noite)",
    prerequisites: "Concluir v101",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Seat of the Sovran)", url: "https://www.powerpyx.com/dragons-dogma-2-seat-of-the-sovran-walkthrough/" },
      { name: "Game8 (Seat of the Sovran)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Seat-of-the-Sovran" }
    ],
    evidence: "Brant explica a conspiração de Disa na sacada da estalagem e abre 3 investigações paralelas: O Plano de Disa, O Magistrado Aprisionado e Elimine os Monstros.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal de abertura (v108)"
  },
  {
    id: "v102",
    content: "Ative a Guilda e inicie missões urbanas prioritárias (duas cadeias com visitas fora da cidade)",
    quests: "Frustração Vocacional, O Dom do Arco e A Prova de Arco e Flecha / Vocation Frustration, Gift of the Bow, A Trial of Archery",
    location: "Vernworth (guilda e forja) → Mina de Trevo / Ruínas da Montanha → Bosque Sagrado",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Início na cidade)",
    prerequisites: "Aceitar Klaus e Glyndwr após chegar a Vernworth; A Prova de Arco e Flecha só fica disponível depois de concluir O Dom do Arco",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Vocation Frustration)", url: "https://www.powerpyx.com/dragons-dogma-2-vocation-frustration-walkthrough/" },
      { name: "PowerPyx (Gift of the Bow)", url: "https://www.powerpyx.com/dragons-dogma-2-gift-of-the-bow-walkthrough/" },
      { name: "PowerPyx (A Trial of Archery)", url: "https://www.powerpyx.com/dragons-dogma-2-a-trial-of-archery-walkthrough/" }
    ],
    evidence: "PowerPyx: Klaus e Glyndwr iniciam em Vernworth; Mina de Trevo também integra Elimine os Monstros; Glyndwr treina fora da cidade e a prova posterior segue ao Bosque Sagrado.",
    divergence: "Marco composto: os links sustentam etapas separadas, não uma janela única.",
    confidence: "PROVÁVEL",
    proposal: "Aceite missões na cidade e combine as viagens; não presuma conclusão imediata de cadeia de Glyndwr."
  },
  {
    id: "v103",
    content: "Ajude Sven e encontre a biblioteca com Malcolm (Marco agregador de 3 secundárias)",
    quests: "A Caixa Ornamentada, Os Calcanhares da História, O Conto do Mendigo / The Ornate Box, The Heel of History, A Beggar's Tale",
    location: "Praça Mercantil e Cortiços de Vernworth",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Exploração dos bairros)",
    prerequisites: "Comprar a caixa para Sven ou emprestar 800 G; falar com Kendrick na Mão Caridosa",
    risk: "Perdível (roupas de mendigo têm 3 entregas mutuamente exclusivas)",
    sources: [
      { name: "PowerPyx (The Heel of History)", url: "https://www.powerpyx.com/dragons-dogma-2-the-heel-of-history-walkthrough/" },
      { name: "Game8 (The Ornate Box)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Ornate-Box" }
    ],
    evidence: "Encontrar Malcolm nas ruínas subterrâneas descobre o arquivo de livros necessário para convencer Waldhar; Sven devolve o dinheiro em 3 encontros na fonte.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco urbano de exploração (v103)"
  },
  {
    id: "v112",
    content: "Conclua A Dádiva da Caridade antes de A Casa da Luz-Solaris Azul (Marco encadeado de 2 secundárias)",
    quests: "A Dádiva da Caridade → A Casa da Luz-Solaris Azul / The Gift of Giving → House of the Blue Sunbright",
    location: "Cortiços de Vernworth & Mansão Townsend",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Após doações a Daphne)",
    prerequisites: "Concluir todas as doações a Daphne; Diana convoca para a mansão",
    risk: "Atenção (Sebastian precisa de 3 suprimentos específicos: olho de ciclope, antídoto, pó despertador)",
    sources: [
      { name: "PowerPyx (House of the Blue Sunbright)", url: "https://www.powerpyx.com/dragons-dogma-2-house-of-the-blue-sunbright-walkthrough/" },
      { name: "Game8 (The Gift of Giving)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Gift-of-Giving" }
    ],
    evidence: "Diana só aborda o jogador para a troca de Sebastian por Daphne após A Dádiva da Caridade estar concluída.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido marco sequencial seguro (v112)"
  },
  {
    id: "m04",
    content: "Retorne a Melve: Problemas Aninhados, Flora e Norbert (Marco agregador de 3 secundárias de Melve)",
    quests: "Remédio de Flora, Problemas Aninhados, Irmãos Valentes e Tímidos / Medicament Predicament, Nesting Troubles, Brothers Brave and Timid",
    location: "Melve e arredores",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Retorno conveniente pela carroça de Donovan)",
    prerequisites: "PowerPyx e Game8 indicam Problemas Aninhados após No Rastro do Dragão; relatos de acesso na primeira visita divergem. Flora e Ian têm condições próprias.",
    risk: "Perdível (canceladas se o ataque do dragão ou a coroação avançarem sem falar com os NPCs)",
    sources: [
      { name: "PowerPyx (Nesting Troubles)", url: "https://www.powerpyx.com/dragons-dogma-2-nesting-troubles-walkthrough/" },
      { name: "Game8 (Nesting Troubles)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Nesting-Troubles" }
    ],
    evidence: "PowerPyx e Game8 confirmam Melve como local e o retorno após No Rastro do Dragão para Problemas Aninhados. As outras missões do marco exigem verificação separada.",
    divergence: "Algumas fontes relatam o início de Problemas Aninhados já na primeira visita; não há consenso para tratar como regra universal.",
    confidence: "PROVÁVEL",
    proposal: "Mantido ID m04, com acesso pelo capítulo Melve e momento de retorno explícito"
  },
  {
    id: "m07",
    content: "Após O Trono do Sobran, conclua A Última Lição de Beren (Missão individual de maestria)",
    quests: "A Última Lição de Beren / Beren's Final Lesson",
    location: "Jardim do Luar (Campo de Treino de Beren)",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Após recrutar recruta em Vernworth)",
    prerequisites: "Concluir Treino Leonino e recrutar Humphrey em Vernworth",
    risk: "Nenhum (Beren demitido ensina Arcana se visitado mais tarde em Battahl)",
    sources: [
      { name: "PowerPyx (Beren's Final Lesson)", url: "https://www.powerpyx.com/dragons-dogma-2-berens-final-lesson-walkthrough/" },
      { name: "Game8 (Beren's Final Lesson)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Berens-Final-Lesson" }
    ],
    evidence: "Ciclope invade o campo de treino; duelo final com Beren encerra a missão.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido marco dedicado (m07)"
  },
  {
    id: "v111",
    content: "Solte Waldhar em O Magistrado Aprisionado (Missão principal de investigação)",
    quests: "O Magistrado Aprisionado / The Caged Magistrate",
    location: "Calabouço do Castelo de Vernworth",
    mainQuest: "O Magistrado Aprisionado",
    relation: "REQUER",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Investigações de Brant)",
    prerequisites: "Concluir v103 (descobrir arquivo de livros em Os Calcanhares da História)",
    risk: "Nenhum (Waldhar se recusa a sair da cela se não souber de um lugar com muitos livros)",
    sources: [
      { name: "PowerPyx (The Caged Magistrate)", url: "https://www.powerpyx.com/dragons-dogma-2-the-caged-magistrate-walkthrough/" },
      { name: "Game8 (The Caged Magistrate)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Caged-Magistrate" }
    ],
    evidence: "Brant entrega chave da cela; Waldhar exige garantia de um acervo literário antes de fugir pelo túnel.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Posicionado sequencialmente após a descoberta da biblioteca"
  },
  {
    id: "v113",
    content: "Após libertar Waldhar, faça Cortesia Magisterial (Missão individual secundária)",
    quests: "Cortesia Magisterial / A Magisterial Amenity",
    location: "Cofre da Mão Caridosa & Salão de Máscaras do Castelo",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Após Waldhar estar abrigado no cofre)",
    prerequisites: "Concluir v111 (O Magistrado Aprisionado)",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (A Magisterial Amenity)", url: "https://www.powerpyx.com/dragons-dogma-2-a-magisterial-amenity-walkthrough/" },
      { name: "Game8 (A Magisterial Amenity)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Magisterial-Amenity" }
    ],
    evidence: "Waldhar só oferece a missão após estar instalado na biblioteca subterrânea; pede óculos guardados no depósito do salão.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido marco sequencial pós-libertação (v113)"
  },
  {
    id: "v109",
    content: "Investigue O Plano de Disa no castelo (Missão principal de infiltração)",
    quests: "O Plano de Disa / Disa's Plot",
    location: "Castelo de Vernworth à noite",
    mainQuest: "O Plano de Disa",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Investigações de Brant)",
    prerequisites: "Aceitar missão com Brant na estalagem",
    risk: "Atenção (entrar de dia ou sem cuidado chama guardas hostis)",
    sources: [
      { name: "PowerPyx (Disa's Plot)", url: "https://www.powerpyx.com/dragons-dogma-2-disas-plot-walkthrough/" },
      { name: "Game8 (Disa's Plot)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Disas-Plot" }
    ],
    evidence: "Sonia/Sven auxiliam na entrada noturna aos aposentos da rainha; carta rasurada é recuperada e entregue a Brant.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal de investigação (v109)"
  },
  {
    id: "v110",
    content: "Conclua Elimine os Monstros nas regiões indicadas por Brant (Missão principal de combate)",
    quests: "Elimine os Monstros / Monster Culling",
    location: "Caverna da Cascata, Mina de Trevo e Costa de Harve",
    mainQuest: "Elimine os Monstros",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Investigações de Brant)",
    prerequisites: "Aceitar missão com Brant",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Monster Culling)", url: "https://www.powerpyx.com/dragons-dogma-2-monster-culling-walkthrough/" },
      { name: "Game8 (Monster Culling)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Monster-Culling" }
    ],
    evidence: "Três destacamentos militares combatem goblins e sauris; vitória nos 3 locais avança o relatório a Brant.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal de combate (v110)"
  },
  {
    id: "v105",
    content: "Adquira sua própria residência em Vernworth (Missão individual de habitação)",
    quests: "Um Lugar para Chamar de Lar / A Place to Call Home",
    location: "Bairro Comum de Vernworth",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Durante estadia na capital)",
    prerequisites: "Mildred aborda nos fundos da cidade",
    risk: "Atenção (esperar 7 dias cuidando da casa e pagar 20.000 G)",
    sources: [
      { name: "PowerPyx (A Place to Call Home)", url: "https://www.powerpyx.com/dragons-dogma-2-a-place-to-call-home-walkthrough/" },
      { name: "Game8 (A Place to Call Home)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Place-to-Call-Home" }
    ],
    evidence: "Mildred empresta a casa por 7 dias grátis e a vende permanentemente por 20.000 G, garantindo cama gratuita e baú.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: v105 é A Place to Call Home (habitação em Vernworth)"
  },
  {
    id: "v106",
    content: "Desenvolva o peão principal e afinidade máxima com um NPC (Marco agregador de peão e afinidade)",
    quests: "Teste de Arquearia & Conquistas de Afinidade / Gift of the Bow & Affinity",
    location: "Guilda de Armas de Vernworth & Aldeia Sagrada dos Elfos",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Exploração)",
    prerequisites: "Entregar arco fabricado por humanos a Glyndwr",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Gift of the Bow)", url: "https://www.powerpyx.com/dragons-dogma-2-gift-of-the-bow-walkthrough/" },
      { name: "Game8 (Gift of the Bow)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Gift-of-the-Bow" }
    ],
    evidence: "Glyndwr treina pontaria e convida para a Aldeia Sagrada; afinidade sobe com presentes e escoltas.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (v106)"
  },
  {
    id: "v104",
    content: "Participe do baile de máscaras com traje nobre (Missão principal de investigação)",
    quests: "O Trono Roubado & Correspondência Mascarada (opcional) / The Stolen Throne & Masked Correspondence",
    location: "Salão de Máscaras do Castelo de Vernworth",
    mainQuest: "O Trono Roubado",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Investigações de Brant)",
    prerequisites: "Missão principal O Trono Roubado: traje e máscara da corte. Opcional: verificar Correspondência Mascarada com Sven após avanço de O Plano de Disa, se aparecer.",
    risk: "Atenção (exige traje nobre para entrar sem ser preso e obter conquista)",
    sources: [
      { name: "PowerPyx (The Stolen Throne)", url: "https://www.powerpyx.com/dragons-dogma-2-the-stolen-throne-walkthrough/" },
      { name: "Game8 (Masked Correspondence)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Masked-Correspondence" }
    ],
    evidence: "O Trono Roubado requer roupa adequada para o baile. Game8 descreve carta de Sven em Correspondência Mascarada, uma missão secundária com condição própria.",
    divergence: "Missão de Sven não é pré-requisito universal para a missão principal; seu gatilho exato varia com o avanço.",
    confidence: "PROVÁVEL",
    proposal: "Mantido como marco principal de investigação (v104)"
  },
  {
    id: "v203",
    content: "Resgate Gregor no Pântano ('Até que a Morte Nos Separe') (Missão individual secundária)",
    quests: "Até que a Morte Nos Separe / Till Death Do Us Part",
    location: "Vernworth (Bairro Nobre) → Pântano Nebuloso (Ilefil)",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 02 · Vernworth e retorno a Melve (Disponível após O Trono do Sobran)",
    prerequisites: "Ouvir boato de Oswald e conversar com Margit em Vernworth",
    risk: "Temporizada e Perdível (Gregor morre em combate contra o Dullahan se o jogador demorar)",
    sources: [
      { name: "PowerPyx (Till Death Do Us Part)", url: "https://www.powerpyx.com/dragons-dogma-2-till-death-do-us-part-walkthrough/" },
      { name: "Game8 (Till Death Do Us Part)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Till-Death-Do-Us-Part" }
    ],
    evidence: "Margit alerta sobre a conspiração de Ludolph; alcançar o Pântano Nebuloso a tempo salva Gregor da morte certa contra o Dullahan.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido no fim de Vernworth 1 com flags explícitas 'Temporizada' e 'Perdível'"
  },

  // --- FASE 3: VERNWORTH 2 ---
  {
    id: "v201",
    content: "Investigue O Vilarejo sem Nome e a defesa de Harve (Marco agregador de principal e secundária)",
    quests: "O Vilarejo sem Nome & Invasores Escamosos / The Nameless Village & Scaly Invaders",
    location: "Vila dos Ladrões (Leste) & Vila Harve (Sul)",
    mainQuest: "O Vilarejo sem Nome",
    relation: "PARALELA",
    moment: "Capítulo 03 · Vermund, Melve e Harve (Investigações avançadas de Brant)",
    prerequisites: "Aceitar missão com Brant; visitar Harve",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (The Nameless Village)", url: "https://www.powerpyx.com/dragons-dogma-2-the-nameless-village-walkthrough/" },
      { name: "Game8 (The Nameless Village)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Nameless-Village" }
    ],
    evidence: "Pista de salto subterrânea no Vilarejo sem Nome revela Srail e a farsa de Darragh; defesa de Harve contra sauris prepara a vila para Ulrika.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal (v201)"
  },
  {
    id: "v107",
    content: "Retorne a Melve: Revinda da Calamidade (Alerta de ataque do dragão)",
    quests: "Revinda da Calamidade (Ataque do Dragão) / Readvent of Calamity",
    location: "Melve",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 03 · Vermund, Melve e Harve (Após 1-2 missões de Brant)",
    prerequisites: "Ter visitado Melve antes; retorno durante as investigações",
    risk: "Perdível (cancelada irreversivelmente se a coroação v301 for iniciada)",
    sources: [
      { name: "PowerPyx (Readvent of Calamity)", url: "https://www.powerpyx.com/dragons-dogma-2-readvent-of-calamity-walkthrough/" },
      { name: "Game8 (Readvent of Calamity)", url: "https://game8.co/games/Dragons-Dogma-2/archives/447927" }
    ],
    evidence: "Dragão infectado menor ataca Melve com Sigurd; Ulrika é acusada de traição por Martin e planeja fuga noturna.",
    divergence: "Gatilho de dias/missões exatas para o dragão pousar varia entre saves",
    confidence: "DIVERGENTE",
    proposal: "Matriz corrigida: v107 é Readvent of Calamity (alerta do dragão em Melve) com flag 'Perdível'"
  },
  {
    id: "v202",
    content: "Acompanhe Ulrika em Melve e Harve ('Revinda da Calamidade') (Missão secundária encadeada)",
    quests: "Revinda da Calamidade (Fuga) & Problemas no Cabo / Readvent of Calamity & Trouble on the Cape",
    location: "Melve & Vila Harve",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 03 · Vermund, Melve e Harve (Após fuga de Ulrika)",
    prerequisites: "Completar ataque do dragão em v107 e defesa de Harve em v201",
    risk: "Perdível (concluir antes da coroação v301)",
    sources: [
      { name: "PowerPyx (Trouble on the Cape)", url: "https://www.powerpyx.com/dragons-dogma-2-trouble-on-the-cape-walkthrough/" },
      { name: "Game8 (Readvent of Calamity)", url: "https://game8.co/games/Dragons-Dogma-2/archives/447927" }
    ],
    evidence: "Ulrika foge para Harve; resgatar Zoran na caverna marítima torna Ulrika líder da vila; relatar a Lennart conclui a etapa.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: v202 é o desfecho de Ulrika em Melve/Harve com flag 'Perdível'"
  },
  {
    id: "v204",
    content: "Tente a ponte improvisada com ciclope no vão do desfiladeiro (Conquista de combate)",
    quests: "Conquista Ciclopes na Ponte / Cyclops Abridged",
    location: "Caminho do Campo de Batalha Antigo ou cachoeiras",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 03 · Vermund, Melve e Harve (No caminho da Esfinge)",
    prerequisites: "Encontrar ciclope próximo a desfiladeiro estreito",
    risk: "Atenção (se peões matarem o ciclope antes da travessia, a conquista falha)",
    sources: [
      { name: "TrueAchievements (Cyclops Abridged)", url: "https://www.trueachievements.com/a429024/cyclops-abridged-achievement" },
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" }
    ],
    evidence: "Derrubar ciclope para apoiar o corpo como ponte sobre a fenda e correr por cima dele libera a conquista.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: v204 é Cyclops Abridged (conquista da ponte de ciclope)"
  },
  {
    id: "v205",
    content: "Chegue ao Santuário da Montanha e resolva os 5 enigmas da Esfinge (Missão individual secundária)",
    quests: "Um Jogo de Espirituosidade (Fase 1: Montanha) / A Game of Wits",
    location: "Santuário da Montanha (Norte do Campo de Batalha Antigo)",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 03 · Vermund, Melve e Harve (Exploração do norte de Vermund)",
    prerequisites: "Alcançar o Santuário da Montanha através das ruínas",
    risk: "Temporizada e Perdível (1 tentativa por enigma; Ruminação tem prazo estrito de 7 dias)",
    sources: [
      { name: "PowerPyx (All Sphinx Riddles)", url: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/" },
      { name: "Game8 (A Game of Wits)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Game-of-Wits" }
    ],
    evidence: "Enigmas dos Olhos, Loucura, Sabedoria, Convicção e Ruminação; errar bloqueia os baús permanentemente na campanha.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flags explícitas 'Temporizada' e 'Perdível'"
  },
  {
    id: "v206",
    content: "Visite Myrddin na Cidade de Descanso da Fronteira e coordene os grimórios (Missão de mestre)",
    quests: "O Julgamento do Feiticeiro & Magia Vertiginosa / The Sorcerer's Appraisal & Spellbound",
    location: "Cidade de Descanso da Fronteira & Casa de Eini",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 03 · Vermund, Melve e Harve (Visita à fronteira antes do Banquete)",
    prerequisites: "Usar traje nobre para ser atendido por Myrddin",
    risk: "Atenção (dar falsificações de Ibrahim a Myrddin e originais a Trysha)",
    sources: [
      { name: "PowerPyx (The Sorcerer's Appraisal)", url: "https://www.powerpyx.com/dragons-dogma-2-the-sorcerers-appraisal-walkthrough/" },
      { name: "Game8 (The Sorcerer's Appraisal)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Sorcerers-Appraisal" }
    ],
    evidence: "Myrddin aceita as falsificações feitas por Ibrahim em Checkpoint Rest Town; originais devem ir para Trysha.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: v206 é Myrddin e a coordenação de grimórios"
  },
  {
    id: "v114",
    content: "Na Cidade de Descanso da Fronteira: Orbe de Jadeíta e A Presa da Alcateia (Marco de 2 secundárias na fronteira)",
    quests: "Orbe de Jadeíta & A Presa da Alcateia / Hunt for the Jadeite Orb & Prey for the Pack",
    location: "Cidade de Descanso da Fronteira & Caverna Pútrida",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 03 · Vermund, Melve e Harve (Durante a estada na fronteira)",
    prerequisites: "Acesso à Cidade de Descanso da Fronteira",
    risk: "Temporizada e Perdível (A Presa da Alcateia tem prazo em descansos; Rodge morre se houver demora)",
    sources: [
      { name: "PowerPyx (Prey for the Pack)", url: "https://www.powerpyx.com/dragons-dogma-2-prey-for-the-pack-walkthrough/" },
      { name: "Game8 (Prey for the Pack)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Prey-for-the-Pack" }
    ],
    evidence: "Rodge é sequestrado por lobos e morre se o jogador descansar sucessivamente antes de entrar na Caverna Pútrida; Orbe envolve Ibrahim.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flags explícitas 'Temporizada' e 'Perdível'"
  },

  // --- FASE 4: VERNWORTH 3 ---
  {
    id: "v301",
    content: "Conclua Uma Sombra à Espreita e Um Encontro Perturbador (Marco agregador de 2 investigações)",
    quests: "Uma Sombra à Espreita & Um Encontro Perturbador / The Arisen's Shadow & An Unsettling Encounter",
    location: "Vernworth & Castelo de Vernworth",
    mainQuest: "Um Encontro Perturbador",
    relation: "REQUER",
    moment: "Capítulo 04 · Vernworth e Melve (Reta final de investigações de Brant)",
    prerequisites: "Concluir investigações iniciais de Brant",
    risk: "Atenção (capturar espião Bermudo vivo; escapar pela janela de Allard sem matar guardas)",
    sources: [
      { name: "PowerPyx (An Unsettling Encounter)", url: "https://www.powerpyx.com/dragons-dogma-2-an-unsettling-encounter-walkthrough/" },
      { name: "Game8 (The Arisen's Shadow)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Arisens-Shadow" }
    ],
    evidence: "O encontro com Bermudo e a investigação de Allard são etapas diferentes. Game8 relata permissões distintas de fronteira conforme a decisão sobre Bermudo.",
    divergence: "Não confundir o efeito da escolha de Bermudo na permissão com pré-requisito universal da campanha.",
    confidence: "PROVÁVEL",
    proposal: "Matriz corrigida: v301 é The Arisen's Shadow & An Unsettling Encounter"
  },
  {
    id: "v305",
    content: "Após Um Encontro Perturbador, retorne a Melve para Lar é Onde o Coração Está (Missão secundária de clímax de Melve)",
    quests: "Lar é Onde o Coração Está / Home Is Where the Hearth Is",
    location: "Melve → Vila Harve",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 04 · Vernworth e Melve (Antes de aceitar a coroação de Brant)",
    prerequisites: "Concluir v202 (linha de Ulrika) e v301 (Um Encontro Perturbador)",
    risk: "Perdível (cancelada se O Banquete da Farsa for concluído)",
    sources: [
      { name: "PowerPyx (Home Is Where the Hearth Is)", url: "https://www.powerpyx.com/dragons-dogma-2-home-is-where-the-hearth-is-walkthrough/" },
      { name: "Game8 (Home Is Where the Hearth Is)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Home-Is-Where-the-Hearth-Is" }
    ],
    evidence: "Melve está dominada por guardas; subornar porteiro; entregar 4 espadas a Lennart; expulsar soldados e reencontrar Ulrika na praia de Harve.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Posicionado antes do Banquete com flag 'Perdível'"
  },
  {
    id: "v303",
    content: "Confira as missões pendentes antes da coroação (Checkpoint editorial pré-coroação)",
    quests: "Checkpoint Pré-Banquete da Farsa / Pre-Feast Checkpoint",
    location: "Estalagem Stardrop (Vernworth)",
    mainQuest: "O Banquete da Farsa",
    relation: "ANTES_DO_PONTO_SEM_RETORNO",
    moment: "Capítulo 04 · Vernworth e Melve (Antes de confirmar ida ao Banquete)",
    prerequisites: "Completar todas as tarefas pendentes de Melve e Vermund",
    risk: "Ponto sem Retorno (confirmar com Brant inicia o Banquete e cancela missões pendentes)",
    sources: [
      { name: "PowerPyx (Feast of Deception)", url: "https://www.powerpyx.com/dragons-dogma-2-feast-of-deception-walkthrough/" },
      { name: "Game8 (Feast of Deception)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Feast-of-Deception" }
    ],
    evidence: "Brant avisa formalmente: certifique-se de que não restam assuntos inacabados antes de comparecer à coroação.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: v303 é o Checkpoint Pré-Banquete (Ponto sem retorno)"
  },
  {
    id: "v304",
    content: "Conclua O Banquete da Farsa e receba Nação da Chama Luzente (Clímax de Vermund / Transição)",
    quests: "O Banquete da Farsa / Feast of Deception",
    location: "Castelo de Vernworth",
    mainQuest: "O Banquete da Farsa",
    relation: "REQUER",
    moment: "Capítulo 04 · Vernworth e Melve (Coroação)",
    prerequisites: "Confirmar com Brant após check-in de v303",
    risk: "Ponto de Transição da História",
    sources: [
      { name: "PowerPyx (Feast of Deception)", url: "https://www.powerpyx.com/dragons-dogma-2-feast-of-deception-walkthrough/" },
      { name: "Game8 (Feast of Deception)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Feast-of-Deception" }
    ],
    evidence: "Cutscene da coroação no castelo; falso soberano rejeitado; Brant entrega o Passe de Entrada na Fronteira de Battahl.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: v304 é a conclusão de O Banquete da Farsa"
  },
  {
    id: "v302",
    content: "Após O Banquete da Farsa, procure Wilhelmina (prazo de três dias se aceitar) (Missão individual secundária)",
    quests: "Uma Rosa com Espinhos / Every Rose Has Its Thorn",
    location: "Rose Chateau Bordelrie (Bairro Nobre de Vernworth)",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 04 · Vernworth e Melve (Após O Banquete da Farsa)",
    prerequisites: "Concluir O Banquete da Farsa; afinidade/visitas noturnas a Wilhelmina",
    risk: "Temporizada e Perdível (após aceitar ajudar, reúne provas contra Allard em até 3 dias)",
    sources: [
      { name: "PowerPyx (Every Rose Has Its Thorn)", url: "https://www.powerpyx.com/dragons-dogma-2-every-rose-has-its-thorn-walkthrough/" },
      { name: "Game8 (Every Rose Has Its Thorn)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Every-Rose-Has-Its-Thorn" }
    ],
    evidence: "Wilhelmina pede provas contra Allard; prazo estrito de 3 dias no jogo após assumir a investigação; recompensa e romance.",
    divergence: "Gatilho de afinidade vs noites decorridas varia entre fontes",
    confidence: "DIVERGENTE",
    proposal: "Matriz corrigida: v302 é Wilhelmina (Every Rose Has Its Thorn) com flags 'Temporizada' e 'Perdível'"
  },
  {
    id: "v306",
    content: "Depois do Banquete: aceite Um Véu de Finas Nuvens com Sven (Missão individual secundária)",
    quests: "Um Véu de Finas Nuvens / A Veil of Gossamer Clouds",
    location: "Aposentos de Sven (Castelo) → Laboratório de Bakbattahl",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 04 · Vernworth e Melve (Após O Banquete da Farsa)",
    prerequisites: "Concluir O Banquete da Farsa e ter falado com Sven",
    risk: "Atenção (investigar laboratório em Battahl antes de entregar a carta a Sven dá recompensa maior)",
    sources: [
      { name: "PowerPyx (A Veil of Gossamer Clouds)", url: "https://www.powerpyx.com/dragons-dogma-2-a-veil-of-gossamer-clouds-walkthrough/" },
      { name: "Game8 (A Veil of Gossamer Clouds)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Veil-of-Gossamer-Clouds" }
    ],
    evidence: "Sven entrega carta rasurada de Disa após a coroação; investigação leva ao laboratório proibido em Bakbattahl.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Posicionado sequencialmente após O Banquete da Farsa (v306)"
  },

  // --- FASE 5: BATTAHL ---
  {
    id: "b01",
    content: "Viaje a Battahl por Nação da Chama Luzente e atravesse a fronteira (Missão principal de travessia)",
    quests: "Nação da Chama Luzente / Nation of the Lambent Flame",
    location: "Cidade de Descanso da Fronteira → Bakbattahl",
    mainQuest: "Nação da Chama Luzente",
    relation: "REQUER",
    moment: "Capítulo 05 · Battahl (Entrada na nova região)",
    prerequisites: "Após O Banquete da Farsa, obter o passe de Brant; dependendo da escolha com Bermudo e raça do personagem pode ser necessária Máscara de Ferídeo em Ibrahim ou outra rota.",
    risk: "Atenção (passe de Beastren exige Máscara de Fera se o Nascen for humano; travessia em carruagem nobre é opcional)",
    sources: [
      { name: "PowerPyx (Nation of the Lambent Flame)", url: "https://www.powerpyx.com/dragons-dogma-2-nation-of-the-lambent-flame-walkthrough/" },
      { name: "Game8 (Nation of the Lambent Flame)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Nation-of-the-Lambent-Flame" }
    ],
    evidence: "PowerPyx e Game8 descrevem a permissão racial, máscara e travessia. Piedade entre Ladrões começa somente depois do portão, no lado Battahl.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Separar preparo antes do portão, travessia, desvio opcional na fronteira e viagem até Rockmouse."
  },
  {
    id: "b10",
    content: "Ao chegar a Bakbattahl, conclua De Volta a Battahl (Missão individual secundária)",
    quests: "De Volta a Battahl / Welcome to Battahl",
    location: "Bakbattahl (Taverna Wanderer's Haven)",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 05 · Battahl (Primeira chegada à capital)",
    prerequisites: "Chegar a Bakbattahl após Nação da Chama Luzente",
    risk: "Atenção (duelo corpo a corpo; se fugir sem lutar não conhece Raghnall)",
    sources: [
      { name: "PowerPyx (Welcome to Battahl)", url: "https://www.powerpyx.com/dragons-dogma-2-welcome-to-battahl-walkthrough/" },
      { name: "Game8 (Welcome to Battahl)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Welcome-to-Battahl" }
    ],
    evidence: "Roger e valentões cercam o Nascen; luta sem armas; Raghnall intervém, paga a aposta e apresenta a si mesmo.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido marco dedicado na chegada a Bakbattahl (b10)"
  },
  {
    id: "b02",
    content: "Execute as missões locais de Bakbattahl (marco que também registra desvio da fronteira)",
    quests: "Piedade entre Ladrões & Orações Ensombradas & Uma Proposta Venenosa / Mercy among Thieves, Shadowed Prayers, A Poisonous Proposal",
    location: "Cidade de Descanso da Fronteira (Piedade entre Ladrões) e Bakbattahl (Orações Ensombradas / Uma Proposta Venenosa)",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 05 · Battahl (Estadia inicial em Bakbattahl)",
    prerequisites: "Piedade entre Ladrões: atravessar o portão; as duas missões urbanas surgem após avançar Nação da Chama Luzente. São gatilhos diferentes.",
    risk: "Atenção: depois de iniciar a cerimônia com Menella em Orações Ensombradas, não adiar a identificação do assassino. O grupo não possui um prazo único.",
    sources: [
      { name: "PowerPyx (Mercy among Thieves)", url: "https://www.powerpyx.com/dragons-dogma-2-mercy-among-thieves-walkthrough/" },
      { name: "PowerPyx (Shadowed Prayers)", url: "https://www.powerpyx.com/dragons-dogma-2-shadowed-prayers-walkthrough/" },
      { name: "PowerPyx (A Poisonous Proposal)", url: "https://www.powerpyx.com/dragons-dogma-2-a-poisonous-proposal-walkthrough/" }
    ],
    evidence: "PowerPyx distingue início de Piedade entre Ladrões na fronteira e Orações Ensombradas na cerimônia matinal em Bakbattahl. A etapa da cerimônia pode falhar se abandonada.",
    divergence: "Marco agrupado; os links não corroboram simultaneamente todas as condições das três missões.",
    confidence: "PROVÁVEL",
    proposal: "Separar tarefas da travessia e da cidade; alerta contextual de urgência apenas na cerimônia."
  },
  {
    id: "b11",
    content: "Depois de De Volta a Battahl: Tensão na Estrada com Raghnall (Missão individual secundária)",
    quests: "Tensão na Estrada / Tensions on the Highroad",
    location: "Vernworth (Portão Norte) → Estrada Real de Battahl (Caverna Guerco)",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 05 · retorno agrupado a Vernworth e caminho de volta à fronteira",
    prerequisites: "Concluir b10 (De Volta a Battahl) com Raghnall",
    risk: "Atenção (escolha de lado entre Simon e Raghnall; pré-requisito para o duelo na Torre do Luar em p08)",
    sources: [
      { name: "PowerPyx (Tensions on the Highroad)", url: "https://www.powerpyx.com/dragons-dogma-2-tensions-on-the-highroad-walkthrough/" },
      { name: "Game8 (Tensions on the Highroad)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Tensions-on-the-Highroad" }
    ],
    evidence: "Simon aborda no portão norte de Vernworth para escoltar Ser Augustin; Raghnall embosca a carroça; fuga conjunta pela caverna.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido marco de retorno a Vernworth encadeado a Raghnall (b11)"
  },
  {
    id: "b12",
    content: "De volta a Vernworth: Uma Nobre Troca no baile (Missão individual secundária)",
    quests: "Uma Nobre Troca / A Noble Exchange",
    location: "Salão de Máscaras do Castelo de Vernworth à noite",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 05 · retorno agrupado a Vernworth (baile noturno)",
    prerequisites: "PowerPyx: janela após Nação da Chama Luzente e antes de Um Novo Chamado Divino. Game8: concluir Correspondência Mascarada antes do baile. Confira Sven caso não apareça.",
    risk: "Atenção (se for pego segurando o cajado roubado pelos guardas, é preso)",
    sources: [
      { name: "PowerPyx (A Noble Exchange)", url: "https://www.powerpyx.com/dragons-dogma-2-a-noble-exchange-walkthrough/" },
      { name: "Game8 (A Noble Exchange)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Noble-Exchange" }
    ],
    evidence: "Ambas descrevem baile em Vernworth; Game8 aponta Correspondência Mascarada como condição e PowerPyx cita somente a janela geral de campanha.",
    divergence: "Não há comprovação independente de que a condição adicional de Correspondência Mascarada seja universal; não reduzir a espera por noites a gatilho suficiente.",
    confidence: "DIVERGENTE",
    proposal: "Regra condicional explícita; missões da mesma viagem não são pré-requisitos entre si."
  },
  {
    id: "b03",
    content: "Proteja a família de Isaac em 'Ambição Cega' (Short-Sighted Ambition) (Missão individual com escolha irreversível)",
    quests: "Ambição Cega / Short-Sighted Ambition",
    location: "Bakbattahl (Farmácia de Isaac)",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 05 · Battahl (Durante estadia em Bakbattahl)",
    prerequisites: "Falar com Isaac na farmácia de Bakbattahl",
    risk: "Perdível (entregar grimório autêntico causa explosão mortal na família; entregar falsificação de Ibrahim salva a todos)",
    sources: [
      { name: "PowerPyx (Short-Sighted Ambition)", url: "https://www.powerpyx.com/dragons-dogma-2-short-sighted-ambition-walkthrough/" },
      { name: "Game8 (Short-Sighted Ambition)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Short-Sighted-Ambition" }
    ],
    evidence: "Isaac pede o segundo tomo; criar cópia 'On the Transit of Souls 2' em Ibrahim evita a morte irreversível da esposa e filha.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flag explícita 'Perdível' (b03)"
  },
  {
    id: "b04",
    content: "Desbloqueie o Lanceiro Místico e o Ilusionista (Marco agregador de 2 vocações)",
    quests: "Desbloqueio de Vocações: Lanceiro Místico & Ilusionista",
    location: "Melve/Torre do Dragão (Sigurd) & Santuário Reverente (Luz)",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 05 · Battahl (Exploração do deserto)",
    prerequisites: "Falar com Sigurd; falar com o espírito de Luz no templo",
    risk: "Nenhum",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "TrueAchievements (DD2 Vocations)", url: "https://www.trueachievements.com/game/Dragons-Dogma-2/achievements" }
    ],
    evidence: "Sigurd ensina Lanceiro Místico; Luz no Santuário Reverente ensina Ilusionista ao custo de conversa no templo.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (b04)"
  },
  {
    id: "b05",
    content: "Infiltre-se em 'A Carroça Fantasma' (The Phantom Oxcart) (Missão individual secundária)",
    quests: "A Carroça Fantasma / The Phantom Oxcart",
    location: "Vernworth (Estação de Carroças) → Portão da Fronteira de Battahl",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 05 · retorno agrupado a Vernworth, após chegar a Bakbattahl",
    prerequisites: "Concluir Nação da Chama Luzente, visitar Bakbattahl e retornar a Vernworth para ouvir os rumores",
    risk: "Perdível (seguir a pé ou atacar o cocheiro invalida a conquista 'Já Chegamos?')",
    sources: [
      { name: "PowerPyx (The Phantom Oxcart)", url: "https://www.powerpyx.com/dragons-dogma-2-the-phantom-oxcart-walkthrough/" },
      { name: "Game8 (The Phantom Oxcart)", url: "https://game8.co/games/Dragons-Dogma-2/archives/The-Phantom-Oxcart" }
    ],
    evidence: "Desequipar armas e armaduras; entrar na carroça como peão cativo; resistir aos golpes sem revidar até a travessia de Battahl.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: b05 é The Phantom Oxcart com flag 'Perdível'"
  },
  {
    id: "b08",
    content: "Investigue Sombras Trêmulas em Bakbattahl (Missão principal de investigação mística)",
    quests: "Sombras Trêmulas / Flickering Shadows",
    location: "Bakbattahl & Costa de Olhas",
    mainQuest: "Sombras Trêmulas",
    relation: "REQUER",
    moment: "Capítulo 05 · Battahl (História principal de Battahl)",
    prerequisites: "Concluir investigações iniciais de Battahl",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Flickering Shadows)", url: "https://www.powerpyx.com/dragons-dogma-2-flickering-shadows-walkthrough/" },
      { name: "Game8 (Flickering Shadows)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Flickering-Shadows" }
    ],
    evidence: "Seguir as visões do Pioneiro até a Enseada do Santuário; encontrar o Dragão de Cristal e o Forjado pelo Dragão.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal (b08)"
  },
  {
    id: "b06",
    content: "Segunda localização da Esfinge: 4 enigmas em ordem variável (Missão individual secundária)",
    quests: "Um Jogo de Espirituosidade (Fase 2: Fronteira) / A Game of Wits",
    location: "Santuário da Fronteira (Oeste de Battahl)",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 05 · Battahl (Após resolver os primeiros 5 enigmas)",
    prerequisites: "Concluir os 5 enigmas no Santuário da Montanha em v205",
    risk: "Perdível (enigmas de tentativa única; errar bloqueia baús na campanha)",
    sources: [
      { name: "PowerPyx (All Sphinx Riddles)", url: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/" },
      { name: "Game8 (Frontier Shrine Sphinx)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-Game-of-Wits" }
    ],
    evidence: "Enigmas da Memória, Competição, Diferenciação e Futilidade em ordem aleatória; levar Maurits até o vaso salva a Futilidade.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flag explícita 'Perdível' (b06)"
  },
  {
    id: "b062",
    content: "Derrote a Esfinge e obtenha a Pedra de Despertar Eterna (Conquista de combate místico)",
    quests: "Derrota da Esfinge / Sphinx Defeat & Reaper's Scorn",
    location: "Santuário da Fronteira (Battahl)",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 05 · Battahl (Após o 10º enigma)",
    prerequisites: "Concluir o 10º enigma; equipar Flecha da Ruína como Arqueiro",
    risk: "Atenção (disparar flecha antes que ela decole para obter a Chave da Sabedoria)",
    sources: [
      { name: "TrueAchievements (Reaper's Scorn)", url: "https://www.trueachievements.com/a429033/reapers-scorn-achievement" },
      { name: "PowerPyx (Sphinx Boss Guide)", url: "https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/" }
    ],
    evidence: "Atingir a Esfinge com a Unmaking Arrow impede sua fuga, derruba o baú dourado e entrega a Pedra de Despertar Eterna.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco de conquista (b062)"
  },
  {
    id: "b063",
    content: "Derrote a Medusa e obtenha uma Cabeça Preservada (Conquista de caça mítica)",
    quests: "Caçada à Medusa / A Gorgon's Head",
    location: "Ninho da Calamidade (Sudoeste de Battahl)",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 05 · Battahl (Exploração)",
    prerequisites: "Arma cortante afiada (Ladrão ou Guerreiro)",
    risk: "Atenção (decepar na 1ª barra de vida; cabeça apodrece fora do baú da estalagem)",
    sources: [
      { name: "Steam Community (Medusa Head Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3195173063" },
      { name: "PowerPyx (Trophy Guide)", url: "https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/" }
    ],
    evidence: "Decapitar a Medusa rapidamente antes de esgotar sua vida garante a Preserved Medusa Head intacta.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (b063)"
  },
  {
    id: "b07",
    content: "Explore cavernas até totalizar 50 para 'Turista' (Conquista cumulativa de exploração)",
    quests: "Conquista O Turista / The Tourist (50 Cavernas)",
    location: "Vermund e Battahl",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 05 · Battahl (Cumulativo)",
    prerequisites: "Descobrir 50 entradas de cavernas no mapa",
    risk: "Nenhum (cumulativo)",
    sources: [
      { name: "PowerPyx (All Cave Locations)", url: "https://www.powerpyx.com/dragons-dogma-2-all-cave-locations-tourist-trophy/" },
      { name: "TrueAchievements (The Tourist)", url: "https://www.trueachievements.com/a429038/the-tourist-achievement" }
    ],
    evidence: "Entrar em 50 cavernas distintas em qualquer ordem desbloqueia o troféu/conquista.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (b07)"
  },
  {
    id: "b09",
    content: "Complete Convergência no Santuário do Leito Marinho (Missão principal de revelação)",
    quests: "Convergência / Convergence",
    location: "Santuário do Leito Marinho (Ruínas Submersas)",
    mainQuest: "Convergência",
    relation: "REQUER",
    moment: "Capítulo 05 · Battahl (Clímax da história de Battahl)",
    prerequisites: "Concluir b08 (Sombras Trêmulas)",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Convergence Walkthrough)", url: "https://www.powerpyx.com/dragons-dogma-2-convergence-walkthrough/" },
      { name: "Game8 (Convergence Walkthrough)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Convergence" }
    ],
    evidence: "Ativar o elevador do santuário submerso; conversar com o rei fundador Rothais; receber a Lâmina da Perdição dos Deuses enfraquecida.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal (b09)"
  },

  // --- FASE 6: ILHA VULCÂNICA ---
  {
    id: "i02",
    content: "Desvio opcional: Torre do Sopro do Dragão no sudoeste de Battahl (Marco de combate e maestria)",
    quests: "Torre do Sopro do Dragão & Sigurd / Dragonsbreath Tower & Sigurd",
    location: "Torre do Sopro do Dragão (Sudoeste de Battahl)",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 06 · Ilha Vulcânica (Desvio antes de entrar na Gruta Drabnir)",
    prerequisites: "Acessar o cânion sudoeste de Battahl",
    risk: "Atenção (dragão infectado pode fugir se o combate for excessivamente longo)",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "PowerPyx (All Maisters)", url: "https://www.powerpyx.com/dragons-dogma-2-all-maisters-teachings-locations/" }
    ],
    evidence: "Sigurd ajuda a enfrentar o dragão no topo da torre; vitória garante o ensinamento supremo do Lanceiro Místico.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Posicionado antes da entrada na Ilha Vulcânica (i02 antes de i01)"
  },
  {
    id: "i01",
    content: "Atravesse a Gruta de Drabnir para a Ilha Vulcânica (Marco de travessia regional)",
    quests: "Travessia da Gruta de Drabnir / Drabnir's Grotto Passage",
    location: "Gruta de Drabnir → Ilha Vulcânica de Agamen",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 06 · Ilha Vulcânica (Acesso à ilha)",
    prerequisites: "Atravessar o túnel ao sul de Battahl",
    risk: "Atenção (inimigos de elite na gruta: quimera de magma, ciclopes)",
    sources: [
      { name: "Steam Community (Achievements)", url: "https://steamcommunity.com/stats/2054970/achievements" },
      { name: "PowerPyx (Trophy Guide)", url: "https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/" }
    ],
    evidence: "A travessia a pé da Gruta de Drabnir permite acessar a Ilha Vulcânica sem precisar do feitiço de abertura do portão sul.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (i01)"
  },
  {
    id: "i03",
    content: "Desbloqueie Arqueiro Mágico com Cliodhna e Gautstafr (Missão individual de vocação)",
    quests: "A Fonte do Contentamento / Put a Spring in Thy Step",
    location: "Estrada da Ilha Vulcânica → Acampamento da Ilha Vulcânica",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 06 · Ilha Vulcânica (Estrada da ilha)",
    prerequisites: "Encontrar Gautstafr com dor nas costas na estrada",
    risk: "Atenção (coletar 3 flores silvestres e escoltar Gautstafr até as termas sem deixá-lo morrer)",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "PowerPyx (Put a Spring in Thy Step)", url: "https://www.powerpyx.com/dragons-dogma-2-put-a-spring-in-thy-step-walkthrough/" }
    ],
    evidence: "Escolta de Gautstafr até as termas faz Cliodhna ensinar a vocação Arqueiro Mágico e seu ensinamento supremo.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (i03)"
  },
  {
    id: "i04",
    content: "Tome um banho nas fontes termais do acampamento (Conquista de atividade)",
    quests: "Conquista As Águas Curativas / The Rejuvenating Spring",
    location: "Acampamento da Ilha Vulcânica (Termas)",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 06 · Ilha Vulcânica (Acampamento)",
    prerequisites: "Pagar 100 G para entrar na terma",
    risk: "Nenhum",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "TrueAchievements (Rejuvenating Spring)", url: "https://www.trueachievements.com/a429037/the-rejuvenating-spring-achievement" }
    ],
    evidence: "Tomar banho na terma cura cicatrizes e lesões do peão e Nascen e desbloqueia a conquista.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (i04)"
  },
  {
    id: "i05",
    content: "Entregue 3 Licores de Lagarto a Lamond para Chefe de Guerra (Missão individual de vocação)",
    quests: "O Sábio Beberrão / The Sotted Sage",
    location: "Acampamento da Ilha Vulcânica (Entrada das Termas)",
    mainQuest: "Nenhuma",
    relation: "PARALELA",
    moment: "Capítulo 06 · Ilha Vulcânica (Termas)",
    prerequisites: "Conversar com Lamond sentado próximo à entrada das termas",
    risk: "Atenção (entregar 3 garrafas de Newt Liqueur)",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "PowerPyx (The Sotted Sage)", url: "https://www.powerpyx.com/dragons-dogma-2-the-sotted-sage-walkthrough/" }
    ],
    evidence: "Lamond bebe os licores e ensina a vocação Warfarer (Chefe de Guerra / Mestre de Todas as Armas).",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (i05)"
  },
  {
    id: "i06",
    content: "Resolva as missões de forja e afeto da ilha (Marco agregador de 2 secundárias)",
    quests: "A Lâmina Obtusa & Vontade Resistente, Forja Ardente / Dulled Steel, Cold Forge & Steeled Resolve, Blazing Forge",
    location: "Bakbattahl & Caverna da Montanha da Ilha Vulcânica",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 06 · Ilha Vulcânica (Reta final)",
    prerequisites: "Concluir reparo inicial de Brokkr/Sara em Bakbattahl",
    risk: "Atenção (Sara corre risco na forja vulcânica se a tocha for resfriada no percurso)",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "PowerPyx (Steeled Resolve, Blazing Forge)", url: "https://www.powerpyx.com/dragons-dogma-2-steeled-resolve-blazing-forge-walkthrough/" }
    ],
    evidence: "Resgatar Sara na forja vulcânica e levar a lâmina anã restaurada ao guarda Roman em Vernworth.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco de missões secundárias da ilha (i06)"
  },

  // --- FASE 7: CHECAGEM / GIGANTUS ---
  {
    id: "p01",
    content: "Checklist de conquistas cumulativas e combate (Marco agregador de checklist)",
    quests: "A Inspiração de um Escultor & Conquistas de Combate / A Case of Sculptor's Block & Checklist",
    location: "Bakbattahl & Mundo aberto",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 07 · Checagem / Gigantus (Antes de fechar a campanha)",
    prerequisites: "Revisar conquistas cumulativas pendentes",
    risk: "Atenção (usar cabeça de Medusa preservada na escultura de Fulvio garante estátua perfeita)",
    sources: [
      { name: "Steam Community (Achievements Roadmap)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "PowerPyx (A Case of Sculptor's Block)", url: "https://www.powerpyx.com/dragons-dogma-2-a-case-of-sculptors-block-walkthrough/" }
    ],
    evidence: "Checklist para fechar pendências de combate e estátua de Fulvio antes da marcha final de Gigantus.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (p01)"
  },
  {
    id: "p02",
    content: "Conclua os 16 preparos do Mestre do Churrasco (Conquista de culinária)",
    quests: "Mestre do Churrasco / The Barbecue-Maister",
    location: "Acampamentos do mundo aberto",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 07 · Checagem / Gigantus (Antes do clímax)",
    prerequisites: "Assar cada uma das 8 carnes de dia e de noite",
    risk: "Atenção (16 combinações exigem carnes apodrecidas e especiais)",
    sources: [
      { name: "PlayStation Trophies (The Barbecue-Maister)", url: "https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/the-barbecue-maister.html" },
      { name: "TrueAchievements (The Barbecue-Maister)", url: "https://www.trueachievements.com/a429035/the-barbecuemaister-achievement" }
    ],
    evidence: "Assar 8 tipos de carne de dia e de noite gera 16 cenas únicas de churrasco em acampamento.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (p02)"
  },
  {
    id: "p03",
    content: "Aprenda TODOS os 12 ensinamentos de maestria (Conquista de mestres)",
    quests: "Mestre dos Mestres / Master of the Maisters",
    location: "Vermund, Battahl e Ilha Vulcânica",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 07 · Checagem / Gigantus (Antes de Gigantus)",
    prerequisites: "Obter e USAR todos os 12 pergaminhos de maestria no inventário",
    risk: "Atenção (risco crítico de esquecer algum mestre antes da reta final; não é temporizada)",
    sources: [
      { name: "TrueAchievements (Master of the Maisters)", url: "https://www.trueachievements.com/a429012/master-of-the-maisters-achievement" },
      { name: "PowerPyx (All Maisters Teachings)", url: "https://www.powerpyx.com/dragons-dogma-2-all-maisters-teachings-locations/" }
    ],
    evidence: "São 10 vocações com 12 ensinamentos (Ladrão e Feiticeiro têm 2 cada); usar o pergaminho no inventário é obrigatório.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (p03), sem rotular falsamente como temporizada"
  },
  {
    id: "p04",
    content: "Última checagem antes de concluir Um Novo Chamado Divino (Checkpoint editorial pré-Gigantus)",
    quests: "Checkpoint Pré-Gigantus / Pre-Gigantus Checkpoint",
    location: "Bakbattahl",
    mainQuest: "Um Novo Chamado Divino",
    relation: "ANTES_DO_PONTO_SEM_RETORNO",
    moment: "Capítulo 07 · Checagem / Gigantus (Antes de entregar a espada)",
    prerequisites: "Reunir os 15 Cristais WLC",
    risk: "Ponto sem Retorno (entregar a espada a Phaesus dispara a marcha irreversível de Gigantus)",
    sources: [
      { name: "PushSquare (Update 3.2 Saves)", url: "https://www.pushsquare.com/news/2026/09/colossal-game-changing-dragons-dogma-2-patch-3-2-out-now-on-ps5" },
      { name: "GameSpot (Gigantus Guide)", url: "https://www.gamespot.com/gallery/dragons-dogma-2-gigantus-achievement-guide/2900-5209/" }
    ],
    evidence: "A entrega da espada potencializada aciona o avanço final da história; salvar na estalagem antes da marcha é crítico.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: p04 é a última checagem pré-Gigantus (Ponto sem retorno)"
  },
  {
    id: "p07",
    content: "Conclua Um Novo Chamado Divino antes da marcha do Gigantus (Missão principal de clímax)",
    quests: "Um Novo Chamado Divino / A New Godsway",
    location: "Laboratório de Bakbattahl (Ambrosius)",
    mainQuest: "Um Novo Chamado Divino",
    relation: "REQUER",
    moment: "Capítulo 07 · Checagem / Gigantus (História principal)",
    prerequisites: "Concluir Convergência (b09) e entregar 15 WLC",
    risk: "Atenção (risco crítico narrativo; não é temporizada)",
    sources: [
      { name: "PowerPyx (A New Godsway)", url: "https://www.powerpyx.com/dragons-dogma-2-a-new-godsway-walkthrough/" },
      { name: "Game8 (A New Godsway)", url: "https://game8.co/games/Dragons-Dogma-2/archives/A-New-Godsway" }
    ],
    evidence: "Ambrosius forja a Empowered Godsbane Blade; a marcha de Phaesus para o portão sul é acionada.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: p07 é a conclusão de Um Novo Chamado Divino"
  },
  {
    id: "p05",
    content: "Em O Guardião Gigantus, detenha o colosso a tempo (Missão principal e conquista)",
    quests: "O Guardião Gigantus / The Guardian Gigantus",
    location: "Estrada da Ilha Vulcânica → Costa de Agamen",
    mainQuest: "O Guardião Gigantus",
    relation: "REQUER",
    moment: "Capítulo 07 · Checagem / Gigantus (Marcha de Talos)",
    prerequisites: "Concluir p07 e abrir o grande portão",
    risk: "Temporizada e Perdível (conquista falha se Talos alcançar a muralha antes de cair)",
    sources: [
      { name: "GameSpot (Gigantus Achievement Guide)", url: "https://www.gamespot.com/gallery/dragons-dogma-2-gigantus-achievement-guide/2900-5209/" },
      { name: "TrueAchievements (Gigantus, I Hardly Knew Ye)", url: "https://www.trueachievements.com/a429009/gigantus-i-hardly-knew-ye-achievement" }
    ],
    evidence: "Destruir os cristais com balistas ou Flecha da Ruína antes que Gigantus cruze o desfiladeiro garante a conquista.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Matriz corrigida: p05 é O Guardião Gigantus com flags 'Temporizada' e 'Perdível'"
  },
  {
    id: "p08",
    content: "Durante O Guardião Gigantus: Confronto Final com Raghnall (Missão individual embutida e condicional)",
    quests: "Confronto Final / Clash and Conclusion",
    location: "Torre do Luar (Moonglint Tower - Ponte Suspensa Interna)",
    mainQuest: "O Guardião Gigantus",
    relation: "DURANTE",
    moment: "Capítulo 07 · Checagem / Gigantus (Subida da Torre do Luar)",
    prerequisites: "Ter concluído Tensões na Estrada Real (b11); condicional",
    risk: "Condicional (se b11 não foi feita ou Raghnall não aparecer, a história continua normalmente sem bloqueio)",
    sources: [
      { name: "PowerPyx (Clash and Conclusion)", url: "https://www.powerpyx.com/dragons-dogma-2-clash-and-conclusion-walkthrough/" },
      { name: "Game8 (Clash and Conclusion)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Clash-and-Conclusion" }
    ],
    evidence: "Raghnall intercepta o Nascen para um duelo 1x1 nas escadarias da Torre do Luar durante O Guardião Gigantus; não bloqueia a história se ausente.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Classificado como during ('Durante esta missão'); texto reescrito para não presumir bloqueio se ausente"
  },
  {
    id: "p06",
    content: "Conclua O Legado na Torre do Luar e decida o final (Missão principal de clímax do jogo-base)",
    quests: "O Legado / Legacy",
    location: "Topo da Torre do Luar → Arena do Dragão",
    mainQuest: "O Legado",
    relation: "REQUER",
    moment: "Capítulo 07 · Checagem / Gigantus (Clímax da campanha)",
    prerequisites: "Subir ao topo da torre após Gigantus / duelo de Raghnall",
    risk: "Ponto de Decisão dos Finais (atacar o Dragão ou sacrificar o ente querido)",
    sources: [
      { name: "PowerPyx (Legacy Walkthrough)", url: "https://www.powerpyx.com/dragons-dogma-2-legacy-walkthrough/" },
      { name: "Game8 (Legacy Walkthrough)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Legacy" }
    ],
    evidence: "Encontrar Phaesus no topo; o Dragão desce; decisão entre lutar ou aceitar o trono convencional.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Texto atualizado para prosseguir quer p08 tenha ocorrido ou não"
  },

  // --- FASE 8: FINAIS E MUNDO DESANCORADO ---
  {
    id: "u01",
    content: "Conquiste o final comum no trono ('Paz') (Final convencional da campanha)",
    quests: "Final Comum: Paz / Peace Ending",
    location: "Castelo de Vernworth (Sala do Trono)",
    mainQuest: "O Legado",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Final Comum)",
    prerequisites: "Derrotar o Dragão na arena e sentar no trono",
    risk: "Atenção (não iniciar Novo Jogo+ se quiser entrar no Mundo Desancorado no mesmo ciclo)",
    sources: [
      { name: "PowerPyx (All Endings Guide)", url: "https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/" },
      { name: "GameSpot (True Ending Guide)", url: "https://www.gamespot.com/gallery/dragons-dogma-2-true-ending-unmoored-world-guide/2900-5194/" }
    ],
    evidence: "Sentar no trono durante os créditos desbloqueia Paz; falar com o Pioneiro permite retornar ao voo do Dragão.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (u01)"
  },
  {
    id: "u02",
    content: "Entre no Mundo Desancorado ('Dogma do Dragão 2') (Transição para o pós-jogo verdadeiro)",
    quests: "Entrada no Mundo Desancorado / The Unmoored World Entry",
    location: "Voo nas costas do Dragão",
    mainQuest: "Nenhuma",
    relation: "REQUER",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Verdadeiro Clímax)",
    prerequisites: "Usar a Empowered Godsbane Blade no coração sob o peito do Dragão em pleno voo",
    risk: "Ponto de Entrada no Pós-Jogo",
    sources: [
      { name: "PowerPyx (Trophy Guide & Roadmap)", url: "https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/" },
      { name: "Game8 (How to Enter Unmoored World)", url: "https://game8.co/games/Dragons-Dogma-2/archives/449759" }
    ],
    evidence: "Usar a espada no coração do Nascen quebra o ciclo e mergulha o mundo no mar sem água.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal de entrada (u02)"
  },
  {
    id: "u03",
    content: "Recupere seu Peão Principal no laboratório de Bakbattahl (Missão principal do Mundo Desancorado)",
    quests: "Destinos Separados / Dreams Apart",
    location: "Bakbattahl (Laboratório de Pesquisa de Magia Proibida)",
    mainQuest: "Destinos Separados",
    relation: "REQUER",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Primeira etapa no pós-jogo)",
    prerequisites: "Estar no Mundo Desancorado",
    risk: "Atenção (peão fica indisponível até o resgate com Phaesus)",
    sources: [
      { name: "PowerPyx (Dreams Apart)", url: "https://www.powerpyx.com/dragons-dogma-2-dreams-apart-walkthrough/" },
      { name: "Game8 (Dreams Apart)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Dreams-Apart" }
    ],
    evidence: "Encontrar Phaesus no laboratório liberta o Peão Principal de sua possessão e restaura a equipe completa.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco principal (u03)"
  },
  {
    id: "u04",
    content: "Conclua as cinco missões de evacuação do Mundo Desancorado (Marco de 5 missões de evacuação)",
    quests: "Átrios da Primeira Aurora (5 Evacuações) / Halls of the First Dawn",
    location: "Vernworth, Bakbattahl, Jardim Sagrado, Acampamento Vulcânico, Local de Escavação",
    mainQuest: "Átrios da Primeira Aurora",
    relation: "PARALELA",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Evacuações das cidades)",
    prerequisites: "Resgatar o Peão em u03 e falar com Rothais no Santuário do Leito Marinho",
    risk: "Temporizada e Perdível (névoa vermelha avança por dias de descanso se os feixes periféricos não forem contidos)",
    sources: [
      { name: "PowerPyx (Halls of the First Dawn)", url: "https://www.powerpyx.com/dragons-dogma-2-halls-of-the-first-dawn-walkthrough/" },
      { name: "Game8 (Halls of the First Dawn)", url: "https://game8.co/games/Dragons-Dogma-2/archives/Halls-of-the-First-Dawn" }
    ],
    evidence: "Cinco evacuações independentes: Sven em Vernworth, Menella/Nadinia em Bakbattahl, Taliesin/Doireann no Jardim, Ernesto no Acampamento e Henrique na Escavação.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flags explícitas 'Temporizada' e 'Perdível'"
  },
  {
    id: "u06",
    content: "Reative o Gigantus no Mundo Desancorado ('Eu, Talos') (Missão individual secundária)",
    quests: "Quando as Vontades São Conflituantes / When Wills Collide - 'Eu, Talos'",
    location: "Praia da Ilha Vulcânica",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Antes dos feixes finais)",
    prerequisites: "Aproximar-se dos destroços caídos de Talos com o Peão Principal",
    risk: "Nenhum",
    sources: [
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" },
      { name: "TrueAchievements (I, Talos Achievement)", url: "https://www.trueachievements.com/a429010/i-talos-achievement" }
    ],
    evidence: "O Peão Principal assume o colosso caído e destrói 2 chefes do feixe da praia automaticamente.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como marco de secundária/conquista (u06)"
  },
  {
    id: "u05",
    content: "Enfrente os feixes de prova sem ativar o feixe final (Marco de provas dracônicas)",
    quests: "A Missão dos Eruditos & Feixes de Prova / A Scholarly Pursuit & Trials",
    location: "Vernworth, Bakbattahl, Jardim Sagrado e Templo Abissal",
    mainQuest: "A Missão dos Eruditos",
    relation: "PARALELA",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Contenção da névoa)",
    prerequisites: "Interagir com os feixes vermelhos periféricos",
    risk: "Perdível (não ativar o feixe vermelho final do Santuário antes das demais tarefas)",
    sources: [
      { name: "PowerPyx (All Endings & Trials)", url: "https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/" },
      { name: "Game8 (Unmoored World Beacons)", url: "https://game8.co/games/Dragons-Dogma-2/archives/449759" }
    ],
    evidence: "Derrotar os chefes dracônicos de cada feixe contém a expansão da névoa vermelha; feixe final encerra o ciclo.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido com flag explícita 'Perdível' (u05)"
  },
  {
    id: "u07",
    content: "Compre a lendária espada 'Dogma do Dragão' (Atividade comercial de ponta)",
    quests: "Espada Dogma do Dragão / Dragon's Dogma Weapon",
    location: "Santuário do Leito Marinho (Forjado pelo Dragão)",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Com WLC acumulados)",
    prerequisites: "Ter 110 Cristais da Vida da Serpe (WLC)",
    risk: "Nenhum",
    sources: [
      { name: "PowerPyx (Trophy Guide & Roadmap)", url: "https://www.powerpyx.com/dragons-dogma-2-trophy-guide-roadmap/" },
      { name: "Steam Community (Achievements Guide)", url: "https://steamcommunity.com/sharedfiles/filedetails/?id=3264648992" }
    ],
    evidence: "Comprar a espada Dragon's Dogma no inventário especial do Forjado pelo Dragão.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (u07)"
  },
  {
    id: "u08",
    content: "Encerre o ciclo pelo feixe final ('Encerramento') (Ponto sem retorno absoluto da campanha)",
    quests: "Feixe Vermelho Final: Encerramento / Closure Ending",
    location: "Santuário do Leito Marinho",
    mainQuest: "Feixe Final",
    relation: "ANTES_DO_PONTO_SEM_RETORNO",
    moment: "Capítulo 08 · Finais e Mundo Desancorado (Último ato absoluto)",
    prerequisites: "Concluir as evacuações e provas desejadas",
    risk: "Perdível e Ponto sem Retorno (Modo Casual bloqueia a conquista; ativa o clímax definitivo)",
    sources: [
      { name: "Steam Community (Achievements)", url: "https://steamcommunity.com/stats/2054970/achievements" },
      { name: "PowerPyx (All Endings Guide)", url: "https://www.powerpyx.com/dragons-dogma-2-all-endings-guide/" }
    ],
    evidence: "Interagir com o feixe vermelho final do Santuário dispara o clímax, caminhada pelas asas do dragão e quebra do ciclo.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido como Ponto sem Retorno absoluto (u08)"
  },

  // --- FASE 9: DARK ARISEN ---
  {
    id: "d01",
    content: "Consulte as conquistas de Dark Arisen (Marco de referência da expansão)",
    quests: "Expansão Dark Arisen / Dark Arisen Expansion",
    location: "Consulta / Modo Referência",
    mainQuest: "Nenhuma",
    relation: "OPCIONAL_NA_ROTA",
    moment: "Capítulo 09 · Dark Arisen (Consulta)",
    prerequisites: "Ter o conteúdo instalado",
    risk: "Nenhum",
    sources: [
      { name: "PC Gamer (Dark Arisen Coverage)", url: "https://www.pcgamer.com/games/rpg/dragons-dogma-2-how-to-start-dark-arisen/" },
      { name: "Steam Community (Achievements)", url: "https://steamcommunity.com/stats/2054970/achievements" }
    ],
    evidence: "Seis conquistas de expansão separadas do catálogo do jogo-base para consulta.",
    divergence: "Nenhuma",
    confidence: "CORROBORADO",
    proposal: "Mantido na categoria exploration (d01)"
  }
];

// Uma URL para a missão A e outra para a missão B NÃO corroboram todas
// as afirmações de um marco agregador. A verificação individual ainda está aberta.
const COMPOSITE_FACTS_UNAUDITED = new Set([
  'm02', 'm03', 'm05', 'v102', 'v103', 'v112', 'v201', 'v301', 'b02', 'u04'
]);
for (const item of matrixData) {
  if (COMPOSITE_FACTS_UNAUDITED.has(item.id) && item.confidence === 'CORROBORADO') {
    item.confidence = 'PROVÁVEL';
    item.divergence = [item.divergence !== 'Nenhuma' ? item.divergence : '',
      'Marco agregador: fontes não comprovam individualmente todas as missões e condições agrupadas.']
      .filter(Boolean).join(' ');
  }
}

// A matriz acompanha a ordem real dos dados; não manter uma segunda lista manual divergente.
const stages = PHASES.flatMap(p => p.events);
const stageOrder = new Map(stages.map((event, index) => [event.id, index]));
matrixData.sort((a, b) => (stageOrder.get(a.id) ?? Infinity) - (stageOrder.get(b.id) ?? Infinity));
// Verify 1:1 match with stages
if (matrixData.length !== stages.length) {
  throw new Error(`Data length mismatch: matrixData has ${matrixData.length}, stages has ${stages.length}`);
}
for (let i = 0; i < stages.length; i++) {
  if (matrixData[i].id !== stages[i].id) {
    throw new Error(`ID mismatch at index ${i}: expected ${stages[i].id}, got ${matrixData[i].id}`);
  }
}
console.log('All 72 matrix entries verified against roadmapData PHASES!');

// Build markdown
let md = `# Matriz de Evidências — Auditoria Cronológica e Classificação Visual da Jornada (P0)

**Data da Auditoria:** 14/10/2026  
**Repositório:** \`dd2\` (\`https://github.com/Umbraeon/dd2\`)  
**Base original da auditoria:** \`audit/jornada-cronologia-p0-20261014\` (matriz sincronizada com PHASES atual)  
**Responsável Técnico:** Executor técnico (Gemini/Antigravity)  
**Supervisor:** Head de Produto e Engenharia (ChatGPT)  
**Prioridade:** P0 — Exatidão editorial, honestidade factual e confiabilidade do guia  

---

## 1. Princípios e Regras de Rigor Factual

Em estrito cumprimento à **REGRA FUNDAMENTAL: NÃO INVENTAR**:

1. **Honestidade Absoluta quanto aos Níveis de Confiança:**
   - **VALIDADO EM GAMEPLAY (0 registros):** Reservado EXCLUSIVAMENTE para quando existir comprovação direta de gameplay próprio reproduzido, vídeo com timestamp verificado ou documentação de teste in-game. Leituras de walkthroughs externos (PowerPyx, Game8, etc.) **NÃO constituem teste direto de jogo**. Como esta auditoria foi realizada por pair-programming em ambiente de código e documentação sem execução simultânea do executável do jogo, **nenhuma etapa recebeu o selo 'VALIDADO EM GAMEPLAY'**.
   - **CORROBORADO:** Atribuído somente quando duas ou mais fontes verdadeiramente independentes comprovam especificamente o gatilho, a mecânica ou a relação cronológica. Cada link deve ser acompanhado da indicação explícita do fato que sustenta.
   - **PROVÁVEL:** Quando há evidência parcial sólida (ex.: uma fonte de alta reputação, ou dependência de variáveis de ciclos e noites), sem confirmação cruzada independente suficiente.
   - **DIVERGENTE:** Quando fontes confiáveis de mercado apresentam regras incompatíveis (ex.: o gatilho exato do ataque do dragão em Melve ou as noites para Wilhelmina). A incerteza é formalmente documentada, orientando o jogador a agir de modo preventivo sem alegar certeza indevida.
   - **NÃO VERIFICADO:** Quando a mecânica não possui respaldo factual suficiente.

2. **Separação Categórica entre Natureza da Etapa e Grau de Risco:**
   - **História Principal (\`main\`):** Marcos obrigatórios de progressão da campanha.
   - **Missão Secundária (\`side\`):** Conteúdos opcionais com narrativa própria.
   - **Durante esta Missão (\`during\`):** Encontros, submissões ou embates que ocorrem no percurso de outra missão (ex.: *Intruso de um Olho Só* durante *No Rastro do Dragão*; *Confronto Final* durante *O Guardião Gigantus*).
   - **Exploração / Conquista (\`exploration\`):** Atividades de mundo aberto, habitação, vocações e tarefas livremente adiáveis.
   - **Ponto sem Retorno (\`point_of_no_return\`):** Transições narrativas irreversíveis que cancelam conteúdos prévios.
   - **Riscos Específicos:**
     - **Temporizada:** Existe limite temporal comprovado em dias ou descansos (ex.: Rodge em *A Presa da Alcateia*, Accardo em *Provações de um Novo Recruta*, Gregor em *Até que a Morte Nos Separe*, Wilhelmina em *Uma Rosa com Espinhos*).
     - **Perdível:** Conteúdo que pode ser permanentemente perdido por avanço de história ou decisão irreversível.
     - **Atenção:** Aviso editorial importante, sem afirmar falsamente prazo temporal ou perda se isso não foi comprovado.

3. **Marcos Condicionais e Não Bloqueio da Campanha:**
   - Encontros opcionais ou condicionais (como *Intruso de um Olho Só* e o duelo de Raghnall em *Confronto Final*) são orientados sem pressuposição obrigatória. Se o jogador contornou o combate ou não cumpriu a cadeia prévia, a rota de campanha continua perfeitamente desimpedida.

---

## 2. Auditoria Detalhada do Caso Inicial: Intruso de um Olho Só (One-Eyed Interloper)

1. **Em que ponto de 'No Rastro do Dragão' o jogador encontra a situação do ciclope?**
   - **Constatação factual:** Ocorre no meio da estrada bloqueada por pedregulhos entre Melve e Vernworth, em uma garganta rochosa onde a água é represada por uma barragem natural. Acontece durante a execução do objetivo de escolta de Ser Gregor em *No Rastro do Dragão* (*In Dragon's Wake*).
2. **O encontro é obrigatório, opcional ou condicionado?**
   - **Constatação factual:** O combate na estrada é o evento padrão se o jogador acompanhar Gregor a pé. Contudo, o registro formal de *Intruso de um Olho Só* (*One-Eyed Interloper*) no histórico de missões concluídas é condicionado: se o jogador viajar sozinho sem Gregor, quebrar a barreira antes do diálogo ou contornar as montanhas por trilhas secundárias, o encontro com Ser Gregor é contornado e a submissão não é registrada.
3. **Como deve ser representado no Compêndio?**
   - **Solução implementada:** Possui ficha individual de missão na Consulta (\`one_eyed_interloper\`) para integridade com os arquivos do jogo. Na Jornada, está vinculado ao marco dedicado \`m09\`, classificado com relação \`DURANTE\` e categoria visual **'Durante esta missão'** (\`journeyCategory: 'during'\`), situado entre a partida de Melve (\`m08\`) e a chegada a Vernworth (\`v101\`).
4. **O jogador pode retornar e executá-la depois?**
   - **Constatação factual:** **NÃO.** Após entrar em Vernworth e concluir *No Rastro do Dragão* com o Capitão Brant, o evento da escolta inicial de Gregor não se repete.
5. **Integração sem pressuposições obrigatórias:**
   - A etapa \`v101\` foi reescrita para não assumir que o ciclope foi necessariamente derrotado em \`m09\`. Se o jogador contornou a barragem ou não obteve o registro no diário, a campanha continua normalmente rumo a Vernworth e a Brant sem qualquer bloqueio.

---

## 3. Auditoria Detalhada do Caso Raghnall: Confronto Final (Clash and Conclusion)

1. **Relação Narrativa e Contexto:**
   - Ocorre na subida interna da Torre do Luar (*Moonglint Tower*) em uma ponte suspensa, durante os acontecimentos de *O Guardião Gigantus* (*The Guardian Gigantus*).
2. **Dependência Prévia e Caráter Condicional:**
   - Raghnall só bloqueia o Nascen para o duelo 1 contra 1 se o jogador tiver completado previamente *De Volta a Battahl* (\`b10\`) e *Tensão na Estrada* (\`b11\`).
   - Se a cadeia não foi feita, Raghnall **não aparece**.
3. **Não Bloqueio da Campanha:**
   - As instruções de \`p08\` e \`p06\` foram reescritas com linguagem explícita: caso Raghnall não intercepte o Nascen, a campanha **NÃO está bloqueada**. O jogador deve simplesmente avançar diretamente para o topo da torre em *O Legado* (\`p06\`), deixando a etapa \`p08\` sem marcar ou como adiada.

---

## 4. Matriz Completa de Evidências (72 Marcos Reais de \`src/data/roadmapData.ts\`)

| ID | Título / Conteúdo no Compêndio | Missões do jogo cobertas (PT-BR / EN) | Local | Missão principal relacionada | Tipo de relação | Momento recomendado | Pré-requisitos | Risco de perda e temporização | Fontes (URLs diretas) | Evidência factual | Divergências conhecidas | Grau de confiança | Alteração proposta |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
`;

for (const row of matrixData) {
  const sourcesStr = row.sources.map(s => `[${s.name}](${s.url})`).join('<br>');
  md += `| \`${row.id}\` | ${row.content} | ${row.quests} | ${row.location} | ${row.mainQuest} | \`${row.relation}\` | ${row.moment} | ${row.prerequisites} | ${row.risk} | ${sourcesStr} | ${row.evidence} | ${row.divergence} | **${row.confidence}** | ${row.proposal} |\n`;
}

md += `
---

## 5. Relação de Erros Documentais Corrigidos e Afirmações Reclassificadas

A versão anterior da matriz apresentava graves descompassos entre os identificadores do código e as missões documentadas na tabela. A tabela abaixo sintetiza os principais erros corrigidos nesta revisão:

| ID | Versão Falha Anterior da Matriz | Conteúdo Real em \`PHASES\` (Branch do PR #62) | Diagnóstico e Ação de Correção |
|---|---|---|---|
| \`v105\` | Atribuía *The Heel of History* | *Adquira sua própria residência em Vernworth* (*A Place to Call Home*) | Erro de mapeamento. Reassociado à missão de habitação de Mildred (20.000 G). |
| \`v107\` | Atribuía *A Place to Call Home* | *Retorne a Melve: Revinda da Calamidade* (*Readvent of Calamity*) | Erro de mapeamento. Reassociado ao alerta de ataque do dragão em Melve com flag 'Perdível'. |
| \`v202\` | Atribuía *Readvent of Calamity* isolada | *Acompanhe Ulrika em Melve e Harve* (*Readvent of Calamity* & *Trouble on the Cape*) | Corrigido para refletir o arco completo de Ulrika e Harve. |
| \`v204\` | Atribuía *Um Encontro Inquietante* | *Tente a ponte improvisada com ciclope no vão do desfiladeiro* (*Cyclops Abridged*) | Erro grave de mapeamento. Reassociado à conquista da ponte de ciclope. |
| \`v206\` | Atribuía *Checkpoint de Feast of Deception* | *Visite Myrddin na Cidade de Descanso da Fronteira e coordene os grimórios* | Erro grave de mapeamento. Reassociado ao mestre Myrddin e entrega de cópias. |
| \`v301\` | Atribuía *O Banquete da Farsa* | *Conclua Uma Sombra à Espreita e Um Encontro Perturbador* | Erro de inversão cronológica. Reassociado a Bermudo e à sala secreta de Allard. |
| \`v303\` | Atribuía *A Santa dos Cortiços* | *Confira as missões pendentes antes da coroação* (*Pre-Feast Checkpoint*) | Erro grave de mapeamento. Reassociado ao checkpoint real de Ponto sem Retorno pré-coroação. |
| \`v304\` | Atribuía *Orações Ensombradas* | *Conclua O Banquete da Farsa e receba Nação da Chama Luzente* | Erro grave de mapeamento. Reassociado ao encerramento de O Banquete da Farsa. |
| \`v302\` | Atribuía *Trouble on the Cape* | *Após O Banquete da Farsa, procure Wilhelmina* (*Every Rose Has Its Thorn*) | Erro grave de mapeamento. Reassociado a Wilhelmina com prazo estrito de 3 dias. |
| \`b02\` | Atribuía tarefas genéricas | *Execute as missões locais de Bakbattahl* (*Mercy among Thieves*, *Shadowed Prayers*, *A Poisonous Proposal*) | Marco agregador documentalmente explicitado. |
| \`b05\` | Atribuía *Off the Pilfered Path* | *Infiltre-se em 'A Carroça Fantasma'* (*The Phantom Oxcart*) | Erro de mapeamento. Reassociado à Carroça Fantasma com flag 'Perdível'. |
| \`p04\` | Atribuía *O Guardião Gigantus* | *Última checagem antes de concluir Um Novo Chamado Divino* | Erro de mapeamento. Reassociado ao checkpoint pré-Gigantus. |
| \`p07\` | Atribuía *Checkpoint antes de Um Novo Chamado Divino* | *Conclua Um Novo Chamado Divino antes da marcha do Gigantus* | Erro de mapeamento. Reassociado à conclusão de Um Novo Chamado Divino. |
| \`p05\` | Atribuía *Decisão Final: Enfrente o Dragão* | *Em O Guardião Gigantus, detenha o colosso a tempo* | Erro de mapeamento. Reassociado à marcha de Gigantus com flags 'Temporizada' e 'Perdível'. |

### Reclassificação dos Níveis de Confiança

- **10 entradas reclassificadas de 'VALIDADO EM GAMEPLAY' para 'CORROBORADO':** Nenhuma entrada na matriz afirma ter sido validada in-game nesta sessão de pair-programming. Walkthroughs de terceiros são evidências documentais e sustentam o status \`CORROBORADO\`, nunca gameplay direto.
- **Limitação de evidências:** O número de links por linha não demonstra que cada fato de marcos agregadores tenha duas confirmações independentes. Os registros devem ser reavaliados por afirmação, e não apenas pela contagem de URLs.
- **Entradas classificadas como 'PROVÁVEL' ou 'DIVERGENTE':** Casos como \`b12\` (*Uma Nobre Troca*, dependente de noites de baile) permanecem como \`PROVÁVEL\`, e \`v107\` / \`v302\` (gatilhos de Melve e Wilhelmina) permanecem como \`DIVERGENTE\`, sem falsa certeza.

---

## 6. Lista de Informações que Continuam Não Verificadas (Incertezas Preservadas)

1. **Gatilho Universal do Dragão em Melve (\`v107\` / *Readvent of Calamity*):** Fontes divergem sobre o número exato de dias ou missões de Brant necessárias para acionar o ataque do dragão infectado. O guia instrui a verificar preventivamente Melve antes de aceitar a coroação, sem assegurar um gatilho universal de calendário.
2. **Gatilho de Ativação de Wilhelmina (\`v302\` / *Every Rose Has Its Thorn*):** Há divergência entre exigência de presentes diários para afinidade versus contagem de noites após *O Conspirador Mascarado*. A nota mantém a recomendação de aumentar a afinidade e adverte com precisão sobre o prazo estrito de 3 dias corridos após aceitar a tarefa.
3. **Registro formal de Intruso de um Olho Só (\`m09\`):** A presença do ciclope na estrada durante a escolta é fato confirmado, mas a ativação da entrada formal no diário do jogo caso o jogador contorne o bloqueio ou viaje sem Gregor não é universal. A nota de \`v101\` assegura que a campanha principal continua normalmente caso o evento não tenha sido registrado.
4. **Aparição Noturna do Ladrão no Baile (\`b12\` / *A Noble Exchange*):** Fontes documentam que o nobre com o cajado roubado surge em bailes após o acesso a Battahl, mas a noite exata pode variar entre instâncias do jogo.
`;

fs.writeFileSync('./docs/audit/journey-quest-chronology-evidence-matrix-2026-10-14.md', md, 'utf-8');
console.log('Successfully wrote journey-quest-chronology-evidence-matrix-2026-10-14.md with 72 validated entries!');
