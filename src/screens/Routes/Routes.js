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
      loadingMessage: global.translate('message.loading.routes'),
      show: true,
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
    this.setState({
      loading: true,
      loadingMessage: global.translate('message.loading.routes'),
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
      loadingMessage: global.translate('message.loading.routes'),
      expired: [],
      active: [],
    });
    setTimeout(() => {
      if (loading) {
        this.setState({loading: false, request_timeout: true});
        Alert.alert(global.translate('error.request_timeout'));
      }
    }, 20000);

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
      operation: 'action.add.route',
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
      loading_message: 'message.register.route',
      new_record: true,
      editable: true,

      onGoBack: () => this.refresh(false),
    });
  };

  render() {
    const {loading} = this.state;
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
            <Title>{global.translate('header.routes')}</Title>
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
          <Tab heading={global.translate('tab.active')}>
            <RoutesTab
              tab_data={this.state.active}
              navigation={this.props.navigation}
            />
          </Tab>
          <Tab heading={global.translate('tab.expired')}>
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
