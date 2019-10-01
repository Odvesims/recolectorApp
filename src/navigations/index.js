import React from 'react';
import {Icon, Header, Left, Right, Title, Button, Body} from 'native-base';
import {Alert} from 'react-native';
// import {StyleSheet, Platform, StatusBar} from 'react-native';

import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import SideBar from './SideBar';
import {theme} from '../constants';

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
import Logout from '../screens/Logout';

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Configuration: ConfigScreen,
  },
  {
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const ClientScreen = createStackNavigator(
  {
    Clients: Clients,
    NewClient: NewClient,
  },
  {
    initialRouteName: 'Clients',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const RouteScreen = createStackNavigator(
  {
    Routes: Routes,
    NewRoute: NewRoute,
  },
  {
    initialRouteName: 'Routes',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const OrdersScreen = createStackNavigator(
  {
    Orders: Orders,
    NewOrder: NewOrder,
  },
  {
    initialRouteName: 'Orders',
    navigationOptions: {
      header: null,
    },
  },
);

const AppNavigator = createDrawerNavigator(
  {
    HomeScreen: HomeScreen,
    ClientScreen: ClientScreen,
    RouteScreen: RouteScreen,
    OrderScreen: OrdersScreen,
    ConfigScreen: ConfigScreen,
    Logout: {
      screen: Logout,
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,

    navigationOptions: {
      headerVisible: false,
    },
    contentOptions: {
      activeTintColor: theme.colors.primary,
      itemsContainerStyle: {
        marginVertical: 25,
      },
    },
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
);

export default createAppContainer(Navigation);
