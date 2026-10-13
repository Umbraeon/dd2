/**
 * Entradas documentadas no mapa World de Gamer Guides (Dragon's Dogma II).
 * Fonte: https://www.gamerguides.com/dragons-dogma-2/maps/world-map
 * Cada entrada leva a uma página pública específica de referência (world X/Y).
 * Conversão para o raster 2048 via ajuste afim com âncoras de Stardrop Inn,
 * Sacred Arbor, Bakbattahl e entradas do Forgotten Tunnel.
 *
 * IMPORTANTE: posições SUPPORTED, NÃO verificadas pixel a pixel dentro do jogo.
 * Resíduo da calibração com cinco âncoras ~0–32 metros; acesso pode ter várias bocas.
 */
import type { MapPixelPosition, MapRegion } from '../types/independentMap';
import { worldToMapPixel } from '../utils/mapCoordinates';
export type CaveSource = readonly [id:string, name:string, region: MapRegion, guideX:number, guideY:number, note:string, guidePath:string];
export const CAVE_ENTRANCES: readonly CaveSource[] = [
 [
  "waterfall-cave",
  "Gruta da Cachoeira",
  "Vermund",
  9847,
  3135,
  "Entrada pela rota leste do Posto da Fronteira.",
  "vermund-dungeons/waterfall-cave"
 ],
 [
  "waterfall-cave-north",
  "Gruta da Cachoeira — acesso norte",
  "Vermund",
  9612,
  2665,
  "Segundo acesso registrado; confirme a trilha antes de entrar.",
  "vermund-dungeons/waterfall-cave"
 ],
 [
  "mountains-secret",
  "Segredo da Montanha",
  "Vermund",
  8837,
  2440,
  "Entrada pela trilha florestal das montanhas ao norte.",
  "vermund-dungeons/the-mountains-secret"
 ],
 [
  "ancestral-chamber",
  "Câmara Ancestral",
  "Vermund",
  7866,
  3672,
  "Entrada entre as rochas, sem precisar da escada alternativa.",
  "vermund-dungeons/ancestral-chamber"
 ],
 [
  "forsaken-cavern",
  "Caverna dos Abandonados",
  "Vermund",
  10460,
  3930,
  "Acesso por uma trilha lateral e pequena elevação.",
  "vermund-dungeons/cavern-of-the-forsaken"
 ],
 [
  "darkhorde-cave",
  "Caverna da Horda Sombria",
  "Vermund",
  7277,
  4435,
  "Entrada pela estrada secundária sinuosa de Vermund.",
  "vermund-dungeons/darkhorde-cave"
 ],
 [
  "forgotten-tunnel",
  "Túnel Esquecido",
  "Vermund",
  7542,
  4057,
  "Uma das entradas nas ruínas da trilha ao norte.",
  "vermund-dungeons/forgotten-tunnel"
 ],
 [
  "trevo-mine",
  "Mina de Trevo",
  "Vermund",
  7959,
  5469,
  "Entrada principal em Vermund, a oeste de Vernworth.",
  "vermund-dungeons/trevo-mine"
 ],
 [
  "trevo-mine-north",
  "Mina de Trevo — saída norte",
  "Vermund",
  8042,
  4793,
  "Acesso alternativo que exige liberar uma escada por dentro.",
  "vermund-dungeons/trevo-mine"
 ],
 [
  "trembling-hollow",
  "Caverna Trêmula",
  "Vermund",
  9238,
  5184,
  "Uma das entradas da gruta com mortos-vivos.",
  "vermund-dungeons/trembling-hollow"
 ],
 [
  "underbridge-grotto",
  "Gruta Sob a Ponte",
  "Vermund",
  10721,
  5313,
  "Acesso por trilha rochosa sob a ponte.",
  "vermund-dungeons/underbridge-grotto"
 ],
 [
  "spirits-path",
  "Caminho dos Espíritos",
  "Vermund",
  10604,
  5427,
  "Entrada por uma escada que desce às criptas.",
  "vermund-dungeons/spirits-path"
 ],
 [
  "nameless-depths",
  "Profundezas da Vila Sem Nome",
  "Vermund",
  11218,
  5026,
  "Acesso perto da antiga mansão.",
  "vermund-dungeons/nameless-village-depths"
 ],
 [
  "stormwind-cave",
  "Caverna da Ventania",
  "Vermund",
  7612,
  6586,
  "Buraco no chão nos fundos do Vilarejo de Harve.",
  "vermund-dungeons/stormwind-cave"
 ],
 [
  "riverside-cavern",
  "Caverna Ribeirinha",
  "Vermund",
  6809,
  5622,
  "Entrada após subir as rochas ao noroeste de Harve.",
  "vermund-dungeons/riverside-cavern"
 ],
 [
  "hidden-cavern",
  "Caverna Oculta",
  "Vermund",
  8296,
  4367,
  "Acesso para os corredores com portas bloqueadas.",
  "vermund-dungeons/hidden-cavern"
 ],
 [
  "gracious-vaults",
  "Criptas da Mão Graciosa",
  "Vermund",
  9499,
  5975,
  "Entrada depende do progresso na missão The Heel of History.",
  "vermund-dungeons/the-gracious-hands-vaults"
 ],
 [
  "worldsend-cavern",
  "Caverna dos Confins",
  "Vermund",
  5772,
  4816,
  "Parte da rede subterrânea ligada ao Campo de Batalha Antigo.",
  "vermund-dungeons/worldsend-cavern"
 ],
 [
  "guerco-cavern",
  "Caverna de Guerco",
  "Vermund",
  6596,
  6243,
  "Entrada de rota alternativa entre Vermund e Battahl.",
  "vermund-dungeons/guerco-cavern"
 ],
 [
  "cliffside-cave",
  "Caverna do Penhasco",
  "Battahl",
  6313,
  7134,
  "Entrada a sul da caverna de Guerco.",
  "locations/points-of-interest/cliffside-cave"
 ],
 [
  "thunderclap-cave",
  "Caverna do Trovão",
  "Battahl",
  3818,
  6799,
  "Acesso próximo à cachoeira na borda ocidental.",
  "locations/points-of-interest/thunderclap-cave"
 ],
 [
  "enoa-battahl",
  "Caverna Enoa'Battahl",
  "Battahl",
  4907,
  6847,
  "Entrada ao norte de Battahl, perto da fogueira.",
  "battahl-dungeons/enoabattahl-cavern"
 ],
 [
  "sandsear",
  "Caverna das Areias",
  "Battahl",
  5300,
  7823,
  "Acesso numa trilha florestada a noroeste de Bakbattahl.",
  "battahl-dungeons/sandsear-cave"
 ],
 [
  "sal-battahl",
  "Caverna de Sal'Battahl",
  "Battahl",
  4786,
  9551,
  "Entrada lateral próxima da estrada sul.",
  "battahl-dungeons/salbatthahl-cavern"
 ],
 [
  "highland",
  "Caverna das Terras Altas",
  "Battahl",
  4791,
  7565,
  "Gruta ao norte de Battahl.",
  "battahl-dungeons/highland-cavern"
 ],
 [
  "tomb-amranna",
  "Tumba de Am'Ranna",
  "Battahl",
  5088,
  8512,
  "Entrada ao sul da estação central do teleférico.",
  "battahl-dungeons/tomb-of-amranna"
 ],
 [
  "canyon",
  "Caverna do Cânion",
  "Battahl",
  5323,
  9003,
  "Acesso à caverna rica em minérios.",
  "battahl-dungeons/canyon-cave"
 ],
 [
  "caliginous",
  "Profundezas Sombrias",
  "Battahl",
  4556,
  9273,
  "Caverna acessível após o encontro com Medusa.",
  "battahl-dungeons/caliginous-depths"
 ],
 [
  "rocky-lair",
  "Covil Rochoso",
  "Battahl",
  4178,
  7364,
  "Entrada da gruta habitada por monstros.",
  "battahl-dungeons/rocky-lair"
 ],
 [
  "tomb-teglarr",
  "Tumba de Te'Glarr",
  "Battahl",
  3786,
  7185,
  "Entrada na borda da mata, escondida por árvores.",
  "battahl-dungeons/tomb-of-teglarr"
 ],
 [
  "eremitic",
  "Santuário Eremítico",
  "Battahl",
  5053,
  8022,
  "Caverna com mercenários pelo caminho.",
  "battahl-dungeons/eremitic-sanctuary"
 ],
 [
  "rocky-crevasse",
  "Fenda Rochosa",
  "Battahl",
  4447,
  7033,
  "Acesso guardado por hobgoblins.",
  "battahl-dungeons/rocky-crevasse"
 ],
 [
  "dimdark",
  "Caverna Penumbrosa",
  "Battahl",
  4676,
  7227,
  "Entrada na margem do rio próxima à fogueira.",
  "battahl-dungeons/dimdark-cave"
 ],
 [
  "drabnir",
  "Gruta de Drabnir",
  "Battahl",
  5580,
  10019,
  "Entrada norte: passagem para a Ilha Vulcânica.",
  "battahl-dungeons/drabnirs-grotto"
 ],
 [
  "drabnir-south",
  "Gruta de Drabnir — saída sul",
  "Agamen Volcanic Island",
  6179,
  10230,
  "Acesso sul da passagem entre Battahl e Agamen.",
  "battahl-dungeons/drabnirs-grotto"
 ],
 [
  "dragonsbreath",
  "Torre do Sopro do Dragão",
  "Battahl",
  4354,
  9689,
  "Entrada do complexo com combate ao dragão.",
  "battahl-dungeons/dragonsbreath-tower"
 ],
 [
  "mountain-base",
  "Caverna da Base da Montanha",
  "Agamen Volcanic Island",
  7325,
  10315,
  "Entrada no sudoeste da Ilha Vulcânica.",
  "agamen-volcanic-island-dungeons/mountain-base-cave"
 ]
] as const;

/** Coordenadas Gamer Guides -> coordenadas físicas do jogo (ajuste afim aproximado). */
export function guideWorldToGame(x:number,y:number): {x:number,z:number} {
  return {
    x: 0.532404201 * x - 0.004768439 * y - 4449.69992,
    z: -0.001176829 * x + 0.530400505 * y - 4108.84838
  };
}
export function caveGuideToPixel(x:number,y:number):MapPixelPosition {
  const game = guideWorldToGame(x,y);
  return worldToMapPixel({x:game.x,y:0,z:game.z});
}
export function caveSourceUrl(guidePath:string):string {
  return 'https://www.gamerguides.com/dragons-dogma-2/database/' + guidePath;
}
