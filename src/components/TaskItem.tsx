import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Edit3, 
  Trash2, 
  Calendar, 
  AlertCircle,
  Clock,
  Save,
  X
} from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
}

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
  }) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

/**
 * TaskItem component for displaying individual tasks
 * Supports inline editing and provides all task management actions
 */
export function TaskItem({ task, onUpdate, onDelete, onToggle }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    dueDate: task.dueDate || '',
  });

  /**
   * Handles starting the edit mode
   */
  const handleStartEdit = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate || '',
    });
    setIsEditing(true);
  };

  /**
   * Handles canceling the edit mode
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      dueDate: task.dueDate || '',
    });
  };

  /**
   * Handles saving the edited task
   */
  const handleSaveEdit = async () => {
    if (!editData.title.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    try {
      await onUpdate(task._id, {
        title: editData.title.trim(),
        description: editData.description.trim() || undefined,
        priority: editData.priority,
        dueDate: editData.dueDate || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  /**
   * Handles deleting the task with confirmation
   */
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  /**
   * Gets the priority color and icon
   */
  const getPriorityStyle = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertCircle };
      case 'medium':
        return { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: Clock };
      case 'low':
        return { color: 'text-green-600', bg: 'bg-green-100', icon: Circle };
    }
  };

  /**
   * Formats the due date for display
   */
  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`, color: 'text-red-600' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-orange-600' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-yellow-600' };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'text-gray-600' };
    }
  };

  const priorityStyle = getPriorityStyle(task.priority);
  const PriorityIcon = priorityStyle.icon;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start space-x-3">
        {/* Completion Toggle */}
        <button
          onClick={() => onToggle(task._id)}
          className="mt-1 text-gray-400 hover:text-green-600 transition-colors"
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task title..."
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={2}
                placeholder="Task description..."
              />
              <div className="flex space-x-2">
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={editData.dueDate}
                  onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="inline-flex items-center px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-2 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div>
              <h3 className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
              
              {/* Task Metadata */}
              <div className="flex items-center space-x-4 mt-2">
                {/* Priority */}
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityStyle.bg} ${priorityStyle.color}`}>
                  <PriorityIcon className="h-3 w-3 mr-1" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </div>
                
                {/* Due Date */}
                {task.dueDate && (
                  <div className={`inline-flex items-center text-xs ${formatDueDate(task.dueDate).color}`}>
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDueDate(task.dueDate).text}
                  </div>
                )}
                
                {/* Created Date */}
                <div className="text-xs text-gray-500">
                  Created {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex space-x-1">
            <button
              onClick={handleStartEdit}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit task"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete task"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}