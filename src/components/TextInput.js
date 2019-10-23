/*Custom TextInput*/
import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
export default class CustomTextInput extends Component {
  render() {
    const {
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
      ...props
    } = this.props;

    return (
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secured}
        style={style}
        blurOnSubmit={false}
        value={value}
        {...props}
      />
    );
  }
}
