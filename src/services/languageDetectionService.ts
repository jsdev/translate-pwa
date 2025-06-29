// Language detection service with enhanced algorithms

export interface DetectionResult {
  language: string;
  confidence: 'high' | 'medium' | 'low';
  score: number;
  alternativeLanguages?: Array<{ language: string; score: number }>;
}

export interface LanguagePattern {
  code: string;
  patterns: {
    words: string[];
    characters?: RegExp;
    phrases?: string[];
    grammar?: RegExp[];
  };
  weights: {
    characters: number;
    words: number;
    phrases: number;
    grammar: number;
  };
}

export class LanguageDetectionService {
  private patterns: LanguagePattern[] = [
    {
      code: 'en',
      patterns: {
        words: [
          'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
          'this', 'but', 'his', 'by', 'from', 'they', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
          'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just',
          'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then',
          'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
          'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are',
          'been', 'has', 'had', 'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'if', 'up', 'out', 'many', 'then',
          'them', 'these', 'so', 'some', 'her', 'would', 'make', 'like', 'into', 'him', 'has', 'two', 'more', 'very', 'what', 'know',
          'just', 'first', 'get', 'over', 'think', 'also', 'your', 'work', 'life', 'only', 'can', 'still', 'should', 'after', 'being',
          'now', 'made', 'before', 'here', 'through', 'when', 'where', 'much', 'go', 'me', 'back', 'with', 'well', 'were', 'been',
          'have', 'there', 'who', 'oil', 'its', 'sit', 'but', 'not'
        ],
        phrases: [
          'how are you', 'thank you', 'excuse me', 'i need help', 'where is', 'what time', 'how much',
          'my name is', 'i don\'t understand', 'do you speak', 'i\'m looking for', 'can you help me',
          'i\'m from', 'i live in', 'i work as', 'i have a', 'this is my', 'i would like'
        ],
        grammar: [
          /\b(is|are|was|were|am)\s+\w+ing\b/i, // Present/past continuous
          /\b(have|has|had)\s+\w+ed\b/i, // Perfect tenses
          /\b(the|a|an)\s+\w+\b/i, // Articles
          /\b\w+s\s+(is|are)\b/i // Plural subjects
        ]
      },
      weights: {
        characters: 0.1,
        words: 1.0,
        phrases: 2.0,
        grammar: 1.5
      }
    },
    {
      code: 'es',
      patterns: {
        words: [
          'el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'una',
          'tiene', 'tu', 'del', 'está', 'pero', 'todo', 'como', 'muy', 'ya', 'yo', 'este', 'si', 'porque', 'sobre', 'entre', 'desde',
          'hasta', 'donde', 'cuando', 'quien', 'cual', 'soy', 'eres', 'somos', 'son', 'tengo', 'tienes', 'tenemos', 'tienen', 'hablo',
          'hablas', 'hablamos', 'hablan', 'necesito', 'necesitas', 'necesitamos', 'necesitan', 'hola', 'gracias', 'buenos', 'buenas',
          'días', 'tardes', 'noches', 'disculpe', 'ayuda', 'agua', 'niños', 'hijos', 'familia', 'médico', 'doctor', 'enfermo', 'herido',
          'bien', 'mal', 'aquí', 'allí', 'dónde', 'cuándo', 'cómo', 'qué', 'quién', 'cuál', 'mi', 'tu', 'su', 'nuestro', 'vuestro',
          'amigo', 'amiga', 'señor', 'señora', 'niño', 'niña', 'casa', 'trabajo', 'escuela', 'hospital', 'policía', 'abogado', 'dinero',
          'tiempo', 'nombre', 'apellido', 'edad', 'años', 'meses', 'días', 'horas', 'minutos', 'segundo', 'primero', 'último', 'grande',
          'pequeño', 'alto', 'bajo', 'gordo', 'flaco', 'nuevo', 'viejo', 'joven', 'mayor', 'menor', 'mejor', 'peor', 'más', 'menos',
          'mucho', 'poco', 'bastante', 'demasiado', 'nada', 'algo', 'alguien', 'nadie', 'siempre', 'nunca', 'ahora', 'después', 'antes',
          'durante', 'mientras', 'también', 'tampoco', 'solo', 'solamente', 'además', 'sin embargo', 'aunque', 'sino', 'pero', 'y', 'o'
        ],
        phrases: [
          'cómo está', 'muchas gracias', 'de nada', 'disculpe', 'necesito ayuda', 'dónde está', 'qué hora es', 'cuánto cuesta',
          'me llamo', 'no entiendo', 'habla inglés', 'estoy buscando', 'puede ayudarme', 'soy de', 'vivo en', 'trabajo como',
          'tengo un', 'este es mi', 'me gustaría', 'por favor', 'con permiso', 'lo siento'
        ],
        grammar: [
          /\b(está|están|estoy|estás|estamos)\s+\w+ndo\b/i, // Present continuous
          /\b(he|has|ha|hemos|habéis|han)\s+\w+do\b/i, // Perfect tenses
          /\b(el|la|los|las)\s+\w+\b/i, // Articles
          /\b\w+s\s+(están|son)\b/i // Plural subjects
        ]
      },
      weights: {
        characters: 0.1,
        words: 1.0,
        phrases: 2.0,
        grammar: 1.5
      }
    },
    {
      code: 'zh',
      patterns: {
        characters: /[\u4e00-\u9fff]/,
        words: [
          '的', '一', '是', '在', '不', '了', '有', '和', '人', '这', '中', '大', '为', '上', '个', '国', '我', '以', '要', '他',
          '时', '来', '用', '们', '生', '到', '作', '地', '于', '出', '就', '分', '对', '成', '会', '可', '主', '发', '年', '动',
          '同', '工', '也', '能', '下', '过', '子', '说', '产', '种', '面', '而', '方', '后', '多', '定', '行', '学', '法', '所',
          '民', '得', '经', '十', '三', '之', '进', '着', '等', '部', '度', '家', '电', '力', '里', '如', '水', '化', '高', '自',
          '二', '理', '起', '小', '物', '现', '实', '加', '量', '都', '两', '体', '制', '机', '当', '使', '点', '从', '业', '本',
          '去', '把', '性', '好', '应', '开', '它', '合', '还', '因', '由', '其', '些', '然', '前', '外', '天', '政', '四', '日',
          '那', '社', '义', '事', '平', '形', '相', '全', '表', '间', '样', '与', '关', '各', '重', '新', '线', '内', '数', '正',
          '心', '反', '你', '明', '看', '原', '又', '么', '利', '比', '或', '但', '质', '气', '第', '向', '道', '命', '此', '变',
          '条', '只', '没', '结', '解', '问', '意', '建', '月', '公', '无', '系', '军', '很', '情', ' 知', '见', '力', '名', '通',
          '手', '几', '先', '做', '拿', '给', '走', '吃', '喝', '睡', '住', '说话', '听', '看见', '知道', '认识', '记得', '忘记'
        ],
        phrases: [
          '你好', '谢谢', '不客气', '对不起', '请问', '我不懂', '帮助我', '在哪里', '多少钱', '几点了',
          '我叫', '我是', '我来自', '我住在', '我需要', '请帮助', '谢谢你', '没关系', '再见'
        ],
        grammar: [
          /\b\w+了\b/i, // Completed action particle
          /\b\w+的\w+\b/i, // Possessive particle
          /\b不\w+\b/i, // Negation
          /\b很\w+\b/i // Intensifier
        ]
      },
      weights: {
        characters: 3.0,
        words: 1.0,
        phrases: 2.0,
        grammar: 1.5
      }
    },
    {
      code: 'ar',
      patterns: {
        characters: /[\u0600-\u06ff]/,
        words: [
          'في', 'من', 'إلى', 'على', 'أن', 'كان', 'لا', 'ما', 'هو', 'أو', 'كل', 'هذا', 'التي', 'قد', 'كما', 'لم', 'عن',
          'مع', 'إذا', 'كانت', 'لكن', 'أي', 'بعد', 'هي', 'ذلك', 'عند', 'عليه', 'بين', 'نحن', 'أنت', 'هم', 'هن', 'أنا',
          'أنها', 'لها', 'له', 'نعم', 'لماذا', 'كيف', 'أين', 'متى', 'أجل', 'شكرا', 'عفوا', 'مرحبا', 'وداعا', 'طفل', 'أطفال',
          'عائلة', 'طبيب', 'مريض', 'مساعدة', 'ماء', 'طعام', 'منزل', 'سيارة', 'عمل', 'مدرسة', 'كتاب', 'يوم', 'ليلة', 'صباح',
          'مساء', 'سلام', 'حال', 'خير', 'بخير', 'الله', 'إن شاء الله', 'ما شاء الله', 'بسم الله', 'الحمد لله', 'سبحان الله',
          'استغفر الله', 'لا إله إلا الله', 'الله أكبر', 'حسبي الله', 'توكلت على الله', 'بارك الله', 'جزاك الله', 'رحمه الله',
          'غفر الله', 'هداه الله', 'وفقه الله', 'حفظه الله', 'شفاه الله', 'رزقه الله', 'أعانه الله', 'نصره الله', 'أيده الله',
          'بركة', 'رحمة', 'مغفرة', 'هداية', 'توفيق', 'حفظ', 'شفاء', 'رزق', 'إعانة', 'نصر', 'تأييد', 'كرامة', 'عزة', 'قوة'
        ],
        phrases: [
          'السلام عليكم', 'وعليكم السلام', 'أهلا وسهلا', 'مرحبا بك', 'كيف حالك', 'الحمد لله', 'بخير والحمد لله',
          'ما اسمك', 'اسمي', 'من أين أنت', 'أنا من', 'أحتاج مساعدة', 'هل تتكلم', 'لا أفهم', 'أعد من فضلك',
          'شكرا لك', 'عفوا', 'آسف', 'معذرة', 'أين', 'كم الساعة', 'كم السعر'
        ],
        grammar: [
          /\bال\w+\b/i, // Definite article
          /\b\w+ها\b/i, // Possessive suffix
          /\b\w+ون\b/i, // Masculine plural
          /\b\w+ات\b/i, // Feminine plural
          /\bو\w+\b/i // Conjunction
        ]
      },
      weights: {
        characters: 3.0,
        words: 1.0,
        phrases: 2.0,
        grammar: 1.5
      }
    }
  ];

