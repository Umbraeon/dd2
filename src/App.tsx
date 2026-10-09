import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Compass, 
  ShieldAlert, 
  BookOpen, 
  ExternalLink, 
  Sparkles, 
  Flame, 
  MapPin, 
  Award, 
  HelpCircle, 
  BookMarked,
  Layers,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

import { PHASES, ROADMAP_METADATA } from './data/roadmapData';
import { UserProgress, Phase } from './types/roadmap';
import { loadProgress, saveProgress, DEFAULT_PROGRESS, getProgressStorageError, allowExplicitProgressReplacement } from './utils/storage';
import { selectJourneyStep, deferJourneyStep, listJourneySteps, resolveJourney, firstPendingStep } from './utils/journey';

import { Header } from './components/Header';
import { QuestCodex } from './components/QuestCodex';

import { ProgressSummary } from './components/ProgressSummary';
import { FilterToolbar, FilterType } from './components/FilterToolbar';
import { ChapterSection } from './components/ChapterSection';
import { SphinxTrackerModal } from './components/SphinxTrackerModal';
import { BarbecueTrackerModal } from './components/BarbecueTrackerModal';
import { MaistersTrackerModal } from './components/MaistersTrackerModal';
import { TokensTrackerModal } from './components/TokensTrackerModal';
import { CheckpointsModal } from './components/CheckpointsModal';
import { GlossaryModal } from './components/GlossaryModal';
import { SourcesModal } from './components/SourcesModal';
import { DataBackupModal } from './components/DataBackupModal';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const initialProgress = useRef(progress);
  const [storageIssue, setStorageIssue] = useState(() => getProgressStorageError());
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
  const [navigationNotice, setNavigationNotice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [view, setView] = useState<'journey' | 'consultation'>('journey');
  const [selectedChapter, setSelectedChapter] = useState(() => {
    return resolveJourney(PHASES, progress).target?.phase.id ?? PHASES[0].id;
  });
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  // Modals state
  const [isSphinxOpen, setIsSphinxOpen] = useState(false);
  const [isBarbecueOpen, setIsBarbecueOpen] = useState(false);
  const [isMaistersOpen, setIsMaistersOpen] = useState(false);
  const [isTokensOpen, setIsTokensOpen] = useState(false);
  const [isCheckpointsOpen, setIsCheckpointsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Opening (including React StrictMode effect replay) must not write a timestamp.
  useEffect(() => {
    if (progress !== initialProgress.current) saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!navigationTarget) return;
    const frame = requestAnimationFrame(() => {
      const targetId = navigationTarget.startsWith('phase:') ? navigationTarget.slice(6) :
        navigationTarget.startsWith('achievement:') ? `achievement-${navigationTarget.slice(12)}` :
        `step-${navigationTarget}`;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.focus({ preventScroll: true });
      }
      if (element) setNavigationTarget(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [navigationTarget, view, selectedChapter, expandedEventId, showAchievements]);

  // Handler for toggling an event step
  const handleToggleEvent = (eventId: string) => {
    setProgress((prev) => ({
      ...prev,
      steps: {
        ...prev.steps,
        [eventId]: !prev.steps[eventId]
      }
    }));
  };

  // Handler for toggling an achievement
  const handleToggleAchievement = (achId: number) => {
    setProgress((prev) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        [achId]: !prev.achievements[achId]
      }
    }));
  };

  // Handler for confirming a checkpoint
  const handleToggleCheckpoint = (checkpointId: string) => {
    setProgress((prev) => ({
      ...prev,
      confirmedCheckpoints: {
        ...prev.confirmedCheckpoints,
        [checkpointId]: !prev.confirmedCheckpoints[checkpointId]
      }
    }));
  };

  // Sphinx riddle toggle
  const handleToggleRiddle = (riddleId: string) => {
    setProgress((prev) => ({
      ...prev,
      sphinx: {
        ...prev.sphinx,
        [riddleId]: !prev.sphinx[riddleId]
      }
    }));
  };

  // 1st token location note update
  const handleUpdateFirstTokenLocation = (notes: string) => {
    setProgress((prev) => ({
      ...prev,
      firstTokenLocation: notes
    }));
  };

  // Barbecue meat toggle
  const handleToggleMeatTime = (meatId: string, time: 'day' | 'night') => {
    setProgress((prev) => {
      const current = prev.barbecue[meatId] || { day: false, night: false };
      return {
        ...prev,
        barbecue: {
          ...prev.barbecue,
          [meatId]: {
            ...current,
            [time]: !current[time]
          }
        }
      };
    });
  };

  // Maister skill toggle
  const handleToggleMaisterStatus = (id: string, field: 'acquired' | 'learned') => {
    setProgress((prev) => {
      const current = prev.maisters[id] || { acquired: false, learned: false };
      return {
        ...prev,
        maisters: {
          ...prev.maisters,
          [id]: {
            ...current,
            [field]: !current[field]
          }
        }
      };
    });
  };

  // Seeker tokens counter update
  const handleUpdateTokensCount = (count: number) => {
    setProgress((prev) => ({
      ...prev,
      seekerTokensCount: Math.max(0, count)
    }));
  };

  // Total counts across all phases
  const allEvents = useMemo(() => PHASES.flatMap((p) => p.events), []);
  const allAchievements = useMemo(() => PHASES.flatMap((p) => p.achievements), []);

  const handleSelectJourney = (id: string) => {
    if (!listJourneySteps(PHASES).some(({ event }) => event.id === id && !progress.steps[event.id])) return;
    setProgress(prev => selectJourneyStep(prev, id));
    const found = listJourneySteps(PHASES).find(({ event }) => event.id === id);
    if (found) setSelectedChapter(found.phase.id);
  };

  const handleDeferJourney = (id: string) => {
    if (!listJourneySteps(PHASES).some(({ event }) => event.id === id && !progress.steps[event.id])) return;
    const next = deferJourneyStep(progress, id);
    const suggestion = resolveJourney(PHASES, next).target;
    setProgress(next);
    if (suggestion) setSelectedChapter(suggestion.phase.id);
  };

  const handleNavigateToStep = (id: string) => {
    const found = listJourneySteps(PHASES).find(({ event }) => event.id === id);
    if (!found) return;
    setView('consultation');
    setSelectedChapter(found.phase.id);
    setExpandedEventId(id);
    // The destination may be hidden by search or completion/risk/DLC filters.
    if (searchQuery.trim() || activeFilter !== 'all') {
      setNavigationNotice('Busca e filtros limpos para exibir a etapa solicitada.');
      setSearchQuery('');
      setActiveFilter('all');
    } else {
      setNavigationNotice('');
    }
    setNavigationTarget(id);
  };

  // Filtered phases and events based on searchQuery and activeFilter
  const filteredPhases = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return PHASES.map((phase) => {
      // Filter events
      const matchingEvents = phase.events.filter((ev) => {
        // Text search
        if (q) {
          const matchText = 
            ev.title.toLowerCase().includes(q) ||
            ev.note.toLowerCase().includes(q) ||
            (ev.failureRisk && ev.failureRisk.toLowerCase().includes(q)) ||
            (ev.prerequisites && ev.prerequisites.toLowerCase().includes(q));
          if (!matchText) return false;
        }

        // Filter button
        if (activeFilter === 'missable') {
          return ev.risk === 'critico' || ev.risk === 'alerta' || ev.risk === 'cuidado';
        }
        if (activeFilter === 'timed') {
          return ev.risk === 'alerta' || ev.note.toLowerCase().includes('prazo');
        }
        if (activeFilter === 'undone') {
          return !progress.steps[ev.id];
        }
        if (activeFilter === 'done') {
          return !!progress.steps[ev.id];
        }
        if (activeFilter === 'dlc') {
          return phase.id === 'dlc';
        }
        if (activeFilter === 'base') {
          return phase.id !== 'dlc';
        }
        return true;
      });

      // Filter achievements
      const matchingAchievements = phase.achievements.filter((ach) => {
        // Text search
        if (q) {
          const matchText =
            ach.title.toLowerCase().includes(q) ||
            ach.original.toLowerCase().includes(q) ||
            ach.tip.toLowerCase().includes(q) ||
            ach.category.toLowerCase().includes(q);
          if (!matchText) return false;
        }

        // Filter button
        if (activeFilter === 'missable') {
          return ach.missable;
        }
        if (activeFilter === 'timed') {
          // An achievement marked missable does not necessarily have a deadline.
          return false;
        }
        if (activeFilter === 'undone') {
          return !progress.achievements[ach.id];
        }
        if (activeFilter === 'done') {
          return !!progress.achievements[ach.id];
        }
        if (activeFilter === 'dlc') {
          return ach.dlc;
        }
        if (activeFilter === 'base') {
          return !ach.dlc;
        }
        return true;
      });

      return {
        ...phase,
        events: matchingEvents,
        achievements: matchingAchievements
      };
    }).filter((p) => p.events.length > 0 || p.achievements.length > 0);
  }, [searchQuery, activeFilter, progress]);

  const totalFilteredEvents = filteredPhases.reduce((acc, p) => acc + p.events.length, 0);
  const totalFilteredAchievements = filteredPhases.reduce((acc, p) => acc + p.achievements.length, 0);

  const handleJumpToPhase = (phaseId: string) => {
    if (!PHASES.some(phase => phase.id === phaseId)) return;
    setView('consultation');
    setSelectedChapter(phaseId);
    if (searchQuery || activeFilter !== 'all') {
      setSearchQuery('');
      setActiveFilter('all');
      setNavigationNotice('Busca e filtros limpos para abrir o capítulo solicitado.');
    }
    setNavigationTarget('phase:' + phaseId);
  };

  const handleJumpToAchievement = (phaseId: string, id: number) => {
    setView('consultation');
    setSelectedChapter(phaseId);
    setSearchQuery('');
    setActiveFilter('all');
    setShowAchievements(true);
    setNavigationNotice('Busca e filtros limpos para abrir a conquista solicitada.');
    setNavigationTarget('achievement:' + id);
  };
  const currentPhase = PHASES.find(phase => phase.id === selectedChapter) ?? PHASES[0];
  const visibleChapters = filteredPhases.filter(phase => phase.id === selectedChapter);

  return (
    <div className="codex-app min-h-screen text-[#e9e2d7] font-sans flex flex-col selection:bg-[#726044]/40 selection:text-[#f3e5cb]">
      {/* Top Bar Navigation */}
      <Header
        onOpenCheckpoints={() => setIsCheckpointsOpen(true)}
        onOpenTools={() => setIsSphinxOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onGoJourney={() => { setView('journey'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onGoChapter={handleJumpToPhase}
      />

      {storageIssue && (
        <div role="alert" className="px-4 py-3 bg-[#402219] text-[#ffe3d2] text-sm border-b border-[#bb795b]">
          O progresso armazenado está inválido: {storageIssue} Nenhum dado original será sobrescrito.
          Exporte uma cópia manual do localStorage antes de importar um backup válido ou confirmar uma redefinição.
          <button type="button" className="underline ml-2 font-semibold" onClick={() => setIsBackupOpen(true)}>Abrir backup</button>
        </div>
      )}

      <div role="status" aria-live="polite" className="sr-only">{navigationNotice}</div>
      {view === 'journey' && <QuestCodex
        phases={PHASES}
        progress={progress}
        selectedChapter={selectedChapter}
        onChapterChange={setSelectedChapter}
        onSetActive={handleSelectJourney}
        onDefer={(id) => setProgress(prev => deferJourneyStep(prev, id))}
        onClearSelection={() => setProgress(prev => ({ ...prev, activeStepId: undefined }))}
        onToggleDone={handleToggleEvent}
        onOpenCheckpoints={() => setIsCheckpointsOpen(true)}
        onShowFull={handleNavigateToStep}
        onOpenConsultation={() => setView('consultation')}
      />}
      {view === 'consultation' && <nav className="codex-mode-nav" aria-label="Modos do compêndio">
        <button type="button" onClick={() => setView('journey')}>← Voltar ao diário de missões</button>
      </nav>}
      {view === 'consultation' && <div className="codex-chapter-picker">
        <label htmlFor="chapter-jump">Capítulo do roteiro</label>
        <select id="chapter-jump" value={selectedChapter} onChange={e => handleJumpToPhase(e.target.value)}>
          {PHASES.map((phase, index) => <option key={phase.id} value={phase.id}>{String(index + 1).padStart(2, '0')} · {phase.slug}</option>)}
        </select>
        <span>9 capítulos · consulta integral</span>
      </div>}
      {view === 'consultation' && (
        <>

      {/* Abertura editorial — arte oficial da Steam; composição própria em CSS */}
      <section className="codex-hero" aria-labelledby="hero-title">
        <div className="codex-hero-inner">
          <div className="codex-hero-copy">
            <p className="codex-kicker"><span className="codex-diamond">✦</span> COMPÊNDIO DO NASCEN <span className="codex-kicker-line" /> EDIÇÃO PT-BR</p>
            <div className="codex-title-rule" aria-hidden="true"><span>✥</span></div>
            <h1 id="hero-title" className="codex-hero-title">Dragon’s<br/>Dogma <em>II</em></h1>
            <p className="codex-hero-subtitle">O Caminho do Nascen</p>
            <p className="codex-hero-description">Missões em ordem de progressão, conquistas ilustradas e alertas para decisões que podem bloquear conteúdo. Um companheiro de jornada — não uma promessa de rota infalível.</p>
            <div className="codex-hero-actions">
              <button type="button" className="codex-action-primary" onClick={() => handleJumpToPhase("melve")}>ABRIR MELVE <span aria-hidden="true">↗</span></button>
              <button className="codex-action-secondary" type="button" onClick={() => setIsCheckpointsOpen(true)}>VER ALERTAS CRÍTICOS <ShieldAlert className="w-4 h-4"/></button>
            </div>
            <p className="codex-image-credit">Arte oficial de Dragon’s Dogma 2 © CAPCOM · imagem disponibilizada pela Steam</p>
          </div>
          <div className="codex-hero-insignia" aria-hidden="true">
            <span className="codex-seal-top">VERMUND · BATTAHL · NORGAN</span>
            <div className="codex-seal">
              <span className="codex-seal-inner">II</span>
            </div>
            <span className="codex-seal-bottom">A CRÔNICA CONTINUA</span>
          </div>
        </div>
        <div className="codex-hero-bottom">
          <span>VOLUME I / O JOGO-BASE</span><span>54 CONQUISTAS ORIGINAIS</span><span>6 ADICIONAIS NA EXPANSÃO</span>
        </div>
      </section>

      <div className="codex-editorial-note" role="note">
        <div className="codex-note-emblem" aria-hidden="true">!</div>
        <div><strong>Antes de avançar:</strong> são 53 marcos resumidos e 60 fichas de conquistas, <u>não</u> um registro individual de todas as missões. A sequência foi adaptada de um guia comunitário de 2024 e ainda requer validação etapa a etapa. Faça salvamentos de pousada antes de decisões importantes e confira as fontes.</div>
        <button type="button" onClick={() => setIsSourcesOpen(true)}>Ler fontes ↗</button>
      </div>

      {/* Progress & Quick Tools Bar */}
      <ProgressSummary
        progress={progress}
        totalEventsCount={allEvents.length}
        onOpenSphinx={() => setIsSphinxOpen(true)}
        onOpenBarbecue={() => setIsBarbecueOpen(true)}
        onOpenMaisters={() => setIsMaistersOpen(true)}
        onOpenTokens={() => setIsTokensOpen(true)}
        onOpenCheckpoints={() => setIsCheckpointsOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
      />

      {/* Filter and Search Bar */}
      <FilterToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalFilteredEvents={totalFilteredEvents}
        totalFilteredAchievements={totalFilteredAchievements}
        totalEvents={allEvents.length}
        totalAchievements={allAchievements.length}
      />

      {/* Main Content Layout (Sidebar + Chapters Stream) */}
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 flex-1 w-full min-w-0">
        {/* Chapters Stream */}
        <main className="codex-main space-y-2 min-w-0">
          {(searchQuery.trim() || activeFilter !== 'all') && (
            <section aria-label="Índice de resultados" className="codex-search-index">
              <h2>Resultados encontrados</h2>
              <p>Escolha um resultado para abrir o item exato. A busca e os filtros serão limpos antes de navegar.</p>
              <div className="codex-search-hits">
                {filteredPhases.flatMap(phase => [
                  ...phase.events.map(event => (
                    <button type="button" key={event.id} onClick={() => handleNavigateToStep(event.id)}>
                      <span>{phase.slug} · Marco</span><strong>{event.title}</strong>
                    </button>)),
                  ...phase.achievements.map(ach => (
                    <button type="button" key={`ach-${ach.id}`} onClick={() => handleJumpToAchievement(phase.id, ach.id)}>
                      <span>{phase.slug} · Conquista</span><strong>{ach.title}</strong>
                    </button>))
                ])}
              </div>
            </section>
          )}
          {visibleChapters.length === 0 ? (
            <div className="bg-[#15171a] border border-[#3d372e] rounded-lg p-10 text-center space-y-3">
              <Compass className="w-8 h-8 text-[#726044] mx-auto" />
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Nenhuma etapa ou conquista encontrada
              </h3>
              <p className="text-xs text-[#aea79b] max-w-md mx-auto">
                Não há itens que correspondam ao termo pesquisado ("{searchQuery}") com o filtro ativo.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-4 py-2 text-xs font-semibold rounded bg-[#d9b780] text-[#111315] hover:bg-[#edd9ba] transition-colors"
              >
                Limpar Pesquisa e Filtros
              </button>
            </div>
          ) : (
            visibleChapters.map((phase) => (
              <ChapterSection
                key={phase.id}
                phase={phase}
                progress={progress}
                onToggleEvent={handleToggleEvent}
                onToggleAchievement={handleToggleAchievement}
                onConfirmCheckpoint={handleToggleCheckpoint}
                expandedEventId={expandedEventId}
                onExpandEvent={(id) => setExpandedEventId(prev => prev === id ? null : id)}
                showAchievements={showAchievements}
                onToggleAchievements={() => setShowAchievements(prev => !prev)}
              />
            ))
          )}

          {/* References and Notes Footer Section */}
          <section className="mt-12 pt-8 border-t border-[#726044]/60 bg-[#141619] border border-[#3d372e] rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#d9b780]" />
              <h3 className="font-serif font-bold text-base text-[#f0d1a0]">
                Metodologia & Transparência da Pesquisa
              </h3>
            </div>
            <p className="text-xs text-[#cfc8bd] leading-relaxed">
              Material comunitário em revisão, organizado a partir da rota de 2024, da lista de conquistas da Steam e de guias especializados. <b>As referências não comprovam automaticamente cada instrução</b>. Ao identificar divergência, priorize a descrição oficial e consulte as fontes originais. A expansão <b>Dark Arisen</b> está separada e suas rotas detalhadas ainda não foram confirmadas.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setIsSourcesOpen(true)}
                className="text-xs text-[#d9b780] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Ver tabela completa de fontes auditadas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsGlossaryOpen(true)}
                className="text-xs text-[#cfc8bd] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Consultar glossário bilíngue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        </main>
      </div>

        </>
      )}

            {/* Footer */}
      <footer className="codex-footer border-t border-[#3d372e] py-8 px-4 text-center text-xs text-[#8e887d] space-y-2">
        <p>
          Dragon's Dogma 2 · Rota 100% PT-BR · Guia Comunitário Independente sem Vínculo Oficial com Capcom ou Valve.
        </p>
        <p className="text-[11px] text-[#726044]">
          Compilação comunitária em revisão · 54 conquistas do jogo-base · 6 adicionais da expansão · sem garantia de 100% em uma só campanha
        </p>
      </footer>

      {/* Modals */}
      <SphinxTrackerModal
        isOpen={isSphinxOpen}
        onClose={() => setIsSphinxOpen(false)}
        progress={progress}
        onToggleRiddle={handleToggleRiddle}
        onUpdateFirstTokenLocation={handleUpdateFirstTokenLocation}
      />

      <BarbecueTrackerModal
        isOpen={isBarbecueOpen}
        onClose={() => setIsBarbecueOpen(false)}
        progress={progress}
        onToggleMeatTime={handleToggleMeatTime}
      />

      <MaistersTrackerModal
        isOpen={isMaistersOpen}
        onClose={() => setIsMaistersOpen(false)}
        progress={progress}
        onToggleMaisterStatus={handleToggleMaisterStatus}
      />

      <TokensTrackerModal
        isOpen={isTokensOpen}
        onClose={() => setIsTokensOpen(false)}
        progress={progress}
        onUpdateTokensCount={handleUpdateTokensCount}
        onUpdateFirstTokenLocation={handleUpdateFirstTokenLocation}
      />

      <CheckpointsModal
        isOpen={isCheckpointsOpen}
        onClose={() => setIsCheckpointsOpen(false)}
        progress={progress}
        onToggleCheckpoint={handleToggleCheckpoint}
        onJumpToPhase={handleJumpToPhase}
      />

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
      />

      <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        progress={progress}
        onImportSuccess={(newProg) => {
          allowExplicitProgressReplacement();
          setStorageIssue(null);
          setProgress(newProg);
        }}
        onResetAll={() => {
          allowExplicitProgressReplacement();
          setStorageIssue(null);
          setProgress({ ...DEFAULT_PROGRESS, updatedAt: new Date().toISOString() });
        }}
      />
    </div>
  );
}
