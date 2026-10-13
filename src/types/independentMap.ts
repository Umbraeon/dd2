/**
 * Types and schema contracts for the Independent DD2 Interactive Map (Compêndio do Nascen).
 * Fully independent from MapGenie or third-party APIs.
 */

export type MarkerType = 'quest' | 'npc' | 'cave' | 'token' | 'fast_travel' | 'landmark';

export type MapRegion = 'Vermund' | 'Battahl' | 'Agamen Volcanic Island' | 'Unmoored World' | 'A verificar';

export type VerificationStatus = 'VERIFIED' | 'SUPPORTED' | 'UNVERIFIED' | 'EXAMPLE_ONLY';

export interface WorldPosition {
  /** East-West horizontal axis in meters (-4096.0 to +4096.0) */
  x: number;
  /** Vertical altitude / elevation in meters above sea level */
  y: number;
  /** North-South horizontal axis in meters (-4096.0 to +4096.0) */
  z: number;
}

export interface MapPixelPosition {
  /** X pixel position on normalized 2D map plane */
  pixelX: number;
  /** Y pixel position on normalized 2D map plane */
  pixelY: number;
}

export interface DD2MapMarker {
  /** Unique stable identifier */
  id: string;
  /** Category type */
  type: MarkerType;
  /** Display title in PT-BR */
  title: string;
  /** Original title in EN / JP */
  originalTitle?: string;
  /** Verified in-game region */
  region: MapRegion;
  /** 3D world coordinates extracted from RE Engine */
  worldPosition: WorldPosition | null;
  /** 2D pixel coordinates calculated on the map */
  mapPosition: MapPixelPosition | null;
  /** Provenance of the data */
  source: string;
  /** URL da base pesquisável para conferir/provar a origem da posição. */
  sourceUrl?: string;
  /** Factual verification status */
  verification: VerificationStatus;
  /** Associated guide ID from the 82 editorial guides (when available) */
  guideId: string | null;
  /** Short descriptive text */
  description: string;
  /** Secondary category label for filtering */
  category?: string;
  /** Custom icon name */
  icon?: string;
}

export interface MapLayerConfig {
  id: string;
  name: string;
  description: string;
  type: 'raster_official' | 'schematic_vector';
  url: string;
  bounds: [[number, number], [number, number]];
  attribution: string;
}
