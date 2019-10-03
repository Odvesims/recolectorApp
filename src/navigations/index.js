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
import Client from '../screens/Clients/Client';
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
import SplashScreen from '../screens/SplashScreen';

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Configuration: ConfigScreen,
  },
  {
    headerMode: 'none',
  },
);

const Splash = createStackNavigator(
  {
    Splash: SplashScreen,
  },
  {headerMode: 'none'},
);

const ClientScreen = createStackNavigator(
  {
    Clients: Clients,
    Client: Client,
  },
  {
    initialRouteName: 'Clients',
    headerMode: 'none',
  },
);

const RouteScreen = createStackNavigator(
  {
    Routes: Routes,
    NewRoute: NewRoute,
  },
  {
    initialRouteName: 'Routes',
    headerMode: 'none',
  },
);

const OrdersScreen = createStackNavigator(
  {
    Orders: Orders,
    NewOrder: NewOrder,
  },
  {
    initialRouteName: 'Orders',
    headerMode: 'none',
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
    headerMode: 'none',
    contentComponent: props => <SideBar {...props} />,
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
    Splash: Splash,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(Navigation);
