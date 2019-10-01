import React, {Component} from 'react';
import {theme} from '../../constants';
import {SearchBar} from '../../components';

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
  Fab,
  Tabs,
  Tab,
} from 'native-base';
import Active from './Tabs/Active';
import Close from './Tabs/Close';
import Defeated from './Tabs/Defeated';

export default class Clients extends Component {
  state = {
    data: [
      {
        name: 'Ruta Juan Bosh - La Caridad',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        name: 'Ruta Juan Bosh - La Caridad',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        name: 'Ruta Juan Bosh - La Caridad',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        name: 'Ruta Juan Bosh - La Caridad',
        address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
      },
      {
        name: 'Ruta Juan Bosh - La Caridad',
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

  static navigationOptions = {
    header: null,
  };

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
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Rutas</Title>
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

        {/* Tabs */}
        <Tabs hasTabs>
          <Tab heading="Activas">
            <Active />
          </Tab>
          <Tab heading="Cerradas">
            <Close />
          </Tab>
          <Tab heading="Vencidas">
            <Defeated />
          </Tab>
        </Tabs>

        <Fab
          style={{backgroundColor: theme.colors.primary}}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('NewRoute')}>
          <Icon name="add" />
        </Fab>
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
