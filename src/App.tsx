import React, { useState, useEffect, useMemo } from 'react';
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
import { loadProgress, saveProgress, DEFAULT_PROGRESS } from './utils/storage';

import { Header } from './components/Header';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Modals state
  const [isSphinxOpen, setIsSphinxOpen] = useState(false);
  const [isBarbecueOpen, setIsBarbecueOpen] = useState(false);
  const [isMaistersOpen, setIsMaistersOpen] = useState(false);
  const [isTokensOpen, setIsTokensOpen] = useState(false);
  const [isCheckpointsOpen, setIsCheckpointsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Auto-save to localStorage whenever progress updates
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

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
          return ev.risk === 'critico' || ev.risk === 'alerta';
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
          return ach.missable;
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
    const el = document.getElementById(phaseId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="codex-app min-h-screen text-[#e9e2d7] font-sans flex flex-col selection:bg-[#726044]/40 selection:text-[#f3e5cb]">
      {/* Top Bar Navigation */}
      <Header
        onOpenCheckpoints={() => setIsCheckpointsOpen(true)}
        onOpenTools={() => setIsSphinxOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
      />

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
              <a className="codex-action-primary" href="#melve">INICIAR A JORNADA <span aria-hidden="true">↗</span></a>
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
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 w-full items-start">
        {/* Sticky Desktop Sidebar Nav */}
        <aside className="codex-sidebar hidden lg:block sticky top-36 border border-[#3d372e] p-5 max-h-[calc(100vh-160px)] overflow-y-auto space-y-4">
          <div className="flex items-center gap-2 font-serif text-sm uppercase tracking-wider text-[#d9b780] pb-2 border-b border-[#3d372e]">
            <Compass className="w-4 h-4" />
            <span>Jornada do Nascen</span>
          </div>

          <nav className="space-y-1">
            {PHASES.map((p, idx) => {
              const eventsCount = p.events.length;
              const achCount = p.achievements.length;
              const isDLC = p.id === 'dlc';

              return (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  className={`flex items-center justify-between p-2 rounded text-xs transition-colors group ${
                    isDLC
                      ? 'text-[#a4c7e8] hover:bg-[#1c2430]'
                      : 'text-[#cfc8bd] hover:bg-[#1e2125] hover:text-[#f0d1a0]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] text-[#726044] group-hover:text-[#d9b780]">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="truncate">{p.slug}</span>
                  </div>

                  <span className="text-[10px] font-mono text-[#8e887d] group-hover:text-[#aea79b] shrink-0">
                    {achCount > 0 ? `${achCount} troféus` : `${eventsCount} etapas`}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="pt-3 border-t border-[#3d372e] space-y-1.5 text-xs text-[#aea79b]">
            <span className="text-[10px] font-serif uppercase tracking-wider text-[#726044] block mb-1">
              Atalhos de Acesso Rápido
            </span>
            <button
              onClick={() => setIsCheckpointsOpen(true)}
              className="w-full text-left p-1.5 rounded hover:bg-[#202327] text-[#df8c75] flex items-center justify-between"
            >
              <span>Pontos Sem Retorno</span>
              <ShieldAlert className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsSphinxOpen(true)}
              className="w-full text-left p-1.5 rounded hover:bg-[#202327] text-[#d9b780] flex items-center justify-between"
            >
              <span>Esfinge (10 Enigmas)</span>
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsBarbecueOpen(true)}
              className="w-full text-left p-1.5 rounded hover:bg-[#202327] text-[#ecd2ac] flex items-center justify-between"
            >
              <span>Churrasco (16 Carnes)</span>
              <Flame className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMaistersOpen(true)}
              className="w-full text-left p-1.5 rounded hover:bg-[#202327] text-[#cfc8bd] flex items-center justify-between"
            >
              <span>12 Ensinamentos</span>
              <Award className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Chapters Stream */}
        <main className="codex-main space-y-2 min-w-0">
          {filteredPhases.length === 0 ? (
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
            filteredPhases.map((phase) => (
              <ChapterSection
                key={phase.id}
                phase={phase}
                progress={progress}
                onToggleEvent={handleToggleEvent}
                onToggleAchievement={handleToggleAchievement}
                onConfirmCheckpoint={handleToggleCheckpoint}
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
        onImportSuccess={(newProg) => setProgress(newProg)}
        onResetAll={() => setProgress({ ...DEFAULT_PROGRESS })}
      />
    </div>
  );
}
