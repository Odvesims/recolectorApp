import React, {Component} from 'react';
import {theme} from '../../constants';
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
import {
  saveActiveRoutes,
  saveInactiveRoutes,
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
  ActionSheet,
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
    // this.setState({show: true});
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

  storedRoutes = () => {
    getStoredRoutes('A').then(active => {
      this.setState({active: active, loading: false});
<<<<<<< HEAD
      console.log('Active', active);
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    });
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <View key={item.key} style={styles.listContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.name}>
                {item.description}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.address}>
              Hasta: {item.date_to}
            </Text>
          </View>
        </View>
      </Item>
    );
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  listEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Text>No hay resultados</Text>
      </View>
    );
  };

  // searchBarHandler = (data, text) => {
  //   this.setState({
  //     data: data,
  //     query: text,
  //   });
  // };

  render() {
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
          keyExtractor={item => item.id} //
=======
          // style={{overflow: 'hidden'}}
          data={active}
          extraData={this.state}
          keyExtractor={item => item.id} //.toString()
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
              style={styles.searchbar}
              placeholder={'Busque su orden'}
              onPressCancel={() => {
                this.showHideSearchBar();
              }}
            />
          ) : null} */}
          {/* SearchBar */}

          <Content
            style={{
              flexDirection: 'column',
              flex: 1,
              backgroundColor: theme.colors.lightGray,
              padding: 12,
            }}>
            {content}
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // height: 500,
  },

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

export default Order;
