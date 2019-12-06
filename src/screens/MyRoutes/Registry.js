import React, {Component} from 'react';

import {theme} from '../../constants';
import {BtnIcon} from '../../components';

import {dataOperation} from '../../helpers/apiconnection_helper';
import {getOrderDetails, getOrders} from '../../helpers/sql_helper';

// import {getData} from '../../helpers/apiconnection_helper';

import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components/native';
import {ButtonGroup} from 'react-native-elements';

import {RegistryTab, Shopping, Picking} from './Tabs';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  CheckBox,
  Alert,
} from 'react-native';
import {Header, Right, Left, Body, Container, Title} from 'native-base';

const RegistryContext = React.createContext({});
export const Provider = RegistryContext.Provider;
export const Consumer = RegistryContext.Consumer;

export default class Registry extends Component {
  state = {
    data: [],
    textInputs: [],
    checkItem: false,
    selectedIndex: 0,
  };

  componentDidMount() {
    this.getOrderType();
  }

  getOrderType = async () => {
    const {order_id} = this.props.navigation.state.params;
    const orderType = await getOrderDetails(order_id);

    const picking = orderType.filter(res => res.pickup_or_purchase === 'R');
    const shopping = orderType.filter(res => res.pickup_or_purchase === 'C');

    this.setState({
      data: orderType,
      picking: picking,
      shopping: shopping,
    });
  };

  save = () => {
    let {data, checkItem} = this.state;
    let dataArr = [];

    data.map(item => {
      let info = {
        collected_quantity: item.collected_quantity,
        orderDetail_id: item.orderDetail_id,
      };
      dataArr.push(info);
    });

    let collectData = {
      collect_data: dataArr,
      order_id: data[0].order_id,
      route_id: this.props.navigation.state.params.route_id,
      employee_code: global.employee_code,
      close_order: checkItem,
    };

    this.setState({loading: true, loadingMessage: 'ALERT_REGISTERING_COLLECT'});
    dataOperation('COLLECT_OPERATION', collectData).then(res => {
      Alert.alert(JSON.stringify(res));
      if (res.valid) {
        Alert.alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
        this.setState({
          loading: false,
        });
        this.props.navigation.goBack();
      } else {
        this.setState({loading: false});
      }
    });
  };

  checkboxHandler = () => {
    this.setState({
      checkItem: !this.state.checkItem,
    });
  };

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };

  renderDetailTabs = item => {
    const {picking, shopping, editable} = this.state;
    if (item === 0) {
      return (
        <Provider value={picking}>
          <Picking
            // tab_data={picking}
            navigation={this.props.navigation}
            editable={editable}
            renderView={'Picking'}
          />
        </Provider>
      );
    } else {
      return (
        <Provider value={shopping}>
          <Shopping
            // tab_data={shopping}
            navigation={this.props.navigation}
            editable={editable}
            renderView={'Shopping'}
          />
        </Provider>
      );
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    console.log('REGISTRY STATE ==>', this.state);
    // console.log('REGISTRY props ==>', this.props.navigation.state.params);

    const detailTabs = [
      global.translate('PICKING'),
      global.translate('SHOPPING'),
    ]; //global.translate('TITLE_CATEGORY')];

    let {checkItem, selectedIndex} = this.state;

    return (
      <Container>
        <Spinner
          visible={this.state.loading}
          textContent={global.translate(this.state.loadingMessage)}
          color={'CE2424'}
          overlayColor={'rgba(255, 255, 255, 0.4)'}
          animation={'slide'}
        />
        <Header>
          <Left>
            <BtnIcon iconName={'arrow-back'} onPress={this.goBack} />
          </Left>
          <Body>
            <Title>Detalles</Title>
          </Body>
          <Right>
            <BtnIcon
              iconName={'checkmark'}
              label={'Guardar'}
              onPress={this.save}
            />
          </Right>
        </Header>

        {/* Content */}
        <RContent>
          <View style={{backgroundColor: theme.colors.lightGray}}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={detailTabs}
              containerStyle={{height: 50}}
            />
          </View>

          <ScrollView>{this.renderDetailTabs(selectedIndex)}</ScrollView>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <OrderConfirmation
              style={[
                !checkItem ? styles.checkboxDisabled : styles.checkboxSuccess,
              ]}>
              <CheckBox value={checkItem} onChange={this.checkboxHandler} />
              <Text style={{marginLeft: 8}}>Cerrar orden</Text>
            </OrderConfirmation>
          </View>
        </RContent>
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

  currentDate: {
    // display: 'flex',
    flexDirection: 'row',
  },

  container: {
    // flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  RouteDetails: {backgroundColor: 'white', padding: 16},

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
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

  addPoint: {
    padding: theme.sizes.padding,
    marginBottom: 24,
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

  quantity: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  bodyHeader: {
    textTransform: 'uppercase',
    flexGrow: 1,
    textAlign: 'center',
  },

  checkboxDisabled: {
    backgroundColor: theme.colors.lightGray,
  },

  checkboxSuccess: {
    backgroundColor: 'rgba(46, 148, 50, 0.2)',
  },
});

const RContent = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${theme.colors.white};
`;

const OrderConfirmation = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray3};
  padding-vertical: ${theme.sizes.p12};
`;
