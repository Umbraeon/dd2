import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import { Phase, QuestEvent, UserProgress } from '../types/roadmap';
import { AchievementCard } from './AchievementCard';
import { AchievementPreview, InlineAchievements } from './InlineAchievements';
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
  showAchievements: boolean;
  onToggleAchievements: () => void;
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
  onToggleAchievements
}) => {
  // Check if any critical checkpoint belongs to this phase
  const phaseCheckpoints = RISK_CHECKPOINTS.filter(cp => cp.phaseId === phase.id);

  // Calculate phase stats
  const completedEvents = phase.events.filter(e => progress.steps[e.id]).length;
  const completedAchievements = phase.achievements.filter(a => progress.achievements[a.id]).length;

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
            {phase.achievements.length > 0 && (
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
              ORIENTAÇÃO:
            </span>
            <p className="leading-relaxed">{phase.cue}</p>
          </div>
        )}
      </div>

      {/* Critical Checkpoint Warning Box (if applicable to this phase) */}
      {phaseCheckpoints.map(cp => {
        const isConfirmed = !!progress.confirmedCheckpoints[cp.id];
        return (
          <div 
            key={cp.id}
            className={`my-6 rounded-lg border p-4 transition-colors ${
              isConfirmed 
                ? 'bg-[#151c17] border-[#385940] text-[#cfdecb]' 
                : 'bg-[#291b17] border-[#8a4b3d] text-[#eed4cb]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`w-5 h-5 ${isConfirmed ? 'text-[#9bc4a5]' : 'text-[#df8c75]'}`} />
                <h3 className="font-serif font-bold text-base text-[#f0d1a0]">
                  Alerta cadastrado para o capítulo: {cp.title}
                </h3>
              </div>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                isConfirmed ? 'bg-[#233b2a] text-[#9bc4a5]' : 'bg-[#4b2720] text-[#f4ad9b]'
              }`}>
                {isConfirmed ? 'Marcado como revisado' : 'Gatilho em verificação'}
              </span>
            </div>

            <p className="text-base mt-2 leading-relaxed text-[#dcd6cc]">
              {cp.description}
            </p>

            <div className="mt-3 bg-[#111315]/70 rounded p-3 border border-[#3d372e]/60">
              <span className="text-[11px] font-serif uppercase tracking-wider text-[#d9b780] block mb-1.5">
                Itens sugeridos para conferência (não auditados individualmente):
              </span>
              <ul className="text-base space-y-2 text-[#cfc8bd]">
                {cp.verificationList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#d9b780] font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-3 pt-2 border-t border-[#403e38]/50 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={() => onConfirmCheckpoint(cp.id)}
                  className="w-4 h-4 rounded border-[#726044] text-[#d9b780] focus:ring-0 bg-[#1c1e21] cursor-pointer"
                />
                <span className="text-sm font-medium text-[#e9e2d7]">
                  Confirmo que verifiquei todas as pendências acima antes de prosseguir
                </span>
              </label>
            </div>
          </div>
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
              Ordem sugerida · conteúdo em revisão
            </span>
          </div>

          <div className="codex-timeline space-y-3">
            {phase.events.map((event, idx) => {
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
                            {String(idx + 1).padStart(2, '0')}.
                          </span>
                          <h4 className={`text-base font-semibold ${isEventDone ? 'line-through text-[#8e887d]' : 'text-[#f0d1a0]'}`}>
                            {event.title}
                          </h4>
                        </div>

                        {/* Event Category / Risk Badge */}
                        <div className="flex items-center gap-2 text-[10px] uppercase font-mono shrink-0">
                          {event.risk === 'critico' && (
                            <span className="text-[#f4ad9b] flex items-center gap-1 font-bold">
                              <AlertTriangle className="w-3 h-3" />
                              Risco Crítico
                            </span>
                          )}
                          {event.risk === 'alerta' && (
                            <span className="text-[#ecd2ac] flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Alerta no roteiro
                            </span>
                          )}
                          <span className="text-[#aea79b]">{event.type}</span>
                        </div>
                      </div>

                      <div className="consult-achievement-preview"><AchievementPreview ids={event.achievements} phases={phases} progress={progress}/></div>
                      <button type="button" className="quest-detail-toggle" aria-expanded={expandedEventId === event.id}
                        aria-controls={`event-details-${event.id}`} onClick={() => onExpandEvent(event.id)}>
                        {expandedEventId === event.id ? 'Recolher instruções' : 'Mostrar instruções e vínculos'}
                      </button>
                      {expandedEventId === event.id && (
                      <div id={`event-details-${event.id}`} className="quest-event-details">
                      {/* Event Note */}
                      <p className="text-base text-[#e1d6c6] leading-relaxed mt-2">
                        {event.note}
                      </p>

                      {/* Failure Risk Explicit Callout */}
                      {event.failureRisk && (
                        <div className="mt-2 text-sm text-[#f4ad9b] bg-[#291714] p-2 rounded border border-[#6b2f24] flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#df8c75]" />
                          <span><b>O que pode dar errado:</b> {event.failureRisk}</span>
                        </div>
                      )}

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
                            <span>Fonte indicada pelo roteiro (verificação pendente)</span>
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
      {phase.achievements.length > 0 && (
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
