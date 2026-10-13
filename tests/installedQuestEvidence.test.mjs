import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { buildInstalledQuestEvidenceReport, parseQuestEvidenceCsv } from '../scripts/report-installed-quest-evidence.mjs';

const actualCsv = readFileSync(new URL('../docs/audit/game-localization-evidence.csv', import.meta.url), 'utf8');
const records = parseQuestEvidenceCsv(actualCsv);

test('amostra PAK registrada cruza guias e titulos, sem proclamar cobertura da build', () => {
  const report = buildInstalledQuestEvidenceReport(records);
  assert.equal(report.steamBuild, '25290080');
  assert.equal(report.summary.extractedTitleRows, 59, '59 vinculos versionados nao significam todas as chaves extraidas');
  assert.equal(report.summary.dlcRows, 2);
  assert.equal(report.summary.baseRows, 57);
  assert.equal(report.summary.observedWithoutGuide, 2);
  assert.equal(report.summary.observedNotInNameIndex, 0);
  assert.equal(report.summary.indexPtBRConflicts, 0, 'Titulos PAK reportados divergiram do indice');
  assert.equal(report.summary.guidePtBRConflicts, 0, 'Titulos PAK reportados divergiram dos guias');
  assert.equal(report.summary.observedWithGuide + report.summary.observedWithoutGuide, records.length);
  assert.equal(report.summary.publishedGuidesOutsideSample + report.summary.observedWithGuide, QUEST_GUIDES.length);
  assert.equal(report.summary.indexedNamesOutsideSample + records.length, QUEST_NAME_INDEX.length);
  assert.match(report.scope, /sem prova de completude/);
  assert.match(report.limitation, /nao recomputados/);
});

test('quatro titulos observados sem ficha nao sao apagados da auditoria', () => {
  const missing = buildInstalledQuestEvidenceReport(records).observedWithoutGuide;
  assert.deepEqual(missing.map(row => row.english).sort(), [
    'Chilling Tidings', 'Lost Rites'
  ]);
  for (const row of missing) {
    assert.ok(row.questInternalId);
    assert.ok(row.titleKey);
    assert.match(row.extractedFileSha256, /^[a-fA-F0-9]{64}$/);
    assert.ok(row.indexedPtBR);
    assert.equal(row.guideId, null);
  }
});

test('parser aceita CSV entre aspas, virgulas, aspas duplas, CRLF e quebras de linha', () => {
  const columns = [
    'quest_internal_id', 'title_key', 'english_literal', 'ptbr_literal', 'source_pak',
    'resource_path', 'steam_build', 'extracted_file_sha256', 'evidence_type', 'status', 'note'
  ];
  const values = [
    'qu999', 'Mes_qu999_log_title', 'Example, Quest', 'Missao, Exemplo',
    're_chunk_000.pak', 'natives/stm/message/questlog/qu999.msg.24',
    '25290080', 'A'.repeat(64), 'GAME_DATA_CURRENT_BUILD', 'OFICIAL_COMPROVADO',
    'Descricao com "aspas" e\nquebra de linha'
  ];
  const csvCell = v => '"' + v.replaceAll('"', '""') + '"';
  const csv = columns.map(csvCell).join(',') + '\r\n' + values.map(csvCell).join(',') + '\r\n';
  assert.deepEqual(parseQuestEvidenceCsv(csv), [Object.fromEntries(columns.map((c, i) => [c, values[i]]))]);
});

test('relatorio sinaliza divergencias de titulo ao inves de sobrescrever a localizacao', () => {
  const original = records.find(record => record.english_literal === 'Gaoled Awakening');
  assert.ok(original);
  const changed = { ...original, ptbr_literal: 'Titulo nao confirmado' };
  const report = buildInstalledQuestEvidenceReport([changed]);
  assert.equal(report.summary.indexPtBRConflicts, 1);
  assert.equal(report.summary.guidePtBRConflicts, 1);
  assert.equal(report.rows[0].ptBR, 'Titulo nao confirmado');
  assert.equal(report.rows[0].indexedPtBR, 'O Despertar na Prisão');
});

test('inconsistencias de IDs, builds, hashes e classificacao sao rejeitadas', () => {
  const first = records[0];
  assert.throws(() => buildInstalledQuestEvidenceReport([...records, first]), /Duplicidade de ID/);
  assert.throws(() => buildInstalledQuestEvidenceReport([{ ...first, extracted_file_sha256: 'INVALIDO' }]), /SHA-256/);
  assert.throws(() => buildInstalledQuestEvidenceReport([{ ...first, status: 'NAO_CONFIRMADO' }]), /nao elegivel/);
  assert.throws(() => buildInstalledQuestEvidenceReport([{ ...first, source_pak: 'arquivo_desconhecido.pak' }]), /PAK de origem/);
  assert.throws(() => buildInstalledQuestEvidenceReport([{ ...first, resource_path: '../invalido' }]), /Caminho de questlog/);
  assert.throws(() => buildInstalledQuestEvidenceReport([first, {
    ...records[1], steam_build: '25290081'
  }]), /builds diferentes/);
  assert.throws(() => buildInstalledQuestEvidenceReport([]), /Nao ha linhas/);
});

test('parser rejeita dados truncados ou ambiguidade de cabecalho', () => {
  assert.throws(() => parseQuestEvidenceCsv(''), /CSV vazio/);
  assert.throws(() => parseQuestEvidenceCsv('"quest_internal_id","title_key"\n"one"'), /Coluna CSV ausente/);
  assert.throws(() => parseQuestEvidenceCsv(actualCsv.replace('GAME_DATA_CURRENT_BUILD', '"texto"solto')), /Texto apos aspas|Aspas inesperadas/);
  assert.throws(() => parseQuestEvidenceCsv(actualCsv + '"incompleto'), /aspas nao encerradas/);
});
