import React, {Component} from 'react';
import {theme} from '../../constants';
import {AddButton, SearchBar, FetchingData} from '../../components';
import Toast, {DURATION} from 'react-native-easy-toast';
import nextFrame from 'next-frame';
import Spinner from 'react-native-loading-spinner-overlay';

import {} from 'react-native-vector-icons';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  NativeModules,
  StatusBar,
  FlatList,
  // TouchableOpacity,
  // Animated,
} from 'react-native';

// import ContentCustom from '../components';

import {
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

import {saveClients} from '../../helpers/sql_helper';
import {getStoredClients} from '../../helpers/sql_helper';

export default class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      deviceLanguage: 'en',
      loadingMessage: global.translate('MESSAGE_LOADING_CLIENTS'),
      show: false,
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
    this.enterHandler();
  }

  async getClients() {
    await nextFrame();
    let validNot = true;
    let responseError = 0;
    let getUrl =
      'https://' +
      global.hostName +
      ':' +
      global.portNumber +
      '/apimobile?apiOption=GET_CLIENTS&username=' +
      global.userName +
      '&password=' +
      global.userPassword;
    try {
      let response = await fetch(getUrl, {method: 'GET'});
      const responseJson = await response.json();
      if (JSON.stringify(responseJson) === '{}') {
        validNot = false;
        responseError = 999;
      } else {
        saveClients(responseJson.arr_clients, {});
        if (responseJson.response !== 'valid') {
          responseError = responseJson.error_message;
          validNot = false;
        }
      }
      this.setState({loadingMessage: ''});
      return [validNot, responseError];
    } catch (error) {
      this.setState({loading: false});
      return [false, 999];
    }
  }

  componentDidMount() {}

  enterHandler = () => {
    //this.getClients().then(result => {
      getStoredClients().then(clients => {
        alert(clients);
        this.setState({data: clients});
        this.setState({loading: false});
      });
    //});
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_CLIENTS'),
    });
    this.getClients().then(result => {
      this.setState({loading: false});
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

  render() {
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    const {loading} = this.state;

    let openDrawer = oDrawer => {
      this.props.navigation.openDrawer;
    };
    return (
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
                          title: 'Opciones',
                        },
                        buttonIndex => {
                          this.setState({clicked: BUTTONS[buttonIndex]});
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
          onPress={() => this.props.navigation.navigate('NewClient')}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
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
