import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';

const EmptyList = () => {
  return (
    <ListBody>
      <Text>No hay resultados</Text>
    </ListBody>
  );
};
export default EmptyList;

const ListBody = styled.View`
  align-items: center;
  justify-content: center;
`;
