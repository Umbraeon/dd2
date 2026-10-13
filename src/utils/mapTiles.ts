/**
 * Convenção de endereçamento para Leaflet CRS.Simple.
 *
 * O plano de referência é 2048×2048. Os tiles são armazenados no disco
 * na ordem raster (linha 0 = topo). O Leaflet CRS.Simple usa coordenadas
 * Y negativas, portanto o deslocamento de linha é indispensável.
 */
export const MAP_PLANE_SIZE = 2048;
export const MAP_TILE_SIZE = 256;
export const MAP_MIN_NATIVE_ZOOM = -3;

export interface MapTilesManifest {
  version: number;
  planeSize: number;
  tileSize: number;
  sourceWidth: number;
  sourceHeight: number;
  minNativeZoom: number;
  maxNativeZoom: number;
  enhancedNativeZoom?: number | null;
  source: string;
  tileCount: number;
}

export function isMapTilesManifest(value: unknown): value is MapTilesManifest {
  if (!value || typeof value !== 'object') return false;
  const m = value as Record<string, unknown>;
  const width = m.sourceWidth;
  const highest = m.maxNativeZoom;
  return m.version === 1 &&
    m.planeSize === MAP_PLANE_SIZE &&
    m.tileSize === MAP_TILE_SIZE &&
    m.minNativeZoom === MAP_MIN_NATIVE_ZOOM &&
    typeof width === 'number' &&
    [2048, 4096, 8192].includes(width) &&
    m.sourceHeight === width &&
    typeof highest === 'number' &&
    highest === Math.log2(width / MAP_PLANE_SIZE) &&
    (m.enhancedNativeZoom === undefined ||
      m.enhancedNativeZoom === null ||
      m.enhancedNativeZoom === highest) &&
    typeof m.tileCount === 'number' &&
    m.tileCount > 0 &&
    typeof m.source === 'string';
}

/** Traduz um tile Leaflet (Y negativo) para o caminho estático raster. */
export function mapTileUrl(z: number, x: number, y: number, mode: 'original' | 'enhanced' = 'original'): string | null {
  if (![z, x, y].every(Number.isInteger)) return null;
  const count = (MAP_PLANE_SIZE / MAP_TILE_SIZE) * 2 ** z;
  const topDownRow = y + count;
  if (count < 1 || x < 0 || x >= count || topDownRow < 0 || topDownRow >= count) {
    return null;
  }
  const prefix = mode === 'enhanced' ? '/map-tiles/enhanced' : '/map-tiles';
  return `${prefix}/${z}/${x}/${topDownRow}.webp`;
}
