import React, {Component} from 'react';
import {theme} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {dataOperation} from '../../helpers/apiconnection_helper';
import {updateClient} from '../../helpers/sql_helper';
import CustomPicker from '../../components/CustomPicker';
import usStates from '../../country_states/us.json';
import drStates from '../../country_states/dr.json';

// import ContentCustom from '../components';

import {
  Icon,
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
  Form,
} from 'native-base';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';

export class Client extends Component {
  constructor(props) {
    super(props);
    const {
      params: {
        loading_message,
        new_record,
        address,
        country,
        phone,
        state,
        name,
        code,
        city,
      },
    } = this.props.navigation.state;

    this.state = {
      loading: false,
      loadingMessage: loading_message,
      new_record: new_record,
      code: code,
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      phone: phone,
    };
    const {} = this.state;
    this.selectedItem = this.selectedItem.bind(this);
  }

  static navigationOptions = {
    header: null,
  };

  selectedItem(item) {
    this.setState({
      state: item.Name,
    });
  }

  execOperation = () => {
    const {code, name, address, city, state, phone, country} = this.state;
    let client_data = {
      code: code,
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      phone: phone,
      phone_old: phone,
      country_id: global.country_id,
      setma_id: global.setma_id,
    };
    this.setState({loading: true});
    dataOperation('CLIENT_OPERATION', client_data).then(res => {
      updateClient(res.responseObject).then(result => {
        this.setState({
          loading: false,
          code: '',
          name: '',
          address: '',
          city: '',
          state: '',
          country: country,
          phone: '',
        });
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
    let states = {};
    const {phone, address, city, state, code, name} = this.state;
    switch (global.states_collection) {
      case 'us':
        states = usStates;
        break;
      case 'dr':
        states = drStates;
        break;
    }
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
              {global.translate('TITLE_CODE')} : {code}
            </Text>
          </Body>
        </Header>

        <Content style={styles.container}>
          <KeyboardAvoidingView>
            <Form style={{marginBottom: 24}}>
              <TextInputForm
                label={global.translate('TITLE_NAME')}
                value={name}
                style={styles.input}
                placeholder={global.translate('PLACEHOLDER_TYPE_NAME')}
                returnKeyType="go"
                onChangeText={name => {
                  this.setState({name: name});
                }}
              />

              <TextInputForm
                label={global.translate('TITLE_ADDRESS')}
                value={address}
                style={styles.input}
                placeholder={global.translate('PLACEHOLDER_TYPE_ADDRESS')}
                returnKeyType="go"
                onChangeText={address => {
                  this.setState({address: address});
                }}
              />

              <TextInputForm
                label={global.translate('TITLE_CITY')}
                value={city}
                style={styles.input}
                placeholder={global.translate('PLACEHOLDER_TYPE_CITY')}
                returnKeyType="go"
                onChangeText={city => {
                  this.setState({city: city});
                }}
              />

              <View style={styles.paddingBottom}>
                <CustomPicker
                  label={global.translate('TITLE_STATE')}
                  placeholder={state}
                  items={states}
                  onSelected={this.selectedItem}
                />
              </View>

              <TextInputForm
                label={global.translate('TITLE_PHONE')}
                value={phone}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={global.translate('PLACEHOLDER_TYPE_PHONE')}
                returnKeyType="go"
                onChangeText={phone => {
                  this.setState({phone: phone});
                }}
              />
            </Form>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}
export default Client;

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
    fontSize: theme.sizes.font,
    color: theme.colors.darkGray,
  },

  labelForgot: {
    color: theme.colors.primary,
    fontSize: theme.fonts.caption.fontSize,
    alignSelf: 'flex-end',
  },
  paddingBottom: {
    paddingBottom: theme.sizes.base,
  },
});

export const TextInputForm = ({
  onPress,
  placeholder,
  onChangeText,
  returnKeyType,
  keyboardType,
  label,
  onBlur,
  value,
}) => {
  return (
    <View style={styles.paddingBottom}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        keyboardType={keyboardType}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </View>
  );
};
