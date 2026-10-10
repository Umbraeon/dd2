import type { Achievement, Phase } from '../types/roadmap';

export interface LinkedAchievement {
  achievement: Achievement;
  phaseId: string;
}

export interface AchievementLinks {
  linked: LinkedAchievement[];
  missingIds: number[];
  duplicateIds: number[];
  duplicateCatalogueIds: number[];
}

/**
 * event.achievements is an editorial association, NOT proof of the unlock trigger.
 * Resolve globally: a card may belong to a different chapter than its linked step.
 * Preserve the first catalogue entry when malformed duplicate IDs appear.
 */
export function resolveAchievementLinks(
  ids: readonly number[],
  phases: readonly Phase[]
): AchievementLinks {
  const catalogue = new Map<number, LinkedAchievement>();
  const duplicateCatalogueIds = new Set<number>();
  for (const phase of phases) {
    for (const achievement of phase.achievements) {
      if (catalogue.has(achievement.id)) duplicateCatalogueIds.add(achievement.id);
      else catalogue.set(achievement.id, { achievement, phaseId: phase.id });
    }
  }

  const linked: LinkedAchievement[] = [];
  const missingIds: number[] = [];
  const duplicateIds: number[] = [];
  const seen = new Set<number>();
  for (const id of ids) {
    if (seen.has(id)) {
      if (!duplicateIds.includes(id)) duplicateIds.push(id);
      continue;
    }
    seen.add(id);
    const found = catalogue.get(id);
    if (found) linked.push(found);
    else missingIds.push(id);
  }
  return { linked, missingIds, duplicateIds, duplicateCatalogueIds: [...duplicateCatalogueIds] };
}
