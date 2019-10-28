import React from 'react';
// import {StyleSheet, Platform, StatusBar} from 'react-native';

import {
  AppRegistry,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  View,
  Badge,
  Icon,
  Button,
} from 'native-base';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
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
import Route from '../screens/Routes/Route';
import OrderList from '../screens/Routes/OrderList';
// Orders
import Orders from '../screens/Orders/Orders';
import Order from '../screens/Orders/Order';
import Detail from '../screens/Orders/Detail';
// Configuration
import ConfigScreen from '../screens/ConfigScreen';
import SplashScreen from '../screens/SplashScreen';
import BluetoothPrinter from '../components/BluetoothManagerComponent';
//MyRoutes
import MyRoutes from '../screens/MyRoutes/MyRoutes';
import RouteDetail from '../screens/MyRoutes/RouteDetail';
import Registry from '../screens/MyRoutes/Registry';

import {TouchableOpacity} from 'react-native-gesture-handler';

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
    Detail: Detail,
  },
  {
    initialRouteParams: 'Orders',
    headerMode: 'none',
    mode: 'modal',
  },
);

const AppNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="home" size={24} style={{color: tintColor}} />
        ),
        drawerLabel: 'Inicio', //${global.translate('TITLE_PRINCIPAL')}
      },
    },
    ClientScreen: {
      screen: ClientScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="people" size={24} style={{color: tintColor}} />
        ),
        drawerLabel: 'Clientes', //global.translate('TITLE_CLIENTS'),
      },
    },
    RouteScreen: {
      screen: RouteScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="navigate" size={24} style={{color: tintColor}} />
        ),
        drawerLabel: 'Rutas', //global.translate('TITLE_ROUTES'),
      },
    },
    OrderScreen: {
      screen: OrdersScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon name="cube" size={24} style={{color: tintColor}} />
        ),
        drawerLabel: 'Ordenes', //global.translate('TITLE_ORDERS'),
      },
    },
    MyRoutesScreen: {
      screen: MyRoutesScreen,
      navigationOptions: {
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            focused={focused}
            name="list-box"
            size={24}
            style={{color: tintColor}}
          />
        ),
        drawerLabel: 'Mis Rutas', //global.translate('TITLE_MY_ROUTES'),
      },
    },
    MyConfigScreen: {
      screen: ConfigNavigator,
      navigationOptions: {
        drawerIcon: ({focused, tintColor}) => (
          <Icon
            focused={focused}
            name="settings"
            size={24}
            style={{color: tintColor}}
          />
        ),
        drawerLabel: 'Configuración', //global.translate('TITLE_MY_ROUTES'),
      },
    },
  },
  {
    // headerMode: 'none',
    // contentComponent: props => <SideBar {...props} />,
    contentComponent: props => (
      <ScrollView>
        <View style={styles.content}>
          <View>
            <Text style={styles.user}>{global.userDisplayName}</Text>
            <Badge primary style={styles.role}>
              <Text>{global.translate(global.userRole)}</Text>
            </Badge>
          </View>
          <Button transparent>
            <Icon
              name="create"
              style={{
                color: theme.colors.primary,
              }}
            />
            {/* <Text style={{color: theme.colors.primary}}>Editar</Text> */}
          </Button>
        </View>

        <DrawerNavigatorItems
          {...props}
          labelStyle={{
            fontSize: 16,
            fontWeight: '200',
          }}
        />
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              global.translate('TITLE_SIGN_OUT'),
              global.translate('TITLE_QUESTION_SIGN_OUT'),
              [
                {
                  text: global.translate('TITLE_YES'),
                  onPress: () => props.navigation.navigate('Auth'),
                },
                {
                  text: global.translate('TITLE_NO'),
                  onPress: () => props.navigation.goBack(null),
                  style: 'cancel',
                },
              ],
              {cancelable: false},
            )
          }
          style={{
            flexDirection: 'row',
          }}>
          <Button transparent style={styles.iconContainer}>
            <Icon name="log-out" style={styles.menuIcon} />
          </Button>
          <Text style={{marginLeft: 8, color: theme.colors.black}}>
            {global.translate('TITLE_LOGOUT')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    ),
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

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.darkGray,
    paddingHorizontal: theme.sizes.p12,
    paddingVertical: theme.sizes.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.sizes.base,
    paddingBottom: theme.sizes.p8,
  },
  role: {borderRadius: 4, backgroundColor: theme.colors.primary},
  iconContainer: {
    width: 55,
    height: 25,
  },
  menuIcon: {
    color: theme.colors.gray,
  },

  border: {borderColor: 'transparent'},
});
