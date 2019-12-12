import React from 'react';
import {TextInput, View} from 'react-native';
import {styles, ItemsContainer, ItemTitle} from './styles.js';

const InputList = ({item, context, onChange}) => {
  return (
    <ItemsContainer>
      <ItemTitle numberOfLines={1}>{item.detail_description}</ItemTitle>
      <View>
        <TextInput
          id={item.orderDetail_id}
          value={String(item.collected_quantity)}
          blurOnSubmit={false}
          onChangeText={text => {
            console.log('context', context);
            const index = context.findIndex(i => i.id === item.id);
            item.collected_quantity = text;
            const res = context[index];
            onChange(res);
          }}
          returnKeyType="next"
          keyboardType="number-pad"
          style={styles.input}
        />
      </View>
    </ItemsContainer>
  );
};

export default InputList;
