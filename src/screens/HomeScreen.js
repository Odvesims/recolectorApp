import React, {Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {NavigationActions} from 'react-navigation';

import {
  Text,
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  ProgressBarAndroid,
  StyleSheet,
  Platform,
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
let db = openDatabase({name: 'UserDatabase.db'});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      deviceLanguage: 'en',
    };
  }

  static navigationOptions = {
    header: null,
  };

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

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <Container style={styles.androidHeader}>
        <Header>
          <Left>
            <Button transparent onPress={this.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Principal</Title>
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
        <Content></Content>
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
