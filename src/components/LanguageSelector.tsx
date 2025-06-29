import { ChevronDown, Globe } from 'lucide-react';
import { supportedLanguages, getLanguageFlag, getLanguageNativeName } from '../config/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  className?: string;
  label?: string;
}

export const LanguageSelector = ({ 
  selectedLanguage, 
  onLanguageChange, 
  className = '',
  label = 'Language'
}: LanguageSelectorProps) => {
  const selectedLang = supportedLanguages.find(lang => lang.code === selectedLanguage);

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white [&>option]:bg-white [&>option]:dark:bg-gray-800 [&>option]:text-gray-900 [&>option]:dark:text-white [&>option]:py-2"
        >
          {supportedLanguages.map((language) => (
            <option 
              key={language.code} 
              value={language.code}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2"
            >
              {getLanguageFlag(language.code)} {getLanguageNativeName(language.code)} ({language.name})
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      {selectedLang && (
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Globe className="w-3 h-3" />
          <span>{selectedLang.flag} {selectedLang.nativeName}</span>
        </div>
      )}
    </div>
  );
};
