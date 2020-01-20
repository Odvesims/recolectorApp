import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {theme} from '../constants';

const InputForm = ({
  onPress,
  placeholder,
  onChangeText,
  returnKeyType,
  keyboardType,
  label,
  onBlur,
  value,
  errorMessage,
}) => {
  let isError = errorMessage;
  if (isError) {
    errorMessage = (
      <Text style={{color: 'red', fontSize: 12}}>{errorMessage}</Text>
    );
  }
  return (
    <View style={styles.paddingBottom}>
      <Text style={styles.label}>{global.translate(label)}</Text>
      <TextInput
        value={value}
        style={[styles.input, !isError ? styles.default : styles.error]}
        keyboardType={keyboardType}
        placeholder={global.translate(placeholder)}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        numberOfLines={1}
      />
      {errorMessage}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    // borderColor: borderColor,
    borderRadius: 4,
    color: '#000',
  },

  error: {borderColor: theme.colors.accent},

  default: {
    borderColor: theme.colors.gray2,
  },

  label: {
    fontSize: theme.sizes.font,
    color: theme.colors.darkGray,
    marginLeft: 8,
    fontWeight: 'bold',
  },

  paddingBottom: {
    paddingBottom: theme.sizes.base,
  },
});
