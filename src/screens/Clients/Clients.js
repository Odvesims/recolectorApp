import React, {Component} from 'react';
import {theme} from '../../constants';
import {AddButton, SearchBar} from '../../components';

import {} from 'react-native-vector-icons';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
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
  Input,
  Right,
  Title,
  ActionSheet,
} from 'native-base';

import {getTranslation} from '../../helpers/translation_helper';

export default class Clients extends Component {
  state = {
    data: [
      {
        code: 12,
        name: 'Lilli',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 14,
        name: 'John',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 18,
        name: 'Lavera',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 16,
        name: 'Paul',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 13,
        name: 'Jene',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 117,
        name: 'Felipe',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este saaaaaaaaaaaaa',
      },
      {
        code: 152,
        name: 'Shawn',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 352,
        name: 'Carey',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        code: 12,
        name: 'Mark',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
    ],
    show: true,
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
    let getUrl = 'http://updates.sojaca.net/apimobile?apiOption=2&username=';
    try {
      let response = await fetch(getUrl, {method: 'GET'});
      const responseJson = await response.json();
      if (JSON.stringify(responseJson) === '{}') {
        validNot = false;
        responseError = 999;
      } else {
        this.state.setState({data: responseJson.arr_clients});
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

  showHideSearchBar = () => {
    this.setState(previousState => ({show: !previousState.show}));
  };

  componentDidMount() {}

  render() {
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

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
            <Button transparent>
              <Icon name="refresh" />
            </Button>
            <Button transparent>
              <Icon name="funnel" />
            </Button>
            <Button
              transparent
              onPress={() => {
                this.showHideSearchBar;
              }}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>

        {/* SearchBar */}
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="close" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        {/* SearchBar */}

        {/* Header */}

        {this.state.show ? <SearchBar /> : null}
        <ScrollView>
          {/* Content */}

          <Content style={styles.content}>
            <FlatList
              style={{overflow: 'hidden'}}
              data={data}
              renderItem={({item}) => (
                <Item style={styles.list}>
                  <Text style={styles.code}>{item.code}</Text>
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
    paddingTop: 12,
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
