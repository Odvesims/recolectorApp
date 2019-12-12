import React, {useState, useEffect, useCallback} from 'react';

import {theme} from '../../constants';
import {BtnIcon} from '../../components';

import {dataOperation, getData} from '../../helpers/apiconnection_helper';
import {getOrderDetails, getOrders} from '../../helpers/sql_helper';

// import {getData} from '../../helpers/apiconnection_helper';

import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components/native';
import {ButtonGroup} from 'react-native-elements';

import {RegistryTab} from './Tabs';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Header, Right, Left, Body, Container, Title} from 'native-base';

const RegistryContext = React.createContext({});
export const Provider = RegistryContext.Provider;
export const Consumer = RegistryContext.Consumer;

function Registry(props) {
  const [data, setData] = useState({data: [], picking: [], shopping: []});
  const [checkItem, setCheckItem] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState();

  useEffect(() => {
    let isSubscribed = true;
    try {
      const {order_id} = props.navigation.state.params;
      async function getOrderData() {
        let orderType = await getOrderDetails(order_id);
        const orderPicking = orderType.filter(
          res => res.pickup_or_purchase === 'R',
        );
        const orderShopping = orderType.filter(
          res => res.pickup_or_purchase === 'C',
        );
        if (isSubscribed) {
          setData({
            data: orderType,
            picking: orderPicking,
            shopping: orderShopping,
          });
        }
      }
      getOrderData();
    } catch (error) {
      // console.error('getorderType', error);
    }
    return () => (isSubscribed = false);
  });

  const onChangePicking = index => {
    console.log('picking', index, data.picking);
    setData(data.picking[index]);
  };

  const onChangeShopping = useCallback(
    index => {
      setData(data.shopping[index]);
      console.log('shopping', data.shopping);
    },
    [data],
  );

  const saveConfirmation = () => {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {
          text: 'no',
          onPress: () => {
            '';
          },
          style: 'cancel',
        },
        {
          text: 'Guardar',
          onPress: () => save(),
        },
      ],
      {cancelable: false},
    );
  };

  const save = () => {
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
      route_id: props.navigation.state.params.route_id,
      employee_code: global.employee_code,
      close_order: checkItem,
    };
    setLoading(true);
    setLoadingMessage('ALERT_REGISTERING_COLLECT');

    dataOperation('COLLECT_OPERATION', collectData).then(res => {
      Alert.alert(JSON.stringify(res));

      if (res.valid) {
        Alert.alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
        setLoading(false);
        goBack();
      } else {
        setLoading(false);
      }
    });
  };

  const checkboxHandler = () => {
    setCheckItem(!checkItem);
  };

  const updateIndex = selectedIndex => {
    setSelectedIndex(selectedIndex);
  };

  const renderDetailTabs = item => {
    if (item === 0) {
      return (
        <Provider value={data.picking}>
          <RegistryTab
            onChangeHandler={onChangePicking}
            navigation={props.navigation}
            renderView={'Picking'}
          />
        </Provider>
      );
    } else {
      return (
        <Provider value={data.shopping}>
          <RegistryTab
            onChangeHandler={onChangeShopping}
            navigation={props.navigation}
            renderView={'Shopping'}
          />
        </Provider>
      );
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const detailTabs = [
    global.translate('PICKING'),
    global.translate('SHOPPING'),
  ]; //global.translate('TITLE_CATEGORY')];

  return (
    <Container>
      <Spinner
        visible={loading}
        textContent={global.translate(loadingMessage)}
        color={'CE2424'}
        overlayColor={'rgba(255, 255, 255, 0.4)'}
        animation={'slide'}
      />
      <Header>
        <Left>
          <BtnIcon iconName={'arrow-back'} onPress={goBack} />
        </Left>
        <Body>
          <Title>Detalles</Title>
        </Body>
        <Right>
          <BtnIcon
            iconName={'checkmark'}
            label={'Guardar'}
            onPress={saveConfirmation}
          />
        </Right>
      </Header>

      {/* Content */}
      <RContent>
        <View style={{backgroundColor: theme.colors.lightGray}}>
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={detailTabs}
            containerStyle={{height: 50}}
          />
        </View>

        <ScrollView>{renderDetailTabs(selectedIndex)}</ScrollView>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <OrderConfirmation
            style={[
              !checkItem ? styles.checkboxDisabled : styles.checkboxSuccess,
            ]}>
            <CheckBox value={checkItem} onChange={checkboxHandler} />
            <Text style={{marginLeft: 8}}>Cerrar orden</Text>
          </OrderConfirmation>
        </View>
      </RContent>
    </Container>
  );
}

export default Registry;

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
