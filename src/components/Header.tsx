import React from 'react';
import { Compass, BookOpen, ShieldAlert, Sparkles, FolderDown } from 'lucide-react';

interface HeaderProps {
  onOpenCheckpoints: () => void;
  onOpenTools: () => void;
  onOpenSources: () => void;
  onOpenBackup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCheckpoints,
  onOpenTools,
  onOpenSources,
  onOpenBackup
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d0f11]/95 backdrop-blur-md border-b border-[#726044]/30 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-3 group text-[#e9e2d7] hover:text-[#edd9ba] transition-colors whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded border border-[#726044] bg-[#1a1c1f] flex items-center justify-center text-[#d9b780] shadow-sm">
            <Compass className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base lg:text-lg tracking-wider uppercase text-[#f0d1a0]">
              Dragon's Dogma II
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#aea79b] font-mono">
              Rota 100% · Grimório PT-BR
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#cfc8bd]">
          <a href="#melve" className="hover:text-[#d9b780] transition-colors whitespace-nowrap shrink-0">
            01. Melve
          </a>
          <a href="#vernworth1" className="hover:text-[#d9b780] transition-colors whitespace-nowrap shrink-0">
            02. Vernworth
          </a>
          <a href="#battahl" className="hover:text-[#d9b780] transition-colors whitespace-nowrap shrink-0">
            05. Battahl
          </a>
          <a href="#preend" className="hover:text-[#d9b780] transition-colors whitespace-nowrap shrink-0">
            07. Checagem
          </a>
          <a href="#unmoored" className="hover:text-[#d9b780] transition-colors whitespace-nowrap shrink-0">
            08. Desancorado
          </a>
          <a href="#dlc" className="text-[#a4c7e8] hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#79a6d2]" />
            09. Dark Arisen
          </a>
        </nav>

        {/* Zone 3: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenCheckpoints}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[#2b1e1b] hover:bg-[#3d2721] text-[#df8c75] border border-[#8a4b3d] transition-all whitespace-nowrap"
            title="Verificar Pontos Sem Retorno"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pontos Críticos</span>
          </button>

          <button
            onClick={onOpenTools}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded bg-[#1e2125] hover:bg-[#282d33] text-[#e9e2d7] border border-[#403e38] transition-all whitespace-nowrap"
            title="Abrir Ferramentas & Guias Interativos"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d9b780]" />
            <span>Ferramentas</span>
          </button>

          <button
            onClick={onOpenBackup}
            className="p-1.5 rounded bg-[#16181b] hover:bg-[#202327] text-[#aea79b] hover:text-[#e9e2d7] border border-[#3d372e] transition-colors"
            title="Importar / Exportar Progresso (JSON)"
            aria-label="Backup de Dados"
          >
            <FolderDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
