/*Home Screen With buttons to navigate to different options*/
import React, {Component} from 'react';
import {theme} from '../constants';
import nextFrame from 'next-frame';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {View, StyleSheet} from 'react-native';

import {Container, Header, Right, Button, Icon} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from '../components/BoldLargeText';
import NormalText from '../components/NormalText';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/TextInput';
import ToastMessage from '../components/ToastMessage';

import {getUserConfig} from '../helpers/sql_helper';
import {setUserTable} from '../helpers/sql_helper';

/*import ConfigurationScreen from './pages/configscreen';*/

export default class LoginScreen extends Component {
  constructor(props) {
    global.deviceLanguage;
    global.hostName;
    global.portNumber;
    global.userName;
    global.userPassword;
    global.lastUpdatedDate;
    global.forceUpdate = false;
    let firstLogin = '';
    super(props);
    this.state = {
      loading: false,
      loadingMessage: '',
      validLogin: true,
      userName: '',
      userPassword: '',
      hostName: '',
      portNumber: 444,
      visible: false,
      toastMsg: '',
    };
    setUserTable();
    getUserConfig();
  }

  componentDidMount() {}

  async getUserLogin() {
    let validNot = true;
    let responseError = 0;
    let user_name = this.state.userName;
    let user_pass = this.state.userPassword;
    if (user_name) {
      if (user_pass) {
        await nextFrame();
        let getUrl =
          'https://' +
          global.hostName +
          ':' +
          global.portNumber +
          '/apimobile?apiOption=' +
          'GET_LOGIN' +
          '&username=' +
          this.state.userName +
          '&password=' +
          this.state.userPassword +
          '&firstLogin=' +
          this.firstLogin;
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
          return [validNot, responseError, responseJson.lastUpdatedDate];
        } catch (error) {
          this.setState({loading: false});
          return [false, 'ALERT_BLANK_RESPONSE', ''];
        }
      } else {
        return [false, 'ALERT_PASSWORD_BLANK', ''];
      }
    } else {
      return [false, 'ALERT_USER_BLANK', ''];
    }
  }

  customClickHandler = cClick => {
    this.setState({loading: true});
    this.setState({
      loadingMessage: global.translate('MESSAGE_SIGNIN'),
    });
    this.getUserLogin().then(result => {
      if (result[0]) {
        global.userName = this.state.userName;
        global.userPassword = this.state.userPassword;
        global.lastUpdatedDate = result[2];
        this.setState({userName: ''});
        this.setState({userPassword: ''});
        this.goHome();
      } else {
        this.setState({
          visible: true,
          toastMsg: global.translate(result[1]),
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
    this.props.navigation.navigate('ConfigScreen');
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
              text={global.translate('TITLE_USER') + ':'}
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
              text={global.translate('TITLE_PASSWORD') + ':'}
              style={styles.NormalText}
            />
            <CustomTextInput
              onChangeText={userPassword => {
                this.setState({userPassword: userPassword});
              }}
              secured={true}
              value={this.state.userPassword}
            />
            <CustomButton
              customClick={this.customClickHandler}
              title={global.translate('TITLE_SIGNIN')}
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
