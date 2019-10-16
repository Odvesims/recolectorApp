import React from 'react';
// import {StyleSheet, Platform, StatusBar} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
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
import OrderList from '../screens/Routes/OrderList';
// Orders
import Orders from '../screens/Orders/Orders';
import Order from '../screens/Orders/Order';
import Detail from '../screens/Orders/Detail';
// Configuration
import ConfigScreen from '../screens/ConfigScreen';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/HomeScreen';
//MyRoutes
import MyRoutes from '../screens/MyRoutes/MyRoutes';
import RouteDetail from '../screens/MyRoutes/RouteDetail';
import Registry from '../screens/MyRoutes/Registry';

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Configuration: ConfigScreen,
  },
  {
    headerMode: 'none',
  },
);

const MyRoutesScreen = createStackNavigator(
  {
    MyRoutes: MyRoutes,
    RouteDetail: RouteDetail,
    Registry: Registry,
  },
  {
    initialRouteParams: 'MyRoutes',
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
    initialRouteParams: 'Clients',
    headerMode: 'none',
  },
);

const RouteScreen = createStackNavigator(
  {
    Routes: Routes,
    NewRoute: NewRoute,
    OrderList: OrderList,
  },
  {
    initialRouteParams: 'Routes',
    headerMode: 'none',
  },
);

const OrdersScreen = createStackNavigator(
  {
    Orders: Orders,
    Order: Order,
    Detail: Detail,
  },
  {
    initialRouteParams: 'Orderss',
    headerMode: 'none',
    mode: 'modal',
  },
);

const AppNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLockMode: 'unlocked',
      },
    },
    ClientScreen: ClientScreen,
    RouteScreen: RouteScreen,
    OrderScreen: OrdersScreen,
    ConfigScreen: ConfigScreen,
    MyRoutesScreen: MyRoutesScreen,
  },
  {
    // headerMode: 'none',
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
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(Navigation);
