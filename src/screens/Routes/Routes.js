import React, {Component} from 'react';
import {theme} from '../../constants';
import {SearchBar, FetchingData} from '../../components';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
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
import RoutesTab from './Tabs/RoutesTab';
import {
  saveActiveRoutes,
  saveInactiveRoutes,
  getStoredRoutes,
  clearRoutesCab,
  clearRoutesDetails,
} from '../../helpers/sql_helper';
import {getData} from '../../helpers/apiconnection_helper';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data2: [],
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
      show: true,
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
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
    });
    this.storedRoutes();
  };

  storedRoutes = () => {
    getStoredRoutes('A').then(active => {
      getStoredRoutes('I').then(expired => {
        this.setState({active: active, expired: expired, loading: false});
      });
    });
  };

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_ROUTES'),
      expired: [],
      active: [],
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 20000);
    getData('GET_ROUTES', '&status=A').then(active => {
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
            <Button transparent onPress={this.openDrawer}>
              <Icon name="menu" />
            </Button>
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
          style={{backgroundColor: theme.colors.primary, right: 20}}
          position="bottomRight"
          onPress={() =>
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
            })
          }>
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
