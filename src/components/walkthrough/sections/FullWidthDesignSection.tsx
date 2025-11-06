import React from 'react';

export const FullWidthDesignSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Strategic full-width design pattern that maximizes mobile screen real estate while maintaining visual hierarchy.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Design Philosophy</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Mobile-First Approach</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
              <li>• Full-width sections eliminate wasted horizontal space</li>
              <li>• Border-bottom separators instead of rounded cards</li>
              <li>• Clean, native app-like visual hierarchy</li>
              <li>• Optimized for thumb navigation and touch targets</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Visual Consistency</h4>
            <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
              <li>• Consistent pattern across intake and phrases pages</li>
              <li>• Unified spacing and typography system</li>
              <li>• Seamless dark/light theme transitions</li>
              <li>• Professional, government-appropriate aesthetics</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Implementation Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Accordion Sections:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Native HTML details/summary elements with custom styling</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Smart Borders:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Border-bottom on all sections except last for clean separation</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Responsive Padding:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Consistent 16px padding that scales appropriately</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};