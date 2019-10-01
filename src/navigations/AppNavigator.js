import React from 'react';
import {Icon, Header, Left, Right, Title, Button, Body} from 'native-base';
// import {StyleSheet, Platform, StatusBar} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

// Clients
import Clients from '../screens/Clients/Clients';
import NewClient from '../screens/Clients/NewClient';
// Login
import LoginScreen from '../screens/LoginScreen';
// Home
import HomeScreen from '../screens/HomeScreen';
// Routes
import Routes from '../screens/Routes/Routes';
import NewRoute from '../screens/Routes/NewRoute';
// Orders
import Orders from '../screens/Orders/Orders';
import NewOrder from '../screens/Orders/NewOrder';
import NewArticle from '../screens/Orders/NewArticle';
// Configuration
import ConfigScreen from '../screens/ConfigScreen';

import SideBar from './SideBar';

const AuthNavigator = createStackNavigator({
  Login: LoginScreen,
  Configuration: ConfigScreen,
});

const OtherStack = createStackNavigator({
  NewArticle: NewArticle,
  NewClient: NewClient,
  NewOrder: NewOrder,
  NewRoute: NewRoute,
});

const AppNavigator = createDrawerNavigator(
  {
    HomeScreen: HomeScreen,
    Clients: Clients,
    Routes: Routes,
    Orders: Orders,
    Configuration: ConfigScreen,
  },
  {
    contentComponent: props => <SideBar {...props} />,
  },
);

const Navigation = createSwitchNavigator(
  {
    App: AppNavigator,
    Auth: AuthNavigator,
    Other: OtherStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(Navigation);
