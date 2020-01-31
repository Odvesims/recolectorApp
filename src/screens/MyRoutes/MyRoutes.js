import React, {Component} from 'react';
import {theme} from '../../constants';

import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

import {
  SearchBar,
  FetchingData,
  ContentLoader,
  EmptyList,
  BtnIcon,
} from '../../components';
import {Name, ListMyRoutes, Address, styles} from './styles';

import {FlatList} from 'react-native';
import {
  saveActiveRoutes,
  getStoredRoutes,
  clearRoutesCab,
  clearRoutesDetails,
} from '../../helpers/sql_helper';
import {getData} from '../../helpers/apiconnection_helper';
import {
  Container,
  Left,
  Right,
  Title,
  Body,
  Header,
  Root,
  Item,
  Content,
} from 'native-base';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataAll: [],
      value: '',
      loading: false,
      error: null,
      status: '',
      modalVisible: false,
      show: false,
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
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      try {
        this.enterHandler();
      } catch (err) {
        this.enterHandler();
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  showHideSearchBar = () => {
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  enterHandler = () => {
    this.setState({
      loading: true,
      loadingMessage: global.translate('message.loading.routes'),
    });
    this.storedRoutes();
  };

  storedRoutes = async () => {
    const routes = await getStoredRoutes('A');
    this.setState({active: routes, loading: false});
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('message.loading.routes'),
      active: [],
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('error.request_timeout'));
      }
    }, 20000);
    getData('GET_ROUTES', '&status=A').then(active => {
      if (!this.state.request_timeout) {
        clearRoutesCab('A').then(ca => {
          clearRoutesDetails().then(cd => {
            if (active.arrResponse !== []) {
              saveActiveRoutes(active.arrResponse);
            }
            this.storedRoutes();
          });
        });
      } else {
        this.setState({request_timeout: false});
      }
    });
  };

  renderItem = ({item}) => {
    console.log('item', item);
    const {navigate} = this.props.navigation;
    return (
      <Item
        style={[styles.list, item.selectedClass]}
        onPress={() =>
          navigate('RouteDetail', {
            routeName: item.description,
            expire: item.data_to,
            status: item.status,
            onGoBack: () => this.refresh(true),
            route_id: item.route_id,
            document_id: '',
            phone_number: '',
            date_from: item.date_from,
            date_to: item.date_to,
          })
        }>
        <ListMyRoutes>
          <Name numberOfLines={1}>{item.description}</Name>
          <Address numberOfLines={1}>
            {global.translate('form.label.date_limit')}: {item.date_to}
          </Address>
        </ListMyRoutes>
      </Item>
    );
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  listEmpty = () => <EmptyList />;

  // searchBarHandler = (data, text) => {
  //   this.setState({
  //     data: data,
  //     query: text,
  //   });
  // };

  render() {
    console.log(this.state);
    const {modalVisible, active, loading, show} = this.state;

    let content = <ContentLoader />;

    if (!loading) {
      content = (
        <FlatList
          ListEmptyComponent={this.listEmpty}
          keyboardShouldPersistTaps={'handled'}
          data={active}
          extraData={this.state}
          keyExtractor={item => item.route_id.toString()} //
          renderItem={this.renderItem}
        />
      );
    }

    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <BtnIcon iconName={'menu'} onPress={this.openDrawer} />
            </Left>
            <Body>
              <Title>{global.translate('label.my_routes')}</Title>
            </Body>
            <Right>
              <FetchingData syncData={this.refreshHandler} fetching={loading} />
              {/* <Button transparent onPress={this.showHideSearchBar}>
                <Icon name="search" />
              </Button> */}
            </Right>
          </Header>

          {/* SearchBar */}
          {/* {show ? (
            <SearchBar
              arrayData={this.state.arrayData}
              data={this.searchBarHandler}
              visible={this.searchHandler}
              dataValue={this.state.dataAll}
              style={styles.searchbar}b
              placeholder={'Busque su orden'}
              onPressCancel={() => {
                this.showHideSearchBar();
              }}
            />
          ) : null} */}

          <Content style={styles.content}>{content}</Content>
        </Container>
      </Root>
    );
  }
}

export default Order;
