import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface TipsPanelProps {
  title: string;
  tips: string[];
  color?: 'blue' | 'green' | 'purple' | 'yellow';
  dismissible?: boolean;
  storageKey?: string;
}

export const TipsPanel: React.FC<TipsPanelProps> = ({ 
  title, 
  tips, 
  color = 'blue', 
  dismissible = true,
  storageKey 
}) => {
  const { showTips } = useAppStore();
  const [isDismissed, setIsDismissed] = useState(() => {
    if (!dismissible || !storageKey) return false;
    return localStorage.getItem(storageKey) === 'dismissed';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    if (storageKey) {
      localStorage.setItem(storageKey, 'dismissed');
    }
  };

  // Don't show if tips are globally disabled or individually dismissed
  if (!showTips || isDismissed) return null;

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-800 dark:text-green-200',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 text-purple-800 dark:text-purple-200',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
  };

  return (
    <div className={`p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium mb-2">{title}:</h3>
          <ul className="text-sm space-y-1">
            {tips.map((tip, index) => (
              <li key={index}>• {tip}</li>
            ))}
          </ul>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-3 p-1 hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
            title="Dismiss tips"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};