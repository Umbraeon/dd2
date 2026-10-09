import React, { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Check, ChevronRight, Compass, ShieldAlert } from 'lucide-react';
import type { Phase, UserProgress } from '../types/roadmap';
import { RISK_CHECKPOINTS } from '../data/roadmapData';
import { isStepCompleted, isStepDeferred, resolveJourney } from '../utils/journey';

interface JourneyLogProps {
  phase: Phase;
  phases: readonly Phase[];
  progress: UserProgress;
  onSelect: (id: string) => void;
  onDetails: (id: string) => void;
  onOpenCheckpoints: () => void;
}

export const JourneyLog: React.FC<JourneyLogProps> = ({
  phase, phases, progress, onSelect, onDetails, onOpenCheckpoints
}) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const resolved = resolveJourney(phases, progress);
  const selectedId = resolved.target?.event.id;
  const checkpointCount = RISK_CHECKPOINTS.filter(cp => cp.phaseId === phase.id).length;
  const visibleEvents = phase.events.filter(event =>
    showCompleted || !isStepCompleted(progress, event.id) || event.id === selectedId
  );
  const completedCount = phase.events.filter(event => isStepCompleted(progress, event.id)).length;

  return (
    <section className="quest-journal" aria-labelledby="journal-heading">
      <div className="journal-heading">
        <div>
          <p className="journal-eyebrow">REGISTRO DE VIAGEM · JORNADA</p>
          <h2 id="journal-heading">Diário de atividades</h2>
          <p>Escolha uma atividade. A seleção não conclui as anteriores.</p>
        </div>
        <span className="journal-count">{completedCount} / {phase.events.length} marcos marcados</span>
      </div>

      <h3 className="journal-chapter-title">{phase.title} <span>· {phase.subtitle}</span></h3>
      {phase.cue && (
        <p className="journal-chapter-cue"><Compass size={18} aria-hidden="true" /> Orientação cadastrada para {phase.slug}: {phase.cue}</p>
      )}
      {checkpointCount > 0 && (
        <div className="journal-chapter-warning" role="note">
          <ShieldAlert size={20} aria-hidden="true" />
          <p>{checkpointCount} alerta(s) registrados para este capítulo. Os gatilhos de cada etapa ainda estão em verificação.</p>
          <button type="button" onClick={onOpenCheckpoints}>Consultar alertas <ArrowUpRight size={17} aria-hidden="true" /></button>
        </div>
      )}
      <div className="journal-list" role="list" aria-label={`Atividades de ${phase.slug}`}>
        {visibleEvents.map((event, index) => {
          const completed = isStepCompleted(progress, event.id);
          const deferred = isStepDeferred(progress, event.id);
          const selected = selectedId === event.id;
          return (
            <div className={`journal-entry ${selected ? 'is-selected' : ''}`} key={event.id} role="listitem">
              <span className="journal-entry-number" aria-hidden="true">{String(phase.events.indexOf(event) + 1).padStart(2, '0')}</span>
              <div className="journal-entry-content">
                <strong>{event.title}</strong>
                <span className="journal-entry-status">
                  {selected ? (resolved.kind === 'active' ? 'ESCOLHIDA' : resolved.kind === 'completed-active' ? 'ESCOLHIDA · CONCLUÍDA' : 'SUGERIDA') : completed ? 'CONCLUÍDA' : deferred ? 'ADIADA' : 'PENDENTE'}
                  {event.failureRisk ? ' · Nota de cautela em verificação' : ''}
                </span>
              </div>
              {selected && <span className="journal-active-symbol" aria-label={resolved.kind === 'suggested' ? 'Sugestão em destaque' : 'Etapa escolhida em destaque'}>
                {resolved.kind === 'suggested' ? <Compass size={17} /> : <Check size={17} />}
              </span>}
              {completed ? (
                <button className="journal-entry-action" type="button" onClick={() => onDetails(event.id)}
                  aria-label={`Consultar etapa concluída: ${event.title}`}>Consultar <ChevronRight size={17} aria-hidden="true"/></button>
              ) : (
                <button className="journal-entry-action" type="button" onClick={() => {
                  onSelect(event.id);
                  document.getElementById('resume-heading')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
                }} aria-label={`Selecionar atividade: ${event.title}`}>
                  {selected && resolved.kind === 'active' ? 'Selecionada' : deferred ? 'Retomar' : 'Escolher'} <ChevronRight size={17} aria-hidden="true"/>
                </button>
              )}
            </div>
          );
        })}
        {visibleEvents.length === 0 && <p className="journal-empty">Não há marcos pendentes neste capítulo.</p>}
      </div>
      {completedCount > 0 && (
        <button type="button" className="journal-toggle-completed" aria-expanded={showCompleted} onClick={() => setShowCompleted(value => !value)}>
          {showCompleted ? 'Ocultar atividades concluídas' : `Mostrar ${completedCount} atividade(s) concluída(s)`}
        </button>
      )}
      <p className="journal-disclaimer"><AlertTriangle size={16} aria-hidden="true"/> Estes 53 marcos são resumos comunitários, não a lista completa de missões. Avisos específicos permanecem sujeitos à verificação.</p>
    </section>
  );
};
