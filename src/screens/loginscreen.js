/*Home Screen With buttons to navigate to different options*/
import React, {Component, Alert} from 'react';
import { View, StyleSheet, NativeModules, KeyboardAvoidingView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from '../components/BoldLargeText';
import NormalText from '../components/NormalText';
import BottomButton from '../components/BottomButton';
import CustomTextInput from '../components/TextInput';

import { getTranslation } from '../helpers/translation_helper';
	
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

import NavigationService from '../services/NavigationService.js';

/*import ConfigurationScreen from './pages/configscreen';*/

export default class LoginScreen extends Component {	
	
	constructor(props) {
		super(props);	
		this.state = {
			loading: false,
			loadingMessage: "",
			deviceLanguage: "en",
			validLogin: true,
		};
		db.transaction(function(txn) {
			txn.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='app_configurations'",
				[],
				function(tx, res) {
				console.log('item:', res.rows.length);
					if (res.rows.length == 0) {
						txn.executeSql('DROP TABLE IF EXISTS app_configurations', []);
						txn.executeSql(
							'CREATE TABLE IF NOT EXISTS app_configurations(id INTEGER PRIMARY KEY AUTOINCREMENT, host_name VARCHAR(100), port_number INT(10), uses_printer BOOLEAN)',
							[]
						);
					}
				}
			);
		});	
	}

	componentDidMount() {
		this.setState({loading: false});
		if (Platform.OS === 'android') {
			this.setState({deviceLanguage : NativeModules.I18nManager.localeIdentifier.split('_')[0]});
		} else {
			this.setState({deviceLanguage : NativeModules.SettingsManager.settings.AppleLocale.split('_')[0]});
		}
	}	
		
	async getUserLogin(){
		this.setState({loading: true});
		this.setState({loadingMessage: getTranslation(this.state.deviceLanguage, 3)});
		validNot = true;
		responseError = 0;
		getUrl = "http://updates.sojaca.net/apimobile?myOption=1&username=" + this.state.username + "&password=" + this.state.userPassword;
		try {
			let response = await fetch(getUrl, { method: 'GET' });
			const responseJson =  await response.json();
			if(JSON.stringify(responseJson) == '{}'){
				validNot = false;
				responseError = 999;
			} else{
				if(responseJson.response != "valid"){
					responseError = responseJson.error_message
					validNot = false;
				}
			}
			this.setState({loadingMessage: ""});
			this.setState({validLogin: validNot});
			return [validNot, responseError];
		} catch(error){
			this.setState({loading: false});
			return [false, 999];
		}
	}
	
	customClickHandler = (cClick) => {
		this.getUserLogin().then((result) => {
			if(result[0]){
				/*NavigationService.navigate('HomeScreen', {
					title: 'Inicio',
				});*/				
				this.goHome();
			} else{
				alert(getTranslation(this.state.deviceLanguage, result[1]));
			}
			this.setState({loading: false});				
		});
	}
	
	goHome = (cClick) => {
		this.props.navigation.navigate('HomeScreen');
	}
	
    static navigationOptions = {
        header: null,
    }
	
	render() {	
		
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View>
					<Spinner
					  visible={this.state.loading}
					  textContent={this.state.loadingMessage}
					/>
					<BoldLargeText text="APP Name" style={{textAlign: "center"}} />
					<NormalText text= {getTranslation(this.state.deviceLanguage, 4) + ":"} style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
					<CustomTextInput onChangeText={(username) => {this.setState({username: username})}} />
					<NormalText id = "password" text= {getTranslation(this.state.deviceLanguage, 5) + ":"} style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
					<CustomTextInput onChangeText={(userPassword) => {this.setState({userPassword: userPassword})}} />
					<BottomButton customClick={this.customClickHandler}
						title= {getTranslation(this.state.deviceLanguage, 6)}
					/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
		alignContent: "center",
		justifyContent: "center",
	}
});