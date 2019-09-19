import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import NavigationService from './src/services/navigationservice';
 
import LoginScreen from './src/screens/loginscreen';
import HomeScreen from './src/screens/homescreen';
/*import RegisterUser from './pages/registeruser';
import UpdateUser from './pages/updateuser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';*/
 
const TopLevelNavigator = createStackNavigator({
	LoginScreen: {
		screen: LoginScreen,
		navigationOptions: {
			title: 'Inicio',
			headerMode: 'none',
			navigationOptions: {
				headerVisible: false,
			}
		},
	},	
	HomeScreen: {
		screen: HomeScreen,
		navigationOptions: {
			headerStyle: { backgroundColor: '#4285F4' },
			headerTintColor: '#ffffff',
			headerLeft: null
		}
	},
	/*View: {
		screen: ViewUser,
		navigationOptions: {
			title: 'View User',
			headerStyle: { backgroundColor: '#f05555' },
			headerTintColor: '#ffffff',
		},
	},
	ViewAll: {
		screen: ViewAllUser,
		navigationOptions: {
			title: 'View All User',
			headerStyle: { backgroundColor: '#f05555' },
			headerTintColor: '#ffffff',
		},
	},
	Update: {
		screen: UpdateUser,
		navigationOptions: {
			title: 'Update User',
			headerStyle: { backgroundColor: '#f05555' },
			headerTintColor: '#ffffff',
		},
	},
	Register: {
		screen: RegisterUser,
		navigationOptions: {
			title: 'Register User',
			headerStyle: { backgroundColor: '#f05555' },
			headerTintColor: '#ffffff',
		},
	},
	Delete: {
		screen: DeleteUser,
		navigationOptions: {
		title: 'Delete User',
		headerStyle: { backgroundColor: '#f05555' },
		headerTintColor: '#ffffff',
		},
	},*/
});
const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  // ...

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
