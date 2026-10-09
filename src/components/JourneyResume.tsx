import React from 'react';
import { ArrowRight, Bookmark, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { Phase, UserProgress } from '../types/roadmap';
import { RISK_CHECKPOINTS } from '../data/roadmapData';
import { listJourneySteps, resolveJourney, isStepCompleted, isStepDeferred } from '../utils/journey';

interface JourneyResumeProps {
  phases: readonly Phase[];
  progress: UserProgress;
  onSelect: (id: string) => void;
  onDefer: (id: string) => void;
  onClearSelection: () => void;
  onNavigate: (id: string) => void;
  onOpenCheckpoints: () => void;
}

export const JourneyResume: React.FC<JourneyResumeProps> = ({
  phases, progress, onSelect, onDefer, onClearSelection, onNavigate, onOpenCheckpoints
}) => {
  const journey = resolveJourney(phases, progress);
  const pending = listJourneySteps(phases).filter(({ event }) => !isStepCompleted(progress, event.id));
  const available = pending.filter(({ event }) => !isStepDeferred(progress, event.id));
  const deferred = pending.filter(({ event }) => isStepDeferred(progress, event.id));
  const target = journey.target;
  const chapterAlerts = target ? RISK_CHECKPOINTS.filter(cp => cp.phaseId === target.phase.id) : [];

  return (
    <section aria-labelledby="resume-heading" className="border-b border-[#726044]/60 bg-[#191b1c] px-4 py-4 sm:py-5 lg:px-8">
      <div className="mx-auto max-w-7xl border border-[#66553c] bg-[#211e1a] rounded-lg p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="resume-heading" className="font-serif text-xl sm:text-2xl font-bold text-[#f0d1a0]">Retomar a jornada</h2>
          <span className="text-xs font-medium text-[#e9d6b5]">
            {journey.kind === 'active' ? 'Etapa escolhida por você' :
              journey.kind === 'suggested' ? 'Sugestão do roteiro · não indica sua posição real' :
              journey.kind === 'completed-active' ? 'Etapa escolhida concluída' :
              journey.kind === 'all-complete' ? 'Todos os marcos concluídos' :
              journey.kind === 'deferred-only' ? 'Atividades adiadas' : 'Roteiro indisponível'}
          </span>
        </div>
        {journey.invalidSelection && (
          <p role="status" className="text-sm text-[#e4c5a1]">A etapa selecionada anteriormente não está mais no roteiro. Nenhum progresso foi alterado.</p>
        )}
        {target ? (
          <>
            <div>
              <p className="text-xs text-[#c6b49b]">{target.phase.title} · {target.phase.subtitle}</p>
              <h3 className="text-lg font-semibold text-[#f2e5d2] mt-1">{target.event.title}</h3>
            </div>
            {journey.kind === 'completed-active' ? (
              <div role="status" className="text-sm text-[#b7dbb9] flex items-start gap-2">
                <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" />
                Você concluiu a etapa escolhida. Nada foi selecionado automaticamente. {journey.suggestion ? 'Você pode voltar à sugestão do roteiro ou escolher outra atividade.' : 'As atividades restantes estão adiadas.'}
              </div>
            ) : (
              <>
                <p className="text-sm sm:text-base leading-relaxed text-[#e9e2d7]">{target.event.note || 'Instrução não cadastrada para esta etapa.'}</p>
                {target.event.failureRisk && target.event.source && (
                  <div role="note" className="border-l-2 border-[#c58d6c] pl-3 text-sm text-[#edd0bd]">
                    <strong>Nota de cautela desta etapa (ainda em verificação):</strong> {target.event.failureRisk}
                  </div>
                )}
                {chapterAlerts.length > 0 && (
                  <div role="note" className="text-sm text-[#dfc9a6] flex items-start gap-2">
                    <ShieldAlert size={17} className="shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Há {chapterAlerts.length} alerta(s) cadastrados para este capítulo. O vínculo com esta ação não foi comprovado. <button type="button" onClick={onOpenCheckpoints} className="underline underline-offset-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d1a0]">Consultar alertas do capítulo</button>.</span>
                  </div>
                )}
              </>
            )}
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => onNavigate(target.event.id)}
                className="min-h-11 inline-flex items-center gap-2 bg-[#d9b780] text-[#151412] font-semibold rounded px-4 py-2 hover:bg-[#f0d1a0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Ver instruções completas <ArrowRight size={16} aria-hidden="true"/>
              </button>
              {journey.kind === 'completed-active' ? (
                <button type="button" onClick={onClearSelection} className="min-h-11 border border-[#8a775a] text-[#f0d1a0] px-4 py-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  {journey.suggestion ? 'Ver sugestão do roteiro' : 'Escolher uma atividade pendente'}
                </button>
              ) : (
                <button type="button" onClick={() => onDefer(target.event.id)}
                  className="min-h-11 inline-flex items-center gap-2 border border-[#8a775a] text-[#f0d1a0] px-4 py-2 rounded hover:bg-[#393126] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                  <Bookmark size={16} aria-hidden="true"/> Adiar sem concluir
                </button>
              )}
            </div>
          </>
        ) : (
          <p role="status" className="text-sm sm:text-base text-[#e9e2d7]">
            {journey.kind === 'all-complete' ? 'Você marcou todos os marcos do roteiro como concluídos. Nenhuma próxima missão será presumida.' :
              journey.kind === 'deferred-only' ? 'Todas as atividades pendentes estão adiadas. Escolha uma delas para retomá-la, sem perder marcações.' :
              'Não há atividades disponíveis neste roteiro.'}
          </p>
        )}
        {pending.length > 0 && (
          <div className="border-t border-[#524534] pt-3">
            <label htmlFor="resume-select" className="block text-sm font-semibold text-[#f0d1a0] mb-1">
              Selecionar outra atividade {deferred.length > 0 ? `· ${deferred.length} adiada(s)` : ''}
            </label>
            <select id="resume-select" value="" onChange={e => { if (e.target.value) onSelect(e.target.value); }}
              className="min-h-11 w-full max-w-xl rounded bg-[#121417] border border-[#8a775a] px-3 py-2 text-sm text-[#f2e5d2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f0d1a0]">
              <option value="">Escolha uma etapa pendente…</option>
              <optgroup label="Pendentes">
                {available.map(({ phase, event }) => <option key={event.id} value={event.id}>{phase.slug} · {event.title}</option>)}
              </optgroup>
              {deferred.length > 0 && (
                <optgroup label="Adiadas (selecionar para recuperar)">
                  {deferred.map(({ phase, event }) => <option key={event.id} value={event.id}>{phase.slug} · {event.title}</option>)}
                </optgroup>
              )}
            </select>
          </div>
        )}
        <p className="text-xs text-[#b8ad9c]">Roteiro comunitário resumido; instruções e riscos ainda não foram auditados etapa a etapa. Selecionar ou adiar nunca conclui outras etapas.</p>
      </div>
    </section>
  );
};
