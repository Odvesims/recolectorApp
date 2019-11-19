import React, {Component} from 'react';
import {theme} from '../../constants';
import styled from 'styled-components/native';
import {View, StyleSheet, FlatList, Modal, Alert, Animated} from 'react-native';
import {getData} from '../../helpers/apiconnection_helper';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  updateOrderAssigned,
  getRouteDetails,
  updateRouteOrders,
} from '../../helpers/sql_helper';
import {
  Container,
  Left,
  Right,
  Title,
  Body,
  Header,
  Button,
  Icon,
  Text,
  Form,
  Root,
  Item,
  ActionSheet,
  Content,
} from 'native-base';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

export default class RouteDetail extends Component {
  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;

    this.state = {
      data: [],
      modalVisible: false,
      show: false,
      date_to: params.date_to,
      placeholder: global.translate('PLACEHOLDER_SELECT_CLIENT'),
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
    this.arrData = [];
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    this.setState({loading: true, loadingMessage: 'ALERT_GETTING_ROUTE'});
    getData(
      'GET_ROUTE',
      `&route_id=${params.route_id}&status=${params.status}`,
    ).then(route => {
      updateRouteOrders(route.arrResponse[0]).then(r => {
        getRouteDetails(params.route_id).then(dets => {
          this.setState({
            data: dets,
          });
          this.setState({loading: false});
        });
      });
    });
    // this.focusListener.remove();

    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    //   try {
    //     let orders = params.orders;
    //     if (orders !== undefined) {
    //       this.setState({data: orders, clear_data: orders});
    //       params.orders = undefined;
    //     }
    //   } catch (err) {}
    // });
  }

  componentWillUnmount() {
    // this.focusListener.remove();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderItem = ({item}) => (
    <Item
      style={styles.list}
      onPress={() =>
        this.props.navigation.navigate('Registry', {
          client: item.client,
          name: item.name,
          address: item.address,
          order_id: item.order_id,
          route_id: item.route_id,
        })
      }>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
        <View style={styles.listContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={styles.name}>
              {item.client} - {item.name}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.address}>
            {item.address}
          </Text>
        </View>
      </View>
    </Item>
  );

  render() {
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    const {state, navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    console.log(data);
    return (
      <Root>
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
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{`${params.routeName}`}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => navigate('')}>
                <Icon name="checkmark" />
              </Button>
            </Right>
          </Header>

          {/* Content */}
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              backgroundColor: theme.colors.lightGray,
            }}>
            <View style={styles.RouteDetails}>
              <View style={styles.currentDate}>
                <Text style={styles.currentDateText}>Ruta</Text>
                <Text
                  style={
                    ({marginLeft: 4, backgroundColor: 'blue'},
                    styles.currentDateText)
                  }>
                  {`: ${params.routeName}`}
                </Text>
              </View>
              <View style={styles.currentDate}>
                <Text style={styles.currentDateText}>
                  {global.translate('TITLE_DATE')}
                </Text>
                <Text style={({marginLeft: 4}, styles.currentDateText)}>
                  {`: ${this.state.date_to}`}
                </Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <View style={styles.addPoint}>
                <View style={{paddingBottom: 8}}>
                  <Text style={styles.detailText}>Ordenes</Text>
                </View>
                <ScrollView>
                  <View>
                    <FlatList
                      style={{overflow: 'hidden', marginBottom: 12}}
                      data={data}
                      keyExtractor={item => item.key}
                      renderItem={this.renderItem}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </Container>
      </Root>
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
    flexDirection: 'row',
  },

  currentDateText: {color: theme.colors.gray},

  container: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  client_data: {
    fontSize: 14,
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
});
