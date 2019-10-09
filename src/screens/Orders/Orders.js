import React, {Component} from 'react';
import {theme} from '../../constants';
// import {SearchBar} from '../../components';

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
  Root,
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
} from 'native-base';

import {getOrders, saveOrders} from '../../helpers/sql_helper';
import {getData} from '../../helpers/apiconnection_helper';

export default class Orders extends Component {
  constructor(props) {
    super(props);
    let day = new Date().getDate();
    if (parseInt(day) < 10) {
      day = '0' + day;
    }
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    this.state = {
      data: [],
      show: true,
      date: `${day}/${month}/${year}`,
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
  }

  static navigationOptions = {
    header: null,
  };

  showHideSearchBar = () => {
    this.setState(previousState => ({show: !previousState.show}));
  };

  componentDidMount() {}

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
      loadingMessage: global.translate('MESSAGE_LOADING_ORDERS'),
    });
    this.storedOrders();
  };

  storedOrders = () => {
    getOrders().then(orders => {
      if (orders.length > 0) {
        this.setState({data: orders, loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_ORDERS'),
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 15000);
    getData('GET_ORDERS').then(result => {
      if (!this.state.request_timeout) {
        this.setState({loading: false, request_timeout: false});
        if (result.valid) {
          saveOrders(result.arrResponse, []).then(res => {
            this.storedOrders();
          });
        } else {
          alert(global.translate(result.response));
        }
      } else {
        this.setState({request_timeout: false});
      }
    });
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  render() {
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    let renderItem = ({item}) => (
      <Item style={styles.list}>
        <View key={item.key} style={{marginLeft: 8}}>
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
    );

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
              <Title>{global.translate('TITLE_ORDERS')}</Title>
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
          <ScrollView>
            <Content style={styles.content}>
              <FlatList
                style={{overflow: 'hidden'}}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
            </Content>
          </ScrollView>
          <Fab
            style={{backgroundColor: theme.colors.primary}}
            position="bottomRight"
            onPress={() =>
              this.props.navigation.navigate('Order', {
                operation: 'TITLE_NEW_ORDER',
                loading_message: 'MESSAGE_REGISTERING_ORDER',
                date: this.state.date,
                onGoBack: () => this.refresh(true),
                new_record: true,
              })
            }>
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