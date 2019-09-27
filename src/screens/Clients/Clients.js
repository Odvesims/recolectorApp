import React, {Component} from 'react';
import {theme} from '../../constants';
import {AddButton, SearchBar, FetchingData} from '../../components';
import Toast, {DURATION} from 'react-native-easy-toast';

import {} from 'react-native-vector-icons';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
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

import {getTranslation} from '../../helpers/translation_helper';

export default class Clients extends Component {
  state = {
    data: [],
    loading: false,
    BUTTONS: [
      {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
      {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
      {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
    ],
    DESTRUCTIVE_INDEX: 3,
    CANCEL_INDEX: 4,
  };

  async getClients() {
    this.setState({loading: true});
    this.setState({
      loadingMessage: getTranslation(this.state.deviceLanguage, 3),
    });
    let validNot = true;
    let responseError = 0;
    let getUrl =
      'https://apimobile.sojaca.net:444/apimobile?apiOption=GET_CLIENTS&username=';
    try {
      let response = await fetch(getUrl, {method: 'GET'});
      const responseJson = await response.json();
      if (JSON.stringify(responseJson) === '{}') {
        validNot = false;
        responseError = 999;
      } else {
        this.setState({data: responseJson.arr_clients});
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

  componentDidMount() {
    this.state = {
      show: false,
    };

    this.refreshHandler();
  }

  refreshHandler = () => {
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

    return (
      <Container>
        {/* Header */}

        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Clientes</Title>
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
