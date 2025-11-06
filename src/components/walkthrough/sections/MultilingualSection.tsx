import React from 'react';

export const MultilingualSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        While Spanish is the primary focus, the architecture supports multiple languages for diverse detention scenarios.
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Diverse Operational Scenarios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Southern Border Diversity</h4>
            <ul className="space-y-1 text-orange-800 dark:text-orange-200 text-sm">
              <li>• Non-Spanish speakers crossing borders</li>
              <li>• Indigenous languages from Central America</li>
              <li>• Portuguese speakers from Brazil</li>
              <li>• French speakers from Haiti</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">ICE Raid Scenarios</h4>
            <ul className="space-y-1 text-blue-800 dark:text-blue-200 text-sm">
              <li>• Non-Hispanic illegal residents</li>
              <li>• Asian language speakers</li>
              <li>• Eastern European languages</li>
              <li>• African language speakers</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Modular Architecture Benefits</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Decoupled Phrase System:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Phrases can be added for new languages without code changes</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Expandable Categories:</strong>
              <span className="text-gray-700 dark:text-gray-300"> New phrase categories can be built up over time</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></span>
            <div>
              <strong className="text-gray-800 dark:text-gray-200">Cultural Sensitivity:</strong>
              <span className="text-gray-700 dark:text-gray-300"> Interface adapts to different cultural communication patterns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};