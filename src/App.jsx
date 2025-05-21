import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'

function App() {
  // Initialize from localStorage
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle body class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (taskId, newText) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button
          className="dark-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
      <h1>Todo App</h1>
      <TaskForm onAddTask={addTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
        onEditTask={editTask}
      />
    </div>
  )
}

export default App
