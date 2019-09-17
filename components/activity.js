import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Loader from '../components/loader';
	
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		height: Dimensions.get('window').height,
		padding: 15,
		display: 'flex',
		alignItems: 'flex-start',
		width: '100%',
		paddingTop: 25
	}
});

class ActivityIndicatorScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			address: ''
		}
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Loader loading={this.state.loading} />
				<Text style={{fontSize: 24, paddingBottom: 20, fontWeight: 'bold'}}>Infinity Yoga Brookhaven</Text>
				<Text style={{fontSize: 18, paddingBottom: 10}}>{`${this.state.address}`}</Text>
			</View>
		);
	};
}
export default ActivityIndicatorScreen;
