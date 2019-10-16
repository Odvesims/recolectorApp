import React, {Component} from 'react';
import {theme} from '../../constants';
import PickerModal from 'react-native-picker-modal-view';
import CustomPicker from '../../components/CustomPicker';
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
import {getStoredEmployees} from '../../helpers/sql_helper';

export class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      employee: '',
      data: [],
    };
    this.selectedItem = this.selectedItem.bind(this);
    this.getEmployeesHandler();
  }

  state = {
    chosenDate: new Date(),
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
            this.setState({data: res});
          });
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
      <Item style={[styles.list, item.selectedClass]} onPress={() => {}}>
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
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nueva Ruta</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('RouteScreen')}>
              <Icon name="checkmark" />
              <Text style={{color: 'white', marginLeft: 8}}>Listo</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{backgroundColor: theme.colors.lightGray}}>
          <View style={styles.container}>
            <Form>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>Nombre Ruta</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite el nombre de la ruta"
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>Fecha límite</Text>
                <View style={styles.datepicker}>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    locale={'es'}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={'fade'}
                    androidMode={'default'}
                    placeHolderText="Select date"
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
