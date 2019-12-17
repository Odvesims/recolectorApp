import React, {Component} from 'react';

import {theme} from '../../constants';
import {BtnIcon} from '../../components';

import {dataOperation, getData} from '../../helpers/apiconnection_helper';
import {getOrderDetails, getOrders} from '../../helpers/sql_helper';

import Spinner from 'react-native-loading-spinner-overlay';
<<<<<<< HEAD
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  CheckBox,
<<<<<<< HEAD
=======
  Alert,
  TouchableHighlight,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
} from 'react-native';
import {
  Header,
  Right,
  Left,
  Body,
  Button,
  Icon,
  Container,
  Title,
  Content,
} from 'native-base';
=======
import styled from 'styled-components/native';
import {ButtonGroup} from 'react-native-elements';

import {RegistryTab} from './Tabs';
import CheckBox from '@react-native-community/checkbox';
import {Text, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Header, Right, Left, Body, Container, Title} from 'native-base';

const RegistryContext = React.createContext({});
export const Provider = RegistryContext.Provider;
export const Consumer = RegistryContext.Consumer;
>>>>>>> Andris

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

    let orderType = await getOrderDetails(order_id);
    const picking = orderType.filter(res => res.pickup_or_purchase === 'R');
    const shopping = orderType.filter(res => res.pickup_or_purchase === 'C');

    this.setState({
      data: orderType,
      picking: picking,
      shopping: shopping,
    });
  };

  onChangePicking = index => {
    this.setState({
      ...this.state.picking[index],
    });
  };

  onChangeShopping = index => {
    this.setState({
      ...this.state.shopping[index],
    });
  };

  saveConfirmation = () => {
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
          onPress: () => this.save(),
        },
      ],
      {cancelable: false},
    );
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    /*if(this.state.checkItem){      
    Alert.alert(
      global.translate("TITLE_CONFIRM_CLOSE"),
      global.translate("TITLE_CONFIRM_CLOSE_QUESTION"),
      [
        {
          text: global.translate("TITLE_NO"), 
          onPress: () => {
            alert.cancel     
          }, 
          style: 'cancel'
        },
        {
          text: global.translate("TITLE_YES"),
          onPress: () => {
            this.storePickup;
          },
        },
      ],
      {cancelable: false},
    )
    } else{
      this.storePickup;
    }*/
    this.storePickup(collectData);
  };

  storePickup = collectData => {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
=======

>>>>>>> Andris
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

<<<<<<< HEAD
  renderItem = ({item, index}) => {
<<<<<<< HEAD
    console.log(item);
    return (
      <ItemsContainer>
        <ItemTitle numberOfLines={1}>{item.detail_description}</ItemTitle>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
          }}>
          <InputValues
            id={item.orderDetail_id}
            blurOnSubmit={false}
            value={item.collected_quantity}
            onChangeText={text => {
              item.collected_quantity = text;
              this.setState({
                ...item,
              });
            }}
            returnKeyType="next"
            keyboardType="number-pad"
          />
          {/* <InputValues
            id={item.orderDetail_id}
            blurOnSubmit={false}
            value={item.collected_quantity}
            onChangeText={text => {
              item.collected_quantity = text;
              this.setState({
                ...item,
              });
            }}
            returnKeyType="next"
            keyboardType="number-pad"
          /> */}
        </View>
=======
    return (
      <ItemsContainer>
        <ItemTitle numberOfLines={1}>{item.detail_description}</ItemTitle>
        <InputValues
          id={item.orderDetail_id}
          blurOnSubmit={false}
          value={item.collected_quantity}
          onChangeText={text => {
            item.collected_quantity = text;
            this.setState({
              ...item,
            });
          }}
          returnKeyType="next"
          keyboardType="number-pad"
        />
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      </ItemsContainer>
    );
=======
  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };

  renderDetailTabs = item => {
    const {picking, shopping} = this.state;
    if (item === 0) {
      return (
        <Provider value={picking}>
          <RegistryTab
            onChangeHandler={this.onChangePicking}
            navigation={this.props.navigation}
            renderView={'Picking'}
          />
        </Provider>
      );
    } else {
      return (
        <Provider value={shopping}>
          <RegistryTab
            onChangeHandler={this.onChangeShopping}
            navigation={this.props.navigation}
            renderView={'Shopping'}
          />
        </Provider>
      );
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
>>>>>>> Andris
  };

  render() {
    // console.log('REGISTRY picking ==>', this.state.picking);
    // console.log('REGISTRY state ==>', this.state);
    // console.log('REGISTRY shopping ==>', this.state.shopping);
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
              onPress={this.saveConfirmation}
            />
          </Right>
        </Header>

        {/* Content */}
        <RContent>
<<<<<<< HEAD
          <View style={styles.RouteDetails}>
<<<<<<< HEAD
            <Head>
              <Key>Numero:</Key>
              <Label>{params.client}</Label>
            </Head>
            <Head>
              <Key>Cliente:</Key>
              <Label>{params.name}</Label>
            </Head>
            <Head>
              <Key>Dirección:</Key>
              <Label>{params.address}</Label>
            </Head>
          </View>
          <View>
            <HeaderItems>
              <Text style={styles.bodyHeader}>Articulos</Text>
              <Text style={styles.bodyHeader}>Recogidos</Text>
            </HeaderItems>
            <OrderMode>
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1.5,
                }}>
                <Text style={{flexGrow: 1, textAlign: 'center'}}></Text>
                <Text style={{flexGrow: 1, textAlign: 'center'}}></Text>
              </View>
              <View style={{flexDirection: 'row', flexGrow: 1}}>
                <Text style={{flexGrow: 1, textAlign: 'center'}}>Picking</Text>
                <Text style={{flexGrow: 1, textAlign: 'center'}}>Compras</Text>
              </View>
            </OrderMode>
          </View>
