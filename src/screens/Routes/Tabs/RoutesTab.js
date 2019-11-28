import React, {Component} from 'react';
import {theme} from '../../../constants';
import {styles, ListBody} from '../styles';

import {Text, View, ScrollView, FlatList} from 'react-native';

import {
  Icon,
  Button,
  Content,
  Item,
  ActionSheet,
  Container,
  Root,
} from 'native-base';

export class Defeated extends Component {
  state = {
    show: true,
    BUTTONS: [
      {
        text: global.translate('TITLE_VIEW'),
        icon: 'eye',
        iconColor: theme.colors.primary,
      },
      {
        text: global.translate('TITLE_CANCEL'),
        icon: 'close',
        iconColor: theme.colors.gray,
      },
    ],
    DESTRUCTIVE_INDEX: 3,
    CANCEL_INDEX: 4,
  };

  renderItem = ({item}) => {
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    return (
      <Item style={styles.list}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <View key={item.key} style={styles.listContainer}>
            <Text style={styles.name}>{item.description}</Text>
            <ListBody>
              <Text style={styles.address}>
                {global.translate('TITLE_COLLECTOR')}: {item.employee_name}
              </Text>
            </ListBody>
          </View>
        </View>
        <Button
          transparent
          style={styles.more}
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: global.translate('TITLE_OPTIONS'),
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    this.props.navigation.navigate('Route', {
                      operation: 'TITLE_VIEW_ROUTE',
                      route_id: item.route_id,
                      description: item.description,
                      document_id: item.document_id,
                      document_acronym: item.acronym,
                      document_number: item.document_number,
                      assigned_by: item.assigned_by,
                      assigned_to: item.assigned_to,
                      supervisor_name: item.supervisor_name,
                      employee_name: item.employee_name,
                      phone_number: item.phone_number,
                      date_from: item.date_from,
                      date_to: item.date_to,
                      status: item.status,
                      disabled_date_from: true,
                      loading_message: 'MESSAGE_UPDATING_ROUTE',
                      new_record: false,
                      details: item.details,
                    });
                    break;
                  case 1:
                    ActionSheet.hide();
                    break;
                }
              },
            )
          }>
          <Icon style={{color: 'gray'}} name="more" />
        </Button>
      </Item>
    );
  };

  render() {
    return (
      <Root>
        <Content style={styles.content}>
          <ScrollView>
            <FlatList
              style={{overflow: 'hidden'}}
              data={this.props.tab_data}
              renderItem={this.renderItem}
            />
          </ScrollView>
        </Content>
      </Root>
    );
  }
}

export default Defeated;
