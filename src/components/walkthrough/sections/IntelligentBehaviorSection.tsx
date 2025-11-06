import React from 'react';

export const IntelligentBehaviorSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        The interface learns from user actions and proactively adapts to support their workflow.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Predictive Interface Behavior</h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-900 dark:text-green-100">Auto-Scroll on Search</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              When users type in search, the interface automatically scrolls to results and opens the relevant section. 
              No manual navigation required.
            </p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Context-Aware Placeholders</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Search placeholders adapt to the current page: "Search intake follow up questions" vs 
              "Search phrases across categories" vs "Search conversations and translations".
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100">Progressive Disclosure</h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
              Information is revealed progressively: first category opens by default, search results show counts, 
              conditional fields appear based on previous answers.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Real-World Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Field Efficiency</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Reduces time to find information</li>
              <li>• Minimizes training requirements</li>
              <li>• Prevents user errors</li>
              <li>• Supports high-stress situations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">User Experience</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Feels intuitive and responsive</li>
              <li>• Reduces cognitive load</li>
              <li>• Builds user confidence</li>
              <li>• Encourages proper usage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};