export const languageUtils = {
  detectLanguage: (text: string): string => {
    const spanishIndicators = [
      'el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'una', 'tiene', 'tu', 'del', 'está', 'pero', 'todo', 'como', 'muy', 'ya', 'yo', 'este', 'si', 'porque', 'sobre', 'entre', 'desde', 'hasta', 'donde', 'cuando', 'quien', 'cual', 'soy', 'eres', 'somos', 'son', 'tengo', 'tienes', 'tenemos', 'tienen', 'hablo', 'hablas', 'hablamos', 'hablan', 'necesito', 'necesitas', 'necesitamos', 'necesitan', 'hola', 'gracias', 'buenos', 'buenas', 'días', 'tardes', 'noches', 'disculpe', 'ayuda', 'agua', 'niños', 'hijos', 'familia', 'médico', 'doctor', 'enfermo', 'herido', 'bien', 'mal', 'aquí', 'allí', 'dónde', 'cuándo', 'cómo', 'qué', 'quién', 'cuál', 'mi', 'tu', 'su', 'nuestro', 'vuestro', 'amigo', 'amiga', 'señor', 'señora', 'niño', 'niña'
    ];
    
    const chineseIndicators = [
      '的', '一', '是', '在', '不', '了', '有', '和', '人', '这', '中', '大', '为', '上', '个', '国', '我', '以', '要', '他', '时', '来', '用', '们', '生', '到', '作', '地', '于', '出', '就', '分', '对', '成', '会', '可', '主', '发', '年', '动', '同', '工', '也', '能', '下', '过', '子', '说', '产', '种', '面', '而', '方', '后', '多', '定', '行', '学', '法', '所', '民', '得', '经', '十', '三', '之', '进', '着', '等', '部', '度', '家', '电', '力', '里', '如', '水', '化', '高', '自', '二', '理', '起', '小', '物', '现', '实', '加', '量', '都', '两', '体', '制', '机', '当', '使', '点', '从', '业', '本', '去', '把', '性', '好', '应', '开', '它', '合', '还', '因', '由', '其', '些', '然', '前', '外', '天', '政', '四', '日', '那', '社', '义', '事', '平', '形', '相', '全', '表', '间', 'تم', 'أن', 'كان', 'لا', 'في', 'من', 'إلى', 'كل', 'هذا', 'التي', 'قد', 'كما', 'لم', 'عن', 'مع', 'إذا', 'كانت', 'لكن', 'التي', 'ما', 'هو', 'أو', 'أي', 'بعد', 'هي', 'ذلك', 'عند', 'عليه', 'بين', 'نحن', 'أنت', 'هم', 'هن', 'أنا', 'أنها', 'لها', 'له', 'نعم', 'لماذا', 'كيف', 'أين', 'متى', 'أجل', 'شكرا', 'عفوا', 'مرحبا', 'وداعا', 'طفل', 'أطفال', 'عائلة', 'طبيب', 'مريض', 'مساعدة', 'ماء', 'طعام', 'منزل', 'سيارة', 'عمل', 'مدرسة', 'كتاب', 'يوم', 'ليلة', 'صباح', 'مساء'
    ];
    
    const arabicIndicators = [
      'في', 'من', 'إلى', 'على', 'أن', 'كان', 'لا', 'ما', 'هو', 'أو', 'كل', 'هذا', 'التي', 'قد', 'كما', 'لم', 'عن', 'مع', 'إذا', 'كانت', 'لكن', 'أي', 'بعد', 'هي', 'ذلك', 'عند', 'عليه', 'بين', 'نحن', 'أنت', 'هم', 'هن', 'أنا', 'أنها', 'لها', 'له', 'نعم', 'لماذا', 'كيف', 'أين', 'متى', 'أجل', 'شكرا', 'عفوا', 'مرحبا', 'وداعا', 'طفل', 'أطفال', 'عائلة', 'طبيب', 'مريض', 'مساعدة', 'ماء', 'طعام', 'منزل', 'سيارة', 'عمل', 'مدرسة', 'كتاب', 'يوم', 'ليلة', 'صباح', 'مساء', 'سلام', 'حال', 'خير', 'بخير', 'الله', 'إن شاء الله', 'ما شاء الله', 'بسم الله'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    let spanishScore = 0;
    let chineseScore = 0;
    let arabicScore = 0;
    const totalWords = words.length;
    
    // Check for Chinese characters
    if (/[\u4e00-\u9fff]/.test(text)) {
      chineseScore += totalWords * 0.5; // Heavy weight for Chinese characters
    }
    
    // Check for Arabic characters
    if (/[\u0600-\u06ff]/.test(text)) {
      arabicScore += totalWords * 0.5; // Heavy weight for Arabic characters
    }
    
    words.forEach(word => {
      // Remove punctuation for better matching
      const cleanWord = word.replace(/[.,!?¿¡]/g, '');
      
      if (spanishIndicators.includes(cleanWord)) {
        spanishScore++;
      }
      if (chineseIndicators.includes(cleanWord)) {
        chineseScore++;
      }
      if (arabicIndicators.includes(cleanWord)) {
        arabicScore++;
      }
    });
    
    // Calculate percentages
    const spanishPercentage = (spanishScore / totalWords) * 100;
    const chinesePercentage = (chineseScore / totalWords) * 100;
    const arabicPercentage = (arabicScore / totalWords) * 100;
    
    // Determine language based on highest score
    const threshold = 15;
    
    if (chinesePercentage > threshold && chinesePercentage >= spanishPercentage && chinesePercentage >= arabicPercentage) {
      return 'zh';
    } else if (arabicPercentage > threshold && arabicPercentage >= spanishPercentage && arabicPercentage >= chinesePercentage) {
      return 'ar';
    } else if (spanishPercentage > threshold) {
      return 'es';
    }
    
    // Default to English if no strong indicators
    return 'en';
  }
};