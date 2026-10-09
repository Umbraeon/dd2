export type RiskLevel = 'normal' | 'cuidado' | 'alerta' | 'critico';

export type EventType = 'historia' | 'missao' | 'conquista' | 'alerta' | 'checkpoint';

export interface QuestEvent {
  id: string;
  title: string;
  type: EventType;
  note: string;
  achievements: number[]; // achievement IDs
  risk: RiskLevel;
  source: string;
  extraSources?: string[];
  prerequisites?: string;
  failureRisk?: string;
}

export interface Achievement {
  id: number;
  category: string;
  title: string;
  original: string;
  tip: string;
  missable: boolean;
  dlc: boolean;
  icon: string;
  phase: string;
  validation: string;
  sourceUrl: string;
  sourceExtra?: string[];
  nameStatus: string;
}

export interface Phase {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  cue: string;
  events: QuestEvent[];
  achievements: Achievement[];
}

export interface SphinxRiddle {
  id: string;
  number: number;
  location: 'mountain' | 'reunification' | 'frontier';
  namePt: string;
  nameEn: string;
  summary: string;
  solution: string;
  warning?: string;
  isRandomOrder?: boolean;
}

export interface MaisterSkill {
  id: string;
  vocationPt: string;
  vocationEn: string;
  skillPt: string;
  skillEn: string;
  npc: string;
  location: string;
  questOrCondition: string;
  missableNote?: string;
}

export interface BarbecueMeat {
  id: string;
  namePt: string;
  nameEn: string;
  howToGet: string;
}

export interface GlossaryTerm {
  pt: string;
  en: string;
  category: 'Conquista' | 'Missão' | 'Item' | 'NPC' | 'Local' | 'Vocação';
  notes: string;
  isDlcProvisional?: boolean;
}

export interface UserProgress {
  version: string;
  updatedAt: string;
  steps: Record<string, boolean>; // event.id -> completed
  achievements: Record<number, boolean>; // achievement.id -> completed
  sphinx: Record<string, boolean>; // riddle.id -> completed
  firstTokenLocation: string;
  seekerTokensCount: number;
  barbecue: Record<string, { day: boolean; night: boolean }>; // meat.id -> {day, night}
  maisters: Record<string, { acquired: boolean; learned: boolean }>; // maister.id -> status
  confirmedCheckpoints: Record<string, boolean>; // checkpoint.id -> confirmed
}
