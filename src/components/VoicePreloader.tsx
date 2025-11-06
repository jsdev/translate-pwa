import React, { useEffect, useMemo, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

// Show a small non-blocking overlay while prioritized voices are discovered.
const STORAGE_PREFIX = 'ttsVoice:';
const PREF_KEY = 'ttsPreloaderSeen';

const DEFAULT_PRIORITIES = ['en', 'es'];

const checkVoicesMatch = (voices: SpeechSynthesisVoice[], lang: string, saved?: string) => {
  if (!voices || !voices.length) return false;
  // If saved voice id exists, check for it first
  if (saved) {
    const match = voices.find(v => v.voiceURI === saved || v.name === saved || `${v.name}__${v.lang}` === saved);
    if (match) return true;
  }
  // Otherwise look for any voice with matching lang prefix
  return voices.some(v => v.lang && v.lang.toLowerCase().startsWith(lang));
};

const getSavedPriorities = (): string[] => {
  try {
    const keys = Object.keys(localStorage || {}).filter(k => k.startsWith(STORAGE_PREFIX));
    const langs = keys.map(k => k.replace(STORAGE_PREFIX, '')).filter(Boolean);
    return Array.from(new Set([...langs, ...DEFAULT_PRIORITIES]));
  } catch (e) {
    return DEFAULT_PRIORITIES;
  }
};

export const VoicePreloader: React.FC = () => {
  const priorities = useMemo(() => getSavedPriorities(), []);
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return !Boolean(localStorage.getItem(PREF_KEY));
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVisible(false);
      return;
    }

    let mounted = true;
    const timeout = setTimeout(() => {
      // don't block forever — hide after 5s even if voices didn't match
      if (!mounted) return;
      try { localStorage.setItem(PREF_KEY, '1'); } catch (e) { /* ignore */ }
      setVisible(false);
    }, 5000);

    const evaluate = () => {
      const v = window.speechSynthesis.getVoices() || [];
      const ok = priorities.every(lang => {
        try {
          const saved = localStorage.getItem(`${STORAGE_PREFIX}${lang}`) || undefined;
          return checkVoicesMatch(v, lang, saved);
        } catch (e) {
          return checkVoicesMatch(v, lang);
        }
      });

      if (ok && mounted) {
        clearTimeout(timeout);
        // keep visible a tick to allow smooth UI transition
        setTimeout(() => {
          try { localStorage.setItem(PREF_KEY, '1'); } catch (e) { /* ignore */ }
          setVisible(false);
        }, 250);
      }
    };

    evaluate();
    try {
      window.speechSynthesis.onvoiceschanged = evaluate;
    } catch (e) {
      // ignore
    }

    return () => {
      mounted = false;
      try {
        window.speechSynthesis.onvoiceschanged = null;
      } catch (e) {
        // ignore
      }
      clearTimeout(timeout);
    };
  }, [priorities]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg pointer-events-auto">
        <LoadingSpinner message="Preparing voices…" />
  <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">We're selecting the best voices for your languages.</div>
      </div>
    </div>
  );
};

export default VoicePreloader;
