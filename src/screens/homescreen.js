/*Home Screen With buttons to navigate to different options*/
import React, {Component, Alert} from 'react';
import { View, StyleSheet, NativeModules, Text } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from '../components/boldLargeText';
import NormalText from '../components/normalText';
import BottomButton from '../components/bottomButton';
import CustomTextInput from '../components/textInput';

import { getTranslation } from '../helpers/translation_helper';
	
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

import NavigationService from '../services/navigationservice.js';


export default class HomeScreen extends Component {	
	
	constructor(props) {
		super(props);	
		this.state = {
			loading: false,
			loadingMessage: "",
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
	
    static navigationOptions = {
    }
	
	render() {	
		
		return (
			<View>
				<Text>{getTranslation(this.state.deviceLanguage, 1)}</Text>
			</View>
		);
	}
}