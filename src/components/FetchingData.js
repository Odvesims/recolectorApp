import React, { Component } from 'react';
import { View, Container, Animated, Easing } from 'react-native';
import { Icon, Button } from 'native-base';
import Toast, {DURATION} from 'react-native-easy-toast';

class FetchingData extends Component {
	
	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0);
	}
	
	componentDidMount() {
		this.fetchingSpin();
	}
	
	fetchingSpin() {
		this.spinValue.setValue(0)
		Animated.timing(
			this.spinValue,
			{
				toValue: 1,
				duration: 1500,
				easing: Easing.linear
			}
		).start(() => this.fetchingSpin())
	}
	
	async runSync(){
		this.props.syncData();
	}
	
	render() {	
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['360deg', '0deg']
		});
		const AnimatedIcon = Animated.createAnimatedComponent(Icon);
		
		return (
			<Button onPress= {this.props.syncData} transparent>
				<AnimatedIcon name="sync" style = { this.props.fetching? {transform: [{rotate: spin}]} : {}} />
			</Button>
		);
	}
} export default FetchingData;