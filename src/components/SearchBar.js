import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  state = {show: false};

  showHideSearchBar = () => {
    // this.setState({show: true});
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  render() {
    const {
      style,
      onPressClear,
      onPressCancel,
      placeholder,
      onChangeText,
    } = this.props;
    return (
      <Header searchBar rounded style={style}>
        <Item>
          <Icon name="arrow-back" onPress={onPressCancel} />
          <Input
            placeholder={placeholder}
            onChangeText={onChangeText}
            ref={ref => {
              this.input = ref;
            }}
          />
          {/* this.onPressRemove */}

          <Icon
            name="close"
            onPress={() => {
              if (onPressClear) {
                if (this.input) {
                  this.input._root.clear();
                  onPressClear();
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
