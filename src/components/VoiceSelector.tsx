import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { ChevronDown, Volume2, X } from 'lucide-react';

interface VoiceSelectorProps {
  lang: string; // language code prefix, e.g. 'en' or 'es'
  label?: string;
}

const storageKeyFor = (lang: string) => `ttsVoice:${lang}`;

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ lang, label }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>(() => {
    try {
      return localStorage.getItem(storageKeyFor(lang)) || '';
    } catch (e) {
      return '';
    }
  });
  const [showList, setShowList] = useState(false);

  const { speak } = useTextToSpeech();

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices() || [];
      setVoices(v);
      setLoading(v.length === 0);
    };

    load();
    const handler = () => load();
    try {
      window.speechSynthesis.onvoiceschanged = handler;
    } catch (e) {
      // ignore
    }

    return () => {
      try {
        window.speechSynthesis.onvoiceschanged = null;
      } catch (e) {
        // ignore
      }
    };
  }, [lang]);

  useEffect(() => {
    // Wait until voices are available before deciding the saved selection is invalid.
    // On many browsers voices arrive asynchronously; clearing too early removes valid
    // saved selections during initial mount. Only attempt to validate after we have
    // at least one voice loaded.
    if (!selected) return;
    if (!voices || voices.length === 0) return; // defer validation until voices loaded

    const found = voices.find(v => v.voiceURI === selected || v.name === selected || `${v.name}__${v.lang}` === selected);
    if (!found) {
      setSelected('');
      try {
        localStorage.removeItem(storageKeyFor(lang));
      } catch (e) {
        // ignore
      }
    }
  }, [voices, selected, lang]);

  const handleSelect = (voice: SpeechSynthesisVoice) => {
    const key = voice.voiceURI || `${voice.name}__${voice.lang}`;
    setSelected(key);
    try {
      localStorage.setItem(storageKeyFor(lang), key);
    } catch (err) {
      // ignore localStorage errors
    }
    setShowList(false);
  };

  const handleTest = (voice: SpeechSynthesisVoice) => {
    const sample = lang === 'es' ? 'Prueba de voz' : 'Voice test';
    speak(sample, lang, voice);
  };

  const filtered = React.useMemo(() => {
    const primary = voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(lang));
    const rest = voices.filter(v => !(v.lang && v.lang.toLowerCase().startsWith(lang)));
    // dedupe by voiceURI
    const seen = new Set<string>();
    const concat = [...primary, ...rest].filter(v => {
      const id = v.voiceURI || `${v.name}__${v.lang}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
    return concat;
  }, [voices, lang]);

  const selectedVoice = voices.find(v => (v.voiceURI || `${v.name}__${v.lang}`) === selected);

  return (
    <div className="flex flex-col">
      {label && <label className="text-sm font-medium text-gray-900 dark:text-white mb-2">{label}</label>}
      <button
        onClick={() => setShowList(true)}
        className="flex items-center justify-between px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span>{selectedVoice ? selectedVoice.name : 'Select voice'}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {showList && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Voice</h2>
            <button
              onClick={() => setShowList(false)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4">
                <LoadingSpinner message="Loading voices…" />
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <button
                  onClick={() => {
                    setSelected('');
                    try {
                      localStorage.removeItem(storageKeyFor(lang));
                    } catch (e) {
                      // ignore
                    }
                    setShowList(false);
                  }}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className="text-gray-900 dark:text-white">Default system voice</span>
                </button>
                {filtered.map(v => {
                  const key = v.voiceURI || `${v.name}__${v.lang}`;
                  const isSelected = key === selected;
                  return (
                    <div key={key} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <button
                        onClick={() => handleSelect(v)}
                        className="flex-1 text-left"
                      >
                        <div className="text-gray-900 dark:text-white font-medium">{v.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{v.lang} {v.default ? '(default)' : ''}</div>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTest(v)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
                          title="Test voice"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        {isSelected && (
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSelector;

