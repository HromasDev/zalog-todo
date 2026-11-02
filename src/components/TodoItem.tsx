import { useState, useRef, useEffect } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import type { TodoTask } from '../types.ts';

interface TodoItemProps {
  task: TodoTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditingText(task.text);
  };

  const handleSave = () => {
    const trimmed = editingText.trim();
    if (!trimmed) {
      setIsEditing(false);
      return;
    }
    onEdit(task.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingText(task.text);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`flex items-start justify-between gap-3 p-3 border ${
        task.completed
          ? 'bg-zinc-100/60 border-zinc-200 text-zinc-400'
          : 'bg-white border-zinc-300 text-zinc-900'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
        className={`mt-0.5 w-4 h-4 flex items-center justify-center cursor-pointer shrink-0 ${
          task.completed
            ? 'bg-zinc-800 border border-zinc-800 text-white'
            : 'border border-zinc-400 hover:border-zinc-700 bg-white text-transparent'
        }`}
      >
        {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-1.5">
            <input
              ref={editInputRef}
              type="text"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              onBlur={handleSave}
              className="w-full px-2 py-1 text-sm bg-white border border-zinc-900 focus:outline-none text-zinc-900"
            />
            <button
              type="button"
              onClick={handleSave}
              className="p-1 text-zinc-800 hover:bg-zinc-200 cursor-pointer"
              title="Сохранить"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 text-zinc-500 hover:bg-zinc-200 cursor-pointer"
              title="Отмена"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div>
            <p
              onClick={() => onToggle(task.id)}
              className={`text-sm leading-tight break-words cursor-pointer select-none ${
                task.completed
                  ? 'line-through text-zinc-400'
                  : 'text-zinc-900'
              }`}
            >
              {task.text}
            </p>
            <div className="text-[11px] text-zinc-400 mt-1 flex items-center gap-1.5 font-mono tabular-nums">
              <span>{formatDate(task.createdAt)}</span>
              {task.completed && (
                <>
                  <span>·</span>
                  <span className="text-zinc-600 font-sans">Выполнено</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleStartEditing}
            aria-label="Редактировать задачу"
            title="Редактировать"
            className="p-1 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label="Удалить задачу"
            title="Удалить"
            className="p-1 text-zinc-400 hover:text-red-700 hover:bg-zinc-100 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
