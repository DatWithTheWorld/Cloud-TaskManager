import React from 'react';
import { TaskManager } from './components/TaskManager';
import './index.css';

/**
 * Main App component that provides the application layout
 * Currently using mock data - replace with Convex integration for production
 */
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Organize your tasks efficiently with our modern task management app
          </p>
        </header>
        <TaskManager />
      </div>
    </div>
  );
}

export default App;