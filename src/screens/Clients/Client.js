import React, {PureComponent} from 'react';
import {theme} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {dataOperation} from '../../helpers/apiconnection_helper';
import {updateClient} from '../../helpers/sql_helper';
import {CustomPicker, BtnIcon, InputForm} from '../../components';
import {usStates, drStates} from '../../utils';

import {styles} from './styles';

import {backDialog} from '../../utils';

import {Formik} from 'formik';
import * as yup from 'yup';

import {
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

import {StyleSheet, KeyboardAvoidingView, Alert} from 'react-native';

export class Client extends PureComponent {
  constructor(props) {
    super(props);
    const {
      params: {
        loading_message,
        isNewRecord,
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
      new_record: isNewRecord,
      code: code,
      name: name,
      address: address,
      city: city,
      state: state,
      country: country,
      phone: phone,
    };
  }

  selectedItem = item => {
    this.setState({
      state: item.Name,
    });
  };

  goBack = () => {
    const {goBack} = this.props.navigation;
    const {isNewRecord} = this.props.navigation.state.params;

    if (isNewRecord === false || isNewRecord === undefined) {
      goBack();
    } else {
      backDialog(goBack);
    }
  };

  handleSubmit = values => {
    const {state, country} = this.state;
    const {name, address, city, phone} = values;
    let client_data = {
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
        Alert.alert(global.translate(result));
        this.props.navigation.goBack();
      });
    });
  };

  render() {
    let states = {};
    const {
      address,
      city,
      code,
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
            <BtnIcon iconName={'arrow-back'} onPress={this.goBack} />
          </Left>
          <Body>
            <Title>
              {global.translate(this.props.navigation.state.params.operation)}
            </Title>
          </Body>
          {/* <Right>
          <BtnIcon label={'TITLE_DONE} iconName={'checkmark'} onPress={this.execOperation} />
          </Right> */}
        </Header>
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
                    label={'TITLE_NAME'}
                    value={values.name}
                    placeholder={'PLACEHOLDER_TYPE_NAME'}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    errorMessage={touched.name && errors.name}
                  />
                  <InputForm
                    label={'TITLE_ADDRESS'}
                    value={values.address}
                    placeholder={'PLACEHOLDER_TYPE_ADDRESS'}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    errorMessage={touched.address && errors.address}
                  />
                  <InputForm
                    label={'TITLE_CITY'}
                    value={values.city}
                    placeholder={'PLACEHOLDER_TYPE_CITY'}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    errorMessage={touched.city && errors.city}
                  />
                  <CustomPicker
                    label={'TITLE_STATE'}
                    placeholder={state}
                    items={states}
                    onSelected={this.selectedItem}
                    errorMessage={touched.state && errors.state}
                    selectPlaceholderText={state}
                  />
                  <InputForm
                    label={'TITLE_PHONE'}
                    value={values.phone}
                    keyboardType="phone-pad"
                    placeholder={'PLACEHOLDER_TYPE_PHONE'}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    errorMessage={touched.phone && errors.phone}
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
