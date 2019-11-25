import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {theme} from '../constants';

const NumberInput = ({
  editable,
  value,
  iconStyle,
  minValue,
  onChange,
  style,
  label,
  ...props
}) => {
  return (
    <View style={(style, styles.paddingBottom)}>
      <Text style={{marginBottom: 8}}>{label}</Text>
      <NumericInput
        iconStyle={iconStyle}
        value={value}
        onChange={onChange}
        minValue={minValue}
        editable={editable}
        {...props}
      />
    </View>
  );
};

export default NumberInput;
const styles = StyleSheet.create({
  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },
});
