import PickerModal from 'react-native-picker-modal-view';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Button} from 'native-base';

const CustomPicker = ({
  disabled,
  selected,
  showModal,
  placeholder,
  showAlphabeticalIndex,
  onSelected,
  items,
  props,
  label,
  children,
}) => {
  return (
    <React.Fragment>
      <View style={{paddingBottom: 12}}>
        <Text>{label}</Text>
        <PickerModal
          renderSelectView={(disabled, selected, showModal) => (
            <Button
              transparent
              style={styles.input}
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
          selectPlaceholderText={''}
          searchPlaceholderText={''}
          requireSelection={false}
          autoSort={false}
          disabled={disabled}
        />
        {children}
      </View>
    </React.Fragment>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    color: '#000',
  },
});
