import React, {Component} from 'react';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  NativeModules,
} from 'react-native';
import {
  Icon,
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
  Drawer,
} from 'native-base';

import NavigationHeader from '../components/NavigationHeader';

import {getTranslation} from '../helpers/translation_helper';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

class Home extends Component {
  // static navigationOptions = {
  //   title: "Home",
  //   drawerIcon: ({ focused }) => (
  //     <Ionicons name="md-home" size={24} color={focused ? "blue" : "black"} />
  //   )
  // };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      deviceLanguage: 'en',
    };
  }

  componentDidMount() {
    this.setState({loading: false});
    if (Platform.OS === 'android') {
      this.setState({
        deviceLanguage: NativeModules.I18nManager.localeIdentifier.split(
          '_',
        )[0],
      });
    } else {
      this.setState({
        deviceLanguage: NativeModules.SettingsManager.settings.AppleLocale.split(
          '_',
        )[0],
      });
    }
  }

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
            <Title>{getTranslation(this.state.deviceLanguage, 100)}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="sync" />
            </Button>
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
      },
    }),
  },
});

export default Home;
