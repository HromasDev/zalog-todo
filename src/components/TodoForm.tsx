import { useState, useRef, useId } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';

interface TodoFormProps {
  onAddTask: (text: string) => boolean;
}

export const TodoForm = ({ onAddTask }: TodoFormProps) => {
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleAdd = () => {
    const trimmed = inputText.trim();

    if (!trimmed) {
      setInputError('Задача не может быть пустой');
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    const success = onAddTask(trimmed);
    if (success) {
      setInputText('');
      setInputError(null);
    }
  };

  const handleClear = () => {
    setInputText('');
    setInputError(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-white border border-zinc-300 p-4 mb-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        className="flex flex-col gap-2"
      >
        <label htmlFor={inputId} className="text-xs font-semibold text-zinc-700 uppercase tracking-wide">
          Новая задача
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (inputError) setInputError(null);
              }}
              placeholder="Введите текст задачи..."
              className={`w-full px-3 py-2 text-sm border bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none ${
                inputError
                  ? 'border-red-600 focus:border-red-600'
                  : 'border-zinc-300 focus:border-zinc-900'
              }`}
            />
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
                title="Очистить"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-white text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Добавить</span>
          </button>
        </div>

        {inputError && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{inputError}</span>
          </div>
        )}
      </form>
    </div>
  );
};
