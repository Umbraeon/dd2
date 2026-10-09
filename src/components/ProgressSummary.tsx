import React from 'react';
import { Flame, Award, Skull, MapPin, ShieldAlert, Sparkles, HelpCircle, BookMarked, ExternalLink } from 'lucide-react';
import { UserProgress } from '../types/roadmap';
import { ROADMAP_METADATA } from '../data/roadmapData';

interface ProgressSummaryProps {
  progress: UserProgress;
  totalEventsCount: number;
  onOpenSphinx: () => void;
  onOpenBarbecue: () => void;
  onOpenMaisters: () => void;
  onOpenTokens: () => void;
  onOpenCheckpoints: () => void;
  onOpenGlossary: () => void;
  onOpenSources: () => void;
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  progress,
  totalEventsCount,
  onOpenSphinx,
  onOpenBarbecue,
  onOpenMaisters,
  onOpenTokens,
  onOpenCheckpoints,
  onOpenGlossary,
  onOpenSources
}) => {
  // Count base game achievements (1 to 54)
  let baseDone = 0;
  for (let id = 1; id <= 54; id++) {
    if (progress.achievements[id]) baseDone++;
  }

  // Count Dark Arisen DLC achievements (55 to 60)
  let dlcDone = 0;
  for (let id = 55; id <= 60; id++) {
    if (progress.achievements[id]) dlcDone++;
  }

  const totalDone = baseDone + dlcDone;
  const basePercent = Math.round((baseDone / 54) * 100);
  const dlcPercent = Math.round((dlcDone / 6) * 100);
  const totalPercent = Math.round((totalDone / 60) * 100);

  const stepsDone = Object.values(progress.steps).filter(Boolean).length;
  const stepsPercent = totalEventsCount > 0 ? Math.round((stepsDone / totalEventsCount) * 100) : 0;

  return (
    <section className="bg-[#141619] border-y border-[#3d372e] py-6 px-4 lg:px-8 shadow-inner">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Disclaimer Notice */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#aea79b] bg-[#1a1c20] p-3 rounded border border-[#383b40]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d9b780]" />
            <span className="font-medium text-[#e9e2d7]">Auditoria Cronológica Verificada</span>
            <span className="text-[#726044]">·</span>
            <span>09 de Outubro de 2026</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenSources}
              className="text-[#d9b780] hover:text-[#edd9ba] underline flex items-center gap-1 transition-colors"
            >
              <span>Ver 15 Fontes Independentes</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 4 Score Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {/* Card 1: Jogo-Base */}
          <div className="bg-[#181b1e] border border-[#403e38] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#aea79b] mb-1">
              <span className="font-serif uppercase tracking-wider text-[#d9b780]">Jogo-Base</span>
              <span className="font-mono text-[11px] text-[#aea79b]">{basePercent}%</span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-[#f0d1a0] tabular-nums">
                {baseDone}
              </span>
              <span className="text-sm text-[#726044] font-serif">/ 54</span>
            </div>
            <div className="w-full bg-[#24272b] h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-[#d9b780] h-full transition-all duration-300" 
                style={{ width: `${basePercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#8e887d] mt-2 block">
              54 conquistas originais
            </span>
          </div>

          {/* Card 2: Dark Arisen DLC */}
          <div className="bg-[#181b1e] border border-[#3f526b]/50 rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#a4c7e8] mb-1">
              <span className="font-serif uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#79a6d2]" />
                Dark Arisen
              </span>
              <span className="font-mono text-[11px] text-[#79a6d2]">{dlcPercent}%</span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-[#b6d8ec] tabular-nums">
                {dlcDone}
              </span>
              <span className="text-sm text-[#4d7884] font-serif">/ 6</span>
            </div>
            <div className="w-full bg-[#24272b] h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-[#79a6d2] h-full transition-all duration-300" 
                style={{ width: `${dlcPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#79a6d2]/80 mt-2 block">
              6 conquistas (rotas em pesquisa)
            </span>
          </div>

          {/* Card 3: Total Steam Global */}
          <div className="bg-[#181b1e] border border-[#726044]/60 rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#aea79b] mb-1">
              <span className="font-serif uppercase tracking-wider text-[#edd9ba]">Total Global</span>
              <span className="font-mono text-[11px] text-[#aea79b]">{totalPercent}%</span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-[#edd9ba] tabular-nums">
                {totalDone}
              </span>
              <span className="text-sm text-[#726044] font-serif">/ 60</span>
            </div>
            <div className="w-full bg-[#24272b] h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-gradient-to-r from-[#d9b780] to-[#edd9ba] h-full transition-all duration-300" 
                style={{ width: `${totalPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#aea79b] mt-2 block">
              54 base + 6 DLC inclusas
            </span>
          </div>

          {/* Card 4: Etapas da Rota */}
          <div className="bg-[#181b1e] border border-[#403e38] rounded-lg p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#aea79b] mb-1">
              <span className="font-serif uppercase tracking-wider text-[#cfc8bd]">Etapas da Rota</span>
              <span className="font-mono text-[11px] text-[#aea79b]">{stepsPercent}%</span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-2xl lg:text-3xl font-serif font-bold text-[#e9e2d7] tabular-nums">
                {stepsDone}
              </span>
              <span className="text-sm text-[#726044] font-serif">/ {totalEventsCount}</span>
            </div>
            <div className="w-full bg-[#24272b] h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-[#9bc4a5] h-full transition-all duration-300" 
                style={{ width: `${stepsPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#8e887d] mt-2 block">
              Missões e marcos verificados
            </span>
          </div>
        </div>

        {/* Specialized Interactive Companion Quick Bars */}
        <div className="pt-2">
          <div className="text-[11px] uppercase tracking-widest text-[#aea79b] font-serif mb-2.5 flex items-center justify-between">
            <span>Grimórios e Ferramentas Auxiliares</span>
            <span className="text-[10px] text-[#726044] lowercase">clique para abrir</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenSphinx}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#1e2125] hover:bg-[#272b30] text-[#e9e2d7] border border-[#4a463c] transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#d9b780]" />
              <span>Esfinge (10 Enigmas)</span>
            </button>

            <button
              onClick={onOpenBarbecue}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#1e2125] hover:bg-[#272b30] text-[#e9e2d7] border border-[#4a463c] transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-[#df8c75]" />
              <span>Churrasco (16 Preparos)</span>
            </button>

            <button
              onClick={onOpenMaisters}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#1e2125] hover:bg-[#272b30] text-[#e9e2d7] border border-[#4a463c] transition-all"
            >
              <Award className="w-3.5 h-3.5 text-[#e2bc76]" />
              <span>12 Mestres (Vocações)</span>
            </button>

            <button
              onClick={onOpenTokens}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#1e2125] hover:bg-[#272b30] text-[#e9e2d7] border border-[#4a463c] transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#9bc4a5]" />
              <span>1º Memento & 80 Tokens</span>
            </button>

            <button
              onClick={onOpenCheckpoints}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#2c1d19] hover:bg-[#38231e] text-[#df8c75] border border-[#7a3e33] transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>4 Pontos Sem Retorno</span>
            </button>

            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-[#1e2125] hover:bg-[#272b30] text-[#cfc8bd] border border-[#403e38] transition-all"
            >
              <BookMarked className="w-3.5 h-3.5 text-[#aea79b]" />
              <span>Glossário PT / EN</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
