import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Button } from 'native-base';

class FetchingData extends Component {
	
	constructor(props) {
		super(props);	
		this.state = {
			loading: false,		
			userName : "",
			userPassword : "",
			lastUpdate: "",
			userDataBase : "",
			deviceLanguage : "",
		}
	}	
	
	async getRemoteData(apiOption){
		this.setState({loading: true});
		validNot = true;
		responseError = 0;
		getUrl = "http://updates.sojaca.net/apimobile?apiOption=" +  apiOption + "&username=" + this.props.userName + "&password=" + this.props.userPassword + "&last_update=" + this.props.lastUpdate;
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
			return [validNot, responseError, apiOption];
		} catch(error){
			this.setState({loading: false});
			return [false, 999, apiOption];
		}
	}
	
	customClickHandler = (cClick) => {
		validLoad = true;
		this.getRemoteData(2).then((result) => {
			if(!result[0]){
				validLoad = false;
			}
			this.getRemoteData(3).then((result) => {
				if(!result[0]){
					validLoad = false;
				}
				this.getRemoteData(4).then((result) => {
					if(!result[0]){
						validLoad = false;
					}
					validNot = false;
					if(!validNot){
						this.refs.toast.show('Algunos datos no se cargaron',DURATION.LENGTH_LONG);
					} else{
						alert("Todo bien")
					}
					this.setState({loading: false});
				});								
			});				
		});
	}
	
	render() {
		
		return (
			<View>
				<Button onPress = {this.customClickHandler} transparent>
					<Icon name="sync" />
				</Button>
			</View>
		);
	}
} export default FetchingData;