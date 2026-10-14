import React from 'react';
import { BookOpen, Scroll, Swords, Trophy, AlertOctagon, Clock } from 'lucide-react';
import type { JourneyCategory, QuestEvent } from '../types/roadmap';
import { JOURNEY_CATEGORY_LABELS, journeyCategoryForEvent } from '../utils/journeyCategory';

export function JourneyCategoryIcon({ kind }: { kind: JourneyCategory }) {
  switch (kind) {
    case 'main':
      return <BookOpen size={11} aria-hidden="true" className="shrink-0" />;
    case 'side':
      return <Scroll size={11} aria-hidden="true" className="shrink-0" />;
    case 'during':
      return <Swords size={11} aria-hidden="true" className="shrink-0" />;
    case 'exploration':
    case 'optional':
      return <Trophy size={11} aria-hidden="true" className="shrink-0" />;
    case 'point_of_no_return':
      return <AlertOctagon size={11} aria-hidden="true" className="shrink-0" />;
  }
}

export function JourneyCategoryBadge({ event }: { event: QuestEvent }) {
  const kind = journeyCategoryForEvent(event);
  const isTimedOrMissable = (event.risk === 'critico' || event.risk === 'alerta') && !!event.failureRisk;

  return (
    <span className="journey-badges-wrapper inline-flex items-center gap-1.5 flex-wrap">
      <span className={`journey-kind journey-kind--${kind}`} data-journey-category={kind}>
        <JourneyCategoryIcon kind={kind} />
        <span>{JOURNEY_CATEGORY_LABELS[kind]}</span>
      </span>
      {isTimedOrMissable && (
        <span className="journey-kind journey-kind--timed" data-journey-risk="timed" title={event.failureRisk}>
          <Clock size={11} aria-hidden="true" className="shrink-0" />
          <span>Atenção: Perdível ou Temporizada</span>
        </span>
      )}
    </span>
  );
}

export function JourneyCategoryLegend() {
  return (
    <div className="journey-kind-legend" aria-label="Legenda: tipos de etapas">
      <span className="journey-kind journey-kind--main">
        <BookOpen size={10} aria-hidden="true" className="shrink-0" />
        <span>História principal</span>
      </span>
      <span className="journey-kind journey-kind--side">
        <Scroll size={10} aria-hidden="true" className="shrink-0" />
        <span>Missão secundária</span>
      </span>
      <span className="journey-kind journey-kind--during">
        <Swords size={10} aria-hidden="true" className="shrink-0" />
        <span>Durante esta missão</span>
      </span>
      <span className="journey-kind journey-kind--exploration">
        <Trophy size={10} aria-hidden="true" className="shrink-0" />
        <span>Exploração / Conquista</span>
      </span>
      <span className="journey-kind journey-kind--timed">
        <Clock size={10} aria-hidden="true" className="shrink-0" />
        <span>Atenção: Perdível ou Temporizada</span>
      </span>
      <span className="journey-kind journey-kind--point_of_no_return">
        <AlertOctagon size={10} aria-hidden="true" className="shrink-0" />
        <span>Ponto sem retorno</span>
      </span>
    </div>
  );
}
