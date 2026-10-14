import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Bookmark, Check, CheckCircle2, ChevronDown, ChevronRight, Circle, Compass, ExternalLink, ShieldAlert, SkipForward } from 'lucide-react';
import type { Phase, QuestEvent, UserProgress } from '../types/roadmap';
import { AchievementPreview, InlineAchievements } from './InlineAchievements';
import { QuestWalkthroughsForEvent } from './QuestGuides';
import { JourneyCategoryBadge } from './JourneyCategoryBadge';
import { isStepCompleted, isStepDeferred, listJourneySteps, resolveJourney } from '../utils/journey';

const USER_PANORAMA = '/assets/gemini-codex-panorama.webp';
// AI illustration supplied by the project owner: fictional generic landscape, never mission evidence.
const PROMO_IMAGE = 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2054970/library_hero.jpg';
// CAPCOM promotional artwork distributed on Steam. Generic illustration, NEVER evidence of a quest location.
interface Props {
  phases: readonly Phase[];
  progress: UserProgress;
  selectedChapter: string;
  onChapterChange: (id: string) => void;
  onSetActive: (id: string) => void;
  onDefer: (id: string) => void;
  onClearSelection: () => void;
  onToggleDone: (id: string) => void;
  onShowFull: (id: string) => void;
  onOpenAchievement: (phaseId: string, id: number) => void;
  onOpenConsultation: () => void;
}
export const QuestCodex: React.FC<Props> = ({
  phases, progress, selectedChapter, onChapterChange, onSetActive, onDefer,
  onClearSelection, onToggleDone, onShowFull, onOpenAchievement, onOpenConsultation
}) => {
  const journey = resolveJourney(phases, progress);
  const [inspectedId, setInspectedId] = useState(() => journey.target?.event.id ?? listJourneySteps(phases)[0]?.event.id ?? '');
  const [tab, setTab] = useState<'pending' | 'completed'>(() => journey.kind === 'all-complete' || journey.kind === 'completed-active' ? 'completed' : 'pending');
  const [mobileDetail, setMobileDetail] = useState(false);
  const [more, setMore] = useState(false);
  // Generated file is owner-supplied separately; fall back safely until it is added to public/assets.
  const [imageKind, setImageKind] = useState<'gemini' | 'promo' | 'fallback'>('gemini');
  const phase = phases.find(item => item.id === selectedChapter) ?? phases[0];
  const all = listJourneySteps(phases);
  const inspected = all.find(({ event }) => event.id === inspectedId) ??
    (journey.target && journey.target.phase.id === phase.id ? journey.target : undefined) ??
    all.find(step => step.phase.id === phase.id);
  const displayed = inspected?.phase.id === phase.id ? inspected : all.find(step => step.phase.id === phase.id);
  const event = displayed?.event;
  const completed = event ? isStepCompleted(progress, event.id) : false;
  const deferred = event ? isStepDeferred(progress, event.id) : false;
  const active = event ? progress.activeStepId === event.id : false;
  const suggestion = event && journey.kind === 'suggested' && journey.target?.event.id === event.id;
  const pendingCount = phase.events.filter(e => !isStepCompleted(progress, e.id)).length;
  const isEveryStepDone = all.length > 0 && all.every(s => isStepCompleted(progress, s.event.id));
  const filteredEvents = phase.events.filter(e => tab === 'completed' ? isStepCompleted(progress, e.id) : !isStepCompleted(progress, e.id));
  // An explicit navigation shortcut, never a change to the saved active step.
  // If every remaining activity is deferred, allow returning to the first one.
  const returnTarget = journey.target ??
    (journey.kind === 'deferred-only'
      ? all.find(step => !isStepCompleted(progress, step.event.id) && isStepDeferred(progress, step.event.id))
      : undefined);
  const returnTargetDone = returnTarget ? isStepCompleted(progress, returnTarget.event.id) : false;
  const showReturn = !!returnTarget && (
    displayed?.event.id !== returnTarget.event.id ||
    phase.id !== returnTarget.phase.id ||
    tab !== (returnTargetDone ? 'completed' : 'pending')
  );
  const returnLabel = journey.kind === 'suggested' ? 'Voltar à sugestão' :
    journey.kind === 'completed-active' ? 'Rever etapa concluída' :
    journey.kind === 'deferred-only' ? 'Rever uma adiada' : 'Voltar à etapa atual';
  const returnToJourneyTarget = () => {
    if (!returnTarget) return;
    onChapterChange(returnTarget.phase.id);
    setInspectedId(returnTarget.event.id);
    setTab(returnTargetDone ? 'completed' : 'pending');
    setMobileDetail(false);
    setMore(false);
    // Focus the exact row after React has rendered its chapter and filter.
    requestAnimationFrame(() => {
      const row = document.getElementById(`journey-row-${returnTarget.event.id}`);
      row?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      row?.focus({ preventScroll: true });
    });
  };
  const inspect = (target: QuestEvent) => {
    setInspectedId(target.id);
    setMore(false);
    setMobileDetail(true);
  };
  const selectChapter = (id: string) => {
    onChapterChange(id);
    const next = phases.find(p => p.id === id);
    const preferred = next?.events.find(e => e.id === progress.activeStepId || e.id === journey.target?.event.id);
    const first = preferred ?? next?.events.find(e => !isStepCompleted(progress, e.id)) ?? next?.events[0];
    if (first) setInspectedId(first.id);
    setTab(next?.events.some(e => !isStepCompleted(progress, e.id)) ? 'pending' : 'completed');
    setMobileDetail(false);
    setMore(false);
  };
  const statusText = journey.kind === 'active' ? 'Etapa escolhida por você' :
    journey.kind === 'suggested' ? 'Próxima etapa sugerida' :
    journey.kind === 'completed-active' ? 'Etapa escolhida concluída' :
    journey.kind === 'all-complete' ? 'Todos os marcos concluídos' :
    journey.kind === 'deferred-only' ? 'Atividades adiadas' : 'Roteiro indisponível';

  return (
    <main className={`quest-codex ${mobileDetail ? 'detail-open' : ''}`} aria-label="Diário de missões do Nascen">
      <div className="codex-frame-corner top-left" aria-hidden="true">✥</div>
      <div className="codex-frame-corner top-right" aria-hidden="true">✥</div>
      <div className="quest-master">
        <div className="quest-master-heading">
          <span className="quest-overline">COMPÊNDIO DO NASCEN <span aria-hidden="true">✦</span> CRÔNICAS DE VIAGEM</span>
          <h1 id="resume-heading">Diário do Nascen</h1>
          <p className="quest-resume-status" role="status">{statusText}</p>
          {showReturn && <button className="quest-return-target" type="button" onClick={returnToJourneyTarget}>
            {returnLabel} <ArrowLeft size={13} aria-hidden="true" />
          </button>}
          {journey.invalidSelection && <p role="status" className="quest-muted">A etapa anteriormente escolhida não está no roteiro. Progresso preservado.</p>}
        </div>
        <div className="quest-master-controls">
          <div className="quest-tabs" role="group" aria-label="Estado das atividades">
            <button type="button" aria-pressed={tab === 'pending'} onClick={() => setTab('pending')}>Em andamento <span>{pendingCount}</span></button>
            <button type="button" aria-pressed={tab === 'completed'} onClick={() => setTab('completed')}>Concluídas <span>{phase.events.length - pendingCount}</span></button>
          </div>
          <label className="quest-chapter-label" htmlFor="chapter-jump">Capítulo</label>
          <select id="chapter-jump" value={phase.id} onChange={e => selectChapter(e.target.value)}>
            {phases.map((p, i) => <option key={p.id} value={p.id}>{String(i + 1).padStart(2, '0')} · {p.slug}</option>)}
          </select>
          <p className="quest-chapter-subtitle">{phase.title} · {phase.subtitle}</p>
        </div>
        <div className="quest-master-scroll" role="list" aria-label={`Atividades de ${phase.slug}`}>
          {filteredEvents.map(e => {
            const chosen = displayed?.event.id === e.id;
            const isActive = progress.activeStepId === e.id;
            const isDeferred = isStepDeferred(progress, e.id);
            const isSuggested = journey.kind === 'suggested' && journey.target?.event.id === e.id;
            return <div key={e.id} role="listitem" className={`quest-row ${chosen ? 'is-inspected' : ''}`}>
              <button type="button" id={`journey-row-${e.id}`} onClick={() => inspect(e)}
                aria-current={chosen ? 'true' : undefined}
                aria-label={`Consultar atividade: ${e.title}${e.achievements.length ? ` · ${new Set(e.achievements).size} conquistas para acompanhar` : ""}`}
                className="quest-row-button">
                <span className="quest-row-symbol" aria-hidden="true">
                  {isStepCompleted(progress, e.id) ? <CheckCircle2 size={17}/> : isActive ? <Bookmark size={17}/> : isDeferred ? <SkipForward size={17}/> : isSuggested ? <Compass size={17}/> : <Circle size={13}/>}
                </span>
                <span className="quest-row-main">
                  <strong>{e.title}</strong>
                  <span className="quest-row-meta">
                    <JourneyCategoryBadge event={e} compact />
                    {(isActive || isSuggested || isDeferred) && <small>
                      {isActive ? 'ATUAL FIXADA' : isDeferred ? 'ADIADA' : 'SUGERIDA'}
                    </small>}
                    {e.achievements.length > 0 && <AchievementPreview ids={e.achievements} phases={phases} progress={progress} />}
                  </span>
                </span>
                <ChevronRight className="quest-row-chevron" size={18} aria-hidden="true" />
              </button>
            </div>;
          })}
          {!filteredEvents.length && <p className="quest-empty">{tab === 'completed' ? 'Nenhuma atividade concluída neste capítulo.' : 'Todos os marcos deste capítulo estão marcados. Use a aba Concluídas.'}</p>}
          {isEveryStepDone && <p className="quest-done-message">Todos os marcos concluídos. Nenhuma próxima missão será presumida.</p>}
        </div>
        <div className="quest-master-foot">
          <p>{all.length} etapas resumidas do roteiro</p>
          <button type="button" onClick={onOpenConsultation}>Consulta e ferramentas <BookOpen size={15} aria-hidden="true"/></button>
        </div>
      </div>
      <section className="quest-detail" aria-labelledby="quest-detail-heading">
        <button type="button" className="quest-back" onClick={() => setMobileDetail(false)}>
          <ArrowLeft size={19} aria-hidden="true" /> Voltar à lista de missões
        </button>
        {event ? <>
          <div className="quest-detail-scroll">
            <figure className="quest-panorama">
              {imageKind === 'gemini' ? (
                <img src={USER_PANORAMA} alt="Ilustração decorativa de paisagem fantástica." onError={() => setImageKind('promo')} />
              ) : imageKind === 'promo' ? (
                <img src={PROMO_IMAGE} alt="Arte promocional de Dragon's Dogma 2." onError={() => setImageKind('fallback')} />
              ) : (
                <img className="quest-fallback-scene" src="/assets/chronicles-panorama.svg" alt="Ilustração decorativa de paisagem fantástica." />
              )}
              {imageKind === 'promo' && <figcaption>Arte promocional © CAPCOM</figcaption>}
            </figure>
            <div className="quest-detail-body">
              <p className="quest-detail-chapter">{displayed?.phase.slug} <span aria-hidden="true">·</span> <JourneyCategoryBadge event={event} /></p>
              <h2 id="quest-detail-heading">{event.title}</h2>
              <div className="quest-state-row">
                <span>{active ? 'ATIVIDADE FIXADA COMO ATUAL' : suggestion ? 'SUGESTÃO DO ROTEIRO' : completed ? 'CONCLUÍDA' : deferred ? 'ADIADA' : 'APENAS EM CONSULTA'}</span>

              </div>
              <div className="quest-objective"><span className="quest-section-kicker">O QUE FAZER</span>
                <p>{event.note}</p>
              </div>
              {event.prerequisites && <div className="quest-requirements">
                <h3>Antes de começar</h3><p>{event.prerequisites}</p>
              </div>}
              {event.failureRisk && (event.risk === 'critico' || event.risk === 'alerta') && <div className="quest-warning" role="note">
                <ShieldAlert size={19} aria-hidden="true"/><div><h3>Antes de avançar</h3><p>{event.failureRisk}</p></div>
              </div>}
              <QuestWalkthroughsForEvent eventId={event.id} />
              <InlineAchievements key={event.id} ids={event.achievements} phases={phases} progress={progress} onOpenAchievement={onOpenAchievement} />
              <button className="quest-more-toggle" type="button" aria-expanded={more} onClick={() => setMore(v => !v)}>
                Detalhes e fonte <ChevronDown size={17} aria-hidden="true" />
              </button>

              {more && <div className="quest-more-content">
                {event.source && <a href={event.source} target="_blank" rel="noopener noreferrer">Fonte da etapa <ExternalLink size={15} aria-hidden="true"/></a>}
                <button type="button" onClick={() => onShowFull(event.id)}>Abrir ficha completa na Consulta <ChevronRight size={16} aria-hidden="true"/></button>
              </div>}
            </div>
          </div>
          <div className="quest-detail-actions">
            <div className="quest-active-actions">
              {active ? <button type="button" onClick={onClearSelection}><Bookmark size={16} aria-hidden="true"/> Desafixar atual</button> :
                !completed && <button type="button" onClick={() => onSetActive(event.id)}><Bookmark size={16} aria-hidden="true"/> {deferred ? 'Retomar e fixar' : 'Fixar como atual'}</button>}
              <button type="button" onClick={() => onToggleDone(event.id)}><Check size={17} aria-hidden="true"/> {completed ? 'Desmarcar conclusão' : 'Concluir marco'}</button>
              {!completed && !deferred && <button type="button" onClick={() => onDefer(event.id)}><SkipForward size={16} aria-hidden="true"/> Adiar</button>}
            </div>
            {journey.kind === 'completed-active' && <p className="quest-state-note">Etapa escolhida concluída. O próximo marco não será fixado automaticamente.</p>}
          </div>
        </> : <p className="quest-empty">Nenhuma atividade disponível neste capítulo.</p>}
      </section>
      <div className="codex-frame-corner bottom-left" aria-hidden="true">✥</div>
      <div className="codex-frame-corner bottom-right" aria-hidden="true">✥</div>
    </main>
  );
};
