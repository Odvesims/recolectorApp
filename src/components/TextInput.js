/*Custom TextInput*/
import React, {Component} from 'react';
import {View, TextInput} from 'react-native';
class CustomTextInput extends Component {
  render() {
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
          placeholder={this.props.placeholder}
          placeholderTextColor="#007FFF"
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          returnKeyType={this.props.returnKeyType}
          numberOfLines={this.props.numberOfLines}
          multiline={this.props.multiline}
          onSubmitEditing={this.props.onSubmitEditing}
          secureTextEntry={this.props.secured}
          style={this.props.style}
          blurOnSubmit={false}
          value={this.props.value}
        />
      </View>
    );
  }
}
export default CustomTextInput;
