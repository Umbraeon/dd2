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
import { Consultation, ConsultationFilter, ConsultationSection } from './components/Consultation';
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
  const [activeFilter, setActiveFilter] = useState<ConsultationFilter>('all');
  const [consultationSection, setConsultationSection] = useState<ConsultationSection>('missions');
  const [selectedAchievementId, setSelectedAchievementId] = useState<number | null>(null);
  const [view, setView] = useState<'journey' | 'consultation'>('journey');
  const [selectedChapter, setSelectedChapter] = useState(() => {
    return resolveJourney(PHASES, progress).target?.phase.id ?? PHASES[0].id;
  });
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

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
      const targetId = navigationTarget === 'journey' ? 'resume-heading' :
         navigationTarget.startsWith('phase:') ? navigationTarget.slice(6) :
        navigationTarget.startsWith('achievement:') ? `achievement-${navigationTarget.slice(12)}` :
        `step-${navigationTarget}`;
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
        element.focus({ preventScroll: true });
      }
      if (element) setNavigationTarget(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [navigationTarget, view, selectedChapter, expandedEventId, consultationSection, selectedAchievementId]);

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
    setConsultationSection('missions');
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

  const handleJumpToPhase = (phaseId: string) => {
    if (!PHASES.some(phase => phase.id === phaseId)) return;
    setView('consultation');
    setConsultationSection('missions');
    setSelectedChapter(phaseId);
    setExpandedEventId(null);
    if (searchQuery.trim() || activeFilter !== 'all') {
      setNavigationNotice('Busca e filtros limpos para abrir o capítulo solicitado.');
      setSearchQuery('');
      setActiveFilter('all');
    } else setNavigationNotice('');
    setNavigationTarget('phase:' + phaseId);
  };

  const handleJumpToAchievement = (phaseId: string, id: number) => {
    if (!PHASES.some(phase => phase.id === phaseId && phase.achievements.some(a => a.id === id))) return;
    setView('consultation');
    setConsultationSection('achievements');
    setSelectedAchievementId(id);
    if (searchQuery.trim() || activeFilter !== 'all') {
      setNavigationNotice('Busca e filtros limpos para abrir a conquista solicitada.');
      setSearchQuery('');
      setActiveFilter('all');
    } else setNavigationNotice('');
    setNavigationTarget('achievement:' + id);
  };

  const handleGoJourney = () => {
    setView('journey');
    setNavigationTarget('journey');
  };

  return (
    <div className="codex-app min-h-screen text-[#e9e2d7] font-sans flex flex-col selection:bg-[#726044]/40 selection:text-[#f3e5cb]">
      {/* Top Bar Navigation */}
      <Header
        onOpenCheckpoints={() => setIsCheckpointsOpen(true)}
        onOpenTools={() => setIsSphinxOpen(true)}
        onOpenSources={() => view === 'consultation' ? setConsultationSection('references') : setIsSourcesOpen(true)}
        onOpenBackup={() => setIsBackupOpen(true)}
        onGoJourney={handleGoJourney}
        onGoChapter={handleJumpToPhase}
      />

      {storageIssue && (
        <div role="alert" className="px-4 py-3 bg-[#402219] text-[#ffe3d2] text-sm border-b border-[#bb795b]">
          O progresso armazenado está inválido: {storageIssue} Nenhum dado original será sobrescrito.
          Exporte uma cópia manual do localStorage antes de importar um backup válido ou confirmar uma redefinição.
          <button type="button" className="underline ml-2 font-semibold" onClick={() => setIsBackupOpen(true)}>Abrir backup</button>
        </div>
      )}

      {navigationNotice && view === "consultation" && <p role="status" className="consult-nav-notice">{navigationNotice}</p>}
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
        onOpenAchievement={handleJumpToAchievement}
        onOpenConsultation={() => setView('consultation')}
      />}
      {view === 'consultation' && (
        <Consultation phases={PHASES} progress={progress}
          section={consultationSection} onSectionChange={setConsultationSection}
          chapter={selectedChapter} onChapterChange={setSelectedChapter}
          search={searchQuery} onSearchChange={setSearchQuery}
          filter={activeFilter} onFilterChange={setActiveFilter}
          selectedAchievementId={selectedAchievementId} onClearAchievement={() => setSelectedAchievementId(null)}
          expandedEventId={expandedEventId} onExpandEvent={id => setExpandedEventId(prev => prev === id ? null : id)}
          onOpenEvent={handleNavigateToStep} onOpenAchievement={handleJumpToAchievement}
          onToggleEvent={handleToggleEvent} onToggleAchievement={handleToggleAchievement}
          onConfirmCheckpoint={handleToggleCheckpoint} onGoJourney={handleGoJourney}
          onOpenCheckpoints={() => setIsCheckpointsOpen(true)}
          onOpenSources={() => setIsSourcesOpen(true)}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenSphinx={() => setIsSphinxOpen(true)}
          onOpenBarbecue={() => setIsBarbecueOpen(true)}
          onOpenMaisters={() => setIsMaistersOpen(true)}
          onOpenTokens={() => setIsTokensOpen(true)}
        />
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
