import { create } from 'zustand';

interface Translation {
  originalText: string;
  translatedText: string;
  originalLang: string;
  targetLang: string;
}

interface TranslationStore {
  translation: Translation | null;
  setTranslation: (translation: Translation) => void;
  clearTranslation: () => void;
}

export const useTranslationStore = create<TranslationStore>((set) => ({
  translation: null,
  setTranslation: (translation) => set({ translation }),
  clearTranslation: () => set({ translation: null })
}));