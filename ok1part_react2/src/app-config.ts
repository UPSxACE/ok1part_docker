export type PossibleLanguages = keyof (typeof appConfig)['languages'];

const appConfig = {
  logo: '/logowhite.png', // Either a path to an image, or the value false
  logo_colored: '/logo.png',
  defaultLanguage: {
    id: 'en',
    name: 'English',
    flagPath: '/locales-flags/gb.svg',
    //translationFile: gb,
  },
  languages: {
    // Don't forget to add a translation for each new language, with the same variable name as the nome in the key "name"
    pt: {
      id: 'pt',
      name: 'Portuguese',
      flagPath: '/locales-flags/pt.svg',
      //translationFile: en,
    },
    en: {
      id: 'en',
      name: 'English',
      flagPath: '/locales-flags/gb.svg',
      //translationFile: en,
    },
  },
};

export default appConfig;
