import React from 'react';
import { X, HelpCircle, AlertTriangle, CheckCircle2, Circle, Clock, Sword, ExternalLink } from 'lucide-react';
import { SPHINX_RIDDLES } from '../data/roadmapData';
import { UserProgress } from '../types/roadmap';

interface SphinxTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleRiddle: (riddleId: string) => void;
  onUpdateFirstTokenLocation: (notes: string) => void;
}

export const SphinxTrackerModal: React.FC<SphinxTrackerModalProps> = ({
  isOpen,
  onClose,
  progress,
  onToggleRiddle,
  onUpdateFirstTokenLocation
}) => {
  if (!isOpen) return null;

  const completedCount = SPHINX_RIDDLES.filter(r => progress.sphinx[r.id]).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#d9b780]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Grimório da Esfinge · 10 Enigmas
              </h3>
              <p className="text-xs text-[#aea79b]">
                Conquista 'Marcas completas' (#39) e Pedra de Despertar Eterna (#51)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#d9b780] bg-[#22262c] px-2.5 py-1 rounded border border-[#403e38]">
              {completedCount}/10 Enigmas
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
          {/* Critical Rule Banner */}
          <div className="bg-[#241a18] border border-[#7a392e] rounded-md p-3.5 text-[#ecd4cc] space-y-1.5">
            <div className="flex items-center gap-2 font-serif font-bold text-[#f4ad9b] text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Regra de Tentativa Única & Prazo de 7 Dias</span>
            </div>
            <p className="leading-relaxed">
              Cada enigma só tem <b>uma tentativa</b>! Se você falhar, errar a contagem de estátuas ou quebrar o vaso, a Esfinge voará embora para sempre e os baús trancarão. Sempre faça um salvamento na Pousada antes de falar com ela!
            </p>
          </div>

          {/* First Token Location Recorder (Riddle of Rumination) */}
          <div className="bg-[#1a1c21] border border-[#52493b] rounded-md p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-[#f0d1a0] text-sm">
                Registro do Local do 1º Memento do Buscador (Ruminação)
              </span>
              <span className="text-[10px] text-[#aea79b] font-mono">
                Manual · Essencial
              </span>
            </div>
            <p className="text-[#aea79b] leading-relaxed">
              O 5º enigma exige que você retorne exatamente onde pegou seu primeiríssimo Seeker's Token. Anote aqui os pontos de referência ou coordenadas para não esquecer quando o relógio de 7 dias começar a correr:
            </p>
            <textarea
              value={progress.firstTokenLocation || ''}
              onChange={(e) => onUpdateFirstTokenLocation(e.target.value)}
              placeholder="Ex: No topo do arco de pedra na entrada das ruínas perto do Posto Avançado de Guarda nas Fronteiras..."
              className="w-full h-20 bg-[#121316] border border-[#3e4249] rounded p-2.5 text-xs text-[#e9e2d7] placeholder-[#6e685f] focus:outline-none focus:border-[#d9b780]"
            />
          </div>

          {/* List of Riddles */}
          <div className="space-y-4">
            <h4 className="font-serif uppercase tracking-wider text-[#d9b780] text-xs border-b border-[#3d372e] pb-1">
              Relação dos 10 Enigmas
            </h4>

            {SPHINX_RIDDLES.map((riddle) => {
              const isDone = !!progress.sphinx[riddle.id];
              return (
                <div
                  key={riddle.id}
                  className={`border rounded-lg p-3.5 transition-all ${
                    isDone
                      ? 'bg-[#151916] border-[#384e3c]'
                      : 'bg-[#181a1d] border-[#3d372e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleRiddle(riddle.id)}
                        className="text-[#aea79b] hover:text-[#d9b780]"
                        title={isDone ? "Marcar como pendente" : "Marcar como resolvido"}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#9bc4a5]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#5c5548]" />
                        )}
                      </button>
                      <div>
                        <span className="font-serif font-bold text-sm text-[#f0d1a0]">
                          #{riddle.number}. {riddle.namePt}
                        </span>
                        <span className="text-[10px] text-[#aea79b] italic ml-2">
                          ({riddle.nameEn})
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-mono text-[#d9b780]">
                      {riddle.location === 'mountain' ? 'Santuário da Montanha' : riddle.location === 'reunification' ? 'Transição' : 'Santuário da Fronteira'}
                    </span>
                  </div>

                  <div className="mt-2 pl-6 space-y-1.5">
                    <p className="text-[#cfc8bd]">
                      <b className="text-[#e9e2d7]">Charada:</b> {riddle.summary}
                    </p>
                    <p className="text-[#ecd2ac] bg-[#121315] p-2 rounded border border-[#313338]">
                      <b className="text-[#d9b780]">Solução:</b> {riddle.solution}
                    </p>
                    {riddle.warning && (
                      <p className="text-[11px] text-[#f4ad9b]">
                        ⚠ <b>Atenção:</b> {riddle.warning}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Killing the Sphinx for Eternal Wakestone */}
          <div className="bg-[#1d1b18] border border-[#726044] rounded-md p-4 space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-[#f0d1a0] text-sm">
              <Sword className="w-4 h-4 text-[#df8c75]" />
              <span>Como Derrotar a Esfinge e Obter a Pedra de Despertar Eterna (#51)</span>
            </div>
            <p className="leading-relaxed">
              Ao responder ao décimo enigma, a Esfinge começará a se despedir para voar para sempre. <b>Imediatamente</b> empunhe a Flecha da Ruína (Unmaking Arrow) como Arqueiro ou desferir dano crítico com seu melhor guerreiro no peito e asas. Derrotando-a antes de escapar, ela derrubará a <b>Chave da Sabedoria</b> (Key of Sagacity), que abre o imenso baú dourado central contendo a <b>Pedra de Despertar Eterna</b>.
            </p>
            <p className="text-[11px] text-[#9bc4a5]">
              Use a pedra depois em um necrotério repleto de defuntos para reviver 2 ou mais pessoas de uma só vez e conquistar 'Desprezo pelo ceifador' (#51).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-between">
          <a
            href="https://www.powerpyx.com/dragons-dogma-2-all-sphinx-riddles-solutions/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#d9b780] hover:text-[#edd9ba] flex items-center gap-1"
          >
            <span>Guia ilustrado PowerPyx</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded bg-[#d9b780] text-[#111315] hover:bg-[#edd9ba] transition-colors"
          >
            Concluir & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
