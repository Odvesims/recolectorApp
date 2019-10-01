import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Icon, Button} from 'native-base';
import PropTypes from 'prop-types';

class ButtonDone extends Component {
  render() {
    const {onPress} = this.props;
    return (
      <Button transparent onPress={() => onPress()}>
        <Icon name="checkmark" />
        <Text style={styles.colors}>Listo</Text>
      </Button>
    );
  }
}

ButtonDone.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  colors: {
    color: '#fff',
  },
});

export default ButtonDone;
