export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const supportedLanguages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true
  }
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return supportedLanguages.find(lang => lang.code === code);
};

export const getLanguageName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language ? language.name : code.toUpperCase();
};

export const getLanguageNativeName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language ? language.nativeName : code.toUpperCase();
};

export const getLanguageFlag = (code: string): string => {
  const language = getLanguageByCode(code);
  return language ? language.flag : '🌐';
};

export const isRTL = (code: string): boolean => {
  const language = getLanguageByCode(code);
  return language?.rtl || false;
};

// Default source and target languages
export const defaultSourceLanguage = 'en';
export const defaultTargetLanguage = 'es';

// Common language pairs for law enforcement
export const commonLanguagePairs = [
  { source: 'en', target: 'es' },
  { source: 'en', target: 'zh' },
  { source: 'en', target: 'ar' },
  { source: 'es', target: 'en' },
  { source: 'zh', target: 'en' },
  { source: 'ar', target: 'en' }
];
