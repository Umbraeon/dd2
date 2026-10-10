import React, { useEffect, useRef } from 'react';
import {
  Award, BookMarked, ChevronRight, Flame, FolderDown,
  HelpCircle, MapPin, ShieldAlert, X
} from 'lucide-react';

export type ToolId = 'sphinx' | 'tokens' | 'barbecue' | 'maisters' |
  'checkpoints' | 'backup' | 'glossary';

interface Props {
  open: boolean;
  top: number;
  trigger: HTMLButtonElement | null;
  onDismiss: (returnFocus?: boolean) => void;
  onSelect: (tool: ToolId) => void;
}

const groups = [
  {
    id: 'trackers',
    heading: 'Rastreadores',
    items: [
      { id: 'sphinx', name: 'Esfinge', summary: 'Dez enigmas e registro do primeiro memento', icon: HelpCircle },
      { id: 'tokens', name: 'Mementos do Buscador', summary: 'Contador e localização do primeiro memento', icon: MapPin },
      { id: 'barbecue', name: 'Churrasco', summary: 'Carnes e períodos de preparo', icon: Flame },
      { id: 'maisters', name: 'Mestres', summary: 'Habilidades e vocações', icon: Award }
    ]
  },
  {
    id: 'safety',
    heading: 'Segurança e progresso',
    items: [
      { id: 'checkpoints', name: 'Alertas e checkpoints', summary: 'Cuidados antes de decisões de risco', icon: ShieldAlert },
      { id: 'backup', name: 'Backup do progresso', summary: 'Exportar, importar e recuperar dados v3', icon: FolderDown }
    ]
  },
  {
    id: 'support',
    heading: 'Apoio',
    items: [
      { id: 'glossary', name: 'Glossário PT/EN', summary: 'Termos e equivalências bilíngues', icon: BookMarked }
    ]
  }
] as const;

/** One non-modal disclosure panel shared by both the header and References entry. */
export const ToolsHub: React.FC<Props> = ({ open, top, trigger, onDismiss, onSelect }) => {
  const panelRef = useRef<HTMLElement>(null);
  const firstActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstActionRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onDismiss(true);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest('[data-tools-hub-trigger]')) return;
      // Plain text/background does not reliably receive pointer focus. Restore the
      // origin only when focus would otherwise be stranded in the hidden panel.
      // Interactive targets keep their natural focus and click behavior.
      const interactive = target instanceof Element && !!target.closest(
        'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), ' +
        'textarea:not(:disabled), summary, [contenteditable="true"], [tabindex]:not([tabindex="-1"])'
      );
      const focusInPanel = !!panelRef.current?.contains(document.activeElement);
      onDismiss(!interactive && focusInPanel);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, onDismiss]);

  return (
    <section
      ref={panelRef}
      id="tools-hub-panel"
      className="tools-hub"
      hidden={!open}
      style={{ top: top + 6, maxHeight: `calc(100dvh - ${top + 18}px)` }}
      aria-labelledby="tools-hub-title"
      aria-describedby="tools-hub-description"
      data-origin={trigger?.dataset.toolsHubTrigger ?? 'header'}
    >
      <div className="tools-hub-heading">
        <div>
          <p className="tools-hub-overline">ACESSOS RÁPIDOS</p>
          <h2 id="tools-hub-title">Central de Ferramentas</h2>
          <p id="tools-hub-description">Acesse seus rastreadores sem sair do roteiro.</p>
        </div>
        <button className="tools-hub-close" type="button" onClick={() => onDismiss(true)} aria-label="Fechar central de ferramentas">
          <X size={19} aria-hidden="true" />
        </button>
      </div>
      <div className="tools-hub-body">
        {groups.map(group => (
          <section key={group.id} aria-labelledby={'tools-hub-' + group.id}>
            <h3 id={'tools-hub-' + group.id} className="tools-hub-group-title">{group.heading}</h3>
            <div className="tools-hub-group">
              {group.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    ref={group.id === 'trackers' && index === 0 ? firstActionRef : undefined}
                    className={'tools-hub-action' + (item.id === 'checkpoints' ? ' is-risk' : '')}
                    onClick={() => onSelect(item.id)}
                  >
                    <Icon size={19} aria-hidden="true" className="tools-hub-icon" />
                    <span className="tools-hub-copy"><strong>{item.name}</strong><small>{item.summary}</small></span>
                    <ChevronRight size={17} aria-hidden="true" className="tools-hub-arrow" />
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};
