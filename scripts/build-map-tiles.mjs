/**
 * Gera mosaicos estáticos para Leaflet CRS.Simple a partir da arte original.
 * O grid cartográfico continua fixo em 2048 unidades; a resolução da textura
 * determina quantos níveis nativos de zoom são produzidos.
 *
 * Prioridade de fonte: world-map-8k.webp, world-map-8k.png, world-map.webp.
 * Não amplia artificialmente arquivos menores e nunca chama 2K de 8K.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const TARGET = path.join(PUBLIC, 'map-tiles');
const PLANE = 2048;
const TILE = 256;
const LOWEST_Z = -3;

async function available(file) {
  try { await access(path.join(PUBLIC, file)); return true; } catch { return false; }
}

const candidate = ['world-map-8k.webp', 'world-map-8k.png', 'world-map.webp'];
const inputName = (await Promise.all(candidate.map(async f => await available(f) ? f : null))).find(Boolean);
if (!inputName) throw Error('Nenhuma fonte encontrada: public/world-map.webp ou world-map-8k.(webp|png)');
const inputFile = path.join(PUBLIC, inputName);
const inputMetadata = await sharp(inputFile).metadata();
const width = inputMetadata.width;
const height = inputMetadata.height;
if (!width || !height || width !== height || width < PLANE || width > 8192 || !Number.isInteger(Math.log2(width / PLANE))) {
  throw Error('Fonte inválida: exige imagem quadrada de 2048, 4096 ou 8192 pixels, sem ampliação artificial.');
}
const highestZ = Math.log2(width / PLANE);
await rm(TARGET, { recursive: true, force: true });
await mkdir(TARGET, { recursive: true });

let total = 0;
for (let z = LOWEST_Z; z <= highestZ; z += 1) {
  const side = Math.round(PLANE * 2 ** z);
  const columns = side / TILE;
  const { data: raster, info } = await sharp(inputFile)
    .resize(side, side, { fit: 'fill', kernel: 'lanczos3' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (info.channels !== 4 || info.width !== side || info.height !== side) throw Error('Falha na imagem rasterizada.');
  // Opcional: uma segunda variante apenas no nível nativo mais detalhado.
  // O sharpening é feito ANTES de cortar os tiles, para evitar halos nas junções.
  // Preserva dimensões e georreferenciamento; não cria detalhes inexistentes.
  const enhanced = z === highestZ && highestZ > 0
    ? await sharp(inputFile)
        .resize(side, side, { fit: 'fill', kernel: 'lanczos3' })
        .sharpen({ sigma: 1.15, m1: 0.75, m2: 2.0 })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
    : null;
  if (enhanced && (enhanced.info.channels !== 4 || enhanced.info.width !== side || enhanced.info.height !== side)) {
    throw Error('Falha na variante de nitidez aprimorada.');
  }
  const tasks = [];
  for (let row = 0; row < columns; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const tileBytes = Buffer.alloc(TILE * TILE * 4);
      for (let y = 0; y < TILE; y += 1) {
        const offset = ((row * TILE + y) * side + col * TILE) * 4;
        raster.copy(tileBytes, y * TILE * 4, offset, offset + TILE * 4);
      }
      const folder = path.join(TARGET, String(z), String(col));
      const filename = path.join(folder, row + '.webp');
      tasks.push((async () => {
        await mkdir(folder, { recursive: true });
        // Tiles originais no nível nativo já são lossless.
        const encoder = z === highestZ
          ? { lossless: true, effort: 4 }
          : { quality: 92, effort: 4 };
        await sharp(tileBytes, { raw: { width: TILE, height: TILE, channels: 4 } })
          .webp(encoder)
          .toFile(filename);
        if (enhanced) {
          const enhancedBytes = Buffer.alloc(TILE * TILE * 4);
          for (let y = 0; y < TILE; y += 1) {
            const offset = ((row * TILE + y) * side + col * TILE) * 4;
            enhanced.data.copy(enhancedBytes, y * TILE * 4, offset, offset + TILE * 4);
          }
          const enhancedFolder = path.join(TARGET, 'enhanced', String(z), String(col));
          await mkdir(enhancedFolder, { recursive: true });
          await sharp(enhancedBytes, { raw: { width: TILE, height: TILE, channels: 4 } })
            .webp({ lossless: true, effort: 4 })
            .toFile(path.join(enhancedFolder, row + '.webp'));
        }
      })());
      if (tasks.length >= 8) await Promise.all(tasks.splice(0));
      total++;
    }
  }
  await Promise.all(tasks);
}
// Uma visão geral contínua elimina as costuras visuais nos zooms afastados.
// Gerada sempre da mesma textura-fonte dos tiles 8K.
await sharp(inputFile)
  .resize(PLANE, PLANE, { kernel: 'lanczos3' })
  .webp({ quality: 94, effort: 4 })
  .toFile(path.join(TARGET, 'overview.webp'));

const manifest = {
  version: 1,
  planeSize: PLANE,
  tileSize: TILE,
  sourceWidth: width,
  sourceHeight: height,
  minNativeZoom: LOWEST_Z,
  maxNativeZoom: highestZ,
  enhancedNativeZoom: highestZ > 0 ? highestZ : null,
  source: inputName,
  tileCount: total
};
await writeFile(path.join(TARGET, 'metadata.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('[map-tiles] ' + inputName + ' (' + width + '²): ' + total + ' originais, zoom ' + LOWEST_Z + ' a ' + highestZ + (highestZ > 0 ? ', + ' + (8 * 2 ** highestZ) ** 2 + ' tiles de nitidez opcional' : ''));
