import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { ROADMAP_METADATA } from '../data/roadmapData';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#d9b780]">
              <ShieldCheck className="w-4 h-4 text-[#9bc4a5]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Fontes & Notas Editoriais
              </h3>
              <p className="text-xs text-[#aea79b]">
                Fontes públicas e comunidade · revisão de precisão em andamento
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
          {/* Audit Summary Box */}
          <div className="bg-[#181b1e] border border-[#3d372e] rounded-lg p-4 space-y-3">
            <span className="font-serif font-bold text-sm text-[#f0d1a0] block">
              Pontos relevantes e verificações pendentes
            </span>
            <ul className="space-y-2 text-[#cfc8bd] text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#d9b780] font-bold">•</span>
                <span>
                  <b>Contagem de Conquistas (54 vs. 60):</b> O jogo original possui 54 conquistas. A expansão <i>Dark Arisen</i>, anunciada pela Capcom para outubro de 2026, possui 6 conquistas adicionais listadas na Steam global. O guia brasileiro de 2024 cobria apenas o jogo-base; as 6 da DLC estão separadas em capítulo próprio com rotas marcadas como <i>em verificação</i> para não induzir a erro.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d9b780] font-bold">•</span>
                <span>
                  <b>Turista (#46):</b> Guias superficiais traduzem como "visitar 50 lugares". O requisito oficial exige adentrar <b>50 cavernas ou masmorras</b> (dungeons), contadas no diário de aventura.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d9b780] font-bold">•</span>
                <span>
                  <b>Mestre dos Mestres (#50):</b> São 10 vocações, mas <b>12 ensinamentos</b>. Ladrão tem 2 mestres (Flaude e Srail) e Feiticeiro tem 2 mestres (Trysha e Myrddin). É obrigatório consumir e aprender os pergaminhos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d9b780] font-bold">•</span>
                <span>
                  <b>Mestre do Churrasco (#52):</b> São 8 tipos de carne vezes 2 períodos (Dia e Noite) = 16 preparos gravados em vídeo de carne real.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d9b780] font-bold">•</span>
                <span>
                  <b>Carroça Fantasma (#33):</b> Não basta seguir a carroça a pé. É mandatório desequipar tudo, falar com o cocheiro disfarçado de peão e <b>entrar</b> no compartimento.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d9b780] font-bold">•</span>
                <span>
                  <b>Encerramento (#31) no Modo Casual:</b> A descrição oficial na Steam atesta explicitamente que a conquista do final verdadeiro não é obtida no modo Casual.
                </span>
              </li>
            </ul>
          </div>

          {/* Sources Table */}
          <div className="space-y-3">
            <h4 className="font-serif uppercase tracking-wider text-xs text-[#d9b780]">
              Referências para consulta e conferência
            </h4>
            <div className="border border-[#3d372e] rounded-lg overflow-hidden bg-[#181a1d]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#1f2227] border-b border-[#3d372e] font-serif uppercase tracking-wider text-[11px] text-[#d9b780]">
                    <th className="py-2.5 px-3">Fonte / Referência</th>
                    <th className="py-2.5 px-3">Propósito na Rota</th>
                    <th className="py-2.5 px-3 text-right">Link Externo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2d3036] text-[#cfc8bd]">
                  {Object.entries(ROADMAP_METADATA.sources).map(([key, item]) => (
                    <tr key={key} className="hover:bg-[#1e2126] transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-[#f0d1a0]">
                        {item.label}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-[#aea79b]">
                        {key === 'route_guide' && 'Ordem sequencial cronológica de missões (2024)'}
                        {key === 'steam_pt' && 'Nomes oficiais em português brasileiro (54 conquistas)'}
                        {key === 'steam_en' && 'Relação global atualizada com as 6 da expansão'}
                        {key === 'points_of_no_return' && 'Mapeamento de cancelamento de missões'}
                        {key === 'sphinx_powerpyx' && 'Gabarito dos 10 enigmas da Esfinge'}
                        {key === 'maister_skills' && '12 habilidades de mestre das 10 classes'}
                        {key === 'caves_guide' && 'Mapeamento de cavernas para o troféu Turista'}
                        {key === 'barbecue_guide' && '8 tipos de carne dia/noite (16 vídeos)'}
                        {key === 'phantom_oxcart' && 'Procedimento de disfarce na carroça'}
                        {key === 'gigantus_guide' && 'Condição de velocidade do Gigantus'}
                        {key === 'unmoored_compendium' && 'Sequência de evacuação e feixes vermelhos'}
                        {key === 'dlc_trueachievements' && 'Registro dos requisitos oficiais da expansão Dark Arisen'}
                        {key === 'mapgenie' && 'Localização geográfica de 240 Mementos'}
                        {!['route_guide', 'steam_pt', 'steam_en', 'points_of_no_return', 'sphinx_powerpyx', 'maister_skills', 'caves_guide', 'barbecue_guide', 'phantom_oxcart', 'gigantus_guide', 'unmoored_compendium', 'dlc_trueachievements', 'mapgenie'].includes(key) && 'Conferência complementar independente'}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#d9b780] hover:text-[#edd9ba] inline-flex items-center gap-1"
                        >
                          <span>Acessar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
