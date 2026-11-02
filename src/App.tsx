import { useTodos } from './hooks/useTodos.ts';
import { Header } from './components/Header.tsx';
import { TodoForm } from './components/TodoForm.tsx';
import { TodoFilters } from './components/TodoFilters.tsx';
import { TodoList } from './components/TodoList.tsx';
import { Footer } from './components/Footer.tsx';

const App = () => {
  const {
    filteredTasks,
    filter,
    setFilter,
    totalCount,
    activeCount,
    completedCount,
    progressPercent,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
  } = useTodos();

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <main className="max-w-2xl mx-auto w-full">
        <Header
          totalCount={totalCount}
          completedCount={completedCount}
          progressPercent={progressPercent}
        />

        <TodoForm onAddTask={addTask} />

        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          tasks={filteredTasks}
          filter={filter}
          completedCount={completedCount}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>

      <Footer />
    </div>
  );
};

export default App;
