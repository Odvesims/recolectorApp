import PickerModal from 'react-native-picker-modal-view';
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'native-base';

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: props.placeholder,
    };
  }

  clearHolder = () => {
    this.setState({placeholder: ''});
  };

  onSelected = selected => {
    this.setState({
      placeholder: selected.Name,
    });
    this.props.selectedItem(selected);
  };

  render() {
    const {items, showAlphabeticalIndex} = this.props;
    const {placeholder} = this.state;
    return (
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
        onSelected={this.onSelected}
        showAlphabeticalIndex={showAlphabeticalIndex}
        autoGenerateAlphabeticalIndex={true}
        selectPlaceholderText={''}
        searchPlaceholderText={''}
        requireSelection={false}
        autoSort={false}
      />
    );
  }
}

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
