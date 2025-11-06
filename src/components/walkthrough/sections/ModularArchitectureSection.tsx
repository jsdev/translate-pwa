import React from 'react';

export const ModularArchitectureSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Clean, maintainable code architecture with proper separation of concerns and component modularity.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Component Organization Strategy</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Feature-Based Modularity</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Each major feature (intake, phrases, recording) organized into dedicated folders with 
              index files and component separation for easier maintenance and testing.
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100">Reusable Components</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Shared components like SearchBar, TipsPanel, and SpeakerSelector designed for 
              reuse across multiple pages while maintaining consistent behavior.
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">State Management</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Zustand stores organized by domain (app settings, conversations, intake, translations) 
              with persistence for critical data and settings.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">File Organization Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Development Efficiency</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Easy to locate and modify specific features</li>
              <li>• Clear separation prevents code conflicts</li>
              <li>• Simplified testing and debugging</li>
              <li>• Faster onboarding for new developers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Maintainability</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Components under 200 lines each</li>
              <li>• Single responsibility principle</li>
              <li>• Proper import/export relationships</li>
              <li>• No global state dependencies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};