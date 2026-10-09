import type { UserProgress } from '../types/roadmap';

export const STORAGE_KEY = 'dd2_roadmap_user_progress_v3';
let storageError: string | null = null;

export const DEFAULT_PROGRESS: UserProgress = {
  version: '3.0.0',
  updatedAt: new Date().toISOString(),
  steps: {},
  achievements: {},
  sphinx: {},
  firstTokenLocation: '',
  seekerTokensCount: 0,
  barbecue: {},
  maisters: {},
  confirmedCheckpoints: {}
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const isBooleanMap = (value: unknown): boolean =>
  isRecord(value) && Object.values(value).every(entry => typeof entry === 'boolean');

const isTrackerMap = (value: unknown, keys: readonly string[]): boolean =>
  isRecord(value) && Object.values(value).every(entry =>
    isRecord(entry) && keys.every(key => typeof entry[key] === 'boolean')
  );

function parseProgress(value: unknown): { data?: UserProgress; error?: string } {
  if (!isRecord(value)) return { error: 'O progresso precisa ser um objeto JSON, não nulo ou lista.' };
  if (!('steps' in value) && !('achievements' in value)) {
    return { error: 'Não foram encontradas marcações de etapas ou conquistas do guia.' };
  }
  for (const field of ['steps', 'achievements', 'sphinx', 'confirmedCheckpoints']) {
    if (field in value && !isBooleanMap(value[field])) {
      return { error: `O campo "${field}" possui estrutura inválida. Nenhum dado foi substituído.` };
    }
  }
  if ('barbecue' in value && !isTrackerMap(value.barbecue, ['day', 'night'])) {
    return { error: 'O rastreador de churrasco está inválido.' };
  }
  if ('maisters' in value && !isTrackerMap(value.maisters, ['acquired', 'learned'])) {
    return { error: 'O rastreador de mestres está inválido.' };
  }
  if ('version' in value && typeof value.version !== 'string' ||
      'updatedAt' in value && typeof value.updatedAt !== 'string' ||
      'firstTokenLocation' in value && typeof value.firstTokenLocation !== 'string' ||
      'seekerTokensCount' in value && (typeof value.seekerTokensCount !== 'number' || !Number.isFinite(value.seekerTokensCount) || value.seekerTokensCount < 0)) {
    return { error: 'Um campo de metadados ou contador está inválido.' };
  }
  if ('activeStepId' in value && typeof value.activeStepId !== 'string') {
    return { error: 'A identificação da etapa ativa está inválida.' };
  }
  if ('deferredStepIds' in value &&
      (!Array.isArray(value.deferredStepIds) || !value.deferredStepIds.every(id => typeof id === 'string'))) {
    return { error: 'A lista de atividades adiadas está inválida.' };
  }

  // Spreading the original preserves additional v3 fields for future backups.
  return {
    data: {
      ...value,
      version: (value.version as string | undefined) ?? '3.0.0',
      updatedAt: (value.updatedAt as string | undefined) ?? DEFAULT_PROGRESS.updatedAt,
      steps: (value.steps as UserProgress['steps'] | undefined) ?? {},
      achievements: (value.achievements as UserProgress['achievements'] | undefined) ?? {},
      sphinx: (value.sphinx as UserProgress['sphinx'] | undefined) ?? {},
      firstTokenLocation: (value.firstTokenLocation as string | undefined) ?? '',
      seekerTokensCount: (value.seekerTokensCount as number | undefined) ?? 0,
      barbecue: (value.barbecue as UserProgress['barbecue'] | undefined) ?? {},
      maisters: (value.maisters as UserProgress['maisters'] | undefined) ?? {},
      confirmedCheckpoints: (value.confirmedCheckpoints as UserProgress['confirmedCheckpoints'] | undefined) ?? {}
    } as UserProgress
  };
}

export function getProgressStorageError(): string | null {
  return storageError;
}

/** Only call after the user explicitly confirms replacement via import or reset. */
export function allowExplicitProgressReplacement(): void {
  storageError = null;
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      storageError = null;
      return { ...DEFAULT_PROGRESS };
    }
    const parsed = parseProgress(JSON.parse(raw));
    if (!parsed.data) {
      storageError = parsed.error ?? 'Progresso local inválido.';
      console.error('Progresso preservado sem sobrescrita:', storageError);
      return { ...DEFAULT_PROGRESS };
    }
    storageError = null;
    return parsed.data;
  } catch (error) {
    storageError = 'Não foi possível ler o progresso salvo. O dado original foi preservado.';
    console.error(storageError, error);
    return { ...DEFAULT_PROGRESS };
  }
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (isRecord(value)) return `{${Object.keys(value).filter(key => key !== 'updatedAt').sort()
    .map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

/** Returns false on blocked or failed writes; timestamps change only on a material update. */
export function saveProgress(progress: UserProgress): boolean {
  if (storageError) return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null && stable(JSON.parse(raw)) === stable(progress)) return true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      updatedAt: new Date().toISOString()
    }));
    return true;
  } catch (error) {
    console.error('Falha ao salvar progresso no localStorage:', error);
    return false;
  }
}

export function exportProgressFile(progress: UserProgress): void {
  const payload = {
    app: 'dd2-100-roadmap-ptbr',
    exportedAt: new Date().toISOString(),
    progress
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `dragons-dogma-2-progresso-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function validateImportData(jsonContent: string): { valid: boolean; data?: UserProgress; error?: string } {
  try {
    const parsed: unknown = JSON.parse(jsonContent);
    if (!isRecord(parsed)) return { valid: false, error: 'O arquivo JSON não contém um objeto válido.' };
    const target = 'progress' in parsed ? parsed.progress : parsed;
    const checked = parseProgress(target);
    return checked.data
      ? { valid: true, data: checked.data }
      : { valid: false, error: checked.error };
  } catch (error) {
    return { valid: false, error: `Erro de sintaxe JSON: ${error instanceof Error ? error.message : 'conteúdo inválido'}` };
  }
}
