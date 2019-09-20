/*Custom Text*/
import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';
import {testAlert} from '../helpers/components_helper';
import {NormalizeText} from '../helpers/components_helper';
const NormalText = props => {
  return <Text style={[styles.text, props.style]}>{props.text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    color: '#111825',
    fontSize: NormalizeText(16),
  },
});
export default NormalText;
