import React, { useState } from 'react';
import { X, BookMarked, Search, Sparkles } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/roadmapData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = GLOSSARY_TERMS.filter(term => {
    const q = search.toLowerCase();
    return (
      term.pt.toLowerCase().includes(q) ||
      term.en.toLowerCase().includes(q) ||
      term.category.toLowerCase().includes(q) ||
      term.notes.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#d9b780]">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Glossário Bilíngue de Termos · PT-BR & EN
              </h3>
              <p className="text-xs text-[#aea79b]">
                Concordância oficial da Steam, traduções da comunidade e notas da expansão
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

        {/* Search Bar */}
        <div className="p-3 bg-[#17191c] border-b border-[#313338]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e887d]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar termo em português ou inglês..."
              className="w-full bg-[#121316] border border-[#3e4249] rounded pl-9 pr-3 py-1.5 text-xs text-[#e9e2d7] placeholder-[#6e685f] focus:outline-none focus:border-[#d9b780]"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="border border-[#3d372e] rounded-lg overflow-hidden bg-[#181a1d]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1f2227] border-b border-[#3d372e] font-serif uppercase tracking-wider text-[11px] text-[#d9b780]">
                  <th className="py-2.5 px-3">Termo PT-BR Oficial</th>
                  <th className="py-2.5 px-3">Original em Inglês</th>
                  <th className="py-2.5 px-3">Categoria</th>
                  <th className="py-2.5 px-3">Contexto / Significado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3036] text-[#cfc8bd]">
                {filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#1e2126] transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-[#f0d1a0]">
                      {item.pt}
                      {item.isDlcProvisional && (
                        <span className="block text-[9px] uppercase font-mono text-[#79a6d2]">
                          Provisório (DLC)
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#aea79b]">
                      {item.en}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] font-mono uppercase bg-[#22252a] px-1.5 py-0.5 rounded text-[#d9b780]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#aea79b] text-[11px] leading-relaxed">
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-end">
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
