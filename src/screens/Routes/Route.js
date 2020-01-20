import React, {Component} from 'react';
import {theme} from '../../constants';
import styled from 'styled-components/native';
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
    const {
      params: {
        new_record,
        description,
        acronym,
        employee_name,
        date_from,
        date_to,
        assigned_to,
        editable,
        assigned_by,
        document_id,
        document_number,
        route_id,
        status,
      },
    } = this.props.navigation.state;
    this.state = {
      employees: [],
      employee: '',
      data: [],
      clear_data: [],
      loading: !new_record,
      loadingMessage: 'ALERT_GETTING_ROUTE',
      new_record: new_record,
      route_description: description,
      document_id: document_id,
      document_acronym: acronym,
      document_number: document_number,
      assigned_by: assigned_by,
      placeholder: employee_name,
      selected_item: {Name: employee_name, Code: assigned_to},
      chosenDate: date_from,
      chosenDate2: date_to,
      editable: editable,
    };

    if (new_record === false) {
      this.rowTranslateAnimatedValues = {};
      getData('GET_ROUTE', `&route_id=${route_id}&status=${status}`).then(
        route => {
          updateRouteOrders(route.arrResponse[0]).then(r => {
            getRouteDetails(route_id).then(dets => {
              let dataWithIds = dets.map((item, index) => {
                item.id = index;
                item.isChecked = true;
                item.isSelect = true;
                this.rowTranslateAnimatedValues[
                  `${index}`
                ] = new Animated.Value(1);
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
        },
      );
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

  // onClickRevert = id => {
  //   this.setState({reverted: true});
  // };

  // handleUserBeganScrollingParentView() {
  //   this.swipeable.recenter();
  // }
  addOrderHandler = () => {
    this.props.navigation.navigate('OrderList', {
      checkedItems: this.state.data,
      updateData: this.updateDataState,
    });
  };

  render() {
    console.log('state', this.state);
    const {
      placeholder,
      chosenDate2,
      chosenDate,
      data,
      employees,
      editable,
      route_description,
      loadingMessage,
      loading,
    } = this.state;

    const {params} = this.props.navigation.state;

    let isEditable = editable;
    let addOrderButton;

    const dateFrom = new Date(
      chosenDate.split('/')[2],
      parseInt(chosenDate.split('/')[1]) - 1,
      chosenDate.split('/')[0],
    );

    const dateTo = new Date(
      chosenDate.split('/')[2],
      parseInt(chosenDate2.split('/')[1]) - 1,
      chosenDate.split('/')[0],
    );

    if (isEditable) {
      addOrderButton = (
        <ButtonOutlined onPress={this.addOrderHandler}>
          <Icon name="add" style={{color: theme.colors.primary}} />
          <TextButton>{global.translate('TITLE_ORDER')}</TextButton>
        </ButtonOutlined>
      );
    }

    let orderList = (
      <SwipeListView
        style={styles.swipeList}
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
                editable={editable}
              />

              <CustomDatePicker
                label={'TITLE_START_DATE'}
                defaultDate={dateFrom}
                minimumDate={new Date()}
                onDateChange={this.setDate}
                disabled={!editable}
              />

              <CustomDatePicker
                label={'TITLE_END_DATE'}
                defaultDate={dateTo}
                minimumDate={new Date()}
                onDateChange={this.setDate2}
                disabled={!editable}
              />

              <CustomPicker
                label={'TITLE_COLLECTOR'}
                items={employees}
                placeholder={placeholder}
                onSelected={this.selectedItem}
                disabled={!editable}
              />
            </Form>
          </View>
          <ScrollView style={{marginTop: 12}}>{orderList}</ScrollView>

          <View style={styles.addPoint}>{addOrderButton}</View>
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

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },

  addPoint: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.lightGray,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  swipeList: {
    overflow: 'hidden',
    marginBottom: 0,
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 24,
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
