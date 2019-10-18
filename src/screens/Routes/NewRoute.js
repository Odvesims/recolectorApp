import React, {Component} from 'react';
import {theme} from '../../constants';
import PickerModal from 'react-native-picker-modal-view';
import CustomPicker from '../../components/CustomPicker';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

import {
  Content,
  Container,
  Left,
  Right,
  Title,
  Body,
  Header,
  Button,
  Icon,
  Form,
  Item,
  DatePicker,
  Picker,
} from 'native-base';
import {
  getStoredEmployees,
  updateOrderAssigned,
} from '../../helpers/sql_helper';
import {dataOperation} from '../../helpers/apiconnection_helper';

export class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      employee: '',
      data: [],
      clear_data: [],
      route_description: '',
      chosenDate: new Date(),
      chosenDate2: new Date(),
    };
    this.selectedItem = this.selectedItem.bind(this);
    this.getEmployeesHandler();
  }

  state = {
    chosenDate: new Date(),
    chosenDate2: new Date(),
  };

  setDate = this.setDate.bind(this);

  static navigationOptions = {
    header: null,
  };

  cleanArr(orders) {
    return new Promise((resolve, reject) => {
      let cArr = [];
      orders.map(item => {
        if (item.isChecked) {
          cArr.push(item);
        }
      });
      resolve(cArr);
    });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        let orders = this.props.navigation.state.params.orders;
        if (orders !== undefined) {
          this.cleanArr(orders).then(res => {
            this.setState({data: res, clear_data: res});
          });
          this.props.navigation.state.params.orders = undefined;
        }
      } catch (err) {}
    });
  }

  setEmployeesPicker(employees) {
    return new Promise((resolve, reject) => {
      let arrEmployees = [];
      for (let i = 0; i < employees.length; ++i) {
        let employee = employees[i];
        arrEmployees.push({
          Name: employee.employee_code + '- ' + employee.name,
          Code: employee.employee_code,
          Phone: employee.phone_number,
        });
      }
      resolve(arrEmployees);
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  setDate2(newDate) {
    this.setState({chosenDate2: newDate});
  }

  saveRoute = () => {
    let {
      route_description,
      chosenDate,
      chosenDate2,
      selected_item,
      clear_data,
    } = this.state;
    if (route_description && chosenDate && chosenDate2 && selected_item.Code) {
      let ordersArr = [];
      clear_data.map(order => {
        let orderObject = {
          code: order.document.split('-')[1],
          order_id: order.order_id,
        };
        ordersArr.push(orderObject);
      });
      let order_data = {
        setma_id: global.setma_id,
        description: route_description,
        supervisor_code: global.employee_code,
        collector_code: selected_item.Code,
        start_date: chosenDate,
        end_date: chosenDate2,
        route_state: 'A',
        orders_list: ordersArr,
      };
      this.setState({
        loading: true,
        loadingMessage: 'MESSAGE_REGISTERING_ROUTE',
      });
      dataOperation('ROUTE_OPERATION', order_data).then(res => {
        if (res.valid) {
          updateOrderAssigned(ordersArr).then(up => {
            alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
            this.setState({
              employees: [],
              client: '',
              client_address: '',
              client_city: '',
              client_state: '',
              client_phone: '',
              placeholder: global.translate('PLACEHOLDER_SELECT_CLIENT'),
              data: [],
              loading: false,
            });
          });
        } else {
          this.setState({loading: false});
        }
      });
    } else {
      alert(global.translate('ALERT_COMPLETE_DATA'));
    }
  };

  getEmployeesHandler() {
    getStoredEmployees().then(employees => {
      this.setEmployeesPicker(employees).then(res => {
        this.setState({employees: res});
      });
    });
  }

  selectedItem(item) {
    this.setState({
      selected_item: item,
    });
  }

  render() {
    const {selectedItem, employeeText} = this.state;

    let renderItem = ({item}) => (
      <Item style={[styles.list]} onPress={() => {}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <View key={item.key} style={styles.listContainer}>
            <Text style={styles.code}>
              {global.translate('TITLE_CODE')}: {item.document}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.name}>
                {item.client} - {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                $ {item.order_total}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.address}>
              {item.address}
            </Text>
          </View>
        </View>
      </Item>
    );

    let orderList = (
      <FlatList
        style={{overflow: 'hidden', marginBottom: 12}}
        data={this.state.data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    );

    return (
      <Container style={{flex: 1}}>
        <Spinner
          visible={this.state.loading}
          textContent={global.translate(this.state.loadingMessage)}
          color={'CE2424'}
          overlayColor={'rgba(255, 255, 255, 0.4)'}
          animation={'slide'}
        />
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_ROUTE')}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.saveRoute}>
              <Icon name="checkmark" />
              <Text style={{color: 'white', marginLeft: 8}}>
                {global.translate('TITLE_DONE')}
              </Text>
            </Button>
          </Right>
        </Header>
        <Content style={{backgroundColor: theme.colors.lightGray}}>
          <View style={styles.container}>
            <Form>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_DESCRIPTION')}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_DESCRIPTION')}
                  returnKeyType="go"
                  onChangeText={route_description => {
                    this.setState({route_description: route_description});
                  }}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_START_DATE')}
                </Text>
                <View style={styles.datepicker}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'es'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={global.translate('TITLE_SELECT_DATE')}
                    textStyle={{color: theme.colors.gray, fontSize: 14}}
                    placeHolderTextStyle={{
                      color: theme.colors.gray2,
                      fontSize: 14,
                    }}
                    onDateChange={this.setDate}
                    disabled={false}
                  />
                </View>
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_END_DATE')}
                </Text>
                <View style={styles.datepicker}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'es'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText={global.translate('TITLE_SELECT_DATE')}
                    textStyle={{color: theme.colors.gray, fontSize: 14}}
                    placeHolderTextStyle={{
                      color: theme.colors.gray2,
                      fontSize: 14,
                    }}
                    onDateChange={this.setDate2}
                    disabled={false}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.label}>
                  {global.translate('TITLE_COLLECTOR')}
                </Text>
                {/* CustomPicker */}
                <CustomPicker
                  items={this.state.employees}
                  placeholder={this.state.placeholder}
                  value={this.state.employee}
                  selectedItem={this.selectedItem}
                />
              </View>
            </Form>
          </View>
          <ScrollView style={{marginBottom: 24}}>
            {/* FLATLIST */}
            {orderList}
            {/* FLATLIST */}
          </ScrollView>

          <View style={styles.addPoint}>
            <View>{}</View>
            <TouchableOpacity
              style={styles.buttonGhost}
              onPress={() => {
                this.props.navigation.navigate('OrderList', {
                  checkedItems: this.state.data,
                });
              }}>
              <Icon name="add" style={{color: theme.colors.primary}} />
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: theme.sizes.base,
                  color: theme.colors.primary,
                  textTransform: 'uppercase',
                }}>
                {global.translate('TITLE_ORDER')}
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default NewRoute;
const styles = StyleSheet.create({
  headerCodeText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },

  button: {
    fontSize: theme.sizes.caption,
    textTransform: 'uppercase',
    backgroundColor: '#4285F4',
  },

  textCenter: {
    alignItems: 'center',
  },

  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  datepicker: {
    marginVertical: theme.sizes.p8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  label: {
    fontSize: theme.sizes.base,
    color: theme.colors.darkGray,
  },

  labelForgot: {
    color: theme.colors.primary,
    fontSize: theme.fonts.caption.fontSize,
    alignSelf: 'flex-end',
  },

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },

  addPoint: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.lightGray,
  },

  buttonGhost: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  list: {
    margin: 5,
    backgroundColor: theme.colors.white,
    height: 80,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  code: {
    textAlign: 'left',
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },

  numberBox: {
    marginBottom: theme.sizes.p8,
  },

  name: {
    flexBasis: 150,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'scroll',
    flexGrow: 2,
    flexWrap: 'nowrap',
  },

  price: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },
});
