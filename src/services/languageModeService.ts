import { supportedLanguages, commonLanguagePairs } from '../config/languages';
import { AutoDetectModeManager, AutoDetectContext } from './autoDetectModeManager';

export interface LanguageMode {
  id: string;
  label: string;
  description: string;
  sourceLang?: string;
  targetLang?: string;
  isAuto: boolean;
}

export interface LanguageResolutionResult {
  sourceLang: string;
  targetLang: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning?: string;
  alternatives?: Array<{
    source: string;
    target: string;
    reasoning: string;
  }>;
}

export class LanguageModeService {
  private currentSourceLanguage: string;
  private currentTargetLanguage: string;
  private autoDetectManager: AutoDetectModeManager;

  constructor(sourceLanguage: string, targetLanguage: string) {
    this.currentSourceLanguage = sourceLanguage;
    this.currentTargetLanguage = targetLanguage;
    this.autoDetectManager = new AutoDetectModeManager();
  }

  updateLanguages(sourceLanguage: string, targetLanguage: string) {
    this.currentSourceLanguage = sourceLanguage;
    this.currentTargetLanguage = targetLanguage;
  }

  /**
   * Get all available language modes based on current settings
   */
  getAvailableModes(): LanguageMode[] {
    const modes: LanguageMode[] = [
      {
        id: 'auto',
        label: 'Auto Detect',
        description: 'Automatically detect the spoken language',
        isAuto: true
      }
    ];

    // Add current language pair as default
    const sourceLang = supportedLanguages.find(l => l.code === this.currentSourceLanguage);
    const targetLang = supportedLanguages.find(l => l.code === this.currentTargetLanguage);
    
    if (sourceLang && targetLang) {
      modes.push({
        id: `${this.currentSourceLanguage}-${this.currentTargetLanguage}`,
        label: `${sourceLang.name} → ${targetLang.name}`,
        description: `Always translate from ${sourceLang.name} to ${targetLang.name}`,
        sourceLang: this.currentSourceLanguage,
        targetLang: this.currentTargetLanguage,
        isAuto: false
      });

      // Add reverse direction if different
      if (this.currentSourceLanguage !== this.currentTargetLanguage) {
        modes.push({
          id: `${this.currentTargetLanguage}-${this.currentSourceLanguage}`,
          label: `${targetLang.name} → ${sourceLang.name}`,
          description: `Always translate from ${targetLang.name} to ${sourceLang.name}`,
          sourceLang: this.currentTargetLanguage,
          targetLang: this.currentSourceLanguage,
          isAuto: false
        });
      }
    }

    // Add other common language pairs that include either source or target language
    commonLanguagePairs.forEach(pair => {
      const pairId = `${pair.source}-${pair.target}`;
      const reversePairId = `${pair.target}-${pair.source}`;
      
      // Skip if already added
      if (modes.some(m => m.id === pairId || m.id === reversePairId)) {
        return;
      }

      // Only add pairs that include current source or target language
      if (pair.source === this.currentSourceLanguage || 
          pair.target === this.currentTargetLanguage ||
          pair.source === this.currentTargetLanguage || 
          pair.target === this.currentSourceLanguage) {
        
        const sourceLang = supportedLanguages.find(l => l.code === pair.source);
        const targetLang = supportedLanguages.find(l => l.code === pair.target);
        
        if (sourceLang && targetLang) {
          modes.push({
            id: pairId,
            label: `${sourceLang.name} → ${targetLang.name}`,
            description: `Always translate from ${sourceLang.name} to ${targetLang.name}`,
            sourceLang: pair.source,
            targetLang: pair.target,
            isAuto: false
          });
        }
      }
    });

    return modes;
  }

  /**
   * Determine source and target languages based on mode and detected text
   */
  resolveLanguages(
    mode: LanguageMode, 
    detectedText: string, 
    speakerType?: 'officer' | 'detained'
  ): LanguageResolutionResult {
    if (mode.isAuto) {
      // Use enhanced auto-detection
      const context: AutoDetectContext = {
        sourceLanguage: this.currentSourceLanguage,
        targetLanguage: this.currentTargetLanguage,
        speakerType
      };
      
      const autoDetectResult = this.autoDetectManager.detectLanguageWithContext(detectedText, context);
      
      // Apply speaker context override if provided
      let finalSourceLang = autoDetectResult.detectedLanguage;
      let finalTargetLang = autoDetectResult.targetLanguage;
      
      if (speakerType) {
        if (speakerType === 'officer') {
          // Officer speaks source language (English), translate to target
          finalSourceLang = this.currentSourceLanguage;
          finalTargetLang = this.currentTargetLanguage;
        } else if (speakerType === 'detained') {
          // Detained person speaks target language, translate to source (English)
          finalSourceLang = this.currentTargetLanguage;
          finalTargetLang = this.currentSourceLanguage;
        }
      }
      
      return {
        sourceLang: finalSourceLang,
        targetLang: finalTargetLang,
        confidence: autoDetectResult.confidence,
        reasoning: speakerType 
          ? `${speakerType === 'officer' ? 'Officer' : 'Detained person'} speaking (auto-detect): ${finalSourceLang} → ${finalTargetLang}`
          : autoDetectResult.reasoning || 'Auto-detection',
        alternatives: autoDetectResult.alternatives?.map(alt => ({
          source: alt.source,
          target: alt.target,
          reasoning: alt.reasoning
        }))
      };
    } else {
      // Use explicit mode settings but always consider speaker context
      let sourceLang = mode.sourceLang || this.currentSourceLanguage;
      let targetLang = mode.targetLang || this.currentTargetLanguage;
      
      // Speaker context ALWAYS overrides mode settings for clear direction
      if (speakerType) {
        if (speakerType === 'officer') {
          // Officer speaks source language (English), translate to target
          sourceLang = this.currentSourceLanguage;
          targetLang = this.currentTargetLanguage;
        } else if (speakerType === 'detained') {
          // Detained person speaks target language, translate to source (English)
          sourceLang = this.currentTargetLanguage;
          targetLang = this.currentSourceLanguage;
        }
      }
      
      return {
        sourceLang,
        targetLang,
        confidence: 'high',
        reasoning: speakerType 
          ? `${speakerType === 'officer' ? 'Officer' : 'Detained person'} speaking: ${sourceLang} → ${targetLang}`
          : `Manual mode: ${sourceLang} → ${targetLang}`
      };
    }
  }

  /**
   * Get the next mode in the cycle
   */
  getNextMode(currentMode: LanguageMode, availableModes: LanguageMode[]): LanguageMode {
    const currentIndex = availableModes.findIndex(m => m.id === currentMode.id);
    const nextIndex = (currentIndex + 1) % availableModes.length;
    return availableModes[nextIndex];
  }

  /**
   * Find mode by ID
   */
  findModeById(id: string, availableModes: LanguageMode[]): LanguageMode | undefined {
    return availableModes.find(m => m.id === id);
  }

  /**
   * Add conversation entry to auto-detect history
   */
  addConversationHistory(language: string, speaker: 'officer' | 'detained'): void {
    // This would typically be called from the conversation store or record page
    // For now, we can extend this as needed
    console.debug('Adding conversation history:', language, speaker);
  }

  /**
   * Clear auto-detection history (useful for new sessions)
   */
  clearDetectionHistory(): void {
    this.autoDetectManager.clearHistory();
  }

  /**
   * Get detection statistics
   */
  getDetectionStats() {
    return this.autoDetectManager.getDetectionStats();
  }
}
