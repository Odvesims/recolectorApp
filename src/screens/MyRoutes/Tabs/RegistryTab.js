import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {styles, HeaderItems} from '../styles';
import InputList from '../../../components/inputList/InputList';
// import {InputList} from '../../../components/inputList/InputList';

import {Consumer} from '../Registry';

const RegistryTab = ({onChangeHandler}) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <HeaderItems>
        <Text style={styles.bodyHeader}>
          {global.translate('header.articles')}
        </Text>
        <Text style={styles.bodyHeader}>
          {global.translate('form.label.quantity')}
        </Text>
      </HeaderItems>
      <View style={{marginHorizontal: 12}}>
        <KeyboardAwareScrollView>
          <Consumer>
            {context => (
              <FlatList
                extraData={context}
                data={context}
                keyExtractor={item => item.order_id}
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
