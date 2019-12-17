import React, {Component} from 'react';
import {theme} from '../../constants';
import {ButtonGroup} from 'react-native-elements';
import styled from 'styled-components/native';
import CustomPicker from '../../components/CustomPicker';
<<<<<<< HEAD
import moment from 'moment';
import _ from 'lodash';
// import Detail from './Detail';
import {View, StyleSheet, Alert, Animated} from 'react-native';
=======
import {SwipeListView} from 'react-native-swipe-list-view';
import Detail from './Detail';
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  TouchableHighlight,
} from 'react-native';
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
import {
  Container,
  Left,
  Right,
  Title,
  Body,
  Header,
  Icon,
  Text,
  Form,
  Root,
<<<<<<< HEAD
  Button,
=======
  Item,
  Button,
  ActionSheet,
  Content,
  Tabs,
  Tab,
  Segment,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {DetailsTab} from './Tabs';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
<<<<<<< HEAD
import {dataOperation, getData} from '../../helpers/apiconnection_helper';
import {
  getStoredClients,
  getStoredEmployees,
  getOrderDetails,
} from '../../helpers/sql_helper';
import {
  printInvoiceText,
=======
import {getStoredClients, getStoredEmployees} from '../../helpers/sql_helper';
import {dataOperation} from '../../helpers/apiconnection_helper';
import {
  printText,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  enableBT,
  connectBluetooth,
} from '../../helpers/bluetooth_helper';

export default class Order extends Component {
  constructor(props) {
    super(props);
    const {
      params: {editable, order_id, isNewRecord, loading, date},
    } = this.props.navigation.state;

    let dateRegister = moment(date).format('DD/MM/YYYY');
    this.state = {
      data: [],
<<<<<<< HEAD
      loading: loading,
      date: dateRegister,
      modalVisible: false,
      show: false,
      //
      clear_data: [],
      //
=======
      loading: false,
      modalVisible: false,
      show: false,
      //
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      selectedIndex: 0,
      quantity: 1,
      //
      picking: [],
      shopping: [],
      hasPurchases: 'F',
<<<<<<< HEAD
      //
      selected_employee: [],
      //
      clients: [],
      employees: [],
      client: null,
      //
      client_address: null,
      client_city: null,
      client_state: null,
      client_phone: null,
      //
      placeholder: global.translate('PLACEHOLDER_SELECT_CLIENT'),
      placeholderEmployee: global.translate('PLACEHOLDER_SELECT_EMPLOYEE'), //
      //
      operation: 'TITLE_EDIT_ORDER',
      isNewRecord: isNewRecord,
      order_id: order_id,
      //
      editable: editable,
    };

    this.getDataHandler();

    if (isNewRecord === false) {
      getData('GET_ORDER', `&order_id=${order_id}`).then(o => {
        getOrderDetails(order_id).then(dets => {
          let orderData = o.arrResponse[0];
          console.log('arrRESPONSE', o.arrResponse[0]);
          this.setState({
            placeholder: orderData.client_name,
            ...orderData,
            placeholderEmployee: orderData.employee_name || '',
            client_address: orderData.address,
            client_city: orderData.city,
            client_state: orderData.state,
            client_phone: orderData.phone_number,
            loading: false,
            picking: orderData.order_details,
            shopping: orderData.order_purchases_details,
          });
        });
      });
    }
  }

  getPickerData = (value, arr) => {
    return new Promise((resolve, reject) => {
      let arrFilter = _.filter(arr, {Code: `${value}`});
      arrFilter = arrFilter[0];
      resolve(arrFilter);
    });
  };

  async getDataHandler() {
    const clients = await getStoredClients();
    const clientPicker = await this.setClientsPicker(clients);
    this.setState({clients: clientPicker});

    const employee = await getStoredEmployees();
    const employeePicker = await this.setEmployeesPicker(employee);
    this.setState({employees: employeePicker});
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        let {selectedIndex} = this.state;
        let items = this.props.navigation.state.params.itemSelected;
        if (items !== undefined) {
          const {picking, shopping} = this.state;

          if (selectedIndex === 0) {
            items.id = picking.length + 1;
            this.setState({
              picking: picking.concat(items),
            });
          } else {
            items.id = shopping.length + 1;
            this.setState({
              shopping: shopping.concat(items),
            });
          }
          items = undefined;
        }
      } catch (err) {
        alert(err);
      }
=======

      //
      selected_item: [],

      //
      date: '',
      clients: [],
      employees: [],
      client: '',
      client_address: '',
      client_city: '',
      client_state: '',
      client_phone: '',
      placeholder: global.translate('PLACEHOLDER_SELECT_CLIENT'),
      placeholderEmployee: global.translate('PLACEHOLDER_SELECT_EMPLOYEE'),
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
    this.arrDataPicking = [];
    this.arrDataShopping = [];

    this.getDataHandler();
    // this.getEmployeesHandler();
  }

  getDataHandler() {
    getStoredClients().then(clients => {
      this.setClientsPicker(clients).then(res => {
        this.setState({clients: res});
      });
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    });
    getStoredEmployees().then(employees => {
      this.setEmployeesPicker(employees).then(res => {
        this.setState({employees: res});
      });
    });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        const {params} = this.props.navigation.state;
        let item = params.itemSelected;
        if (item !== undefined) {
          this.setState({data: this.arrData});

          let {selectedIndex} = this.state;
          if (selectedIndex === 0) {
            this.arrDataPicking.push(item);
            this.setState({
              picking: this.arrDataPicking,
            });
          } else {
            this.arrDataShopping.push(item);
            this.setState({
              shopping: this.arrDataShopping,
            });
          }
        }
      } catch (err) {
        alert(err);
      }
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

<<<<<<< HEAD
  componentWillUnmount() {
    this.focusListener.remove();
  }

=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  // Select
  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };
<<<<<<< HEAD

  onPressDetailHandler = () => {
    let {navigate} = this.props.navigation;
    let reset = {
      quantity: 1,
      detail_description: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
      detail_total: 0,
      article_price: 0,
      price: 0,
    };
    if (this.state.selectedIndex === 0) {
      navigate('Picking', {
        editable: this.state.editable,
        ...reset,
      });
    } else {
      navigate('Shopping', {
        editable: this.state.editable,
        ...reset,
      });
    }
  };

  renderDetailTabs = item => {
    const {picking, shopping, editable} = this.state;
    if (item === 0) {
      return (
        <DetailsTab
          tab_data={picking}
          navigation={this.props.navigation}
          editable={editable}
          renderView={'Picking'}
          remove={this.updateListPicking}
        />
      );
    } else {
      return (
        <DetailsTab
          tab_data={shopping}
          navigation={this.props.navigation}
          editable={editable}
          renderView={'Shopping'}
          remove={this.updateListShopping}
        />
      );
    }
  };

  goBack = () => {
    const {picking, shopping, client} = this.state;
    if (!client && !picking.length && !shopping.length) {
      this.props.navigation.goBack();
    } else {
      Alert.alert(
        'Alerta',
        'Al salir perderá la nueva orden',
        [
          {
            text: 'Permanecer',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Salir', onPress: () => this.props.navigation.goBack()},
        ],
        {cancelable: false},
=======
  _renderDetails = item => {
    const {picking, shopping, selectedIndex} = this.state;

    if (item === 0) {
      return (
        <DetailsTab tab_data={picking} navigation={this.props.navigation} />
      );
    } else {
      return (
        <DetailsTab tab_data={shopping} navigation={this.props.navigation} />
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      );
    }
  };

  execOperation = () => {
    let hasPurchases = 'F';
<<<<<<< HEAD
    const {client, selected_employee, picking, shopping, date} = this.state;
=======
    const {client, selected_item, data, picking, shopping} = this.state;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    if (shopping.length > 0) {
      hasPurchases = 'T';
    }

    let order_data = {
      setma_id: global.setma_id,
      client_code: client.split('-')[0],
      supervisor_code: global.employee_code,
<<<<<<< HEAD
      employee_code: selected_employee.Code || 0,
=======
      employee_code: selected_item.Code || 0,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      order_state: 'A',
      order_completed: false,
      order_details: picking,
      purchase_details: shopping,
      has_purchases: hasPurchases,
<<<<<<< HEAD
      date_register: date,
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    };
    console.log(order_data);
    this.setState({loading: true, loadingMessage: 'MESSAGE_REGISTERING_ORDER'});
    dataOperation('ORDER_OPERATION', order_data).then(res => {
<<<<<<< HEAD
      console.log('DataOperation ==>', res);
      if (res.valid) {
        if (hasPurchases === 'T') {
=======
      if (res.valid) {
        if(has_purchases === 'T'){
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          if (global.printer_address === '') {
            alert(global.translate('ALERT_PRINTER_NOT_CONFIGURED'));
          } else {
            enableBT().then(e => {
<<<<<<< HEAD
              connectBluetooth(
                global.printer_name,
                global.printer_address,
              ).then(c => {
                if (c === true) {
                  Alert.alert(
                    global.translate('TITLE_PRINT_ORDER'),
                    global.translate('TITLE_PRINT_ORDER_MESSAGE'),
                    [
                      {
                        text: global.translate('TITLE_NO_PRINT'),
                        onPress: () => {
                          alert.cancel;
                        },
                        style: 'cancel',
                      },
                      {
                        text: global.translate('TITLE_PRINT_TOGETHER'),
                        onPress: () => {
                          printInvoiceText(res.responseObject, 2).then(p => {});
                        },
                      },
                      {
                        text: global.translate('TITLE_PRINT_SEPARATE'),
                        onPress: () => {
                          printInvoiceText(o.responseObject, 1).then(p => {});
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  this.setState({loading: false});
                  Alert.alert('Not connected');
=======
              connectBluetooth(global.printer_name, global.printer_address).then(c => {
                if (c === true) {
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
                          printInvoiceText(res.responseObject, 2).then(p => {});                        
                        },
                      },
                      {
                        text: global.translate("TITLE_PRINT_SEPARATE"), 
                        onPress: () => {  
                          printInvoiceText(o.responseObject, 1).then(p => {});
                        }
                      },
                    ],
                    {cancelable: false},
                  )
                } else {
                  this.setState({loading: false});
                  alert('Not connected');
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
                }
              });
            });
          }
<<<<<<< HEAD
        }
        // else {}
        Alert.alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
        setTimeout(() => {
          this.props.navigation.goBack();
        }, 1000);

        this.setState({
          client: '',
          client_address: null,
          client_city: null,
          client_state: null,
          client_phone: null,
          placeholder: '',
          selectedItem: [],
          picking: [],
          shopping: [],
=======
        } else{

        }
        alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
        this.setState({
          client: '',
          client_address: '',
          client_city: '',
          client_state: '',
          client_phone: '',
          placeholder: '',
          selectedItem: [],
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          selectedClient: [],
          selected: [],
          data: [],
          loading: false,
        });
      } else {
        this.setState({loading: false});
      }
    });
  };

<<<<<<< HEAD
=======
  onPressDetailHandler = () => {
    let {navigate} = this.props.navigation;
    let {selectedIndex} = this.state;
    if (selectedIndex === 0) {
      navigate('Picking');
    } else {
      navigate('Shopping');
    }
  };

>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  setClientsPicker(clients) {
    return new Promise((resolve, reject) => {
      let arrClients = [];
      clients.map(client => {
<<<<<<< HEAD
        // console.log('ClientPicker ==>', client);
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
        arrClients.push({
          Name: client.client_code + '- ' + client.name,
          Code: client.client_code,
          Address: client.address,
          City: client.city,
          State: client.state,
          Phone: client.phone_number,
        });
      });
      resolve(arrClients);
    });
  }

  setEmployeesPicker(employees) {
    return new Promise((resolve, reject) => {
      let arrEmployees = [];
      employees.map(employee => {
        arrEmployees.push({
          Name: employee.employee_code + '- ' + employee.name,
          Code: employee.employee_code,
          Phone: employee.phone_number,
        });
      });
      resolve(arrEmployees);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

<<<<<<< HEAD
  selectedClient = item => {
    this.setState({
      placeholder: item.Name,
=======
  markForDelete = swipeData => {
    const {key, value} = swipeData;
    if (value < -375) {
      alert(key);
      const filteredData = this.state.data.filter(item => item.id !== key);
      this.updateList(filteredData);
    }
  };

  selectedClient = item => {
    this.setState({
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      client: item.Name,
      client_address: item.Address,
      client_city: item.City,
      client_state: item.State,
      client_phone: item.Phone,
    });
<<<<<<< HEAD
    return item;
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  };

  selectedEmployee = item => {
    this.setState({
<<<<<<< HEAD
      placeholderEmployee: item.Name,
      selected_employee: item,
      employee_code: item.Code,
    });
    return item;
  };

  updateListPicking = list => {
    this.setState({
      picking: list,
=======
      selected_item: item,
    });
  };

  updateList = list => {
    this.setState({
      data: list,
      clear_data: list,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      reverted: false,
    });
  };

<<<<<<< HEAD
  updateListShopping = list => {
    this.setState({
      shopping: list,
      reverted: false,
    });
  };

  onSelected = selected => {
    this.setState({
      placeholder: selected.Name,
    });
  };

  render() {
    // console.log('STATE PICKING==>', this.state.picking);
    console.log('Order state', this.state);

    const {params} = this.props.navigation.state;
    const {editable} = this.state;
    const {
      employees,
      placeholderEmployee,
      placeholder,
      client,
      clients,
=======
  render() {
    // console.log('SHOPPING_LENGHT ==> ', this.state.shopping);
    console.log('Hola', this.state.selected_item);

    let ClientInfo = null;
    const {
      //
      clients,
      employees,
      supervisor_code,
      //
      client,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      selectedIndex,
      client_address,
      client_city,
      client_state,
      client_phone,
<<<<<<< HEAD
      loading,
      selected_employee,
      loadingMessage,
    } = this.state;

    const detailTabs = [
      global.translate('PICKING'),
      global.translate('SHOPPING'),
    ]; //global.translate('TITLE_CATEGORY')];

    let detail;
    let isEditable = editable;
    let clientInfo;
    let moreDetails;
    let save;
    //
    if (isEditable) {
      save = (
        <Right>
          <Button transparent onPress={this.execOperation} color="white">
            <Icon name="checkmark" />
          </Button>
        </Right>
      );
      moreDetails = (
        <ButtonOutlined onPress={this.onPressDetailHandler}>
          <Icon name="add" style={{color: theme.colors.primary}} />
          <TextButton>{global.translate('TITLE_DETAILS')}</TextButton>
        </ButtonOutlined>
      );
    }

    if (client) {
      clientInfo = (
=======
    } = this.state;
    const buttons = [
      global.translate('TITLE_PICKINGS'),
      global.translate('TITLE_PURCHASES'),
    ];

    console.log('clients ==>', clients);
    console.log('employees ==>', employees);
    if (client) {
      ClientInfo = (
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
        <ClientData>
          <Client>{client_address}</Client>
          <Client>{client_city}</Client>
          <Client>{client_state}</Client>
          <Client>{client_phone}</Client>
        </ClientData>
      );
    }

    return (
      <Root>
        <Container>
          <Header>
            <Spinner
<<<<<<< HEAD
              visible={loading}
              textContent={global.translate(loadingMessage)}
=======
              visible={this.state.loading}
              textContent={global.translate(this.state.loadingMessage)}
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
              color={'CE2424'}
              overlayColor={'rgba(255, 255, 255, 0.4)'}
              animation={'slide'}
            />
            <Left>
              <Button transparent onPress={this.goBack}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{global.translate(params.operation)}</Title>
            </Body>
<<<<<<< HEAD
            {save}
=======
            <Right>
              <Button transparent onPress={this.execOperation}>
                <Icon name="checkmark" />
              </Button>
            </Right>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          </Header>
          {/* Content */}
          <DetailContent>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: theme.colors.lightGray,
              }}>
              <ScrollView>
                <View>
<<<<<<< HEAD
                  {/* Date Assigned */}
                  <DateAssigned
                    label={global.translate('TITLE_DATE')}
                    details={`: ${this.state.date}`}
                  />
                  {/*ClientForm*/}
                  <Form style={styles.container}>
                    <CustomPicker
                      label={global.translate('TITLE_CLIENT')}
                      items={clients}
                      placeholder={placeholder}
                      onSelected={this.selectedClient}
                      disabled={!editable}
                      children={clientInfo}
                    />
                    <CustomPicker
                      label={global.translate('TITLE_COLLECTOR')}
                      items={employees}
                      placeholder={placeholderEmployee}
                      onSelected={this.selectedEmployee}
                      disabled={!editable}
                    />
                  </Form>
                </View>

                {/* Details */}
                <View style={{flex: 1}}>
                  <View style={styles.addPoint}>
                    <View style={{paddingBottom: 8}}>
                      <Text style={styles.detailText}>
                        {global.translate('TITLE_DETAILS')}
                      </Text>
                    </View>
                    <View>
                      {/* Tabs */}
                      <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={detailTabs}
                        containerStyle={{height: 50}}
                      />
                      <ScrollView>
                        {this.renderDetailTabs(selectedIndex)}
                        {detail}
                      </ScrollView>
                    </View>
                    {moreDetails}
                    {/* </ScrollView> */}
                  </View>
                </View>
=======
                  {/* CurrentDate */}
                  <CurrentDate>
                    <Text style={styles.currentDateText}>
                      {global.translate('TITLE_DATE')}
                    </Text>
                    <Text style={({marginLeft: 4}, styles.currentDateText)}>
                      {`: ${this.props.navigation.state.params.date}`}
                    </Text>
                  </CurrentDate>

                  {/*ClientForm*/}
                  <Form style={styles.container}>
                    <ClientForm style={{paddingBottom: 12}}>
                      <Text>{global.translate('TITLE_CLIENT')}</Text>
                      <CustomPicker
                        items={this.state.clients}
                        placeholder={this.state.placeholder}
                        selectedHolder={this.selectedClient.Name}
                        selectedItem={this.selectedClient}
                      />
                      {ClientInfo}
                    </ClientForm>

                    <ClientForm>
                      <Text>{global.translate('TITLE_COLLECTOR')}</Text>
                      <CustomPicker
                        items={this.state.employees}
                        placeholder={this.state.placeholderEmployee}
                        selectedItem={this.selectedEmployee}
                        disabled={this.state.disabled_date_from}
                      />
                    </ClientForm>
                  </Form>
                </View>

                {/* Details */}
                <View style={{flex: 1}}>
                  <View style={styles.addPoint}>
                    <View style={{paddingBottom: 8}}>
                      <Text style={styles.detailText}>
                        {global.translate('TITLE_DETAILS')}
                      </Text>
                    </View>
                    {/* <ScrollView> */}

                    <View>
                      {/* Tabs */}
                      <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 50}}
                      />
                      <ScrollView>
                        {this._renderDetails(selectedIndex)}
                      </ScrollView>
                    </View>
                    <ButtonOutlined onPress={this.onPressDetailHandler}>
                      <Icon name="add" style={{color: theme.colors.primary}} />
                      <TextButton>
                        {global.translate('TITLE_DETAILS')}
                      </TextButton>
                    </ButtonOutlined>
                    {/* </ScrollView> */}
                  </View>
                </View>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
              </ScrollView>
            </View>
          </DetailContent>
        </Container>
      </Root>
    );
  }
}
<<<<<<< HEAD

export const DateAssigned = ({label, details}) => {
  return (
    <CurrentDate>
      <Text style={styles.currentDateText}>{label}</Text>
      <Text style={({marginLeft: 4}, styles.currentDateText)}>{details}</Text>
    </CurrentDate>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    color: '#000',
    textTransform: 'capitalize',
  },

=======
const styles = StyleSheet.create({
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  currentDate: {
    backgroundColor: theme.colors.lightGray,
    padding: 16,
    flexDirection: 'row',
  },

  currentDateText: {color: theme.colors.gray},

  container: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  addPoint: {
    padding: theme.sizes.padding,
<<<<<<< HEAD
  },
});

const Client = styled.Text`
  font-size: 14px;
  color: ${theme.colors.darkGray};
`;
const ClientData = styled.View`
  background-color: ${theme.colors.lightGreen};
  border-color: green;
  border-width: 1;
  border-radius: 2;
  padding-horizontal: 8;
  padding-vertical: 12;
`;
const ButtonOutlined = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.colors.primary};
  border-width: 1;
  padding-vertical: 12px;
  margin-top: 4px;
  border-radius: 4px;
  align-items: center;
`;
const TextButton = styled.Text`
  margin-left: 24px;
  font-size: ${theme.sizes.base};
  color: ${theme.colors.primary};
  text-transform: uppercase;
`;
=======
    marginBottom: 24,
  },
});

const Client = styled.Text`
  font-size: 14px;
  color: ${theme.colors.darkGray};
`;
const ClientData = styled.View`
  background-color: ${theme.colors.lightGreen};
  border-color: green;
  border-width: 1;
  border-radius: 2;
  padding-horizontal: 8;
  padding-vertical: 12;
`;

const ButtonOutlined = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.colors.primary};
  border-width: 1;
  padding-vertical: 12px;
  margin-top: 12px;
  border-radius: 4px;
  align-items: center;
`;
const TextButton = styled.Text`
  margin-left: 24px;
  font-size: ${theme.sizes.base};
  color: ${theme.colors.primary};
  text-transform: uppercase;
`;
const ClientForm = styled.View``;

>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
const CurrentDate = styled.View`
  background-color: ${theme.colors.lightGray};
  padding: 16px;
  flex-direction: row;
`;
const DetailContent = styled.View`
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.lightGray};
`;
