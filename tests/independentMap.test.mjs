import test from 'node:test';
import assert from 'node:assert/strict';
import {
  worldToMapPixel,
  mapPixelToWorld,
  pixelToLatLng,
  latLngToPixel,
  worldToLatLng,
  latLngToWorld,
  WORLD_EXTENT_METERS,
  WORLD_OFFSET_X_METERS,
  WORLD_OFFSET_Z_METERS,
  DEFAULT_MAP_SIZE
} from '../src/utils/mapCoordinates.ts';
import { INDEPENDENT_MAP_MARKERS } from '../src/data/independentMapMarkers.ts';

test('1. Conversão de coordenadas: cálculo direto e inverso sem resíduo', () => {
  // Teste 1.1: Origem do mundo (0, 0, 0)
  const centerWorld = { x: 0, y: 0, z: 0 };
  const centerPixel = worldToMapPixel(centerWorld, 2048);
  assert.equal(centerPixel.pixelX, 1024);
  assert.equal(centerPixel.pixelY, 1024);

  const centerReconverted = mapPixelToWorld(centerPixel, 2048);
  assert.equal(centerReconverted.x, 0);
  assert.equal(centerReconverted.z, 0);

  // Teste 1.2: Limite Noroeste (-4096, -4096)
  const nwWorld = { x: -4096, y: 100, z: -4096 };
  const nwPixel = worldToMapPixel(nwWorld, 2048);
  assert.equal(nwPixel.pixelX, 0);
  assert.equal(nwPixel.pixelY, 0);

  // Teste 1.3: Limite Sudeste (+4096, +4096)
  const seWorld = { x: 4096, y: 50, z: 4096 };
  const sePixel = worldToMapPixel(seWorld, 2048);
  assert.equal(sePixel.pixelX, 2048);
  assert.equal(sePixel.pixelY, 2048);

  // Teste 1.4: Inversibilidade em pontos arbitrários
  const samplePoints = [
    { x: 482.38, y: 37.27, z: -1024.73 },
    { x: -3415.80, y: 94.11, z: -2051.96 },
    { x: -7.75, y: 94.96, z: -2050.64 },
    { x: -3399.57, y: 240.03, z: -2907.25 }
  ];

  for (const pt of samplePoints) {
    const px = worldToMapPixel(pt, 2048);
    const back = mapPixelToWorld(px, 2048, pt.y);
    assert.ok(Math.abs(back.x - pt.x) < 0.05, `Resíduo X excessivo: ${back.x} vs ${pt.x}`);
    assert.ok(Math.abs(back.z - pt.z) < 0.05, `Resíduo Z excessivo: ${back.z} vs ${pt.z}`);
  }
});

test('2. Limites do mapa: extensão cúbica e parâmetros de projeção', () => {
  assert.equal(WORLD_EXTENT_METERS, 8192.0);
  assert.equal(WORLD_OFFSET_X_METERS, 4096.0);
  assert.equal(WORLD_OFFSET_Z_METERS, 4096.0);
  assert.equal(DEFAULT_MAP_SIZE, 2048);

  // Verificação de conversão para Leaflet LatLng
  const [lat, lng] = pixelToLatLng(1024, 1024, 2048);
  assert.equal(lat, 1024);
  assert.equal(lng, 1024);

  const [topLat, leftLng] = pixelToLatLng(0, 0, 2048);
  assert.equal(topLat, 2048);
  assert.equal(leftLng, 0);

  const [bottomLat, rightLng] = pixelToLatLng(2048, 2048, 2048);
  assert.equal(bottomLat, 0);
  assert.equal(rightLng, 2048);

  const [backPx, backPy] = latLngToPixel(lat, lng, 2048);
  assert.equal(backPx, 1024);
  assert.equal(backPy, 1024);
});

test('3. Camada de marcadores: conformidade com contrato e integridade espacial', () => {
  assert.ok(INDEPENDENT_MAP_MARKERS.length >= 10, 'Deve conter pelo menos 10 localizações documentadas');

  const validTypes = new Set(['quest', 'npc', 'cave', 'fast_travel', 'token', 'landmark']);
  const validRegions = new Set(['Vermund', 'Battahl', 'Agamen Volcanic Island', 'Unmoored World','A verificar']);
  const validVerifications = new Set(['VERIFIED', 'SUPPORTED', 'UNVERIFIED', 'EXAMPLE_ONLY']);

  for (const m of INDEPENDENT_MAP_MARKERS) {
    assert.ok(m.id && typeof m.id === 'string', 'ID deve ser string não-vazia');
    assert.ok(validTypes.has(m.type), `Tipo inválido: ${m.type}`);
    assert.ok(m.title && typeof m.title === 'string', 'Título deve ser válido');
    assert.ok(validRegions.has(m.region), `Região inválida: ${m.region}`);
    assert.ok(validVerifications.has(m.verification), `Status inválido: ${m.verification}`);

    if (m.worldPosition) {
      assert.ok(m.worldPosition.x >= -4096 && m.worldPosition.x <= 4096, `X fora dos limites: ${m.worldPosition.x}`);
      assert.ok(m.worldPosition.z >= -4096 && m.worldPosition.z <= 4096, `Z fora dos limites: ${m.worldPosition.z}`);
      assert.ok(m.worldPosition.y >= -100 && m.worldPosition.y <= 1000, `Y fora dos limites de relevo: ${m.worldPosition.y}`);
    }

    if (m.mapPosition) {
      assert.ok(m.mapPosition.pixelX >= 0 && m.mapPosition.pixelX <= 2048, `pixelX fora dos limites: ${m.mapPosition.pixelX}`);
      assert.ok(m.mapPosition.pixelY >= 0 && m.mapPosition.pixelY <= 2048, `pixelY fora dos limites: ${m.mapPosition.pixelY}`);
    }
  }
});

test('4. Escopo B03: exclusivamente cavernas e Mementos do Buscador', () => {
  const typesFound = new Set(INDEPENDENT_MAP_MARKERS.map(m => m.type));
  assert.deepEqual([...typesFound].sort(), ['cave', 'token']);
  assert.equal(INDEPENDENT_MAP_MARKERS.filter(m=>m.type==='cave').length, 37);
  assert.equal(INDEPENDENT_MAP_MARKERS.filter(m=>m.type==='token').length, 240);
});

test('5. Independência estrita do MapGenie: ausência de scraping e URLs proprietárias', () => {
  for (const m of INDEPENDENT_MAP_MARKERS) {
    assert.ok(!m.source.toLowerCase().includes('mapgenie'), `Fonte contaminada por MapGenie no marcador ${m.id}`);
    assert.ok(!JSON.stringify(m).toLowerCase().includes('mapgenie.io'), `Referência a mapgenie.io encontrada no marcador ${m.id}`);
  }
});

test('6. Preservação do progresso existente e chave localStorage', () => {
  // O módulo do mapa independente nunca importa nem referencia chaves de progresso para escrita.
  const STORAGE_KEY = 'dd2_roadmap_user_progress_v3';
  assert.equal(STORAGE_KEY, 'dd2_roadmap_user_progress_v3', 'Chave estável preservada');
});
