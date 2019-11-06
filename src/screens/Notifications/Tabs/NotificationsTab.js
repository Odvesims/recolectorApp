import React, {Component} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import {ContentLoader} from '../../../components';
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
  };

  showAlert(title, body) {
    Alert.alert(global.translate(title), body, [{text: 'OK'}], {
      cancelable: false,
    });
  }

  renderItem = ({item}) => {
    return (
      <ListItem
        onPress={() => {
          this.showAlert(item.title, item.body);
        }}>
        <Body>
          <Text>{global.translate(item.title)}</Text>
          <Text numberOfLines={1} note>
            {item.body}
          </Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    // let content = '';

    const {tab_data, loading} = this.props;
    console.log(loading);

    // if (!loading) {
    let content = <ContentLoader />;

    if (!loading) {
      content = <List dataArray={tab_data} renderItem={this.renderItem} />;
    }

    // }

    return (
      <Container>
        <Content>{content}</Content>
      </Container>
    );
  }
}

export default NotificationsTab;
