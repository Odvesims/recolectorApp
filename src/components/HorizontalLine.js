import React, { Component } from 'react';
import { View } from 'react-native';

class HorizontalLine extends Component {
	render(){
		return(
			<View
			  style={{
				borderBottomColor: '#D8D8D8',
				borderBottomWidth: 1,
				paddingTop: 5,
				paddingBottom: 5,
			  }}
			/>
		)
	}
} export default HorizontalLine