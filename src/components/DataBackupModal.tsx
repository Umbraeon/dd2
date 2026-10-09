import React, { useState, useRef } from 'react';
import { X, FolderDown, FolderUp, RotateCcw, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { UserProgress } from '../types/roadmap';
import { exportProgressFile, validateImportData } from '../utils/storage';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onImportSuccess: (imported: UserProgress) => void;
  onResetAll: () => void;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  progress,
  onImportSuccess,
  onResetAll
}) => {
  const [pasteText, setPasteText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportProgressFile(progress);
    setSuccessMessage('Arquivo JSON baixado com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const processImportString = (content: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const result = validateImportData(content);
    if (!result.valid || !result.data) {
      setErrorMessage(result.error || 'Falha ao validar o arquivo.');
      return;
    }

    if (window.confirm('Substituir todo o progresso atual pelos dados do arquivo importado?')) {
      onImportSuccess(result.data);
      setSuccessMessage('Progresso importado e atualizado com sucesso!');
      setPasteText('');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 1500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      processImportString(content);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('ATENÇÃO: Deseja realmente zerar todo o progresso de etapas, conquistas e anotações deste navegador? Esta ação não pode ser desfeita.')) {
      onResetAll();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 lg:p-6 overflow-y-auto">
      <div className="bg-[#141619] border border-[#726044] rounded-lg max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#3d372e] flex items-center justify-between bg-[#191c20]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-[#726044] bg-[#22242a] flex items-center justify-center text-[#d9b780]">
              <FolderDown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#f0d1a0]">
                Gerenciamento & Backup de Progresso
              </h3>
              <p className="text-xs text-[#aea79b]">
                Exportar, importar e salvar sem necessidade de cadastro ou nuvem paga
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
          {/* Status feedback */}
          {errorMessage && (
            <div className="bg-[#291714] border border-[#6b2f24] p-3 rounded text-[#f4ad9b] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#df8c75]" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-[#17261a] border border-[#345939] p-3 rounded text-[#9bc4a5] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Export Section */}
          <div className="bg-[#181a1d] border border-[#3d372e] rounded-lg p-4 space-y-2">
            <span className="font-serif font-bold text-sm text-[#f0d1a0] block">
              1. Exportar Progresso Atual (Download JSON)
            </span>
            <p className="text-[#aea79b]">
              Gera um arquivo cópia contendo todas as suas etapas marcadas, conquistas, matriz de churrasco, mestres e anotações do 1º memento.
            </p>
            <button
              onClick={handleExport}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded bg-[#2b271f] hover:bg-[#3d3629] text-[#edd9ba] border border-[#726044] font-semibold transition-colors"
            >
              <FolderDown className="w-4 h-4 text-[#d9b780]" />
              <span>Baixar Arquivo JSON de Backup</span>
            </button>
          </div>

          {/* Import Section */}
          <div className="bg-[#181a1d] border border-[#3d372e] rounded-lg p-4 space-y-3">
            <span className="font-serif font-bold text-sm text-[#f0d1a0] block">
              2. Importar de Outro Dispositivo
            </span>
            <p className="text-[#aea79b]">
              Carregue um arquivo JSON gerado por este guia ou cole o conteúdo do texto abaixo:
            </p>

            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#202327] hover:bg-[#282d33] text-[#e9e2d7] border border-[#403e38] transition-colors"
              >
                <FolderUp className="w-4 h-4 text-[#9bc4a5]" />
                <span>Selecionar Arquivo .JSON</span>
              </button>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] text-[#8e887d]">
                Ou cole o código JSON diretamente:
              </span>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder='Cole o texto do JSON aqui...'
                className="w-full h-20 bg-[#121316] border border-[#3e4249] rounded p-2 text-xs font-mono text-[#e9e2d7] focus:outline-none focus:border-[#d9b780]"
              />
              {pasteText.trim() && (
                <button
                  onClick={() => processImportString(pasteText)}
                  className="px-3 py-1.5 text-xs font-semibold rounded bg-[#9bc4a5] text-[#101612] hover:bg-[#b0d6b9] transition-colors"
                >
                  Carregar Dados Colados
                </button>
              )}
            </div>
          </div>

          {/* Reset Section */}
          <div className="bg-[#211615] border border-[#5a2e26] rounded-lg p-4 space-y-2">
            <span className="font-serif font-bold text-sm text-[#f4ad9b] block">
              3. Redefinir Progresso
            </span>
            <p className="text-[#aea79b]">
              Limpa todo o histórico de salvamento salvo neste navegador. Use caso queira iniciar uma nova campanha do zero.
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#331c18] hover:bg-[#4d241e] text-[#f4ad9b] border border-[#7a3428] transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Zerar Progresso Deste Navegador</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#3d372e] bg-[#191c20] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded bg-[#1e2125] text-[#cfc8bd] hover:bg-[#282d33] border border-[#403e38] transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
