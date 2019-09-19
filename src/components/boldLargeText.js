/*Custom Text*/
import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { testAlert } from '../helpers/components_helper';
import { NormalizeText } from '../helpers/components_helper';
const BoldLargeText = props => {
  return <Text style={[styles.text, props.style]} onPress={ () => testAlert() }>{props.text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    color: '#111825',
	fontSize: NormalizeText(24),
	fontWeight: "bold",
  },
});
export default BoldLargeText;