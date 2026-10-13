import type { DD2MapMarker } from '../types/independentMap';
import { worldToMapPixel } from '../utils/mapCoordinates';
import { SEEKER_TOKEN_GAME_POSITIONS } from './seekerTokenGamePositions';
import { CAVE_ENTRANCES, caveGuideToPixel, caveSourceUrl } from './caveEntranceSources';

/**
 * MISSÃO B03: apenas cavernas e Mementos do Buscador.
 * Tokens: 240 coordenadas RE Engine de recursos de jogo (Almanac/Gibbed).
 * Cavernas: entradas de guias públicos projetadas por calibração aproximada.
 * Nenhum ponto é classificado como VERIFIED no MAPA até auditoria individual.
 */
const tokens: DD2MapMarker[] = SEEKER_TOKEN_GAME_POSITIONS.map(([guid,x,y,z], i) => {
  const worldPosition = {x,y,z};
  return {
    id: 'token-' + guid,
    type: 'token',
    title: `Memento do Buscador ${String(i + 1).padStart(3, '0')}`,
    originalTitle: "Seeker's Token",
    region: 'A verificar',
    worldPosition,
    mapPosition: worldToMapPixel(worldPosition),
    source: `Dados RE Engine — Gm82_036 / GUID ${guid}`,
    sourceUrl: 'https://github.com/frostmx/dd2-map/blob/main/data/almanac/167.json',
    verification: 'SUPPORTED',
    guideId: null,
    description: 'Local exato do colecionável em coordenadas do jogo, projetado na arte 8K. Alguns estão dentro de cavernas ou em níveis altos: o ponto indica a posição em planta, não uma entrada. A numeração é interna.',
    category: 'Colecionável (dados do jogo)',
    icon: 'Sparkles'
  };
});

const caves: DD2MapMarker[] = CAVE_ENTRANCES.map(([id,title,region,x,y,note,guidePath])=>({
  id: 'cave-' + id,
  type: 'cave',
  title,
  originalTitle: title,
  region,
  worldPosition: null, // Referência cartográfica do guia NÃO é coordenada RE Engine extraída.
  mapPosition: caveGuideToPixel(x,y),
  source: `Gamer Guides · mapa World X:${x} Y:${y} · calibração afim aproximada`,
  sourceUrl: caveSourceUrl(guidePath),
  verification: 'SUPPORTED',
  guideId: null,
  description: note + ' A posição da entrada foi convertida de outro mapa; pode haver um desvio de dezenas de metros.',
  category: 'Entrada referenciada (não auditada em jogo)',
  icon: 'Mountain'
}));

export const INDEPENDENT_MAP_MARKERS: readonly DD2MapMarker[] = [...caves, ...tokens];

export const MAP_MARKER_COUNTS = Object.freeze({
  caves: caves.length,
  tokens: tokens.length,
  total: caves.length + tokens.length
});
