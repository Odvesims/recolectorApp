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
import {updateNotificationStatus} from '../../../helpers/sql_helper';

export class NotificationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.tab_data,
    };
  }

  showAlert(id, title, body) {
    Alert.alert(global.translate(title), body, [{text: 'OK'}], {
      cancelable: false,
    });
    updateNotificationStatus(1, id);
    const filteredData = this.state.data.filter(item => item.id !== id);
    this.setState({ data: filteredData });
  }

  renderItem = ({item}) => {
    return (
      <ListItem
        onPress={() => {
          this.showAlert(item.id, item.title, item.body);
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
      content = <List dataArray={this.state.data} renderItem={this.renderItem} />;
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