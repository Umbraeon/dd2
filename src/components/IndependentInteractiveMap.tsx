import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ArrowLeft, Compass, Filter, Layers, MapPin, Maximize2,
  Minimize2, RotateCcw, Search, Sparkles, X, ExternalLink,
  Shield, User, Mountain, Zap, Key, Info, CheckCircle2
} from 'lucide-react';
import { DD2MapMarker, MarkerType } from '../types/independentMap';
import { INDEPENDENT_MAP_MARKERS } from '../data/independentMapMarkers';
import { QUEST_GUIDES } from '../data/questGuides';
import { DEFAULT_MAP_SIZE, pixelToLatLng } from '../utils/mapCoordinates';
import { isMapTilesManifest, mapTileUrl, type MapTilesManifest } from '../utils/mapTiles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenGuide?: (guideId: string) => void;
}

// O pergaminho ocupa apenas parte da textura quadrada 8K; enquadrar o desenho,
// sem cortar/reprojetar os tiles ou alegar calibração de coordenadas.
const ARTWORK_BOUNDS: L.LatLngBoundsExpression = [[326, 275], [1788, 1530]];

const CATEGORY_CONFIG: Record<MarkerType, { label: string; color: string; bg: string; icon: string }> = {
  quest: { label: 'Missões', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', icon: '🧭' },
  npc: { label: 'NPCs Relevantes', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', icon: '👤' },
  cave: { label: 'Cavernas & Masmorras', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', icon: '⛰️' },
  fast_travel: { label: 'Viagem Rápida', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', icon: '⚡' },
  token: { label: 'Mementos do Buscador', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)', icon: '✨' },
  landmark: { label: 'Pontos Notáveis', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)', icon: '🏛️' }
};

export const IndependentInteractiveMap: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenGuide
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const baseMapLayerRef = useRef<L.Layer | null>(null);

  // UI state
  const [activeTypes, setActiveTypes] = useState<Set<MarkerType>>(
    () => new Set(['quest', 'npc', 'cave', 'fast_travel', 'token'])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<DD2MapMarker | null>(null);
  const [baseLayer, setBaseLayer] = useState<'official' | 'schematic'>('official');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  // Coordenadas do protótipo não foram auditadas; não poluem o mapa original por padrão.
  const [showExperimentalMarkers, setShowExperimentalMarkers] = useState(false);
  const [tileManifest, setTileManifest] = useState<MapTilesManifest | null>(null);

  // O build gera o manifesto e os tiles antes de publicar na Vercel.
  // Em dev, sem build, a imagem 2K continua funcionando como fallback.
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    fetch('/map-tiles/metadata.json', { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error('Mosaicos ainda não gerados');
        return response.json() as Promise<unknown>;
      })
      .then(json => {
        setTileManifest(isMapTilesManifest(json) ? json : null);
      })
      .catch(() => {
        if (!controller.signal.aborted) setTileManifest(null);
      });
    return () => controller.abort();
  }, [isOpen]);

  // Manage modal open/close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Filtered markers
  const filteredMarkers = useMemo(() => {
    return INDEPENDENT_MAP_MARKERS.filter(m => {
      if (!activeTypes.has(m.type)) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        (m.originalTitle && m.originalTitle.toLowerCase().includes(q)) ||
        m.description.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q)
      );
    });
  }, [activeTypes, searchQuery]);

  // Marker counts by type
  const countsByType = useMemo(() => {
    const counts: Record<MarkerType, number> = {
      quest: 0,
      npc: 0,
      cave: 0,
      fast_travel: 0,
      token: 0,
      landmark: 0
    };
    for (const m of INDEPENDENT_MAP_MARKERS) {
      counts[m.type]++;
    }
    return counts;
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      return;
    }

    const mapSize = DEFAULT_MAP_SIZE;
    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [mapSize, mapSize]
    ];

    const map = L.map(mapContainerRef.current, {
      crs: L.CRS.Simple,
      minZoom: -3,
      // MaxZoom será atualizado após o manifesto. Não permitir upscale acima da fonte.
      maxZoom: 0,
      zoomSnap: 1,
      zoomDelta: 1,
      zoomControl: false,
      attributionControl: false,
      maxBounds: [[226, 175], [1888, 1630]],
      maxBoundsViscosity: 0.95
    });

    mapInstanceRef.current = map;

    // A camada de imagem é montada pelo efeito separado abaixo,
    // evitando duas cópias da textura original no mapa.

    // Exibir a arte do pergaminho, não a grande margem preta nativa do arquivo.
    map.fitBounds(ARTWORK_BOUNDS, { padding: [18, 18], animate: false });
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Markers layer group
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    setMapReady(true);

    // Cleanup on unmount
    return () => {
      setMapReady(false);
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, [isOpen]);

  // Alterna entre a camada de tiles e a base sem imagem.
  // A geometria do mapa e a posição dos marcadores não mudam com o zoom.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;
    if (baseMapLayerRef.current) {
      map.removeLayer(baseMapLayerRef.current);
      baseMapLayerRef.current = null;
    }
    map.setMaxZoom(tileManifest?.maxNativeZoom ?? 0);
    if (baseLayer !== 'official') return;

    const bounds: L.LatLngBoundsExpression = [[0, 0], [DEFAULT_MAP_SIZE, DEFAULT_MAP_SIZE]];
    // Mantenha uma imagem 2K no plano inferior mesmo se a rede de tiles falhar.
    // A pane fica atrás dos mosaicos; nos zooms altos os tiles prevalecem.
    if (!map.getPane('dd2-tile-fallback')) {
      const pane = map.createPane('dd2-tile-fallback');
      pane.style.zIndex = '190';
      pane.style.pointerEvents = 'none';
    }
    const fallback = L.imageOverlay('/world-map.webp', bounds, {
      pane: 'dd2-tile-fallback',
      opacity: 1,
      interactive: false
    });
    const sourceLayers: L.Layer[] = [fallback];
    if (tileManifest) {
      const tiles = L.tileLayer('', {
        // TileLayer herda minZoom=0 por padrão; fitBounds abre em zoom negativo.
        // Sem estes limites, nenhum tile é renderizado na visão inicial.
        minZoom: tileManifest.minNativeZoom,
        maxZoom: tileManifest.maxNativeZoom,
        minNativeZoom: tileManifest.minNativeZoom,
        maxNativeZoom: tileManifest.maxNativeZoom,
        tileSize: tileManifest.tileSize,
        // O filtro bounds do GridLayer descarta tiles no CRS.Simple com Y negativo.
        // A validação de x/linha já é feita em mapTileUrl.
        noWrap: true,
        keepBuffer: 3,
        crossOrigin: false,
        attribution: 'Mapa do jogo © CAPCOM — visualização não oficial'
      });
      // Em CRS.Simple o eixo Y da grade Leaflet é negativo. O utilitário
      // normaliza para o índice de linha do raster (origem no canto superior).
      tiles.getTileUrl = coords => mapTileUrl(coords.z, coords.x, coords.y)
        ?? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      sourceLayers.push(tiles);
    }
    baseMapLayerRef.current = L.layerGroup(sourceLayers).addTo(map);
    return () => {
      if (baseMapLayerRef.current && map.hasLayer(baseMapLayerRef.current)) {
        map.removeLayer(baseMapLayerRef.current);
      }
      baseMapLayerRef.current = null;
    };
  }, [baseLayer, mapReady, tileManifest]);

  // Render Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    if (!showExperimentalMarkers) return;

    filteredMarkers.forEach(marker => {
      if (!marker.mapPosition) return;

      const [lat, lng] = pixelToLatLng(
        marker.mapPosition.pixelX,
        marker.mapPosition.pixelY,
        DEFAULT_MAP_SIZE
      );

      const cfg = CATEGORY_CONFIG[marker.type];
      const iconHtml = `
        <div class="custom-map-pin" style="
          background: ${cfg.color};
          box-shadow: 0 0 10px ${cfg.color}80, 0 2px 5px rgba(0,0,0,0.8);
          border: 2px solid #ffffff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
          transition: transform 0.15s ease;
        ">
          <span>${cfg.icon}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-div-icon',
        html: iconHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const leafletMarker = L.marker([lat, lng], {
        icon: customIcon,
        title: marker.title
      });

      leafletMarker.on('click', () => {
        setSelectedMarker(marker);
      });

      markersLayer.addLayer(leafletMarker);
    });
  }, [filteredMarkers, mapReady, showExperimentalMarkers]);

  // Toggle category
  const toggleCategory = useCallback((type: MarkerType) => {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  // Reset view
  const resetView = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.fitBounds(ARTWORK_BOUNDS, { padding: [18, 18], animate: true });
    setSelectedMarker(null);
  }, []);

  // Focus on specific marker
  const focusMarker = useCallback((marker: DD2MapMarker) => {
    const map = mapInstanceRef.current;
    if (!map || !marker.mapPosition) return;
    const [lat, lng] = pixelToLatLng(
      marker.mapPosition.pixelX,
      marker.mapPosition.pixelY,
      DEFAULT_MAP_SIZE
    );
    map.setView([lat, lng], Math.min(1, map.getMaxZoom()), { animate: true });
    setSelectedMarker(marker);
  }, []);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="independent-map-dialog fixed inset-0 z-50 w-full h-full max-w-none max-h-none m-0 p-0 bg-[#0d0f12] text-[#e2e8f0] border-none flex flex-col overflow-hidden"
      aria-labelledby="independent-map-title"
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
    >
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#13161c] border-b border-[#242b35] z-10 select-none">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#94a3b8] hover:text-[#f8fafc] bg-[#1a1f26] hover:bg-[#252c37] border border-[#2d3748] rounded transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Voltar</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-[#f59e0b]" aria-hidden="true" />
              <h1 id="independent-map-title" className="text-sm md:text-base font-semibold tracking-wide text-[#f8fafc]">
                Mapa Interativo Independente
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#2d3748] text-[#38bdf8] rounded">
                Teste B01
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-[#94a3b8]">
              Protótipo de mapa próprio · posições dos marcadores ainda não auditadas
            </p>
          </div>
        </div>

        {/* Center / Search Input */}
        <div className="relative max-w-xs w-full mx-2 hidden sm:block">
          <Search size={14} className="absolute left-2.5 top-2.5 text-[#64748b]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar missões, NPCs, locais..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#1a1f26] border border-[#2d3748] rounded text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#f59e0b]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2 text-[#94a3b8] hover:text-[#f8fafc]"
              aria-label="Limpar busca"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Base Layer Switcher */}
          <div className="flex items-center bg-[#1a1f26] border border-[#2d3748] rounded p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setBaseLayer('official')}
              className={`px-2 py-1 rounded transition-colors ${
                baseLayer === 'official' ? 'bg-[#f59e0b] text-[#0f172a] font-bold' : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
              title="Imagem rasterizada do mapa do jogo; uso experimental, direitos da CAPCOM"
            >
              {tileManifest
                ? `Mapa do jogo (${tileManifest.sourceWidth / 1024}K · tiles)`
                : 'Mapa do jogo (2K)'}
            </button>
            <button
              type="button"
              onClick={() => setBaseLayer('schematic')}
              className={`px-2 py-1 rounded transition-colors ${
                baseLayer === 'schematic' ? 'bg-[#f59e0b] text-[#0f172a] font-bold' : 'text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
              title="Camada sem imagem de fundo, para teste dos marcadores"
            >
              Esquema
            </button>
          </div>

          <button
            type="button"
            onClick={resetView}
            className="p-1.5 text-[#94a3b8] hover:text-[#f8fafc] bg-[#1a1f26] border border-[#2d3748] rounded"
            title="Ajustar aos limites do mapa"
            aria-label="Ajustar aos limites"
          >
            <RotateCcw size={15} />
          </button>

          <button
            type="button"
            onClick={() => setFilterPanelOpen(prev => !prev)}
            className={`p-1.5 rounded border transition-colors ${
              filterPanelOpen
                ? 'bg-[#f59e0b] text-[#0f172a] border-[#f59e0b]'
                : 'text-[#94a3b8] hover:text-[#f8fafc] bg-[#1a1f26] border-[#2d3748]'
            }`}
            title="Filtros de marcadores"
            aria-label="Alternar filtros"
          >
            <Filter size={15} />
          </button>
        </div>
      </header>

      <p role="note" className="px-4 py-2 bg-[#332418] text-[#f5d5a1] border-b border-[#72542b] text-xs">
        VERSÃO DE TESTE — Imagem do jogo © CAPCOM. Mapa não oficial. Os pontos demonstrativos
        ainda não foram conferidos individualmente em jogo: não use estas posições para decisões irreversíveis.
      </p>

      {/* Main Interactive Map Area */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#0a0c10]">
        {/* Leaflet container */}
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          style={{
            background: baseLayer === 'schematic' ? 'radial-gradient(circle at 50% 50%, #161b22 0%, #0d1117 100%)' : '#0d1117'
          }}
        />

        {/* Filter Toolbar (Floating Pill Bar) */}
        <div className="absolute top-3 left-3 right-3 md:right-auto z-20 flex flex-wrap gap-1.5 max-w-2xl pointer-events-auto">
          {(Object.keys(CATEGORY_CONFIG) as MarkerType[]).map(type => {
            const cfg = CATEGORY_CONFIG[type];
            const active = activeTypes.has(type);
            const count = countsByType[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleCategory(type)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all ${
                  active
                    ? 'border-opacity-100 shadow-md font-medium text-[#f8fafc]'
                    : 'opacity-50 hover:opacity-80 bg-[#161b22] border-[#30363d] text-[#94a3b8]'
                }`}
                style={{
                  backgroundColor: active ? cfg.bg : undefined,
                  borderColor: active ? cfg.color : undefined
                }}
              >
                <span>{cfg.icon}</span>
                <span>{cfg.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1e293b] text-[#cbd5e1] font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Marker Details Drawer / Popup */}
        {selectedMarker && (
          <aside className="absolute bottom-4 right-4 z-30 w-80 md:w-96 max-w-[calc(100vw-2rem)] bg-[#13161c] border border-[#2d3748] rounded-lg shadow-2xl p-4 flex flex-col gap-2.5 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{CATEGORY_CONFIG[selectedMarker.type]?.icon}</span>
                <div>
                  <span
                    className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded"
                    style={{
                      color: CATEGORY_CONFIG[selectedMarker.type]?.color,
                      backgroundColor: CATEGORY_CONFIG[selectedMarker.type]?.bg
                    }}
                  >
                    {CATEGORY_CONFIG[selectedMarker.type]?.label}
                  </span>
                  <span className="ml-2 text-[10px] text-[#94a3b8] font-medium">
                    {selectedMarker.region}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMarker(null)}
                className="text-[#94a3b8] hover:text-[#f8fafc] p-1 rounded"
                aria-label="Fechar detalhes"
              >
                <X size={15} />
              </button>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#f8fafc] leading-tight">
                {selectedMarker.title}
              </h2>
              {selectedMarker.originalTitle && (
                <p className="text-[11px] text-[#64748b] italic">
                  {selectedMarker.originalTitle}
                </p>
              )}
            </div>

            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              {selectedMarker.description}
            </p>

            {/* Spatial Coordinates Box */}
            <div className="bg-[#1a1f26] border border-[#2d3748] rounded p-2 text-[11px] font-mono flex flex-col gap-1">
              <div className="flex justify-between text-[#94a3b8]">
                <span>Mundo (X, Y, Z):</span>
                <span className="text-[#38bdf8]">
                  {selectedMarker.worldPosition
                    ? `${selectedMarker.worldPosition.x.toFixed(1)}m, ${selectedMarker.worldPosition.y.toFixed(1)}m, ${selectedMarker.worldPosition.z.toFixed(1)}m`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>Pixel 2D (MapX, MapY):</span>
                <span className="text-[#f59e0b]">
                  {selectedMarker.mapPosition
                    ? `${selectedMarker.mapPosition.pixelX}, ${selectedMarker.mapPosition.pixelY}`
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-[#94a3b8] border-t border-[#2d3748] pt-1 mt-0.5">
                <span>Fonte / Verificação:</span>
                <span className="text-[#10b981] font-sans font-semibold">
                  {selectedMarker.verification} ({selectedMarker.source})
                </span>
              </div>
            </div>

            {/* Guide Link Button */}
            {selectedMarker.guideId && onOpenGuide && QUEST_GUIDES.some(guide => guide.id === selectedMarker.guideId) && (
              <button
                type="button"
                onClick={() => {
                  onOpenGuide(selectedMarker.guideId!);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-[#0f172a] bg-[#f59e0b] hover:bg-[#d97706] rounded transition-colors shadow"
              >
                <span>Ver Guia no Compêndio</span>
                <ExternalLink size={13} aria-hidden="true" />
              </button>
            )}
          </aside>
        )}

        {/* Informative Watermark Footnote */}
        <footer className="absolute bottom-2 left-3 z-10 text-[10px] text-[#64748b] bg-[#0f172a] bg-opacity-75 px-2 py-1 rounded select-none pointer-events-none">
          DD2 • {tileManifest
            ? `${tileManifest.sourceWidth}² px · ${tileManifest.tileCount} tiles · zoom nativo até ${tileManifest.maxNativeZoom}`
            : 'imagem 2K (fallback)'} · Localizações não auditadas
        </footer>
      </div>
    </dialog>
  );
};
