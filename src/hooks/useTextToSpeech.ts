
export const useTextToSpeech = () => {
  const speak = (text: string, lang: string, voice?: SpeechSynthesisVoice) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // cancel any pending utterances
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }

    const createAndSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);

      // Best-effort: set lang hint and rate/volume
      utterance.lang = lang === 'en' ? 'en-US' : 'es-ES';
      utterance.rate = 0.8;
      utterance.volume = 1;

      try {
        // If a specific voice is provided, use it
        if (voice) {
          utterance.voice = voice;
        } else {
          // Try to honor a saved voice selection stored under `ttsVoice:<lang>`
          const storageKey = `ttsVoice:${lang}`;
          const saved = localStorage.getItem(storageKey);
          const voices = window.speechSynthesis.getVoices() || [];

          if (saved) {
            const match = voices.find(v => v.voiceURI === saved || v.name === saved || `${v.name}__${v.lang}` === saved);
            if (match) utterance.voice = match;
          }

          // If no saved voice matched, try to pick a voice by language prefix
          if (!utterance.voice && voices.length) {
            const found = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(lang));
            if (found) utterance.voice = found;
          }
        }
      } catch (e) {
        // localStorage or voices access could fail in some environments; fall back to defaults
        // eslint-disable-next-line no-console
        console.warn('TTS: could not apply saved voice', e);
      }

      window.speechSynthesis.speak(utterance);
    };

    // If voices aren't loaded yet (commonly happens on first gesture), defer until they are
    const voices = window.speechSynthesis.getVoices() || [];
    if (!voices.length) {
      let fired = false;
      const onVoicesChanged = () => {
        if (fired) return;
        fired = true;
        try {
          window.speechSynthesis.onvoiceschanged = null;
        } catch (e) {
          // ignore
        }
        createAndSpeak();
      };

      try {
        window.speechSynthesis.onvoiceschanged = onVoicesChanged;
      } catch (e) {
        // ignore if environment doesn't support
      }

      // Fallback: if voices don't arrive within 1.5s, still try to speak
      setTimeout(() => {
        if (!fired) {
          fired = true;
          try {
            window.speechSynthesis.onvoiceschanged = null;
          } catch (e) {
            // ignore
          }
          createAndSpeak();
        }
      }, 1500);

      return;
    }

    // Voices already available — speak immediately
    createAndSpeak();
  };

  return { speak };
};