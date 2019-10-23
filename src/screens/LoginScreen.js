/*Home Screen With buttons to navigate to different options*/
import React, {Component} from 'react';
import {theme} from '../constants';
import nextFrame from 'next-frame';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {View, StyleSheet, NativeModules, Platform} from 'react-native';

import {Container, Header, Right, Button, Icon} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';

import BoldLargeText from '../components/BoldLargeText';
import NormalText from '../components/NormalText';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/TextInput';
import ToastMessage from '../components/ToastMessage';

import {getUserConfig, saveUserData} from '../helpers/sql_helper';
import {getUserLogin} from '../helpers/apiconnection_helper';

/*import ConfigurationScreen from './pages/configscreen';*/

export default class LoginScreen extends Component {
  constructor(props) {
    let firstLogin = '';
    super(props);
    this.state = {
      loading: false,
      loadingMessage: '',
      validLogin: true,
      userName: 'ovaldez',
      userPassword: '901090',
      hostName: '',
      portNumber: 444,
      visible: false,
      toastMsg: '',
      request_timeout: false,
    };
    global.deviceLanguage = this.state.deviceLanguage;
  }

  componentDidMount() {}

  setLanguage = sLang => {
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
  };

  customClickHandler = cClick => {
    let user = this.state.userName;
    let password = this.state.userPassword;
    if (user) {
      if (password) {
        this.setState({
          loading: true,
          loadingMessage: global.translate('MESSAGE_SIGNIN'),
          request_timeout: false,
        });
        getUserConfig().then(res => {
          setTimeout(() => {
            if (this.state.loading) {
              this.setState({loading: false, request_timeout: true});
              alert(global.translate('ALERT_REQUEST_TIMEOUT'));
            }
          }, 10000);
          getUserLogin(res.host, res.port_number, user, password).then(l => {
            if (!this.state.request_timeout) {
              this.setState({loading: false, request_timeout: false});
              if (l.valid) {
                global.userName = user;
                global.userPassword = password;
                global.apiHost = res.host;
                global.apiPort = res.port_number;
                global.usesPrinter = res.printer;
                global.printer_name = res.printer_name;
                global.printer_address = res.printer_address;
                saveUserData(l.user_data).then(usr => {
                  global.token = l.token;
                  global.states_collection = l.user_data.country_code;
                  global.country_id = l.user_data.country_id;
                  global.setma_id = l.user_data.setma_id;
                  global.employee_code = l.user_data.employee_code;
                  this.goHome(
                    l.user_data.display_name,
                    l.user_data.employee_cat_label,
                  );
                });
              } else {
                alert(global.translate(l.responseError));
              }
            } else {
              this.setState({request_timeout: false});
            }
          });
        });
      } else {
        this.setState({
          visible: true,
          toastMsg: global.translate('ALERT_PASSWORD_BLANK'),
        });
        setTimeout(() => {
          this.setState({visible: false, toastMsg: ''}), 500;
        });
      }
    } else {
      this.setState({
        visible: true,
        toastMsg: global.translate('ALERT_USER_BLANK'),
      });
      setTimeout(() => {
        this.setState({visible: false, toastMsg: ''}), 500;
      });
    }
  };

  goHome(displayName, userRole) {
    global.userDisplayName = displayName;
    global.userRole = userRole;
    this.props.navigation.navigate('HomeScreen');
  }

  goConfig = cClick => {
    this.props.navigation.navigate('userConfig');
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
            <BoldLargeText text="RecolectorApp" style={{textAlign: 'center'}} />
            <NormalText
              text={global.translate('TITLE_USER') + ':'}
              style={styles.NormalText}
            />
            <CustomTextInput
              onChangeText={userName => {
                this.setState({userName: userName});
              }}
              secured={false}
              returnKeyType="go"
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
              returnKeyType="go"
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
