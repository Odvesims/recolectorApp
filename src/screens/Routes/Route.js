import React, {Component} from 'react';
import {theme} from '../../constants';
import PickerModal from 'react-native-picker-modal-view';
import CustomPicker from '../../components/CustomPicker';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Animated,
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
  getRouteDetails,
  updateRouteOrders,
} from '../../helpers/sql_helper';
import {dataOperation, getData} from '../../helpers/apiconnection_helper';

export class Route extends Component {
  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;
    this.state = {
      employees: [],
      employee: '',
      data: [],
      clear_data: [],
      loading: !params.new_record,
      loadingMessage: 'ALERT_GETTING_ROUTE',
      new_record: params.new_record,
      route_description: params.description,
      document_id: params.document_id,
      document_acronym: params.acronym,
      document_number: params.document_number,
      assigned_by: params.assigned_by,
      placeholder: params.employee_name,
      selected_item: {Name: params.employee_name, Code: params.assigned_to},
      chosenDate: params.date_from,
      chosenDate2: params.date_to,
      disabled_date_from: params.disabled_date_from,
    };

    if (params.new_record === false) {
      this.rowTranslateAnimatedValues = {};
      getData(
        'GET_ROUTE',
        `&route_id=${params.route_id}&status=${params.status}`,
      ).then(route => {
        updateRouteOrders(route.arrResponse[0]).then(r => {
          getRouteDetails(params.route_id).then(dets => {
            let dataWithIds = dets.map((item, index) => {
              item.id = index;
              item.isChecked = true;
              item.isSelect = true;
              this.rowTranslateAnimatedValues[`${index}`] = new Animated.Value(
                1,
              );
            });
            this.cleanArr(dets).then(clear => {
              this.setState({
                loading: false,
                data: clear,
                clear_data: clear,
                // route_description: r.description,
                document_id: r.document_id,
                document_acronym: r.acronym,
                document_number: r.document_number,
                assigned_by: r.assigned_by,
                placeholder: r.employee_name,
                chosenDate: r.date_from,
                chosenDate2: r.date_to,
              });
            });
          });
        });
      });
    }
    this.selectedItem = this.selectedItem.bind(this);
    this.getEmployeesHandler();
    this.updateDataState = this.updateDataState.bind(this);
  }

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
    const {params} = this.props.navigation.state;
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        let orders = params.orders;
        if (orders !== undefined) {
          //this.cleanArr(orders).then(res => {
          this.setState({data: orders, clear_data: orders});
          //});
          params.orders = undefined;
        }
      } catch (err) {}
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  updateDataState(theData) {
    this.setState({data: theData, clear_data: theData});
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

  setDate = newDate => {
    this.setState({chosenDate: moment(newDate).format('DD/MM/YYYY')});
  };

  setDate2 = newDate => {
    this.setState({chosenDate2: moment(newDate).format('DD/MM/YYYY')});
  };

  saveRoute = () => {
    //if (this.state.new_record) {
    let {
      route_description,
      chosenDate,
      chosenDate2,
      selected_item,
      clear_data,
      document_number,
    } = this.state;

    if (route_description && chosenDate && chosenDate2 && selected_item.Code) {
      let ordersArr = [];

      clear_data.map(order => {
        let orderObject = {
          code: order.order_document.split('-')[1],
          order_id: order.order_id,
        };
        ordersArr.push(orderObject);
      });

      let order_data = {
        document_number: document_number,
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
        loadingMessage: this.props.navigation.state.params.loading_message,
      });

      dataOperation('ROUTE_OPERATION', order_data).then(res => {
        if (res.valid) {
          updateOrderAssigned(ordersArr).then(up => {
            alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
            this.setState({
              loading: false,
            });
            this.props.navigation.goBack();
          });
        } else {
          this.setState({loading: false});
        }
      });
    } else {
      alert(global.translate('ALERT_COMPLETE_DATA'));
    }
    //} else {
    //  this.props.navigation.goBack();
    //}
  };

  getEmployeesHandler() {
    getStoredEmployees().then(employees => {
      this.setEmployeesPicker(employees).then(res => {
        this.setState({employees: res});
      });
    });
  }

  selectedItem = item => {
    this.setState({
      placeholder: item.Name,
      selected_item: item,
    });
  };

  markForDelete = swipeData => {
    const {key, value} = swipeData;
    if (value < -375) {
      const filteredData = this.state.data.filter(item => item.id !== key);
      this.updateList(filteredData);
    }
  };

  updateList = list => {
    this.setState({
      data: list,
      clear_data: list,
      reverted: false,
    });
  };

  onClickRevert = id => {
    this.setState({reverted: true});
  };

  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
  }

  renderItem = ({item}) => (
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
            {global.translate('TITLE_CODE')}: {item.order_document}
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

  render() {
    const {
      selectedItem,
      employeeText,
      leftActionActivated,
      toggle,
      placeholder,
      chosenDate2,
      chosenDate,
      data,
      route_description,
      loadingMessage,
      loading,
      disabled_date_from,
    } = this.state;

    console.log(this.state);
    console.log('Andris', this.state);
    const {params} = this.props.navigation.state;

    let orderList = (
      <SwipeListView
        style={{
          overflow: 'hidden',
          marginBottom: 0,
          backgroundColor: 'lightGray',
        }}
        data={data}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        renderHiddenItem={(data, rowMap) => (
          <TouchableHighlight
            style={[styles.hiddenList]}
            onPress={this.onClickRevert}>
            <View>
              <Button
                transparent
                style={{alignSelf: 'flex-end', marginRight: 12}}>
                <Icon name="trash" style={{color: 'white'}} />
                <Text style={{color: 'white', fontFamily: 'Roboto-Medium'}}>
                  {global.translate('TITLE_DELETED')}
                </Text>
              </Button>
            </View>
          </TouchableHighlight>
        )}
        leftOpenValue={0}
        rightOpenValue={-375}
        rightActionActivationDistance={125}
        onSwipeValueChange={this.markForDelete}
      />
    );

    return (
      <Container style={{flex: 1}}>
        <Spinner
          visible={loading}
          textContent={global.translate(loadingMessage)}
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
            <Title>{global.translate(params.operation)}</Title>
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
                  value={route_description}
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
                    defaultDate={
                      new Date(
                        chosenDate.split('/')[2],
                        parseInt(chosenDate.split('/')[1]) - 1,
                        chosenDate.split('/')[0],
                      )
                    }
                    minimumDate={new Date()}
                    locale={'es'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    textStyle={{color: theme.colors.gray, fontSize: 14}}
                    onDateChange={this.setDate}
                    disabled={disabled_date_from}
                  />
                </View>
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_END_DATE')}
                </Text>
                <View style={styles.datepicker}>
                  <DatePicker
                    defaultDate={
                      new Date(
                        this.state.chosenDate2.split('/')[2],
                        parseInt(chosenDate2.split('/')[1]) - 1,
                        chosenDate2.split('/')[0],
                      )
                    }
                    minimumDate={new Date()}
                    locale={'es'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    textStyle={{color: theme.colors.gray, fontSize: 14}}
                    placeHolderTextStyle={{
                      color: theme.colors.gray2,
                      fontSize: 14,
                    }}
                    onDateChange={this.setDate2}
                    disabled={disabled_date_from}
                  />
                </View>
              </View>
              <CustomPicker
                label={global.translate('TITLE_COLLECTOR')}
                items={this.state.employees}
                placeholder={placeholder}
                onSelected={this.selectedItem}
                disabled={disabled_date_from}
              />
            </Form>
          </View>
          <ScrollView style={{marginBottom: 24}}>
            {/* FLATLIST */}
            {orderList}
          </ScrollView>

          <View style={styles.addPoint}>
            <View>{}</View>
            <TouchableOpacity
              style={styles.buttonGhost}
              onPress={() => {
                this.props.navigation.navigate('OrderList', {
                  checkedItems: this.state.data,
                  updateData: this.updateDataState,
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
export default Route;

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
  hiddenList: {
    margin: 5,
    backgroundColor: '#c3000d',
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
  leftSwipeItem: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    height: 80,
    elevation: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: '#c3000d',
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    backgroundColor: '#c3000d',
  },
});
