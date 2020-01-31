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
      drawerLabel: 'Inicio',
    },
  },
  ClientScreen: {
    screen: ClientScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'people'} {...props} />,
      drawerLabel: 'Clientes',
    },
  },
  RouteScreen: {
    screen: RouteScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'navigate'} {...props} />,
      drawerLabel: 'Rutas',
    },
  },
  OrderScreen: {
    screen: OrdersScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'cube'} {...props} />,
      drawerLabel: 'Ordenes',
    },
  },

  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'settings'} {...props} />,
      drawerLabel: 'Configuración',
    },
  },
};

let roleAll = {
  HomeScreen: {
    screen: Home,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: t('links.principal'), //'Inicio',
    }),
  },
  ClientScreen: {
    screen: ClientScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'people'} {...props} />,
      drawerLabel: t('links.clients'), //'Clientes',
    }),
  },
  RouteScreen: {
    screen: RouteScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'navigate'} {...props} />,
      drawerLabel: t('links.routes'), //'Rutas',
    }),
  },
  OrderScreen: {
    screen: OrdersScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'cube'} {...props} />,
      drawerLabel: t('links.orders'), //'Ordenes',
    }),
  },
  MyRoutesScreen: {
    screen: MyRoutesScreen,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'list-box'} {...props} />,
      drawerLabel: t('links.my_routes'), //'Mis Rutas',
    }),
  },
  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: ({screenProps: {t}}) => ({
      drawerIcon: props => <IconMenu name={'settings'} {...props} />,
      drawerLabel: t('links.configuration'), //'Configuración',
    }),
  },
};

let roleAdmin = {
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: 'Inicio',
    },
  },
  ClientScreen: {
    screen: ClientScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'people'} {...props} />,
      drawerLabel: 'Clientes',
    },
  },
  RouteScreen: {
    screen: RouteScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'navigate'} {...props} />,
      drawerLabel: 'Rutas',
    },
  },
  OrderScreen: {
    screen: OrdersScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'cube'} {...props} />,
      drawerLabel: 'Ordenes',
    },
  },

  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: {
      drawerIcon: props => <Icon name={'settings'} {...props} />,
      drawerLabel: 'Configuración',
    },
  },
};

let roleRecolector = {
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'home'} {...props} />,
      drawerLabel: 'Inicio',
    },
  },
  MyRoutesScreen: {
    screen: MyRoutesScreen,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'list-box'} {...props} />,
      drawerLabel: 'Mis Rutas',
    },
  },
  MyConfigScreen: {
    screen: ConfigNavigator,
    navigationOptions: {
      drawerIcon: props => <IconMenu name={'settings'} {...props} />,
      drawerLabel: 'Configuración',
    },
  },
};

let roleConfig;

if (global.userRole === 'general.role.supervisor') {
  roleConfig = roleAll;
} else if (global.userRole === 'general.role.warehouse_agent') {
  roleConfig = roleAll;
} else {
  roleConfig = roleAll;
}

let drawerOptions = {
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
};

const AppNavigator = createDrawerNavigator(roleConfig, drawerOptions);

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
