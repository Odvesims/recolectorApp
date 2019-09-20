/*Custom Button*/
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {NormalizeText} from '../helpers/components_helper';

const BottomButton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#4285F4',
    color: '#ffffff',
    marginTop: 80,
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 4,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: NormalizeText(18),
  },
});
export default BottomButton;
