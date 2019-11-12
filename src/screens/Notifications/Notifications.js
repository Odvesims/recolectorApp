import React, {Component} from 'react';
import {Text, View} from 'react-native';
import NotificationsTab from './Tabs/NotificationsTab';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Tab,
  Tabs,
  Thumbnail,
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

  // isLoading = value => {
  //   this.setState({
  //     loading: value,
  //   });
  // };

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

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Icon name="arrow-back" />
            </Button>
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
              loading={this.state.loading}
              tab_data={this.state.unread}
              navigation={this.props.navigation}
            />
          </Tab>
          <Tab heading={global.translate('TITLE_READ')}>
            <NotificationsTab
              loading={this.state.loading}
              tab_data={this.state.read}
              navigation={this.props.navigation}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Notifications;