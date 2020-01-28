import {createStackNavigator} from 'react-navigation-stack';

import SplashScreen from '../screens/SplashScreen';

const Splash = createStackNavigator(
  {
    Splash: SplashScreen,
  },
  {headerMode: 'none'},
);
export default Splash;
