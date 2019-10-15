import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
    const {style, onPressRemove, onPressCancel} = this.props;
    return (
      <Header searchBar rounded style={style}>
        <Item>
          <Icon name="arrow-back" onPress={() => onPressCancel()} />
          <Input placeholder="Search" />
          <Icon name="close" onPress={() => onPressRemove()} />
        </Item>
        <Button transparent>
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
  onPressCancel: PropTypes.func.isRequired,
};
