import type { FilterType } from '../types.ts';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const TodoFilters = ({
  currentFilter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center border border-zinc-300 bg-zinc-100 p-0.5">
        <button
          type="button"
          onClick={() => onFilterChange('all')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium cursor-pointer whitespace-nowrap ${
            currentFilter === 'all'
              ? 'bg-white text-zinc-900 font-semibold'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Все
          <span className="ml-1 text-[11px] font-mono tabular-nums text-zinc-500">
            {totalCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('active')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium cursor-pointer whitespace-nowrap ${
            currentFilter === 'active'
              ? 'bg-white text-zinc-900 font-semibold'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Активные
          <span className="ml-1 text-[11px] font-mono tabular-nums text-zinc-500">
            {activeCount}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('completed')}
          className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-medium cursor-pointer whitespace-nowrap ${
            currentFilter === 'completed'
              ? 'bg-white text-zinc-900 font-semibold'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          Выполненные
          <span className="ml-1 text-[11px] font-mono tabular-nums text-zinc-500">
            {completedCount}
          </span>
        </button>
      </div>

      {completedCount > 0 && (
        <button
          type="button"
          onClick={onClearCompleted}
          className="text-xs font-medium text-zinc-500 hover:text-red-600 cursor-pointer text-right px-1 py-1"
        >
          Удалить выполненные · {completedCount}
        </button>
      )}
    </div>
  );
};
