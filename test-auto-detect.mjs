import { LanguageDetectionService } from '../src/services/languageDetectionService';
import { AutoDetectModeManager } from '../src/services/autoDetectModeManager';

// Test the enhanced language detection
console.log('🧪 Testing Enhanced Language Detection Service...\n');

const detectionService = new LanguageDetectionService();
const autoDetectManager = new AutoDetectModeManager();

// Test cases for different languages
const testCases = [
  {
    text: "Hello, how are you today? I need some help with directions.",
    expectedLanguage: 'en',
    description: 'English text'
  },
  {
    text: "Hola, ¿cómo está usted? Necesito ayuda médica para mi hijo.",
    expectedLanguage: 'es',
    description: 'Spanish text'
  },
  {
    text: "你好，我需要帮助。请问医院在哪里？",
    expectedLanguage: 'zh',
    description: 'Chinese text'
  },
  {
    text: "السلام عليكم، أحتاج مساعدة. أين المستشفى؟",
    expectedLanguage: 'ar',
    description: 'Arabic text'
  },
  {
    text: "Help me please",
    expectedLanguage: 'en',
    description: 'Short English phrase'
  },
  {
    text: "Gracias doctor",
    expectedLanguage: 'es',
    description: 'Short Spanish phrase'
  }
];

console.log('=== Language Detection Service Tests ===\n');

for (const testCase of testCases) {
  const result = detectionService.detectLanguage(testCase.text);
  const isCorrect = result.language === testCase.expectedLanguage;
  
  console.log(`📝 ${testCase.description}:`);
  console.log(`   Text: "${testCase.text}"`);
  console.log(`   Expected: ${testCase.expectedLanguage}`);
  console.log(`   Detected: ${result.language} (${result.confidence} confidence, score: ${result.score.toFixed(1)})`);
  console.log(`   Result: ${isCorrect ? '✅ PASS' : '❌ FAIL'}`);
  
  if (result.alternativeLanguages && result.alternativeLanguages.length > 0) {
    console.log(`   Alternatives: ${result.alternativeLanguages.map(alt => `${alt.language}(${alt.score.toFixed(1)})`).join(', ')}`);
  }
  console.log('');
}

console.log('\n=== Auto Detect Mode Manager Tests ===\n');

// Test auto-detect with context
const contexts = [
  {
    sourceLanguage: 'en',
    targetLanguage: 'es',
    speakerType: 'officer',
    description: 'Officer speaking (EN → ES context)'
  },
  {
    sourceLanguage: 'en',
    targetLanguage: 'es',
    speakerType: 'detained',
    description: 'Detained person speaking (EN → ES context)'
  },
  {
    sourceLanguage: 'en',
    targetLanguage: 'zh',
    speakerType: 'officer',
    description: 'Officer speaking (EN → ZH context)'
  }
];

for (const context of contexts) {
  console.log(`🎯 Context: ${context.description}`);
  
  for (const testCase of testCases.slice(0, 3)) { // Test first 3 cases
    const result = autoDetectManager.detectLanguageWithContext(testCase.text, context);
    
    console.log(`   Text: "${testCase.text.substring(0, 30)}..."`);
    console.log(`   Detected: ${result.detectedLanguage} → ${result.targetLanguage}`);
    console.log(`   Confidence: ${result.confidence}`);
    console.log(`   Reasoning: ${result.reasoning}`);
    console.log('');
  }
}

console.log('=== Detection Statistics ===\n');
const stats = autoDetectManager.getDetectionStats();
console.log(`Total detections: ${stats.totalDetections}`);
console.log(`Average confidence: ${(stats.averageConfidence * 100).toFixed(1)}%`);
console.log(`Language distribution:`, stats.languageDistribution);

console.log('\n🎉 Enhanced Auto Detect testing complete!');
