import React, {Component} from 'react';
import {theme} from '../../../constants';
import styled from 'styled-components/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Platform,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Content, Body, Item, Button, ActionSheet, Icon} from 'native-base';

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
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    return (
      <Item style={styles.list}>
        <View key={item.key} style={styles.listContainer}>
          <View
            key={item.key}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Name numberOfLines={1}>{item.description}</Name>
            <Quantity numberOfLines={1}>{item.quantity}</Quantity>
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
    console.log('DetailTab', this.props.tab_data);
    return (
      <Content style={styles.content}>
        <ScrollView>
          <SwipeListView
            style={{
              overflow: 'hidden',
              marginBottom: 0,
              backgroundColor: 'lightGray',
            }}
            data={this.props.tab_data}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            renderHiddenItem={(data, rowMap) => (
              <TouchableHighlight
                style={[styles.hiddenList]}
                onPress={this.onClickRevert}>
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
            )}
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
const styles = StyleSheet.create({
  headerCodeText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: 'bold',
  },

  currentDate: {
    // display: 'flex',
    backgroundColor: theme.colors.lightGray,
    padding: 16,
    flexDirection: 'row',
  },
  currentDateText: {color: theme.colors.gray},

  container: {
    // flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  client_data: {
    fontSize: 14,
  },

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },

  button: {
    fontSize: theme.sizes.caption,
    textTransform: 'uppercase',
    backgroundColor: '#4285F4',
  },

  textCenter: {
    alignItems: 'center',
  },

  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  quantity: {
    flexShrink: 10,
    color: theme.colors.gray2,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  price: {
    flexShrink: 10,
    color: theme.colors.gray2,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  total: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  leftSwipeItem: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    height: 50,
    elevation: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: '#c3000d',
  },

  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    backgroundColor: '#c3000d',
  },

  hiddenList: {
    margin: 5,
    backgroundColor: '#c3000d',
    height: 46,
    elevation: 1,
  },
});

const ButtonOutlined = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.colors.primary};
  border-width: 1;
  padding-vertical: 12;
  border-radius: 4;
  align-items: center;
`;
const TextButton = styled.Text`
  margin-left: 24;
  font-size: ${theme.sizes.base};
  color: ${theme.colors.primary};
  text-transform: uppercase;
`;
const ClientForm = styled.View``;
const Name = styled.Text`
  flex-basis: 150;
  font-size: 16;
  color: black;
  font-weight: bold;
  overflow: scroll;
  flex-grow: 2;
  flex-wrap: nowrap;
`;
const Quantity = styled.Text`
  flex-shrink: 10;
  color: ${theme.colors.success};
  font-size: 14;
  font-weight: bold;
  flex-wrap: nowrap;
`;
const CurrentDate = styled.View``;
const DetailContent = styled.View`
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.lightGray};
`;
