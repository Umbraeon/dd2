import type { JourneyCategory, QuestEvent } from '../types/roadmap';

export const JOURNEY_CATEGORY_LABELS: Record<JourneyCategory, string> = {
  main: 'História principal',
  side: 'Missão secundária',
  during: 'Durante esta missão',
  exploration: 'Exploração / Conquista',
  optional: 'Exploração / Conquista',
  point_of_no_return: 'Ponto sem retorno'
};

// Compatibility fallback for test fixtures and any externally supplied legacy milestones.
export function journeyCategoryForEvent(event: QuestEvent): JourneyCategory {
  if (event.journeyCategory) {
    if (event.journeyCategory === 'optional') return 'exploration';
    return event.journeyCategory;
  }
  if (event.type === 'historia') return 'main';
  if (event.type === 'missao') return 'side';
  if (event.type === 'checkpoint') return 'point_of_no_return';
  return 'exploration';
}
