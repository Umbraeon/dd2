import React from 'react';
import { X, Award, ExternalLink, AlertTriangle, BookCheck } from 'lucide-react';
import { MAISTER_SKILLS } from '../data/roadmapData';
import { UserProgress } from '../types/roadmap';

interface MaistersTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleMaisterStatus: (id: string, field: 'acquired' | 'learned') => void;
}

export const MaistersTrackerModal: React.FC<MaistersTrackerModalProps> = ({
  isOpen,
  onClose,
  progress,
  onToggleMaisterStatus
}) => {
  if (!isOpen) return null;

  let learnedCount = 0;
  MAISTER_SKILLS.forEach((m) => {
    if (progress.maisters[m.id]?.learned) learnedCount++;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#e2bc76]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Mestre dos Mestres · 12 Ensinamentos
              </h3>
              <p className="text-xs text-[#aea79b]">
                Conquista 'Mestre dos Mestres' (#50) · 10 Vocações / 12 Ensinamentos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#d9b780] bg-[#22262c] px-2.5 py-1 rounded border border-[#403e38]">
              {learnedCount} / 12 Aprendidos
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
          {/* Critical Caveat Banner */}
          <div className="bg-[#241a18] border border-[#7a392e] rounded-md p-3.5 text-[#ecd4cc] space-y-1">
            <div className="flex items-center gap-2 font-serif font-bold text-[#f4ad9b] text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>OBTENÇÃO E APRENDIZADO MANDATÓRIOS</span>
            </div>
            <p className="leading-relaxed">
              A conquista exige que você <b>APRENDA</b> os 12 ensinamentos. Apenas receber os pergaminhos e guardá-los no armazém não desbloqueia a conquista! Abra o inventário e use cada um dos 12 pergaminhos para assimilá-los. Lembre-se: <b>Ladrão possui 2</b> mestres e <b>Feiticeiro possui 2</b> mestres!
            </p>
          </div>

          {/* List of 12 Maisters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MAISTER_SKILLS.map((maister) => {
              const status = progress.maisters[maister.id] || { acquired: false, learned: false };

              return (
                <div
                  key={maister.id}
                  className={`border rounded-lg p-3.5 flex flex-col justify-between transition-all ${
                    status.learned
                      ? 'bg-[#151c17] border-[#38523c]'
                      : 'bg-[#181a1d] border-[#3d372e]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-serif font-bold text-sm text-[#f0d1a0]">
                        {maister.skillPt}
                      </span>
                      <span className="text-[10px] font-mono text-[#d9b780] bg-[#22252a] px-2 py-0.5 rounded border border-[#3e4249]">
                        {maister.vocationPt}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#aea79b] italic mb-2">
                      {maister.skillEn} ({maister.vocationEn})
                    </p>

                    <div className="space-y-1 text-xs text-[#cfc8bd] bg-[#111315]/70 p-2.5 rounded border border-[#2d3036]">
                      <p>
                        <b className="text-[#e9e2d7]">Mestre / Local:</b> {maister.npc} ({maister.location})
                      </p>
                      <p className="text-[11px] text-[#dcd6cc]">
                        <b className="text-[#d9b780]">Missão / Condição:</b> {maister.questOrCondition}
                      </p>
                      {maister.missableNote && (
                        <p className="text-[10px] text-[#f4ad9b]">
                          ⚠ {maister.missableNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions Checkboxes */}
                  <div className="mt-3 pt-2.5 border-t border-[#313338] flex items-center justify-between">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={status.acquired}
                        onChange={() => onToggleMaisterStatus(maister.id, 'acquired')}
                        className="w-3.5 h-3.5 rounded border-[#726044] text-[#d9b780] focus:ring-0 bg-[#1c1e21]"
                      />
                      <span className="text-[11px] text-[#aea79b]">
                        Pergaminho Obtido
                      </span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={status.learned}
                        onChange={() => onToggleMaisterStatus(maister.id, 'learned')}
                        className="w-3.5 h-3.5 rounded border-[#726044] text-[#9bc4a5] focus:ring-0 bg-[#1c1e21]"
                      />
                      <span className={`text-[11px] font-semibold ${status.learned ? 'text-[#9bc4a5]' : 'text-[#cfc8bd]'}`}>
                        Habilidade Aprendida
                      </span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-between">
          <a
            href="https://www.trueachievements.com/a429012/master-of-the-maisters-achievement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#d9b780] hover:text-[#edd9ba] flex items-center gap-1"
          >
            <span>Guia TrueAchievements</span>
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
