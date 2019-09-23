import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

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
import Clients from '../screens/Clients/Clients';
import NewClient from '../screens/Clients/NewClient';

// const AppStackNavigator = createStackNavigator({
//   LoginScreen: {
//     screen: LoginScreen,
//     navigationOptions: {
//       title: 'Inicio',
//       headerMode: 'none',
//       navigationOptions: {
//         headerVisible: false,
//       },
//     },
//   },
//   HomeScreen: {
//     screen: HomeScreen,
//     navigationOptions: {
//       headerStyle: {backgroundColor: '#4285F4'},
//       headerTintColor: '#ffffff',
//       headerLeft: null,
//     },
//   },
// });

const AppDrawerNavigator = createDrawerNavigator(
  {
    LoginScreen: {screen: LoginScreen},
    HomeScreen: {screen: HomeScreen},
    Clients: {screen: Clients},
    NewClient: {screen: NewClient},
  },
  {
    initialRouteName: 'LoginScreen',
    drawerPosition: 'left',
    drawerType: 'front',
    overlayColor: '#424242',
  },
);

// const CustomDrawerContentComponent = () => {
//   return (
//     <Container>
//       <Header style={styles.androidHeader}>
//         <Body>
//           <Left style={styles.menuProfile}>
//             <Text style={{ color: "white", fontWeight: "bold" }}>
//               Andris Alberto Ramirez Chireno
//             </Text>
//             <TouchableOpacity style={styles.role}>
//               <Text style={{ color: "white", fontWeight: "bold" }}>
//                 Supervisor
//               </Text>
//             </TouchableOpacity>
//           </Left>

//           <Right>
//             <Text>Editar Perfil</Text>
//           </Right>
//         </Body>
//       </Header>
//     </Container>
//   );
// };

const styles = StyleSheet.create({
  menuProfile: {backgroundColor: '#4285F4'},
  role: {
    backgroundColor: '#4285F4',
    borderRadius: 4,
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});

export default createAppContainer(AppDrawerNavigator);
