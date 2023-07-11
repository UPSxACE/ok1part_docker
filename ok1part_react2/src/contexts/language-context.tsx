import { PossibleLanguages } from '@/app-config';
import { Dispatch, createContext, useEffect, useState } from 'react';

export const LanguageContext = createContext<null | {
  language: PossibleLanguages | null | undefined;
  setLanguage: Dispatch<PossibleLanguages>;
}>(null);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<
    null | undefined | PossibleLanguages
  >(null);

  useEffect(() => {}, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
