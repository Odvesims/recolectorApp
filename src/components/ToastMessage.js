import React from 'react';
import {ToastAndroid} from 'react-native';

const Toast = ({visible, message}) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

const ToastMessage = ({visible, message}) => (
  <Toast visible={visible} message={message} />
);

export default ToastMessage;
