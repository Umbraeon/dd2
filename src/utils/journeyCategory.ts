import type { JourneyCategory, QuestEvent } from '../types/roadmap';

export const JOURNEY_CATEGORY_LABELS: Record<JourneyCategory, string> = {
  main: 'História principal',
  side: 'Missão secundária',
  optional: 'Atividade opcional',
  point_of_no_return: 'Ponto sem retorno'
};

// Compatibility fallback for test fixtures and any externally supplied legacy milestones.
export function journeyCategoryForEvent(event: QuestEvent): JourneyCategory {
  if (event.journeyCategory) return event.journeyCategory;
  if (event.type === 'historia') return 'main';
  if (event.type === 'missao') return 'side';
  if (event.type === 'checkpoint') return 'point_of_no_return';
  return 'optional';
}
