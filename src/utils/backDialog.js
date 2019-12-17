import React from 'react';
import {Alert} from 'react-native';

export const backDialog = onPress => {
  Alert.alert(
    'Alerta',
    'Al salir perderá los datos agregados a su nueva orden',
    [
      {
        text: 'Permanecer',
        onPress: () => {
          '';
        },
        style: 'cancel',
      },
      {
        text: 'Salir',
        onPress: onPress,
      },
    ],
    {cancelable: false},
  );
};
