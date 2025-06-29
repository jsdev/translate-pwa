import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { supportedLanguages, Language } from '../config/languages';

interface LanguageAutocompleteProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
  label: string;
  className?: string;
  excludeLanguages?: string[];
}

export const LanguageAutocomplete = ({
  selectedLanguage,
  onLanguageChange,
  label,
  className = '',
  excludeLanguages = []
}: LanguageAutocompleteProps) => {
  const [query, setQuery] = useState('');

  // Filter out excluded languages (like English for detained person)
  const availableLanguages = supportedLanguages.filter(
    lang => !excludeLanguages.includes(lang.code)
  );

  const filteredLanguages =
    query === ''
      ? availableLanguages
      : availableLanguages.filter((language) =>
          language.name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          language.nativeName
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  const getLanguageBackgroundColor = (_language: Language, _isSelected: boolean, isActive: boolean) => {
    const baseClasses = 'relative cursor-default select-none py-3 pl-10 pr-4 transition-colors text-left';
    
    // Simple, consistent styling without language-specific colors
    const colorClasses = isActive 
      ? 'bg-gray-100 dark:bg-gray-700' 
      : 'bg-white dark:bg-gray-800';

    // Text color inherits from theme
    const textColor = 'text-gray-900 dark:text-gray-100';

    return `${baseClasses} ${colorClasses} ${textColor}`;
  };

  const getSelectedButtonColor = () => {
    // Simple, consistent styling for all languages
    return 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600';
  };

  return (
    <div className={className}>
      <Combobox value={selectedLanguage} onChange={onLanguageChange}>
        <div className="relative">
          <div className="relative">
            <Combobox.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {label}
            </Combobox.Label>
            <Combobox.Input
              className={`relative w-full cursor-default rounded-lg border py-3 pl-4 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors text-gray-900 dark:text-gray-100 ${getSelectedButtonColor()}`}
              displayValue={(languageCode: string) => {
                const language = availableLanguages.find(lang => lang.code === languageCode);
                return language ? `${language.name} (${language.nativeName})` : '';
              }}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search languages..."
              autoComplete="off"
              spellCheck="false"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3 mt-7">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-gray-200 dark:border-gray-600">
              {filteredLanguages.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-3 px-4 text-gray-700 dark:text-gray-300">
                  No languages found.
                </div>
              ) : (
                <>
                  {/* Show all available languages when no query */}
                  {query === '' && (
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                      Available Languages ({filteredLanguages.length})
                    </div>
                  )}
                  {filteredLanguages.map((language) => (
                    <Combobox.Option
                      key={language.code}
                      className={({ active }) =>
                        getLanguageBackgroundColor(language, selectedLanguage === language.code, active)
                      }
                      value={language.code}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate text-left ${
                            selected ? 'font-semibold' : 'font-normal'
                          }`}>
                            <span className="inline-flex items-center justify-between w-full">
                              <span className="flex flex-col">
                                <span className="font-medium">{language.name}</span>
                                <span className="text-sm opacity-75">{language.nativeName}</span>
                              </span>
                              {language.code === 'es' && (
                                <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                  Default
                                </span>
                              )}
                            </span>
                          </span>
                          
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      
      {/* Helper text */}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Select the language for translation
        {selectedLanguage === 'es' && (
          <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Default
          </span>
        )}
      </p>
    </div>
  );
};
