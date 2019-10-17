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

export class Active extends Component {
  state = {
    show: true,
    BUTTONS: [
      {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
      {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
      {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
    ],
    DESTRUCTIVE_INDEX: 3,
    CANCEL_INDEX: 4,
  };

  showHideSearchBar = () => {
    this.setState(previousState => ({show: !previousState.show}));
  };

  componentDidMount() {}

  render() {
    const {data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    let renderItem = ({item}) => (
      <Item style={styles.list}>
        <View key={item.key} style={{marginLeft: 8}}>
          <Text style={styles.name}>{item.description}</Text>
          <Text style={styles.address}>{item.employee_name}</Text>
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

    return (
      <ScrollView>
        <Content style={styles.content}>
          <FlatList
            style={{overflow: 'hidden'}}
            data={this.props.tab_data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </Content>
        {/* Content */}
      </ScrollView>
    );
  }
}

export default Active;

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
    backgroundColor: 'white',
    height: 80,
    paddingLeft: 12,
    elevation: 1,
  },
  content: {
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  code: {
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
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
