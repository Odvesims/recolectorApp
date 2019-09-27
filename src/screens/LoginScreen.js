/*Home Screen With buttons to navigate to different options*/
import React, {Component} from 'react';
import {theme} from '../constants';
import nextFrame from 'next-frame';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const encryptionKey =
  '000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F';

import {
  View,
  StyleSheet,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Button,
  Icon,
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from '../components/BoldLargeText';
import NormalText from '../components/NormalText';
import BottomButton from '../components/BottomButton';
import CustomTextInput from '../components/TextInput';
import ToastMessage from '../components/ToastMessage';

import {getTranslation} from '../helpers/translation_helper';
import {encryptData, decryptData} from '../helpers/encryption_helper';

import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'UserDatabase.db'});

/*import ConfigurationScreen from './pages/configscreen';*/

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingMessage: '',
      deviceLanguage: 'en',
      validLogin: true,
      userName: '',
      userPassword: '',
      hostName: '',
      visible: false,
      toastMsg: '',
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

  async getUserConfig() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM app_configurations', [], (tx, results) => {
        for (let i = 0; i < results.rows.length; ++i) {
          let row = results.rows.item(i);
          this.setState({
            hostName: row.host_name,
          });
        }
      });
    });
  }

  async getUserLogin() {
    let validNot = true;
    let responseError = 0;
    let user_name = this.state.userName;
    let user_pass = this.state.userPassword;
    if (user_name) {
      if (user_pass) {
        if (this.state.hostName == '') {
          await this.getUserConfig();
        }
        await nextFrame();
        let getUrl =
          'https://' +
          this.state.hostName +
          '/apimobile?apiOption=' +
          'GET_LOGIN' +
          '&username=' +
          this.state.userName +
          '&password=' +
          this.state.userPassword;
        try {
          let response = await fetch(getUrl, {method: 'GET'});
          const responseJson = await response.json();
          if (JSON.stringify(responseJson) == '{}') {
            validNot = false;
            responseError = 'ALERT_BLANK_RESPONSE';
          } else {
            if (responseJson.response != 'valid') {
              responseError = responseJson.error_message;
              validNot = false;
            }
          }
          this.setState({loadingMessage: ''});
          this.setState({validLogin: validNot});
          return [validNot, responseError];
        } catch (error) {
          this.setState({loading: false});
          return [false, 'ALERT_BLANK_RESPONSE'];
        }
      } else {
        return [false, 'ALERT_PASSWORD_BLANK'];
      }
    } else {
      return [false, 'ALERT_USER_BLANK'];
    }
  }

  customClickHandler = cClick => {
    this.setState({loading: true});
    this.setState({
      loadingMessage: getTranslation(
        this.state.deviceLanguage,
        'MESSAGE_SIGNIN',
      ),
    });
    this.getUserLogin().then(result => {
      if (result[0]) {
        this.setState({userName: ''});
        this.setState({userPassword: ''});
        this.goHome();
      } else {
        this.setState({
          visible: true,
          toastMsg: getTranslation(this.state.deviceLanguage, result[1]),
        });
        setTimeout(() => {
          this.setState({visible: false, toastMsg: ''});
        }, 2000);
      }
      this.setState({loading: false});
    });
  };

  goHome = cClick => {
    this.props.navigation.navigate('HomeScreen');
  };

  goConfig = cClick => {
    this.props.navigation.navigate('Configuration');
  };

  static navigationOptions = {
    header: null,
  };

  inputs = {};

  focusTheField = id => {
    this.inputs[id]._root.focus();
  };

  render() {
    return (
      <Container>
        <Header transparent>
          <Right>
            <Button transparent onPress={this.goConfig}>
              <Icon
                name="settings"
                style={{color: theme.colors.gray, fontSize: 32}}
              />
            </Button>
          </Right>
        </Header>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={false}>
          <View>
            <Spinner
              visible={this.state.loading}
              textContent={this.state.loadingMessage}
              color={'CE2424'}
              overlayColor={'rgba(255, 255, 255, 0.4)'}
              animation={'slide'}
            />
            <BoldLargeText text="APP Name" style={{textAlign: 'center'}} />
            <NormalText
              text={
                getTranslation(this.state.deviceLanguage, 'TITLE_USER') + ':'
              }
              style={styles.NormalText}
            />
            <CustomTextInput
              onChangeText={userName => {
                this.setState({userName: userName});
              }}
              secured={false}
              value={this.state.userName}
            />
            <NormalText
              id="password"
              text={
                getTranslation(this.state.deviceLanguage, 'TITLE_PASSWORD') +
                ':'
              }
              style={styles.NormalText}
            />
            <CustomTextInput
              onChangeText={userPassword => {
                this.setState({userPassword: userPassword});
              }}
              secured={true}
              value={this.state.userPassword}
            />
            <BottomButton
              customClick={this.customClickHandler}
              title={getTranslation(this.state.deviceLanguage, 'TITLE_SIGNIN')}
            />
            <ToastMessage
              visible={this.state.visible}
              message={this.state.toastMsg}
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignContent: 'center',
    justifyContent: 'center',
  },

  NormalText: {
    marginLeft: 10,
    marginTop: 20,
    textAlign: 'left',
  },
});
