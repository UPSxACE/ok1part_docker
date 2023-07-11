import appConfig from '@/app-config';
import { createContext } from 'react';

const LanguageContext = createContext({
  id: appConfig.defaultLanguage.id,
  language: appConfig.defaultLanguage.name,
  flag: appConfig.defaultLanguage.flagPath,
  setLanguage: (language) => {},
});

export default LanguageContext;
