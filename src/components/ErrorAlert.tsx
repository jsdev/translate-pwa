import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  type?: 'error' | 'warning';
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, type = 'error' }) => {
  const bgColor = type === 'error' 
    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
    : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
  const textColor = type === 'error' 
    ? 'text-red-800 dark:text-red-200' 
    : 'text-yellow-800 dark:text-yellow-200';

  return (
    <div className={`${bgColor} border rounded-lg p-4 mx-4 mb-4`}>
      <div className={`flex items-center gap-2 ${textColor}`}>
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};