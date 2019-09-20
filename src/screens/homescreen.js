import React, { Component } from "react";
import Toast, {DURATION} from 'react-native-easy-toast';

import { Text, View, StyleSheet, ScrollView, Platform, StatusBar, NativeModules } from "react-native";
import { Icon, Button, Container, Content, Header, Body, Left, Right, Title, Drawer } from "native-base";
import NavigationHeader from '../components/NavigationHeader';

import { getTranslation } from '../helpers/translation_helper';

import FetchingData from '../components/FetchingData';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

class Home extends Component {
  // static navigationOptions = {
  //   title: "Home",
  //   drawerIcon: ({ focused }) => (
  //     <Ionicons name="md-home" size={24} color={focused ? "blue" : "black"} />
  //   )
  // };
	constructor(props) {
		super(props);	
		this.state = {
			loading: false,
			deviceLanguage: "en",
		};
	}

	componentDidMount() {
		this.setState({loading: false});
		if (Platform.OS === 'android') {
			this.setState({deviceLanguage : NativeModules.I18nManager.localeIdentifier.split('_')[0]});
		} else {
			this.setState({deviceLanguage : NativeModules.SettingsManager.settings.AppleLocale.split('_')[0]});
		}
	}
	
	render() {
		return (
			<Container style={styles.androidHeader}>	  
				<Header>
					<Left>
						<Button transparent>
							<Icon name="menu" onPress={this.props.navigation.openDrawer} />
						</Button>
					</Left>
					<Body>
						<Title>{getTranslation(this.state.deviceLanguage, 100)}</Title>
					</Body>
					<Right>
						<FetchingData userName = {"oscar"} userPassword= {"123456"} lastUpdate = {"2019-09-19 12:45:00"} userDataBase = {"UserDatabase.db"} deviceLanguage = {this.state.deviceLanguage} />
						<Button transparent>
							<Icon name="notifications" />
						</Button>
					</Right>
				</Header>
				<Toast
					ref="toast"
					style={{backgroundColor:'#CE2424', paddingLeft: 10}}
					position='bottom'
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{color:'white'}}
				/>
			</Container>
		);
	}
} export default Home;

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        //paddingTop: StatusBar.currentHeight
      }
    })
  }
});

