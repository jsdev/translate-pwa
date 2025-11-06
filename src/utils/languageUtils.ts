export const languageUtils = {
  detectLanguage: (text: string): string => {
    const spanishIndicators = [
      'el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'una', 'tiene', 'tu', 'del', 'está', 'pero', 'todo', 'como', 'muy', 'ya', 'yo', 'este', 'si', 'porque', 'sobre', 'entre', 'desde', 'hasta', 'donde', 'cuando', 'quien', 'cual', 'soy', 'eres', 'somos', 'son', 'tengo', 'tienes', 'tenemos', 'tienen', 'hablo', 'hablas', 'hablamos', 'hablan', 'necesito', 'necesitas', 'necesitamos', 'necesitan', 'hola', 'gracias', 'buenos', 'buenas', 'días', 'tardes', 'noches', 'disculpe', 'ayuda', 'agua', 'niños', 'hijos', 'familia', 'médico', 'doctor', 'enfermo', 'herido', 'bien', 'mal', 'aquí', 'allí', 'dónde', 'cuándo', 'cómo', 'qué', 'quién', 'cuál', 'mi', 'tu', 'su', 'nuestro', 'vuestro', 'amigo', 'amiga', 'señor', 'señora', 'niño', 'niña'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    let spanishScore = 0;
    const totalWords = words.length;
    
    words.forEach(word => {
      // Remove punctuation for better matching
      const cleanWord = word.replace(/[.,!?¿¡]/g, '');
      if (spanishIndicators.includes(cleanWord)) {
        spanishScore++;
      }
    });
    
    // Calculate percentage of Spanish words
    const spanishPercentage = (spanishScore / totalWords) * 100;
    
    // If more than 20% of words are Spanish indicators, consider it Spanish
    return spanishPercentage > 20 ? 'es' : 'en';
  }
};