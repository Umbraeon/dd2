import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDEPENDENT_MAP_MARKERS, MAP_MARKER_COUNTS } from '../src/data/independentMapMarkers.ts';
import { SEEKER_TOKEN_GAME_POSITIONS } from '../src/data/seekerTokenGamePositions.ts';
import { CAVE_ENTRANCES,guideWorldToGame,caveGuideToPixel } from '../src/data/caveEntranceSources.ts';

test('240 Mementos com GUID único de origem documentada',()=>{
  assert.equal(SEEKER_TOKEN_GAME_POSITIONS.length,240);
  const ids = SEEKER_TOKEN_GAME_POSITIONS.map(([guid])=>guid);
  assert.equal(new Set(ids).size,240);
  assert.ok(ids.every(guid=>/^[0-9a-f-]{36}$/.test(guid)));
  assert.equal(INDEPENDENT_MAP_MARKERS.filter(m=>m.type==='token').length,240);
  assert.ok(INDEPENDENT_MAP_MARKERS.filter(m=>m.type==='token').every(m=>
    m.worldPosition && m.mapPosition &&
    m.verification==='SUPPORTED' && m.sourceUrl?.includes('/data/almanac/167.json') &&
    m.mapPosition.pixelX>=0 && m.mapPosition.pixelX<=2048 &&
    m.mapPosition.pixelY>=0 && m.mapPosition.pixelY<=2048
  ));
});

test('37 entradas de cavernas: sem inventar coordenadas do jogo',()=>{
  assert.equal(CAVE_ENTRANCES.length,37);
  assert.equal(INDEPENDENT_MAP_MARKERS.filter(m=>m.type==='cave').length,37);
  assert.deepEqual(MAP_MARKER_COUNTS,{caves:37,tokens:240,total:277});
  assert.equal(new Set(CAVE_ENTRANCES.map(p=>p[0])).size,37);
  assert.ok(INDEPENDENT_MAP_MARKERS.filter(m=>m.type==='cave').every(m=>
    m.worldPosition===null && m.verification==='SUPPORTED' &&
    m.mapPosition?.pixelX>=0 && m.mapPosition.pixelX<=2048 &&
    m.mapPosition?.pixelY>=0 && m.mapPosition.pixelY<=2048 &&
    m.sourceUrl?.startsWith('https://www.gamerguides.com/')
  ));
  assert.ok(INDEPENDENT_MAP_MARKERS.every(m=>m.type==='cave'||m.type==='token'));
});

test('ajuste afim de cavernas coincide com três marcos independentes (não prova cada entrada)',()=>{
  const anchors=[
    [[9349,5825],[502.3644,-1030.9149]],
    [[7384,3620],[-503.9091,-2202.1626]],
    [[5859,8489],[-1368.8761,386.6187]]
  ];
  for(const [[gx,gy],[wx,wz]] of anchors){
    const result=guideWorldToGame(gx,gy);
    assert.ok(Math.hypot(result.x-wx,result.z-wz)<40,'erro de calibração maior que 40 metros');
  }
  const p=caveGuideToPixel(5580,10019);
  assert.ok(Number.isFinite(p.pixelX)&&Number.isFinite(p.pixelY));
});
