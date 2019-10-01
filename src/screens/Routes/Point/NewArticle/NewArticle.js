import React, {Component} from 'react';
import {theme} from '../../../../constants';
// import ButtonDone from '../../../../components'
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';

import {View, StyleSheet, TextInput} from 'react-native';
import {
  Content,
  Container,
  Picker,
  Left,
  Right,
  Title,
  Body,
  Header,
  Button,
  Icon,
  Text,
  Form,
  //   DatePicker,
} from 'native-base';

const CustomButton = styled(Button)`
  background: ${props => (props.bordered ? 'transparent' : ' #4285f4')};
  border-color: ${props =>
    props.bordered ? theme.colors.gray : ' transparent'};
  border: ${props => (props.bordered ? '3px solid gray' : '#4285f4')};
  text-transform: uppercase;
  flex-basis: 48%;
  justify-content: center;
`;

export default class NewArticle extends Component {
  state = {language: ''};
  updateUser = user => {
    this.setState({language: user});
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('NewPoint')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nuevo Articulo</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('NewPoint')}>
              <Icon name="checkmark" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <ScrollView>
            <Form>
              <View style={styles.paddingBottom}>
                <Text> Categoría o SubCategoría</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cliente"
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
                <View
                  style={{
                    borderColor: 'black',
                    borderStyle: 'solid',
                    borderWidth: 1,
                  }}>
                  <Picker
                    prompt="Articulo"
                    placeholder="Select the client"
                    selectedValue={this.state.language}
                    style={{}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({language: itemValue})
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="JavaScript" value="js" />
                  </Picker>
                </View>
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
              <View style={(styles.paddingBottom, {width: 80})}>
                <Text> Cantidad</Text>
                <TextInput
                  style={styles.input}
                  returnKeyType="go"
                  keyboardType="number-pad"
                  onChangeText={item => {}}
                />
              </View>
            </Form>
          </ScrollView>
        </Content>
        <View style={styles.actionContainer}>
          <CustomButton bordered>
            <Text style={{color: theme.colors.darkGray}}>Cancelar</Text>
          </CustomButton>
          <CustomButton>
            <Text>Guardar</Text>
          </CustomButton>
        </View>
      </Container>
    );
  }
}

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

  inputNumber: {
    flexBasis: '50%',
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

  actionContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexBasis: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
});
