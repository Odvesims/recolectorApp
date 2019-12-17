import React, {Component} from 'react';
import RoutesTab from './Tabs/RoutesTab';
import moment from 'moment';
import {
  saveActiveRoutes,
  saveInactiveRoutes,
  getStoredRoutes,
  clearRoutesCab,
  clearRoutesDetails,
} from '../../helpers/sql_helper';
import {getData} from '../../helpers/apiconnection_helper';

import {SearchBar, FetchingData, BtnIcon} from '../../components';
import {theme} from '../../constants';
import Spinner from 'react-native-loading-spinner-overlay';

import {Alert} from 'react-native';

import {
  Icon,
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

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
      show: true,
<<<<<<< HEAD
=======
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    };
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

  enterHandler = () => {
    console.log('enterhandler');
    this.setState({
      loading: true,
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
    });
    this.storedRoutes();
  };

  storedRoutes = async () => {
    const active = await getStoredRoutes('A');
    const inactive = await getStoredRoutes('I');
    this.setState({active: active, expired: inactive, loading: false});
  };

  refreshHandler = async () => {
    const {loading, request_timeout} = this.state;
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
      expired: [],
      active: [],
    });
    setTimeout(() => {
      if (loading) {
        this.setState({loading: false, request_timeout: true});
        Alert.alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 20000);
<<<<<<< HEAD
    getData('GET_ROUTES', '&status=A').then(active => {
<<<<<<< HEAD
      console.log('ROUTES', active);
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      if (!this.state.request_timeout) {
        clearRoutesCab('A').then(ca => {
          clearRoutesDetails().then(cd => {
            if (active.arrResponse !== []) {
              saveActiveRoutes(active.arrResponse);
            }
            getData('GET_ROUTES', '&status=I').then(inactive => {
              if (!this.state.request_timeout) {
                clearRoutesCab('I').then(ci => {
                  if (inactive.arrResponse !== []) {
                    saveInactiveRoutes(inactive.arrResponse);
                  }
                  this.storedRoutes();
                });
              } else {
                this.setState({request_timeout: false});
              }
            });
          });
        });
=======

    const active = await getData('GET_ROUTES', '&status=A');
    if (!request_timeout) {
      await clearRoutesCab('A');
      await clearRoutesDetails();
      if (active.arrResponse !== []) {
        saveActiveRoutes(active.arrResponse);
      }

      const inactive = await getData('GET_ROUTES', '&status=I');
      if (!request_timeout) {
        await clearRoutesCab('I');
        if (inactive.arrResponse !== []) {
          saveInactiveRoutes(inactive.arrResponse);
        }
        this.storedRoutes();
>>>>>>> Andris
      } else {
        this.setState({request_timeout: false});
      }
    } else {
      this.setState({request_timeout: false});
    }
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  handlerFab = params => {
    this.props.navigation.navigate('Route', {
      operation: 'TITLE_NEW_ROUTE',
      route_id: '',
      description: '',
      document_id: '',
      document_acronym: '',
      document_number: '',
      assigned_by: '',
      assigned_to: '',
      supervisor_name: '',
      employee_name: '',
      phone_number: '',
      date_from: moment(new Date()).format('DD/MM/YYYY'),
      date_to: moment(new Date()).format('DD/MM/YYYY'),
      status: '',
      loading_message: 'MESSAGE_REGISTERING_ROUTE',
      new_record: true,
      disabled_date_from: false,
      onGoBack: () => this.refresh(false),
    });
  };

  render() {
    const {loading} = this.state;
    console.log('Routes', this.state);
    return (
      <Container>
        <Spinner
          visible={this.state.loading}
          textContent={this.state.loadingMessage}
          color={'CE2424'}
          overlayColor={'rgba(255, 255, 255, 0.4)'}
          animation={'slide'}
        />
        {/* Header */}
        <Header>
          <Left>
            <BtnIcon iconName={'menu'} onPress={this.openDrawer} />
          </Left>
          <Body>
            <Title>{global.translate('TITLE_ROUTES')}</Title>
          </Body>
          <Right>
            <FetchingData syncData={this.refreshHandler} fetching={loading} />
            {/*<Button transparent>
              <Icon name="funnel" />
            </Button>
            <Button
              transparent
              onPress={() => {
                this.showHideSearchBar;
              }}>
              <Icon name="search" />
            </Button>
            */}
          </Right>
        </Header>

        {/* Tabs */}
        <Tabs hasTabs>
          <Tab heading={global.translate('TITLE_ACTIVE')}>
            <RoutesTab
              tab_data={this.state.active}
              navigation={this.props.navigation}
            />
          </Tab>
          <Tab heading={global.translate('TITLE_EXPIRED')}>
            <RoutesTab
              tab_data={this.state.expired}
              navigation={this.props.navigation}
            />
          </Tab>
        </Tabs>

        <Fab
          style={{backgroundColor: theme.colors.primary, right: 10}}
          position="bottomRight"
          onPress={this.handlerFab}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
