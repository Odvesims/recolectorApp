import React, {Component} from 'react';
import {theme} from '../../constants';
import {AddButton, SearchBar, FetchingData} from '../../components';
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
import {
  checkConnectivity,
  getClients,
  editClient,
} from '../../helpers/apiconnection_helper';

export default class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      deviceLanguage: 'en',
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
    this.enterHandler();
  }

  componentDidMount() {}

  enterHandler = () => {
    this.storedClients();
  };

  storedClients = () => {
    getStoredClients().then(clients => {
      if (clients.length > 0) {
        this.setState({data: clients, loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_CLIENTS'),
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 15000);
    getClients().then(result => {
      if (!this.state.request_timeout) {
        this.setState({loading: false, request_timeout: false});
        if (result.valid) {
          saveClients(result.arrClients, []).then(res => {
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

  render() {
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    const {loading} = this.state;

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

          {/* SearchBar */}

          {this.state.show ? <SearchBar /> : null}

          {/* SearchBar */}

          {/* Content */}
          <ScrollView>
            <Content style={styles.content}>
              <FlatList
                style={{overflow: 'hidden'}}
                data={data}
                renderItem={({item}) => (
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
                )}
              />
            </Content>

            {/* Content */}
          </ScrollView>
          <AddButton
            style={{position: 'absolute'}}
            onPress={() =>
              this.props.navigation.navigate('Client', {
                operation: 'TITLE_NEW_CLIENT',
              })
            }
          />
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

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    elevation: 8,
  },

  more: {
    position: 'absolute',
    right: 0,
  },
});
