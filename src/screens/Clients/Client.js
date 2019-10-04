import React, {Component} from 'react';
import {theme} from '../../constants';
import {TextInput} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';

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

import {clientOperation} from '../../helpers/apiconnection_helper';
import {updateClient} from '../../helpers/sql_helper';

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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingMessage: this.props.navigation.state.params.loading_message,
      new_record: this.props.navigation.state.params.new_record,
      code: this.props.navigation.state.params.code,
      name: this.props.navigation.state.params.name,
      address: this.props.navigation.state.params.address,
      city: this.props.navigation.state.params.city,
      state: this.props.navigation.state.params.state,
      country: this.props.navigation.state.params.country,
      phone: this.props.navigation.state.params.phone,
    };
  }

  static navigationOptions = {
    header: null,
  };

  execOperation = () => {
    let client_data = {
      code: this.state.code,
      name: this.state.name,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      phone: this.state.phone,
      phone_old: this.state.phone,
      country_id: global.country_id,
      setma_id: global.setma_id,
    };
    this.setState({loading: true});
    clientOperation(client_data).then(res => {
      updateClient(res.client).then(result => {
        this.setState({loading: false});
        alert(global.translate(result));
      });
    });
  };

  goBack = () => {
    let value = this.state.new_record;
    this.props.navigation.state.params.onGoBack(value);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Container>
        {/* Header */}
        <Header>
          <Spinner
            visible={this.state.loading}
            textContent={global.translate(this.state.loadingMessage)}
            color={'CE2424'}
            overlayColor={'rgba(255, 255, 255, 0.4)'}
            animation={'slide'}
          />
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              {global.translate(this.props.navigation.state.params.operation)}
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={this.execOperation}>
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
              {global.translate('TITLE_CODE')} : {this.state.code}
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
                  value={this.state.name}
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_NAME')}
                  returnKeyType="go"
                  onChangeText={name => {
                    this.setState({name: name});
                  }}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_ADDRESS')}
                </Text>
                <TextInput
                  value={this.state.address}
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_ADDRESS')}
                  returnKeyType="go"
                  onChangeText={address => {
                    this.setState({address: address});
                  }}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_CITY')}
                </Text>
                <TextInput
                  value={this.state.city}
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_CITY')}
                  returnKeyType="go"
                  onChangeText={city => {
                    this.setState({city: city});
                  }}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_STATE')}
                </Text>
                <TextInput
                  value={this.state.state}
                  style={styles.input}
                  placeholder={global.translate('PLACEHOLDER_TYPE_STATE')}
                  returnKeyType="go"
                  onChangeText={state => {
                    this.setState({state: state});
                  }}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text style={styles.label}>
                  {global.translate('TITLE_PHONE')}
                </Text>
                <TextInput
                  value={this.state.phone}
                  style={styles.input}
                  keyboardType="phone-pad"
                  placeholder={global.translate('PLACEHOLDER_TYPE_PHONE')}
                  returnKeyType="go"
                  onChangeText={phone => {
                    this.setState({phone: phone});
                  }}
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
