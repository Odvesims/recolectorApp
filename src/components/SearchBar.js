import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  state = {
    // data: this.props.data,
    // arrayData: this.props.arrayData,
    value: '',
    query: '',
    error: null,
    show: false,
  };

  searchFilter = (text, name) => {
    const {dataValue, data} = this.props;
    let newData = dataValue;
    newData = dataValue.filter(item => {
      const itemData = `${item.name.toLowerCase()}`;
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(text);
    data(newData, text);
    // this.setState({data: newData, query: text});
  };

  onPressCancel = () => {
    console.log('Cancel');
    // this.props.onPressCancel;
    this.searchFilter('');
    // this.onPressClear();
  };

  onPressClear = () => {
    console.log('Clear');
    this.searchFilter('');
  };

  render() {
    const {style, placeholder, ...props} = this.props;
    return (
      <Header searchBar rounded style={style} {...props}>
        <Item>
          <Icon
            name="arrow-back"
            onPress={() => {
              this.searchFilter(''), this.props.onPressCancel();
              // this.searchFilter('');
            }}
          />
          {console.log()}
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
