import React, {Component} from 'react';
import {updateNotificationStatus} from '../../../helpers/sql_helper';
import {ContentLoader} from '../../../components';

import {Text, Alert} from 'react-native';
import {List, Container, Content, Body, ListItem} from 'native-base';

export default class NotificationsTab extends Component {
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
    this.setState({data: filteredData});
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
    const {loading} = this.props;
    let content = <ContentLoader />;

    if (!loading) {
      content = (
        <List dataArray={this.state.data} renderItem={this.renderItem} />
      );
    }

    return (
      <Container>
        <Content>{content}</Content>
      </Container>
    );
  }
}
