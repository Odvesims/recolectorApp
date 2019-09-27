import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import React from 'react';

import {Icon} from 'native-base';

import {StyleSheet, Platform, StatusBar} from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import Clients from '../screens/Clients/Clients';
import NewClient from '../screens/Clients/NewClient';
import Routes from '../screens/Routes/Routes';
import NewRoute from '../screens/Routes/NewRoute';
import NewPoint from '../screens/Routes/Point/NewPoint';
import NewArticle from '../screens/Routes/Point/NewArticle/NewArticle';
import ConfigScreen from '../screens/ConfigScreen';

import SideBar from './SideBar';

const AuthNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Configuration: {screen: ConfigScreen},
  },
  {
    initialRouteName: 'Login',
  },
);

const AppNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    Clients: {
      screen: Clients,
    },
    Routes: {
      screen: Routes,
    },
    Configuration: {
      screen: ConfigScreen,
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

const Navigation = createSwitchNavigator(
  {
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'App',
  },
  {
    defaultNavigationOptions: {
      headerTintColor: 'white',
    },
  },
);

export default createAppContainer(Navigation);

const styles = StyleSheet.create({
  menuProfile: {backgroundColor: '#4285F4'},
  role: {
    backgroundColor: '#4285F4',
    borderRadius: 4,
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});
