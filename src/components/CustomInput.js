/*Custom TextInput*/
import {View, TextInput, StyleSheet, Text} from 'react-native';
import React from 'react';
import {theme} from '../constants';

const CustomInput = ({
  keyboardType,
  onChangeText,
  placeholder,
  returnKeyType,
  numberOfLines,
  multiline,
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
        placeholder={global.translate(placeholder)}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secured}
        style={styles.input}
        blurOnSubmit={false}
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
