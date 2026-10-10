import React, { useState } from 'react';
import { Award, Check, ChevronDown, ExternalLink } from 'lucide-react';
import type { Achievement, Phase, UserProgress } from '../types/roadmap';
import { resolveAchievementLinks } from '../utils/achievementLinks';

/** Reuses the catalogue's official Steam URL. The reserved box prevents layout shifts. */
export const AchievementMiniIcon: React.FC<{ achievement: Achievement; decorative?: boolean }> = ({
  achievement, decorative = false
}) => {
  const [failed, setFailed] = useState(false);
  return (
    <span className="inline-achievement-icon" aria-hidden={decorative ? true : undefined}>
      {!failed && achievement.icon ? (
        <img src={achievement.icon} alt="" width="36" height="36" loading="lazy"
          referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      ) : (
        <span className="inline-achievement-fallback" title="Ícone indisponível">
          <Award size={18} aria-hidden="true" /><span className="sr-only">Ícone indisponível</span>
        </span>
      )}
    </span>
  );
};

interface SharedProps {
  ids: readonly number[];
  phases: readonly Phase[];
  progress: UserProgress;
}

/** Presentational only: safe inside the existing mission-row button. */
export const AchievementPreview: React.FC<SharedProps> = ({ ids, phases, progress }) => {
  const resolved = resolveAchievementLinks(ids, phases);
  const total = resolved.linked.length + resolved.missingIds.length;
  if (!total) return null;
  const visible = resolved.linked.slice(0, 2);
  return (
    <span className="inline-achievement-preview" aria-hidden="true">
      {visible.map(({ achievement }) => (
        <span key={achievement.id} className="inline-achievement-preview-icon"
          title={achievement.title + (progress.achievements[achievement.id] ? ' — obtida' : ' — não obtida')}>
          <AchievementMiniIcon achievement={achievement} decorative />
          {progress.achievements[achievement.id] && <Check className="inline-achievement-check" size={12} aria-hidden="true" />}
        </span>
      ))}
      {total > visible.length && <span className="inline-achievement-overflow">+{total - visible.length}</span>}
    </span>
  );
};

interface InlineProps extends SharedProps {
  onOpenAchievement: (phaseId: string, achievementId: number) => void;
}

/** Read-only association: visiting a full card never marks the step or achievement. */
export const InlineAchievements: React.FC<InlineProps> = ({ ids, phases, progress, onOpenAchievement }) => {
  const [showAll, setShowAll] = useState(false);
  const resolved = resolveAchievementLinks(ids, phases);
  const total = resolved.linked.length + resolved.missingIds.length;
  if (!total) return null;
  const entries = [
    ...resolved.linked.map(link => ({ id: link.achievement.id, link })),
    ...resolved.missingIds.map(id => ({ id, link: null }))
  ];
  const initialCount = 3;
  const visible = showAll ? entries : entries.slice(0, initialCount);
  const remaining = total - initialCount;

  return (
    <section className="inline-achievements" aria-label="Conquistas associadas no roteiro">
      <h3>Conquistas associadas no roteiro <span>(em verificação)</span></h3>
      <p className="inline-achievement-caveat">Vínculo editorial: não confirma o momento nem garante o desbloqueio. O progresso da conquista é independente do marco.</p>
      <div className="inline-achievements-grid">
        {visible.map(({ id, link }) => link ? (
          <button type="button" key={id} className="inline-achievement-entry"
            onClick={() => onOpenAchievement(link.phaseId, id)}
            title={'Abrir ficha: ' + link.achievement.title}
            aria-label={'Abrir ficha da conquista ' + link.achievement.title + ', ' +
              (progress.achievements[id] ? 'obtida' : 'não obtida') + ', vínculo em verificação'}>
            <AchievementMiniIcon achievement={link.achievement} />
            <span className="inline-achievement-name">
              <strong>{link.achievement.title}</strong>
              <small>#{id} · {progress.achievements[id] ? 'Obtida' : 'Não obtida'}</small>
            </span>
            <ExternalLink size={14} aria-hidden="true" />
          </button>
        ) : (
          <span className="inline-achievement-entry is-missing" key={id} role="note">
            <span className="inline-achievement-icon inline-achievement-fallback"><Award size={18} aria-hidden="true" /></span>
            <span className="inline-achievement-name"><strong>Conquista #{id}</strong><small>Ficha não localizada · em verificação</small></span>
          </span>
        ))}
      </div>
      {remaining > 0 && (
        <button type="button" className="inline-achievement-more" aria-expanded={showAll}
          onClick={() => setShowAll(v => !v)}>
          {showAll ? 'Mostrar menos conquistas' : 'Ver mais ' + remaining + ' conquistas associadas'}
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      )}
    </section>
  );
};
