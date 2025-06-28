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
  { en: "Please remain calm", es: "Por favor manténgase tranquilo", category: "reassurance" },
  { en: "We will help you", es: "Le vamos a ayudar", category: "reassurance" },
  { en: "Everything will be okay", es: "Todo va a estar bien", category: "reassurance" },
  { en: "You are safe now", es: "Ahora está seguro", category: "reassurance" },
  { en: "We are here to help", es: "Estamos aquí para ayudar", category: "reassurance" },
  { en: "Don't worry", es: "No se preocupe", category: "reassurance" },
  
  // Communication
  { en: "Do you speak English?", es: "¿Habla inglés?", category: "communication" },
  { en: "Do you understand?", es: "¿Entiende usted?", category: "communication" },
  { en: "Please speak slowly", es: "Por favor hable despacio", category: "communication" },
  { en: "Can you repeat that?", es: "¿Puede repetir eso?", category: "communication" },
  { en: "I don't understand", es: "No entiendo", category: "communication" },
  { en: "Please wait for the translator", es: "Por favor espere al traductor", category: "communication" },
  
  // Instructions
  { en: "Please wait here", es: "Por favor espere aquí", category: "instructions" },
  { en: "Follow me please", es: "Síganme por favor", category: "instructions" },
  { en: "Sit down here", es: "Siéntese aquí", category: "instructions" },
  { en: "Please stand up", es: "Por favor póngase de pie", category: "instructions" },
  { en: "Put your hands where I can see them", es: "Ponga las manos donde pueda verlas", category: "instructions" },
  { en: "Please step back", es: "Por favor retroceda", category: "instructions" },
  { en: "Stay where you are", es: "Quédese donde está", category: "instructions" },
  
  // Basic needs
  { en: "Do you need water?", es: "¿Necesita agua?", category: "basic needs" },
  { en: "Are you hungry?", es: "¿Tiene hambre?", category: "basic needs" },
  { en: "Do you need to use the bathroom?", es: "¿Necesita usar el baño?", category: "basic needs" },
  { en: "Are you thirsty?", es: "¿Tiene sed?", category: "basic needs" },
  { en: "Do you need a blanket?", es: "¿Necesita una manta?", category: "basic needs" },
  { en: "Are you cold?", es: "¿Tiene frío?", category: "basic needs" },
  { en: "Are you hot?", es: "¿Tiene calor?", category: "basic needs" }
];

export const intakePhrases: Phrase[] = [
  { en: "Do you have any identification?", es: "¿Tiene alguna identificación?", category: "intake" },
  { en: "What is your name?", es: "¿Cuál es su nombre?", category: "intake" },
  { en: "Where are you from?", es: "¿De dónde es usted?", category: "intake" },
  { en: "What country are you from?", es: "¿De qué país es usted?", category: "intake" },
  { en: "Please spell your name", es: "Por favor deletree su nombre", category: "intake" },
  { en: "Do you have a passport?", es: "¿Tiene pasaporte?", category: "intake" },
  { en: "What is your passport number?", es: "¿Cuál es su número de pasaporte?", category: "intake" },
  { en: "When did you arrive?", es: "¿Cuándo llegó?", category: "intake" },
  { en: "How did you get here?", es: "¿Cómo llegó aquí?", category: "intake" },
  { en: "Are you traveling alone?", es: "¿Está viajando solo?", category: "intake" }
];

export const categories = [
  "medical", 
  "family",
  "reassurance",
  "communication",
  "instructions",
  "basic needs"
];