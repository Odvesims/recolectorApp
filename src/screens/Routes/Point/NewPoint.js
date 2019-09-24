import React, {Component} from 'react';
import {theme} from '../../../constants';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

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
  Text,
  Form,
  DatePicker,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export class NewPoint extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nuevo Punto</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="checkmark" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <ScrollView>
            <Form>
              <View style={styles.paddingBottom}>
                <Text> Cliente</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cliente"
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text> Categoría o SubCategoría</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cliente"
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text> Artículo</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cliente"
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text> Cantidad</Text>
                <TextInput
                  style={styles.input}
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                  bordered
                  style={{flexBasis: '48%', justifyContent: 'center'}}>
                  <Text>CANCELAR</Text>
                </Button>
                <Button style={{flexBasis: '48%', justifyContent: 'center'}}>
                  <Text>GUARDAR</Text>
                </Button>
              </View>
            </Form>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default NewPoint;

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
