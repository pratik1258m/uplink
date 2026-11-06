export const SUPPORTED_LANGUAGES = [
  'English',
  'Spanish',
  'Italian',
  'French',
  'Arabic',
  'Chinese',
  'Hindi',
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface OnboardingStrings {
  questions: {
    help: string;
    goal: string;
    heard: string;
    tone: string;
  };
  helpOptions: {
    notes: string;
    reminders: string;
    goals: string;
    links: string;
  };
  goalOptions: {
    studies: string;
    fitness: string;
    work: string;
    learning: string;
    organized: string;
  };
  heardOptions: {
    instagram: string;
    youtube: string;
    tiktok: string;
    friends: string;
    google: string;
    other: string;
  };
  toneOptions: {
    direct: string;
    friendly: string;
    detailed: string;
  };
}

export interface AppStrings {
  knowYouBetterHeading: string;
  next: string;
  appSelectionTitle: string;
  searchPlaceholder: string;
  connectedCount: string;
  onboarding: OnboardingStrings;
}

export const STRINGS: Record<SupportedLanguage, AppStrings> = {
  English: {
    knowYouBetterHeading: 'Help me to get to\nknow you better.',
    next: 'Next',
    appSelectionTitle: 'App Selection',
    searchPlaceholder: 'Search',
    connectedCount: '{selected} of {total} connected',
    onboarding: {
      questions: {
        help: 'What do you want help with first?',
        goal: 'What are you working towards right now?',
        heard: 'Where did you hear about the app?',
        tone: 'How should I talk to you?',
      },
      helpOptions: {
        notes: 'Notes & ideas',
        reminders: 'Reminders',
        goals: 'Goals & targets',
        links: 'Saving links',
      },
      goalOptions: {
        studies: 'Studies',
        fitness: 'Fitness',
        work: 'Work project',
        learning: 'Learning something new',
        organized: 'Just staying organized',
      },
      heardOptions: {
        instagram: 'Instagram',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        friends: 'Friends & family',
        google: 'Google Search',
        other: 'Other',
      },
      toneOptions: {
        direct: 'Short & direct',
        friendly: 'Friendly',
        detailed: 'Detailed explanations',
      },
    },
  },
  Spanish: {
    knowYouBetterHeading: 'Ayúdame a conocerte\nmejor.',
    next: 'Siguiente',
    appSelectionTitle: 'Selección de apps',
    searchPlaceholder: 'Buscar',
    connectedCount: '{selected} de {total} conectadas',
    onboarding: {
      questions: {
        help: '¿Con qué quieres que te ayude primero?',
        goal: '¿En qué estás trabajando ahora?',
        heard: '¿Dónde conociste la app?',
        tone: '¿Cómo prefieres que te hable?',
      },
      helpOptions: {
        notes: 'Notas e ideas',
        reminders: 'Recordatorios',
        goals: 'Metas y objetivos',
        links: 'Guardar enlaces',
      },
      goalOptions: {
        studies: 'Estudios',
        fitness: 'Fitness',
        work: 'Proyecto de trabajo',
        learning: 'Aprender algo nuevo',
        organized: 'Mantener el orden',
      },
      heardOptions: {
        instagram: 'Instagram',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        friends: 'Amigos y familia',
        google: 'Búsqueda de Google',
        other: 'Otro',
      },
      toneOptions: {
        direct: 'Breve y directo',
        friendly: 'Amigable',
        detailed: 'Explicaciones detalladas',
      },
    },
  },
  Italian: {
    knowYouBetterHeading: 'Aiutami a conoscerti\nmeglio.',
    next: 'Avanti',
    appSelectionTitle: 'Selezione app',
    searchPlaceholder: 'Cerca',
    connectedCount: '{selected} di {total} connesse',
    onboarding: {
      questions: {
        help: 'In cosa vuoi aiuto per primo?',
        goal: 'A cosa stai lavorando adesso?',
        heard: "Dove hai scoperto l'app?",
        tone: 'Come preferisci che ti parli?',
      },
      helpOptions: {
        notes: 'Note e idee',
        reminders: 'Promemoria',
        goals: 'Traguardi e obiettivi',
        links: 'Salvare link',
      },
      goalOptions: {
        studies: 'Studio',
        fitness: 'Fitness',
        work: 'Progetto di lavoro',
        learning: 'Imparare qualcosa di nuovo',
        organized: 'Restare organizzato',
      },
      heardOptions: {
        instagram: 'Instagram',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        friends: 'Amici e famiglia',
        google: 'Ricerca Google',
        other: 'Altro',
      },
      toneOptions: {
        direct: 'Breve e diretto',
        friendly: 'Amichevole',
        detailed: 'Spiegazioni dettagliate',
      },
    },
  },
  French: {
    knowYouBetterHeading: 'Aide-moi à mieux\nte connaître.',
    next: 'Suivant',
    appSelectionTitle: "Sélection d'apps",
    searchPlaceholder: 'Rechercher',
    connectedCount: '{selected} sur {total} connectées',
    onboarding: {
      questions: {
        help: "Par quoi veux-tu que je t'aide en premier ?",
        goal: 'Sur quoi travailles-tu en ce moment ?',
        heard: "Où as-tu découvert l'app ?",
        tone: 'Comment veux-tu que je te parle ?',
      },
      helpOptions: {
        notes: 'Notes et idées',
        reminders: 'Rappels',
        goals: 'Objectifs',
        links: 'Enregistrer des liens',
      },
      goalOptions: {
        studies: 'Études',
        fitness: 'Fitness',
        work: 'Projet professionnel',
        learning: 'Apprendre du nouveau',
        organized: 'Rester organisé',
      },
      heardOptions: {
        instagram: 'Instagram',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        friends: 'Amis et famille',
        google: 'Recherche Google',
        other: 'Autre',
      },
      toneOptions: {
        direct: 'Court et direct',
        friendly: 'Amical',
        detailed: 'Explications détaillées',
      },
    },
  },
  Arabic: {
    knowYouBetterHeading: 'ساعدني على التعرف عليك\nبشكل أفضل.',
    next: 'التالي',
    appSelectionTitle: 'اختيار التطبيقات',
    searchPlaceholder: 'بحث',
    connectedCount: '{selected} من {total} متصلة',
    onboarding: {
      questions: {
        help: 'بماذا تريد المساعدة أولاً؟',
        goal: 'على ماذا تعمل حاليًا؟',
        heard: 'من أين عرفت عن التطبيق؟',
        tone: 'كيف تفضل أن أتحدث معك؟',
      },
      helpOptions: {
        notes: 'ملاحظات وأفكار',
        reminders: 'تذكيرات',
        goals: 'أهداف وغايات',
        links: 'حفظ الروابط',
      },
      goalOptions: {
        studies: 'الدراسة',
        fitness: 'اللياقة',
        work: 'مشروع عمل',
        learning: 'تعلم شيء جديد',
        organized: 'البقاء منظمًا',
      },
      heardOptions: {
        instagram: 'إنستغرام',
        youtube: 'يوتيوب',
        tiktok: 'تيك توك',
        friends: 'الأصدقاء والعائلة',
        google: 'بحث Google',
        other: 'أخرى',
      },
      toneOptions: {
        direct: 'مختصر ومباشر',
        friendly: 'ودود',
        detailed: 'شروحات مفصلة',
      },
    },
  },
  Chinese: {
    knowYouBetterHeading: '让我更好地\n了解你。',
    next: '下一步',
    appSelectionTitle: '应用选择',
    searchPlaceholder: '搜索',
    connectedCount: '已连接 {selected}/{total}',
    onboarding: {
      questions: {
        help: '你希望先在哪方面获得帮助？',
        goal: '你目前正在努力做什么？',
        heard: '你是从哪里了解到这个应用的？',
        tone: '你希望我用什么语气和你交流？',
      },
      helpOptions: {
        notes: '笔记与想法',
        reminders: '提醒',
        goals: '目标',
        links: '收藏链接',
      },
      goalOptions: {
        studies: '学习',
        fitness: '健身',
        work: '工作项目',
        learning: '学习新事物',
        organized: '保持有条理',
      },
      heardOptions: {
        instagram: 'Instagram',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        friends: '朋友和家人',
        google: 'Google 搜索',
        other: '其他',
      },
      toneOptions: {
        direct: '简短直接',
        friendly: '友好',
        detailed: '详细解释',
      },
    },
  },
  Hindi: {
    knowYouBetterHeading: 'मुझे आपको बेहतर जानने\nमें मदद करें।',
    next: 'आगे',
    appSelectionTitle: 'ऐप चयन',
    searchPlaceholder: 'खोजें',
    connectedCount: '{selected}/{total} कनेक्टेड',
    onboarding: {
      questions: {
        help: 'आपको सबसे पहले किसमें मदद चाहिए?',
        goal: 'आप अभी किस पर काम कर रहे हैं?',
        heard: 'आपको इस ऐप के बारे में कहाँ से पता चला?',
        tone: 'आप चाहते हैं कि मैं आपसे कैसे बात करूँ?',
      },
      helpOptions: {
        notes: 'नोट्स और विचार',
        reminders: 'रिमाइंडर',
        goals: 'लक्ष्य',
        links: 'लिंक सहेजना',
      },
      goalOptions: {
        studies: 'पढ़ाई',
        fitness: 'फिटनेस',
        work: 'कार्य परियोजना',
        learning: 'कुछ नया सीखना',
        organized: 'व्यवस्थित रहना',
      },
      heardOptions: {
        instagram: 'Instagram',
        youtube: 'YouTube',
        tiktok: 'TikTok',
        friends: 'मित्र और परिवार',
        google: 'Google खोज',
        other: 'अन्य',
      },
      toneOptions: {
        direct: 'संक्षिप्त और स्पष्ट',
        friendly: 'मैत्रीपूर्ण',
        detailed: 'विस्तृत जानकारी',
      },
    },
  },
};

export const getStrings = (language: SupportedLanguage): AppStrings => STRINGS[language];

export const formatCount = (
  template: string,
  selected: number,
  total: number
): string =>
  template
    .replace('{selected}', String(selected))
    .replace('{total}', String(total));
