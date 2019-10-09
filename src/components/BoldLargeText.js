/*Custom Text*/
import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
const BoldLargeText = props => {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
export default BoldLargeText;
