import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '../../constants';
import {Button, Icon} from 'native-base';
import PropTypes from 'prop-types';

const BtnIcon = ({label, iconName, onPress}) => {
  let isLabel = label;
  let _label;
  if (isLabel) {
    _label = <Text style={styles.text}>{global.translate(label)}</Text>;
  }

  return (
    <Button transparent onPress={onPress}>
      <Icon name={iconName} />
      {_label}
    </Button>
  );
};

export default BtnIcon;

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    marginLeft: theme.sizes.p8,
  },
});

BtnIcon.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
};
