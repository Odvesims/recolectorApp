import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {Header, Item, Input, Icon, Button, Text} from 'native-base';
import PropTypes from 'prop-types';

export default class SearchBar extends PureComponent {
  searchFilter = (text, name) => {
    const {dataValue, data} = this.props;
    let newData;
    newData = dataValue.filter(item => {
      const itemData = `${item.name.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    data(newData, text);
    // this.setState({data: newData, query: text});
  };

  onPressCancel = () => {
    // this.props.onPressCancel;
    this.searchFilter('');
    // this.onPressClear();
  };

  onPressClear = () => {
    this.searchFilter('');
  };

  render() {
    const {style, placeholder, onPressCancel, ...props} = this.props;
    return (
      <Header searchBar rounded style={style} {...props}>
        <Item>
          <Icon
            name="arrow-back"
            onPress={() => {
              this.searchFilter(''), onPressCancel();
            }}
          />
          <Input
            placeholder={placeholder}
            onChangeText={text => {
              this.searchFilter(text);
            }}
            ref={ref => {
              this.input = ref;
            }}
          />
          <Icon
            name="close"
            onPress={() => {
              if (this.onPressClear) {
                if (this.input) {
                  this.input._root.clear();
                  this.onPressClear();
                }
              } else {
                if (this.input) {
                  this.input._root.clear();
                }
              }
            }}
          />
        </Item>
        <Button>
          <Text>Search</Text>
        </Button>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {},
});

SearchBar.propTypes = {
  onPressRemove: PropTypes.func.isRequired,
  onPressClear: PropTypes.func.isRequired,
};
