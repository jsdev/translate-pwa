import { useState, useEffect } from 'react';

interface VoiceInfo {
  available: boolean;
  voice?: SpeechSynthesisVoice;
  fallbackVoice?: SpeechSynthesisVoice;
}

// Language code mappings with fallbacks
const languageVoiceMap: Record<string, string[]> = {
  'en': ['en-US', 'en-GB', 'en'],
  'es': ['es-ES', 'es-US', 'es-MX', 'es'],
  'zh': ['zh-CN', 'zh-TW', 'zh-HK', 'zh'],
  'ar': ['ar-SA', 'ar-EG', 'ar-AE', 'ar']
};

export const useTextToSpeech = () => {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceStatus, setVoiceStatus] = useState<Record<string, VoiceInfo>>({});

  // Load and analyze available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Analyze voice availability for each supported language
      const status: Record<string, VoiceInfo> = {};
      
      Object.keys(languageVoiceMap).forEach(langCode => {
        const langVariants = languageVoiceMap[langCode];
        let bestVoice: SpeechSynthesisVoice | undefined;
        let fallbackVoice: SpeechSynthesisVoice | undefined;
        
        // Try to find exact matches first
        for (const variant of langVariants) {
          const voice = voices.find(v => v.lang.toLowerCase() === variant.toLowerCase());
          if (voice) {
            bestVoice = voice;
            break;
          }
        }
        
        // If no exact match, try partial matches
        if (!bestVoice) {
          for (const variant of langVariants) {
            const voice = voices.find(v => v.lang.toLowerCase().startsWith(variant.split('-')[0]));
            if (voice) {
              fallbackVoice = voice;
              break;
            }
          }
        }
        
        status[langCode] = {
          available: !!(bestVoice || fallbackVoice),
          voice: bestVoice,
          fallbackVoice: fallbackVoice
        };
      });
      
      setVoiceStatus(status);
      
      // Debug logging
      console.log('TTS Voice Analysis:', {
        totalVoices: voices.length,
        supportedLanguages: Object.keys(status).filter(lang => status[lang].available),
        unavailableLanguages: Object.keys(status).filter(lang => !status[lang].available),
        voiceDetails: status
      });
    };

    // Load voices when available
    if (speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    const langInfo = voiceStatus[lang];
    if (!langInfo?.available) {
      console.warn(`No TTS voice available for language: ${lang}. Available languages:`, 
        Object.keys(voiceStatus).filter(l => voiceStatus[l].available));
      return;
    }

    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use the best available voice
    const selectedVoice = langInfo.voice || langInfo.fallbackVoice;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      console.log(`Speaking "${text}" using voice:`, selectedVoice.name, selectedVoice.lang);
    } else {
      // Fallback to language code
      const fallbackLang = languageVoiceMap[lang]?.[0] || lang;
      utterance.lang = fallbackLang;
      console.log(`Speaking "${text}" using fallback language:`, fallbackLang);
    }
    
    utterance.rate = 0.8;
    utterance.volume = 1;
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };
    
    speechSynthesis.speak(utterance);
  };

  const getVoiceInfo = (lang: string): VoiceInfo | undefined => {
    return voiceStatus[lang];
  };

  const getAvailableLanguages = (): string[] => {
    return Object.keys(voiceStatus).filter(lang => voiceStatus[lang].available);
  };

  return { 
    speak, 
    availableVoices, 
    voiceStatus, 
    getVoiceInfo, 
    getAvailableLanguages 
  };
};