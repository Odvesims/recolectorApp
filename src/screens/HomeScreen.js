import React, {Component} from 'react';
import {FetchingData} from '../components';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  StyleSheet,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
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
} from 'native-base';

import {
  saveCategories,
  saveSubcategories,
  saveArticles,
  saveEmployees,
  saveClients,
  saveRoutes,
  saveOrders,
  saveActiveRoutes,
  saveInactiveRoutes,
  getUserConfig,
} from '../helpers/sql_helper';

import {getData, dataOperation} from '../helpers/apiconnection_helper';
import {
  enableBT,
  connectBluetooth,
  printingTest,
  printText,
} from '../helpers/bluetooth_helper';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}

  setPrinter = () => {
    this.setState({loading: true, loadingMessage: 'Testing Printer'});
    if (global.printer_address === '') {
      alert(global.translate('ALERT_PRINTER_NOT_CONFIGURED'));
    } else {
      enableBT().then(e => {
        connectBluetooth(global.printer_name, global.printer_address).then(c => {
          if (c === true) {
            dataOperation('GET_ORDER_INVOICE', {order_id: 2}).then(o => {
              if( o.valid){
                printText(o.responseObject).then(p => {
                  this.setState({loading: false});
                });
              } else{
                this.setState({loading: false});                  
              }
            })
          } else {
            this.setState({loading: false});
            alert('Not connected');
          }
        });
      });
    }
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_DATA'),
    });
    getData('GET_EMPLOYEES').then(emp => {
      if (!this.state.request_timeout) {
        saveEmployees(emp.arrResponse).then(res => {
          getData('GET_CLIENTS').then(cli => {
            if (!this.state.request_timeout) {
              saveClients(cli.arrResponse, []).then(res => {
                getData('GET_ARTICLES_CATEGORIES').then(cat => {
                  if (!this.state.request_timeout) {
                    saveCategories(cat.arrResponse).then(res => {
                      getData('GET_ARTICLES_SUBCATEGORIES').then(sub => {
                        if (!this.state.request_timeout) {
                          saveSubcategories(sub.arrResponse).then(res => {
                            getData('GET_ARTICLES').then(art => {
                              if (!this.state.request_timeout) {
                                saveArticles(art.arrResponse).then(res => {
                                  getData('GET_ORDERS').then(ord => {
                                    if (!this.state.request_timeout) {
                                      saveOrders(ord.arrResponse).then(res => {
                                        getData('GET_ROUTES').then(rte => {
                                          if (!this.state.request_timeout) {
                                            saveActiveRoutes(rte.arrResponse[0]).then(res => {
                                                saveInactiveRoutes(rte.arrResponse[1]).then(resi => {
                                                  this.setState({
                                                    request_timeout: false,
                                                    loading: false,
                                                  });
                                                });
                                            })
                                          }
                                        });
                                      });
                                    }
                                  });
                                });
                              }
                            });
                          });
                        }
                      });
                    });
                  }
                });
              });
            }
          });
        });
      }
    });
  };

  static navigationOptions = {
    header: null,
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  render() {
    const {loading} = this.state;
    return (
      <Container style={styles.androidHeader}>
        <Header>
          <Spinner
            visible={this.state.loading}
            textContent={this.state.loadingMessage}
            color={'CE2424'}
            overlayColor={'rgba(255, 255, 255, 0.4)'}
            animation={'slide'}
          />
          <Left>
            <Button transparent onPress={this.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_PRINCIPAL')}</Title>
          </Body>
          <Right>
            <FetchingData syncData={this.refreshHandler} fetching={loading} />
            <Button transparent onPress={this.setPrinter}>
              <Icon name="print" />
            </Button>
            <Button transparent>
              <Icon name="notifications" />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        //paddingTop: StatusBar.currentHeight
      },
    }),
  },
});
