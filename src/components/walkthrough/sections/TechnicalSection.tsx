import React from 'react';

export const TechnicalSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Built with modern web standards, progressive enhancement, and performance optimization for field conditions.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Architecture Decisions</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Progressive Web App (PWA)</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Installable on mobile devices, works offline, and provides native app-like experience 
              without app store dependencies.
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100">Mobile-First Design</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Optimized for field use with no horizontal scrolling, large touch targets, 
              and decluttered interface that works in challenging conditions.
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">Local-First Data</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Conversation history and settings stored locally for privacy and offline access, 
              with optional cloud sync for audit purposes.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Performance Optimizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Runtime Performance</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Lazy loading of non-critical features</li>
              <li>• Efficient state management with Zustand</li>
              <li>• Optimized re-renders with React hooks</li>
              <li>• Smooth animations with CSS transitions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Network Efficiency</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Minimal external dependencies</li>
              <li>• Local speech synthesis and recognition</li>
              <li>• Cached static assets</li>
              <li>• Offline-capable core functionality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};