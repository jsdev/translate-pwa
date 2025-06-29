import { Languages, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { LanguageMode, LanguageResolutionResult } from '../services/languageModeService';
import { useState } from 'react';

interface LanguageModeSelectorProps {
  currentMode: LanguageMode;
  availableModes: LanguageMode[];
  onModeChange: (mode: LanguageMode) => void;
  lastDetectionResult?: LanguageResolutionResult;
  showDetectionFeedback?: boolean;
  className?: string;
}

export const LanguageModeSelector = ({ 
  currentMode, 
  availableModes, 
  onModeChange,
  lastDetectionResult,
  showDetectionFeedback = false,
  className = ''
}: LanguageModeSelectorProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleCycleMode = () => {
    const currentIndex = availableModes.findIndex(m => m.id === currentMode.id);
    const nextIndex = (currentIndex + 1) % availableModes.length;
    onModeChange(availableModes[nextIndex]);
  };

  const getModeColor = (mode: LanguageMode) => {
    if (mode.isAuto) {
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/40';
    } else if (mode.sourceLang === 'en') {
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40';
    } else if (mode.sourceLang === 'es') {
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40';
    } else if (mode.sourceLang === 'zh') {
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/40';
    } else if (mode.sourceLang === 'ar') {
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/40';
    } else {
      return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900/40';
    }
  };

  const getConfidenceIcon = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'high':
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'medium':
        return <AlertCircle className="w-3 h-3 text-yellow-500" />;
      case 'low':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
    }
  };

  const getConfidenceText = (confidence: 'high' | 'medium' | 'low') => {
    switch (confidence) {
      case 'high':
        return 'High confidence';
      case 'medium':
        return 'Medium confidence';
      case 'low':
        return 'Low confidence';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Main Mode Selector */}
      <div className="flex items-center gap-2">
        <Languages className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <button
          onClick={handleCycleMode}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${getModeColor(currentMode)}`}
          title={currentMode.description}
        >
          {currentMode.label}
        </button>
        
        {/* Info Button for Auto Mode */}
        {currentMode.isAuto && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Show detection details"
          >
            <Info className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          </button>
        )}
        
        <span className="text-xs text-gray-500 dark:text-gray-400">
          (Tap to cycle modes)
        </span>
      </div>

      {/* Detection Feedback */}
      {showDetectionFeedback && lastDetectionResult && currentMode.isAuto && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm">
          <div className="flex items-center gap-2 mb-2">
            {getConfidenceIcon(lastDetectionResult.confidence)}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Last Detection
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              lastDetectionResult.confidence === 'high' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
              lastDetectionResult.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {getConfidenceText(lastDetectionResult.confidence)}
            </span>
          </div>
          
          {lastDetectionResult.reasoning && (
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {lastDetectionResult.reasoning}
            </p>
          )}
          
          {lastDetectionResult.alternatives && lastDetectionResult.alternatives.length > 0 && showDetails && (
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Alternatives:</p>
              <div className="space-y-1">
                {lastDetectionResult.alternatives.map((alt, index) => (
                  <div key={index} className="text-xs text-gray-600 dark:text-gray-300">
                    • {alt.reasoning}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode Details (when expanded) */}
      {showDetails && currentMode.isAuto && !showDetectionFeedback && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-3 text-sm">
          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
            Auto Detect Mode
          </h4>
          <p className="text-purple-700 dark:text-purple-300 text-xs leading-relaxed">
            Automatically detects the spoken language using advanced algorithms. 
            Considers conversation context, speaker patterns, and language indicators 
            for improved accuracy.
          </p>
          
          <div className="mt-2 pt-2 border-t border-purple-200 dark:border-purple-600">
            <p className="text-xs text-purple-600 dark:text-purple-400">
              <strong>Supported:</strong> English, Spanish, Chinese, Arabic
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
