import { useState } from 'react';

const TaskList = ({ tasks, onDeleteTask, onToggleTask, onEditTask }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleSave = (taskId) => {
    onEditTask(taskId, editText);
    setEditingId(null);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          {editingId === task.id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <button onClick={() => handleSave(task.id)} className="save-button">
                Save
              </button>
              <button onClick={() => setEditingId(null)} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="checkmark"></span>
              </label>
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => onDeleteTask(task.id)} className="delete-button">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList; 