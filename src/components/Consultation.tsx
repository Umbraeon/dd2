import React, { useEffect, useMemo, useState } from 'react';
import { Search, X, BookOpen, ListChecks, Award, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import type { Phase, UserProgress } from '../types/roadmap';
import { ROADMAP_METADATA } from '../data/roadmapData';
import { ChapterSection } from './ChapterSection';
import { AchievementCard } from './AchievementCard';
import { AchievementMiniIcon } from './InlineAchievements';
import { QuestGuideLibrary } from './QuestGuides';
import { QUEST_GUIDES } from '../data/questGuides';
import { QUEST_ITEM_REQUIREMENTS } from '../data/questItemRequirements';

export type ConsultationSection = 'missions' | 'achievements' | 'guides' | 'references';
export type ConsultationFilter = 'all' | 'undone' | 'done';

interface Props {
  phases: readonly Phase[];
  progress: UserProgress;
  section: ConsultationSection;
  onSectionChange: (section: ConsultationSection) => void;
  chapter: string;
  onChapterChange: (id: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  filter: ConsultationFilter;
  onFilterChange: (filter: ConsultationFilter) => void;
  selectedAchievementId: number | null;
  onClearAchievement: () => void;
  expandedEventId: string | null;
  onExpandEvent: (id: string) => void;
  onOpenEvent: (id: string) => void;
  onOpenAchievement: (phaseId: string, id: number) => void;
  onToggleEvent: (id: string) => void;
  onToggleAchievement: (id: number) => void;
  onConfirmCheckpoint: (id: string) => void;
  onGoJourney: () => void;
  onOpenSources: () => void;
  onOpenGlossary: () => void;
  onOpenTools: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toolsExpanded: boolean;
}

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();

export const Consultation: React.FC<Props> = ({
  phases, progress, section, onSectionChange, chapter, onChapterChange,
  search, onSearchChange, filter, onFilterChange, selectedAchievementId,
  onClearAchievement, expandedEventId, onExpandEvent, onOpenEvent,
  onOpenAchievement, onToggleEvent, onToggleAchievement, onConfirmCheckpoint,
  onGoJourney, onOpenSources, onOpenGlossary, onOpenTools, toolsExpanded
}) => {
  const [achievementChapter, setAchievementChapter] = useState('all');
  const [selectedGuideId, setSelectedGuideId] = useState('');
  useEffect(() => { if (selectedAchievementId !== null) setAchievementChapter('all'); }, [selectedAchievementId]);
  const achievements = useMemo(() => {
    const unique = new Map<number, { phase: Phase; achievement: Phase['achievements'][number] }>();
    for (const phase of phases) for (const achievement of phase.achievements) {
      if (!unique.has(achievement.id)) unique.set(achievement.id, { phase, achievement });
    }
    return [...unique.values()].sort((a, b) => a.achievement.id - b.achievement.id);
  }, [phases]);
  const totalEvents = phases.reduce((total, phase) => total + phase.events.length, 0);
  const query = normalize(search);
  const results = useMemo(() => query ? [
    ...phases.flatMap(phase => [
    ...phase.events.filter(event => normalize([
      event.title, event.note, event.prerequisites ?? '', event.failureRisk ?? '',
      event.type
    ].join(' ')).includes(query)).map(event => ({
      type: 'mission' as const, phase, id: event.id, title: event.title
    })),
    ...phase.achievements.filter(achievement => normalize([
      achievement.title, achievement.original, achievement.tip,
      achievement.category, achievement.validation, achievement.phase
    ].join(' ')).includes(query)).map(achievement => ({
      type: 'achievement' as const, phase, id: achievement.id, title: achievement.title
    }))
    ]),
    ...QUEST_GUIDES.filter(guide =>
      normalize([guide.title, guide.original, guide.region, guide.giver,
        ...guide.steps,
        ...(QUEST_ITEM_REQUIREMENTS[guide.id]?.items.flatMap(item => [item.name, item.namePt ?? '', item.where, item.use, item.forgedName ?? '', item.forgedNamePt ?? '']) ?? [])
      ].join(' ')).includes(query)).map(guide => ({
      type: 'guide' as const, phase: phases[0], id: guide.id, title: guide.title
    }))
  ] : [], [phases, query]);
  const activePhase = phases.find(item => item.id === chapter) ?? phases[0];
  const matchingEvents = activePhase.events.filter(event =>
    filter === 'all' || (filter === 'done' ? !!progress.steps[event.id] : !progress.steps[event.id]));
  const selectedAchievement = achievements.find(item => item.achievement.id === selectedAchievementId);
  const visibleAchievements = achievements.filter(({ phase, achievement }) =>
    (achievementChapter === 'all' || phase.id === achievementChapter) &&
    (filter === 'all' || (filter === 'done' ? !!progress.achievements[achievement.id] : !progress.achievements[achievement.id])));
  const clearFilters = () => { onSearchChange(''); onFilterChange('all'); };
  const chooseSection = (next: ConsultationSection) => {
    clearFilters();
    onSectionChange(next);
  };

  return (
    <main className="consultation" aria-labelledby="consult-title">
      <div className="consult-heading">
        <div>
          <p className="consult-eyebrow">COMPÊNDIO DO NASCEN <span aria-hidden="true">✦</span> ACERVO DE CONSULTA</p>
          <h1 id="consult-title">Consulta</h1>
          <p>Pesquise o roteiro, examine requisitos e confira as fontes sem perder seu progresso.</p>
        </div>
        <button type="button" className="consult-return" onClick={onGoJourney}><ArrowLeft size={17} aria-hidden="true"/> Voltar ao Diário</button>
      </div>

      <div className="consult-search-area" role="search" aria-label="Busca global no compêndio">
        <label htmlFor="consult-search">Buscar em todos os 9 capítulos</label>
        <div className="consult-search-field">
          <Search size={19} aria-hidden="true"/>
          <input id="consult-search" type="search" value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Missão, conquista, personagem, requisito..."
            autoComplete="off"/>
          {search && <button type="button" onClick={() => onSearchChange('')} aria-label="Limpar busca"><X size={18} aria-hidden="true"/></button>}
        </div>
        <p className="consult-search-hint">{totalEvents} etapas do roteiro · {achievements.length} conquistas</p>
      </div>

      <nav className="consult-sections" aria-label="Seções da Consulta">
        <button type="button" aria-pressed={section === 'missions'} className={section === 'missions' ? 'is-active' : ''} onClick={() => chooseSection('missions')}>
          <ListChecks size={17} aria-hidden="true"/> Missões
        </button>
        <button type="button" aria-pressed={section === 'achievements'} className={section === 'achievements' ? 'is-active' : ''} onClick={() => chooseSection('achievements')}>
          <Award size={17} aria-hidden="true"/> Conquistas
        </button>
        <button type="button" aria-pressed={section === 'guides'} className={section === 'guides' ? 'is-active' : ''} onClick={() => chooseSection('guides')}>
          <BookOpen size={17} aria-hidden="true"/> Guias e cópias
        </button>
        <button type="button" aria-pressed={section === 'references'} className={section === 'references' ? 'is-active' : ''} onClick={() => chooseSection('references')}>
          <BookOpen size={17} aria-hidden="true"/> Referências
        </button>
      </nav>

      {query ? (
        <section className="consult-results" aria-labelledby="consult-results-title">
          <div className="consult-section-title">
            <div><p className="consult-eyebrow">BUSCA GLOBAL</p><h2 id="consult-results-title">Resultados encontrados</h2></div>
            <span role="status" aria-live="polite">{results.length} {results.length === 1 ? 'resultado' : 'resultados'}</span>
          </div>
          <p className="consult-muted">Cada resultado abre a ficha exata, mesmo em outro capítulo. A busca e os filtros serão limpos.</p>
          {results.length ? (
            <div className="consult-results-list">
              {results.map(result =>
                <button type="button" key={result.type + ':' + result.id}
                  onClick={() => result.type === 'mission' ? onOpenEvent(String(result.id)) : result.type === 'achievement' ? onOpenAchievement(result.phase.id, Number(result.id)) : (setSelectedGuideId(String(result.id)), onSearchChange(''), onSectionChange('guides'))}>
                  <span>{result.type === 'guide' ? 'Guia de missão' : `${result.phase.slug} · ${result.type === 'mission' ? 'Marco' : 'Conquista'}`}</span>
                  <strong>{result.title}</strong><ChevronRight size={18} aria-hidden="true"/>
                </button>
              )}
            </div>
          ) : (
            <div className="consult-empty" role="status">
              <h3>Nenhum resultado para “{search}”</h3>
              <p>Tente outro termo ou consulte os capítulos e as conquistas sem filtros.</p>
              <button type="button" onClick={clearFilters}>Limpar busca e filtros</button>
            </div>
          )}
        </section>
      ) : (
        <>
          {(section === 'missions' || section === 'achievements') && (
            <div className="consult-controls">
              <label htmlFor="consult-filter">Mostrar</label>
              <select id="consult-filter" value={filter} onChange={e => onFilterChange(e.target.value as ConsultationFilter)}>
                <option value="all">Todos os estados</option>
                <option value="undone">Pendentes / não obtidas</option>
                <option value="done">Concluídas / obtidas</option>
              </select>
              {filter !== 'all' && <button type="button" onClick={clearFilters}>Limpar filtros</button>}
            </div>
          )}

          {section === 'missions' && (
            <section aria-labelledby="consult-missions-title">
              <div className="consult-section-title">
                <div><p className="consult-eyebrow">ROTEIRO CRONOLÓGICO</p><h2 id="consult-missions-title">Missões</h2></div>
                <span>{totalEvents} marcos · {phases.length} capítulos</span>
              </div>
              <label htmlFor="consult-chapter" className="consult-label">Capítulo do roteiro</label>
              <select id="consult-chapter" className="consult-chapter-select" value={activePhase.id} onChange={e => onChapterChange(e.target.value)}>
                {phases.map((phase, index) =>
                  <option key={phase.id} value={phase.id}>{String(index + 1).padStart(2, '0')} · {phase.slug}</option>
                )}
              </select>
              {matchingEvents.length ? (
                <ChapterSection key={activePhase.id} phase={activePhase} visibleEventIds={matchingEvents.map(event => event.id)}
                  phases={phases} progress={progress} onToggleEvent={onToggleEvent}
                  onToggleAchievement={onToggleAchievement} onOpenAchievement={onOpenAchievement}
                  onConfirmCheckpoint={onConfirmCheckpoint} expandedEventId={expandedEventId}
                  onExpandEvent={onExpandEvent} showAchievementSection={false}/>
              ) : (
                <div className="consult-empty" role="status">
                  <h3>Nenhum marco neste estado</h3>
                  <p>O capítulo continua disponível. Altere o estado exibido para ver suas atividades.</p>
                  <button type="button" onClick={clearFilters}>Limpar filtros</button>
                </div>
              )}
              {activePhase.id === 'melve' && (
                <div className="consult-route-next" role="note">
                  <p><strong>Retorno a Melve:</strong> Problemas Aninhados, Flora e Norbert acontecem na vila, após a chegada à capital no roteiro.</p>
                  <button type="button" onClick={() => onOpenEvent('m04')}>Ver etapa do retorno a Melve <ChevronRight size={15} aria-hidden="true" /></button>
                </div>
              )}
            </section>
          )}

          {section === 'achievements' && (
            <section aria-labelledby="consult-achievements-title">
              <div className="consult-section-title">
                <div><p className="consult-eyebrow">CATÁLOGO STEAM</p><h2 id="consult-achievements-title">Conquistas</h2></div>
                <span>{achievements.length} fichas distintas</span>
              </div>
              <p className="consult-muted">Conquistas e etapas são marcadas separadamente.</p>
              <label htmlFor="consult-achievement-chapter" className="consult-label">Abrangência do acervo</label>
              <select id="consult-achievement-chapter" className="consult-chapter-select" value={achievementChapter}
                onChange={e => { setAchievementChapter(e.target.value); onClearAchievement(); }}>
                <option value="all">Todos os capítulos · {achievements.length} conquistas</option>
                {phases.map(phase => <option key={phase.id} value={phase.id}>{phase.slug}</option>)}
              </select>
              <div className="consult-achievements-layout">
                <div className="consult-achievement-list" aria-label="Lista de conquistas">
                  {visibleAchievements.map(({ phase, achievement }) =>
                    <button type="button" key={achievement.id}
                      className={selectedAchievementId === achievement.id ? 'is-selected' : ''}
                      aria-current={selectedAchievementId === achievement.id ? 'true' : undefined}
                      onClick={() => onOpenAchievement(phase.id, achievement.id)}>
                      <AchievementMiniIcon achievement={achievement} decorative />
                      <span><strong>{achievement.title}</strong><small>#{achievement.id} · {phase.slug} · {progress.achievements[achievement.id] ? 'Obtida' : 'Não obtida'}</small></span>
                      <ChevronRight size={16} aria-hidden="true"/>
                    </button>)}
                  {!visibleAchievements.length && <div className="consult-empty"><p>Nenhuma conquista neste estado.</p><button type="button" onClick={clearFilters}>Limpar filtros</button></div>}
                </div>
                <div className="consult-achievement-detail">
                  {selectedAchievement && visibleAchievements.some(item => item.achievement.id === selectedAchievementId) ? (
                    <>
                      <button type="button" className="consult-back-index" onClick={onClearAchievement}><ArrowLeft size={16} aria-hidden="true"/> Voltar ao acervo geral</button>
                      <AchievementCard achievement={selectedAchievement.achievement}
                        isCompleted={!!progress.achievements[selectedAchievement.achievement.id]}
                        onToggle={onToggleAchievement}/>
                    </>
                  ) : (
                    <div className="consult-detail-placeholder">
                      <Award size={28} aria-hidden="true"/>
                      <h3>Selecione uma conquista</h3>
                      <p>Abra a ficha para consultar o requisito cadastrado e registrar se foi obtida.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {section === 'guides' && <QuestGuideLibrary initialGuideId={selectedGuideId} />}

          {section === 'references' && (
            <section aria-labelledby="consult-references-title" className="consult-references">
              <div className="consult-section-title">
                <div><p className="consult-eyebrow">BIBLIOTECA</p><h2 id="consult-references-title">Referências</h2></div>
              </div>

              <h3>Fontes principais</h3>
              <div className="consult-reference-list">
                {(['steam_pt', 'steam_en', 'route_guide', 'mapgenie'] as const).map(key =>
                  <a key={key} href={ROADMAP_METADATA.sources[key].url} target="_blank" rel="noopener noreferrer">
                    <span><strong>{ROADMAP_METADATA.sources[key].label}</strong></span>
                    <ExternalLink size={16} aria-hidden="true"/>
                  </a>)}
              </div>
              <div className="consult-reference-actions">
                <button type="button" onClick={onOpenSources}>Ver fontes do guia</button>
                <button type="button" onClick={onOpenGlossary}>Consultar glossário bilíngue</button>
              </div>
              <h3>Ferramentas de acompanhamento</h3>
              <p className="consult-muted">Rastreadores, checkpoints, backup e glossário.</p>
              <div className="consult-tools">
                <button type="button" data-tools-hub-trigger="references" onClick={onOpenTools}
                  aria-controls="tools-hub-panel" aria-expanded={toolsExpanded}>
                  Abrir Central de Ferramentas
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
};
