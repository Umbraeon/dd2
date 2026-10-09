import React from 'react';
import { X, Flame, Sun, Moon, ExternalLink, Info } from 'lucide-react';
import { BARBECUE_MEATS } from '../data/roadmapData';
import { UserProgress } from '../types/roadmap';

interface BarbecueTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleMeatTime: (meatId: string, time: 'day' | 'night') => void;
}

export const BarbecueTrackerModal: React.FC<BarbecueTrackerModalProps> = ({
  isOpen,
  onClose,
  progress,
  onToggleMeatTime
}) => {
  if (!isOpen) return null;

  // Calculate total roasted: 8 meats * 2 periods = 16
  let count = 0;
  BARBECUE_MEATS.forEach((meat) => {
    const entry = progress.barbecue[meat.id];
    if (entry?.day) count++;
    if (entry?.night) count++;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#df8c75]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Mestre do Churrasco · Matriz 8 × 2
              </h3>
              <p className="text-xs text-[#aea79b]">
                Conquista 'Mestre do churrasco' (#52) · 16 Preparos Distintos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#df8c75] bg-[#291b17] px-2.5 py-1 rounded border border-[#6b352b]">
              {count} / 16 Concluídos
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
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs text-[#d0c9be]">
          {/* Information Notice */}
          <div className="bg-[#1c1a16] border border-[#5d4d36] rounded-md p-3 text-[#ecd2ac] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#d9b780] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Para desbloquear a conquista, é mandatório assistir à cena real de cozimento de cada um dos <b>8 tipos de carne</b> tanto durante o <b>Dia</b> quanto durante a <b>Noite</b> em um kit de acampamento. O jogo roda um vídeo gravado com carne real de alta definição para cada variante!
            </p>
          </div>

          {/* 8 x 2 Matrix Table */}
          <div className="border border-[#3d372e] rounded-lg overflow-hidden bg-[#181a1d]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1e2125] border-b border-[#3d372e] text-[11px] font-serif uppercase tracking-wider text-[#d9b780]">
                  <th className="py-2.5 px-3">Variedade de Carne</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Como Obter / Estágio</th>
                  <th className="py-2.5 px-3 text-center w-24">
                    <span className="flex items-center justify-center gap-1 text-[#f0d1a0]">
                      <Sun className="w-3.5 h-3.5 text-[#e2bc76]" />
                      Dia
                    </span>
                  </th>
                  <th className="py-2.5 px-3 text-center w-24">
                    <span className="flex items-center justify-center gap-1 text-[#b6d8ec]">
                      <Moon className="w-3.5 h-3.5 text-[#79a6d2]" />
                      Noite
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3036] text-xs">
                {BARBECUE_MEATS.map((meat) => {
                  const entry = progress.barbecue[meat.id] || { day: false, night: false };
                  const rowDone = entry.day && entry.night;

                  return (
                    <tr
                      key={meat.id}
                      className={`hover:bg-[#1f2227] transition-colors ${
                        rowDone ? 'bg-[#151d17]/50' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3">
                        <div className="font-semibold text-[#e9e2d7]">
                          {meat.namePt}
                        </div>
                        <div className="text-[10px] text-[#aea79b] italic">
                          {meat.nameEn}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-[#aea79b] text-[11px] hidden sm:table-cell">
                        {meat.howToGet}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <label className="inline-flex items-center justify-center p-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={entry.day}
                            onChange={() => onToggleMeatTime(meat.id, 'day')}
                            className="w-4 h-4 rounded border-[#726044] text-[#d9b780] focus:ring-0 bg-[#1c1e21] cursor-pointer"
                          />
                        </label>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <label className="inline-flex items-center justify-center p-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={entry.night}
                            onChange={() => onToggleMeatTime(meat.id, 'night')}
                            className="w-4 h-4 rounded border-[#726044] text-[#79a6d2] focus:ring-0 bg-[#1c1e21] cursor-pointer"
                          />
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-[#8e887d] bg-[#121316] p-3 rounded border border-[#2b2d33]">
            <b>Dica de Maturação:</b> Carnes apodrecem em 1-2 dias no inventário. Para obter Carne Curada (Aged), descanse no banco ou acampamento e verifique o inventário. Guarde carnes no baú das estalagens para paralisar o apodrecimento quando atingirem o ponto curado!
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-between">
          <a
            href="https://www.playstationtrophies.org/game/dragons-dogma-2/trophy/the-barbecue-maister.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#d9b780] hover:text-[#edd9ba] flex items-center gap-1"
          >
            <span>Guia PlayStationTrophies</span>
            <ExternalLink className="w-3 h-3" />
          </a>
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
