import React from 'react';
import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';
import {theme} from '../../constants';

const SwipeHiddenList = ({label, onPress}) => {
  return (
    <TouchableHighlight style={styles.hiddenList} onPress={onPress}>
      <View>
        <Button transparent style={{alignSelf: 'flex-end', marginRight: 12}}>
          <Icon name="trash" style={{color: 'white'}} />
          <Text style={{color: 'white', fontFamily: 'Roboto-Medium'}}>
            {global.translate(label)}
          </Text>
        </Button>
      </View>
    </TouchableHighlight>
  );
};

export default SwipeHiddenList;

const styles = StyleSheet.create({
  hiddenList: {
    margin: 5,
    backgroundColor: '#c3000d',
    height: 80,
    elevation: 1,
  },
});
