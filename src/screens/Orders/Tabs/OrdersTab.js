import React, {Component} from 'react';
import {} from 'react-native-vector-icons';
import {theme} from '../../../constants';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// import ContentCustom from '../components';

import {Icon, Button, Content, Item, ActionSheet} from 'native-base';

export class Assigned extends Component {
  state = {
    data: [],
    show: true,
    BUTTONS: [
      {
        text: global.translate('TITLE_EDIT'),
        icon: 'create',
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

  showHideSearchBar = () => {
    this.setState(previousState => ({show: !previousState.show}));
  };

  listEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>No hay items para mostrar</Text>
      </View>
    );
  };

  renderItem = ({item}) => {
    // console.log('ORDERSTAB==>', item);
    const {BUTTONS, CANCEL_INDEX, DESTRUCTIVE_INDEX} = this.state;
    return (
      <Item style={styles.list}>
        <View key={item.key} style={styles.listContainer}>
          <Text style={styles.code}>{item.order_document}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text numberOfLines={1} style={styles.name}>
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
                title: global.translate('TITLE_OPTIONS'),
              },
              buttonIndex => {
                switch (buttonIndex) {
                  case 0:
                    this.props.navigation.navigate('Order', {
                      operation: 'TITLE_VIEW_ORDER',
                      order_id: item.order_id,
                      loading_message: 'MESSAGE_UPDATING_CLIENT',
                      isNewRecord: false,
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
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    return (
      <Content style={styles.content}>
        {/* <ScrollView> */}
        <FlatList
          style={{overflow: 'hidden'}}
          data={this.props.tab_data}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmpty}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
        {/* </ScrollView> */}
      </Content>
    );
  }
}

export default Assigned;

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    height: 80,
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  code: {
    textAlign: 'left',
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },

  name: {
    flexBasis: 150,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'scroll',
    flexGrow: 2,

    flexWrap: 'nowrap',
  },

  price: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    elevation: 8,
  },

  more: {
    position: 'absolute',
    right: 0,
  },
});
