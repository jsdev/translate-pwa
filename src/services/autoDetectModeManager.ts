import { LanguageDetectionService, DetectionResult } from './languageDetectionService';
import { supportedLanguages } from '../config/languages';

export interface AutoDetectResult {
  detectedLanguage: string;
  targetLanguage: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  alternatives?: Array<{
    source: string;
    target: string;
    confidence: number;
    reasoning: string;
  }>;
}

export interface AutoDetectContext {
  sourceLanguage: string;
  targetLanguage: string;
  speakerType?: 'officer' | 'detained';
  previousDetections?: DetectionResult[];
  conversationHistory?: Array<{
    language: string;
    speaker: 'officer' | 'detained';
    timestamp: Date;
  }>;
}

export class AutoDetectModeManager {
  private detectionService: LanguageDetectionService;
  private detectionHistory: DetectionResult[] = [];
  private contextualBias: Map<string, number> = new Map();

  constructor() {
    this.detectionService = new LanguageDetectionService();
  }

  /**
   * Enhanced auto-detection with contextual intelligence
   */
  detectLanguageWithContext(text: string, context: AutoDetectContext): AutoDetectResult {
    // Get primary detection result
    const detectionResult = this.detectionService.detectLanguage(text);
    
    // Add to history for learning
    this.detectionHistory.push(detectionResult);
    
    // Apply contextual intelligence
    const enhancedResult = this.applyContextualIntelligence(detectionResult, context);
    
    // Determine target language with smart logic
    const targetLanguage = this.determineTargetLanguage(enhancedResult.language, context);
    
    // Generate reasoning
    const reasoning = this.generateReasoning(detectionResult, enhancedResult, context);
    
    // Generate alternatives
    const alternatives = this.generateAlternatives(detectionResult, context);

    return {
      detectedLanguage: enhancedResult.language,
      targetLanguage,
      confidence: enhancedResult.confidence,
      reasoning,
      alternatives
    };
  }

