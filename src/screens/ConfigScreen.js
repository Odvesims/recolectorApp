/*Home Screen With buttons to navigate to different options*/
import React, {Component, Alert} from 'react';
import {theme} from '../constants';
import { View, StyleSheet, NativeModules, KeyboardAvoidingView, Picker, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Content, Icon, Button, Header, Left, Title, Body } from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from '../components/BoldLargeText';
import NormalText from '../components/NormalText';
import BottomButton from '../components/BottomButton';
import CustomTextInput from '../components/TextInput';

import { getTranslation } from '../helpers/translation_helper';
	
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

import NavigationService from '../services/NavigationService';
import {BluetoothEscposPrinter} from "react-native-bluetooth-escpos-printer";


/*import ConfigurationScreen from './pages/configscreen';*/

export default class ConfigScreen extends Component {	
	
	constructor(props) {
		super(props);	
		this.state = {
			hostName : "",
			portNumber : "",
			usesPrinter : "",
			configDone : false,
		}
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
		this.setState({loading: true});
		this.getUserConfig().then(() => {			
			this.setState({loading: false});
		});
		if (Platform.OS === 'android') {
			this.setState({deviceLanguage : NativeModules.I18nManager.localeIdentifier.split('_')[0]});
		} else {
			this.setState({deviceLanguage : NativeModules.SettingsManager.settings.AppleLocale.split('_')[0]});
		}
	}

	async getUserConfig(){
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM app_configurations', [], (tx, results) => {
				var temp = [];
				if(results.rows.length > 0 ){
					this.setState({configDone: true});
				}
				for (let i = 0; i < results.rows.length; ++i) {
					let row = results.rows.item(i);
					this.setState({
						hostName: row.host_name,
						portNumber: row.port_number.toString(),
						usesPrinter: row.uses_printer,
					});
				}
			});
		});
	}
	
	async deleteUserConfig(){
		db.transaction(tx => {
			tx.executeSql('DELETE FROM app_configurations', [], (tx, results) => {});
		});
	}
		
	async saveUserConfig(){		
		const { hostName } = this.state;
		const { portNumber } = this.state;
		const { usesPrinter } = this.state;
		if(hostName){
			if(portNumber){
				if(!this.state.configDone){
					db.transaction(function(tx) {
						tx.executeSql('INSERT INTO app_configurations (host_name, port_number, uses_printer) VALUES (?,?,?)', [hostName, portNumber, usesPrinter],
							(tx, results) => {
								if (results.rowsAffected > 0) {
									alert(getTranslation(this.state.deviceLanguage, "ALERT_REGISTER_SUCCESFUL"));
								} else{
									alert(getTranslation(this.state.deviceLanguage, "ALERT_REGISTER_FAILED"));
								}
							}
						);
					});
				} else{
					db.transaction((tx)=> {
						tx.executeSql('UPDATE app_configurations set host_name=?, port_number=? , uses_printer=?', [hostName, portNumber, usesPrinter],
						(tx, results) => {
							if(results.rowsAffected>0){
								alert(getTranslation(this.state.deviceLanguage, "ALERT_UPDATE_SUCCESFUL"));
							} else{
								alert(getTranslation(this.state.deviceLanguage, "ALERT_UPDATE_FAILED"));
							}
						});
					})
				}
			} else{
				alert(getTranslation(this.state.deviceLanguage,"ALERT_PORT_BLANK")); 
			}
		} else{
			alert(getTranslation(this.state.deviceLanguage,"ALERT_DOMAIN_BLANK")); 
		}
	}
	
	goLogin = (cClick) => {
		this.props.navigation.navigate('LoginScreen');
	}
	
    static navigationOptions = {
        header: null,
    }
	
	render() {	
		
		return (
			<Container>
				<Header style = {headerStyles.androidHeader}>
				  <Left>
					<Button
					  transparent
					  onPress={this.goLogin}>
					  <Icon
						name="arrow-back"
					  />
					</Button>
					</Left>
					<Body>
						<Title>{getTranslation(this.state.deviceLanguage, "TITLE_CONFIGURATION")}</Title>
					</Body>
				</Header>
				<Content>
					<KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled>
						<Spinner
							visible={this.state.loading}
							textContent={this.state.loadingMessage}
						/>
						<NormalText text= {getTranslation(this.state.deviceLanguage, "TITLE_DOMAIN") + ":"} style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
						<CustomTextInput value={this.state.hostName} onChangeText={(hostName) => {this.setState({hostName: hostName}) }}/>
						<NormalText text= {getTranslation(this.state.deviceLanguage, "TITLE_PORT") + ":"} style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
						<CustomTextInput value={this.state.portNumber} onChangeText={(portNumber) => {this.setState({portNumber: portNumber}) }} />
						<NormalText text= {getTranslation(this.state.deviceLanguage, "TITLE_USES_PRINTER") + ":"} style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
						<Picker
							selectedValue={this.state.usesPrinter}
							onValueChange={(itemValue, itemIndex) =>
								this.setState({usesPrinter: itemValue})
							}>
							<Picker.Item label= {getTranslation(this.state.deviceLanguage, "TITLE_YES")} value={'0'} />
							<Picker.Item label= {getTranslation(this.state.deviceLanguage, "TITLE_NO")}  value={'1'} />
						</Picker>	
						<View>
							<BottomButton customClick={this.saveUserConfig.bind(this)}
								title= {getTranslation(this.state.deviceLanguage, "TITLE_SAVE")}
							/>
						</View>
					</KeyboardAwareScrollView>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignContent: "center",
		justifyContent: "center",
	}
});

const headerStyles = StyleSheet.create({
	androidHeader: {
		...Platform.select({
			android: {
				paddingTop: StatusBar.currentHeight,
			}
		})
	}
});