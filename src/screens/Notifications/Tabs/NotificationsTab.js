import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {
  List,
  ListItem,
  Container,
  Content,
  Right,
  Left,
  Body,
  Thumbnail,
} from 'native-base';

export class NotificationsTab extends Component {
  state = {
    data: [],
    loading: false,
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
    let content = '';

    const {loading} = this.state;
    const {tab_data} = this.props;

    if (!loading) {
      content = <List data={tab_data} renderItem={this.rendeItem} />;
    }

    return (
      <Container>
        <Content>{content}</Content>
      </Container>
    );
  }
}

export default NotificationsTab;
