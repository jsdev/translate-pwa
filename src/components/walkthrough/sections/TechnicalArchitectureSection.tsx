import { Cpu, Zap, Database, Code } from 'lucide-react';

export const TechnicalArchitectureSection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <Cpu className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Performance-driven architecture for mission-critical reliability
        </p>
      </div>

      <div className="grid gap-4">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Vite + React 18</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Lightning-fast development and build times. Hot module replacement for rapid iteration while maintaining production performance.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Zustand State Management</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Minimal boilerplate, maximum performance. Local storage persistence ensures conversation history survives app restarts.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">TypeScript Strict Mode</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Comprehensive type safety eliminates entire classes of runtime errors. Essential for applications where failure isn't an option.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Architecture Principles</h4>
        <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
          <li>• Offline-first with service worker caching</li>
          <li>• Progressive Web App for native-like experience</li>
          <li>• Lazy loading for optimal performance</li>
          <li>• Tree-shaking for minimal bundle size</li>
        </ul>
      </div>
    </div>
  );
};
