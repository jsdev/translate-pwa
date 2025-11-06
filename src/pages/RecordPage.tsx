import React, {useState } from 'react';
import { Mic, MicOff, Languages } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTranslation } from '../hooks/useTranslation';
import { languageUtils } from '../utils/languageUtils';
import { useTranslationStore } from '../store/translationStore';
import { useConversationStore } from '../store/conversationStore';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert } from '../components/ErrorAlert';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { TipsPanel } from '../components/TipsPanel';
import { SpeakerSelector, Speaker } from '../components/SpeakerSelector';

type LanguageMode = 'auto' | 'en' | 'es';

export const RecordPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');
  const [permissionError, setPermissionError] = useState('');
  const [recordedText, setRecordedText] = useState('');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('auto');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker>('officer');
  
  const { isSupported, startRecognition, stopRecognition } = useSpeechRecognition();
  const { translate } = useTranslation();
  const { setTranslation } = useTranslationStore();
  const { addConversation } = useConversationStore();
  const navigate = useNavigate();

  const getLanguageModeLabel = (mode: LanguageMode) => {
    switch (mode) {
      case 'auto': return 'Auto Detect';
      case 'en': return 'English → Spanish';
      case 'es': return 'Spanish → English';
    }
  };

  const getNextLanguageMode = (current: LanguageMode): LanguageMode => {
    switch (current) {
      case 'auto': return 'en';
      case 'en': return 'es';
      case 'es': return 'auto';
    }
  };

  const getSpeakerContext = (speaker: Speaker) => {
    return speaker === 'officer' ? 'Officer speaking' : 'Detained person speaking';
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

        let detectedLang: string;
        let targetLanguage: string;

        // Determine source and target languages based on mode
        if (languageMode === 'auto') {
          detectedLang = languageUtils.detectLanguage(transcript);
          targetLanguage = detectedLang === 'en' ? 'es' : 'en';
        } else if (languageMode === 'en') {
          detectedLang = 'en';
          targetLanguage = 'es';
        } else {
          detectedLang = 'es';
          targetLanguage = 'en';
        }
        
        setIsTranslating(true);
        try {
          const translationText = await translate(transcript, detectedLang, targetLanguage);
          const translation = {
            originalText: transcript,
            translatedText: translationText,
            originalLang: detectedLang,
            targetLang: targetLanguage
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
        
        {/* Language Mode Toggle */}
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <button
            onClick={() => setLanguageMode(getNextLanguageMode(languageMode))}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              languageMode === 'auto' 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/40' 
                : languageMode === 'en'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40'
                : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40'
            }`}
          >
            {getLanguageModeLabel(languageMode)}
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            (Tap to cycle modes)
          </span>
        </div>
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
              
              {!isRecording && languageMode !== 'auto' && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Mode: {getLanguageModeLabel(languageMode)}
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
        title="Recording Tips"
        color="blue"
        storageKey="recording-tips-dismissed"
        tips={[
          "Select correct speaker before recording",
          "Officers can use any language mode for Spanglish",
          "Auto-detect works best for mixed conversations",
          "Speak clearly and minimize background noise",
          "Results automatically appear after translation"
        ]}
      />
    </div>
  );
};