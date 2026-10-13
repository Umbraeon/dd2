import { WorldPosition, MapPixelPosition } from '../types/independentMap';

/**
 * Dragon's Dogma 2 Cartographic Coordinate Transformation Constants.
 * Derived from reverse-engineering RE Engine chunk archives (Build 25290080).
 */
export const WORLD_EXTENT_METERS = 8192.0;
export const WORLD_OFFSET_X_METERS = 4096.0;
export const WORLD_OFFSET_Z_METERS = 4096.0;

export const DEFAULT_MAP_SIZE = 2048; // Standard 2K Web plane (scaled from 8K monolithic)

/**
 * Converts RE Engine 3D world coordinates (X, Y, Z in meters) to 2D map pixel coordinates.
 * Formula:
 *   pixelX = (worldX + 4096.0) * (mapSize / 8192.0)
 *   pixelY = (worldZ + 4096.0) * (mapSize / 8192.0)
 */
export function worldToMapPixel(
  worldPos: WorldPosition,
  mapSize: number = DEFAULT_MAP_SIZE
): MapPixelPosition {
  const scale = mapSize / WORLD_EXTENT_METERS;
  const pixelX = (worldPos.x + WORLD_OFFSET_X_METERS) * scale;
  const pixelY = (worldPos.z + WORLD_OFFSET_Z_METERS) * scale;

  return {
    pixelX: Math.round(pixelX * 100) / 100,
    pixelY: Math.round(pixelY * 100) / 100
  };
}

/**
 * Converts 2D map pixel coordinates back to RE Engine 3D world coordinates (X, Z in meters).
 * Elevation (Y) defaults to 0 if not provided.
 */
export function mapPixelToWorld(
  pixelPos: MapPixelPosition,
  mapSize: number = DEFAULT_MAP_SIZE,
  elevationY: number = 0.0
): WorldPosition {
  const scale = WORLD_EXTENT_METERS / mapSize;
  const x = pixelPos.pixelX * scale - WORLD_OFFSET_X_METERS;
  const z = pixelPos.pixelY * scale - WORLD_OFFSET_Z_METERS;

  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(elevationY * 100) / 100,
    z: Math.round(z * 100) / 100
  };
}

/**
 * Converts pixel coordinates (top-down image space: [0, 0] at top-left)
 * to Leaflet CRS.Simple coordinates ([lat, lng] where lat = mapSize - pixelY, lng = pixelX).
 */
export function pixelToLatLng(
  pixelX: number,
  pixelY: number,
  mapSize: number = DEFAULT_MAP_SIZE
): [number, number] {
  const lat = mapSize - pixelY;
  const lng = pixelX;
  return [lat, lng];
}

/**
 * Converts Leaflet CRS.Simple coordinates ([lat, lng])
 * back to top-down pixel coordinates (pixelX = lng, pixelY = mapSize - lat).
 */
export function latLngToPixel(
  lat: number,
  lng: number,
  mapSize: number = DEFAULT_MAP_SIZE
): [number, number] {
  const pixelX = lng;
  const pixelY = mapSize - lat;
  return [Math.round(pixelX * 100) / 100, Math.round(pixelY * 100) / 100];
}

/**
 * Direct conversion from World Coordinates to Leaflet LatLng.
 */
export function worldToLatLng(
  worldPos: WorldPosition,
  mapSize: number = DEFAULT_MAP_SIZE
): [number, number] {
  const px = worldToMapPixel(worldPos, mapSize);
  return pixelToLatLng(px.pixelX, px.pixelY, mapSize);
}

/**
 * Direct conversion from Leaflet LatLng to World Coordinates.
 */
export function latLngToWorld(
  lat: number,
  lng: number,
  mapSize: number = DEFAULT_MAP_SIZE,
  elevationY: number = 0.0
): WorldPosition {
  const [px, py] = latLngToPixel(lat, lng, mapSize);
  return mapPixelToWorld({ pixelX: px, pixelY: py }, mapSize, elevationY);
}
