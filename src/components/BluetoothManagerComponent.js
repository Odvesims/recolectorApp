import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from 'react-native';

import {
  Container,
  Content,
  Icon,
  Header,
  Button,
  Left,
  Title,
  Body,
  Right,
} from 'native-base';

import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from 'react-native-bluetooth-escpos-printer';

export default class BluetoothManagerComponent extends Component {
  _listeners = [];

  constructor() {
    super();
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      name: '',
      boundAddress: '',
      debugMsg: '',
    };
  }

  goBack = () => {
    this.props.navigation.navigate('Configuration', {
      printer_name: this.state.name,
      printer_address: this.state.boundAddress,
    });
  };

  componentDidMount() {
    if (
      !BluetoothManager.isBluetoothEnabled().then(() => {
        BluetoothManager.enableBluetooth().then(enabled => {
          if (
            this.props.navigation.state.params.printer_address !== undefined &&
            this.props.navigation.state.params.printer_address !== null &&
            this.props.navigation.state.params.printer_address !== ''
          ) {
            BluetoothManager.connect(
              this.props.navigation.state.params.printer_address,
            ).then(
              s => {
                this.setState({
                  loading: false,
                  bleOpend: true,
                  boundAddress: this.props.navigation.state.params
                    .printer_address,
                  name:
                    this.props.navigation.state.params.printer_name ||
                    'UNKNOWN',
                });
              },
              e => {
                this.setState({
                  loading: false,
                });
                alert(e);
              },
            );
          } else {
            this.setState({bleOpend: true});
          }
        });
      })
    );
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        this.setState({
          bleOpend: Boolean(enabled),
          loading: false,
        });
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
    } else if (Platform.OS === 'android') {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: '',
              boundAddress: '',
            });
          },
        ),
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );
    }
  }

  componentWillUnmount() {
    //for (let ls in this._listeners) {
    //    this._listeners[ls].remove();
    //}
  }

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {}
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared,
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function(x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found,
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            stlye={styles.wtf}
            onPress={() => {
              this.setState({
                loading: true,
              });
              BluetoothManager.connect(row.address).then(
                s => {
                  this.setState({
                    loading: false,
                    boundAddress: row.address,
                    name: row.name || 'UNKNOWN',
                  });
                },
                e => {
                  this.setState({
                    loading: false,
                  });
                  alert(e);
                },
              );
            }}>
            <Text style={styles.name}>{row.name || 'UNKNOWN'}</Text>
            <Text style={styles.address}>{row.address}</Text>
          </TouchableOpacity>,
        );
      }
    }
    return items;
  }

  render() {
    return (
      <Container style={global.fromLogin ? headerStyles.androidHeader : ''}>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_PRINTER_CONFIG')}</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <ScrollView style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
                backgroundColor: '#eee',
              }}>
              <Text style={styles.title}>
                {global.translate('TITLE_BLUETOOTH_ENABLED')}
              </Text>
              <Switch
                value={this.state.bleOpend}
                onValueChange={v => {
                  this.setState({
                    loading: true,
                  });
                  if (!v) {
                    BluetoothManager.disableBluetooth().then(
                      () => {
                        this.setState({
                          bleOpend: false,
                          loading: false,
                          foundDs: [],
                          pairedDs: [],
                        });
                      },
                      err => {
                        alert(err);
                      },
                    );
                  } else {
                    BluetoothManager.enableBluetooth().then(
                      r => {
                        var paired = [];
                        if (r && r.length > 0) {
                          for (var i = 0; i < r.length; i++) {
                            try {
                              paired.push(JSON.parse(r[i]));
                            } catch (e) {
                              //ignore
                            }
                          }
                        }
                        this.setState({
                          bleOpend: true,
                          loading: false,
                          pairedDs: paired,
                        });
                      },
                      err => {
                        this.setState({
                          loading: false,
                        });
                        alert(err);
                      },
                    );
                  }
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                disabled={this.state.loading || !this.state.bleOpend}
                style={styles.button}
                onPress={() => {
                  this._scan();
                }}>
                <Text>{global.translate('TITLE_SCAN')}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>
              {global.translate('TITLE_CONNECTED')}
              <Text style={{color: 'blue'}}>
                {!this.state.name ? '0' : this.state.name}
              </Text>
            </Text>
            <Text style={styles.title}>
              {global.translate('TITLE_FOUND')}(
              {global.translate('TITLE_TAP_TO_CONNECT')}):
            </Text>
            {this.state.loading ? <ActivityIndicator animating={true} /> : null}
            <View style={{flex: 1, flexDirection: 'column'}}>
              {this._renderRow(this.state.foundDs)}
            </View>
            <Text style={styles.title}>{global.translate('TITLE_PAIRED')}</Text>
            {this.state.loading ? <ActivityIndicator animating={true} /> : null}
            <View style={{flex: 1, flexDirection: 'column'}}>
              {this._renderRow(this.state.pairedDs)}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 30,
              }}>
              <TouchableOpacity
                disabled={
                  this.state.loading ||
                  !(this.state.bleOpend && this.state.boundAddress.length > 0)
                }
                onPress={this.sendTextPrinter}>
                <Text>{global.translate('TITLE_TEST_PRINT')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }

  sendTextPrinter = p => {
    this.setState({
      loading: true,
    });
    BluetoothEscposPrinter.printText('SUCCESFUL PRINTING \r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    this.setState({
      loading: false,
    });
  };

  _scan() {
    this.setState({
      loading: true,
    });
    BluetoothManager.scanDevices().then(
      s => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false,
        });
      },
      er => {
        this.setState({
          loading: false,
        });
        alert('error' + JSON.stringify(er));
      },
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  title: {
    backgroundColor: '#eee',
    color: '#232323',
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: 'left',
    flex: 1,
  },
  wtf: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    textAlign: 'left',
  },
  address: {
    flex: 1,
    textAlign: 'right',
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
