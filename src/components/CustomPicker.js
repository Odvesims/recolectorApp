import PickerModal from 'react-native-picker-modal-view';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from 'native-base';
import {theme} from '../constants';

const CustomPicker = ({
  disabled,
  selectPlaceholderText,
  placeholder,
  showAlphabeticalIndex,
  onSelected,
  items,
  label,
  children,
  errorMessage,
  ...props
}) => {
  let isLabel = label;
  let labelInfo = <Text>{global.translate(label)}</Text>;
  if (isLabel === null || isLabel === undefined) {
    labelInfo = null;
  }

  let isError = errorMessage;
  if (isError) {
    errorMessage = (
      <Text style={{color: 'red', fontSize: 12}}>{errorMessage}</Text>
    );
  }

  return (
    <React.Fragment>
      <View style={{paddingBottom: 12}}>
        {labelInfo}
        <PickerModal
          renderSelectView={(disabled, selected, showModal) => (
            <Button
              transparent
              style={[styles.input, !isError ? styles.default : styles.error]}
              disabled={disabled}
              onPress={showModal}>
              <Text>{placeholder}</Text>
            </Button>
          )}
          items={items}
          sortingLanguage={'es'}
          showToTopButton={true}
          selected={placeholder}
          onSelected={onSelected}
          showAlphabeticalIndex={showAlphabeticalIndex}
          autoGenerateAlphabeticalIndex={true}
          selectPlaceholderText={selectPlaceholderText}
          requireSelection={false}
          autoSort={false}
          disabled={disabled}
          {...props}
        />
        {children}
        {errorMessage}
      </View>
    </React.Fragment>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderRadius: 4,
    color: '#000',
  },

  error: {borderColor: theme.colors.accent},

  default: {
    borderColor: theme.colors.gray2,
  },
});
