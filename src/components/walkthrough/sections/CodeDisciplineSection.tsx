import React from 'react';

export const CodeDisciplineSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Strict adherence to code quality principles that eliminate unnecessary complexity and leverage semantic HTML for better performance and maintainability.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Component Size Discipline</h3>
        
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">200-Line Component Limit</h4>
            <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
              <li>• Every component kept under 200 lines for readability</li>
              <li>• Automatic refactoring when approaching limit</li>
              <li>• Single responsibility principle enforced</li>
              <li>• Easier testing, debugging, and code reviews</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Semantic HTML Over Divs</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
              <li>• Native <code>&lt;details&gt;</code> and <code>&lt;summary&gt;</code> for accordions</li>
              <li>• Proper <code>&lt;form&gt;</code> elements with <code>role="search"</code></li>
              <li>• <code>&lt;button&gt;</code> elements instead of clickable divs</li>
              <li>• <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;header&gt;</code> landmarks</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">State Management Discipline</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Minimal State:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Only store what can't be derived or computed</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Native Behavior:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Leverage browser features instead of custom JavaScript</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">No Wrapper Divs:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Avoid unnecessary DOM nesting and wrapper elements</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">Performance Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Runtime Performance</h4>
            <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
              <li>• Smaller bundle sizes from minimal components</li>
              <li>• Faster rendering with semantic HTML</li>
              <li>• Reduced JavaScript execution overhead</li>
              <li>• Better browser optimization opportunities</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Developer Experience</h4>
            <ul className="space-y-1 text-yellow-700 dark:text-yellow-300">
              <li>• Faster hot reloads during development</li>
              <li>• Easier debugging with smaller components</li>
              <li>• Reduced cognitive load when reading code</li>
              <li>• More reliable behavior from native features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};