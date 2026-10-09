import React from 'react';
import { Search, X, AlertTriangle, Clock, CheckCircle2, Circle, Sparkles, SlidersHorizontal } from 'lucide-react';

export type FilterType = 'all' | 'missable' | 'timed' | 'undone' | 'done' | 'base' | 'dlc';

interface FilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalFilteredEvents: number;
  totalFilteredAchievements: number;
  totalEvents: number;
  totalAchievements: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalFilteredEvents,
  totalFilteredAchievements,
  totalEvents,
  totalAchievements
}) => {
  const isFiltered = searchQuery.trim().length > 0 || activeFilter !== 'all';

  return (
    <div className="sticky top-[57px] z-30 bg-[#0d0f11]/95 backdrop-blur-md border-b border-[#403e38] py-3 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e887d]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Buscar no roteiro e nas conquistas"
            placeholder="Buscar por missão, conquista, NPC, local ou item..."
            className="w-full bg-[#181b1e] border border-[#52493b] rounded-md pl-10 pr-9 py-2 text-xs text-[#e9e2d7] placeholder-[#8e887d] focus:outline-none focus:border-[#d9b780] focus:ring-1 focus:ring-[#d9b780]/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e887d] hover:text-[#e9e2d7]"
              title="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#d9b780] text-[#111315] font-semibold shadow-sm'
                : 'bg-[#1a1c1f] text-[#cfc8bd] hover:bg-[#25282d] border border-[#3d372e]'
            }`}
          >
            Tudo
          </button>

          <button
            onClick={() => onFilterChange('missable')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
              activeFilter === 'missable'
                ? 'bg-[#df8c75] text-[#161210] font-semibold shadow-sm'
                : 'bg-[#1a1c1f] text-[#df8c75] hover:bg-[#2b1f1c] border border-[#5a342c]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cautelas / Riscos</span>
          </button>

          <button
            onClick={() => onFilterChange('timed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
              activeFilter === 'timed'
                ? 'bg-[#e2bc76] text-[#16130e] font-semibold shadow-sm'
                : 'bg-[#1a1c1f] text-[#ecd2ac] hover:bg-[#2c261e] border border-[#5d4d36]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Alertas do roteiro</span>
          </button>

          <button
            onClick={() => onFilterChange('undone')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
              activeFilter === 'undone'
                ? 'bg-[#8e887d] text-[#111315] font-semibold'
                : 'bg-[#1a1c1f] text-[#aea79b] hover:bg-[#25282d] border border-[#3d372e]'
            }`}
          >
            <Circle className="w-3 h-3" />
            <span>Pendentes</span>
          </button>

          <button
            onClick={() => onFilterChange('done')}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
              activeFilter === 'done'
                ? 'bg-[#9bc4a5] text-[#101612] font-semibold'
                : 'bg-[#1a1c1f] text-[#9bc4a5] hover:bg-[#1e2821] border border-[#38483c]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Concluídas</span>
          </button>

          <button
            onClick={() => onFilterChange('dlc')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 ${
              activeFilter === 'dlc'
                ? 'bg-[#79a6d2] text-[#0d151e] font-semibold shadow-sm'
                : 'bg-[#1a1c1f] text-[#a4c7e8] hover:bg-[#1a232f] border border-[#394a5e]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>DLC Dark Arisen (6)</span>
          </button>

          {isFiltered && (
            <button
              onClick={() => {
                onSearchChange('');
                onFilterChange('all');
              }}
              className="text-[11px] text-[#aea79b] hover:text-[#e9e2d7] px-2 underline whitespace-nowrap"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Filter Feedback Status Line */}
      {isFiltered && (
        <div className="max-w-7xl mx-auto mt-2 text-[11px] text-[#aea79b] flex items-center justify-between border-t border-[#313338] pt-1.5">
          <span>
            Exibindo <b className="text-[#f0d1a0]">{totalFilteredEvents}</b> etapas e{' '}
            <b className="text-[#f0d1a0]">{totalFilteredAchievements}</b> conquistas compatíveis.
          </span>
          <span className="text-[#8e887d]">
            Total no banco: {totalEvents} etapas · {totalAchievements} conquistas
          </span>
        </div>
      )}
    </div>
  );
};