  /**
   * Enhanced language detection with confidence scoring
   */
  detectLanguage(text: string): DetectionResult {
    if (!text.trim()) {
      return {
        language: 'en',
        confidence: 'low',
        score: 0
      };
    }

    const results: Array<{ language: string; score: number; details: any }> = [];

    for (const pattern of this.patterns) {
      let score = 0;
      const details = {
        characters: 0,
        words: 0,
        phrases: 0,
        grammar: 0
      };

      // Character detection (for Chinese and Arabic)
      if (pattern.patterns.characters) {
        const characterMatches = text.match(pattern.patterns.characters);
        if (characterMatches) {
          details.characters = characterMatches.length;
          score += details.characters * pattern.weights.characters;
        }
      }

      // Word detection
      const words = text.toLowerCase().split(/\s+/);
      const totalWords = words.length;
      
      words.forEach(word => {
        const cleanWord = word.replace(/[.,!?¿¡。，！？]/g, '');
        if (pattern.patterns.words.includes(cleanWord)) {
          details.words++;
        }
      });
      score += (details.words / totalWords) * pattern.weights.words * 100;

      // Phrase detection
      if (pattern.patterns.phrases) {
        for (const phrase of pattern.patterns.phrases) {
          if (text.toLowerCase().includes(phrase.toLowerCase())) {
            details.phrases++;
            score += pattern.weights.phrases * 10;
          }
        }
      }

      // Grammar pattern detection
      if (pattern.patterns.grammar) {
        for (const grammarPattern of pattern.patterns.grammar) {
          const matches = text.match(grammarPattern);
          if (matches) {
            details.grammar += matches.length;
            score += matches.length * pattern.weights.grammar;
          }
        }
      }

      results.push({
        language: pattern.code,
        score,
        details
      });
    }

    // Sort by score
    results.sort((a, b) => b.score - a.score);
    
    const topResult = results[0];
    const secondResult = results[1];

    // Determine confidence level
    let confidence: 'high' | 'medium' | 'low' = 'low';
    
    if (topResult.score > 50) {
      confidence = 'high';
    } else if (topResult.score > 20) {
      confidence = 'medium';
    }

    // If the difference between top two results is small, reduce confidence
    if (secondResult && (topResult.score - secondResult.score) < 10) {
      if (confidence === 'high') confidence = 'medium';
      else if (confidence === 'medium') confidence = 'low';
    }

    return {
      language: topResult.language,
      confidence,
      score: topResult.score,
      alternativeLanguages: results.slice(1, 3).map(r => ({
        language: r.language,
        score: r.score
      }))
    };
  }

  /**
   * Get supported languages for detection
   */
  getSupportedLanguages(): string[] {
    return this.patterns.map(p => p.code);
  }

  /**
   * Check if a language is supported for detection
   */
  isLanguageSupported(languageCode: string): boolean {
    return this.patterns.some(p => p.code === languageCode);
  }
}
