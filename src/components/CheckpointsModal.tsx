import React from 'react';
import { X, ShieldAlert, CheckCircle2, Circle, AlertTriangle, ExternalLink } from 'lucide-react';
import { RISK_CHECKPOINTS } from '../data/roadmapData';
import { UserProgress } from '../types/roadmap';

interface CheckpointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleCheckpoint: (checkpointId: string) => void;
  onJumpToPhase: (phaseId: string) => void;
}

export const CheckpointsModal: React.FC<CheckpointsModalProps> = ({
  isOpen,
  onClose,
  progress,
  onToggleCheckpoint,
  onJumpToPhase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#8a4b3d] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#1f1614]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#8a4b3d] bg-[#291714] flex items-center justify-center text-[#df8c75]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                4 Alertas de Progressão & Checkpoints
              </h3>
              <p className="text-xs text-[#aea79b]">
                Alertas de risco — não representam garantia de conclusão
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#aea79b] hover:text-[#e9e2d7] hover:bg-[#202327]"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-[#d0c9be]">
          <div className="bg-[#241a18] border border-[#6b352b] rounded-md p-3.5 text-[#ecd4cc] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#df8c75] shrink-0 mt-0.5" />
            <div>
              <p className="font-serif font-bold text-[#f4ad9b] text-sm">
                A Filosofia de Salvamento de Dragon's Dogma 2
              </p>
              <p className="mt-1 leading-relaxed text-[#aea79b]">
                O jogo só possui um arquivo de progresso contínuo e autosave constante, <b>mas</b> permite restaurar o último salvamento manual realizado ao descansar em uma <b>Pousada</b> ou na sua <b>Casa Própria</b>. Antes de cada um dos quatro checkpoints abaixo, durma em uma pousada para congelar um ponto de restauração seguro!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {RISK_CHECKPOINTS.map((cp, idx) => {
              const isConfirmed = !!progress.confirmedCheckpoints[cp.id];

              return (
                <div
                  key={cp.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isConfirmed
                      ? 'bg-[#151c17] border-[#385940]'
                      : 'bg-[#1a1716] border-[#5e3830]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#d9b780]">
                        Checkpoint {idx + 1}:
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#f0d1a0]">
                        {cp.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onJumpToPhase(cp.phaseId);
                          onClose();
                        }}
                        className="text-[11px] text-[#d9b780] hover:underline"
                      >
                        Ir ao Capítulo no Guia →
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#cfc8bd] leading-relaxed mb-3">
                    {cp.description}
                  </p>

                  <div className="bg-[#111315]/80 p-3 rounded border border-[#313338] space-y-1.5">
                    <span className="font-serif uppercase tracking-wider text-[11px] text-[#d9b780] block">
                      Lista de Verificação Prévia:
                    </span>
                    <ul className="space-y-1 text-xs text-[#aea79b]">
                      {cp.verificationList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#df8c75] font-mono">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#313338] flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isConfirmed}
                        onChange={() => onToggleCheckpoint(cp.id)}
                        className="w-4 h-4 rounded border-[#726044] text-[#d9b780] focus:ring-0 bg-[#1c1e21]"
                      />
                      <span className={`text-xs font-semibold ${isConfirmed ? 'text-[#9bc4a5]' : 'text-[#f0d1a0]'}`}>
                        {isConfirmed ? 'Verificado & Confirmado' : 'Marcar como verificado e ciente'}
                      </span>
                    </label>

                    <span className="text-[10px] uppercase font-mono text-[#8e887d]">
                      {cp.dangerLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-between">
          <a
            href="https://game8.co/games/Dragons-Dogma-2/archives/447927"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#d9b780] hover:text-[#edd9ba] flex items-center gap-1"
          >
            <span>Referência Game8: Pontos Sem Retorno</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded bg-[#d9b780] text-[#111315] hover:bg-[#edd9ba] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
