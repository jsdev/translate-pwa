import React from 'react';

export const SmartSectionsSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        We implemented dynamic section management that adapts to user intent, reducing cognitive load and improving focus.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">The Problem We Solved</h3>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Before: Overwhelming Interface</h4>
            <ul className="space-y-1 text-red-800 dark:text-red-200 text-sm">
              <li>• Users saw both intake form AND search results simultaneously</li>
              <li>• Cognitive overload during high-stress situations</li>
              <li>• Unclear which section to focus on</li>
              <li>• Search results buried below form fields</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">After: Intelligent Adaptation</h4>
            <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
              <li>• Search automatically closes form, opens results</li>
              <li>• Clear search shows form, hides results</li>
              <li>• Users focus on one task at a time</li>
              <li>• Smooth transitions guide attention</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Full-Width Design Pattern</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Mobile-Optimized Layout:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Full-width sections maximize screen real estate on mobile devices</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Clean Separation:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Border-bottom dividers create clear visual hierarchy without rounded corners</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Native App Feel:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Hidden scrollbars when not actively scrolling maintain clean aesthetics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Implementation Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Search Active State</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Closes intake form section</li>
              <li>• Opens additional phrases section</li>
              <li>• Scrolls to results automatically</li>
              <li>• Shows result count in header</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Search Cleared State</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Opens intake form section</li>
              <li>• Closes additional phrases section</li>
              <li>• Returns to default workflow</li>
              <li>• Maintains user context</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};