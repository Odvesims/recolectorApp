import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';

export default class AddButton extends Component {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity style={styles.fab} onPress={() => onPress()}>
        <Icon style={{color: 'white'}} name="add" />
      </TouchableOpacity>
    );
  }
}

AddButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#4285F4',
    borderRadius: 30,
    elevation: 8,
  },
});
