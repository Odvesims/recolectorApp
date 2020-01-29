import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import es from './es.json';
// import en from './en.json';
// import fr from './fr.json';

const translations = {
  es: () => require('./es.json'),
  en: () => require('./en.json'),
  fr: () => require('./fr.json'),
};

const fallback = {languageTag: 'en', isRTL: false};

const {languageTag, isRTL} =
  RNLocalize.findBestAvailableLanguage(Object.keys(translations)) || fallback;

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      [languageTag]: {
        translation: translations[languageTag](),
      },
    },
    lng: languageTag,
    fallbackLng: 'es',
    debug: true,
    interpolation: {
      escapeValue: false, // react is already safe from xss
    },
  });

global.translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

console.disableYellowBox = true;

export default i18n;
