import React, { Component } from "react";

import { Text, View, StyleSheet, ScrollView, Platform, StatusBar } from "react-native";
import { Icon, Button, Container, Content, Header, Body, Left, Right, Title, Drawer } from "native-base";
import NavigationHeader from '../components/NavigationHeader';

class Home extends Component {
  // static navigationOptions = {
  //   title: "Home",
  //   drawerIcon: ({ focused }) => (
  //     <Ionicons name="md-home" size={24} color={focused ? "blue" : "black"} />
  //   )
  // };

  render() {
    return (
		<Container style={styles.androidHeader}>	  
			<Header>
				<Left>
					<Button transparent>
						<Icon name="menu" onPress={this.props.navigation.openDrawer} />
					</Button>
				</Left>
				<Body>
					<Title>Inicio</Title>
				</Body>
				<Right>
					<Button transparent>
						<Icon name="notifications" />
					</Button>
				</Right>
			</Header>
		</Container>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        //paddingTop: StatusBar.currentHeight
      }
    })
  }
});

export default Home;
