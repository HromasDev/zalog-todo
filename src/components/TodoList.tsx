import type { TodoTask, FilterType } from '../types.ts';
import  { TodoItem } from './TodoItem.tsx';

interface TodoListProps {
  tasks: TodoTask[];
  filter: FilterType;
  completedCount: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoList = ({
  tasks,
  filter,
  completedCount,
  onToggle,
  onDelete,
  onEdit,
}: TodoListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white border border-zinc-300 p-8 text-center">
        <p className="text-sm font-semibold text-zinc-700">
          {filter === 'active' && completedCount > 0
            ? 'Все активные задачи выполнены'
            : filter === 'completed'
            ? 'Нет выполненных задач'
            : 'Список задач пуст'}
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          {filter === 'active' && completedCount > 0
            ? 'Все текущие дела завершены.'
            : filter === 'completed'
            ? 'Завершите задачу из списка, чтобы она появилась в этом фильтре.'
            : 'Добавьте задачу через поле ввода выше.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
