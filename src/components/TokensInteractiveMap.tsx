import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ExternalLink, MapPin } from 'lucide-react';

export const TOKENS_MAP_URL = 'https://mapgenie.io/dragons-dogma-2/maps/world';
export const TOKENS_MAP_EMBED_URL = TOKENS_MAP_URL + '?embed=light';

interface TokensInteractiveMapProps {
  isOpen: boolean;
  onBack: () => void;
}

/**
 * A separate top-layer map rather than a small nested iframe inside TokensTrackerModal.
 * The external provider owns its map and marker UI; this component never reads it or
 * synchronizes its state with localStorage.
 */
export const TokensInteractiveMap: React.FC<TokensInteractiveMapProps> = ({ isOpen, onBack }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      backRef.current?.focus({ preventScroll: true });
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="tokens-map-dialog"
      aria-labelledby="tokens-map-title"
      aria-describedby="tokens-map-help"
      onCancel={event => {
        event.preventDefault();
        onBack();
      }}
    >
      <div className="tokens-map-header">
        <div className="tokens-map-heading">
          <p>FERRAMENTAS · MEMENTOS</p>
          <h2 id="tokens-map-title"><MapPin size={21} aria-hidden="true" /> Mapa de Mementos do Buscador</h2>
          <span>Mapa por MapGenie · serviço externo, não oficial</span>
        </div>
        <div className="tokens-map-header-actions">
          <button ref={backRef} type="button" onClick={onBack} className="tokens-map-back">
            <ArrowLeft size={17} aria-hidden="true" /> Voltar aos Mementos
          </button>
          <a href={TOKENS_MAP_URL} target="_blank" rel="noopener noreferrer"
            className="tokens-map-external">
            Abrir no MapGenie <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <p id="tokens-map-help" className="tokens-map-help">
        Selecione o filtro <strong>Seeker's Token</strong> no mapa. As marcações no MapGenie
        são independentes do contador do Compêndio. Conteúdo de terceiros só é solicitado
        após você abrir esta visualização.
      </p>
      <div className="tokens-map-frame">
        {isOpen && (
          <iframe
            title="Mapa interativo de Mementos do Buscador — MapGenie (conteúdo externo)"
            src={TOKENS_MAP_EMBED_URL}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
      <div className="tokens-map-footer">
        <span>Se o mapa não aparecer ou não responder, utilize o endereço oficial:</span>
        <a href={TOKENS_MAP_URL} target="_blank" rel="noopener noreferrer">
          Abrir mapa no MapGenie <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    </dialog>
  );
};
