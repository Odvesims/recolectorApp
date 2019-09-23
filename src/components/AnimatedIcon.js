import React, { Component } from 'react';
import { View, Container, Animated, Easing } from 'react-native';
import { Icon, Button } from 'native-base';
import Toast, {DURATION} from 'react-native-easy-toast';

class AnimatedIcon extends Component {
	
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
	
	render() {	
	
		const spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg']
		});
		
		const AnimatedIcon = Animated.createAnimatedComponent(Icon);
		
		return (
			<Button onPress= {this.props.onPress} transparent>
				<AnimatedIcon name = {this.props.name} style = { this.props.fecthing? { transform: [{rotate: spin}]} : {} } />
			</Button>
		);
	}
} export default AnimatedIcon;