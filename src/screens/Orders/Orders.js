import React, {Component} from 'react';
import {theme} from '../../constants';
import {OrdersTab} from './Tabs';
import {FetchingData, BtnIcon} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';

import {Alert} from 'react-native';

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
    // this.availableTab = React.createRef();
    // this.notAvailableTab = React.createRef();
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
      isLoading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_ORDERS'),
    });
    this.storedOrders();
  };

  storedOrders = async () => {
    try {
      const notAssigned = await getNotAssignedOrders();
      // console.log('getAssignedOrders ==>', notAssigned);
      const assigned = await getAssignedOrders();
      // console.log('getAssignedOrders ==>', assigned);

      this.setState({
        isLoading: false,
        not_assigned: notAssigned,
        assigned: assigned,
      });
    } catch (error) {
      console.log('storedOrders error ==>', error);
    }
  };

  refreshHandler = async () => {
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

    const data = await getData('GET_ORDERS');
    if (!this.state.request_timeout) {
      this.setState({request_timeout: false});
      if (data.valid) {
        try {
          const save = await saveOrders(data.arrResponse);
          await this.storedOrders();
        } catch (error) {
          console.log('error', error);
        }
      } else {
        Alert.alert(global.translate(data.response));
      }
    } else {
      this.setState({request_timeout: false});
    }
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  onPressFab = () => {
    this.props.navigation.navigate('Order', {
      operation: 'TITLE_NEW_ORDER',
      loading_message: 'MESSAGE_REGISTERING_ORDER',
      date: this.state.date,
      onGoBack: () => this.refresh(true),
      isNewRecord: true,
      editable: true,
      loading: false,
    });
  };

  render() {
    // console.log('Orders ==>', this.state);
    const {isLoading, not_assigned, assigned, loadingMessage} = this.state;

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
              <BtnIcon iconName={'menu'} onPress={this.openDrawer} />
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
                // ref={this.notAvailableTab}
                navigation={this.props.navigation}
              />
            </Tab>
            <Tab heading={global.translate('TITLE_ASSIGNED')}>
              <OrdersTab
                tab_data={assigned}
                // ref={this.availableTab}
                navigation={this.props.navigation}
              />
            </Tab>
          </Tabs>

          {/* Fab */}
          <Fab
            style={{backgroundColor: theme.colors.primary}}
            position="bottomRight"
            onPress={this.onPressFab}>
            <Icon name="add" />
          </Fab>
        </Container>
      </Root>
    );
  }
}
