/*Home Screen With buttons to navigate to different options*/
import React, {Component, Alert} from 'react';
import {theme} from '../constants';
import {View, StyleSheet, Picker, StatusBar, Integer} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Container,
  Content,
  Icon,
  Button,
  Header,
  Left,
  Title,
  Body,
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import NormalText from '../components/NormalText';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/TextInput';

import {getUserConfig, saveUserConfig} from '../helpers/sql_helper';

/*import ConfigurationScreen from './pages/configscreen';*/

export default class ConfigScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_DATA'),
      hostName: '',
      portNumber: '',
      usesPrinter: '',
      configDone: false,
    };
    getUserConfig().then(res => {
      this.setState({
        loading: false,
        hostName: res.host,
        portNumber: res.port_number,
        usesPrinter: res.printer,
      });
    });
  }

  componentDidMount() {}

  saveUser = () => {
    this.setState({
      loading: true,
      loadingMessage: global.translate('MESSAGE_SAVING_DATA'),
    });
    saveUserConfig(
      1,
      this.state.hostName,
      this.state.portNumber,
      this.state.usesPrinter,
    ).then(res => {
      this.setState({loading: false});
      if (res) {
        alert(global.translate('ALERT_UPDATE_SUCCESFUL'));
      } else {
        alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
      }
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container style={headerStyles.androidHeader}>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_CONFIGURATION')}</Title>
          </Body>
        </Header>
        <Content>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled>
            <Spinner
              visible={this.state.loading}
              textContent={this.state.loadingMessage}
            />
            <NormalText
              text={global.translate('TITLE_DOMAIN') + ':'}
              style={{marginLeft: 10, marginTop: 20, textAlign: 'left'}}
            />
            <CustomTextInput
              value={this.state.hostName}
              onChangeText={hostName => {
                this.setState({hostName: hostName});
              }}
            />
            <NormalText
              text={global.translate('TITLE_PORT') + ':'}
              style={{marginLeft: 10, marginTop: 20, textAlign: 'left'}}
            />
            <CustomTextInput
              keyboardType={'numeric'}
              value={this.state.portNumber}
              onChangeText={portNumber => {
                this.setState({portNumber: portNumber});
              }}
            />
            <NormalText
              text={global.translate('TITLE_USES_PRINTER') + ':'}
              style={{marginLeft: 10, marginTop: 20, textAlign: 'left'}}
            />
            <Picker
              selectedValue={this.state.usesPrinter}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({usesPrinter: itemValue})
              }>
              <Picker.Item label={global.translate('TITLE_YES')} value="yes" />
              <Picker.Item label={global.translate('TITLE_NO')} value="no" />
            </Picker>
            <View>
              <CustomButton
                customClick={this.saveUser}
                title={global.translate('TITLE_SAVE')}
              />
            </View>
          </KeyboardAwareScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const headerStyles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
});
