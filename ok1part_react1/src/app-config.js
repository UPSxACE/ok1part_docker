// Please set names in english
// Find icon names in: https://fontawesome.com/search?o=r&m=free
// Find flags in: https://flagicons.lipis.dev/
import {
  faBell,
  faDatabase,
  faGlobe,
  faListCheck,
  faShield,
  faTasks,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import gb from './locales/gb';
import pt from './locales/pt';

const appConfig = {
  // Available html anchors: #page-start #screenshots, #features, #product
  logo: '/logowhite.png', // Either a path to an image, or the value false
  logo_colored: '/logo.png',
  mainButtonTarget: 'mailto:geral@techwelf.com', //'/#product',
  backgroundImage: '/software-pic-1.webp',
  defaultLanguage: {
    id: 'gb',
    name: 'English',
    flagPath: '/locales-flags/gb.svg',
    translationFile: gb,
  },
  easyTranslationLoader: true, // If this is enabled, it will add the languages to the i18init() function in _app.js for you
  languages: {
    // Don't forget to add a translation for each new language, with the same variable name as the nome in the key "name"
    pt: {
      id: 'pt',
      name: 'Portuguese',
      flagPath: '/locales-flags/pt.svg',
      translationFile: pt,
    },
    gb: {
      id: 'gb',
      name: 'English',
      flagPath: '/locales-flags/gb.svg',
      translationFile: gb,
    },
  },
  userAccess: true, // Allow common users to register and login
  usersOptionsMenu: [
    { name: 'Login', route: '/login' },
    { name: 'Register', route: '/register' },
  ],
  userDashboardMenu: [
    { name: 'Help', route: '/' },
    { name: 'Logout', route: '/logout' },
  ],
  userOptionsMenuLoggedIn: [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Logout', route: '/logout' },
  ],
  pages: [
    /*
    {
      name: 'Home',
      route: '/#page-start',
    },
    {
      name: 'FeaturesTab',
      route: '/#product',
    },
    {
      name: 'Printscreens',
      route: '/#features',
    },*/
  ],
  features: [
    {
      name: 'feature1',
      desc: 'feature1desc',
      icon: faListCheck,
    },
    {
      name: 'feature2',
      desc: 'feature2desc',
      icon: faDatabase,
    },
    ,
    {
      name: 'feature6',
      desc: 'feature6desc',
      icon: faShield,
    },
    {
      name: 'feature3',
      desc: 'feature3desc',
      icon: faUserGroup,
    },
    {
      name: 'feature4',
      desc: 'feature4desc',
      icon: faGlobe,
    },
    {
      name: 'feature5',
      desc: 'feature5desc',
      icon: faTasks,
    },
    {
      name: 'feature7',
      desc: 'feature7desc',
      icon: faBell,
    } /*
    {
      name: 'feature8',
      desc: 'feature8desc',
      icon: faCode,
    },
    {
      name: 'feature9',
      desc: 'feature9desc',
      icon: faLayerGroup,
    },*/,
    ,
  ],
  screenshots: [
    {
      title: 'ScreenshotTitle1',
      desc: 'ScreenshotDesc1',
      imgPath: '/screenshot1e.png',
    },
    {
      title: 'ScreenshotTitle2',
      desc: 'ScreenshotDesc2',
      imgPath: '/screenshot2e.png',
    },
    {
      title: 'ScreenshotTitle3',
      desc: 'ScreenshotDesc3',
      imgPath: '/screenshot3e.png',
    },
  ],
  screenshotsMode: 'scroll', // options: scroll or carousel
  // In case you choose "carousel", give preference to dark screenshots as a contrast to the white section before the carousel
  wgyb: true, // set false to disable the WGYB section
  transparentBarPaths: ['/'],
  pcButtonTarget: '/register',
  dashboardSearch: false,
};

export default appConfig;
