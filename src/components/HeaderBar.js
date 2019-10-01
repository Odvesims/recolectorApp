import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  ToastAndroid,
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

import {getTranslation} from '../helpers/translation_helper';
import FetchingData from './FetchingData';
import ToastMessage from './ToastMessage';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.syncData = this.syncDataClickHandler.bind(this);
    this.state = {
      loading: false,
      visible: false,
      toastMsg: '',
    };
  }

  async getRemoteData(apiOption) {
    this.setState({loading: true});
    let validNot = true;
    let responseError = 0;
    let getUrl =
      global.hostName +
      ':' +
      global.portNumber +
      '?apiOption=' +
      apiOption +
      '&username=' +
      this.props.userName +
      '&password=' +
      this.props.userPassword +
      '&last_update=' +
      this.props.lastUpdate;
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
      return [validNot, responseError, apiOption];
    } catch (error) {
      this.setState({loading: false});
      return [false, 999, apiOption];
    }
  }

  syncDataClickHandler = cClick => {
    this.setState({loading: true});
    let validLoad = true;
    this.getRemoteData('GET_CLIENTS').then(result => {
      if (!result[0]) {
        validLoad = false;
      }
      this.getRemoteData('GET_COLLECTORS').then(result => {
        if (!result[0]) {
          validLoad = false;
        }
        this.getRemoteData('GET_ARTICLES').then(result => {
          if (!result[0]) {
            validLoad = false;
          }
          this.getRemoteData('GET_ROUTES').then(result => {
            if (!result[0]) {
              validLoad = false;
            }
            if (!validLoad) {
              this.setState({
                visible: true,
                toastMsg: global.translate('ALERT_SYNC_INCOMPLETE'),
              });
              setTimeout(() => {
                this.setState({visible: false, toastMsg: ''});
              }, 2000);
            }
            this.setState({loading: false});
          });
        });
      });
    });
  };
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" onPress={this.props.openDrawer} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.headerTitle}</Title>
          </Body>
          <Right>
            <FetchingData
              syncData={this.syncDataClickHandler}
              fetching={this.state.loading}
            />
            <Button transparent>
              <Icon name="notifications" />
            </Button>
          </Right>
        </Header>
        <ToastMessage
          visible={this.state.visible}
          message={this.state.toastMsg}
        />
      </View>
    );
  }
}
export default HeaderBar;
