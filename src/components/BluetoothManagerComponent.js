import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from 'react-native';
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
      boundAddress: '',
      debugMsg: '',
    };
  }

  componentDidMount() {
    if (
      !BluetoothManager.isBluetoothEnabled().then(() => {
        BluetoothManager.enableBluetooth().then(enabled => {
          this.setState({bleOpend: true});
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
      <ScrollView style={styles.container}>
        <Text>{this.state.debugMsg}</Text>
        <Text style={styles.title}>
          Blutooth Opended:{this.state.bleOpend ? 'true' : 'false'}{' '}
          <Text>Open BLE Before Scanning</Text>{' '}
        </Text>
        <View>
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
          <Button
            disabled={this.state.loading || !this.state.bleOpend}
            onPress={() => {
              this._scan();
            }}
            title="Scan"
          />
        </View>
        <Text style={styles.title}>
          Connected:
          <Text style={{color: 'blue'}}>
            {!this.state.name ? 'No Devices' : this.state.name}
          </Text>
        </Text>
        <Text style={styles.title}>Found(tap to connect):</Text>
        {this.state.loading ? <ActivityIndicator animating={true} /> : null}
        <View style={{flex: 1, flexDirection: 'column'}}>
          {this._renderRow(this.state.foundDs)}
        </View>
        <Text style={styles.title}>Paired:</Text>
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
          <Button
            disabled={
              this.state.loading ||
              !(this.state.bleOpend && this.state.boundAddress.length > 0)
            }
            title="ESC/POS"
            onPress={this.sendTextPrinter}
          />
        </View>
      </ScrollView>
    );
  }

  sendTextPrinter = p => {
    this.setState({
      loading: true,
    });
    BluetoothEscposPrinter.printText('Imprimiendo desde React 1 \r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    BluetoothEscposPrinter.printText('Imprimiendo desde React 2 \r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 1,
      fonttype: 2,
    });
    BluetoothEscposPrinter.printText('Imprimiendo desde React 3 \r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 2,
      fonttype: 3,
    });
    BluetoothEscposPrinter.printText('Imprimiendo desde React 4 \r\n\r\n\r\n', {
      encoding: 'GBK',
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 3,
      fonttype: 4,
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
});
