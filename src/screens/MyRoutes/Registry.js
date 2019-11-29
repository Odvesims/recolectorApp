import React, {Component} from 'react';
import {theme} from '../../constants';
import {CustomTextInput} from '../../components';
import {dataOperation} from '../../helpers/apiconnection_helper';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getOrderDetails, updateOrderAssigned} from '../../helpers/sql_helper';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  CheckBox,
  Alert,
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

export default class Registry extends Component {
  state = {
    data: [],
    textInputs: [],
    checkItem: false,
  };

  componentDidMount() {
    const {params} = this.props.navigation.state;
    getOrderDetails(params.order_id).then(detail => {
      this.setState({
        data: detail,
      });
    });
  }

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

  renderItem = ({item, index}) => {
    console.log(item);
    return (
      <ItemsContainer>
        <ItemTitle numberOfLines={1}>{item.detail_description}</ItemTitle>
        <View
          style={{
            alignSelf: 'flex-end',
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
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
            <InputValues
              style={{marginLeft: 15}}
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
          </View>
        </View>
      </ItemsContainer>
    );
  };

  render() {
    console.log('REGISTRY STATE ==>', this.state);

    let {data, checkItem} = this.state;
    const {params} = this.props.navigation.state;
    console.log(checkItem);

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
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detalles</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.save}>
              <Icon name="checkmark" />
              <Text
                style={{
                  marginLeft: 8,
                  color: theme.colors.white,
                  fontSize: 16,
                }}>
                Guardar
              </Text>
            </Button>
          </Right>
        </Header>

        {/* Content */}
        <RContent>
          <View style={styles.RouteDetails}>
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
            <View style={{marginHorizontal: 12}}>
              <OrderMode>
                {/* <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1.5,
                }}> */}
                {/* <Text style={{flexGrow: 1, textAlign: 'center'}}></Text> */}
                {/* <Text style={{flexGrow: 1, textAlign: 'center'}}></Text> */}
                {/* </View> */}
                <View style={{flex: 1}}>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      width: '50%',

                      textAlign: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingHorizontal: 15,
                          // marginHorizontal: 25,
                        }}>
                        Picking
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          paddingHorizontal: 15,
                          marginLeft: 15,
                        }}>
                        Compras
                      </Text>
                    </View>
                  </View>
                </View>
              </OrderMode>

              <KeyboardAwareScrollView>
                {/* FlatList */}
                <FlatList
                  data={data}
                  extraData={this.state}
                  keyExtractor={item => item.id.toString()}
                  renderItem={this.renderItem} //item => this.renderItem(item)
                />
                <View
                  style={[
                    styles.checkbox,
                    !checkItem
                      ? styles.checkboxDisabled
                      : styles.checkboxSuccess,
                  ]}>
                  <CheckBox value={checkItem} onChange={this.checkboxHandler} />
                  <Text style={styles.bodyHeader}>Cerrar orden</Text>
                </View>
              </KeyboardAwareScrollView>
              {/* End flatList */}
            </View>
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

  checkbox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray3,
    paddingVertical: theme.sizes.p12,
  },

  checkboxDisabled: {
    backgroundColor: theme.colors.white,
  },

  checkboxSuccess: {
    backgroundColor: 'rgba(46, 148, 50, 0.2)',
  },
});

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
  flex: 1;
  text-align: left;
  ${'' /* width: 180px; */}
  overflow: hidden;
  font-size: 14px;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding-vertical: 12;
  align-items: center;
`;

const InputValues = styled(CustomTextInput)`
  flex-basis: 80px;
  flex-shrink: 42px;
  ${'' /* margin-left: 8px; */}
  padding: 12px;
  ${'' /* flex-grow: 1; */}
  background-color: #fff;
  border-color: #bdbdbd;
  border-width: 1px;
  border-radius: 4px;
`;

const HeaderItems = styled.View`
  flex-direction: row;
  flex-grow: 1;
  padding-vertical: 12px;
  background-color: ${theme.colors.gray3};
`;

const OrderMode = styled.View`
  margin-top: 8px;
  flex-direction: row;
  flex-grow: 1;
`;

const RContent = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${theme.colors.lightGray};
`;
