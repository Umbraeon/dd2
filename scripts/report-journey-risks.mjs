// Read-only inventory. Run: node --import tsx scripts/report-journey-risks.mjs [--json]
import { PHASES } from '../src/data/roadmapData.ts';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';

export function buildJourneyRiskInventory(phases = PHASES, guides = QUEST_GUIDES) {
  const steps = phases.flatMap(phase => (phase.events ?? []).map(event => ({ phase, event })));
  const guideCount = new Map();
  for (const guide of guides) for (const id of guide.relatedEventIds ?? [])
    guideCount.set(id, (guideCount.get(id) ?? 0) + 1);
  return steps.filter(({ event }) => event.isTimed === true || event.isMissable === true || !!event.failureRisk)
    .map(({ phase, event }) => ({
      id: event.id,
      chapter: phase.title,
      title: event.title,
      timedFlag: event.isTimed === true,
      missableFlag: event.isMissable === true,
      guideCount: guideCount.get(event.id) ?? 0,
      grouped: (guideCount.get(event.id) ?? 0) > 1,
      statedRisk: event.failureRisk ?? null,
      sourceUrls: [event.source, ...(event.extraSources ?? [])].filter(Boolean),
      verification: 'needs-claim-level-review'
    }));
}
export function renderRiskMarkdown(rows) {
  const escaped = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
  return [
    '# Inventário de alertas da Jornada — triagem, não certificação factual',
    '',
    'Gerado a partir dos dados atuais. Flags são alegações editoriais, não prova de prazo ou perdibilidade. Revisar cada afirmação em fonte direta e, quando necessário, em save real. Marcos agrupados exigem distinguir a missão afetada.',
    '',
    '| ID | Capítulo | Temporal | Perdível | Guias vinculados | Revisão |',
    '| --- | --- | --- | --- | ---: | --- |',
    ...rows.map(row => `| ${escaped(row.id)} | ${escaped(row.chapter)} | ${row.timedFlag ? 'Sim' : 'Não'} | ${row.missableFlag ? 'Sim' : 'Não'} | ${row.guideCount} | ${row.grouped ? 'Desagregar por missão' : 'Conferir afirmação'} |`),
    '',
    `Total de marcos com alerta: ${rows.length}. Flags temporais: ${rows.filter(row => row.timedFlag).length}; flags de perdibilidade: ${rows.filter(row => row.missableFlag).length}. Os contadores não equivalem ao número de quests verificadas.`,
    ''
  ].join('\n');
}
if (process.argv[1]?.endsWith('/report-journey-risks.mjs')) {
  const rows = buildJourneyRiskInventory();
  process.stdout.write(process.argv.includes('--json') ? JSON.stringify(rows, null, 2) + '\n' : renderRiskMarkdown(rows));
}
