import React, {Component} from 'react';
import {theme} from '../../constants';
import {ButtonGroup} from 'react-native-elements';
import styled from 'styled-components/native';
import CustomPicker from '../../components/CustomPicker';
import {SwipeListView} from 'react-native-swipe-list-view';
import moment from 'moment';
import _ from 'lodash';
// import Detail from './Detail';
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  TouchableHighlight,
  Animated,
} from 'react-native';
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
  Item,
  Button,
  ActionSheet,
  Content,
  Tabs,
  Tab,
  Segment,
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {DetailsTab} from './Tabs';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {dataOperation, getData} from '../../helpers/apiconnection_helper';
import {
  getStoredClients,
  getStoredEmployees,
  getOrderDetails,
} from '../../helpers/sql_helper';
import {
  printInvoiceText,
  enableBT,
  connectBluetooth,
} from '../../helpers/bluetooth_helper';

export default class Order extends Component {
  constructor(props) {
    super(props);
    const {
      params: {isNewRecord, order_id},
    } = this.props.navigation.state;

    this.state = {
      data: [],
      loading: false,
      modalVisible: false,
      show: false,
      //
      clear_data: [],
      //
      selectedIndex: 0,
      quantity: 1,
      //
      picking: [],
      shopping: [],
      hasPurchases: 'F',
      //
      selected_employee: [],
      //
      clients: [],
      employees: [],
      client: '',
      //
      client_address: null,
      client_city: null,
      client_state: null,
      client_phone: null,
      //
      placeholder: global.translate('PLACEHOLDER_SELECT_CLIENT'),
      placeholderEmployee: global.translate('PLACEHOLDER_SELECT_EMPLOYEE'), //
      //
      operation: 'TITLE_VIEW_ORDER',
      isNewRecord: isNewRecord,
      order_id: order_id,
      //
      editable: true,
    };

    this.arrDataPicking = [];
    this.arrDataShopping = [];
    this.getDataHandler();

    if (isNewRecord === false) {
      this.rowTranslateAnimatedValues = {};
      getData('GET_ORDER', `&order_id=${order_id}`).then(o => {
        getOrderDetails(order_id).then(dets => {
          let orderData = o.arrResponse[0];
          console.log('arrRESPONSE', o.arrResponse[0]);
          this.setState({
            ...orderData,
            placeholder: orderData.client_name || '',
            placeholderEmployee: orderData.employee_name || '',
            client_address: orderData.address,
            client_city: orderData.city,
            client_state: orderData.state,
            client_phone: orderData.phone_number,
            loading: false,
            picking: orderData.order_details,
            shopping: orderData.order_purchases_details,
            editable: false,
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

  getDataHandler() {
    getStoredClients().then(clients => {
      this.setClientsPicker(clients).then(res => {
        this.setState({clients: res});
      });
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
        let {selectedIndex} = this.state;
        let item = params.itemSelected;

        if (item !== undefined) {
          this.setState({data: this.arrData, clear_data: this.arrData});
          if (selectedIndex === 0) {
            this.arrDataPicking.push(item);
            this.setState({
              picking: this.arrDataPicking,
              clear_data: this.arrData,
            });
          } else {
            this.arrDataShopping.push(item);
            this.setState({
              shopping: this.arrDataShopping,
              clear_data: this.arrData,
            });
          }
          item = undefined;
        }
      } catch (err) {
        alert(err);
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  // Select
  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };

  onPressDetailHandler = () => {
    let {navigate} = this.props.navigation;
    if (this.state.selectedIndex === 0) {
      navigate('Picking', {editable: this.state.editable}); // {data: picking}
    } else {
      navigate('Shopping', {editable: this.state.editable}); // {data: shopping}
    }
  };

  renderDetailTabs = item => {
    const {picking, shopping, selectedIndex, editable} = this.state;
    if (item === 0) {
      return (
        <DetailsTab
          tab_data={picking}
          navigation={this.props.navigation}
          editable={editable}
          renderView={'Picking'}
        />
      );
    } else {
      return (
        <DetailsTab
          tab_data={shopping}
          navigation={this.props.navigation}
          editable={editable}
          renderView={'Shopping'}
        />
      );
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  execOperation = () => {
    let hasPurchases = 'F';
    const {
      client,
      selected_employee,
      picking,
      shopping,
      chosenDate,
      date,
    } = this.state;
    // const {client, selected_item, data, picking, shopping} = this.state;
    if (shopping.length > 0) {
      hasPurchases = 'T';
    }

    let order_data = {
      setma_id: global.setma_id,
      client_code: client.split('-')[0],
      supervisor_code: global.employee_code,
      employee_code: selected_employee.Code || 0,
      start_date: chosenDate,
      order_state: 'A',
      order_completed: false,
      order_details: picking,
      purchase_details: shopping,
      has_purchases: hasPurchases,
      date_register: date,
    };
    // console.log(order_data);
    this.setState({loading: true, loadingMessage: 'MESSAGE_REGISTERING_ORDER'});
    dataOperation('ORDER_OPERATION', order_data).then(res => {
      if (res.valid) {
        if (hasPurchases === 'T') {
          if (global.printer_address === '') {
            alert(global.translate('ALERT_PRINTER_NOT_CONFIGURED'));
          } else {
            enableBT().then(e => {
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
                  alert('Not connected');
                }
              });
            });
          }
        } else {
        }
        alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
        this.setState({
          client: '',
          client_address: null,
          client_city: null,
          client_state: null,
          client_phone: null,
          placeholder: '',
          selectedItem: [],
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

  setClientsPicker(clients) {
    return new Promise((resolve, reject) => {
      let arrClients = [];
      clients.map(client => {
        // console.log('ClientPicker ==>', client);
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
      client: item.Name,
      client_address: item.Address,
      client_city: item.City,
      client_state: item.State,
      client_phone: item.Phone,
    });
  };

  selectedEmployee = item => {
    this.setState({
      selected_employee: item,
      employee_code: item,
    });
  };

  updateList = list => {
    this.setState({
      data: list,
      clear_data: list,
      reverted: false,
    });
  };

  render() {
    // console.log('STATE==>', this.state);
    const {params} = this.props.navigation.state;
    const {editable} = this.state;

    const {
      //
      employees,
      placeholderEmployee,
      placeholder,
      //
      client,
      selectedIndex,
      client_address,
      client_city,
      client_state,
      client_phone,
      loading,
      loadingMessage,
    } = this.state;
    const buttons = ['Recolección', 'Compras']; //global.translate('TITLE_CATEGORY')];

    let moreDetails = null;
    if (editable) {
      moreDetails = (
        <ButtonOutlined onPress={this.onPressDetailHandler}>
          <Icon name="add" style={{color: theme.colors.primary}} />
          <TextButton>{global.translate('TITLE_DETAILS')}</TextButton>
        </ButtonOutlined>
      );
    }

    let clientInfo = null;
    if (client) {
      clientInfo = (
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
              visible={loading}
              textContent={global.translate(loadingMessage)}
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
            <Right>
              <Button transparent onPress={this.execOperation}>
                <Icon name="checkmark" />
              </Button>
            </Right>
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
                  {/* CurrentDate */}
                  <CurrentDate>
                    <Text style={styles.currentDateText}>
                      {global.translate('TITLE_DATE')}
                    </Text>
                    <Text style={({marginLeft: 4}, styles.currentDateText)}>
                      {`: ${moment(params.date).format('DD/MM/YYYY')}`}
                    </Text>
                  </CurrentDate>

                  {/*ClientForm*/}
                  <Form style={styles.container}>
                    <ClientForm style={{paddingBottom: 12}}>
                      <Text>{global.translate('TITLE_CLIENT')}</Text>
                      <CustomPicker
                        items={this.state.clients}
                        placeholder={placeholder}
                        selectedHolder={placeholder}
                        selectedItem={this.selectedClient}
                        disabled={!editable}
                      />
                      {clientInfo}
                    </ClientForm>

                    <ClientForm>
                      <Text>{global.translate('TITLE_COLLECTOR')}</Text>
                      <CustomPicker
                        items={employees}
                        placeholder={placeholderEmployee}
                        selectedItem={this.selectedEmployee}
                        disabled={!editable}
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

                    <View>
                      {/* Tabs */}
                      <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 50}}
                      />
                      <ScrollView>
                        {this.renderDetailTabs(selectedIndex)}
                      </ScrollView>
                    </View>
                    {moreDetails}
                    {/* </ScrollView> */}
                  </View>
                </View>
              </ScrollView>
            </View>
          </DetailContent>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
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
