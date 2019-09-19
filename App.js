import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import NavigationService from './src/services/NavigationService';
 
import Navigation from "./src/navigations/";

class App extends Component {

	render() {
		return <Navigation />;
	}
} export default App;