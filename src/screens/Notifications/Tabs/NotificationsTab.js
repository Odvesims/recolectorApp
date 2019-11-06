import React, {Component} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import {
  List,
  Container,
  Content,
  Right,
  Left,
  Body,
  Thumbnail,
  ListItem,
} from 'native-base';

export class NotificationsTab extends Component {
  state = {
    data: [],
    loading: false,
  };

  alert = () => {
    Alert.alert(
      'Notification',
      'Juan Perez ha completado su recoleccion',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  renderItem = ({item}) => {
    console.log(item);
    return (
      <ListItem onPress={this.alert}>
        <Body>
          <Text>{item.title}</Text>
          <Text numberOfLines={1} note>
            {item.body}
          </Text>
        </Body>
        <Right>
          <Text numberOfLines={1} note>
            {item.id}
          </Text>
        </Right>
      </ListItem>
    );
  };

  render() {
    // let content = '';

    const {loading} = this.state;
    const {tab_data} = this.props;
    console.log(tab_data);

    // if (!loading) {
    let content = <List dataArray={tab_data} renderItem={this.renderItem} />;
    // }

    return (
      <Container>
        <Content>{content}</Content>
      </Container>
    );
  }
}

export default NotificationsTab;
