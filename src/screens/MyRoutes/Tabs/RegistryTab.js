import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {styles, HeaderItems} from '../styles';
import {CustomTextInput, InputList} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Consumer} from '../Registry';

const RegistryTab = ({renderView, onChangeHandler}) => {
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
                extraData={context}
                data={context}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <InputList
                    item={item}
                    context={context}
                    onChange={onChangeHandler}
                  />
                )}
                maxToRenderPerBatch={10}
                windowSize={10}
              />
            )}
          </Consumer>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default RegistryTab;
