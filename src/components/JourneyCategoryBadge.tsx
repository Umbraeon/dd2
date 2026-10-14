import React from 'react';
import type { JourneyCategory, QuestEvent } from '../types/roadmap';
import { JOURNEY_CATEGORY_LABELS, journeyCategoryForEvent } from '../utils/journeyCategory';

export function JourneyCategoryBadge({event}: {event: QuestEvent}) {
  const kind = journeyCategoryForEvent(event);
  return <span className={`journey-kind journey-kind--${kind}`} data-journey-category={kind}>{JOURNEY_CATEGORY_LABELS[kind]}</span>;
}

const KINDS: JourneyCategory[] = ['main','side','optional','point_of_no_return'];

export function JourneyCategoryLegend() {
  return <div className="journey-kind-legend" aria-label="Legenda: tipos de etapas">
    {KINDS.map(kind => <span key={kind} className={`journey-kind journey-kind--${kind}`}>{JOURNEY_CATEGORY_LABELS[kind]}</span>)}
  </div>;
}
