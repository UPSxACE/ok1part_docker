import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'normalize.css/normalize.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeConfig from '@/theme-config';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import LanguageContext from '@/contexts/language-context';
import appConfig from '@/app-config';
import { useEffect, useState } from 'react';
import authenticationContext from '@/contexts/authentication-context';
import 'yet-another-react-lightbox/styles.css';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import api from '@/api';

const AuthContext = authenticationContext;

config.autoAddCss = false;

const theme = createTheme(themeConfig);

// Initialize the interceptor that adds the accessToken to all the requests
api.initInterceptor();

function App({ Component, pageProps }) {
  const router = useRouter();

  const [currentLanguage, _setLanguage] = useState(
    appConfig.languages[router.locale]
    //appConfig.defaultLanguage
  );

  const [auth, setAuth] = useState({
    authToken: null,
    authenticated: false,
    role: null, // admin, guest...?
    //setXYZ: (XYZ) => {},
  });

  function setLanguage(language_id) {
    const newLanguage = appConfig.languages[language_id];
    if (newLanguage) {
      _setLanguage(newLanguage);
    }
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </AuthContext.Provider>
    </LanguageContext.Provider>
  );
}

export default appWithTranslation(App);
