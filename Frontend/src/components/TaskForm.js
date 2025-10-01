import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    dueDate: '', 
    priority: 'Medium',
    status: 'Pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/tasks/${id}`);
      const task = response.data;
      setForm({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        priority: task.priority || 'Medium',
        status: task.status || 'Pending'
      });
    } catch (err) {
      setError('Failed to load task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const taskData = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim()
      };

      if (isEditing) {
        await API.put(`/tasks/${id}`, taskData);
        setSuccess('Task updated successfully!');
      } else {
        await API.post('/tasks', taskData);
        setSuccess('Task created successfully!');
      }

      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      setError(isEditing ? 'Failed to update task' : 'Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading && isEditing) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading task...
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1 className="form-title">
        {isEditing ? 'Edit Task' : 'Create New Task'}
      </h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter task title..."
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-input form-textarea"
            placeholder="Enter task description (optional)..."
            rows={4}
            maxLength={500}
          />
          <small className="char-count">
            {form.description.length}/500 characters
          </small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="form-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>
          </div>
        </div>

        {isEditing && (
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !form.title.trim()}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Task' : 'Create Task'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
