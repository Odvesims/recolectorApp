import React, {Component} from 'react';
import {theme} from '../../constants';
<<<<<<< HEAD
<<<<<<< HEAD
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {SearchBar, FetchingData, ContentLoader} from '../../components';
=======
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {SearchBar, FetchingData} from '../../components';
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
import {View, StyleSheet, FlatList} from 'react-native';
=======

import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

import {
  SearchBar,
  FetchingData,
  ContentLoader,
  EmptyList,
} from '../../components';
import {Name, ListBody, ListMyRoutes, Address, styles} from './styles';

import {FlatList} from 'react-native';
>>>>>>> Andris
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
  Button,
  Icon,
  Text,
  Form,
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
<<<<<<< HEAD
      loading: false,
=======
      isloading: false,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
    });
    this.storedRoutes();
  };

<<<<<<< HEAD
  storedRoutes = () => {
    getStoredRoutes('A').then(active => {
      this.setState({active: active, loading: false});
<<<<<<< HEAD
      console.log('Active', active);
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    });
=======
  storedRoutes = async () => {
    const routes = await getStoredRoutes('A');
    this.setState({active: routes, loading: false});
>>>>>>> Andris
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
      active: [],
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
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

<<<<<<< HEAD
  renderItem = ({item}) => {
    console.log('item', item);
=======
  // fetchData = () => {
  //   this.setState({loading: true});
  //   const url = 'https://jsonplaceholder.typicode.com/users';
  //   this.setState({loading: true});
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({
  //         loading: false,
  //         data: res,
  //         dataAll: res,
  //       });
  //     })
  //     .catch(error => {
  //       this.setState({error, loading: false});
  //     });
  // };

  renderItem = ({item}) => {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
            date_from: item.date_from,
            date_to: item.date_to,
=======
            date_from: moment(new Date()).format('DD/MM/YYYY'),
            date_to: moment(new Date()).format('DD/MM/YYYY'),
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          })
        }>
        <ListMyRoutes>
          <Name numberOfLines={1}>{item.description}</Name>
          <Address numberOfLines={1}>Hasta: {item.date_to}</Address>
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

<<<<<<< HEAD
    let content = <ContentLoader />;
=======
    let content = (
      <ContentLoader>
        <Rect x="0" y="20" rx="5" ry="5" width="250" height="12" />
        <Rect x="0" y="40" rx="5" ry="5" width="180" height="12" />
      </ContentLoader>
    );
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0

    if (!loading) {
      content = (
        <FlatList
          ListEmptyComponent={this.listEmpty}
          keyboardShouldPersistTaps={'handled'}
<<<<<<< HEAD
          data={active}
          extraData={this.state}
<<<<<<< HEAD
          keyExtractor={item => item.id} //
=======
          // style={{overflow: 'hidden'}}
          data={active}
          extraData={this.state}
          keyExtractor={item => item.id} //.toString()
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
=======
          keyExtractor={item => item.route_id.toString()} //
>>>>>>> Andris
          renderItem={this.renderItem}
        />
      );
    }

    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{global.translate('TITLE_MYROUTES')}</Title>
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
          {/* SearchBar */}

          <Content style={styles.content}>{content}</Content>
        </Container>
      </Root>
    );
  }
}

export default Order;
