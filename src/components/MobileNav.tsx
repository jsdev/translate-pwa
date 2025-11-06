import React from 'react';
import { MessageCircle, Mic, MessageSquare, ClipboardList, CheckCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useIntakeStore } from '../store/intakeStore';

export const MobileNav = () => {
  const { isIntakeComplete } = useIntakeStore();

  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
      <div className="flex">
        <NavLink
          to="/intake"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
              isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`
          }
        >
          <div className="relative">
            {isIntakeComplete ? (
              <CheckCircle className="w-6 h-6 mb-1 text-green-600 dark:text-green-400" />
            ) : (
              <ClipboardList className="w-6 h-6 mb-1" />
            )}
          </div>
          <span className="text-xs font-medium">Intake</span>
        </NavLink>

        <NavLink
          to="/phrases"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
              isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`
          }
        >
          <MessageCircle className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Phrases</span>
        </NavLink>
        
        <NavLink
          to="/record"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
              isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`
          }
        >
          <Mic className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">Record</span>
        </NavLink>

        <NavLink
          to="/conversations"
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
              isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`
          }
        >
          <MessageSquare className="w-6 h-6 mb-1" />
          <span className="text-xs font-medium">History</span>
        </NavLink>
      </div>
    </nav>
  );
};