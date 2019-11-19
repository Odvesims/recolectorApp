import React, {Component} from 'react';
import {theme} from '../../constants';
import {OrdersTab} from './Tabs';
import {FetchingData} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';

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
  Tabs,
  Tab,
} from 'native-base';

import {
  getOrders,
  getAssignedOrders,
  getNotAssignedOrders,
  saveOrders,
} from '../../helpers/sql_helper';
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
      assigned: [],
      not_assigned: [],
      isLoading: false,
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
    this.availableTab = React.createRef();
    this.notAvailableTab = React.createRef();
  }

  static navigationOptions = {
    header: null,
  };

  showHideSearchBar = () => {
    this.setState(previousState => ({show: !previousState.show}));
  };

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
      isLoading: true,
      loadingMessage: global.translate('MESSAGE_isLoading_ORDERS'),
    });
    this.storedOrders();
  };

  storedOrders = () => {
    getNotAssignedOrders().then(not_assigned => {
      getAssignedOrders().then(assigned => {
        // console.log('NOT_ASSIGNED==>', not_assigned);
        // console.log('ASSIGNED==>', assigned);
        this.setState({
          isLoading: false,
          not_assigned: not_assigned,
          assigned: assigned,
        });
      });
    });
  };

  refreshHandler = () => {
    this.setState({
      isLoading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_isLoading_ORDERS'),
    });
    setTimeout(() => {
      if (this.state.isLoading) {
        this.setState({isLoading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 15000);
    getData('GET_ORDERS').then(result => {
      //
      // console.log('RESULTS ==>', result);
      ///
      if (!this.state.request_timeout) {
        this.setState({isLoading: false, request_timeout: false});
        if (result.valid) {
          saveOrders(result.arrResponse).then(res => {
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
    const {
      data,
      date,
      isLoading,
      not_assigned,
      assigned,
      loadingMessage,
    } = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    return (
      <Root>
        <Container>
          <Spinner
            visible={isLoading}
            textContent={loadingMessage}
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
              <Title>{global.translate('TITLE_ORDERS')}</Title>
            </Body>
            <Right>
              <FetchingData
                syncData={this.refreshHandler}
                fetching={isLoading}
              />
            </Right>
          </Header>

          {/* Tab */}
          <Tabs hasTabs>
            <Tab heading={global.translate('TITLE_NOT_ASSIGNED')}>
              <OrdersTab
                tab_data={not_assigned}
                ref={this.notAvailableTab}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab heading={global.translate('TITLE_ASSIGNED')}>
              <OrdersTab
                tab_data={assigned}
                ref={this.availableTab}
                navigation={this.props.navigation}
              />
            </Tab>
          </Tabs>

          {/* Fab */}
          <Fab
            style={{backgroundColor: theme.colors.primary}}
            position="bottomRight"
            onPress={() =>
              this.props.navigation.navigate('Order', {
                operation: 'TITLE_NEW_ORDER',
                loading_message: 'MESSAGE_REGISTERING_ORDER',
                date: date,
                onGoBack: () => this.refresh(true),
                isNewRecord: true,
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
