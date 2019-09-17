import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Test extends Component {
   state = {
      myState: 'Lorem ipsum dolor sit amet.'
   }
   updateState = () => this.setState({ myState: 'The state is updated' })
   render() {
      return (
         <View>
            <Text onPress = {this.updateState}>
               {this.state.myState}
            </Text>
         </View>
      );
   }
}
export default Test;