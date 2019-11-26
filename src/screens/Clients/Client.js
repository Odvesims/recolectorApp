import React, {PureComponent} from 'react';
import {theme} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {dataOperation} from '../../helpers/apiconnection_helper';
import {updateClient} from '../../helpers/sql_helper';
import CustomPicker from '../../components/CustomPicker';
import usStates from '../../country_states/us.json';
import drStates from '../../country_states/dr.json';
import {Formik} from 'formik';
import * as yup from 'yup';

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
  Text,
} from 'native-base';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

export class Client extends PureComponent {
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
  // static navigationOptions = {
  //   header: null,
  // };

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
          state: state,
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

  handleSubmit = values => {
    // if (
    //   values.name.length > 0 &&
    //   values.address.length > 0 &&
    //   values.country.length > 0 &&
    //   values.state.length > 0 &&
    //   values.phone.length > 0
    // )
    // {
    //   Alert.alert(JSON.stringify(values));
    //   // this.props.navigation.navigate('App');
    // }
    const {state, country} = this.state;
    const {name, address, city, phone} = values;
    let client_data = {
      // code: code,
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
          state: state,
          country: country,
          phone: '',
        });
        alert(global.translate(result));
      });
    });
  };

  render() {
    console.log('STATE ==>', this.state);
    let states = {};
    const {
      address,
      city,
      code,
      country,
      loading,
      loadingMessage,
      name,
      phone,
      state,
    } = this.state;

    switch (global.states_collection) {
      case 'us':
        states = usStates;
        break;
      case 'dr':
        states = drStates;
        break;
    }

    let clientCode;
    console.log('clientCode', code);

    if (code) {
      clientCode = (
        <Header style={styles.headerCode}>
          <Body>
            <Text style={styles.headerCodeText}>
              {global.translate('TITLE_CODE')} : {code}
            </Text>
          </Body>
        </Header>
      );
    }

    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .label(global.translate('TITLE_NAME'))
        .max(40, 'Please enter no more than 40 characters')
        .required('Please enter a name'),
      address: yup
        .string()
        .label(global.translate('TITLE_ADDRESS'))
        .max(100, 'Please enter no more than 40 characters')
        .required('Please enter an address'),
      city: yup
        .string()
        .label(global.translate('TITLE_CITY'))
        .max(40, 'Please enter no more than 40 characters')
        .required('Please enter a city'),
      state: yup
        .string()
        .label(global.translate('TITLE_STATE'))
        .required("Please select the client's state"),
      phone: yup
        .string()
        .label(global.translate('TITLE_PHONE'))
        .required()
        .min(7, 'Password must have at least 7 characters'),
    });

    return (
      <Container>
        {/* Header */}
        <Header>
          <Spinner
            visible={loading}
            textContent={global.translate(loadingMessage)}
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
          {/* <Right>
            <Button transparent onPress={this.execOperation}>
              <Icon name="checkmark" />
              <Text style={{color: 'white', marginLeft: 8}}>
                {global.translate('TITLE_DONE')}
              </Text>
            </Button>
          </Right> */}
        </Header>
        {/* Header */}
        {clientCode}

        <Content style={styles.container}>
          <KeyboardAvoidingView>
            <Formik
              initialValues={{
                name,
                address,
                city,
                state,
                phone,
              }}
              onSubmit={values => {
                this.handleSubmit(values);
              }}
              validationSchema={validationSchema}>
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                handleBlur,
                isValid,
                touched,
                setFieldValue,

                isSubmitting,
              }) => (
                <Form style={{marginBottom: 24}}>
                  <InputForm
                    label={global.translate('TITLE_NAME')}
                    value={values.name}
                    style={styles.input}
                    placeholder={global.translate('PLACEHOLDER_TYPE_NAME')}
                    returnKeyType="go"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    errorMessage={touched.name && errors.name}

                    // onChangeText={name => {
                    //   this.setState({name: name});
                    // }}
                  />

                  <InputForm
                    label={global.translate('TITLE_ADDRESS')}
                    value={values.address}
                    style={styles.input}
                    placeholder={global.translate('PLACEHOLDER_TYPE_ADDRESS')}
                    returnKeyType="go"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    errorMessage={touched.address && errors.address}

                    // onChangeText={address => {
                    //   this.setState({address: address});
                    // }}
                  />

                  <InputForm
                    label={global.translate('TITLE_CITY')}
                    value={values.city}
                    style={styles.input}
                    placeholder={global.translate('PLACEHOLDER_TYPE_CITY')}
                    returnKeyType="go"
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    errorMessage={touched.city && errors.city}

                    // onChangeText={city => {
                    //   this.setState({city: city});
                    // }}
                  />

                  <View style={styles.paddingBottom}>
                    <CustomPicker
                      label={global.translate('TITLE_STATE')}
                      placeholder={state}
                      items={states}
                      onSelected={this.selectedItem}
                      errorMessage={touched.state && errors.state}
                      selectPlaceholderText={state}
                    />
                  </View>

                  <InputForm
                    label={global.translate('TITLE_PHONE')}
                    value={values.phone}
                    style={styles.input}
                    keyboardType="phone-pad"
                    placeholder={global.translate('PLACEHOLDER_TYPE_PHONE')}
                    returnKeyType="go"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    errorMessage={touched.phone && errors.phone}
                    // onChangeText={phone => {
                    //   this.setState({phone: phone});
                    // }}
                  />
                  <Button
                    block
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: isValid
                        ? theme.colors.primary
                        : theme.colors.gray3,
                      borderRadius: 4,
                      marginBottom: 24,
                    }}>
                    <Text>Guardar</Text>
                  </Button>
                </Form>
              )}
            </Formik>
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
    // borderColor: borderColor,
    borderRadius: 4,
    color: '#000',
  },

  error: {borderColor: theme.colors.accent},

  default: {
    borderColor: theme.colors.gray2,
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

export const InputForm = ({
  onPress,
  placeholder,
  onChangeText,
  returnKeyType,
  keyboardType,
  label,
  onBlur,
  value,
  errorMessage,
}) => {
  let isError = errorMessage;
  if (isError) {
    errorMessage = (
      <Text style={{color: 'red', fontSize: 12}}>{errorMessage}</Text>
    );
  }
  return (
    <View style={styles.paddingBottom}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        style={[styles.input, !isError ? styles.default : styles.error]}
        keyboardType={keyboardType}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        numberOfLines={1}
      />
      {errorMessage}
    </View>
  );
};
