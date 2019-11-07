import React, {Component} from 'react';
import {theme} from '../../../constants';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Content, Body, Item, Button, ActionSheet, Icon} from 'native-base';

export default class DetailsTab extends Component {
  renderItem = ({item}) => (
    <Item style={styles.list}>
      <View key={item.key} style={styles.listContainer}>
        <Text style={styles.code}>{item.document}</Text>
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
              title: 'Opciones',
            },
            buttonIndex => {
              this.setState({clicked: BUTTONS[buttonIndex]});
            },
          )
        }>
        <Icon style={{color: 'gray'}} name="more" />
      </Button>
    </Item>
  );

  render() {
    console.log(this.props.tab_data);
    return (
      <Content style={styles.content}>
        <SafeAreaView>
          <FlatList
            style={{overflow: 'hidden'}}
            data={this.props.tab_data}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        </SafeAreaView>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
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