  /**
   * Apply contextual intelligence to improve detection accuracy
   */
  private applyContextualIntelligence(
    detectionResult: DetectionResult, 
    context: AutoDetectContext
  ): DetectionResult {
    let adjustedScore = detectionResult.score;
    let adjustedConfidence = detectionResult.confidence;
    let finalLanguage = detectionResult.language;

    // Context 1: Recent conversation history
    if (context.conversationHistory && context.conversationHistory.length > 0) {
      const recentLanguages = context.conversationHistory
        .slice(-3) // Last 3 interactions
        .map(h => h.language);
      
      const languageCounts = recentLanguages.reduce((counts, lang) => {
        counts[lang] = (counts[lang] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);

      // Boost score if detected language appears in recent history
      if (languageCounts[detectionResult.language]) {
        adjustedScore += languageCounts[detectionResult.language] * 15;
        if (adjustedConfidence === 'low') adjustedConfidence = 'medium';
        else if (adjustedConfidence === 'medium') adjustedConfidence = 'high';
      }
    }

    // Context 2: Speaker type patterns
    if (context.speakerType) {
      const speakerBias = this.getSpeakerLanguageBias(context.speakerType, context);
      if (speakerBias[detectionResult.language]) {
        adjustedScore += speakerBias[detectionResult.language];
      }
    }

    // Context 3: Detection history patterns
    if (this.detectionHistory.length > 0) {
      const recentDetections = this.detectionHistory.slice(-5);
      const avgConfidenceForLang = this.calculateAverageConfidence(
        recentDetections.filter(d => d.language === detectionResult.language)
      );
      
      if (avgConfidenceForLang > 0.7) {
        adjustedScore += 10;
      }
    }

    // Context 4: Language pair logic
    const isCommonPair = this.isCommonLanguagePair(
      detectionResult.language, 
      context.sourceLanguage, 
      context.targetLanguage
    );
    
    if (isCommonPair) {
      adjustedScore += 5;
    }

    // Check if adjustments changed the top language
    if (detectionResult.alternativeLanguages) {
      for (const alt of detectionResult.alternativeLanguages) {
        let altAdjustedScore = alt.score;
        
        // Apply same contextual adjustments to alternatives
        if (context.conversationHistory) {
          const recentLanguages = context.conversationHistory.slice(-3).map(h => h.language);
          const languageCounts = recentLanguages.reduce((counts, lang) => {
            counts[lang] = (counts[lang] || 0) + 1;
            return counts;
          }, {} as Record<string, number>);
          
          if (languageCounts[alt.language]) {
            altAdjustedScore += languageCounts[alt.language] * 15;
          }
        }
        
        // If alternative now scores higher, use it
        if (altAdjustedScore > adjustedScore) {
          finalLanguage = alt.language;
          adjustedScore = altAdjustedScore;
          adjustedConfidence = this.scoreToConfidence(altAdjustedScore);
        }
      }
    }

    return {
      language: finalLanguage,
      confidence: adjustedConfidence,
      score: adjustedScore,
      alternativeLanguages: detectionResult.alternativeLanguages
    };
  }

  /**
   * Determine target language using smart logic
   */
  private determineTargetLanguage(detectedLanguage: string, context: AutoDetectContext): string {
    // Strategy 1: If detected language matches source language, use target language
    if (detectedLanguage === context.sourceLanguage) {
      return context.targetLanguage;
    }

    // Strategy 2: If detected language matches target language, use source language
    if (detectedLanguage === context.targetLanguage) {
      return context.sourceLanguage;
    }

    // Strategy 3: For unknown detected language, use intelligent defaults
    const languagePriorities = this.getLanguagePriorities(detectedLanguage, context);
    
    // Return the highest priority language that's not the detected language
    for (const lang of languagePriorities) {
      if (lang !== detectedLanguage) {
        return lang;
      }
    }

    // Fallback: use target language
    return context.targetLanguage;
  }

  /**
   * Get language priorities based on detection and context
   */
  private getLanguagePriorities(detectedLanguage: string, context: AutoDetectContext): string[] {
    const priorities = [context.targetLanguage, context.sourceLanguage];

    // Add English as high priority if not already included
    if (!priorities.includes('en')) {
      priorities.splice(1, 0, 'en');
    }

    // Add Spanish as medium priority for certain contexts
    if (detectedLanguage === 'en' && !priorities.includes('es')) {
      priorities.splice(2, 0, 'es');
    }

    // Add other supported languages
    const otherLanguages = supportedLanguages
      .map(l => l.code)
      .filter(code => !priorities.includes(code));
    
    priorities.push(...otherLanguages);

    return priorities;
  }

  /**
   * Generate human-readable reasoning for detection result
   */
  private generateReasoning(
    originalResult: DetectionResult,
    enhancedResult: DetectionResult,
    context: AutoDetectContext
  ): string {
    const detectedLangName = this.getLanguageName(enhancedResult.language);
    const targetLangName = this.getLanguageName(
      this.determineTargetLanguage(enhancedResult.language, context)
    );

    let reasoning = `Detected ${detectedLangName}`;

    // Add confidence reasoning
    if (enhancedResult.confidence === 'high') {
      reasoning += ' with high confidence';
    } else if (enhancedResult.confidence === 'medium') {
      reasoning += ' with moderate confidence';
    } else {
      reasoning += ' with low confidence';
    }

    // Add contextual reasoning
    if (enhancedResult.score > originalResult.score) {
      reasoning += ' (improved by conversation context)';
    }

    reasoning += `, translating to ${targetLangName}`;

    return reasoning;
  }

  /**
   * Generate alternative language pair suggestions
   */
  private generateAlternatives(
    detectionResult: DetectionResult,
    context: AutoDetectContext
  ): Array<{
    source: string;
    target: string;
    confidence: number;
    reasoning: string;
  }> {
    const alternatives: Array<{
      source: string;
      target: string;
      confidence: number;
      reasoning: string;
    }> = [];

    // Add alternatives from detection service
    if (detectionResult.alternativeLanguages) {
      for (const alt of detectionResult.alternativeLanguages.slice(0, 2)) {
        const target = this.determineTargetLanguage(alt.language, context);
        alternatives.push({
          source: alt.language,
          target,
          confidence: alt.score,
          reasoning: `Alternative: ${this.getLanguageName(alt.language)} → ${this.getLanguageName(target)}`
        });
      }
    }

    // Add common language pair alternatives
    const commonPairs = [
      { source: context.sourceLanguage, target: context.targetLanguage },
      { source: context.targetLanguage, target: context.sourceLanguage }
    ];

    for (const pair of commonPairs) {
      if (!alternatives.some(alt => alt.source === pair.source && alt.target === pair.target)) {
        alternatives.push({
          source: pair.source,
          target: pair.target,
          confidence: 30,
          reasoning: `Default: ${this.getLanguageName(pair.source)} → ${this.getLanguageName(pair.target)}`
        });
      }
    }

    return alternatives.slice(0, 3); // Limit to 3 alternatives
  }

  /**
   * Get speaker-specific language bias
   */
  private getSpeakerLanguageBias(
    speaker: 'officer' | 'detained',
    context: AutoDetectContext
  ): Record<string, number> {
    // Officers are more likely to speak the primary language (English in most contexts)
    if (speaker === 'officer') {
      return {
        'en': 10,
        [context.sourceLanguage]: 5
      };
    } else {
      // Detained persons might speak various languages
      return {
        [context.targetLanguage]: 10,
        'es': 5,
        'zh': 3,
        'ar': 3
      };
    }
  }

  /**
   * Check if language pair is commonly used
   */
  private isCommonLanguagePair(detected: string, source: string, target: string): boolean {
    const commonPairs = [
      ['en', 'es'], ['es', 'en'],
      ['en', 'zh'], ['zh', 'en'],
      ['en', 'ar'], ['ar', 'en']
    ];

    return commonPairs.some(([s, t]) => 
      (detected === s && (source === t || target === t)) ||
      (detected === t && (source === s || target === s))
    );
  }

  /**
   * Calculate average confidence from detection history
   */
  private calculateAverageConfidence(detections: DetectionResult[]): number {
    if (detections.length === 0) return 0;
    
    const confidenceMap = { high: 1, medium: 0.7, low: 0.3 };
    const sum = detections.reduce((acc, d) => acc + confidenceMap[d.confidence], 0);
    
    return sum / detections.length;
  }

  /**
   * Convert score to confidence level
   */
  private scoreToConfidence(score: number): 'high' | 'medium' | 'low' {
    if (score > 50) return 'high';
    if (score > 20) return 'medium';
    return 'low';
  }

  /**
   * Get human-readable language name
   */
  private getLanguageName(code: string): string {
    const language = supportedLanguages.find(l => l.code === code);
    return language?.name || code;
  }

  /**
   * Clear detection history (useful for new sessions)
   */
  clearHistory(): void {
    this.detectionHistory = [];
    this.contextualBias.clear();
  }

  /**
   * Get detection statistics
   */
  getDetectionStats(): {
    totalDetections: number;
    languageDistribution: Record<string, number>;
    averageConfidence: number;
  } {
    const languageDistribution: Record<string, number> = {};
    let totalConfidence = 0;

    for (const detection of this.detectionHistory) {
      languageDistribution[detection.language] = 
        (languageDistribution[detection.language] || 0) + 1;
      
      const confidenceMap = { high: 1, medium: 0.7, low: 0.3 };
      totalConfidence += confidenceMap[detection.confidence];
    }

    return {
      totalDetections: this.detectionHistory.length,
      languageDistribution,
      averageConfidence: this.detectionHistory.length > 0 
        ? totalConfidence / this.detectionHistory.length 
        : 0
    };
  }
}
