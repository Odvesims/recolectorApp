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
        text: global.translate('TITLE_CANCEL'),
        icon: 'close',
        iconColor: theme.colors.gray,
      },
    ],
    DESTRUCTIVE_INDEX: 3,
    CANCEL_INDEX: 4,
  };

  markForDelete = swipeData => {
    const {key, value} = swipeData;
    if (value < -375) {
      const filteredData = this.props.tab_data.filter(item => item.id !== key);
      this.updateList(filteredData);
    }
  };

  updateList = list => {
    this.setState({
      data: list,
      clear_data: list,
      reverted: false,
    });
  };

  renderItem = ({item}) => {
    console.log('valor detail ==>', item);

    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    const {detail_description, quantity, key} = item;
    return (
      <Item style={styles.dList}>
        <View style={styles.listContainer}>
          <ListBody key={key}>
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
                      // ...this.props.tab_data[0],
                      ...this.state.data[0],
                      editable: this.props.editable,
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
    console.log('DETAILTABS ==>', this.props.tab_data[0]);
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
