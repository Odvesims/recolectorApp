import React, {Component} from 'react';
import {theme} from '../../constants';
import {TextInput} from '../../components';

import {} from 'react-native-vector-icons';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

// import ContentCustom from '../components';

import {
  Icon,
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Input,
  Right,
  Title,
  ActionSheet,
  Form,
} from 'native-base';

export default class NewClient extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nuevo Cliente</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('ClientScreen')}>
              <Icon name="checkmark" />
              <Text style={{color: 'white', marginLeft: 8}}>
                {global.translate('TITLE_DONE')}
              </Text>
            </Button>
          </Right>
        </Header>
        {/* Header */}
        <Header style={styles.headerCode}>
          <Body>
            <Text style={styles.headerCodeText}>
              Codigo: {Math.ceil(Math.random() * 1000)}
            </Text>
          </Body>
        </Header>

        <Content style={styles.container}>
          <KeyboardAvoidingView>
            <Form>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_NAME')}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_NAME')}
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_STATE')}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_STATE')}
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_CITY')}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_CITY')}
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_ADDRESS')}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_ADDRESS')}
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_PHONE')}
                </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  placeholder={global.translate('PLACEHOLDER_TYPE_PHONE')}
                  returnKeyType="go"
                  onChangeText={item => {}}
                />
              </View>
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerCode: {
    backgroundColor: theme.colors.lightGray,
    paddingLeft: 24,
    elevation: 0,
  },

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
});
