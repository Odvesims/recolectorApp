import React, {Component} from 'react';
import {theme} from '../../constants';
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
} from 'native-base';

export class NewRoute extends Component {
  state = {chosenDate: new Date()};
  setDate = this.setDate.bind(this);

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  render() {
    return (
      <Container style={{flex: 1}}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Routes')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nueva Ruta</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Routes')}>
              <Icon name="checkmark" />
              <Text style={{color: 'white', marginLeft: 8}}>Listo</Text>
            </Button>
          </Right>
        </Header>
        <Content style={{flex: 1}}>
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
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: '#d3d3d3'}}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </View>
              <View>
                <Text style={styles.label}>Empleado</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Seleccione el empleado"
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
            </Form>
          </View>
          <View style={styles.addPoint}>
            <View>{}</View>
            <TouchableOpacity
              style={styles.buttonGhost}
              onPress={() => {
                this.props.navigation.navigate('NewPoint');
              }}>
              <Icon name="add" style={{color: theme.colors.primary}} />
              <Text
                style={{
                  marginLeft: 12,
                  fontSize: theme.sizes.base,
                  color: theme.colors.primary,
                  textTransform: 'uppercase',
                }}>
                Punto
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
    flex: 1,
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
