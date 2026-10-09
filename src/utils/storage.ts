import { UserProgress } from '../types/roadmap';

const STORAGE_KEY = 'dd2_roadmap_user_progress_v3';

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

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || !parsed) return { ...DEFAULT_PROGRESS };
    return {
      version: parsed.version || '3.0.0',
      updatedAt: parsed.updatedAt || new Date().toISOString(),
      steps: typeof parsed.steps === 'object' ? parsed.steps : {},
      achievements: typeof parsed.achievements === 'object' ? parsed.achievements : {},
      sphinx: typeof parsed.sphinx === 'object' ? parsed.sphinx : {},
      firstTokenLocation: typeof parsed.firstTokenLocation === 'string' ? parsed.firstTokenLocation : '',
      seekerTokensCount: typeof parsed.seekerTokensCount === 'number' ? parsed.seekerTokensCount : 0,
      barbecue: typeof parsed.barbecue === 'object' ? parsed.barbecue : {},
      maisters: typeof parsed.maisters === 'object' ? parsed.maisters : {},
      confirmedCheckpoints: typeof parsed.confirmedCheckpoints === 'object' ? parsed.confirmedCheckpoints : {}
    };
  } catch (e) {
    console.error('Falha ao ler progresso do localStorage:', e);
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    const toSave: UserProgress = {
      ...progress,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Falha ao salvar progresso no localStorage:', e);
  }
}

export function exportProgressFile(progress: UserProgress): void {
  const payload = {
    app: "dd2-100-roadmap-ptbr",
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
    const parsed = JSON.parse(jsonContent);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'O arquivo JSON não contém um objeto válido.' };
    }

    const target: any = parsed.progress || parsed;

    if (typeof target.steps !== 'object' && typeof target.achievements !== 'object') {
      return { valid: false, error: 'O arquivo importado não possui as chaves de progresso de Dragon\'s Dogma 2.' };
    }

    const validated: UserProgress = {
      version: typeof target.version === 'string' ? target.version : '3.0.0',
      updatedAt: new Date().toISOString(),
      steps: typeof target.steps === 'object' ? target.steps : {},
      achievements: typeof target.achievements === 'object' ? target.achievements : {},
      sphinx: typeof target.sphinx === 'object' ? target.sphinx : {},
      firstTokenLocation: typeof target.firstTokenLocation === 'string' ? target.firstTokenLocation : '',
      seekerTokensCount: typeof target.seekerTokensCount === 'number' ? target.seekerTokensCount : 0,
      barbecue: typeof target.barbecue === 'object' ? target.barbecue : {},
      maisters: typeof target.maisters === 'object' ? target.maisters : {},
      confirmedCheckpoints: typeof target.confirmedCheckpoints === 'object' ? target.confirmedCheckpoints : {}
    };

    return { valid: true, data: validated };
  } catch (err: any) {
    return { valid: false, error: `Erro de sintaxe JSON: ${err.message}` };
  }
}
