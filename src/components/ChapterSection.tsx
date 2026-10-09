import React from 'react';
import { AlertTriangle, Clock, ShieldAlert, CheckCircle2, Circle, ExternalLink, BookmarkCheck } from 'lucide-react';
import { Phase, QuestEvent, UserProgress } from '../types/roadmap';
import { AchievementCard } from './AchievementCard';
import { RISK_CHECKPOINTS } from '../data/roadmapData';

interface ChapterSectionProps {
  phase: Phase;
  progress: UserProgress;
  onToggleEvent: (eventId: string) => void;
  onToggleAchievement: (achievementId: number) => void;
  onConfirmCheckpoint: (checkpointId: string) => void;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  phase,
  progress,
  onToggleEvent,
  onToggleAchievement,
  onConfirmCheckpoint
}) => {
  // Check if any critical checkpoint belongs to this phase
  const phaseCheckpoints = RISK_CHECKPOINTS.filter(cp => cp.phaseId === phase.id);

  // Calculate phase stats
  const completedEvents = phase.events.filter(e => progress.steps[e.id]).length;
  const completedAchievements = phase.achievements.filter(a => progress.achievements[a.id]).length;

  return (
    <section id={phase.id} className="codex-chapter scroll-mt-32 pt-8 pb-12 border-b border-[#3d372e]/70">
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
            <p className="text-xs text-[#aea79b] mt-0.5 font-sans">
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
          <div className="mt-3 bg-[#1e1c18] border border-[#6b583e] rounded-md p-3 text-xs text-[#ecd2ac] flex items-start gap-2.5">
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
                  Ponto Crítico Sem Retorno: {cp.title}
                </h3>
              </div>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                isConfirmed ? 'bg-[#233b2a] text-[#9bc4a5]' : 'bg-[#4b2720] text-[#f4ad9b]'
              }`}>
                {isConfirmed ? 'Revisado e Confirmado' : 'Atenção Iminente'}
              </span>
            </div>

            <p className="text-xs mt-2 leading-relaxed text-[#dcd6cc]">
              {cp.description}
            </p>

            <div className="mt-3 bg-[#111315]/70 rounded p-3 border border-[#3d372e]/60">
              <span className="text-[11px] font-serif uppercase tracking-wider text-[#d9b780] block mb-1.5">
                Verificações Mandatórias Antes de Avançar:
              </span>
              <ul className="text-xs space-y-1 text-[#cfc8bd]">
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
                <span className="text-xs font-medium text-[#e9e2d7]">
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
              Ordem estrita para minimizar perdas
            </span>
          </div>

          <div className="codex-timeline space-y-3">
            {phase.events.map((event, idx) => {
              const isEventDone = !!progress.steps[event.id];
              return (
                <div
                  key={event.id}
                  className={`codex-step border rounded-lg p-3.5 transition-all ${
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
                      className="mt-0.5 text-[#aea79b] hover:text-[#d9b780] transition-colors shrink-0"
                      title={isEventDone ? "Marcar etapa como pendente" : "Marcar etapa como concluída"}
                      aria-label={`Alternar conclusão da etapa ${event.title}`}
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
                          <h4 className={`text-sm font-semibold ${isEventDone ? 'line-through text-[#8e887d]' : 'text-[#f0d1a0]'}`}>
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
                              Prazo Oculto
                            </span>
                          )}
                          <span className="text-[#aea79b]">{event.type}</span>
                        </div>
                      </div>

                      {/* Event Note */}
                      <p className="text-xs text-[#d0c9be] leading-relaxed mt-1">
                        {event.note}
                      </p>

                      {/* Failure Risk Explicit Callout */}
                      {event.failureRisk && (
                        <div className="mt-2 text-[11px] text-[#f4ad9b] bg-[#291714] p-2 rounded border border-[#6b2f24] flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#df8c75]" />
                          <span><b>O que pode dar errado:</b> {event.failureRisk}</span>
                        </div>
                      )}

                      {/* Associated Achievements Link Tag */}
                      {event.achievements.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#d9b780]">
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          <span className="font-serif">Gera Conquistas:</span>
                          <div className="flex flex-wrap gap-1">
                            {event.achievements.map(achId => {
                              const ach = phase.achievements.find(a => a.id === achId);
                              const achTitle = ach ? ach.title : `Conquista #${achId}`;
                              const isDone = !!progress.achievements[achId];
                              return (
                                <span
                                  key={achId}
                                  className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                    isDone
                                      ? 'bg-[#1b261d] text-[#9bc4a5] border-[#2e4a34]'
                                      : 'bg-[#212429] text-[#ecd2ac] border-[#4a4235]'
                                  }`}
                                >
                                  #{achId} {achTitle}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Source Link */}
                      {event.source && (
                        <div className="mt-2 text-[10px] text-[#8e887d]">
                          <a
                            href={event.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#d9b780] inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Fonte de conferência da missão</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
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
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#d9b780]">
              Conquistas Deste Capítulo ({phase.achievements.length})
            </h3>
            <span className="text-[10px] text-[#8e887d] font-sans">
              Desbloqueie nesta ordem cronológica
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {phase.achievements.map(ach => (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                isCompleted={!!progress.achievements[ach.id]}
                onToggle={onToggleAchievement}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
