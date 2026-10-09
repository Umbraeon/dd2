import React, { useState } from 'react';
import { Award, ExternalLink, AlertTriangle, Sparkles, Check } from 'lucide-react';
import { Achievement } from '../types/roadmap';

interface AchievementCardProps {
  achievement: Achievement;
  isCompleted: boolean;
  onToggle: (id: number) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isCompleted,
  onToggle
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article 
      className={`border rounded-lg p-3.5 transition-all duration-200 flex flex-col justify-between ${
        isCompleted
          ? 'bg-[#141618]/70 border-[#38483c]/60 opacity-80'
          : achievement.missable
          ? 'bg-gradient-to-br from-[#1d1917] to-[#151719] border-[#6b3e34]/70 hover:border-[#8e4f42]'
          : achievement.dlc
          ? 'bg-gradient-to-br from-[#161a22] to-[#151719] border-[#374e69]/70 hover:border-[#4d7099]'
          : 'bg-[#181a1d] border-[#3f3b33] hover:border-[#635b4c]'
      }`}
    >
      <div>
        {/* Top: Icon + Title Lockup */}
        <div className="flex items-start gap-3">
          {/* Steam Icon or Resilient Fallback */}
          <div className="relative w-12 h-12 rounded border border-[#52493b] bg-[#121315] shrink-0 overflow-hidden shadow-sm flex items-center justify-center">
            {!imgError ? (
              <img
                src={achievement.icon}
                alt={`Ícone da Conquista: ${achievement.title}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-opacity"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-1 text-center bg-[#212327] w-full h-full">
                <Award className={`w-5 h-5 ${achievement.dlc ? 'text-[#79a6d2]' : 'text-[#d9b780]'}`} />
                <span className="text-[8px] uppercase tracking-tighter text-[#aea79b] mt-0.5 font-mono">
                  Ícone
                </span>
              </div>
            )}
            {isCompleted && (
              <div className="absolute inset-0 bg-[#16291a]/70 flex items-center justify-center backdrop-blur-[1px]">
                <Check className="w-6 h-6 text-[#9bc4a5] drop-shadow" />
              </div>
            )}
          </div>

          {/* Titles & Metadata Tags */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-serif font-bold text-sm text-[#f0d1a0] leading-snug">
                {achievement.title}
              </h4>
              <span className="font-mono text-[10px] text-[#8e887d] shrink-0">
                #{achievement.id}
              </span>
            </div>

            <p className="text-[11px] text-[#aea79b] italic font-sans mb-1.5">
              {achievement.original}
            </p>

            {/* Zero-Pill Badges: clean inline typographic tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] uppercase font-sans">
              {achievement.missable && (
                <span className="text-[#f4ad9b] flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  Risco de perda
                </span>
              )}
              {achievement.dlc ? (
                <span className="text-[#a4c7e8] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Dark Arisen (DLC)
                </span>
              ) : (
                <span className="text-[#8e887d]">Jogo-base</span>
              )}
              <span className="text-[#726044]">·</span>
              <span className="text-[#cfc8bd]">{achievement.category}</span>
            </div>
          </div>
        </div>

        {/* Instructions / Tip Box */}
        <div className="mt-3 text-xs text-[#dcd6cc] leading-relaxed bg-[#111315]/60 p-2.5 rounded border border-[#313338]/60">
          <p>{achievement.tip}</p>
        </div>

        {/* Validation / Caveat Notice */}
        {achievement.dlc && (
          <div className="mt-2 text-[10px] text-[#79a6d2] bg-[#141b24] p-1.5 rounded border border-[#2b3c52]">
            <span>Status: {achievement.validation}</span>
          </div>
        )}
      </div>

      {/* Bottom Bar: Action Checkbox + Steam Source Link */}
      <div className="mt-3.5 pt-2.5 border-t border-[#313338] flex items-center justify-between gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(achievement.id)}
            className="w-4 h-4 rounded border-[#726044] text-[#d9b780] focus:ring-0 focus:ring-offset-0 bg-[#1c1e21] cursor-pointer"
          />
          <span className={`text-xs ${isCompleted ? 'text-[#9bc4a5] font-semibold' : 'text-[#cfc8bd] group-hover:text-[#f0d1a0]'}`}>
            {isCompleted ? 'Concluída' : 'Marcar como obtida'}
          </span>
        </label>

        <a
          href={achievement.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#aea79b] hover:text-[#d9b780] flex items-center gap-1 transition-colors"
          title="Verificar registro oficial da conquista na Steam"
        >
          <span>Conferir na Steam</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
};
