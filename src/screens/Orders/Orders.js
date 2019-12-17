import React, {Component} from 'react';
import {theme} from '../../constants';
import {OrdersTab} from './Tabs';
import {FetchingData} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';

import {} from 'react-native-vector-icons';

import {Alert} from 'react-native';

// import ContentCustom from '../components';

import {
  Root,
  Icon,
  Button,
  Container,
  Header,
  Body,
  Left,
  Right,
  Title,
  Fab,
  Tabs,
  Tab,
} from 'native-base';

import {
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
    // console.log('value ==>', value);
    if (value) {
      this.refreshHandler();
    } else {
      this.enterHandler();
    }
  }

  enterHandler = () => {
    this.setState({
<<<<<<< HEAD
      isLoading: true,
=======
      loading: true,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      loadingMessage: global.translate('MESSAGE_LOADING_ORDERS'),
    });
    this.storedOrders();
  };

<<<<<<< HEAD
  storedOrders = () => {
    getNotAssignedOrders().then(not_assigned => {
      getAssignedOrders().then(assigned => {
        // console.log('NOT_ASSIGNED==>', not_assigned);
        // console.log('ASSIGNED==>', assigned);
        this.setState({
<<<<<<< HEAD
          isLoading: false,
=======
          loading: false,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          not_assigned: not_assigned,
          assigned: assigned,
        });
      });
=======
  storedOrders = async () => {
    const notAssigned = await getNotAssignedOrders();
    const assigned = await getAssignedOrders();

    // console.log('not assigned ==>', notAssigned);
    // console.log('assigned ==>', assigned);

    this.setState({
      isLoading: false,
      not_assigned: notAssigned,
      assigned: assigned,
>>>>>>> Andris
    });
  };

  refreshHandler = () => {
    this.setState({
      isLoading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_ORDERS'),
    });
    setTimeout(() => {
      if (this.state.isLoading) {
        this.setState({isLoading: false, request_timeout: true});
        Alert.alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 15000);

    getData('GET_ORDERS').then(result => {
      // console.log('GET ORDERS ==>', result);

      if (!this.state.request_timeout) {
        this.setState({request_timeout: false});
        if (result.valid) {
          saveOrders(result.arrResponse).then(res => {
            this.storedOrders();
          });
        } else {
          Alert.alert(global.translate(result.response));
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // console.log('Orders ==>', this.state);
>>>>>>> Andris
    const {
      date,
      isLoading,
      not_assigned,
      assigned,
      loadingMessage,
    } = this.state;
<<<<<<< HEAD
=======
    const {data, loading, not_assigned, assigned} = this.state;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
=======
>>>>>>> Andris

    return (
      <Root>
        <Container>
          <Spinner
<<<<<<< HEAD
            visible={isLoading}
            textContent={loadingMessage}
=======
            visible={this.state.loading}
            textContent={this.state.loadingMessage}
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
              <FetchingData
                syncData={this.refreshHandler}
                fetching={isLoading}
              />
=======
              <FetchingData syncData={this.refreshHandler} fetching={loading} />
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
            </Right>
          </Header>

          {/* Tab */}
          <Tabs hasTabs>
            <Tab heading={global.translate('TITLE_NOT_ASSIGNED')}>
<<<<<<< HEAD
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
=======
              <OrdersTab tab_data={not_assigned} ref={this.availableTab} />
            </Tab>
            <Tab heading={global.translate('TITLE_ASSIGNED')}>
              <OrdersTab tab_data={assigned} ref={this.notAvailableTab} />
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
                editable: true,
                loading: false,
              })
            }>
            <Icon name="add" />
          </Fab>
        </Container>
      </Root>
    );
  }
}
