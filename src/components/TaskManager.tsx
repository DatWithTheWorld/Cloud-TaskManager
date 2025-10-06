import React, { useState } from 'react';
import { AddTaskForm } from './AddTaskForm';
import { TaskList } from './TaskList';
import { FilterBar } from './FilterBar';

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

// Mock data for demonstration - replace with actual Convex integration
const mockTasks = [
  {
    _id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the task management app',
    completed: false,
    priority: 'high' as const,
    dueDate: '2024-01-15',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    userId: 'user-123',
  },
  {
    _id: '2',
    title: 'Review code changes',
    description: 'Review all recent code changes and provide feedback',
    completed: true,
    priority: 'medium' as const,
    dueDate: '2024-01-10',
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 86400000,
    userId: 'user-123',
  },
  {
    _id: '3',
    title: 'Update dependencies',
    description: 'Update all project dependencies to latest versions',
    completed: false,
    priority: 'low' as const,
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000,
    userId: 'user-123',
  },
];

/**
 * Main TaskManager component that orchestrates the entire task management interface
 * Handles state management for filters and provides the main layout
 */
export function TaskManager() {
  // State for filtering tasks
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  /**
   * Handles creating a new task
   * @param taskData - The task data from the form
   */
  const handleCreateTask = async (taskData: {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
  }) => {
    const newTask = {
      _id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: 'user-123',
    };
    setTasks(prev => [newTask, ...prev]);
  };

  /**
   * Handles updating an existing task
   * @param id - The task ID
   * @param updates - The fields to update
   */
  const handleUpdateTask = async (id: string, updates: {
    title?: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
  }) => {
    setTasks(prev => prev.map(task => 
      task._id === id 
        ? { ...task, ...updates, updatedAt: Date.now() }
        : task
    ));
  };

  /**
   * Handles deleting a task
   * @param id - The task ID to delete
   */
  const handleDeleteTask = async (id: string) => {
    setTasks(prev => prev.filter(task => task._id !== id));
  };

  /**
   * Handles toggling task completion status
   * @param id - The task ID to toggle
   */
  const handleToggleTask = async (id: string) => {
    setTasks(prev => prev.map(task => 
      task._id === id 
        ? { ...task, completed: !task.completed, updatedAt: Date.now() }
        : task
    ));
  };

  // Filter tasks based on current filter settings
  const filteredTasks = tasks.filter(task => {
    // Filter by completion status
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'pending' && task.completed) return false;
    
    // Filter by priority
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    
    return true;
  });

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
          <div className="text-gray-600">Total Tasks</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{pendingTasks}</div>
          <div className="text-gray-600">Pending</div>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
        <AddTaskForm onSubmit={handleCreateTask} />
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <FilterBar
          filter={filter}
          priorityFilter={priorityFilter}
          onFilterChange={setFilter}
          onPriorityFilterChange={setPriorityFilter}
        />
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tasks ({filteredTasks.length})
          </h2>
          <TaskList
            tasks={filteredTasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        </div>
      </div>
    </div>
  );
}