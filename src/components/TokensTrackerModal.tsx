import React from 'react';
import { X, MapPin, ExternalLink, AlertTriangle, Plus, Minus } from 'lucide-react';
import { UserProgress } from '../types/roadmap';

interface TokensTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onUpdateTokensCount: (count: number) => void;
  onUpdateFirstTokenLocation: (notes: string) => void;
}

export const TokensTrackerModal: React.FC<TokensTrackerModalProps> = ({
  isOpen,
  onClose,
  progress,
  onUpdateTokensCount,
  onUpdateFirstTokenLocation
}) => {
  if (!isOpen) return null;

  const count = progress.seekerTokensCount || 0;
  const progressPercent = Math.min(100, Math.round((count / 80) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#9bc4a5]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Mementos do Buscador · 80 Tokens
              </h3>
              <p className="text-xs text-[#aea79b]">
                Conquista 'Especialista em coleta' (#47) & Localização do 1º Memento
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#9bc4a5] bg-[#1a261d] px-2.5 py-1 rounded border border-[#344d3a]">
              {count} / 80 Coletados ({progressPercent}%)
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#aea79b] hover:text-[#e9e2d7] hover:bg-[#202327]"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#d0c9be]">
          {/* Top Counter Widget */}
          <div className="bg-[#181a1d] border border-[#3d372e] rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-serif uppercase tracking-wider text-[#d9b780]">
                Contador para 'Especialista em coleta'
              </span>
              <div className="flex items-baseline justify-center sm:justify-start gap-2">
                <span className="text-3xl font-serif font-bold text-[#f0d1a0] tabular-nums">
                  {count}
                </span>
                <span className="text-sm text-[#aea79b] font-serif">
                  / 80 necessários (existem 240 no mapa)
                </span>
              </div>
              <div className="w-48 bg-[#22252a] h-2 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-[#9bc4a5] h-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Quick Adjust Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateTokensCount(Math.max(0, count - 5))}
                className="px-2.5 py-1.5 rounded bg-[#202327] hover:bg-[#2a2e33] text-[#cfc8bd] border border-[#3d372e]"
                title="Diminuir 5"
              >
                -5
              </button>
              <button
                onClick={() => onUpdateTokensCount(Math.max(0, count - 1))}
                className="p-1.5 rounded bg-[#202327] hover:bg-[#2a2e33] text-[#cfc8bd] border border-[#3d372e]"
                title="Diminuir 1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateTokensCount(count + 1)}
                className="p-1.5 rounded bg-[#2c271f] hover:bg-[#3d3427] text-[#d9b780] border border-[#726044]"
                title="Aumentar 1"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateTokensCount(count + 5)}
                className="px-2.5 py-1.5 rounded bg-[#2c271f] hover:bg-[#3d3427] text-[#d9b780] border border-[#726044]"
                title="Aumentar 5"
              >
                +5
              </button>
            </div>
          </div>

          {/* First Token Location Warning and Recorder */}
          <div className="bg-[#211a18] border border-[#6b352b] rounded-lg p-4 space-y-2.5">
            <div className="flex items-center gap-2 font-serif font-bold text-[#f4ad9b] text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>ALERTA CRÍTICO: Primeiro Memento do Buscador</span>
            </div>
            <p className="leading-relaxed">
              Durante o 5º enigma da Esfinge (Ruminação), você terá <b>7 dias no jogo</b> para ir exatamente até o local onde coletou seu primeiro memento. Um item chamado <i>Finder's Token</i> estará te esperando lá.
            </p>
            <p className="leading-relaxed text-[#aea79b]">
              O guia cronológico recomenda: <b>NÃO</b> colete nenhum memento no início até chegar a um local evidente (como no Campo de Batalha Antigo ou em uma torre marcada), tire uma captura de tela e salve a descrição abaixo:
            </p>

            <textarea
              value={progress.firstTokenLocation || ''}
              onChange={(e) => onUpdateFirstTokenLocation(e.target.value)}
              placeholder="Descreva detalhadamente onde você pegou seu primeiro memento: Cidade/região, ponto de referência, print salvo na pasta..."
              className="w-full h-24 bg-[#141619] border border-[#4d4036] rounded p-2.5 text-xs text-[#e9e2d7] placeholder-[#6e685f] focus:outline-none focus:border-[#d9b780]"
            />
          </div>

          {/* Map Link */}
          <div className="bg-[#181a1d] border border-[#3d372e] rounded-md p-3.5 flex items-center justify-between">
            <div>
              <span className="font-serif font-bold text-[#f0d1a0] block">
                Mapa Interativo de Todos os Mementos
              </span>
              <span className="text-[11px] text-[#aea79b]">
                MapGenie possui os 240 mementos catalogados com fotos e filtros.
              </span>
            </div>
            <a
              href="https://mapgenie.io/dragons-dogma-2/maps/world"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold rounded bg-[#1e2125] text-[#d9b780] hover:bg-[#292d33] border border-[#403e38] flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Abrir MapGenie</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded bg-[#d9b780] text-[#111315] hover:bg-[#edd9ba] transition-colors"
          >
            Salvar & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
