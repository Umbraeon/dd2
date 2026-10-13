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
    () => new Set(['cave', 'token'])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<DD2MapMarker | null>(null);
  const [baseLayer, setBaseLayer] = useState<'official' | 'schematic'>('official');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  // Coordenadas do protótipo não foram auditadas; não poluem o mapa original por padrão.
  const [showExperimentalMarkers, setShowExperimentalMarkers] = useState(true);
  const [mapZoom, setMapZoom] = useState(-2);
  const [tileManifest, setTileManifest] = useState<MapTilesManifest | null>(null);
  const [mapSharpness, setMapSharpness] = useState<'original' | 'enhanced'>('enhanced');

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
      // Pequenos incrementos permitem enquadrar a altura do pergaminho sem
      // deixá-lo minúsculo em monitores largos. O zoom MÁXIMO é inteiro e nativo.
      zoomSnap: 0.25,
      zoomDelta: 0.5,
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
    const onZoomEnd = () => setMapZoom(map.getZoom());
    map.on('zoomend', onZoomEnd);
    setMapZoom(map.getZoom());
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Markers layer group
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    setMapReady(true);

    // Cleanup on unmount
    return () => {
      setMapReady(false);
      map.off('zoomend', onZoomEnd);
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
    const fallback = L.imageOverlay(tileManifest ? '/map-tiles/overview.webp' : '/world-map.webp', bounds, {
      pane: 'dd2-tile-fallback',
      opacity: 1,
      interactive: false
    });
    const sourceLayers: L.Layer[] = [fallback];
    if (tileManifest) {
      const tiles = L.tileLayer('', {
        // TileLayer herda minZoom=0 por padrão; fitBounds abre em zoom negativo.
        // Sem estes limites, nenhum tile é renderizado na visão inicial.
        // Zoom afastado usa uma imagem overview contínua, sem costuras entre tiles.
        // Tiles individuais só entram a partir de zoom 0 para preservar nitidez.
        minZoom: 0,
        maxZoom: tileManifest.maxNativeZoom,
        minNativeZoom: 0,
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
      tiles.getTileUrl = coords => mapTileUrl(
        coords.z,
        coords.x,
        coords.y,
        mapSharpness === 'enhanced' && tileManifest.enhancedNativeZoom === coords.z ? 'enhanced' : 'original'
      ) ?? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      sourceLayers.push(tiles);
    }
    baseMapLayerRef.current = L.layerGroup(sourceLayers).addTo(map);
    return () => {
      if (baseMapLayerRef.current && map.hasLayer(baseMapLayerRef.current)) {
        map.removeLayer(baseMapLayerRef.current);
      }
      baseMapLayerRef.current = null;
    };
  }, [baseLayer, mapReady, tileManifest, mapSharpness]);

  // Render Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    if (!showExperimentalMarkers) return;

    // Agrupar apenas mementos enquanto o zoom estiver afastado.
    const getIcon = (type: 'cave' | 'token' | 'cluster', count = 1) => {
      const kind = type === 'cave' ? 'dd2-cave-pin' : type === 'token' ? 'dd2-token-pin' : 'dd2-token-cluster';
      const label = type === 'cave' ? '◆' : type === 'token' ? '✦' : String(count);
      const compact = mapZoom < 0;
      const size = compact
        ? (type === 'cluster' ? 25 : type === 'cave' ? 19 : 18)
        : (type === 'cluster' ? 33 : type === 'cave' ? 27 : 22);
      return L.divIcon({
        className: 'dd2-location-icon' + (compact ? ' dd2-pin-compact' : ''),
        html: `<span class="${kind}" aria-hidden="true">${label}</span>`,
        iconSize: [size,size], iconAnchor: [size/2,size/2]
      });
    };
    const addPoint = (marker: DD2MapMarker) => {
      const pos = marker.mapPosition;
      if (!pos) return;
      const m = L.marker(pixelToLatLng(pos.pixelX,pos.pixelY,DEFAULT_MAP_SIZE),{
        icon: getIcon(marker.type === 'cave' ? 'cave' : 'token'),
        title: marker.title, keyboard:true
      });
      m.bindTooltip(marker.title,{direction:'top',offset:[0,-12]});
      m.on('click',()=>setSelectedMarker(marker));
      markersLayer.addLayer(m);
    };
    const caves = filteredMarkers.filter(m=>m.type==='cave'&&m.mapPosition);
    const tokens = filteredMarkers.filter(m=>m.type==='token'&&m.mapPosition);
    caves.forEach(addPoint);
    if(mapZoom>=0 || tokens.length<2){
      tokens.forEach(addPoint);
    }else{
      const cell = 72/Math.pow(2,mapZoom);
      const buckets = new Map<string,DD2MapMarker[]>();
      for(const item of tokens){
        const p=item.mapPosition!;
        const key=`${Math.floor(p.pixelX/cell)}:${Math.floor(p.pixelY/cell)}`;
        const b=buckets.get(key)??[];b.push(item);buckets.set(key,b);
      }
      for(const members of buckets.values()){
        if(members.length===1){addPoint(members[0]);continue;}
        const px=members.reduce((a,m)=>a+m.mapPosition!.pixelX,0)/members.length;
        const py=members.reduce((a,m)=>a+m.mapPosition!.pixelY,0)/members.length;
        const cluster=L.marker(pixelToLatLng(px,py,DEFAULT_MAP_SIZE),{
          icon:getIcon('cluster',members.length),
          title:`${members.length} mementos — aproximar para separar`,keyboard:true
        });
        cluster.bindTooltip(`${members.length} mementos — clique para aproximar`);
        cluster.on('click',()=>{
          map.flyTo(cluster.getLatLng(),Math.min(0,map.getMaxZoom()),{duration:0.35});
          setSelectedMarker(null);
        });
        markersLayer.addLayer(cluster);
      }
    }
  }, [filteredMarkers, mapReady, showExperimentalMarkers, mapZoom]);

  // Buscar deve levar a pessoa ao ponto: de nada adianta filtrar um pino fora da tela.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!mapReady || !map || !searchQuery.trim()) return;
    const points = filteredMarkers
      .filter(m => m.mapPosition)
      .map(m => pixelToLatLng(m.mapPosition!.pixelX,m.mapPosition!.pixelY,DEFAULT_MAP_SIZE));
    if (points.length === 1) {
      map.flyTo(points[0],Math.min(0.5,map.getMaxZoom()),{duration:0.25});
    } else if (points.length > 1 && points.length <= 12) {
      map.fitBounds(L.latLngBounds(points),{padding:[70,70],maxZoom:1,animate:true});
    }
  }, [mapReady,searchQuery,filteredMarkers]);

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
      {/* Barra responsiva: não deixa ações transbordarem no celular. */}
      <header className="dd2-map-header relative z-30 flex flex-wrap items-center justify-between gap-2 border-b border-[#55422f] bg-[#171510] px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <button type="button" onClick={onClose}
            className="flex min-h-10 shrink-0 items-center gap-1.5 rounded border border-[#6e5637] bg-[#2b261e] px-2.5 text-xs text-[#f6e3be] hover:bg-[#403526]">
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Voltar</span>
          </button>
          <Compass size={18} className="hidden shrink-0 text-[#e9b86a] sm:block" aria-hidden="true" />
          <div className="min-w-0">
            <h1 id="independent-map-title" className="font-serif text-sm font-semibold tracking-wide text-[#f7e3c1] sm:text-lg"><span className="sm:hidden">Mapa Interativo</span><span className="hidden sm:inline">Mapa Interativo Independente</span></h1>
            <p className="hidden text-[11px] text-[#bba785] md:block">Dragon's Dogma 2 · mapa original em mosaicos</p>
          </div>
        </div>

        <div className="relative mx-2 hidden min-w-[180px] max-w-xs flex-1 lg:block">
          <Search size={14} className="absolute left-2.5 top-3 text-[#b29d7f]" aria-hidden="true" />
          <input aria-label="Buscar no mapa" type="search" value={searchQuery} onChange={e => {
            setSearchQuery(e.target.value);
            if (e.target.value.trim()) setShowExperimentalMarkers(true);
          }}
            placeholder="Buscar missões, NPCs, locais..."
            className="h-10 w-full rounded border border-[#6b563e] bg-[#211d18] pl-8 pr-3 text-xs text-[#f4e9d7] placeholder-[#baa78a] focus:border-[#e2b76f] focus:outline-none" />
        </div>

        <div className="dd2-map-actions flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <div className="flex min-w-0 flex-1 items-center rounded border border-[#71583b] bg-[#252018] p-0.5 text-xs sm:flex-none">
            <button type="button" onClick={() => setBaseLayer('official')}
              aria-label={tileManifest ? `Mapa do jogo (${tileManifest.sourceWidth / 1024}K · tiles)` : 'Mapa do jogo (2K)'}
              aria-pressed={baseLayer === 'official'}
              className={`min-h-9 flex-1 rounded px-2.5 transition-colors sm:flex-none ${baseLayer === 'official' ? 'bg-[#e8b96a] font-bold text-[#201810]' : 'text-[#e5d2b0] hover:bg-[#3b3024]'}`}
              title="Arte original do jogo © CAPCOM">
              <span className="sm:hidden">Mapa {tileManifest ? tileManifest.sourceWidth / 1024 : 2}K</span>
              <span className="hidden sm:inline">{tileManifest ? `Mapa do jogo (${tileManifest.sourceWidth / 1024}K · tiles)` : 'Mapa do jogo (2K)'}</span>
            </button>
            <button type="button" onClick={() => setBaseLayer('schematic')} aria-pressed={baseLayer === 'schematic'}
              className={`min-h-9 rounded px-2.5 transition-colors ${baseLayer === 'schematic' ? 'bg-[#e8b96a] font-bold text-[#201810]' : 'text-[#e5d2b0] hover:bg-[#3b3024]'}`}>
              Esquema
            </button>
          </div>
          {tileManifest?.enhancedNativeZoom != null && (
            <button type="button"
              onClick={() => setMapSharpness(prev => prev === 'enhanced' ? 'original' : 'enhanced')}
              aria-label={mapSharpness === 'enhanced' ? 'Usar nitidez original' : 'Ativar nitidez aprimorada'}
              aria-pressed={mapSharpness === 'enhanced'}
              title="Aprimora bordas e estradas no zoom máximo; não aumenta a resolução. Alterne para comparar com a arte original."
              className={`flex min-h-10 items-center gap-1.5 rounded border px-2.5 text-xs font-semibold transition-colors ${mapSharpness === 'enhanced' ? 'border-[#d7aa65] bg-[#44331b] text-[#fce0af]' : 'border-[#71583b] bg-[#2b261e] text-[#cbb899] hover:bg-[#403526]'}`}>
              <Sparkles size={15} aria-hidden="true" />
              <span>Nitidez {mapSharpness === 'enhanced' ? '+' : 'original'}</span>
            </button>
          )}
          <button type="button" onClick={resetView} className="flex min-h-10 min-w-10 items-center justify-center rounded border border-[#71583b] bg-[#2b261e] text-[#ead1a3] hover:bg-[#403526]"
            title="Enquadrar pergaminho" aria-label="Ajustar aos limites">
            <RotateCcw size={17} />
          </button>
        </div>
      </header>

      <p role="note" className="dd2-map-notice relative z-20 border-b border-[#5b452e] bg-[#342a1f] px-3 py-1.5 text-[11px] leading-snug text-[#ead4af] sm:px-4">
        Mapa experimental · Arte © CAPCOM · 240 Mementos do Buscador e 37 entradas de cavernas; entradas aproximadas.
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

        {/* Marcadores exploratórios: opt-in para não esconder a cartografia real. */}
        <div className="dd2-map-filters absolute left-3 top-3 z-30 max-w-[calc(100%-1.5rem)]">
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" aria-label={showExperimentalMarkers ? 'Ocultar localizações' : 'Mostrar localizações'}
              aria-pressed={showExperimentalMarkers}
              onClick={() => setShowExperimentalMarkers(prev => !prev)}
              className={`flex min-h-10 items-center gap-2 rounded border px-3 text-xs font-semibold shadow-lg backdrop-blur-sm ${showExperimentalMarkers ? 'border-[#d3a15f] bg-[#ead2a6] text-[#241a11]' : 'border-[#70583a] bg-[#1c1a17ee] text-[#f5dfb7]'}`}>
              <MapPin size={16} aria-hidden="true" />
              {showExperimentalMarkers ? 'Ocultar localizações' : 'Mostrar localizações'}
            </button>
            <button type="button" aria-label="Alternar filtros" aria-expanded={filterPanelOpen}
              onClick={() => setFilterPanelOpen(prev => !prev)}
              className="flex min-h-10 items-center gap-1.5 rounded border border-[#70583a] bg-[#1c1a17ee] px-3 text-xs text-[#f5dfb7] shadow-lg backdrop-blur-sm">
              <Filter size={15} aria-hidden="true" /> Filtros
            </button>
          </div>
          {filterPanelOpen && (
            <section aria-label="Filtros de marcadores" className="mt-2 max-h-[45vh] w-[min(350px,calc(100vw-1.5rem))] overflow-y-auto rounded border border-[#78603f] bg-[#1b1916f5] p-3 shadow-2xl">
              <p className="mb-2 text-xs leading-relaxed text-[#d8c4a4]">240 mementos com coordenadas do jogo e 37 entradas de cavernas de guias cartográficos. Entradas ainda aproximadas.</p>
              <div className="relative mb-3 lg:hidden">
                <Search size={15} className="absolute left-2 top-3 text-[#bba686]" aria-hidden="true" />
                <input type="search" aria-label="Buscar no mapa" value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim()) setShowExperimentalMarkers(true);
                  }}
                  placeholder="Buscar missões, NPCs, locais..."
                  className="min-h-10 w-full rounded border border-[#665237] bg-[#29241c] pl-8 pr-2 text-xs text-[#f4e7cf] placeholder-[#b9a68b]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {(['cave','token'] as const).map(type => {
                  const cfg = CATEGORY_CONFIG[type];
                  const active = activeTypes.has(type);
                  return (
                    <button key={type} type="button" onClick={() => {
                      toggleCategory(type);
                      setShowExperimentalMarkers(true);
                    }}
                      aria-pressed={active}
                      className={`flex min-h-9 items-center gap-1.5 rounded border px-2 text-xs ${active ? 'border-[#b68b52] bg-[#403322] text-[#f5ddac]' : 'border-[#49423a] bg-[#23201d] text-[#938778]'}`}>
                      <span aria-hidden="true">{cfg.icon}</span>
                      <span>{cfg.label}</span>
                      <span className="rounded bg-[#171513] px-1 font-mono text-[#ead8b7]">{countsByType[type]}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}
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
                  {selectedMarker.type === 'token' ? 'COORDENADA DO JOGO' : 'ENTRADA REFERENCIADA'}
                </span>
              </div>
              <p className="break-words text-[10px] leading-relaxed text-[#aab8c5]">{selectedMarker.source}</p>
            </div>

            {selectedMarker.type === 'token' && (
              <p className="text-[11px] text-[#e4cb9f]">Alguns mementos estão dentro de cavernas ou em andares altos. O ponto é a posição em planta, não a entrada.</p>
            )}
            {selectedMarker.sourceUrl && (
              <a href={selectedMarker.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded border border-[#87653d] bg-[#292116] px-3 py-2 text-xs text-[#edc989] hover:bg-[#403221]">
                Conferir fonte da localização <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
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
        <footer className="dd2-map-status absolute bottom-3 left-3 z-10 max-w-[calc(100%-6rem)] rounded border border-[#675035] bg-[#171512ed] px-2.5 py-1.5 text-[11px] text-[#f1d6a6] shadow-lg backdrop-blur-sm select-none pointer-events-none">
          {tileManifest
            ? `Mapa ${tileManifest.sourceWidth / 1024}K · zoom nativo até ${tileManifest.maxNativeZoom} · ${mapSharpness === 'enhanced' ? 'nitidez aprimorada' : 'arte original'}`
            : 'Carregando imagem do jogo...'}
        </footer>
      </div>
    </dialog>
  );
};
