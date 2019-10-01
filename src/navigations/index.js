import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import theme from '../constants';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from 'native-base';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';
import ClientsScreen from '../screens/Clients/Clients';
import NewClient from '../screens/Clients/NewClient';

import RoutesScreen from '../screens/Routes/Routes';
import NewRoute from '../screens/Routes/NewRoute';
import NewPoint from '../screens/Routes/Point/NewPoint';
import NewArticle from '../screens/Routes/Point/NewArticle/NewArticle';

import DrawerContentComponents from '../components/DrawerContentComponents';

const AppStackNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Inicio',
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerStyle: {backgroundColor: '#4285F4'},
      headerTintColor: '#ffffff',
      headerLeft: null,
    },
  },
  Settings: {
    screen: ConfigScreen,
    navigationOptions: {
      headerStyle: {backgroundColor: '#4285F4'},
      headerTintColor: '#ffffff',
      headerLeft: true,
    },
  },
  Clients: {
    screen: ClientsScreen,
    navigationOptions: {
      headerStyle: {backgroundColor: '#4285F4'},
      headerTintColor: '#ffffff',
      headerLeft: true,
    },
  },
  Routes: {
    screen: RoutesScreen,
    navigationOptions: {
      headerStyle: {backgroundColor: '#4285F4'},
      headerTintColor: '#ffffff',
      headerLeft: true,
    },
  },
});

const AppDrawerNavigator = createDrawerNavigator(
  {
    LoginScreen: {screen: LoginScreen},
    HomeScreen: {screen: HomeScreen},
    ConfigScreen: {screen: ConfigScreen},
    ClientsScreen: {screen: ClientsScreen},
    RoutesScreen: {screen: RoutesScreen},
  },
  {
    initialRouteName: 'LoginScreen',
    drawerPosition: 'left',
    overlayColor: '#E2E2E2',
    contentComponent: DrawerContentComponents,
  },
);

const styles = StyleSheet.create({
  menuProfile: {backgroundColor: '#4285F4'},
  role: {
    backgroundColor: '#4285F4',
    borderRadius: 4,
  },
  androidHeader: {
    ...Platform.select({
      android: {
        //paddingTop: StatusBar.currentHeight
      },
    }),
  },
});

export default createAppContainer(AppDrawerNavigator);
