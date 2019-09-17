import React, { Component }  from 'react';
import { Button, View, Alert, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
		
const styles = StyleSheet.create({
	indicator: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 80
	}
});

class pruebaComponent extends Component {
  
	constructor(props){		
		super(props);
		this.state = { data: true }
		this.onclickButton = this.onclickButton.bind(this);
		host = "facebook.github.io/react-native/";
		request_url = "";
		console.log('El componente aun no se ha montado');
	}
   
	onclickButton(){
		this.state.data = null;
	}
 
	render() {
		if (!this.state.data) {
			return (
				<ActivityIndicator
					animating={true}
					style={styles.indicator}
					size="large"
				/>
			);
		}
		return (
			<View>
				<FlatList
					data={this.state.dataSource}
					renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
					keyExtractor={({id}, index) => id}
				/>
				<Button onPress={ () => this.onclickButton() } title = "Hola" />
			</View>
		);
	}
	
	async getRemoteJson(theOption) {
		this.request_url = "http://18.235.214.16/getremotejson/" + theOption;
		try {
			let response = await fetch(this.request_url);
			let responseJson = await response.json();
			let dataSource = responseJson.movies;
			alert(responseJson.movies);
		} catch (error) {
			alert( "error: " + error);
		}
		this.state.data = true;
	}
   
} export default pruebaComponent;

