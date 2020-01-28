import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import ConfigScreen from '../screens/ConfigScreen';
import BluetoothPrinter from '../components/BluetoothManagerComponent';

export const ConfigNavigator = createStackNavigator(
  {
    Configuration: ConfigScreen,
    BluetoothPrinter: BluetoothPrinter,
  },
  {
    headerMode: 'none',
  },
);

export const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Configuration: ConfigNavigator,
  },
  {headerMode: 'none'},
);
