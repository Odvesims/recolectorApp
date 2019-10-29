import React, {Component} from 'react';
import {I18nManager} from 'react-native';
import {createAppContainer} from 'react-navigation';
import NavigationService from './src/services/NavigationService';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';

global.database_version = 18;
global.userDisplayName = '';
global.userRole = '';
global.userName = '';
global.userPassword = '';
global.usesPrinter = 0;
global.printer_address = '';
global.printer_name = '';
global.apiHost = '';
global.apiPort = '';
global.token = '';
global.country_id = 0;
global.setma_id = 0;
global.employee_code = 0;
global.states_collection = {};

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  es: () => require('./src/translations/es.json'),
  en: () => require('./src/translations/en.json'),
  fr: () => require('./src/translations/fr.json'),
};

global.translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  global.translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

console.disableYellowBox = true;

import Navigation from './src/navigations/';

class App extends Component {
  constructor(props) {
    super(props);
    setI18nConfig(); // set initial config
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render() {
    return <Navigation />;
  }
}
export default App;
