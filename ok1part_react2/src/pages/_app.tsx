import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { appWithTranslation } from 'next-i18next';
import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import api from '@/api';
import { AuthenticationProvider } from '@/contexts/authentication-context';
import 'yet-another-react-lightbox/styles.css';
import { LanguageContext } from '@/contexts/language-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PossibleLanguages } from '@/app-config';

// Initialize the interceptor that adds the accessToken to all the requests
api.initInterceptor();

interface IUserData {
  username: string | null;
  permissions: number | null;
  isDone: Boolean;
}

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = (Component as any).getLayout || ((page: any) => page);
  const [language, setLanguage] = useState<
    null | PossibleLanguages | undefined
  >(null);

  useEffect(() => {
    setLanguage(router?.locale as PossibleLanguages | undefined);
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <AuthenticationProvider>
          {getLayout(<Component {...pageProps} />)}
        </AuthenticationProvider>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
