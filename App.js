/*import React from 'react';
import Test from './components/test';
import PruebaComponent from './components/prueba';
import ActivityIndicatorScreen from './components/activity';

const App = () => {
	
   return (
		<ActivityIndicatorScreen />
   )
}
export default App;
*/

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
 
import LoginScreen from './pages/loginscreen';
/*import HomeScreen from './pages/homescreen';
import RegisterUser from './pages/registeruser';
import UpdateUser from './pages/updateuser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';*/
 
const App = createStackNavigator({
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
	/*HomeScreen: {
		screen: HomeScreen,
		navigationOptions: {
			title: 'Inicio',
			headerStyle: { backgroundColor: '#f05555' },
			headerTintColor: '#ffffff',
		},
	},View: {
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
export default createAppContainer(App);
