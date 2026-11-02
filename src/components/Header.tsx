import { CheckSquare } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  completedCount: number;
  progressPercent: number;
}

export const Header = ({
  totalCount,
  completedCount,
  progressPercent,
}: HeaderProps) => {
  return (
    <header className="mb-6 pb-5 border-b border-zinc-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-zinc-900 text-white flex items-center justify-center">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Список задач
            </h1>
            <p className="text-xs text-zinc-500">
              Локальное хранение данных
            </p>
          </div>
        </div>

        {totalCount > 0 && (
          <div className="text-right text-xs text-zinc-600">
            <span className="font-semibold text-zinc-900 font-mono tabular-nums">
              {completedCount} из {totalCount}
            </span>{' '}
            выполнено · {progressPercent}%
          </div>
        )}
      </div>

      {totalCount > 0 && (
        <div className="mt-4 w-full bg-zinc-200 h-1 overflow-hidden">
          <div
            className="bg-zinc-900 h-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
};
