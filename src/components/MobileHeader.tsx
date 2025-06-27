import React from 'react';
import { Languages, Wifi, WifiOff, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function MobileHeader() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">ICE/CBP Translate</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Translation Tool</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Settings Button - Hide on settings page */}
          {location.pathname !== '/settings' && (
            <button
              onClick={handleSettingsClick}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Connection Status */}
          <div className="flex items-center gap-1">
            {isOnline ? (
              <div 
                className="flex items-center gap-1 text-green-700 dark:text-green-300"
                role="status"
                aria-label="Connection status: Online"
              >
                <Wifi className="w-4 h-4" />
              </div>
            ) : (
              <div 
                className="flex items-center gap-1 text-red-700 dark:text-red-300"
                role="status"
                aria-label="Connection status: Offline"
              >
                <WifiOff className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}