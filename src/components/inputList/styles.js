import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {CustomTextInput} from '../../components';
import {theme} from '../../constants';

export {HeaderItems, ItemTitle, ItemsContainer, InputValues, styles};

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
  padding: 12px;
  background-color: #fff;
  border-color: #bdbdbd;
  border-width: 1px;
  border-radius: 4px;
`;

const styles = StyleSheet.create({
  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
    fontSize: 20,
    width: 100,
  },
});
