import React from 'react';

export const ConsistencySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Consistent, transparent communication using methods proven to facilitate better cooperation ensures every agent delivers professional, standardized interactions.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">The Consistency Challenge</h3>
        
        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Problems with Ad-Hoc Communication</h4>
            <ul className="space-y-1 text-red-800 dark:text-red-200 text-sm">
              <li>• Inconsistent information gathering across agents</li>
              <li>• Potential for miscommunication or missed details</li>
              <li>• Varying levels of language proficiency</li>
              <li>• Legal and procedural compliance concerns</li>
              <li>• Training burden for new agents</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Standardized Solution Benefits</h4>
            <ul className="space-y-1 text-green-800 dark:text-green-200 text-sm">
              <li>• Every agent asks the same essential questions</li>
              <li>• Consistent follow-up based on responses</li>
              <li>• Professional, respectful tone maintained</li>
              <li>• Complete documentation for legal compliance</li>
              <li>• Reduced training time for new agents</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Implementation Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Intake Standardization</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Required questions with audio prompts</li>
              <li>• Conditional follow-ups based on responses</li>
              <li>• Visual completion indicators</li>
              <li>• Automatic conversation logging</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Phrase Organization</h4>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>• Categorized by communication purpose</li>
              <li>• Instant audio playback available</li>
              <li>• Searchable across all categories</li>
              <li>• Expandable for new scenarios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};