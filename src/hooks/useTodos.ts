import { useState } from 'react';
import type { TodoTask, FilterType } from '../types.ts';
import { useLocalStorage } from './useLocalStorage.ts';

const LOCAL_STORAGE_KEY = 'todo_tasks_list_v1';

const INITIAL_TASKS: TodoTask[] = [
  {
    id: '1',
    text: 'Изучить документацию React и TypeScript',
    completed: true,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: '2',
    text: 'Создать список задач с сохранением в localStorage',
    completed: false,
    createdAt: Date.now() - 3600000 * 1,
  },
  {
    id: '3',
    text: 'Проверить фильтрацию и валидацию пустых строк',
    completed: false,
    createdAt: Date.now(),
  },
];

export const useTodos = () => {
  const [tasks, setTasks] = useLocalStorage<TodoTask[]>(LOCAL_STORAGE_KEY, INITIAL_TASKS);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (text: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed) return false;

    const newTask: TodoTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    return true;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    totalCount,
    completedCount,
    activeCount,
    progressPercent,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
  };
};
