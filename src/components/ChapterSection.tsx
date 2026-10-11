import React from 'react';
import { AlertTriangle, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { Phase, QuestEvent, UserProgress } from '../types/roadmap';
import { AchievementCard } from './AchievementCard';
import { AchievementPreview, InlineAchievements } from './InlineAchievements';
import { QuestWalkthroughsForEvent } from './QuestGuides';
import { RISK_CHECKPOINTS } from '../data/roadmapData';

interface ChapterSectionProps {
  phase: Phase;
  phases: readonly Phase[];
  progress: UserProgress;
  onToggleEvent: (eventId: string) => void;
  onToggleAchievement: (achievementId: number) => void;
  onOpenAchievement: (phaseId: string, achievementId: number) => void;
  onConfirmCheckpoint: (checkpointId: string) => void;
  expandedEventId: string | null;
  onExpandEvent: (eventId: string) => void;
  showAchievements?: boolean;
  onToggleAchievements?: () => void;
  showAchievementSection?: boolean;
  /** Only controls the visible rows, never the chronological indices or chapter totals. */
  visibleEventIds?: readonly string[];
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  phase,
  phases,
  progress,
  onToggleEvent,
  onToggleAchievement,
  onOpenAchievement,
  onConfirmCheckpoint,
  expandedEventId,
  onExpandEvent,
  showAchievements,
  onToggleAchievements,
  showAchievementSection = true,
  visibleEventIds
}) => {
  // Check if any critical checkpoint belongs to this phase
  const phaseCheckpoints = RISK_CHECKPOINTS.filter(cp => cp.phaseId === phase.id);

  // Calculate phase stats
  const completedEvents = phase.events.filter(e => progress.steps[e.id]).length;
  const completedAchievements = phase.achievements.filter(a => progress.achievements[a.id]).length;
  const visibleEvents = phase.events.map((event, index) => ({ event, ordinal: index + 1 }))
    .filter(({ event }) => !visibleEventIds || visibleEventIds.includes(event.id));

  return (
    <section id={phase.id} tabIndex={-1} className="codex-chapter scroll-mt-28 pt-8 pb-12 border-b border-[#3d372e]/70">
      {/* Chapter Header */}
      <div className="mb-6 codex-chapter-intro">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#726044]/50 pb-3">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#d9b780]">
              Capítulo Cronológico
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#f0d1a0] mt-0.5">
              {phase.title}
            </h2>
            <p className="text-sm text-[#cfc3ae] mt-0.5 font-sans">
              {phase.subtitle}
            </p>
          </div>

          {/* Micro Progress for this phase */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#cfc8bd] bg-[#181a1d] px-3 py-1.5 rounded border border-[#3f3b33] self-start sm:self-auto">
            <span>
              Etapas: <b className="text-[#9bc4a5]">{completedEvents}/{phase.events.length}</b>
            </span>
            {showAchievementSection && phase.achievements.length > 0 && (
              <>
                <span className="text-[#726044]">·</span>
                <span>
                  Conquistas: <b className="text-[#d9b780]">{completedAchievements}/{phase.achievements.length}</b>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Tactical Cue Box */}
        {phase.cue && (
          <div className="mt-3 bg-[#1e1c18] border border-[#6b583e] rounded-md p-3 text-base text-[#ecd2ac] flex items-start gap-2.5">
            <span className="font-serif font-bold text-[#d9b780] text-sm leading-none shrink-0 mt-0.5">
              DICA:
            </span>
            <p className="leading-relaxed">{phase.cue}</p>
          </div>
        )}
      </div>

      {/* Checkpoints permanecem acessíveis sem competir com as etapas do roteiro. */}
      {phaseCheckpoints.map(cp => {
        const isConfirmed = !!progress.confirmedCheckpoints[cp.id];
        return (
          <details key={cp.id} className="my-3 rounded border border-[#6b583e] bg-[#1e1c18] p-3 text-[#ecd2ac]">
            <summary className="cursor-pointer font-semibold text-sm">
              {isConfirmed ? 'Revisado' : 'Antes de avançar'} · {cp.title}
            </summary>
            <p className="text-sm mt-3 leading-relaxed">{cp.description}</p>
            <ul className="text-sm mt-2 space-y-1.5">
              {cp.verificationList.map((item, idx) => <li key={idx}>• {item}</li>)}
            </ul>
            <label className="mt-3 flex gap-2 items-center text-sm cursor-pointer">
              <input type="checkbox" checked={isConfirmed} onChange={() => onConfirmCheckpoint(cp.id)} />
              Revisei estes pontos
            </label>
          </details>
        );
      })}

      {/* Chronological Steps / Events Timeline */}
      {phase.events.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#d9b780]">
              Sequência de Execução ({phase.events.length} etapas)
            </h3>
            <span className="text-[10px] text-[#8e887d] font-sans">
              Ordem sugerida
            </span>
          </div>

          <div className="codex-timeline space-y-3">
            {visibleEvents.map(({ event, ordinal }) => {
              const isEventDone = !!progress.steps[event.id];
              return (
                <div
                  key={event.id}
                  id={`step-${event.id}`}
                  tabIndex={-1}
                  className={`codex-step scroll-mt-28 focus:outline focus:outline-2 focus:outline-[#f0d1a0] border rounded-lg p-3.5 transition-all ${
                    isEventDone
                      ? 'bg-[#141619]/60 border-[#2d382f] opacity-85'
                      : event.risk === 'critico'
                      ? 'bg-[#1d1615] border-[#6b352b]'
                      : event.risk === 'alerta'
                      ? 'bg-[#1d1914] border-[#66502f]'
                      : 'bg-[#181a1d] border-[#383b40]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Step Checkbox */}
                    <button
                      onClick={() => onToggleEvent(event.id)}
                      className="quest-complete-toggle mt-0.5 text-[#aea79b] hover:text-[#d9b780] transition-colors shrink-0 min-h-11 min-w-11 flex items-center justify-center"
                      title={isEventDone ? "Marcar etapa como pendente" : "Marcar etapa como concluída"}
                      aria-label={`Alternar conclusão da etapa ${event.title}`}
                      aria-pressed={isEventDone}
                    >
                      {isEventDone ? (
                        <CheckCircle2 className="w-5 h-5 text-[#9bc4a5]" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#5e574b]" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title & Metadata Line */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] text-[#8e887d]">
                            {String(ordinal).padStart(2, '0')}.
                          </span>
                          <h4 className={`text-base font-semibold ${isEventDone ? 'line-through text-[#8e887d]' : 'text-[#f0d1a0]'}`}>
                            {event.title}
                          </h4>
                        </div>

                        <span className="text-[10px] uppercase font-mono text-[#aea79b]">{event.type}</span>
                      </div>

                      {event.failureRisk && (event.risk === 'critico' || event.risk === 'alerta') && (
                        <p className="consult-priority-risk" role="note">
                          <AlertTriangle size={15} aria-hidden="true" />
                          <span><strong>Antes de avançar:</strong> {event.failureRisk}</span>
                        </p>
                      )}
                      <div className="consult-achievement-preview"><AchievementPreview ids={event.achievements} phases={phases} progress={progress}/></div>
                      <button type="button" className="quest-detail-toggle" aria-expanded={expandedEventId === event.id}
                        aria-controls={`event-details-${event.id}`} onClick={() => onExpandEvent(event.id)}>
                        {expandedEventId === event.id ? 'Recolher instruções' : 'Ver instruções'}
                      </button>
                      {expandedEventId === event.id && (
                      <div id={`event-details-${event.id}`} className="quest-event-details">
                      {/* Event Note */}
                      <p className="text-base text-[#e1d6c6] leading-relaxed mt-2">
                        {event.note}
                      </p>

                      <QuestWalkthroughsForEvent eventId={event.id} />

                      {/* Linked to the global catalogue; editorial, never an automatic unlock. */}
                      <InlineAchievements ids={event.achievements} phases={phases}
                        progress={progress} onOpenAchievement={onOpenAchievement} />

                      {/* Source Link */}
                      {event.source && (
                        <div className="mt-2 text-sm text-[#b8ad9d]">
                          <a
                            href={event.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#d9b780] inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Fonte da etapa</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements Cards for this Phase */}
      {showAchievementSection && onToggleAchievements && phase.achievements.length > 0 && (
        <div>
          <button type="button" className="quest-achievement-toggle" aria-expanded={showAchievements}
            onClick={onToggleAchievements}>
            <span>Conquistas deste capítulo ({phase.achievements.length})</span>
            <span>{showAchievements ? 'Ocultar fichas' : 'Mostrar fichas e requisitos'}</span>
          </button>
          {showAchievements && <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
            {phase.achievements.map(ach => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                isCompleted={!!progress.achievements[ach.id]}
                onToggle={onToggleAchievement}
              />
            ))}
          </div>}
        </div>
      )}
    </section>
  );
};
