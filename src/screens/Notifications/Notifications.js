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

export class Notifications extends Component {
  state = {
    data: [],
    active: [
      {
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        id: 2,
        title: 'qui est esse',
        body:
          'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
    ],
    unRead: [
      {
        id: 3,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body:
          'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        id: 4,
        title: 'qui est esse',
        body:
          'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
    ],
  };

  renderItem = ({item}) => {
    <ListItem avatar>
      <Left>
        <Thumbnail source={{uri: 'Image URL'}} />
      </Left>
      <Body>
        <Text>Kumar Pratik</Text>
        <Text note>Doing what you like will always keep you happy . .</Text>
      </Body>
      <Right>
        <Text note>3:43 pm</Text>
      </Right>
    </ListItem>;
  };
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
            <Title>Notifications</Title>
          </Body>
          <Right />
        </Header>

        {/* Tabs */}
        <Tabs hasTabs>
          <Tab heading={global.translate('TITLE_ACTIVE')}>
            <NotificationsTab
              tab_data={this.state.active}
              navigation={this.props.navigation}
            />
          </Tab>
          <Tab heading={global.translate('TITLE_EXPIRED')}>
            <NotificationsTab
              tab_data={this.state.unRead}
              navigation={this.props.navigation}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Notifications;
