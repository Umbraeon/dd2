import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';
import { PHASES } from '../src/data/roadmapData.ts';
import { normalizeQuestName } from '../scripts/report-quest-coverage.mjs';

const manifest = JSON.parse(readFileSync(new URL('../docs/audit/questlog-additional-title-candidates-2026-10-13.json', import.meta.url), 'utf8'));

test('pacote completo: 40 novos titulos rastreaveis nao equivalem a guias validados', () => {
  assert.equal(manifest.status, 'CANDIDATE_TITLE_ONLY_NOT_GAMEPLAY_VERIFIED');
  assert.equal(manifest.steamBuildReported, '25290080');
  assert.match(manifest.packageSha256, /^[a-f0-9]{64}$/i);
  assert.match(manifest.source, /user-supplied|User-supplied/);
  assert.match(manifest.scope, /not verified reachable quests/);
  assert.equal(manifest.backlog.total, 40);
  assert.equal(manifest.backlog.base, 6);
  assert.equal(manifest.backlog.dlc, 34);
  assert.equal(manifest.candidates.length, 40);
});

test('cada candidato preserva ID, nome EN/PT-BR, arquivo de origem e checksum e nao publica mecanica', () => {
  const guideNames = new Set(QUEST_GUIDES.map(q => normalizeQuestName(q.original)));
  const indexedNames = new Set(QUEST_NAME_INDEX.map(q => normalizeQuestName(q.english)));
  const ids = new Set(), en = new Set();
  for (const q of manifest.candidates) {
    assert.deepEqual(Object.keys(q).sort(), ['english','id','ptBR','sourceKind','sourceMsgSha256'].sort());
    assert.match(q.id, /^qu\d{6}$/);
    assert.match(q.sourceMsgSha256, /^[a-f0-9]{64}$/i);
    assert.ok(['base', 'dlc'].includes(q.sourceKind));
    assert.ok(q.english.trim().length > 4 && q.ptBR.trim().length > 3);
    assert.ok(!ids.has(q.id), 'ID duplicado: ' + q.id);
    ids.add(q.id);
    const key = normalizeQuestName(q.english);
    assert.ok(!en.has(key), 'Titulo duplicado: ' + q.english);
    assert.ok(!guideNames.has(key), 'Ja possui guia: ' + q.english);
    assert.ok(!indexedNames.has(key), 'Ja esta no indice: ' + q.english);
    en.add(key);
  }
  assert.equal(manifest.candidates.filter(q=>q.sourceKind==='base').length, 6);
  assert.equal(manifest.candidates.filter(q=>q.sourceKind==='dlc').length, 34);
  assert.ok(ids.has('qu040041') && ids.has('qu040042') && ids.has('qu040043'));
  assert.ok(ids.has('qu050010') && ids.has('qu050130'), 'Fichas DLC distintas mantem IDs distintos');
});

test('guia publicado e titulo DLC pendente sao separados do inventario novo', () => {
  assert.equal(QUEST_GUIDES.length, 82);
  assert.equal(QUEST_NAME_INDEX.length, 82);
  const present = new Set(QUEST_GUIDES.map(q=>normalizeQuestName(q.original)));
  const indexedWithoutGuide = QUEST_NAME_INDEX.filter(q=>!present.has(normalizeQuestName(q.english)));
  assert.deepEqual(indexedWithoutGuide.map(q=>q.english).sort(), ['Chilling Tidings','Lost Rites']);
  assert.equal(PHASES.flatMap(p=>p.events).length, 71);
  assert.equal(new Set(PHASES.flatMap(p=>p.achievements.map(a=>a.id))).size, 60);
});
