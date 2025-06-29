import { useState, useEffect, useMemo } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTranslation } from '../hooks/useTranslation';
import { useTranslationStore } from '../store/translationStore';
import { useConversationStore } from '../store/conversationStore';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { TipsPanel } from '../components/TipsPanel';
import { SpeakerSelector, Speaker } from '../components/SpeakerSelector';
import { LanguageModeSelector } from '../components/LanguageModeSelector';
import { LanguageModeService, LanguageMode, LanguageResolutionResult } from '../services/languageModeService';

export const RecordPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [permissionError, setPermissionError] = useState('');
  const [recordedText, setRecordedText] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker>('officer');
  const [currentModeId, setCurrentModeId] = useState('auto');
  const [lastDetectionResult, setLastDetectionResult] = useState<LanguageResolutionResult | undefined>();
  
  const { isSupported, startRecognition, stopRecognition } = useSpeechRecognition();
  const { translate } = useTranslation();
  const { setTranslation } = useTranslationStore();
  const { addConversation } = useConversationStore();
  const { sourceLanguage, targetLanguage } = useAppStore();
  const navigate = useNavigate();

  // Create language mode service instance
  const languageModeService = useMemo(() => 
    new LanguageModeService(sourceLanguage, targetLanguage), 
    [sourceLanguage, targetLanguage]
  );

  // Update service when languages change
  useEffect(() => {
    languageModeService.updateLanguages(sourceLanguage, targetLanguage);
  }, [sourceLanguage, targetLanguage, languageModeService]);

  // Get available modes
  const availableModes = useMemo(() => 
    languageModeService.getAvailableModes(), 
    [languageModeService]
  );

  // Get current mode
  const currentMode = useMemo(() => 
    languageModeService.findModeById(currentModeId, availableModes) || availableModes[0], 
    [currentModeId, availableModes, languageModeService]
  );

  const getSpeakerContext = (speaker: Speaker) => {
    return speaker === 'officer' ? 'Officer speaking' : 'Detained person speaking';
  };

  const handleModeChange = (mode: LanguageMode) => {
    setCurrentModeId(mode.id);
    // Clear last detection result when switching modes
    if (!mode.isAuto) {
      setLastDetectionResult(undefined);
    }
  };

  const handleStartRecording = async () => {
    setError('');
    setPermissionError('');
    setRecordedText('');
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setPermissionError('Microphone access denied. Please allow microphone access and try again.');
      return;
    }

    setIsRecording(true);
    
    startRecognition(
      async (transcript) => {
        setIsRecording(false);
        setRecordedText(transcript);
        
        if (!transcript.trim()) {
          setError('No speech detected. Please try again.');
          return;
        }

        // Resolve languages using the enhanced service
        const resolutionResult = languageModeService.resolveLanguages(
          currentMode, 
          transcript, 
          selectedSpeaker
        );
        
        // Store detection result for feedback
        setLastDetectionResult(resolutionResult);
        
        // Show warning for low confidence auto-detection
        if (resolutionResult.confidence === 'low' && currentMode.isAuto) {
          console.warn('Low confidence language detection:', resolutionResult.reasoning);
        }
        
        setIsTranslating(true);
        try {
          const translationText = await translate(
            transcript, 
            resolutionResult.sourceLang, 
            resolutionResult.targetLang
          );
          const translation = {
            originalText: transcript,
            translatedText: translationText,
            originalLang: resolutionResult.sourceLang,
            targetLang: resolutionResult.targetLang
          };
          
          setTranslation(translation);
          
          // Add to conversation history with speaker information
          addConversation({
            ...translation,
            source: 'recording',
            speaker: selectedSpeaker
          });
          
          // Auto-navigate to translation results
          navigate('/translate');
        } catch {
          setError('Translation failed. Please try again.');
        } finally {
          setIsTranslating(false);
        }
      },
      (errorMsg) => {
        setIsRecording(false);
        if (errorMsg === 'not-allowed') {
          setPermissionError('Microphone access denied. Please allow microphone access and try again.');
        } else {
          setError(`Could not recognize speech: ${errorMsg}. Please try again.`);
        }
      }
    );
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecognition();
  };

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 dark:bg-gray-900 p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-sm w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MicOff className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Browser Not Supported</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Instructions */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Voice Translation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Select who is speaking, choose language mode, then tap the microphone to record.
        </p>
        
        {/* Speaker Selection */}
        <SpeakerSelector
          selectedSpeaker={selectedSpeaker}
          onSpeakerChange={setSelectedSpeaker}
        />
        
        {/* Language Mode Toggle with Enhanced Feedback */}
        <LanguageModeSelector
          currentMode={currentMode}
          availableModes={availableModes}
          onModeChange={handleModeChange}
          lastDetectionResult={lastDetectionResult}
          showDetectionFeedback={!!lastDetectionResult && currentMode.isAuto}
        />
      </div>

      {/* Error Messages */}
      <div className="flex-shrink-0">
        {permissionError && (
          <ErrorAlert message={permissionError} type="warning" />
        )}
        
        {error && (
          <ErrorAlert message={error} type="error" />
        )}
      </div>

      {/* Main Recording Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto prevent-bounce">
        {isTranslating ? (
          <LoadingSpinner message="Translating..." />
        ) : (
          <>
            {/* Current Context */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                selectedSpeaker === 'officer' 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
              }`}>
                {getSpeakerContext(selectedSpeaker)}
              </div>
            </div>

            {/* Record Button */}
            <div className="mb-8">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={isTranslating}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse focus-visible:ring-red-300' 
                    : selectedSpeaker === 'officer'
                    ? 'bg-blue-500 hover:bg-blue-600 active:scale-95'
                    : 'bg-orange-500 hover:bg-orange-600 active:scale-95'
                } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} text-white`}
              >
                {isRecording ? (
                  <div className="w-10 h-10 bg-white rounded-sm" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </button>
            </div>

            {/* Status */}
            <div className="text-center mb-4">
              <div className={`text-lg font-medium mb-2 ${
                isRecording ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {isRecording ? 'Recording...' : 'Ready to Record'}
              </div>
              
              {isRecording && (
                <div className="flex items-center justify-center gap-2 text-red-500 dark:text-red-400">
                  <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Listening for speech</span>
                </div>
              )}
              
              {!isRecording && currentMode.isAuto && (
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  Mode: {currentMode.label} • 4 languages supported
                </div>
              )}
              
              {!isRecording && !currentMode.isAuto && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Mode: {currentMode.label}
                </div>
              )}
              
              {/* Detection confidence indicator */}
              {lastDetectionResult && currentMode.isAuto && !isRecording && (
                <div className={`text-xs mt-1 ${
                  lastDetectionResult.confidence === 'high' ? 'text-green-600 dark:text-green-400' :
                  lastDetectionResult.confidence === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  Last detection: {lastDetectionResult.confidence} confidence
                </div>
              )}
            </div>

            {/* Show recorded text while processing */}
            {recordedText && !isRecording && (
              <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Recorded Text:</div>
                <div className="text-gray-900 dark:text-gray-100 leading-relaxed">{recordedText}</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Tips Panel */}
      <TipsPanel
        title="Smart Recording Tips"
        color="blue"
        storageKey="recording-tips-dismissed"
        tips={[
          "Select correct speaker before recording for better context",
          "Auto-detect uses advanced AI to identify 4+ languages",
          "Watch confidence indicators for detection quality",
          "Use specific language modes for maximum accuracy",
          "Speak clearly and minimize background noise",
          "Detection improves with conversation history"
        ]}
      />
    </div>
  );
};