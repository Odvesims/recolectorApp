/*Home Screen With buttons to navigate to different options*/
import React, {Component, Alert} from 'react';
import {theme} from '../constants';
import {
  View,
  StyleSheet,
  Picker,
  StatusBar,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
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
import {CustomButton, CustomInput} from '../components';

import {getUserConfig, saveUserConfig} from '../helpers/sql_helper';

/*import ConfigurationScreen from './pages/configscreen';*/

export default class ConfigScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_DATA'),
    };
  }

  componentDidMount() {
    this.configHandler();
  }

  reload = null;

  configHandler = () => {
    this.reload = getUserConfig().then(res => {
      this.setState({
        loading: false,
        hostName: res.host,
        portNumber: res.port_number,
        usesPrinter: res.printer,
        printerName: res.printer_name,
        printerAddress: res.printer_address,
      });
    });
  };

  componentWillUnmount() {
    this.reload = null;
    console.log('componentWillUnmount', this.reload);
  }

  saveUser = () => {
    console.log('saveUser');
    const {hostName, portNumber, usesPrinter} = this.state;
    const {printer_name, printer_address} = this.props.navigation.state.params;
    this.setState({
      loading: true,
      loadingMessage: global.translate('MESSAGE_SAVING_DATA'),
    });
    saveUserConfig(
      1,
      hostName,
      portNumber,
      usesPrinter,
      printer_name,
      printer_address,
    ).then(res => {
      this.setState({
        loading: false,
        hostName: res.host,
        portNumber: res.port.toString(),
        usesPrinter: res.printer,
        // printerName: res.printer_name,
        // printerAddress: res.printer_address,
      });
      if (res) {
        alert(global.translate('ALERT_UPDATE_SUCCESFUL'));
      } else {
        alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
      }
    });
  };

  goBack = () => {
    this.props.navigation.navigate(global.config_from);
  };

  IsPrinting(use) {
    const uses = use;
    if (uses === 'yes') {
      return (
        <View>
          <TouchableOpacity style={styles.button}>
            <Text>{global.translate('TITLE_CONFIGURE_PRINTER')}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return;
    }
  }

  configBTPrinter = () => {
    console.log('configBTPrinter');
    this.props.navigation.navigate('BluetoothPrinter', {
      printer_name: this.state.printerName,
      printer_address: this.state.printerAddress,
    });
  };

  pickerHandler = usesPrinter => {
    this.setState({usesPrinter});
  };

  hostHandler = hostName => {
    this.setState({
      hostName,
    });
  };

  portHandler = portNumber => {
    this.setState({
      portNumber: portNumber,
    });
  };

  render() {
    console.log('Config state', this.state);
    const {
      usesPrinter,
      loading,
      loadingMessage,
      portNumber,
      hostName,
    } = this.state;
    let configPrinter;

    if (usesPrinter === 'yes') {
      configPrinter = (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.configBTPrinter}>
            <Text>{global.translate('TITLE_CONFIGURE_PRINTER')}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      configPrinter = null;
    }

    return (
      <Container style={global.fromLogin ? headerStyles.androidHeader : ''}>
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
        <Content style={{paddingHorizontal: 12, paddingVertical: 24}}>
          <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled>
            <Spinner visible={loading} textContent={loadingMessage} />

            <CustomInput
              label={'TITLE_DOMAIN'}
              value={hostName}
              onChangeText={this.hostHandler}
            />

            <CustomInput
              label={'TITLE_PORT'}
              keyboardType={'numeric'}
              value={portNumber}
              onChangeText={this.portHandler}
            />
            <NormalText
              text={global.translate('TITLE_USES_PRINTER') + ':'}
              style={{marginLeft: 10, marginTop: 20, textAlign: 'left'}}
            />
            <Picker
              selectedValue={usesPrinter}
              onValueChange={this.pickerHandler}>
              <Picker.Item label={global.translate('TITLE_YES')} value="yes" />
              <Picker.Item label={global.translate('TITLE_NO')} value="no" />
            </Picker>
            {configPrinter}
            <View>
              <CustomButton customClick={this.saveUser} title={'TITLE_SAVE'} />
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
  button: {
    alignItems: 'center',
    backgroundColor: '#E1E1E5',
    color: '#000000',
    paddingBottom: 5,
    paddingTop: 5,
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
