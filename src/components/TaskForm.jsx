import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!taskText.trim()) {
      setError('Task cannot be empty');
      return;
    }

    onAddTask({
      id: Date.now(),
      text: taskText.trim(),
      priority,
      completed: false,
      createdAt: new Date()
    });

    // Reset form
    setTaskText('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className={`task-input ${error ? 'error' : ''}`}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      
      <div className="form-group">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button type="submit" className="add-button">
        Add Task
      </button>
      </div>
    </form>
  );
};

export default TaskForm; 