import React from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import { ROADMAP_METADATA } from '../data/roadmapData';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Referências úteis ao jogador. O registro editorial completo fica em docs/audit/. */
const PUBLIC_SOURCES = ['steam_pt', 'steam_en', 'route_guide', 'mapgenie'] as const;

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div role="dialog" aria-modal="true" aria-labelledby="sources-title"
        className="bg-[#141619] border border-[#726044] rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#d9b780]" aria-hidden="true" />
            <h3 id="sources-title" className="font-serif font-bold text-lg text-[#f0d1a0]">Fontes do guia</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar fontes"
            className="p-2 rounded text-[#aea79b] hover:text-[#e9e2d7] hover:bg-[#202327]">
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-sm text-[#d0c9be]">
          <p>Conquistas, roteiro de missões e mapa para consulta.</p>
          <ul className="space-y-2">
            {PUBLIC_SOURCES.map(key => (
              <li key={key}>
                <a href={ROADMAP_METADATA.sources[key].url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded border border-[#3d372e] bg-[#181a1d] p-3 text-[#f0d1a0] hover:border-[#726044]">
                  <span>{ROADMAP_METADATA.sources[key].label}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
