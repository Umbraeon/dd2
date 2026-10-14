import React from 'react';
import { BookOpen, Scroll, Swords, Trophy, AlertOctagon, Clock, AlertTriangle, AlertCircle } from 'lucide-react';
import type { JourneyCategory, QuestEvent } from '../types/roadmap';
import { JOURNEY_CATEGORY_LABELS, journeyCategoryForEvent } from '../utils/journeyCategory';

// The overview uses brief, quiet metadata; the inspected activity retains full descriptions.
const COMPACT_LABELS: Record<JourneyCategory, string> = {
  main: 'Principal',
  side: 'Secundária',
  during: 'Durante a missão',
  exploration: 'Opcional',
  optional: 'Opcional',
  point_of_no_return: 'Sem retorno'
};

export function JourneyCategoryIcon({ kind }: { kind: JourneyCategory }) {
  switch (kind) {
    case 'main':
      return <BookOpen size={12} aria-hidden="true" />;
    case 'side':
      return <Scroll size={12} aria-hidden="true" />;
    case 'during':
      return <Swords size={12} aria-hidden="true" />;
    case 'exploration':
    case 'optional':
      return <Trophy size={12} aria-hidden="true" />;
    case 'point_of_no_return':
      return <AlertOctagon size={12} aria-hidden="true" />;
  }
}

export function JourneyCategoryBadge({ event, compact = false }: { event: QuestEvent; compact?: boolean }) {
  const kind = journeyCategoryForEvent(event);
  const isTimed = !!event.isTimed;
  const isMissable = !!event.isMissable;
  const timedLabel = event.timedTrigger ? 'Prazo após gatilho' : 'Temporizada';
  const timedDescription = event.timedTrigger ? `Prazo começa: ${event.timedTrigger}` : (event.failureRisk || 'Missão temporizada');
  const isGeneralAlert = !isTimed && !isMissable &&
    (event.risk === 'critico' || event.risk === 'alerta') && !!event.failureRisk;

  return (
    <span className={`journey-badges-wrapper ${compact ? 'journey-badges-wrapper--compact' : ''}`}>
      <span className={`journey-kind journey-kind--${kind}`} data-journey-category={kind}>
        <JourneyCategoryIcon kind={kind} />
        <span>{compact ? COMPACT_LABELS[kind] : JOURNEY_CATEGORY_LABELS[kind]}</span>
      </span>
      {compact ? (
        (isTimed || isMissable) && (
          <span
            className="journey-risk-indicator"
            role="img"
            aria-label={isTimed && isMissable ? `${timedLabel} e perdível` : isTimed ? timedLabel : 'Perdível'}
            title={isTimed ? timedDescription : (event.failureRisk || 'Perdível')}
          >
            {isTimed ? <Clock size={12} aria-hidden="true" /> : <AlertTriangle size={12} aria-hidden="true" />}
          </span>
        )
      ) : (
        <>
          {isTimed && (
            <span className="journey-kind journey-kind--timed" data-journey-risk="timed" title={timedDescription}>
              <Clock size={12} aria-hidden="true" />
              <span>{timedLabel}</span>
            </span>
          )}
          {isMissable && (
            <span className="journey-kind journey-kind--missable" data-journey-risk="missable" title={event.failureRisk || 'Conteúdo perdível'}>
              <AlertTriangle size={12} aria-hidden="true" />
              <span>Perdível</span>
            </span>
          )}
          {isGeneralAlert && (
            <span className="journey-kind journey-kind--alert" data-journey-risk="alert" title={event.failureRisk}>
              <AlertCircle size={12} aria-hidden="true" />
              <span>Atenção</span>
            </span>
          )}
        </>
      )}
    </span>
  );
}
