import React, {PureComponent} from 'react';
import {Text, View,TextInput} from 'react-native';
import {Button,Icon} from 'native-base';

export default class InputNumber extends PureComponent {

    state={
        value:{},
    }

    changeQuantity = (value) => {
        this.setState({
          quantity: value,
          total: this.state.article_price * value,
          selItem: {
            item: this.state.theItem.Name.split('-')[0],
            description: this.state.theItem.Name.split('-')[1],
            price: this.state.theItem.Code,
            quantity: value,
            line_type: this.state.theItem.Type,
            line_id: this.state.theItem.Id,
          },
        });
      }

  render() {

    
    return (
        <View style={styles.paddingBottom}>
        <Text>{global.translate('TITLE_QUANTITY')}</Text>
        <View
          style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Button bordered style={{color: 'yellow'}}>
            <Icon name="add" />
          </Button>
          <TextInput
            ref={input => {
              this.secondTextInput = input;
            }}
            value={}
            style={styles.inputNumber}
            keyboardType="number-pad"
            onChangeText={quantity => {
              this.changeQuantity(quantity);
            }}
          />
          <Button bordered>
            <Icon name="remove" />
          </Button>
        </View>
      </View>
    );
  }
}
