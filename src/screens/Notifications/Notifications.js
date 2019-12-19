import React, {Component} from 'react';
import NotificationsTab from './Tabs/NotificationsTab';

import {BtnIcon} from '../../components';
import {
  Body,
  Container,
  Header,
  Left,
  Right,
  Tab,
  Tabs,
  Title,
} from 'native-base';

import {getNotifications} from '../../helpers/sql_helper';

export class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      unread: [],
      read: [],
      loading: true,
    };
  }

  enterHandler = () => {
    setTimeout(() => {
      this.setState({loading: false});
    }, 5000);
    getNotifications(0).then(unread => {
      getNotifications(1).then(read => {
        this.setState({unread: unread, read: read, loading: false});
      });
    });
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

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {loading, read, unread} = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <BtnIcon iconName={'arrow-back'} onPress={this.goBack} />
          </Left>
          <Body>
            <Title>{global.translate('TITLE_NOTIFICATIONS')}</Title>
          </Body>
          <Right />
        </Header>

        {/* Tabs */}
        <Tabs hasTabs>
          <Tab heading={global.translate('TITLE_UNREAD')}>
            <NotificationsTab
              loading={loading}
              tab_data={unread}
              navigation={this.props.navigation}
            />
          </Tab>
          <Tab heading={global.translate('TITLE_READ')}>
            <NotificationsTab
              loading={loading}
              tab_data={read}
              navigation={this.props.navigation}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Notifications;
