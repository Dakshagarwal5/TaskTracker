import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    updateStats();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get('/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const pending = tasks.filter(task => task.status === 'Pending').length;
    setStats({ total, completed, pending });
  };

  const deleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      const response = await API.put(`/tasks/${task._id}`, { ...task, status: newStatus });
      setTasks(tasks.map(t => t._id === task._id ? response.data : t));
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.status === 'Completed');
      case 'pending':
        return tasks.filter(task => task.status === 'Pending');
      default:
        return tasks;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day(s)`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} day(s)`;
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`;
  };

  const getTaskClass = (task) => {
    let classes = [];
    if (task.status === 'Completed') classes.push('completed');
    classes.push(`${task.priority.toLowerCase()}-priority`);
    return classes.join(' ');
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Tasks</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Stats Cards */}
      <div className="task-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
          </div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks ({stats.total})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>

      {/* Tasks Grid */}
      {getFilteredTasks().length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>
            {filter === 'all' 
              ? "You don't have any tasks yet. Create your first task to get started!"
              : `No ${filter} tasks found. Try changing the filter or create a new task.`
            }
          </p>
          <Link to="/create" className="btn btn-primary">
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div>
          <div className="tasks-grid">
            {getFilteredTasks().map(task => (
              <div key={task._id} className={`task-card ${getTaskClass(task)}`}>
                <div className="task-header">
                  <div>
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <span className={`task-status status-${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </div>

                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}

                <div className="task-meta">
                  <span className={`task-due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                    📅 {formatDate(task.dueDate)}
                  </span>
                  <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="task-actions">
                  <button
                    className="btn-small btn-toggle"
                    onClick={() => toggleTaskStatus(task)}
                  >
                    {task.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}
                  </button>
                  <Link to={`/edit/${task._id}`} className="btn-small btn-edit">
                    Edit
                  </Link>
                  <button
                    className="btn-small btn-delete"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add New Task Button - appears when tasks exist */}
          <div className="add-task-section">
            <Link to="/create" className="btn btn-primary add-task-btn">
              + Add New Task
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
