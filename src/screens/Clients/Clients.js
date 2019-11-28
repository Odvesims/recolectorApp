import React, {Component} from 'react';
import {theme} from '../../constants';
import {SearchBar, FetchingData} from '../../components';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {} from 'react-native-vector-icons';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';

import {
  Root,
  Icon,
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Item,
  // Input,
  Fab,
  Right,
  Title,
  ActionSheet,
} from 'native-base';

import {
  getUserConfig,
  saveClients,
  getStoredClients,
  editStoredClient,
} from '../../helpers/sql_helper';
import {getData} from '../../helpers/apiconnection_helper';

export default class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataAll: [],
      loading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_CLIENTS'),
      request_timeout: false,
      show: false,
      BUTTONS: [
        {
          text: global.translate('TITLE_EDIT'),
          icon: 'create',
          iconColor: theme.colors.primary,
        },
        {
          text: global.translate('TITLE_CANCEL'),
          icon: 'close',
          iconColor: theme.colors.gray,
        },
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

  refresh(value) {
    if (value) {
      this.refreshHandler();
    } else {
      this.enterHandler();
    }
  }

  enterHandler = () => {
    this.setState({
      loading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_CLIENTS'),
    });
    this.storedClients();
  };

  storedClients = () => {
    getStoredClients().then(clients => {
      if (clients.length > 0) {
        this.setState({data: clients, dataAll: clients, loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  };

  refreshHandler = () => {
    const {loading, request_timeout} = this.state;
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_CLIENTS'),
    });
    setTimeout(() => {
      if (loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 15000);
    getData('GET_CLIENTS').then(result => {
      if (!request_timeout) {
        this.setState({loading: false, request_timeout: false});
        if (result.valid) {
          saveClients(result.arrResponse, []).then(res => {
            this.storedClients();
          });
        } else {
          alert(global.translate(result.response));
        }
      } else {
        this.setState({request_timeout: false});
      }
    });
  };

  showHideSearchBar = () => {
    // this.setState({show: true});
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  goBack = () => {
    this.props.navigation.goback();
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  listEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>No hay items para mostrar</Text>
      </View>
    );
  };

  handlerFab = () => {
    this.props.navigation.navigate('Client', {
      operation: 'TITLE_NEW_CLIENT',
      loading_message: 'MESSAGE_REGISTERING_CLIENT',
      onGoBack: () => this.refresh(true),
      new_record: true,
      state: global.translate('PLACEHOLDER_TYPE_STATE'),
    });
  };

  searchBarHandler = (data, text) => {
    this.setState({
      data: data,
      query: text,
    });
  };

  renderItem = ({item}) => {
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    return (
      <Item style={styles.list}>
        <Text style={styles.code}>{item.client_code}</Text>
        <View style={{marginLeft: 8}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <Button
          transparent
          style={styles.more}
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: global.translate('TITLE_OPTIONS'),
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    this.props.navigation.navigate('Client', {
                      operation: 'TITLE_EDIT_CLIENT',
                      code: item.client_code,
                      name: item.name,
                      address: item.address,
                      city: item.city,
                      state: item.state,
                      country: item.country,
                      phone: item.phone_number,
                      loading_message: 'MESSAGE_UPDATING_CLIENT',
                      new_record: false,
                      onGoBack: () => this.refresh(false),
                    });
                    break;
                  case 1:
                    ActionSheet.hide();
                    break;
                }
              },
            )
          }>
          <Icon style={{color: 'gray'}} name="more" />
        </Button>
      </Item>
    );
  };

  render() {
    const {modalVisible, data, loading, show} = this.state;

    return (
      <Root>
        <Container style={styles.androidHeader}>
          {/* Header */}
          <Spinner
            visible={this.state.loading}
            textContent={this.state.loadingMessage}
            color={'CE2424'}
            overlayColor={'rgba(255, 255, 255, 0.4)'}
            animation={'slide'}
          />
          <Header>
            <Left>
              <Button transparent onPress={this.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{global.translate('TITLE_CLIENTS')}</Title>
            </Body>
            <Right>
              <FetchingData syncData={this.refreshHandler} fetching={loading} />
              <Button transparent>
                <Icon name="funnel" />
              </Button>
              <Button transparent onPress={this.showHideSearchBar}>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>

          {/* SearchBar */}
          {show ? (
            <SearchBar
              arrayData={this.state.arrayData}
              data={this.searchBarHandler}
              visible={this.searchHandler}
              dataValue={this.state.dataAll}
              style={styles.searchbar}
              placeholder={'Busque su orden'}
              onPressCancel={this.showHideSearchBar}
            />
          ) : null}
          {/* SearchBar */}

          <Toast
            ref="toast"
            style={{backgroundColor: '#CE2424'}}
            position="bottom"
            positionValue={0}
            fadeInDuration={750}
            fadeOutDuration={750}
            opacity={0.8}
            textStyle={{color: 'white'}}
          />

          {/* Content */}
          <Content style={styles.content}>
            <ScrollView>
              <FlatList
                style={{overflow: 'hidden'}}
                data={data}
                ListEmptyComponent={this.listEmpty}
                renderItem={this.renderItem}
              />
            </ScrollView>
          </Content>

          {/* Content */}
          <Fab
            style={{backgroundColor: theme.colors.primary, right: 10}}
            position="bottomRight"
            onPress={this.handlerFab}>
            <Icon name="add" />
          </Fab>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: 0,
      },
    }),
  },
  list: {
    margin: 5,
    backgroundColor: 'white',
    height: 80,
    paddingLeft: 12,
    elevation: 1,
  },
  content: {
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  code: {
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
  },

  more: {
    position: 'absolute',
    right: 0,
  },
});
