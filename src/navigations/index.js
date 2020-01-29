import React from 'react';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {withTranslation} from 'react-i18next';

// Clients
import Clients from '../screens/Clients/Clients';
import Client from '../screens/Clients/Client';
// Login
import LoginScreen from '../screens/LoginScreen';
// Home
import HomeScreen from '../screens/HomeScreen';
import Notifications from '../screens/Notifications/Notifications';
// Routes
import Routes from '../screens/Routes/Routes';
import Route from '../screens/Routes/Route';
import OrderList from '../screens/Routes/OrderList';
// Orders
import Orders from '../screens/Orders/Orders';
import Order from '../screens/Orders/Order';
// import Detail from '../screens/Orders/Detail';
import Picking from '../screens/Orders/Detail/Picking';
import Shopping from '../screens/Orders/Detail/Shopping';
// Configuration
import ConfigScreen from '../screens/ConfigScreen';
import SplashScreen from '../screens/SplashScreen';
import BluetoothPrinter from '../components/BluetoothManagerComponent';
//MyRoutes
import MyRoutes from '../screens/MyRoutes/MyRoutes';
import RoutesTab from '../screens/Routes/Tabs/RoutesTab';
import RouteDetail from '../screens/MyRoutes/RouteDetail';
import Registry from '../screens/MyRoutes/Registry';

import SideBar from './SideBar';
import {theme} from '../constants';
import {Icon} from 'native-base';

const ConfigNavigator = createStackNavigator(
  {
    Configuration: ConfigScreen,
    BluetoothPrinter: BluetoothPrinter,
  },
  {
    headerMode: 'none',
  },
);

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Configuration: ConfigNavigator,
  },
  {headerMode: 'none'},
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
    Route: Route,
    RoutesTab: RoutesTab,
    OrderList: OrderList,
  },
  {
    initialRouteParams: 'Routes',
    headerMode: 'none',
  },
);

const OrdersScreen = createStackNavigator(
  {
    Orders: {
      screen: Orders,
      navigationOptions: {
        drawerIcon: <Icon name="arrow-back" size={24} />,
        drawerLabel: 'Ordenes',
      },
    },
    Order: Order,
    Picking: Picking,
    Shopping: Shopping,
  },
  {
    initialRouteParams: 'Orders',
    headerMode: 'none',
    mode: 'modal',
  },
);

const Home = createStackNavigator(
  {HomeScreen: HomeScreen, Notifications: Notifications},
  {initialRouteName: 'HomeScreen', headerMode: 'none'},
);

export const IconMenu = ({tintColor, focused, name}) => {
  return (
    <Icon name={name} size={24} style={{color: tintColor}} focused={focused} />
  );
};

let roleSuper = {
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: 'Inicio', //${global.translate('TITLE_PRINCIPAL')}
    },
  },
  ClientScreen: {
    screen: ClientScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'people'} {...props} />,
      drawerLabel: 'Clientes', //global.translate('TITLE_CLIENTS'),
    },
  },
  RouteScreen: {
    screen: RouteScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'navigate'} {...props} />,
      drawerLabel: 'Rutas', //global.translate('TITLE_ROUTES'),
    },
  },
  OrderScreen: {
    screen: OrdersScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'cube'} {...props} />,
      drawerLabel: 'Ordenes', //global.translate('TITLE_ORDERS'),
    },
  },

  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'settings'} {...props} />,
      drawerLabel: 'Configuración', //global.translate('TITLE_MY_ROUTES'),
    },
  },
};

let roleAll = {
  HomeScreen: {
    screen: Home,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: t('TITLE_PRINCIPAL'), //'Inicio', //${global.translate('TITLE_PRINCIPAL')}
    }),
  },
  ClientScreen: {
    screen: ClientScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'people'} {...props} />,
      drawerLabel: t('TITLE_CLIENTS'), //'Clientes', //global.translate('TITLE_CLIENTS'),
    }),
  },
  RouteScreen: {
    screen: RouteScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'navigate'} {...props} />,
      drawerLabel: t('TITLE_ROUTES'), //'Rutas', //global.translate('TITLE_ROUTES'),
    }),
  },
  OrderScreen: {
    screen: OrdersScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'cube'} {...props} />,
      drawerLabel: t('TITLE_ORDERS'), //'Ordenes', //global.translate('TITLE_ORDERS'),
    }),
  },
  MyRoutesScreen: {
    screen: MyRoutesScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'list-box'} {...props} />,
      drawerLabel: t('TITLE_MY_ROUTES'), //'Mis Rutas', //global.translate('TITLE_MY_ROUTES'),
    }),
  },
  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'settings'} {...props} />,
      drawerLabel: t('TITLE_CONFIGURATION'), //'Configuración', //global.translate('TITLE_MY_ROUTES'),
    }),
  },
};

let roleAdmin = {
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: 'Inicio', //${global.translate('TITLE_PRINCIPAL')}
    },
  },
  ClientScreen: {
    screen: ClientScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'people'} {...props} />,
      drawerLabel: 'Clientes', //global.translate('TITLE_CLIENTS'),
    },
  },
  RouteScreen: {
    screen: RouteScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'navigate'} {...props} />,
      drawerLabel: 'Rutas', //global.translate('TITLE_ROUTES'),
    },
  },
  OrderScreen: {
    screen: OrdersScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'cube'} {...props} />,
      drawerLabel: 'Ordenes', //global.translate('TITLE_ORDERS'),
    },
  },

  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: {
      drawerIcon: props => <Icon name={'settings'} {...props} />,
      drawerLabel: 'Configuración', //global.translate('TITLE_MY_ROUTES'),
    },
  },
};

let roleRecolector = {
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: 'Inicio', //${global.translate('TITLE_PRINCIPAL')}
    },
  },
  MyRoutesScreen: {
    screen: MyRoutesScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'list-box'} {...props} />,
      drawerLabel: 'Mis Rutas', //global.translate('TITLE_MY_ROUTES'),
    },
  },
  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'settings'} {...props} />,
      drawerLabel: 'Configuración', //global.translate('TITLE_MY_ROUTES'),
    },
  },
};

let roleConfig;

if (global.userRole === 'ROLE_SUPERVISOR') {
  roleConfig = roleAll;
} else if (global.userRole === 'ROLE_ADMIN') {
  roleConfig = roleAll;
} else {
  roleConfig = roleAll;
}

const AppNavigator = createDrawerNavigator(roleConfig, {
  contentComponent: SideBar,
  contentOptions: {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: theme.colors.darkGray,
    itemsContainerStyle: {
      marginBottom: 60,
    },
    iconContainerStyle: {
      color: theme.colors.gray,
    },
  },
});

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

const AppContainer = createAppContainer(Navigation);

class NavigatorApp extends React.Component {
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

export default withTranslation()(NavigatorApp);
