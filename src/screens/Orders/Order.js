import React, {Component} from 'react';
import {theme} from '../../constants';
import {ButtonGroup} from 'react-native-elements';
import styled from 'styled-components/native';
import CustomPicker from '../../components/CustomPicker';
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
import {getStoredClients, getStoredEmployees} from '../../helpers/sql_helper';
import {dataOperation} from '../../helpers/apiconnection_helper';
import {
  printText,
  enableBT,
  connectBluetooth,
} from '../../helpers/bluetooth_helper';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      modalVisible: false,
      show: false,
      //
      selectedIndex: 0,
      quantity: 1,
      //
      picking: [],
      shopping: [],
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
    this.arrData = [];
    this.arrDataPicking = [];
    this.arrDataShopping = [];

    this.getClientsHandler();
    this.getEmployeesHandler();
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        let item = this.props.navigation.state.params.selItem;
        if (item !== undefined) {
          this.setState({data: this.arrData});
          let {selectedIndex} = this.state;
          if (selectedIndex === 0) {
            this.arrDataPicking.push(item);
            this.setState({
              picking: this.arrDataPicking,
            });
          } else {
            this.arrData.push(item);
            this.arrDataShopping.push(item);
            this.setState({
              data: this.arrData,
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

  // Select
  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };
  _renderDetails = item => {
    const {picking, shopping, selectedIndex} = this.state;

    if (item === 0) {
      return (
        <DetailsTab tab_data={picking} navigation={this.props.navigation} />
      );
    } else {
      return (
        <DetailsTab tab_data={shopping} navigation={this.props.navigation} />
      );
    }
  };

  execOperation = () => {
    let order_data = {
      setma_id: global.setma_id,
      client_code: this.state.client.split('-')[0],
      supervisor_code: global.employee_code,
      employee_code: this.state.selected_item.Code,
      order_state: 'A',
      order_completed: false,
      order_details: this.state.data,
    };
    this.setState({loading: true, loadingMessage: 'MESSAGE_REGISTERING_ORDER'});
    dataOperation('ORDER_OPERATION', order_data).then(res => {
      if (res.valid) {
        if (global.printer_address === '') {
          alert(global.translate('ALERT_PRINTER_NOT_CONFIGURED'));
        } else {
          enableBT().then(e => {
            connectBluetooth(global.printer_name, global.printer_address).then(
              c => {
                printText(res.responseObject).then(p => {});
              },
            );
          });
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

  getClientsHandler() {
    getStoredClients().then(clients => {
      this.setClientsPicker(clients).then(res => {
        this.setState({clients: res});
      });
    });
  }

  getEmployeesHandler() {
    getStoredEmployees().then(employees => {
      this.setEmployeesPicker(employees).then(res => {
        this.setState({employees: res});
      });
    });
  }

  onPressDetailHandler = () => {
    let {navigate} = this.props.navigation;
    let {selectedIndex} = this.state;
    if (selectedIndex === 0) {
      navigate('Picking');
    } else {
      navigate('Shopping');
    }
  };

  setClientsPicker(clients) {
    return new Promise((resolve, reject) => {
      let arrClients = [];
      clients.map(client => {
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
      selected_item: item,
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
    let ClientInfo = null;
    const {
      client,
      selectedIndex,
      client_address,
      client_city,
      client_state,
      client_phone,
    } = this.state;
    const buttons = ['Recolección', 'Compras']; //global.translate('TITLE_CATEGORY')];

    if (client) {
      ClientInfo = (
        <View
          style={{
            backgroundColor: theme.colors.lightGreen,
            borderColor: 'green',
            borderWidth: 1,
            borderRadius: 2,
            paddingHorizontal: 8,
            paddingVertical: 12,
          }}>
          <Text style={styles.client_data}>{client_address}</Text>
          <Text style={styles.client_data}>{client_city}</Text>
          <Text style={styles.client_data}>{client_state}</Text>
          <Text style={styles.client_data}>{client_phone}</Text>
        </View>
      );
    }

    return (
      <Root>
        <Container>
          <Header>
            <Spinner
              visible={this.state.loading}
              textContent={global.translate(this.state.loadingMessage)}
              color={'CE2424'}
              overlayColor={'rgba(255, 255, 255, 0.4)'}
              animation={'slide'}
            />
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>
                {global.translate(this.props.navigation.state.params.operation)}
              </Title>
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

  client_data: {
    fontSize: 14,
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
const Name = styled.Text`
  flex-basis: 150px;
  font-size: 16px;
  color: black;
  font-weight: bold;
  overflow: scroll;
  flex-grow: 2;
  flex-wrap: nowrap;
`;
const Quantity = styled.Text`
  flex-shrink: 10;
  color: ${theme.colors.success};
  font-size: 14px;
  font-weight: bold;
  flex-wrap: nowrap;
`;
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
