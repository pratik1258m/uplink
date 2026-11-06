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

export interface AppStrings {
  knowYouBetterHeading: string;
  next: string;
  appSelectionTitle: string;
  searchPlaceholder: string;
  connectedCount: string;
}

export const STRINGS: Record<SupportedLanguage, AppStrings> = {
  English: {
    knowYouBetterHeading: 'Help me to get to\nknow you better.',
    next: 'Next',
    appSelectionTitle: 'App Selection',
    searchPlaceholder: 'Search',
    connectedCount: '{selected} of {total} connected',
  },
  Spanish: {
    knowYouBetterHeading: 'Ayúdame a conocerte\nmejor.',
    next: 'Siguiente',
    appSelectionTitle: 'Selección de apps',
    searchPlaceholder: 'Buscar',
    connectedCount: '{selected} de {total} conectadas',
  },
  Italian: {
    knowYouBetterHeading: 'Aiutami a conoscerti\nmeglio.',
    next: 'Avanti',
    appSelectionTitle: 'Selezione app',
    searchPlaceholder: 'Cerca',
    connectedCount: '{selected} di {total} connesse',
  },
  French: {
    knowYouBetterHeading: 'Aide-moi à mieux\nte connaître.',
    next: 'Suivant',
    appSelectionTitle: "Sélection d'apps",
    searchPlaceholder: 'Rechercher',
    connectedCount: '{selected} sur {total} connectées',
  },
  Arabic: {
    knowYouBetterHeading: 'ساعدني على التعرف عليك\nبشكل أفضل.',
    next: 'التالي',
    appSelectionTitle: 'اختيار التطبيقات',
    searchPlaceholder: 'بحث',
    connectedCount: '{selected} من {total} متصلة',
  },
  Chinese: {
    knowYouBetterHeading: '让我更好地\n了解你。',
    next: '下一步',
    appSelectionTitle: '应用选择',
    searchPlaceholder: '搜索',
    connectedCount: '已连接 {selected}/{total}',
  },
  Hindi: {
    knowYouBetterHeading: 'मुझे आपको बेहतर जानने\nमें मदद करें।',
    next: 'आगे',
    appSelectionTitle: 'ऐप चयन',
    searchPlaceholder: 'खोजें',
    connectedCount: '{selected}/{total} कनेक्टेड',
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
