import React, {Component} from 'react';
import {theme} from '../../../constants';
import {Name, Quantity, ListBody, styles} from '../styles';
import {View, ScrollView, FlatList} from 'react-native';
import {Content, Item, Button, ActionSheet, Icon} from 'native-base';
export default class DetailsTab extends Component {
  state = {
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
    const {id} = valor;
    const {tab_data, remove} = this.props;
    let newData;
    newData = tab_data.filter(item => item.id !== id);
    remove(newData);
  };

  onPressAction = item => {
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
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
              ...this.props.tab_data[0],
              editable: this.props.editable,
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
    );
  };

  renderItem = ({item}) => {
    const {detail_description, quantity} = item;
    return (
      <Item style={styles.dList}>
        <View style={styles.listContainer}>
          <ListBody>
            <Name numberOfLines={1}>{detail_description}</Name>
            <Quantity numberOfLines={1}>{quantity}</Quantity>
          </ListBody>
        </View>
        <Button
          transparent
          onPress={() => {
            this.onPressAction(item);
          }}>
          <Icon style={{color: 'gray'}} name="more" />
        </Button>
      </Item>
    );
  };

  render() {
    // console.log('DETAILTABS PROPS ==>', this.props);
    return (
      <Content style={styles.content}>
        <ScrollView>
          <FlatList
            data={this.props.tab_data}
            keyExtractor={item => `${item.id}`}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </Content>
    );
  }
}
