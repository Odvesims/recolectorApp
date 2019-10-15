import React, {Component} from 'react';
import {theme} from '../../constants';
import PickerModal from 'react-native-picker-modal-view';
import employees from '../../country_states/dr.json';
import CustomPicker from '../../components/CustomPicker';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  DatePicker,
  Picker,
} from 'native-base';

export class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.selectedItem = this.selectedItem.bind(this);
  }

  state = {
    chosenDate: new Date(),
  };

  setDate = this.setDate.bind(this);

  static navigationOptions = {
    header: null,
  };

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  // selectedItem = item => {
  //   this.selectedItem(item);
  // };

  selectedItem(item) {
    alert(item.Name);
    this.setState({
      selected_item: item,
    });
  }

  render() {
    const {selectedItem, employeeText} = this.state;

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
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2018, 12, 31)}
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
                <Text style={styles.label}>Empleado</Text>
                {/* CustomPicker */}
                <CustomPicker
                  placeholder="Seleccione un elemento"
                  items={employees}
                  selectedItem={this.selectedItem}
                />
              </View>
            </Form>
          </View>

          <View style={styles.addPoint}>
            <View>{}</View>
            <TouchableOpacity
              style={styles.buttonGhost}
              onPress={() => {
                this.props.navigation.navigate('OrderList');
              }}>
              <Icon name="add" style={{color: theme.colors.primary}} />
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: theme.sizes.base,
                  color: theme.colors.primary,
                  textTransform: 'uppercase',
                }}>
                Orden
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
});
