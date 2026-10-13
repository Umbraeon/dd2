import { DD2MapMarker } from '../types/independentMap';
import { worldToMapPixel } from '../utils/mapCoordinates';

/**
 * Marcadores exploratórios fornecidos pelo Executor B (B01).
 * As posições e vínculos missão/NPC ainda NÃO foram validados por auditoria independente.
 * Nenhum marcador deve ser promovido a VERIFIED sem evidência primária individual.
 */
export const INDEPENDENT_MAP_MARKERS: readonly DD2MapMarker[] = [
  // --- MISSÕES (QUESTS) ---
  {
    id: 'quest-in-dragons-wake',
    type: 'quest',
    title: 'Na Trilha do Dragão (In Dragon\'s Wake)',
    originalTitle: 'In Dragon\'s Wake',
    region: 'Vermund',
    worldPosition: { x: 482.38, y: 37.27, z: -1024.73 },
    mapPosition: worldToMapPixel({ x: 482.38, y: 37.27, z: -1024.73 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3508)',
    verification: 'UNVERIFIED',
    guideId: 'in_dragons_wake',
    description: 'Encontro com o Capitão Brant no Portão Sul e início do avanço oficial em Vermund.',
    category: 'Missão Principal',
    icon: 'Compass'
  },
  {
    id: 'quest-chilling-tidings',
    type: 'quest',
    title: 'Notícias Congelantes (Chilling Tidings)',
    originalTitle: 'Chilling Tidings',
    region: 'Battahl',
    worldPosition: { x: -7.75, y: 94.96, z: -2050.64 },
    mapPosition: worldToMapPixel({ x: -7.75, y: 94.96, z: -2050.64 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3510 / qu040010)',
    verification: 'UNVERIFIED',
    guideId: 'chilling_tidings',
    description: 'Pousada do Shakir em Bakbattahl. Ponto de repouso e transição para o voo de grifo.',
    category: 'Missão de Expansão (DLC)',
    icon: 'Sparkles'
  },
  {
    id: 'quest-caged-magistrate',
    type: 'quest',
    title: 'O Magistrado Enjaulado (The Caged Magistrate)',
    originalTitle: 'The Caged Magistrate',
    region: 'Vermund',
    worldPosition: { x: -3415.80, y: 94.11, z: -2051.96 },
    mapPosition: worldToMapPixel({ x: -3415.80, y: 94.11, z: -2051.96 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3502)',
    verification: 'UNVERIFIED',
    guideId: 'the_caged_magistrate',
    description: 'Acesso às masmorras do Castelo e encontro secreto com Waldhar.',
    category: 'Missão de Brant',
    icon: 'Key'
  },
  {
    id: 'quest-monster-culling',
    type: 'quest',
    title: 'Abate de Monstros (Monster Culling)',
    originalTitle: 'Monster Culling',
    region: 'Vermund',
    worldPosition: { x: 417.36, y: 36.14, z: -1017.49 },
    mapPosition: worldToMapPixel({ x: 417.36, y: 36.14, z: -1017.49 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3827)',
    verification: 'UNVERIFIED',
    guideId: 'monster_culling',
    description: 'Combate aos sauriens na Caverna da Tempestade e libertação dos aldeões em Harve.',
    category: 'Missão de Brant',
    icon: 'Shield'
  },
  {
    id: 'quest-game-of-wits',
    type: 'quest',
    title: 'Jogo de Sagacidade — Santuário da Montanha',
    originalTitle: 'A Game of Wits',
    region: 'Vermund',
    worldPosition: { x: -3399.57, y: 240.03, z: -2907.25 },
    mapPosition: worldToMapPixel({ x: -3399.57, y: 240.03, z: -2907.25 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3500)',
    verification: 'UNVERIFIED',
    guideId: 'a_game_of_wits',
    description: 'Localização dos primeiros 5 enigmas da Esfinge no cume das montanhas do norte.',
    category: 'Missão de Enigma',
    icon: 'HelpCircle'
  },

  // --- NPCS RELEVANTES ---
  {
    id: 'npc-captain-brant',
    type: 'npc',
    title: 'Capitão Brant (Stardrop Inn)',
    originalTitle: 'Captain Brant',
    region: 'Vermund',
    worldPosition: { x: 485.32, y: 37.26, z: -1021.57 },
    mapPosition: worldToMapPixel({ x: 485.32, y: 37.26, z: -1021.57 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3509)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Comandante da guarda leal ao Nascen. Ponto de encontro noturno na Estalagem Gota Estelar.',
    category: 'Aliado Principal',
    icon: 'User'
  },
  {
    id: 'npc-shakir-innkeeper',
    type: 'npc',
    title: 'Shakir (Estalajadeiro de Bakbattahl)',
    originalTitle: 'Shakir',
    region: 'Battahl',
    worldPosition: { x: -10.50, y: 95.10, z: -2048.00 },
    mapPosition: worldToMapPixel({ x: -10.50, y: 95.10, z: -2048.00 }),
    source: 'EXTRACTED_PAK_25290080 (qu040010_log)',
    verification: 'UNVERIFIED',
    guideId: 'chilling_tidings',
    description: 'Proprietário da pousada mais movimentada de Bakbattahl, elo inicial da jornada glacial.',
    category: 'Comerciante / Pousada',
    icon: 'User'
  },
  {
    id: 'npc-wilhelmina',
    type: 'npc',
    title: 'Wilhelmina (Castelo Rosa)',
    originalTitle: 'Wilhelmina',
    region: 'Vermund',
    worldPosition: { x: 420.00, y: 45.00, z: -1080.00 },
    mapPosition: worldToMapPixel({ x: 420.00, y: 45.00, z: -1080.00 }),
    source: 'EDITORIAL_GUIDE (Rose Chateau Bordelrie)',
    verification: 'UNVERIFIED',
    guideId: 'every_rose_has_its_thorn',
    description: 'Proprietária do Castelo Rosa no Bairro Nobre de Vernworth.',
    category: 'Aliada e Romance',
    icon: 'Heart'
  },

  // --- CAVERNAS (CAVES) ---
  {
    id: 'cave-waterfall-grotto',
    type: 'cave',
    title: 'Gruta da Cachoeira (Waterfall Cave)',
    originalTitle: 'Waterfall Cave',
    region: 'Vermund',
    worldPosition: { x: -2790.40, y: 428.20, z: -3514.40 },
    mapPosition: worldToMapPixel({ x: -2790.40, y: 428.20, z: -3514.40 }),
    source: 'EXTRACTED_PAK_25290080 (Tile 18 / KeyID 3550)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Caverna profunda de múltiplos andares próxima ao Posto da Fronteira; contém Quimera e Tomo Mágico.',
    category: 'Masmorra Aberta',
    icon: 'Mountain'
  },
  {
    id: 'cave-mountain-shrine',
    type: 'cave',
    title: 'Passagem do Santuário da Montanha',
    originalTitle: 'Mountain Shrine Cavern',
    region: 'Vermund',
    worldPosition: { x: -3022.96, y: 177.96, z: -3049.02 },
    mapPosition: worldToMapPixel({ x: -3022.96, y: 177.96, z: -3049.02 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3516)',
    verification: 'UNVERIFIED',
    guideId: 'a_game_of_wits',
    description: 'Túnel de acesso através do desfiladeiro para o Campo de Batalha Antigo.',
    category: 'Masmorra Aberta',
    icon: 'Mountain'
  },
  {
    id: 'cave-drabnir-grotto',
    type: 'cave',
    title: 'Gruta de Drabnir (Drabnir\'s Grotto)',
    originalTitle: 'Drabnir\'s Grotto',
    region: 'Battahl',
    worldPosition: { x: -1200.00, y: 55.00, z: 1200.00 },
    mapPosition: worldToMapPixel({ x: -1200.00, y: 55.00, z: 1200.00 }),
    source: 'EDITORIAL_GUIDE (Volcanic Transition)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Perigoso desfiladeiro subterrâneo que conecta o sul de Battahl à Ilha Vulcânica de Agamen.',
    category: 'Passagem Regional',
    icon: 'Mountain'
  },

  // --- VIAGEM RÁPIDA (FAST TRAVEL) ---
  {
    id: 'fast-travel-vernworth',
    type: 'fast_travel',
    title: 'Cristal de Retorno: Vernworth',
    originalTitle: 'Portcrystal: Vernworth',
    region: 'Vermund',
    worldPosition: { x: 450.00, y: 35.00, z: -1050.00 },
    mapPosition: worldToMapPixel({ x: 450.00, y: 35.00, z: -1050.00 }),
    source: 'GAMEPLAY_CANONICAL (Permanent Portcrystal)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Cristal permanente localizado na praça comercial de Vernworth, ao lado do Stardrop Inn.',
    category: 'Portcrystal Permanente',
    icon: 'Zap'
  },
  {
    id: 'fast-travel-harve',
    type: 'fast_travel',
    title: 'Cristal de Retorno: Vilarejo de Harve',
    originalTitle: 'Portcrystal: Harve Village',
    region: 'Vermund',
    worldPosition: { x: 390.00, y: 30.00, z: -980.00 },
    mapPosition: worldToMapPixel({ x: 390.00, y: 30.00, z: -980.00 }),
    source: 'GAMEPLAY_CANONICAL (Permanent Portcrystal)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Cristal permanente na ponta sul da enseada costeira de Harve.',
    category: 'Portcrystal Permanente',
    icon: 'Zap'
  },
  {
    id: 'fast-travel-bakbattahl',
    type: 'fast_travel',
    title: 'Cristal de Retorno: Bakbattahl',
    originalTitle: 'Portcrystal: Bakbattahl',
    region: 'Battahl',
    worldPosition: { x: -30.00, y: 110.00, z: -2010.00 },
    mapPosition: worldToMapPixel({ x: -30.00, y: 110.00, z: -2010.00 }),
    source: 'GAMEPLAY_CANONICAL (Permanent Portcrystal)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Cristal permanente situado no complexo palaciano do Portador da Chama.',
    category: 'Portcrystal Permanente',
    icon: 'Zap'
  },

  // --- MEMENTOS DO BUSCADOR (SEEKER'S TOKENS) ---
  {
    id: 'token-melve-cliff',
    type: 'token',
    title: 'Memento do Buscador #01 — Penhasco de Melve',
    originalTitle: 'Seeker\'s Token: Melve Cliff',
    region: 'Vermund',
    worldPosition: { x: -2368.49, y: 119.07, z: -3280.98 },
    mapPosition: worldToMapPixel({ x: -2368.49, y: 119.07, z: -3280.98 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3518)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Colecionável oculto nos escombros queimados da encosta de Melve.',
    category: 'Colecionável',
    icon: 'Sparkles'
  },
  {
    id: 'token-cenotaph-ruins',
    type: 'token',
    title: 'Memento do Buscador #02 — Cenotáfio da Batalha Antiga',
    originalTitle: 'Seeker\'s Token: Cenotaph',
    region: 'Vermund',
    worldPosition: { x: -3399.20, y: 246.20, z: -2972.54 },
    mapPosition: worldToMapPixel({ x: -3399.20, y: 246.20, z: -2972.54 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3513)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'No peitoril de pedra próximo ao sino memorial do Campo de Batalha.',
    category: 'Colecionável',
    icon: 'Sparkles'
  },
  {
    id: 'token-checkpoint-gorge',
    type: 'token',
    title: 'Memento do Buscador #03 — Garganta do Posto de Descanso',
    originalTitle: 'Seeker\'s Token: Checkpoint Gorge',
    region: 'Vermund',
    worldPosition: { x: -3426.86, y: 93.17, z: -2025.79 },
    mapPosition: worldToMapPixel({ x: -3426.86, y: 93.17, z: -2025.79 }),
    source: 'EXTRACTED_PAK_25290080 (KeyID 3515)',
    verification: 'UNVERIFIED',
    guideId: null,
    description: 'Sob as vigas da ponte suspensa de pedra que divide os dois reinos.',
    category: 'Colecionável',
    icon: 'Sparkles'
  }
] as const;
