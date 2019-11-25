import React, {Component} from 'react';
import {theme} from '../../../constants';
import {Name, Quantity, ListBody, styles} from '../styles';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Text, View, ScrollView, TouchableHighlight} from 'react-native';
import {Content, Item, Button, ActionSheet, Icon} from 'native-base';

export default class DetailsTab extends Component {
  state = {
    data: this.props.tab_data[0],
    show: true,
    BUTTONS: [
      {
        text: global.translate('TITLE_VIEW'),
        icon: 'eye',
        iconColor: theme.colors.primary,
      },
      {
        text: 'Eliminar',
        icon: 'trash',
        iconColor: theme.colors.accent,
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

  markForDelete = valor => {
    const {key, id, value} = valor;
    const {tab_data, remove} = this.props;
    let newData;
    // if (value < -375) {
    newData = tab_data.filter(item => item.id !== id);
    // this.updateList(filteredData);
    // }
    remove(newData);
  };

  renderItem = ({item}) => {
    // console.log('DETAILTAB RENDER ==>', item);
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    const {detail_description, quantity, key} = item;
    return (
      <Item style={styles.dList}>
        <View key={key} style={styles.listContainer}>
          <ListBody>
            <Name numberOfLines={1}>{detail_description}</Name>
            <Quantity numberOfLines={1}>{quantity}</Quantity>
          </ListBody>
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
                    this.props.navigation.navigate(`${this.props.renderView}`, {
                      ...this.props.tab_data,
                      editable: this.props.editable,
                      // ...this.state.data[0],
                    });
                    break;
                  case 1:
                    this.markForDelete(item);
                    break;
                  case 2:
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
    // console.log('DETAILTABS TAB_DATA ==>', this.props.tab_data);
    // console.log('DETAILTABS PROPS ==>', this.props);
    //this.props.remove
    return (
      <Content style={styles.content}>
        <ScrollView>
          <SwipeListView
            data={this.props.tab_data}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            renderHiddenItem={() => <SwipeHidden />}
            leftOpenValue={0}
            rightOpenValue={-375}
            rightActionActivationDistance={125}
            onSwipeValueChange={this.markForDelete}
          />
        </ScrollView>
      </Content>
    );
  }
}

export const SwipeHidden = ({onPress}) => {
  return (
    <TouchableHighlight style={styles.hiddenList}>
      <View>
        <Button
          transparent
          style={{
            alignSelf: 'flex-end',
            marginRight: 12,
          }}>
          <Icon name="trash" style={{color: 'white'}} />
          <Text
            style={{
              color: 'white',
              fontFamily: 'Roboto-Medium',
            }}>
            {global.translate('TITLE_DELETED')}
          </Text>
        </Button>
      </View>
    </TouchableHighlight>
  );
};
