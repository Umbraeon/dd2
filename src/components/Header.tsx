import React from 'react';
import { BookOpen, ShieldAlert, FolderDown } from 'lucide-react';

interface HeaderProps {
  onOpenCheckpoints: () => void;
  onOpenTools: () => void;
  onOpenSources: () => void;
  onOpenBackup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCheckpoints, onOpenTools, onOpenSources, onOpenBackup
}) => (
  <header className="codex-header sticky top-0 z-40">
    <div className="codex-header-inner">
      <a className="codex-brand" href="#hero-title" aria-label="Voltar ao início">
        <span className="codex-brand-mark" aria-hidden="true">✥</span>
        <span className="codex-brand-words"><strong>DOGMA <i>II</i></strong><small>O COMPÊNDIO DO NASCEN</small></span>
      </a>
      <nav className="codex-header-nav" aria-label="Navegação principal">
        <a href="#melve">A jornada</a>
        <a href="#preend">Antes do fim</a>
        <button type="button" onClick={onOpenSources}>Referências</button>
      </nav>
      <div className="codex-header-tools">
        <button type="button" onClick={onOpenCheckpoints} className="codex-header-warning" title="Conferir pontos críticos">
          <ShieldAlert size={16}/><span className="hidden sm:inline">ALERTAS</span>
        </button>
        <button type="button" onClick={onOpenTools} className="codex-header-tool" title="Abrir rastreador da Esfinge e outras ferramentas">
          <BookOpen size={16}/><span className="hidden md:inline">FERRAMENTAS</span>
        </button>
        <button type="button" onClick={onOpenBackup} className="codex-header-tool" title="Salvar ou importar o progresso" aria-label="Backup do progresso">
          <FolderDown size={16}/>
        </button>
      </div>
    </div>
  </header>
);
