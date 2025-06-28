export interface Phrase {
  en: string;
  es: string;
  zh: string;
  ar: string;
  category: string;
}

export const phrases: Phrase[] = [
  // Medical
  { 
    en: "Do you need medical attention?", 
    es: "¿Necesita atención médica?", 
    zh: "您需要医疗救助吗？",
    ar: "هل تحتاج إلى عناية طبية؟",
    category: "medical" 
  },
  { 
    en: "Are you injured?", 
    es: "¿Está herido?", 
    zh: "您受伤了吗？",
    ar: "هل أنت مصاب؟",
    category: "medical" 
  },
  { 
    en: "Do you take any medications?", 
    es: "¿Toma algún medicamento?", 
    zh: "您在服用任何药物吗？",
    ar: "هل تتناول أي أدوية؟",
    category: "medical" 
  },
  { 
    en: "Are you feeling sick?", 
    es: "¿Se siente enfermo?", 
    zh: "您感觉不舒服吗？",
    ar: "هل تشعر بالمرض؟",
    category: "medical" 
  },
  { 
    en: "Do you have any allergies?", 
    es: "¿Tiene alguna alergia?", 
    zh: "您有任何过敏症吗？",
    ar: "هل لديك أي حساسية؟",
    category: "medical" 
  },
  { 
    en: "Do you need to see a doctor?", 
    es: "¿Necesita ver a un doctor?", 
    zh: "您需要看医生吗？",
    ar: "هل تحتاج لرؤية طبيب؟",
    category: "medical" 
  },
  { 
    en: "Where does it hurt?", 
    es: "¿Dónde le duele?", 
    zh: "哪里疼？",
    ar: "أين تشعر بالألم؟",
    category: "medical" 
  },
  
  // Family
  { 
    en: "Are you traveling with family?", 
    es: "¿Está viajando con familia?", 
    zh: "您和家人一起旅行吗？",
    ar: "هل تسافر مع العائلة؟",
    category: "family" 
  },
  { 
    en: "Do you have children with you?", 
    es: "¿Tiene niños con usted?", 
    zh: "您带着孩子吗？",
    ar: "هل لديك أطفال معك؟",
    category: "family" 
  },
  { 
    en: "Where are your children?", 
    es: "¿Dónde están sus niños?", 
    zh: "您的孩子在哪里？",
    ar: "أين أطفالك؟",
    category: "family" 
  },
  { 
    en: "How many children do you have?", 
    es: "¿Cuántos niños tiene?", 
    zh: "您有几个孩子？",
    ar: "كم عدد الأطفال لديك؟",
    category: "family" 
  },
  { 
    en: "Are your children safe?", 
    es: "¿Están seguros sus niños?", 
    zh: "您的孩子安全吗？",
    ar: "هل أطفالك بأمان؟",
    category: "family" 
  },
  { 
    en: "Who is caring for your children?", 
    es: "¿Quién está cuidando a sus niños?", 
    zh: "谁在照顾您的孩子？",
    ar: "من يرعى أطفالك؟",
    category: "family" 
  },
  { 
    en: "Do you have family in the United States?", 
    es: "¿Tiene familia en los Estados Unidos?", 
    zh: "您在美国有家人吗？",
    ar: "هل لديك عائلة في الولايات المتحدة؟",
    category: "family" 
  },
  
  // Reassurance
  { 
    en: "Please remain calm", 
    es: "Por favor manténgase tranquilo", 
    zh: "请保持冷静",
    ar: "من فضلك ابق هادئاً",
    category: "reassurance" 
  },
  { 
    en: "We will help you", 
    es: "Le vamos a ayudar", 
    zh: "我们会帮助您",
    ar: "سوف نساعدك",
    category: "reassurance" 
  },
  { 
    en: "Everything will be okay", 
    es: "Todo va a estar bien", 
    zh: "一切都会好的",
    ar: "كل شيء سيكون على ما يرام",
    category: "reassurance" 
  },
  { 
    en: "You are safe now", 
    es: "Ahora está seguro", 
    zh: "您现在安全了",
    ar: "أنت بأمان الآن",
    category: "reassurance" 
  },
  { 
    en: "We are here to help", 
    es: "Estamos aquí para ayudar", 
    zh: "我们在这里帮助您",
    ar: "نحن هنا لنساعدك",
    category: "reassurance" 
  },
  { 
    en: "Don't worry", 
    es: "No se preocupe", 
    zh: "别担心",
    ar: "لا تقلق",
    category: "reassurance" 
  },
  
  // Communication
  { 
    en: "Do you speak English?", 
    es: "¿Habla inglés?", 
    zh: "您会说英语吗？",
    ar: "هل تتكلم الإنجليزية؟",
    category: "communication" 
  },
  { 
    en: "Do you understand?", 
    es: "¿Entiende usted?", 
    zh: "您明白吗？",
    ar: "هل تفهم؟",
    category: "communication" 
  },
  { 
    en: "Please speak slowly", 
    es: "Por favor hable despacio", 
    zh: "请说慢一点",
    ar: "من فضلك تكلم ببطء",
    category: "communication" 
  },
  { 
    en: "Can you repeat that?", 
    es: "¿Puede repetir eso?", 
    zh: "您能重复一遍吗？",
    ar: "هل يمكنك تكرار ذلك؟",
    category: "communication" 
  },
  { 
    en: "I don't understand", 
    es: "No entiendo", 
    zh: "我不明白",
    ar: "لا أفهم",
    category: "communication" 
  },
  { 
    en: "Please wait for the translator", 
    es: "Por favor espere al traductor", 
    zh: "请等待翻译员",
    ar: "من فضلك انتظر المترجم",
    category: "communication" 
  },
  
  // Instructions
  { 
    en: "Please wait here", 
    es: "Por favor espere aquí", 
    zh: "请在这里等待",
    ar: "من فضلك انتظر هنا",
    category: "instructions" 
  },
  { 
    en: "Follow me please", 
    es: "Síganme por favor", 
    zh: "请跟我来",
    ar: "من فضلك اتبعني",
    category: "instructions" 
  },
  { 
    en: "Sit down here", 
    es: "Siéntese aquí", 
    zh: "请坐在这里",
    ar: "اجلس هنا",
    category: "instructions" 
  },
  { 
    en: "Please stand up", 
    es: "Por favor póngase de pie", 
    zh: "请站起来",
    ar: "من فضلك قف",
    category: "instructions" 
  },
  { 
    en: "Put your hands where I can see them", 
    es: "Ponga las manos donde pueda verlas", 
    zh: "把手放在我能看见的地方",
    ar: "ضع يديك حيث يمكنني رؤيتهما",
    category: "instructions" 
  },
  { 
    en: "Please step back", 
    es: "Por favor retroceda", 
    zh: "请后退",
    ar: "من فضلك تراجع للخلف",
    category: "instructions" 
  },
  { 
    en: "Stay where you are", 
    es: "Quédese donde está", 
    zh: "待在原地",
    ar: "ابق مكانك",
    category: "instructions" 
  },
  
  // Basic Needs
  { 
    en: "Do you need water?", 
    es: "¿Necesita agua?", 
    zh: "您需要水吗？",
    ar: "هل تحتاج إلى ماء؟",
    category: "basic needs" 
  },
  { 
    en: "Are you hungry?", 
    es: "¿Tiene hambre?", 
    zh: "您饿了吗？",
    ar: "هل أنت جائع؟",
    category: "basic needs" 
  },
  { 
    en: "Do you need to use the bathroom?", 
    es: "¿Necesita usar el baño?", 
    zh: "您需要上厕所吗？",
    ar: "هل تحتاج إلى استخدام دورة المياه؟",
    category: "basic needs" 
  },
  { 
    en: "Are you tired?", 
    es: "¿Está cansado?", 
    zh: "您累了吗？",
    ar: "هل أنت متعب؟",
    category: "basic needs" 
  },
  { 
    en: "Do you need rest?", 
    es: "¿Necesita descansar?", 
    zh: "您需要休息吗？",
    ar: "هل تحتاج إلى راحة؟",
    category: "basic needs" 
  },
  { 
    en: "Do you need food?", 
    es: "¿Necesita comida?", 
    zh: "您需要食物吗？",
    ar: "هل تحتاج إلى طعام؟",
    category: "basic needs" 
  }
];

export const categories = [
  'medical',
  'family', 
  'reassurance',
  'communication',
  'instructions',
  'basic needs'
];
