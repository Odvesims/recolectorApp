import React, {Component} from 'react';
import {theme} from '../../constants';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import {SearchBar, FetchingData} from '../../components';
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
      isloading: false,
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
    // this.fetchData();
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    //   try {
    //     let item = this.props.navigation.state.params.selItem;
    //     if (item !== undefined) {
    //       this.arrData.push(item);
    //       this.setState({data: this.arrData});
    //     }
    //   } catch (err) {
    //     alert(err);
    //   }
    // });
  }

  componentWillUnmount() {
    // this.focusListener.remove();
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
      getStoredRoutes('I').then(expired => {
        this.setState({active: active, expired: expired, loading: false});
      });
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
            getData('GET_ROUTES', '&status=I').then(inactive => {
              if (!this.state.request_timeout) {
                clearRoutesCab('I').then(ci => {
                  if (inactive.arrResponse !== []) {
                    saveInactiveRoutes(inactive.arrResponse);
                  }
                  this.storedRoutes();
                });
              } else {
                this.setState({request_timeout: false});
              }
            });
          });
        });
      } else {
        this.setState({request_timeout: false});
      }
    });
  };

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
    const {navigate} = this.props.navigation;
    console.log(item);
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
            date_from: moment(new Date()).format('DD/MM/YYYY'),
            date_to: moment(new Date()).format('DD/MM/YYYY'),
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

    let content = (
      <ContentLoader>
        <Rect x="0" y="20" rx="5" ry="5" width="250" height="12" />
        <Rect x="0" y="40" rx="5" ry="5" width="180" height="12" />
      </ContentLoader>
    );

    if (!loading) {
      content = (
        <FlatList
          ListEmptyComponent={this.listEmpty}
          keyboardShouldPersistTaps={'handled'}
          // style={{overflow: 'hidden'}}
          data={active}
          extraData={this.state}
          keyExtractor={item => item.id} //.toString()
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
