import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Home from '../screens/HomeScreen';
import Clients from '../screens/Clients';
import Routes from '../screens/Routes/Routes';

const MainDrawer = createDrawerNavigator({
  Home: {screen: Home},
  Clients: {screen: Clients},
  Routes: {screen: Routes},
});

export default MainDrawer;
