import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { QUEST_GUIDES } from '../src/data/questGuides.ts';
import { QUEST_NAME_INDEX } from '../src/data/questNameIndex.ts';

export const normalizeQuestName = (value) => value
  .normalize('NFKD').toLowerCase()
  .replace(/[\u2018\u2019\u0060]/g, "'")
  .replace(/[^a-z0-9]+/g, '');

export const buildQuestCoverage = (roster, guides = QUEST_GUIDES, titles = QUEST_NAME_INDEX) => {
  const all = [
    ...roster.main.map(english => ({ english, category: 'main' })),
    ...roster.side.map(english => ({ english, category: 'side' }))
  ];
  const canonical = new Set(all.map(q => normalizeQuestName(q.english)));
  if (canonical.size !== all.length) throw new Error('Baseline contains duplicate normalized quest names');

  const guideByName = new Map(guides.map(q => [normalizeQuestName(q.original), q]));
  const localeByName = new Map(titles.map(q => [normalizeQuestName(q.english), q]));

  const rows = all.map(({ english, category }) => {
    const key = normalizeQuestName(english);
    const guide = guideByName.get(key);
    const localized = localeByName.get(key);
    return {
      english, category,
      guideId: guide?.id ?? null,
      ptBR: localized?.ptBR ?? null,
      localizationEvidence: localized?.evidence ?? null,
      eventIds: guide?.relatedEventIds ?? localized?.eventIds ?? []
    };
  });
  const guidedCount = rows.filter(r => r.guideId !== null).length;
  const localizedCount = rows.filter(r => r.ptBR !== null).length;
  const unlistedGuides = guides.filter(q => !canonical.has(normalizeQuestName(q.original)))
    .map(q => ({ id: q.id, english: q.original }));
  const titleIndexOutsideBaseline = titles.filter(q => !canonical.has(normalizeQuestName(q.english)))
    .map(q => ({ english: q.english, ptBR: q.ptBR, evidence: q.evidence }));
  const missingLocalization = rows.filter(r => r.ptBR === null).map(r => r.english);
  const missingGuide = rows.filter(r => r.guideId === null).map(r => ({
    english: r.english, category: r.category, ptBR: r.ptBR, evidence: r.localizationEvidence
  }));
  return {
    warning: '2024 third-party reference only, NOT an exhaustive catalogue of the current game or DLC; no 100% coverage claim',
    source: roster.source,
    summary: {
      historicalMain: roster.main.length,
      historicalSide: roster.side.length,
      historicalTotal: rows.length,
      withIndividualGuide: guidedCount,
      withoutIndividualGuide: missingGuide.length,
      withTitleInCurrentIndex: localizedCount,
      withoutTitleInCurrentIndex: missingLocalization.length,
      titlesOutsideHistoricalBaseline: titleIndexOutsideBaseline.length,
      guidesOutsideHistoricalBaseline: unlistedGuides.length
    },
    missingGuide,
    missingLocalization,
    unlistedGuides,
    titleIndexOutsideBaseline,
    rows
  };
};

const url = new URL('../docs/audit/quest-catalogue-powerpyx-2024.json', import.meta.url);
export const baselineRoster = JSON.parse(readFileSync(url, 'utf8'));

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = buildQuestCoverage(baselineRoster);
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
}
