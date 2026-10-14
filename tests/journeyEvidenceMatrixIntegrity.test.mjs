import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { PHASES } from '../src/data/roadmapData.ts';

const stages = PHASES.flatMap(p => p.events);

test('a matriz de evidências docs/audit/journey-quest-chronology-evidence-matrix-2026-10-14.md corresponde 1:1 aos 72 marcos reais de PHASES', () => {
  const filePath = path.resolve('docs/audit/journey-quest-chronology-evidence-matrix-2026-10-14.md');
  assert.ok(fs.existsSync(filePath), 'O arquivo da matriz de evidências deve existir');
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Localizar a tabela na seção 4
  const tableHeaderIndex = lines.findIndex(l => l.includes('| ID | Título / Conteúdo no Compêndio |'));
  assert.ok(tableHeaderIndex !== -1, 'Cabeçalho da tabela de evidências não encontrado');

  // Linhas de dados começam após o separador (|---|---|...)
  const rows = [];
  for (let i = tableHeaderIndex + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) break;
    // Split por | e limpar
    const cols = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
    if (cols.length >= 13) {
      rows.push({
        id: cols[0].replace(/[`\s]/g, ''),
        content: cols[1],
        quests: cols[2],
        location: cols[3],
        mainQuest: cols[4],
        relation: cols[5].replace(/[`\s]/g, ''),
        moment: cols[6],
        prerequisites: cols[7],
        risk: cols[8],
        sources: cols[9],
        evidence: cols[10],
        divergence: cols[11],
        confidence: cols[12].replace(/[\*\s]/g, ''),
        proposal: cols[13]
      });
    }
  }

  assert.equal(rows.length, 72, 'A matriz deve conter exatamente 72 linhas de dados');
  assert.equal(stages.length, 72, 'PHASES deve conter exatamente 72 etapas');

  // Verificar correspondência 1:1 exata na mesma ordem
  for (let i = 0; i < stages.length; i++) {
    const stage = stages[i];
    const row = rows[i];
    assert.equal(row.id, stage.id, `Linha ${i + 1} da matriz (ID ${row.id}) deve coincidir com o marco ${stage.id} de PHASES`);
    
    // Nenhuma linha pode afirmar validação em gameplay sem evidência direta
    assert.notEqual(row.confidence, 'VALIDADO EM GAMEPLAY', `O marco ${row.id} não pode alegar 'VALIDADO EM GAMEPLAY' sem teste direto reproduzível`);

    // Linhas CORROBORADO devem citar pelo menos 2 links independentes
    if (row.confidence === 'CORROBORADO') {
      const urls = row.sources.match(/https?:\/\/[^\s\)\>]+/g) || [];
      assert.ok(urls.length >= 2, `O marco ${row.id} está marcado como CORROBORADO mas possui apenas ${urls.length} URL(s)`);
    }

    // Se possui apenas 1 URL, não pode estar marcado como CORROBORADO
    const urlMatches = row.sources.match(/https?:\/\/[^\s\)\>]+/g) || [];
    if (urlMatches.length < 2) {
      assert.notEqual(row.confidence, 'CORROBORADO', `O marco ${row.id} possui menos de 2 URLs e não pode ser CORROBORADO`);
    }
  }

  // Verificar que IDs críticos de etapas correspondem ao assunto do código real
  const rowMap = new Map(rows.map(r => [r.id, r]));
  assert.match(rowMap.get('v105').content, /residência|Place to Call Home/i, 'v105 deve ser residência/A Place to Call Home');
  assert.match(rowMap.get('v107').content, /Revinda da Calamidade|Readvent of Calamity/i, 'v107 deve ser Revinda da Calamidade em Melve');
  assert.match(rowMap.get('v202').content, /Ulrika.*Harve|Readvent of Calamity/i, 'v202 deve ser Ulrika em Melve e Harve');
  assert.match(rowMap.get('v204').content, /ponte.*ciclope|Cyclops Abridged/i, 'v204 deve ser ponte de ciclope');
  assert.match(rowMap.get('v206').content, /Myrddin|grimórios/i, 'v206 deve ser Myrddin e grimórios');
  assert.match(rowMap.get('v301').content, /Sombra à Espreita|Encontro Perturbador/i, 'v301 deve ser investigações de Bermudo e Allard');
  assert.match(rowMap.get('v303').content, /pendentes antes da coroação|Checkpoint/i, 'v303 deve ser checkpoint antes da coroação');
  assert.match(rowMap.get('v304').content, /Banquete da Farsa/i, 'v304 deve ser O Banquete da Farsa');
  assert.match(rowMap.get('v302').content, /Wilhelmina|Every Rose Has Its Thorn/i, 'v302 deve ser Wilhelmina');
  assert.match(rowMap.get('b05').content, /Carroça Fantasma|Phantom Oxcart/i, 'b05 deve ser A Carroça Fantasma');
  assert.match(rowMap.get('p04').content, /Última checagem|Pre-Gigantus/i, 'p04 deve ser última checagem pré-Gigantus');
  assert.match(rowMap.get('p07').content, /Novo Chamado Divino/i, 'p07 deve ser Um Novo Chamado Divino');
  assert.match(rowMap.get('p05').content, /Guardião Gigantus/i, 'p05 deve ser O Guardião Gigantus');
  assert.match(rowMap.get('p08').content, /Raghnall|Clash and Conclusion/i, 'p08 deve ser Confronto Final com Raghnall');
});
