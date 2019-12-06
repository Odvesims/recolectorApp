import React, {Component} from 'react';
import {theme} from '../../constants';
import {
  CustomPicker,
  CustomInput,
  BtnIcon,
  SwipeHiddenList,
  SwipeList,
  CustomDatePicker,
} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
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
  Icon,
  Form,
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
    console.log('Route Remove Function', swipeData);
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

  // onClickRevert = id => {
  //   this.setState({reverted: true});
  // };

  // handleUserBeganScrollingParentView() {
  //   this.swipeable.recenter();
  // }

  render() {
    const {
      placeholder,
      chosenDate2,
      chosenDate,
      data,
      employees,
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
        style={styles.swipeListView}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <SwipeList item={item} />}
        renderHiddenItem={(data, rowMap) => (
          <SwipeHiddenList
            label={'TITLE_DELETED'}
            onPress={this.onClickRevert}
          />
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
            <BtnIcon
              iconName={'arrow-back'}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body>
            <Title>{global.translate(params.operation)}</Title>
          </Body>
          <Right>
            <BtnIcon
              iconName={'checkmark'}
              label={'TITLE_DONE'}
              onPress={this.saveRoute}
            />
          </Right>
        </Header>
        <Content style={{backgroundColor: theme.colors.lightGray}}>
          <View style={styles.container}>
            <Form>
              <CustomInput
                label={'TITLE_DESCRIPTION'}
                style={styles.input}
                placeholder={'PLACEHOLDER_TYPE_DESCRIPTION'}
                returnKeyType="go"
                value={route_description}
                onChangeText={route_description => {
                  this.setState({route_description: route_description});
                }}
              />

              <CustomDatePicker
                label={'TITLE_START_DATE'}
                defaultDate={
                  new Date(
                    chosenDate.split('/')[2],
                    parseInt(chosenDate.split('/')[1]) - 1,
                    chosenDate.split('/')[0],
                  )
                }
                minimumDate={new Date()}
                onDateChange={this.setDate}
                disabled={disabled_date_from}
              />

              <CustomDatePicker
                label={'TITLE_END_DATE'}
                defaultDate={
                  new Date(
                    chosenDate2.split('/')[2],
                    parseInt(chosenDate2.split('/')[1]) - 1,
                    chosenDate2.split('/')[0],
                  )
                }
                minimumDate={new Date()}
                onDateChange={this.setDate2}
                disabled={disabled_date_from}
              />

              <CustomPicker
                label={'TITLE_COLLECTOR'}
                items={employees}
                placeholder={placeholder}
                onSelected={this.selectedItem}
                disabled={disabled_date_from}
              />
            </Form>
          </View>
          <ScrollView style={{marginTop: 12}}>
            {/* FLATLIST */}
            {orderList}
          </ScrollView>

          <View style={styles.addPoint}>
            <TouchableOpacity
              style={styles.buttonGhost}
              onPress={() => {
                this.props.navigation.navigate('OrderList', {
                  checkedItems: this.state.data,
                  updateData: this.updateDataState,
                });
              }}>
              <Icon
                name="add"
                style={{color: theme.colors.primary, marginRight: 12}}
              />
              <Text
                style={{
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

  datepicker: {
    marginVertical: theme.sizes.p8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
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

  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  swipeListView: {
    overflow: 'hidden',
    marginBottom: 0,
    backgroundColor: 'lightGray',
    paddingHorizontal: 24,
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
