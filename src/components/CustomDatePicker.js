import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DatePicker} from 'native-base';
import {theme} from '../constants';

const CustomDatePicker = ({
  defaultDate,
  disabled,
  label,
  onDateChange,
  minimumDate,
  ...other
}) => {
  return (
    <View style={styles.paddingBottom}>
      <Text style={styles.label}>{global.translate(label)}</Text>
      <View style={styles.datepicker}>
        <DatePicker
          defaultDate={defaultDate}
          minimumDate={minimumDate}
          locale={'es'}
          animationType={'fade'}
          textStyle={{color: theme.colors.gray, fontSize: 14}}
          onDateChange={onDateChange}
          disabled={disabled}
          {...other}
        />
      </View>
    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  datepicker: {
    marginVertical: theme.sizes.p8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },
});
