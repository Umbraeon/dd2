import type { Phase, QuestEvent, UserProgress } from '../types/roadmap';

export interface JourneyStep {
  phase: Phase;
  event: QuestEvent;
}

export type JourneyKind = 'active' | 'suggested' | 'completed-active' | 'all-complete' | 'deferred-only' | 'empty';

export interface JourneyResolution {
  kind: JourneyKind;
  target?: JourneyStep;
  suggestion?: JourneyStep;
  invalidSelection: boolean;
  deferredCount: number;
}

export function listJourneySteps(phases: readonly Phase[]): JourneyStep[] {
  return phases.flatMap(phase =>
    Array.isArray(phase?.events)
      ? phase.events.filter(event => !!event && typeof event.id === 'string' && event.id.length > 0)
          .map(event => ({ phase, event }))
      : []
  );
}

export function isStepCompleted(progress: UserProgress, id: string): boolean {
  return progress.steps?.[id] === true;
}

export function isStepDeferred(progress: UserProgress, id: string): boolean {
  return Array.isArray(progress.deferredStepIds) && progress.deferredStepIds.includes(id);
}

export function firstPendingStep(phases: readonly Phase[], progress: UserProgress): JourneyStep | undefined {
  return listJourneySteps(phases).find(({ event }) =>
    !isStepCompleted(progress, event.id) && !isStepDeferred(progress, event.id)
  );
}

export function resolveJourney(phases: readonly Phase[], progress: UserProgress): JourneyResolution {
  const steps = listJourneySteps(phases);
  const pending = steps.filter(({ event }) => !isStepCompleted(progress, event.id));
  const deferredCount = pending.filter(({ event }) => isStepDeferred(progress, event.id)).length;
  const suggestion = firstPendingStep(phases, progress);
  const selected = typeof progress.activeStepId === 'string'
    ? steps.find(({ event }) => event.id === progress.activeStepId)
    : undefined;
  const invalidSelection = !!progress.activeStepId && !selected;

  if (!steps.length) return { kind: 'empty', invalidSelection, deferredCount };
  if (!pending.length) return { kind: 'all-complete', invalidSelection, deferredCount };
  if (selected && isStepCompleted(progress, selected.event.id)) {
    return { kind: 'completed-active', target: selected, suggestion, invalidSelection, deferredCount };
  }
  if (selected && !isStepDeferred(progress, selected.event.id)) {
    return { kind: 'active', target: selected, suggestion, invalidSelection, deferredCount };
  }
  if (suggestion) return { kind: 'suggested', target: suggestion, suggestion, invalidSelection, deferredCount };
  return { kind: 'deferred-only', invalidSelection, deferredCount };
}

export function selectJourneyStep(progress: UserProgress, id: string): UserProgress {
  return {
    ...progress,
    activeStepId: id,
    deferredStepIds: (progress.deferredStepIds ?? []).filter(deferred => deferred !== id)
  };
}

export function deferJourneyStep(progress: UserProgress, id: string): UserProgress {
  return {
    ...progress,
    activeStepId: progress.activeStepId === id ? undefined : progress.activeStepId,
    deferredStepIds: [...new Set([...(progress.deferredStepIds ?? []), id])]
  };
}
