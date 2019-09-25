/*Custom TextInput*/
import React from 'react';
import { View, TextInput } from 'react-native';
const CustomTextInput = props => {
  return (
	<TextInput
	   underlineColorAndroid="transparent"
	   placeholder={props.placeholder}
	   placeholderTextColor="#007FFF"
	   keyboardType={props.keyboardType}
	   onChangeText={props.onChangeText}
	   returnKeyType={props.returnKeyType}
	   numberOfLines={props.numberOfLines}
	   multiline={props.multiline}
	   onSubmitEditing={props.onSubmitEditing}        
	   style={{
	   	marginLeft: 10,
	   	marginRight: 35,
	   	marginTop: 10,
	   	borderColor: '#BDBDBD',
	   	borderWidth: 1,
	   	borderRadius: 7,
	   }}
	   blurOnSubmit={false}
	   value={props.value}
	/>
  );
};
export default CustomTextInput;