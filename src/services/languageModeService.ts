import { languageUtils } from '../utils/languageUtils';
import { supportedLanguages, getLanguageName } from '../config/languages';

export type LanguageMode = 'auto' | 'source-to-target' | 'target-to-source';

export interface LanguageModeConfig {
  mode: LanguageMode;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface TranslationDirection {
  sourceLanguage: string;
  targetLanguage: string;
  label: string;
}

export class LanguageModeManager {
  private sourceLanguage: string;
  private targetLanguage: string;

  constructor(sourceLanguage: string, targetLanguage: string) {
    this.sourceLanguage = sourceLanguage;
    this.targetLanguage = targetLanguage;
  }

  /**
   * Get all available language modes for the current language pair
   */
  getAvailableModes(): LanguageMode[] {
    return ['auto', 'source-to-target', 'target-to-source'];
  }

  /**
   * Get the display label for a language mode
   */
  getModeLabel(mode: LanguageMode): string {
    const sourceName = getLanguageName(this.sourceLanguage);
    const targetName = getLanguageName(this.targetLanguage);

    switch (mode) {
      case 'auto':
        return 'Auto Detect';
      case 'source-to-target':
        return `${sourceName} → ${targetName}`;
      case 'target-to-source':
        return `${targetName} → ${sourceName}`;
    }
  }

  /**
   * Get the next language mode in the cycle
   */
  getNextMode(currentMode: LanguageMode): LanguageMode {
    const modes = this.getAvailableModes();
    const currentIndex = modes.indexOf(currentMode);
    return modes[(currentIndex + 1) % modes.length];
  }

  /**
   * Determine translation direction based on mode and detected language
   */
  getTranslationDirection(mode: LanguageMode, detectedText?: string): TranslationDirection {
    switch (mode) {
      case 'auto':
        return this.getAutoDetectedDirection(detectedText || '');
      case 'source-to-target':
        return {
          sourceLanguage: this.sourceLanguage,
          targetLanguage: this.targetLanguage,
          label: this.getModeLabel(mode)
        };
      case 'target-to-source':
        return {
          sourceLanguage: this.targetLanguage,
          targetLanguage: this.sourceLanguage,
          label: this.getModeLabel(mode)
        };
    }
  }

  /**
   * Auto-detect language and determine best translation direction
   */
  private getAutoDetectedDirection(text: string): TranslationDirection {
    const detectedLang = languageUtils.detectLanguage(text);
    
    // If detected language matches source, translate to target
    if (detectedLang === this.sourceLanguage) {
      return {
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
        label: `${getLanguageName(this.sourceLanguage)} → ${getLanguageName(this.targetLanguage)} (detected)`
      };
    }
    
    // If detected language matches target, translate to source
    if (detectedLang === this.targetLanguage) {
      return {
        sourceLanguage: this.targetLanguage,
        targetLanguage: this.sourceLanguage,
        label: `${getLanguageName(this.targetLanguage)} → ${getLanguageName(this.sourceLanguage)} (detected)`
      };
    }
    
    // If detected language is neither source nor target, find best match
    const detectedLanguage = supportedLanguages.find(lang => lang.code === detectedLang);
    if (detectedLanguage) {
      // Prefer translating to source language (usually English for officers)
      return {
        sourceLanguage: detectedLang,
        targetLanguage: this.sourceLanguage,
        label: `${detectedLanguage.name} → ${getLanguageName(this.sourceLanguage)} (detected)`
      };
    }
    
    // Fallback to default source-to-target
    return {
      sourceLanguage: this.sourceLanguage,
      targetLanguage: this.targetLanguage,
      label: `${getLanguageName(this.sourceLanguage)} → ${getLanguageName(this.targetLanguage)} (fallback)`
    };
  }

  /**
   * Get color theme for language mode display
   */
  getModeColorTheme(mode: LanguageMode): string {
    switch (mode) {
      case 'auto':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/40';
      case 'source-to-target':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/40';
      case 'target-to-source':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40';
    }
  }

  /**
   * Update the language settings
   */
  updateLanguages(sourceLanguage: string, targetLanguage: string): LanguageModeManager {
    return new LanguageModeManager(sourceLanguage, targetLanguage);
  }
}

/**
 * Factory function to create a language mode manager
 */
export const createLanguageModeManager = (sourceLanguage: string, targetLanguage: string): LanguageModeManager => {
  return new LanguageModeManager(sourceLanguage, targetLanguage);
};
