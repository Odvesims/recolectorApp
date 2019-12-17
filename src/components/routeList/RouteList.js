import React from 'react';
import styled from 'styled-components/native';
import {styles, ListBody, More, Description} from './styles';
import {Item, Button, Icon} from 'native-base';
import {View, Text} from 'react-native';

const RouteList = ({onPress, item, label}) => {
  console.log('RouteList', item);
  return (
    <Item style={styles.list}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
        <View key={item.key} style={styles.listContainer}>
          <Description>{item.description}</Description>
          <ListBody>
            <Text style={styles.address}>
              {global.translate(label)}: {item.employee_name}
            </Text>
          </ListBody>
        </View>
      </View>
      <More transparent onPress={onPress}>
        <Icon style={{color: 'gray'}} name="more" />
      </More>
    </Item>
  );
};

export default RouteList;
