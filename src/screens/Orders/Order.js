import React, {Component} from 'react';
import {theme} from '../../constants';
import {ButtonGroup} from 'react-native-elements';
import {CustomPicker, BtnIcon} from '../../components';

import {
  styles,
  Client,
  ClientData,
  ButtonOutlined,
  TextButton,
  CurrentDate,
  DetailContent,
} from './styles';

import moment from 'moment';
import _ from 'lodash';
import {View, Alert, Animated, ScrollView} from 'react-native';
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
  Button,
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import {DetailsTab} from './Tabs';
import {backDialog} from '../../utils';

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
      params: {editable, order_id, isNewRecord, loading, date},
    } = this.props.navigation.state;

    let dateRegister = moment(date).format('DD/MM/YYYY');
    this.state = {
      data: [],
      loading: loading,
      date: dateRegister,
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
      client: null,
      //
      client_address: null,
      client_city: null,
      client_state: null,
      client_phone: null,
      //
      placeholder: global.translate('form.placeholder.select.client'),
      placeholderEmployee: global.translate('form.placeholder.select.employee'), //
      //
      operation: 'action.edit.order',
      order_id: order_id,
      //
      editable: editable,
    };

    this.getDataHandler();

    if (isNewRecord === false) {
      getData('GET_ORDER', `&order_id=${order_id}`).then(o => {
        getOrderDetails(order_id).then(dets => {
          const orderData = o.arrResponse[0];
          console.log('get order =>', o);
          console.log('arrRESPONSE', orderData);
          this.setState({
            ...orderData,
            placeholder: orderData.client_name,
            placeholderEmployee: orderData.employee_name || '',
            client_address: orderData.address,
            client_city: orderData.city,
            client_state: orderData.state,
            client_phone: orderData.phone_number,
            picking: orderData.order_details,
            shopping: orderData.order_purchases_details,
            loading: false,
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
    let reset = {
      quantity: 1,
      detail_description: global.translate('form.placeholder.select.article'),
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
    const isNewRecord = this.props.navigation.state.params.isNewRecord;
    const {goBack} = this.props.navigation;

    if (isNewRecord === false) {
      goBack();
    } else {
      if (!client && !picking.length && !shopping.length) {
        goBack();
      } else {
        backDialog(goBack);
      }
    }
  };

  execOperation = async () => {
    let hasPurchases = 'F';
    const {client, selected_employee, picking, shopping, date} = this.state;
    if (shopping.length > 0) {
      hasPurchases = 'T';
    }

    let order_data = {
      setma_id: global.setma_id,
      client_code: client.split('-')[0],
      supervisor_code: global.employee_code,
      employee_code: selected_employee.Code || 0,
      order_state: 'A',
      order_completed: false,
      order_details: picking,
      purchase_details: shopping,
      has_purchases: hasPurchases,
      date_register: date,
    };
    // console.log('Order Data ==>', order_data);
    this.setState({loading: true, loadingMessage: 'message.register.order'});
    dataOperation('ORDER_OPERATION', order_data).then(res => {
      // console.log('DataOperation ==>', res);
      if (res.valid) {
        if (hasPurchases === 'T') {
          if (global.printer_address === '') {
            alert(global.translate('print.not_configured'));
          } else {
            enableBT().then(e => {
              connectBluetooth(
                global.printer_name,
                global.printer_address,
              ).then(c => {
                if (c === true) {
                  Alert.alert(
                    global.translate('print.order'),
                    global.translate('print.order_message'),
                    [
                      {
                        text: global.translate('print.no_print'),
                        onPress: () => {
                          alert.cancel;
                        },
                        style: 'cancel',
                      },
                      {
                        text: global.translate('print.together'),
                        onPress: () => {
                          printInvoiceText(res.responseObject, 2).then(p => {});
                        },
                      },
                      {
                        text: global.translate('print.separate'),
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
        }
        alert(global.translate('message.success.registry'));
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

  selectedClient = item => {
    this.setState({
      placeholder: item.Name,
      client: item.Name,
      client_address: item.Address,
      client_city: item.City,
      client_state: item.State,
      client_phone: item.Phone,
    });
    return item;
  };

  selectedEmployee = item => {
    this.setState({
      placeholderEmployee: item.Name,
      selected_employee: item,
      employee_code: item.Code,
    });
    return item;
  };

  updateListPicking = list => {
    this.setState({
      picking: list,
    });
  };

  updateListShopping = list => {
    this.setState({
      shopping: list,
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
      selectedIndex,
      client_address,
      client_city,
      client_state,
      client_phone,
      loading,
      loadingMessage,
    } = this.state;

    const detailTabs = [
      global.translate('tab.picking'),
      global.translate('tab.shopping'),
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
          <BtnIcon iconName={'checkmark'} onPress={this.execOperation} />
        </Right>
      );
      moreDetails = (
        <ButtonOutlined onPress={this.onPressDetailHandler}>
          <Icon name="add" style={{color: theme.colors.primary}} />
          <TextButton>{global.translate('label.details')}</TextButton>
        </ButtonOutlined>
      );
    }

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
              <BtnIcon iconName={'arrow-back'} onPress={this.goBack} />
            </Left>
            <Body>
              <Title>{global.translate(params.operation)}</Title>
            </Body>
            {save}
          </Header>
          {/* Content */}
          <DetailContent>
            <ScrollView>
              <View>
                {/* Date Assigned */}
                <DateAssigned
                  label={global.translate('form.label.date')}
                  details={`: ${this.state.date}`}
                />
                {/*ClientForm*/}
                <Form style={styles.container}>
                  <CustomPicker
                    label={'form.label.client'}
                    items={clients}
                    placeholder={placeholder}
                    onSelected={this.selectedClient}
                    disabled={!editable}
                    children={clientInfo}
                  />
                  <CustomPicker
                    label={'form.label.collector'}
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
                      {global.translate('label.details')}
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
            </ScrollView>
          </DetailContent>
        </Container>
      </Root>
    );
  }
}

export const DateAssigned = ({label, details}) => {
  return (
    <CurrentDate>
      <Text style={styles.currentDateText}>{label}</Text>
      <Text style={({marginLeft: 4}, styles.currentDateText)}>{details}</Text>
    </CurrentDate>
  );
};
