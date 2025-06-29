export interface IntakeQuestion {
  en: string;
  es: string;
  zh: string;
  ar: string;
}

export const intakeQuestions = {
  identification: {
    en: "Do you have any identification?",
    es: "¿Tiene alguna identificación?",
    zh: "您有身份证件吗？",
    ar: "هل لديك أي هوية؟"
  },
  name: {
    en: "What is your name?",
    es: "¿Cuál es su nombre?",
    zh: "您叫什么名字？",
    ar: "ما اسمك؟"
  },
  country: {
    en: "What country are you from?",
    es: "¿De qué país es usted?",
    zh: "您来自哪个国家？",
    ar: "من أي بلد أنت؟"
  },
  passport: {
    en: "What is your passport number?",
    es: "¿Cuál es su número de pasaporte?",
    zh: "您的护照号码是什么？",
    ar: "ما هو رقم جواز سفرك؟"
  }
} as const;

export type IntakeQuestionKey = keyof typeof intakeQuestions;
