import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';

const Toast = props => {
  if (props.visible) {
    ToastAndroid.showWithGravityAndOffset(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

class ToastMessage extends Component {
  render() {
    return (
      <View>
        <Toast visible={this.props.visible} message={this.props.message} />
      </View>
    );
  }
}
export default ToastMessage;
