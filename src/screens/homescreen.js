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
import Toast, {DURATION} from 'react-native-easy-toast';
import BluetoothManagerComponent from '../components/BluetoothManagerComponent';

import HeaderBar from '../components/HeaderBar';

import {getTranslation} from '../helpers/translation_helper';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPassword: '',
      lastUpdate: '',
      loading: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Container style={styles.androidHeader}>
        <HeaderBar
          headerTitle={global.translate('TITLE_PRINCIPAL')}
          openDrawer={this.props.navigation.openDrawer}
          userName={this.state.userName}
          userPassword={this.state.userPassword}
          lastUpdate={this.state.lastUpdate}
        />
        <Body></Body>
      </Container>
    );
  }
}
export default Home;
const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});
