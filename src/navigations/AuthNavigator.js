import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/LoginScreen';

export default createStackNavigator(
  {
    Login,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);
