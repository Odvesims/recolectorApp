import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import es from './es.json';
import fr from './fr.json';

// the translations
// (tip: move them in a JSON file and import them)
const resources = {
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    debug: true,
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  });

export default i18n;
