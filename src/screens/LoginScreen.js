/*Home Screen With buttons to navigate to different options*/
import React, {Component} from 'react';
import {theme} from '../constants';

import {Container, Header, Right, Button, Icon, Content} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import BoldLargeText from '../components/BoldLargeText';
import NormalText from '../components/NormalText';
import BottomButton from '../components/BottomButton';
import CustomTextInput from '../components/TextInput';
import {getTranslation} from '../helpers/translation_helper';
import {openDatabase} from 'react-native-sqlite-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  View,
  StyleSheet,
  NativeModules,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

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
    };
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='app_configurations'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS app_configurations', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS app_configurations(id INTEGER PRIMARY KEY AUTOINCREMENT, host_name VARCHAR(100), port_number INT(10), uses_printer BOOLEAN)',
              [],
            );
          }
        },
      );
    });

    // this.focusNextField = this.focusNextField.bind(this);
    // // to store our input refs
    // this.inputs = {};
  }

  static navigationOptions = {
    header: null,
  };

  // focusNextField(key) {
  //   this.inputs[key].focus();
  // }

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

  async getUserLogin() {
    this.setState({loading: true});
    this.setState({
      loadingMessage: getTranslation(
        this.state.deviceLanguage,
        'MESSAGE_SIGNIN',
      ),
    });
    let validNot = true;
    let responseError = 0;
    let getUrl =
      'http://updates.sojaca.net/apimobile?apiOption=1&username=' +
      this.state.userName +
      '&password=' +
      this.state.userPassword;
    try {
      let response = await fetch(getUrl, {method: 'GET'});
      const responseJson = await response.json();
      if (JSON.stringify(responseJson) == '{}') {
        validNot = false;
        responseError = 999;
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
      return [false, 999];
    }
  }

  customClickHandler = cClick => {
    this.getUserLogin().then(result => {
      if (result[0]) {
        this.goHome();
      } else {
        alert(
          getTranslation(this.state.deviceLanguage, result['ALERT_CONNECTION']),
        );
      }
      this.setState({loading: false});
    });
  };

  goHome = cClick => {
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    return (
      <Container>
        <Header transparent>
          <Right>
            <Button transparent onPress={() => {}}>
              <Icon
                name="settings"
                style={{color: theme.colors.gray, fontSize: 32}}
              />
            </Button>
          </Right>
        </Header>

        <KeyboardAwareScrollView
          resetScrollToCoords={{x: 0, y: 0}}
          behavior="padding"
          contentContainerStyle={styles.container}>
          <View>
            <Spinner
              visible={this.state.loading}
              textContent={this.state.loadingMessage}
            />
            <BoldLargeText text="APP Name" style={{textAlign: 'center'}} />
            <NormalText
              text={
                getTranslation(this.state.deviceLanguage, 'TITLE_USER') + ':'
              }
              style={styles.NormalText}
            />
            <CustomTextInput
              blurOnSubmit={false}
              returnKeyType="next"
              ref={ref => {
                this._nameinput = ref;
              }}
              onSubmitEditing={() => this._passinput.focus()}
              onChangeText={userName => {
                this.setState({userName: userName});
              }}
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
              blurOnSubmit={false}
              ref={ref => {
                this._passinput = ref;
              }}
              onChangeText={userPassword => {
                this.setState({userPassword: userPassword});
              }}
            />
            <BottomButton
              customClick={this.customClickHandler}
              title={getTranslation(this.state.deviceLanguage, 'TITLE_SIGNIN')}
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
