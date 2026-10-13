/**
 * Auditoria deterministica dos titulos de quest extraidos de recursos do jogo.
 * Os metadados CSV sao um relato versionado: este programa nao reextrai nem
 * valida os bytes do PAK e nao certifica que a amostra seja exaustiva.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { normalizeQuestName } from './report-quest-coverage.mjs';

const requiredColumns = [
  'quest_internal_id', 'title_key', 'english_literal', 'ptbr_literal',
  'source_pak', 'resource_path', 'steam_build', 'extracted_file_sha256',
  'evidence_type', 'status'
];

export function parseQuestEvidenceCsv(input) {
  if (typeof input !== 'string' || !input.trim()) throw new Error('CSV vazio');
  const csv = input.replace(/^\uFEFF/, '');
  const table = [];
  let row = [], value = '', quoted = false, justClosedQuote = false;

  function finishCell() {
    row.push(value);
    value = '';
    justClosedQuote = false;
  }
  function finishRow() {
    finishCell();
    if (row.some(cell => cell.trim() !== '')) table.push(row);
    row = [];
  }
  for (let i = 0; i < csv.length; i += 1) {
    const ch = csv[i];
    if (quoted) {
      if (ch === '"' && csv[i + 1] === '"') {
        value += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
        justClosedQuote = true;
      } else {
        value += ch;
      }
      continue;
    }
    if (ch === '"') {
      if (value !== '' || justClosedQuote) throw new Error('Aspas inesperadas no CSV');
      quoted = true;
    } else if (ch === ',') {
      finishCell();
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && csv[i + 1] === '\n') i += 1;
      finishRow();
    } else {
      if (justClosedQuote) throw new Error('Texto apos aspas no CSV');
      value += ch;
    }
  }
  if (quoted) throw new Error('Campo CSV com aspas nao encerradas');
  if (value !== '' || row.length || justClosedQuote) finishRow();
  const [columns, ...data] = table;
  if (!columns?.length) throw new Error('Cabecalho CSV ausente');
  if (new Set(columns).size !== columns.length) throw new Error('Colunas CSV repetidas');
  for (const name of requiredColumns) {
    if (!columns.includes(name)) throw new Error('Coluna CSV ausente: ' + name);
  }
  return data.map((cells, i) => {
    if (cells.length !== columns.length) throw new Error('Quantidade incorreta de colunas na linha ' + (i + 2));
    return Object.fromEntries(columns.map((key, j) => [key, cells[j]]));
  });
}

function sourceKind(pak) {
  if (/^re_chunk_[a-z0-9_]+\.pak$/i.test(pak)) return 'base';
  if (/^re_dlc_[a-z0-9_]+\.pak$/i.test(pak)) return 'dlc';
  throw new Error('PAK de origem desconhecida: ' + pak);
}

const literal = text => text.trim().normalize('NFC');
const indexedBy = (list, name) => {
  const map = new Map();
  for (const item of list) {
    const key = normalizeQuestName(item[name]);
    if (!key || map.has(key)) throw new Error('Nome vazio ou duplicado em ' + name + ': ' + item[name]);
    map.set(key, item);
  }
  return map;
};

/**
 * O total e o denominador referem-se SOMENTE a linhas do CSV.
 * Uma entrada indexada ou guia sem linha no CSV nao comprova ausencia no jogo.
 */
