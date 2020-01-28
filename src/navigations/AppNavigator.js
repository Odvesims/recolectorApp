import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {withTranslation} from 'react-i18next';

import MainNavigator from './DrawerNavigator';

import Splash from './Splash';
import {AuthNavigator} from './Auth';

const AppContainer = createAppContainer(Navigation);

const Navigation = createSwitchNavigator(
  {
    Splash: Splash,
    App: MainNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);
class AppNavigator extends React.Component {
  render() {
    const {t, i18n} = this.props;
    console.log('Props', this.props);

    return (
      <AppContainer
        screenProps={{
          t,
          i18n,
        }}
      />
    );
  }
}

export default withTranslation()(AppNavigator);
