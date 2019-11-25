import React from 'react';
import {View, StyleSheet} from 'react-native';

const HorizontalLine = () => {
  return <View style={style.line} />;
};
export default HorizontalLine;

const style = StyleSheet.create({
  line: {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