export function buildInstalledQuestEvidenceReport(records, guides = QUEST_GUIDES, names = QUEST_NAME_INDEX) {
  if (!Array.isArray(records) || !records.length) throw new Error('Nao ha linhas de extracao para confrontar');
  const guideByEnglish = indexedBy(guides, 'original');
  const nameByEnglish = indexedBy(names, 'english');
  const ids = new Set(), titleKeys = new Set(), englishNames = new Set();
  const builds = new Set();
  const rows = records.map((record, i) => {
    for (const column of requiredColumns) {
      if (typeof record[column] !== 'string' || !record[column].trim()) {
        throw new Error('Linha ' + (i + 2) + ' sem ' + column);
      }
    }
    if (!/^\d+$/.test(record.steam_build)) throw new Error('Steam build invalido na linha ' + (i + 2));
    if (!/^[a-f0-9]{64}$/i.test(record.extracted_file_sha256)) {
      throw new Error('SHA-256 ausente/invalido na linha ' + (i + 2));
    }
    if (record.evidence_type !== 'GAME_DATA_CURRENT_BUILD' || record.status !== 'OFICIAL_COMPROVADO') {
      throw new Error('Linha nao elegivel como evidencia de extracao confirmada: ' + (i + 2));
    }
    const kind = sourceKind(record.source_pak);
    if (!/^natives\/stm\/message\/questlog\/.+\.msg\.24$/i.test(record.resource_path)) {
      throw new Error('Caminho de questlog invalido na linha ' + (i + 2));
    }
    const enKey = normalizeQuestName(record.english_literal);
    if (!enKey) throw new Error('Titulo ingles invalido na linha ' + (i + 2));
    for (const [set, key, desc] of [
      [ids, record.quest_internal_id, 'ID'], [titleKeys, record.title_key, 'chave de titulo'],
      [englishNames, enKey, 'titulo ingles']
    ]) {
      if (set.has(key)) throw new Error('Duplicidade de ' + desc + ': ' + key);
      set.add(key);
    }
    builds.add(record.steam_build);
    const guide = guideByEnglish.get(enKey);
    const indexed = nameByEnglish.get(enKey);
    const ptBR = literal(record.ptbr_literal);
    const indexTitleConflict = indexed ? literal(indexed.ptBR) !== ptBR : false;
    const guideTitleConflict = guide ? literal(guide.title) !== ptBR : false;
    return {
      questInternalId: record.quest_internal_id,
      titleKey: record.title_key,
      english: literal(record.english_literal),
      ptBR,
      sourceKind: kind,
      sourcePak: record.source_pak,
      resourcePath: record.resource_path,
      extractedFileSha256: record.extracted_file_sha256,
      guideId: guide?.id ?? null,
      indexedPtBR: indexed?.ptBR ?? null,
      indexEvidence: indexed?.evidence ?? null,
      guideTitle: guide?.title ?? null,
      indexTitleConflict,
      guideTitleConflict
    };
  });
  if (builds.size !== 1) throw new Error('CSVs de Steam builds diferentes nao podem ser comparados como uma instalacao');
  const known = new Set(rows.map(row => normalizeQuestName(row.english)));
  const missingGuides = rows.filter(row => row.guideId === null);
  const missingNames = rows.filter(row => row.indexedPtBR === null);
  const indexTitleConflicts = rows.filter(row => row.indexTitleConflict);
  const guideTitleConflicts = rows.filter(row => row.guideTitleConflict);
  return {
    scope: 'Amostra de titulos GMSG versionada; sem prova de completude do questlog, de gatilhos ou de jogabilidade',
    limitation: 'Hashes e literais foram lidos do CSV, nao recomputados dos PAKs neste processo.',
    steamBuild: [...builds][0],
    summary: {
      extractedTitleRows: rows.length,
      baseRows: rows.filter(row => row.sourceKind === 'base').length,
      dlcRows: rows.filter(row => row.sourceKind === 'dlc').length,
      observedWithGuide: rows.length - missingGuides.length,
      observedWithoutGuide: missingGuides.length,
      observedNotInNameIndex: missingNames.length,
      indexPtBRConflicts: indexTitleConflicts.length,
      guidePtBRConflicts: guideTitleConflicts.length,
      publishedGuidesOutsideSample: guides.length - rows.filter(row => row.guideId !== null).length,
      indexedNamesOutsideSample: names.length - rows.filter(row => row.indexedPtBR !== null).length
    },
    observedWithoutGuide: missingGuides,
    observedNotInNameIndex: missingNames,
    indexPtBRConflicts: indexTitleConflicts,
    guidePtBRConflicts: guideTitleConflicts,
    publishedGuidesOutsideSample: guides.filter(item => !known.has(normalizeQuestName(item.original)))
      .map(item => ({ id: item.id, english: item.original })),
    indexedNamesOutsideSample: names.filter(item => !known.has(normalizeQuestName(item.english)))
      .map(item => ({ english: item.english, ptBR: item.ptBR })),
    rows
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== '--input')) {
    process.stderr.write('Uso: node --import tsx scripts/report-installed-quest-evidence.mjs [--input caminho.csv]\n');
    process.exitCode = 2;
  } else {
    const input = args.length ? resolve(args[1]) : new URL('../docs/audit/game-localization-evidence.csv', import.meta.url);
    const report = buildInstalledQuestEvidenceReport(parseQuestEvidenceCsv(readFileSync(input, 'utf8')));
    process.stdout.write(JSON.stringify(report, null, 2) + '\n');
  }
}
