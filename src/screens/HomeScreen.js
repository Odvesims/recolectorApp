import React, {Component} from 'react';
import {FetchingData} from '../components';
import Spinner from 'react-native-loading-spinner-overlay';
import { Badge, withBadge } from "react-native-elements";

import {
  StyleSheet,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  ToastAndroid,
  Modal, Text, TouchableHighlight, View, Alert,
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
  clearRoutesCab,
  clearRoutesDetails,
  saveNotifications,
  getNotifications,
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
    getNotifications(0).then(n => {
      if(n.length == 0){
        this.setState({notifications: '0'});
      } else{
        this.setState({notifications: n.length})
      }
    });
    this.state = {
      loading: false,
      modalVisible: false,
      new_notifications: false,
    };
  }

  componentDidMount() {
    let {params} = this.props.navigation.state;
    global.config_from = 'HomeScreen';
    global.fromLogin = false;
    this.notificationsInterval =   
    setInterval(this.notificationsHandler, 10000);
    if(params.first_login !== undefined){
      if(params.first_login){
        params.first_login = false;
       this.refreshHandler();
      }
    };
  }

  notificationsHandler() {
<<<<<<< HEAD
    /*getData('GET_NOTIFICATIONS', "&status=new").then(notifications => {
=======
    getData('GET_NOTIFICATIONS', "&status=new").then(notifications => {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      //alert(JSON.stringify(notifications));
      if(notifications.valid){
        saveNotifications(notifications.arrResponse).then(count=> {
          if(count > 0){              
            this.setState({new_notifications: true, notifications: count})
          } else{
            this.setState({new_notifications: true, notifications: '0'})              
          }
        })
      } else{
        getNotifications(0).then(n => {
          if(n.length == 0){
            this.setState({notifications: '0'});
          } else{
            this.setState({notifications: n.length})
          }
        })
      }
<<<<<<< HEAD
    })*/
=======
    })
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  }

  componentWillUnmount(){
    clearInterval(this.notificationsInterval);
  }

<<<<<<< HEAD
  setPrinter = () => {/*
    this.setState({loading: true, loadingMessage: 'Testing Printer'});
=======
  setPrinter = () => {
    //this.setState({loading: true, loadingMessage: 'Testing Printer'});
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    if (global.printer_address === '') {
      alert(global.translate('ALERT_PRINTER_NOT_CONFIGURED'));
      this.setState({loading: false});
    } else {
      enableBT().then(e => {
        connectBluetooth(global.printer_name, global.printer_address).then(c => {
          if (c === true) {
<<<<<<< HEAD
            dataOperation('GET_ORDER_INVOICE', {order_id: 2}).then(o => {
              if( o.valid){
                printText(o.responseObject).then(p => {
                  this.setState({loading: false});
                });
              } else{
                this.setState({loading: false});                  
              }
            })
=======
            Alert.alert(
              global.translate("TITLE_PRINT_ORDER"),
              global.translate("TITLE_PRINT_ORDER_MESSAGE"),
              [
                {
                  text: global.translate("TITLE_NO_PRINT"), 
                  onPress: () => {
                    alert.cancel     
                  }, 
                  style: 'cancel'
                },
                {
                  text: global.translate("TITLE_PRINT_TOGETHER"),
                  onPress: () => {
                    dataOperation('GET_ORDER_INVOICE', {order_id: 131}).then(o => {
                      if( o.valid){
                        printText(o.responseObject, 2).then(p => {
                          this.setState({loading: false});
                        });
                      } else{
                        this.setState({loading: false});                  
                      }
                    });
                  },
                },
                {
                  text: global.translate("TITLE_PRINT_SEPARATE"), 
                  onPress: () => {                    
                    dataOperation('GET_ORDER_INVOICE', {order_id: 131}).then(o => {
                      if( o.valid){
                        printText(o.responseObject, 1).then(p => {
                          this.setState({loading: false});
                        });
                      } else{
                        this.setState({loading: false});                  
                      }
                    });
                  }
                },
              ],
              {cancelable: false},
            )
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          } else {
            this.setState({loading: false});
            alert('Not connected');
          }
        });
      });
<<<<<<< HEAD
    }*/
    //this.setModalVisible(true);
    Alert.alert(
      global.translate("TITLE_PRINT_ORDER"),
      global.translate("TITLE_PRINT_ORDER_MESSAGE"),
      [
        {
          text: global.translate("TITLE_NO_PRINT"), 
          onPress: () => {
            alert.cancel     
          }, 
          style: 'cancel'
        },
        {
          text: global.translate("TITLE_PRINT_TOGETHER"),
          onPress: () => {
            printText()
          },
        },
        {
          text: global.translate("TITLE_PRINT_SEPARATE"), 
          onPress: () => console.log('Ask me later pressed')
        },
      ],
      {cancelable: false},
    )
=======
    }
    //this.setModalVisible(true);
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_DATA'),
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
        clearTimeout();
      }
    }, 30000);
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
                                        getData('GET_ROUTES', '&status=A').then(active => {
                                          if (!this.state.request_timeout) {
                                            clearRoutesCab('A').then(ca => {
                                              clearRoutesDetails().then(cd => {
                                                if (active.arrResponse !== []) {
                                                  saveActiveRoutes(active.arrResponse).then(res => {
                                                    getData('GET_ROUTES', '&status=I').then(inactive => {
                                                      if (!this.state.request_timeout) {
                                                        clearRoutesCab('I').then(ci => {
                                                          if (inactive.arrResponse !== []) {
                                                            saveInactiveRoutes(inactive.arrResponse).then(resi => {
                                                              this.setState({
                                                                request_timeout: false,
                                                                loading: false,
                                                              });
                                                            });
                                                          }
                                                        })
                                                      }
                                                    })
                                                  })
                                                }
                                              })
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
    const BadgedIcon = withBadge(this.state.notifications)(Icon)
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
            <Button transparent onPress={()=>{this.props.navigation.navigate('Notifications')}}>         
              <BadgedIcon containerStyle={{width:'30px'}} name="notifications" />
            </Button>
          </Right>
        </Header>
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            presentationStyle="formSheet"
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
                <Text>Hello World!</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
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
  badge: {
    flex:1,
    height: 18,
    minWidth: 0,
    width: 18,    
    fontSize: 5,
  },
});