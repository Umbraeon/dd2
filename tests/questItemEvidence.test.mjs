import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_ITEM_REQUIREMENTS, QUESTS_WITHOUT_ITEM_REQUIREMENTS } from '../src/data/questItemRequirements.ts';

const csv = readFileSync(new URL('../docs/audit/dd2-installed-item-evidence.csv', import.meta.url), 'utf8');

const parseCsv = (raw) => {
  const parsed = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (quoted) {
      if (ch === '"') {
        if (raw[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') {
      row.push(field.replace(/\r$/, ''));
      parsed.push(row); row = []; field = '';
    } else field += ch;
  }
  if (field || row.length) { row.push(field); parsed.push(row); }
  assert.equal(quoted, false, 'CSV com campo entre aspas não terminado');
  const headers = parsed.shift();
  for (const row of parsed) assert.equal(row.length, headers.length, 'CSV com colunas desalinhadas');
  return parsed.map(row => Object.fromEntries(headers.map((key, index) => [key, row[index]])));
};

const evidence = parseCsv(csv);

test('evidência de itens cobre todos os 37 guias e distingue missões sem item de lacunas', () => {
  const guides = new Map(QUEST_GUIDES.map(guide => [guide.original, guide]));
  const recorded = new Set(evidence.map(row => row.quest_en));
  assert.equal(guides.size, 37);
  assert.equal(recorded.size, 37, 'A tabela deve cobrir todas as missões; não só 23');
  assert.deepEqual([...recorded].sort(), [...guides.keys()].sort());
  for (const row of evidence) assert.ok(guides.has(row.quest_en), row.quest_en);
  const idsWithItems = new Set(Object.keys(QUEST_ITEM_REQUIREMENTS));
  const idsWithoutItems = new Set(QUESTS_WITHOUT_ITEM_REQUIREMENTS);
  for (const [name, guide] of guides) {
    const rows = evidence.filter(row => row.quest_en === name);
    assert.ok(rows.length >= 1, name);
    if (idsWithItems.has(guide.id)) assert.ok(rows.some(row => row.item_en), name + ': há requisito no app, mas CSV está vazio');
    if (idsWithoutItems.has(guide.id)) assert.ok(rows.every(row => !row.item_en && row.quantity.startsWith('0 itens')), name + ': não deve inventar item');
  }
  assert.equal(evidence.some(x => x.quest_en === 'Feast of Deception' && x.item_en === 'Courtly Tunic'), true);
  assert.ok(evidence.some(x => x.quest_en === "The Sorcerer's Appraisal" && x.item_en === 'Turquoise Ring'));
});

test('proveniência: texto de localização não é ID runtime e rotas/preços não viram verificação em save', () => {
  assert.equal(evidence.length, 53);
  const states = new Set(['VERIFICADO_NA_BUILD', 'FONTE_SECUNDARIA', 'NAO_VERIFICADO', 'OBSERVADO_EM_SAVE']);
  for (const row of evidence) {
    assert.equal(row.item_id, '', 'Sufixo item_name_N não comprova ID de inventário: ' + row.quest_en);
    assert.equal(row.forged_item_id, '');
    assert.ok(states.has(row.confidence));
    assert.notEqual(row.confidence, 'VERIFICADO_NA_BUILD', 'Dados mistos não podem ser declarados inteiramente primários');
    assert.ok(states.has(row.name_confidence));
    assert.ok(states.has(row.location_confidence));
    assert.ok(states.has(row.mechanics_confidence));
    assert.ok(states.has(row.price_confidence));
    if (/^item_name_\d+$/.test(row.item_key)) {
      assert.equal(row.item_key, 'item_name_' + row.localization_index);
      assert.equal(row.name_confidence, 'VERIFICADO_NA_BUILD');
    }
    assert.notEqual(row.price_confidence, 'OBSERVADO_EM_SAVE');
    assert.notEqual(row.mechanics_confidence, 'OBSERVADO_EM_SAVE');
  }
});
