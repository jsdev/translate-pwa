import React from 'react';

export const AccessibilitySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Built to support all capable agents regardless of abilities, ensuring no one is excluded from critical communication tools.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Comprehensive Accessibility Strategy</h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Semantic HTML Foundation</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
              <li>• Search forms use proper <code>role="search"</code> landmarks</li>
              <li>• All regions properly labeled for screen readers</li>
              <li>• Native <code>details/summary</code> elements for keyboard navigation</li>
              <li>• Form labels properly associated with inputs</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Multi-Modal Communication</h4>
            <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
              <li>• Visual text display with high contrast ratios</li>
              <li>• Audio playback for all content</li>
              <li>• Speaker identification with visual and auditory cues</li>
              <li>• Large touch targets for motor accessibility</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Keyboard & Focus Management</h4>
            <ul className="space-y-1 text-purple-800 dark:text-purple-200 text-sm">
              <li>• Full keyboard navigation support</li>
              <li>• Visible focus indicators throughout</li>
              <li>• Logical tab order and focus flow</li>
              <li>• Escape key support for dismissible elements</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Real-World Considerations</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          Field agents may have varying abilities, work in challenging lighting conditions, or need to operate 
          the app while wearing gloves or in noisy environments. Our accessibility features ensure the tool 
          remains effective regardless of these constraints.
        </p>
      </div>
    </div>
  );
};