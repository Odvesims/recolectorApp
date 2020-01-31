import React, {Component} from 'react';
import {theme} from '../../../constants';
import {Text, View, FlatList} from 'react-native';
import {styles} from '../styles';
import {Icon, Button, Content, Item, ActionSheet} from 'native-base';

export default class OrdersTab extends Component {
  state = {
    data: [],
    show: true,
    BUTTONS: [
      {
        text: global.translate('general.edit'),
        icon: 'create',
        iconColor: theme.colors.primary,
      },
      {
        text: global.translate('general.cancel'),
        icon: 'close',
        iconColor: theme.colors.gray,
      },
    ],
    DESTRUCTIVE_INDEX: 3,
    CANCEL_INDEX: 4,
  };

  showHideSearchBar = () => {
    this.setState(previousState => ({show: !previousState.show}));
  };

  listEmpty = () => {
    return (
      <View style={styles.listEmpty}>
        <Text>{global.translate('message.empty.items')}</Text>
      </View>
    );
  };

  renderItem = ({item}) => {
    // console.log('ORDERSTAB==>', item);
    const {BUTTONS, CANCEL_INDEX, DESTRUCTIVE_INDEX} = this.state;
    return (
      <Item style={styles.list}>
        <View key={item.key} style={styles.listContainer}>
          <Text style={styles.oCode}>{item.order_document}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text numberOfLines={1} style={styles.oName}>
              {item.client}- {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.price}>
              $ {item.order_total}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.address}>
            {item.address}
          </Text>
        </View>
        <Button
          transparent
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: global.translate('label.options'),
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    this.props.navigation.navigate('Order', {
                      operation: 'action.edit.order',
                      order_id: item.order_id,
                      loading_message: 'message.update.order',
                      isNewRecord: false,
                      editable: false,
                      loading: true,
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
      <Content style={styles.content}>
        <FlatList
          style={{overflow: 'hidden'}}
          data={this.props.tab_data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmpty}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      </Content>
    );
  }
}
