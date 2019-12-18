import React, {Component} from 'react';
import {theme} from '../../constants';
import styled from 'styled-components/native';
import {View, StyleSheet, FlatList, Alert, ScrollView} from 'react-native';
import {getData} from '../../helpers/apiconnection_helper';
import {BtnIcon} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  updateOrderAssigned,
  getRouteDetails,
  updateRouteOrders,
} from '../../helpers/sql_helper';
import {
  Container,
  Left,
  Title,
  Body,
  Header,
  Text,
  Root,
  Item,
} from 'native-base';

export default class RouteDetail extends Component {
  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state;

    this.state = {
      data: [],
      modalVisible: false,
      loading: false,
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
  }

  componentDidMount() {
    this.getDataHandler();
  }

  getDataHandler = async () => {
    const {
      params: {route_id, status},
    } = this.props.navigation.state;

    try {
      this.setState({loading: true, loadingMessage: 'ALERT_GETTING_ROUTE'});
      const data = await getData(
        'GET_ROUTE',
        `&route_id=${route_id}&status=${status}`,
      );
      await updateRouteOrders(data.arrResponse[0]);
      let routeDetails = await getRouteDetails(route_id);
      const pending = routeDetails.filter(detail => detail.status !== 'C');

      this.setState({
        data: routeDetails,
        loading: false,
      });
    } catch (error) {
      this.setState({loading: false});
      alert(global.translate('ALERT_REQUEST_TIMEOUT'));
    }
  };

  flatOnPress = item => {
    this.props.navigation.navigate('Registry', {
      client: item.client,
      name: item.name,
      address: item.address,
      order_id: item.order_id,
      route_id: item.route_id,
    });
  };

  renderItem = ({item}) => {
    return (
      <Item
        style={styles.list}
        onPress={() => {
          this.flatOnPress(item);
        }}>
        <View style={styles.listContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {item.client} - {item.name}
          </Text>
          <Text numberOfLines={1}>{item.address}</Text>
        </View>
      </Item>
    );
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {data, loadingMessage, loading} = this.state;
    const {state, navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    return (
      <Root>
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
              <BtnIcon iconName={'arrow-back'} onPress={this.goBack} />
            </Left>
            <Body>
              <Title>{`${params.routeName}`}</Title>
            </Body>
          </Header>

          {/* Content */}
          <RContent>
            <View style={styles.RouteDetails}>
              <Head>
                <Key>Ruta:</Key>
                <Label> {`${params.routeName}`}</Label>
              </Head>
              <Head>
                <Key>{global.translate('TITLE_DATE')}:</Key>
                <Label> {this.state.date_to}</Label>
              </Head>
            </View>

            <View style={{flex: 1}}>
              <View style={styles.addPoint}>
                <View style={{paddingBottom: 8}}>
                  <Text style={styles.detailText}>Ordenes</Text>
                </View>
                <FlatList
                  data={data}
                  keyExtractor={item => item.id.toString()}
                  renderItem={this.renderItem}
                />
              </View>
            </View>
          </RContent>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  RouteDetails: {backgroundColor: 'white', padding: 16},

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 22,
    marginBottom: 12,
    marginHorizontal: 5,
    elevation: 1,
    backgroundColor: 'white',
  },

  listContainer: {
    flex: 1,
    flexWrap: 'nowrap',
    flexDirection: 'column',
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
});

const Key = styled.Text`
  flex-basis: 70px;
  overflow: hidden;
  flex-grow: 0;
  color: ${theme.colors.black};
  font-weight: bold;
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

const RContent = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${theme.colors.lightGray};
`;
