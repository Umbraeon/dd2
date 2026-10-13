import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mapTileUrl, isMapTilesManifest } from '../src/utils/mapTiles.ts';

test('origem top-left e quadrante inferior direito no Leaflet CRS.Simple', () => {
  assert.equal(mapTileUrl(-3, 0, -1), '/map-tiles/-3/0/0.webp');
  assert.equal(mapTileUrl(0, 0, -8), '/map-tiles/0/0/0.webp');
  assert.equal(mapTileUrl(0, 7, -1), '/map-tiles/0/7/7.webp');
  assert.equal(mapTileUrl(2, 31, -32), '/map-tiles/2/31/0.webp');
  assert.equal(mapTileUrl(2, 31, -1), '/map-tiles/2/31/31.webp');
});

test('não solicita mosaicos fora da extensão real', () => {
  for (const [z,x,y] of [[0,0,0],[0,8,-8],[0,-1,-8],[0,0,-9],[-4,0,-1],[0.5,0,-1]]) {
    assert.equal(mapTileUrl(z,x,y), null);
  }
});

test('manifesto mantém 2K e 8K distintos e invalida upscales falsos', () => {
  const base = {version:1,planeSize:2048,tileSize:256,sourceWidth:2048,sourceHeight:2048,minNativeZoom:-3,maxNativeZoom:0,source:'world-map.webp',tileCount:85};
  assert.ok(isMapTilesManifest(base));
  assert.ok(isMapTilesManifest({...base,sourceWidth:8192,sourceHeight:8192,maxNativeZoom:2,tileCount:1365,source:'world-map-8k.webp'}));
  assert.ok(!isMapTilesManifest({...base,sourceWidth:2048,maxNativeZoom:2}));
  assert.ok(!isMapTilesManifest({...base,sourceWidth:4096,sourceHeight:2048,maxNativeZoom:1}));
});

test('trocar nitidez não altera coordenadas, nem solicita tiles fora do mundo', () => {
  assert.equal(mapTileUrl(2, 31, -1, 'enhanced'), '/map-tiles/enhanced/2/31/31.webp');
  assert.equal(mapTileUrl(2, 0, -32, 'enhanced'), '/map-tiles/enhanced/2/0/0.webp');
  assert.equal(mapTileUrl(2, -1, -1, 'enhanced'), null);
  assert.ok(isMapTilesManifest({
    version: 1, planeSize: 2048, tileSize: 256,
    sourceWidth: 8192, sourceHeight: 8192, minNativeZoom: -3, maxNativeZoom: 2,
    enhancedNativeZoom: 2, source: 'world-map-8k.webp', tileCount: 1365
  }));
  assert.ok(!isMapTilesManifest({
    version: 1, planeSize: 2048, tileSize: 256,
    sourceWidth: 8192, sourceHeight: 8192, minNativeZoom: -3, maxNativeZoom: 2,
    enhancedNativeZoom: 3, source: 'world-map-8k.webp', tileCount: 1365
  }));
});
