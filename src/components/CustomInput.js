/*Custom TextInput*/
import {View, TextInput, StyleSheet, Text} from 'react-native';
import React from 'react';
import {theme} from '../constants';

const CustomInput = ({
  onChangeText,
  placeholder,
  returnKeyType,
  onSubmitEditing,
  secured,
  style,
  value,
  label,
  ...props
}) => {
  return (
    <View style={{paddingBottom: 12}}>
      <Text style={styles.label}>{global.translate(label)}</Text>
      <TextInput
        // placeholder={global.translate(placeholder)}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        style={styles.input}
        value={value}
        {...props}
      />
    </View>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#000',
  },
  label: {
    fontSize: theme.sizes.font,
    color: theme.colors.darkGray,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
