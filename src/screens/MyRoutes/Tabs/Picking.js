import React from 'react';
import {theme} from '../../../constants';
import {Text, View, FlatList, TextInput} from 'react-native';
import {styles} from '../styles';
import {CustomTextInput} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Consumer} from '../Registry';

import styled from 'styled-components/native';

const Picking = ({renderView, onChangeHandler}) => {
  const renderItem = ({item}) => {
    return (
      <ItemsContainer>
        <ItemTitle numberOfLines={1}>{item.detail_description}</ItemTitle>
        <View>
          <TextInput
            id={item.orderDetail_id}
            value={item.collected_quantity}
            blurOnSubmit={false}
            onChangeText={text => {
              console.log(item);
              item.collected_quantity = text;
              // console.log(data(item[item.id].collected_quantity));
              onChangeHandler(item.collected_quantity, item.id);
            }}
            returnKeyType="next"
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>
      </ItemsContainer>
    );
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <HeaderItems>
        <Text style={styles.bodyHeader}>Articulos</Text>
        <Text style={styles.bodyHeader}>{renderView}</Text>
      </HeaderItems>
      <View style={{marginHorizontal: 12}}>
        <KeyboardAwareScrollView>
          <Consumer>
            {context => (
              <FlatList
                style={{overflow: 'hidden'}}
                data={context.picking}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return (
                    <ItemsContainer>
                      <ItemTitle numberOfLines={1}>
                        {item.detail_description}
                      </ItemTitle>
                      <View>
                        <TextInput
                          id={item.orderDetail_id}
                          value={item.collected_quantity}
                          blurOnSubmit={false}
                          onChangeText={text => {
                            // console.log(item);
                            // console.log(data(item[item.id].collected_quantity));
                            const index = context.picking.findIndex(
                              i => i.id === item.id,
                            );
                            // console.log('index ==>', index);
                            item.collected_quantity = text;
                            onChangeHandler(
                              context.picking[index],
                              item.collected_quantity,
                            );
                          }}
                          returnKeyType="next"
                          keyboardType="number-pad"
                          style={styles.input}
                        />
                      </View>
                    </ItemsContainer>
                  );
                }}
                maxToRenderPerBatch={10}
                windowSize={10}
                extraData={context}
              />
            )}
          </Consumer>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Picking;

const HeaderItems = styled.View`
  flex-direction: row;
  flex-grow: 1;
  padding-vertical: 12px;
  background-color: ${theme.colors.gray3};
  justify-content: space-between;
  padding-horizontal: 12;
`;

const ItemTitle = styled.Text`
  flex: 1;
  text-align: left;
  ${'' /* width: 180px; */}
  overflow: hidden;
  font-size: 14px;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding-vertical: 12;
  align-items: center;
`;

const InputValues = styled(CustomTextInput)`
  flex-basis: 80px;
  flex-shrink: 42px;
  ${'' /* margin-left: 8px; */}
  padding: 12px;
  ${'' /* flex-grow: 1; */}
  background-color: #fff;
  border-color: #bdbdbd;
  border-width: 1px;
  border-radius: 4px;
`;
