/*Home Screen With buttons to navigate to different options*/
import React, {Component, Alert} from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from './components/boldLargeText';
import NormalText from './components/normalText';
import BottomButton from './components/bottomButton';
import CustomTextInput from './components/textInput';

import { getDataUsingGet } from './helpers/communication_helper';
	
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
export default class LoginScreen extends Component {
	state = {
		loading: false,
	  };
	constructor(props) {
		super(props);	
		db.transaction(function(txn) {
			txn.executeSql(
				"SELECT name FROM sqlite_master WHERE type='table' AND name='app_configurations'",
				[],
				function(tx, res) {
				console.log('item:', res.rows.length);
					if (res.rows.length == 0) {
						txn.executeSql('DROP TABLE IF EXISTS app_configurations', []);
						txn.executeSql(
							'CREATE TABLE IF NOT EXISTS app_configurations(id INTEGER PRIMARY KEY AUTOINCREMENT, host_name VARCHAR(100), port_number INT(10), uses_printer BOOLEAN))',
							[]
						);
					}
				}
			);
		});
	}
	
    static navigationOptions = {
        header: null,
    }
	render() {
		return (
			<View>
				<Spinner
				  visible={this.state.loading}
				  textContent={'Loading...'}
				/>
				<BoldLargeText text="APP Name" style={{marginTop: 80, textAlign: "center"}} />
				<NormalText text="Usuario" style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
				<CustomTextInput />
				<NormalText text="Contraseña" style={{marginLeft: 10, marginTop: 20, textAlign: "left"}} />
				<CustomTextInput />
				<BottomButton customClick={() => {this.setState({loading: true}); this.setState({loading: getDataUsingGet(1, 'https://jsonplaceholder.typicode.com/postss/1')}) }}
				  title="Iniciar Sesión"
				/>
			</View>
		);
	}
}