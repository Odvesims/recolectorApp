/*Custom Button*/
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {View} from 'native-base';

const CustomButton = props => {
  return (
    <View style={props.style}>
      <TouchableOpacity style={styles.button} onPress={props.customClick}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#4285F4',
    color: '#ffffff',
    // margin: 12,
    padding: 12,
    borderRadius: 4,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default CustomButton;
