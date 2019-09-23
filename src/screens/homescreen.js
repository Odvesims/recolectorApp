import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Platform, StatusBar, NativeModules } from "react-native";
import { Icon, Button, Container, Content, Header, Body, Left, Right, Title, Drawer } from "native-base";
import Toast, {DURATION} from 'react-native-easy-toast';
import BluetoothManagerComponent from '../components/BluetoothManagerComponent';

import HeaderBar from '../components/HeaderBar';

import { getTranslation } from '../helpers/translation_helper';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

class Home extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			deviceLanguage: "en",
			userName : "",
			userPassword: "",
			lastUpdate: "",
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
				<HeaderBar headerTitle = {getTranslation(this.state.deviceLanguage, 100)} openDrawer = {this.props.navigation.openDrawer} deviceLanguage = {this.state.deviceLanguage} userName = {this.state.userName} userPassword = {this.state.userPassword} lastUpdate={this.state.lastUpdate} />
				<Body>
				</Body>
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



