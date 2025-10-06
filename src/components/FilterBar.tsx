import React from 'react';
import { Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface FilterBarProps {
  filter: 'all' | 'completed' | 'pending';
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  onFilterChange: (filter: 'all' | 'completed' | 'pending') => void;
  onPriorityFilterChange: (priority: 'all' | 'low' | 'medium' | 'high') => void;
}

/**
 * FilterBar component for filtering tasks by status and priority
 * Provides intuitive filter controls with icons and clear labels
 */
export function FilterBar({ 
  filter, 
  priorityFilter, 
  onFilterChange, 
  onPriorityFilterChange 
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Filter Label */}
      <div className="flex items-center text-gray-700 font-medium">
        <Filter className="h-4 w-4 mr-2" />
        Filter Tasks:
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          All Tasks
        </button>
        
        <button
          onClick={() => onFilterChange('pending')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-orange-100 text-orange-800 border border-orange-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </button>
        
        <button
          onClick={() => onFilterChange('completed')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </button>
      </div>

      {/* Priority Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onPriorityFilterChange('all')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            priorityFilter === 'all'
              ? 'bg-purple-100 text-purple-800 border border-purple-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          All Priorities
        </button>
        
        <button
          onClick={() => onPriorityFilterChange('high')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            priorityFilter === 'high'
              ? 'bg-red-100 text-red-800 border border-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          <AlertCircle className="h-3 w-3 mr-1" />
          High
        </button>
        
        <button
          onClick={() => onPriorityFilterChange('medium')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            priorityFilter === 'medium'
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          Medium
        </button>
        
        <button
          onClick={() => onPriorityFilterChange('low')}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            priorityFilter === 'low'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
          }`}
        >
          Low
        </button>
      </div>
    </div>
  );
}


