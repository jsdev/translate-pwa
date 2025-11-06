import { useState, useEffect, useRef } from 'react';

interface SpeechRecognitionHook {
  isSupported: boolean;
  startRecognition: (onResult: (transcript: string) => void, onError: (error: string) => void) => void;
  stopRecognition: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionStatic;
    webkitSpeechRecognition?: SpeechRecognitionStatic;
  }
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;
    }
  }, []);

  const startRecognition = (onResult: (transcript: string) => void, onError: (error: string) => void) => {
    if (!recognitionRef.current) {
      onError('Speech recognition not supported');
      return;
    }

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
      onError(event.error);
    };

    recognitionRef.current.onend = () => {
      // Recognition ended
    };

    try {
      recognitionRef.current.start();
    } catch {
      onError('Failed to start recording');
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return { isSupported, startRecognition, stopRecognition };
};