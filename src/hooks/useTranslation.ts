export const useTranslation = () => {
  const mockTranslations: Record<string, string> = {
    // English to Spanish
    'hello': 'hola',
    'hi': 'hola',
    'how are you': 'cómo estás',
    'thank you': 'gracias',
    'yes': 'sí',
    'no': 'no',
    'help': 'ayuda',
    'please': 'por favor',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good evening': 'buenas noches',
    'excuse me': 'disculpe',
    'sorry': 'lo siento',
    'my name is': 'mi nombre es',
    'what is your name': 'cuál es su nombre',
    'where are you from': 'de dónde es usted',
    'i need help': 'necesito ayuda',
    'do you speak english': 'habla inglés',
    'do you need medical attention': 'necesita atención médica',
    'are you traveling with family': 'está viajando con familia',
    'do you have identification': 'tiene identificación',
    'please remain calm': 'por favor manténgase tranquilo',
    'we will help you': 'le vamos a ayudar',
    'do you understand': 'entiende usted',
    'please wait here': 'por favor espere aquí',
    'are you injured': 'está herido',
    'do you need water': 'necesita agua',
    'follow me please': 'síganme por favor',
    'sit down here': 'siéntese aquí',
    'everything will be okay': 'todo va a estar bien',
    'say hello to my little friend': 'di hola a mi pequeño amigo',
    'i am agent rodrigo': 'soy el agente rodrigo',
    'what is going to happen next': 'qué va a pasar después',
    'my friend do you have kids': 'mi amigo tienes hijos',
    'do you have children': 'tienes hijos',
    'where are your children': 'dónde están tus hijos',
    'are you okay': 'estás bien',
    'we are here to help': 'estamos aquí para ayudar',
    
    // Spanish to English
    'hola': 'hello',
    'cómo estás': 'how are you', 
    'gracias': 'thank you',
    'sí': 'yes',
    'ayuda': 'help',
    'por favor': 'please',
    'buenos días': 'good morning',
    'buenas tardes': 'good afternoon',
    'buenas noches': 'good evening',
    'disculpe': 'excuse me',
    'lo siento': 'sorry',
    'mi nombre es': 'my name is',
    'necesito ayuda': 'i need help',
    'no entiendo': 'i don\'t understand',
    'puede ayudarme': 'can you help me',
    'dónde está el baño': 'where is the bathroom',
    'tengo hambre': 'i am hungry',
    'tengo sed': 'i am thirsty',
    'estoy enfermo': 'i am sick',
    'necesito un doctor': 'i need a doctor',
    'tienes hijos': 'do you have children',
    'dónde están tus hijos': 'where are your children',
    'estás bien': 'are you okay',
    'estamos aquí para ayudar': 'we are here to help',
    'di hola a mi pequeño amigo': 'say hello to my little friend',
    'soy el agente rodrigo': 'i am agent rodrigo',
    'qué va a pasar después': 'what is going to happen next',
    'mi amigo tienes hijos': 'my friend do you have kids'
  };

  const translate = async (text: string, fromLang: string, toLang: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerText = text.toLowerCase().trim();
    
    // Try exact match first
    const exactTranslation = mockTranslations[lowerText];
    if (exactTranslation) {
      return exactTranslation;
    }
    
    // Try partial matches for longer sentences
    const words = lowerText.split(' ');
    for (const [key, value] of Object.entries(mockTranslations)) {
      if (lowerText.includes(key) || key.includes(lowerText)) {
        return value;
      }
    }
    
    // Basic word-by-word translation for unknown phrases
    const translatedWords = words.map(word => {
      const cleanWord = word.replace(/[.,!?]/g, '');
      return mockTranslations[cleanWord] || word;
    });
    
    const result = translatedWords.join(' ');
    
    // If no translation found, provide a basic structure
    if (result === lowerText) {
      if (fromLang === 'en' && toLang === 'es') {
        return `[Traducción necesaria: ${text}]`;
      } else {
        return `[Translation needed: ${text}]`;
      }
    }
    
    return result;
  };

  return { translate };
};