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
    } = this.props;

    return (
      <View
        style={{
          marginLeft: 10,
          marginRight: 35,
          marginTop: 10,
          borderColor: '#BDBDBD',
          borderWidth: 1,
          borderRadius: 7,
        }}>
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
        />
      </View>
    );
  }
}