=======
            <Text style={styles.currentDateText}>
              {`Numero : ${params.client}`}
            </Text>
            <Text style={styles.currentDateText}>
              {`Dirección : ${params.name}`}
            </Text>
            <Text style={styles.currentDateText}>
              {`Address : ${params.address}`}
            </Text>
          </View>
          <HeaderItems>
            <Text style={styles.bodyHeader}>Articulos</Text>
            <Text style={styles.bodyHeader}>Recodigos</Text>
          </HeaderItems>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          <KeyboardAwareScrollView>
            {/* FlatList */}
            <FlatList
              data={data}
              extraData={this.state}
              keyExtractor={item => item.id.toString()}
              renderItem={this.renderItem} //item => this.renderItem(item)
=======
          <View style={{backgroundColor: theme.colors.lightGray}}>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={detailTabs}
              containerStyle={{height: 50}}
>>>>>>> Andris
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
<<<<<<< HEAD
=======
  currentDateText: {color: theme.colors.gray},
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0

  container: {
    // flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

<<<<<<< HEAD
=======
  client_data: {
    fontSize: 14,
  },

>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
    flexGrow: 1,
    textAlign: 'center',
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  },

  checkboxDisabled: {
    backgroundColor: theme.colors.lightGray,
  },

  checkboxSuccess: {
    backgroundColor: 'rgba(46, 148, 50, 0.2)',
  },
});

<<<<<<< HEAD
<<<<<<< HEAD
const Key = styled.Text`
  flex-basis: 70px;
  overflow: hidden;
  flex-grow: 0;
  color: ${theme.colors.gray2};
`;
const Label = styled.Text`
  flex: 1 1 0px;
  text-align: left;
  margin-left: 8;
  color: ${theme.colors.gray};
`;
const Head = styled.View`
  flex-direction: row;
`;

const ItemTitle = styled.Text`
  flex-grow: 1;
  text-align: left;
  ${'' /* width: 180px; */}
=======
const CustomButton = styled(Button)`
  background: ${props => (props.bordered ? 'transparent' : ' #4285f4')};
  border-color: ${props =>
    props.bordered ? theme.colors.gray : ' transparent'};
  border: ${props => (props.bordered ? '3px solid gray' : '#4285f4')};
  text-transform: uppercase;
  flex-basis: 48%;
  justify-content: center;
`;

const ItemTitle = styled.Text`
  text-align: left;
  width: 180px;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  overflow: hidden;
  font-size: 14px;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
<<<<<<< HEAD
  flex: 1;
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  padding-vertical: 12;
  margin-left: 24;
  align-items: center;
`;

const InputValues = styled(CustomTextInput)`
<<<<<<< HEAD
  flex-basis: 80px;
  margin-left: 8px;
  padding: 12px;
  ${'' /* flex-grow: 1; */}
=======
  flex-basis: 100px;
  margin-left: 20px;
  padding: 12px;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  background-color: #fff;
  border-color: #bdbdbd;
  border-width: 1px;
  border-radius: 4px;
=======
const RContent = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${theme.colors.white};
>>>>>>> Andris
`;

const OrderConfirmation = styled.View`
  flex-direction: row;
<<<<<<< HEAD
<<<<<<< HEAD
  flex-grow: 1;
=======
  justify-content: space-around;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  padding-vertical: 12px;
  background-color: ${theme.colors.gray3};
`;

<<<<<<< HEAD
const OrderMode = styled.View`
  margin-top: 8px;
  flex-direction: row;
  flex-grow: 1;
`;

=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
const RContent = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${theme.colors.lightGray};
=======
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray3};
  padding-vertical: ${theme.sizes.p12};
>>>>>>> Andris
`;
