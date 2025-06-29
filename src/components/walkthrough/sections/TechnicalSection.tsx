import React from 'react';

export const TechnicalSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Built with modern web standards, progressive enhancement, and performance optimization for field conditions.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Architecture</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-gray-400 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Progressive Web App (PWA)</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Installable on mobile devices, works offline, and provides native app-like experience 
              without app store dependencies.
            </p>
          </div>
          
          <div className="border-l-4 border-gray-400 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Modern Build System</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Vite 7.0 with standard React plugin for better stability. 
              Optimized chunk splitting for maximum caching efficiency.
            </p>
          </div>
          
          <div className="border-l-4 border-gray-400 pl-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">Local-First Data</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Conversation history and settings stored locally for privacy and offline access. 
              No external dependencies for maximum security.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Performance Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Optimization</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Aggressive chunk splitting</li>
              <li>• Console.log removal in production</li>
              <li>• Modern ES2020 targeting</li>
              <li>• Pre-bundled dependencies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Accessibility</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• WCAG 2.1 AA compliance</li>
              <li>• Screen reader support</li>
              <li>• Keyboard navigation</li>
              <li>• High contrast themes</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quality Assurance</h3>
        <div className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Best Practices</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">SEO</div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
            Perfect Lighthouse scores through thoughtful engineering
          </p>
        </div>
      </div>
    </div>
  );
};