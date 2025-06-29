import React from 'react';

export const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        This Progressive Web App provides secure, effective communication between DHS agents and individuals during apprehensions.
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Core Mission</h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
            <span><strong>Prevent Family Separations:</strong> Clear communication about family status and relationships</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
            <span><strong>Identify Medical Issues:</strong> Immediate assessment of health concerns and medical history</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
            <span><strong>Set Clear Expectations:</strong> Transparent communication using proven methods</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
            <span><strong>Ensure Accountability:</strong> Complete audit trail for all interactions</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Design Philosophy</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Every feature was designed with field conditions in mind: high-stress situations, diverse linguistic backgrounds, 
          varying technical proficiency, and the critical need for accurate, documented communication.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Offline Capability</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Works without internet connection for reliable field use</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Audio Translation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Text-to-speech in multiple languages with clear pronunciation</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Structured Intake</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Guided forms for collecting required information consistently</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Conversation History</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Complete audit trail of all communications and decisions</p>
          </div>
        </div>
      </div>
    </div>
  );
};