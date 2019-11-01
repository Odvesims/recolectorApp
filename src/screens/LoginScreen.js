/*Home Screen With buttons to navigate to different options*/
import React, {Component} from 'react';
import {theme} from '../constants';
import nextFrame from 'next-frame';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  StyleSheet,
  NativeModules,
  Platform,
  TextInput,
  Text,
} from 'react-native';
import {Container, Header, Right, Button, Icon, Item} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  CustomButton,
  CustomTextInput,
  ToastMessage,
  BoldLargeText,
  NormalText,
  InputLogin,
} from '../components';

import {getUserConfig, saveUserData} from '../helpers/sql_helper';
import {getUserLogin} from '../helpers/apiconnection_helper';
import styled from 'styled-components/native';

/*import ConfigurationScreen from './pages/configscreen';*/

const AppTitle = styled.Text`
  text-align: center;
  font-size: 24;
  font-weight: bold;
  color: #111825;
`;

export default class LoginScreen extends Component {
  constructor(props) {
    let firstLogin = '';
    super(props);
    this.state = {
      loading: false,
      loadingMessage: '',
      validLogin: true,
      userName: 'testing',
      userPassword: '101010',
      hostName: '',
      portNumber: 444,
      visible: false,
      toastMsg: '',
      request_timeout: false,
    };
    global.deviceLanguage = this.state.deviceLanguage;
    this.inputs = {};
    this.inputField = React.createRef();
  }

  focuInputs = () => {
    this.inputField.current.focus();
  };
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
                saveUserData(l.user_data).then(usr => {
                  global.token = l.token;
                  global.states_collection = l.user_data.country_code;
                  global.country_id = l.user_data.country_id;
                  global.setma_id = l.user_data.setma_id;
                  global.employee_code = l.user_data.employee_code;
                  this.goHome(
                    l.user_data.display_name,
                    l.user_data.employee_cat_label,
                    l.user_data.first_login,
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

  goHome(displayName, userRole, firstLogin) {
    global.userDisplayName = displayName;
    global.userRole = userRole;
    this.props.navigation.navigate('HomeScreen', {first_login: firstLogin});
  }

  goConfig = cClick => {
    global.config_from = 'Login';
    global.fromLogin = true;
    this.props.navigation.navigate('Configuration');
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const inputSubmit = this.inputField.current;
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

        {/* Login */}
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          resetScrollToCoords={{x: 0, y: 0}}
          scrollEnabled={false}>
          <View>
            <AppTitle>RecolectorApp</AppTitle>
            <InputLogin
              iconName="person"
              label={global.translate('TITLE_USER') + ':'}
              onChangeText={userName => {
                this.setState({userName: userName});
              }}
              // returnKeyType={'next'}
              // onSubmitEditing={() => {
              //   this.inputs['dsad'].focus();
              // }}
              ref={input => {
                this.inputs = input;
              }}
              blurOnSubmit={false}
              value={this.state.userName}
            />
            <InputLogin
              id="password"
              iconName="lock"
              label={global.translate('TITLE_PASSWORD') + ':'}
              onChangeText={userPassword => {
                this.setState({userPassword: userPassword});
              }}
              blurOnSubmit={true}
              secured={true}
              returnKeyType={'done'}
              value={this.state.userPassword}
            />

            <CustomButton
              style={{marginTop: 50}}
              customClick={this.customClickHandler}
              title={global.translate('TITLE_SIGNIN')}
            />
            {/* Toast and Spinner */}
            <ToastMessage
              visible={this.state.visible}
              message={this.state.toastMsg}
            />
            <Spinner
              visible={this.state.loading}
              textContent={this.state.loadingMessage}
              color={'CE2424'}
              overlayColor={'rgba(255, 255, 255, 0.4)'}
              animation={'slide'}
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
    // marginLeft: 10,
    marginTop: 20,
    textAlign: 'left',
  },
});

{
  /* <NormalText
              text={global.translate('TITLE_USER') + ':'}
              style={styles.NormalText}
            />
            <Input>
              <InputIcon name="person" />
              <CustomTextInput
                onChangeText={userName => {
                  this.setState({userName: userName});
                }}
                secured={false}
                returnKeyType="go"
                value={this.state.userName}
                style={{flex: 1}}
              />
            </Input>
            <NormalText
              id="password"
              text={global.translate('TITLE_PASSWORD') + ':'}
              style={styles.NormalText}
            />
            <Input>
              <InputIcon name="eye-off" />
              <CustomTextInput
                onChangeText={userPassword => {
                  this.setState({userPassword: userPassword});
                }}
                secured={true}
                returnKeyType="go"
                value={this.state.userPassword}
                style={{flex: 1}}
              />
            </Input> */
}
