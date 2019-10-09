/*Custom Text*/
import React from 'react';
import {Text, StyleSheet} from 'react-native';
const NormalText = props => {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: 16,
  },
});
export default NormalText;
