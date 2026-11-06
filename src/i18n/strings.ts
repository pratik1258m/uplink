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

export interface AiHomeStrings {
  greeting: string;
  heading: string;
  savedLinks: string;
  savedLinksSubtitle: string;
  askPlaceholder: string;
  menuTitle: string;
  menuItems: {
    savedLinks: string;
    reminders: string;
    goals: string;
    notes: string;
    apps: string;
    account: string;
    settings: string;
    help: string;
  };
  fab: {
    toggleLabel: string;
    quickSave: string;
    notes: string;
    audioNote: string;
    videoNote: string;
    tools: string;
    share: string;
  };
  voice: {
    hint: string;
    tapToSpeak: string;
    listening: string;
    thinking: string;
  };
}

export interface AppStrings {
  knowYouBetterHeading: string;
  next: string;
  nameStep: {
    heading: string;
    subtitle: string;
    placeholder: string;
  };
  appSelectionTitle: string;
  appSelectionHeading: string;
  appSelectionSubtitle: string;
  searchPlaceholder: string;
  connectedCount: string;
  onboarding: OnboardingStrings;
  aiHome: AiHomeStrings;
}

export const STRINGS: Record<SupportedLanguage, AppStrings> = {
  English: {
    knowYouBetterHeading: 'Help me to get to\nknow you better.',
    next: 'Next',
    nameStep: {
      heading: 'What can I\ncall you?',
      subtitle:
        'Your name comes from your account. Feel free to change it — this is how UppLink will greet you.',
      placeholder: 'Your name',
    },
    appSelectionTitle: 'App Selection',
    appSelectionHeading: 'Which apps can\nUppLink access?',
    appSelectionSubtitle:
      'Pick the apps you are comfortable letting UppLink access. It uses them to save links, notes and reminders — you are always in control.',
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
    aiHome: {
      greeting: 'Hey {name}',
      heading: 'What should we\nwork on?',
      savedLinks: 'Saved links',
      savedLinksSubtitle: 'From YouTube, Chrome and Reddit',
      askPlaceholder: 'Ask UppLink…',
      menuTitle: 'More',
      menuItems: {
        savedLinks: 'Saved links',
        reminders: 'Reminders',
        goals: 'Goals',
        notes: 'Notes',
        apps: 'Connected apps',
        account: 'Account',
        settings: 'Settings',
        help: 'Help & feedback',
      },
      fab: {
        toggleLabel: 'Floating button',
        quickSave: 'Quick Save',
        notes: 'Notes',
        audioNote: 'Audio Note',
        videoNote: 'Video Note',
        tools: 'Tools',
        share: 'Share',
      },
      voice: {
        hint: 'Ask by voice or type',
        tapToSpeak: 'Tap to speak',
        listening: 'Listening…',
        thinking: 'Got it — thinking…',
      },
    },
  },
  Spanish: {
    knowYouBetterHeading: 'Ayúdame a conocerte\nmejor.',
    next: 'Siguiente',
    nameStep: {
      heading: '¿Cómo te puedo\nllamar?',
      subtitle:
        'Tu nombre viene de tu cuenta. Puedes cambiarlo: así te saludará UppLink.',
      placeholder: 'Tu nombre',
    },
    appSelectionTitle: 'Selección de apps',
    appSelectionHeading: '¿A qué apps puede\nacceder UppLink?',
    appSelectionSubtitle:
      'Elige las apps a las que permites acceder a UppLink. Las usa para guardar enlaces, notas y recordatorios: tú tienes el control.',
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
    aiHome: {
      greeting: 'Hola, {name}',
      heading: '¿En qué\nvamos a trabajar?',
      savedLinks: 'Enlaces guardados',
      savedLinksSubtitle: 'De YouTube, Chrome y Reddit',
      askPlaceholder: 'Pregúntale a UppLink…',
      menuTitle: 'Más',
      menuItems: {
        savedLinks: 'Enlaces guardados',
        reminders: 'Recordatorios',
        goals: 'Metas',
        notes: 'Notas',
        apps: 'Apps conectadas',
        account: 'Cuenta',
        settings: 'Ajustes',
        help: 'Ayuda y comentarios',
      },
      fab: {
        toggleLabel: 'Botón flotante',
        quickSave: 'Guardado rápido',
        notes: 'Notas',
        audioNote: 'Nota de audio',
        videoNote: 'Nota de vídeo',
        tools: 'Herramientas',
        share: 'Compartir',
      },
      voice: {
        hint: 'Pregunta por voz o escribe',
        tapToSpeak: 'Toca para hablar',
        listening: 'Escuchando…',
        thinking: 'Entendido, pensando…',
      },
    },
  },
  Italian: {
    knowYouBetterHeading: 'Aiutami a conoscerti\nmeglio.',
    next: 'Avanti',
    nameStep: {
      heading: 'Come posso\nchiamarti?',
      subtitle:
        'Il tuo nome viene dal tuo account. Puoi cambiarlo: così UppLink ti saluterà.',
      placeholder: 'Il tuo nome',
    },
    appSelectionTitle: 'Selezione app',
    appSelectionHeading: 'A quali app può\naccedere UppLink?',
    appSelectionSubtitle:
      'Scegli le app a cui vuoi dare accesso a UppLink. Le usa per salvare link, note e promemoria: hai sempre il controllo.',
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
    aiHome: {
      greeting: 'Ciao, {name}',
      heading: 'Su cosa\nlavoriamo?',
      savedLinks: 'Link salvati',
      savedLinksSubtitle: 'Da YouTube, Chrome e Reddit',
      askPlaceholder: 'Chiedi a UppLink…',
      menuTitle: 'Altro',
      menuItems: {
        savedLinks: 'Link salvati',
        reminders: 'Promemoria',
        goals: 'Obiettivi',
        notes: 'Note',
        apps: 'App connesse',
        account: 'Account',
        settings: 'Impostazioni',
        help: 'Aiuto e feedback',
      },
      fab: {
        toggleLabel: 'Pulsante flottante',
        quickSave: 'Salvataggio rapido',
        notes: 'Note',
        audioNote: 'Nota audio',
        videoNote: 'Nota video',
        tools: 'Strumenti',
        share: 'Condividi',
      },
      voice: {
        hint: 'Chiedi a voce o scrivi',
        tapToSpeak: 'Tocca per parlare',
        listening: 'In ascolto…',
        thinking: 'Ricevuto, sto pensando…',
      },
    },
  },
  French: {
    knowYouBetterHeading: 'Aide-moi à mieux\nte connaître.',
    next: 'Suivant',
    nameStep: {
      heading: 'Comment puis-je\nt’appeler ?',
      subtitle:
        'Votre nom vient de votre compte. Modifiez-le librement : c’est ainsi qu’UppLink vous saluera.',
      placeholder: 'Votre nom',
    },
    appSelectionTitle: "Sélection d'apps",
    appSelectionHeading: 'À quelles apps UppLink\npeut-il accéder ?',
    appSelectionSubtitle:
      "Choisissez les apps auxquelles UppLink peut accéder. Il les utilise pour enregistrer liens, notes et rappels — vous gardez le contrôle.",
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
    aiHome: {
      greeting: 'Bonjour, {name}',
      heading: 'Sur quoi\non travaille ?',
      savedLinks: 'Liens enregistrés',
      savedLinksSubtitle: 'Depuis YouTube, Chrome et Reddit',
      askPlaceholder: 'Demande à UppLink…',
      menuTitle: 'Plus',
      menuItems: {
        savedLinks: 'Liens enregistrés',
        reminders: 'Rappels',
        goals: 'Objectifs',
        notes: 'Notes',
        apps: 'Apps connectées',
        account: 'Compte',
        settings: 'Réglages',
        help: 'Aide et commentaires',
      },
      fab: {
        toggleLabel: 'Bouton flottant',
        quickSave: 'Enregistrement rapide',
        notes: 'Notes',
        audioNote: 'Note audio',
        videoNote: 'Note vidéo',
        tools: 'Outils',
        share: 'Partager',
      },
      voice: {
        hint: 'Demandez à la voix ou écrivez',
        tapToSpeak: 'Appuyez pour parler',
        listening: 'Écoute…',
        thinking: 'Compris, je réfléchis…',
      },
    },
  },
  Arabic: {
    knowYouBetterHeading: 'ساعدني على التعرف عليك\nبشكل أفضل.',
    next: 'التالي',
    nameStep: {
      heading: 'بماذا يمكنني\nأن أناديك؟',
      subtitle:
        'اسمك مأخوذ من حسابك. يمكنك تغييره — هكذا سيرحب بك UppLink.',
      placeholder: 'اسمك',
    },
    appSelectionTitle: 'اختيار التطبيقات',
    appSelectionHeading: 'ما التطبيقات التي يمكن\nلـ UppLink الوصول إليها؟',
    appSelectionSubtitle:
      'اختر التطبيقات التي تسمح لـ UppLink بالوصول إليها. يستخدمها لحفظ الروابط والملاحظات والتذكيرات — وأنت تتحكم دائمًا.',
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
    aiHome: {
      greeting: 'مرحبًا، {name}',
      heading: 'على ماذا\nنعمل؟',
      savedLinks: 'الروابط المحفوظة',
      savedLinksSubtitle: 'من يوتيوب وكروم وريديت',
      askPlaceholder: 'اسأل UppLink…',
      menuTitle: 'المزيد',
      menuItems: {
        savedLinks: 'الروابط المحفوظة',
        reminders: 'التذكيرات',
        goals: 'الأهداف',
        notes: 'الملاحظات',
        apps: 'التطبيقات المتصلة',
        account: 'الحساب',
        settings: 'الإعدادات',
        help: 'المساعدة والملاحظات',
      },
      fab: {
        toggleLabel: 'زر عائم',
        quickSave: 'حفظ سريع',
        notes: 'ملاحظات',
        audioNote: 'ملاحظة صوتية',
        videoNote: 'ملاحظة فيديو',
        tools: 'أدوات',
        share: 'مشاركة',
      },
      voice: {
        hint: 'اسأل بالصوت أو اكتب',
        tapToSpeak: 'اضغط للتحدث',
        listening: 'جارٍ الاستماع…',
        thinking: 'فهمت، أفكر…',
      },
    },
  },
  Chinese: {
    knowYouBetterHeading: '让我更好地\n了解你。',
    next: '下一步',
    nameStep: {
      heading: '我该怎么\n称呼你？',
      subtitle:
        '你的名字来自你的账户。你可以随时修改——UppLink 会这样称呼你。',
      placeholder: '你的名字',
    },
    appSelectionTitle: '应用选择',
    appSelectionHeading: 'UppLink 可以访问\n哪些应用？',
    appSelectionSubtitle:
      '选择你愿意让 UppLink 访问的应用。它用这些应用保存链接、笔记和提醒——你始终拥有控制权。',
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
    aiHome: {
      greeting: '你好，{name}',
      heading: '我们今天\n做什么？',
      savedLinks: '已保存链接',
      savedLinksSubtitle: '来自 YouTube、Chrome 和 Reddit',
      askPlaceholder: '问问 UppLink…',
      menuTitle: '更多',
      menuItems: {
        savedLinks: '已保存链接',
        reminders: '提醒',
        goals: '目标',
        notes: '笔记',
        apps: '已连接应用',
        account: '账户',
        settings: '设置',
        help: '帮助与反馈',
      },
      fab: {
        toggleLabel: '悬浮按钮',
        quickSave: '快速保存',
        notes: '笔记',
        audioNote: '语音笔记',
        videoNote: '视频笔记',
        tools: '工具',
        share: '分享',
      },
      voice: {
        hint: '用语音提问或输入',
        tapToSpeak: '点击说话',
        listening: '正在聆听…',
        thinking: '明白了，正在思考…',
      },
    },
  },
  Hindi: {
    knowYouBetterHeading: 'मुझे आपको बेहतर जानने\nमें मदद करें।',
    next: 'आगे',
    nameStep: {
      heading: 'मैं आपको क्या\nकह सकता हूँ?',
      subtitle:
        'आपका नाम आपके अकाउंट से लिया गया है। आप इसे बदल सकते हैं — UppLink आपको ऐसे ही बुलाएगा।',
      placeholder: 'आपका नाम',
    },
    appSelectionTitle: 'ऐप चयन',
    appSelectionHeading: 'UppLink किन ऐप्स\nतक पहुँच सकता है?',
    appSelectionSubtitle:
      'वे ऐप्स चुनें जिन तक आप UppLink को पहुँच देना चाहते हैं। यह इन्हें लिंक, नोट्स और रिमाइंडर सहेजने के लिए उपयोग करता है — नियंत्रण हमेशा आपके पास है।',
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
    aiHome: {
      greeting: 'नमस्ते, {name}',
      heading: 'हम किस पर\nकाम करें?',
      savedLinks: 'सहेजे गए लिंक',
      savedLinksSubtitle: 'YouTube, Chrome और Reddit से',
      askPlaceholder: 'UppLink से पूछें…',
      menuTitle: 'और',
      menuItems: {
        savedLinks: 'सहेजे गए लिंक',
        reminders: 'रिमाइंडर',
        goals: 'लक्ष्य',
        notes: 'नोट्स',
        apps: 'कनेक्टेड ऐप्स',
        account: 'अकाउंट',
        settings: 'सेटिंग्स',
        help: 'सहायता और फ़ीडबैक',
      },
      fab: {
        toggleLabel: 'फ़्लोटिंग बटन',
        quickSave: 'त्वरित सहेजें',
        notes: 'नोट्स',
        audioNote: 'ऑडियो नोट',
        videoNote: 'वीडियो नोट',
        tools: 'टूल्स',
        share: 'शेयर करें',
      },
      voice: {
        hint: 'आवाज़ से पूछें या लिखें',
        tapToSpeak: 'बोलने के लिए टैप करें',
        listening: 'सुन रहा है…',
        thinking: 'समझ गया, सोच रहा हूँ…',
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
