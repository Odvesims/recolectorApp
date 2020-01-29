/*Home Screen With buttons to navigate to different options*/
import React, {Component} from 'react';
import {theme} from '../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View, StyleSheet, NativeModules, Platform} from 'react-native';
import {Container, Header, Right, Button, Icon, Item} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomButton, ToastMessage, InputLogin} from '../components';

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
      userName: 'aramirez', //aramirez
      userPassword: '101010',
      hostName: '',
      portNumber: 444,
      visible: false,
      toastMsg: '',
      request_timeout: false,
    };
    global.deviceLanguage = this.state.deviceLanguage;
  }

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

  customClickHandler = () => {
    console.log('customclick');
    let {userName, userPassword, request_timeout, loading} = this.state;
    let user = userName;
    let password = userPassword;
    if (user) {
      if (password) {
        this.setState({
          loading: true,
          loadingMessage: global.translate('MESSAGE_SIGNIN'),
          request_timeout: false,
        });
        try {
          getUserConfig()
            .then(res => {
              console.log('res', res);
              setTimeout(() => {
                if (loading) {
                  this.setState({loading: false, request_timeout: true});
                  alert(global.translate('ALERT_REQUEST_TIMEOUT'));
                }
              }, 10000);
              getUserLogin(res.host, res.port_number, user, password)
                .then(l => {
                  console.log('l res', l);

                  if (!request_timeout) {
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
                })
                .catch(err => console.log('getUserLogin error', err));
            })
            .catch(err => console.log('error', err));
        } catch (err) {
          console.log('err', err);
        }
      } else {
        this.setState({
          visible: true,
          toastMsg: global.translate('ALERT_PASSWORD_BLANK'),
        });
        setTimeout(() => {
          this.setState({visible: false, toastMsg: ''});
        }, 500);
      }
    } else {
      this.setState({
        visible: true,
        toastMsg: global.translate('ALERT_USER_BLANK'),
      });
      setTimeout(() => {
        this.setState({visible: false, toastMsg: ''});
      }, 500);
    }
  };

  goHome(displayName, userRole, firstLogin) {
    global.userDisplayName = displayName;
    global.userRole = userRole;
    this.props.navigation.navigate('HomeScreen', {first_login: firstLogin});
  }

  goConfig = () => {
    global.config_from = 'Login';
    global.fromLogin = true;
    this.props.navigation.navigate('Configuration');
  };

  userHandler = userName => {
    this.setState({
      userName,
    });
  };

  passwordHandler = userPassword => {
    this.setState({
      userPassword,
    });
  };

  render() {
    // console.log('login', this.props);
    const {
      userName,
      userPassword,
      loading,
      loadingMessage,
      visible,
      toastMsg,
    } = this.state;
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
              label={'TITLE_USER'}
              onChangeText={this.userHandler}
              blurOnSubmit={false}
              value={userName}
            />
            <InputLogin
              id="password"
              iconName="lock"
              label={'TITLE_PASSWORD'}
              onChangeText={this.passwordHandler}
              blurOnSubmit={true}
              secured={true}
              returnKeyType={'done'}
              value={userPassword}
            />

            <CustomButton
              style={{marginTop: 50}}
              customClick={this.customClickHandler}
              title={'TITLE_SIGNIN'}
            />
            {/* Toast and Spinner */}
            <ToastMessage visible={visible} message={toastMsg} />
            <Spinner
              visible={loading}
              textContent={loadingMessage}
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
