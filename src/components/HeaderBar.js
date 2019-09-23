import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Icon, Button, Container, Content, Header, Body, Left, Right, Title, Drawer} from 'native-base';
import Toast, {DURATION} from 'react-native-easy-toast';

import { getTranslation } from '../helpers/translation_helper';
import FetchingData from './FetchingData';

class HeaderBar extends Component {
	
	constructor(props) {
		super(props);	
		this.syncData = this.syncDataClickHandler.bind(this);
		this.state = {
			loading: false,
		}
	}		
	
	async getRemoteData(apiOption){
		this.setState({loading: true});
		let validNot = true;
		let responseError = 0;
		getUrl = "http://3.216.197.193/apimobile?apiOption=" +  apiOption + "&username=" + this.props.userName + "&password=" + this.props.userPassword + "&last_update=" + this.props.lastUpdate;
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
	
	syncDataClickHandler = (cClick) => {
		this.setState({loading: true});
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
						this.refs.toast.show(getTranslation(this.props.deviceLanguage, 101), 3000);
					}
					this.setState({loading: false});
				});								
			});				
		});
	}
	render() {
		return (	
			<View>
				<Header>
					<Left>
						<Button transparent>
							<Icon name="menu" onPress={this.props.openDrawer} />
						</Button>
					</Left>
					<Body>
						<Title>{this.props.headerTitle}</Title>
					</Body>
					<Right>
						<FetchingData syncData = {this.syncDataClickHandler} fetching = {this.state.loading} />
						<Button transparent>
							<Icon name="notifications" />
						</Button>
					</Right>
				</Header>
				<Toast
					ref="toast"
					style={{backgroundColor:'#CE2424'}}
					position='bottom'
					positionValue={0}
					fadeInDuration={750}
					fadeOutDuration={750}
					opacity={0.8}
					textStyle={{color:'white'}}
				/>
			</View>
		);
	}
} export default HeaderBar;