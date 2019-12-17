<<<<<<< HEAD
import React from 'react';
import {View, TextInput} from 'react-native';
import {Icon} from 'native-base';
import styled from 'styled-components/native';
import {theme} from '../../constants';
import proptypes from 'prop-types';

const InputLogin = React.memo(
  ({
    inputstyle,
    iconName,
    labelStyle,
    keyboardType,
    multiline,
    numberOfLines,
    onChangeText,
    onSubmitEditing,
    blurOnSubmit,
    placeholder,
    returnKeyType,
    secured,
    label,
    value,
    ref,
    id,
    ...props
  }) => {
    return (
      <View>
        <LabelForm style={labelStyle} id={id}>
          {label}
        </LabelForm>
        <InputForm>
          <InputIcon name={iconName} />
          <InputField
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            placeholderTextColor="#007FFF"
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secured}
            blurOnSubmit={blurOnSubmit}
            ref={ref}
            value={value}
            {...props}
            style={inputstyle}
          />
        </InputForm>
      </View>
    );
  },
);

export default InputLogin;

InputLogin.proptypes = {
  inputstyle: proptypes.style,
  iconName: proptypes.string,
  labelStyle: proptypes.style,
  keyboardType: proptypes.string,
  multiline: proptypes.boolstring,
  numberOfLines: proptypes.numberstring,
  onChangeText: proptypes.funcstring,
  onSubmitEditing: proptypes.funcstring,
  blurOnSubmit: proptypes.boolstring,
  placeholder: proptypes.string,
  returnKeyType: proptypes.string,
  secured: proptypes.boolstring,
  textLabel: proptypes.string,
  value: proptypes.funcstring,
  ref: proptypes.func,
  id: proptypes.string,
};
=======
import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {Container, Header, Content, Item, Input, Icon} from 'native-base';
import styled from 'styled-components/native';
import {theme} from '../../constants';
import {CustomTextInput} from '../../components';
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0

const LabelForm = styled.Text`
  margin-top: 20px;
  text-align: left;
`;

const InputField = styled(TextInput)`
  flex: 1;
`;

const InputForm = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  margin-top: 10px;
  border-color: #bdbdbd;
  border-width: 1px;
  border-radius: 7px;
  background-color: white;
`;

const InputIcon = styled(Icon)`
  color: ${theme.colors.gray2};
  align-items: center;
  font-size: 24px;
  margin-right: 12px;
`;
<<<<<<< HEAD
=======

export default class InputLogin extends Component {
  render() {
    const {
      inputstyle,
      iconName,
      labelStyle,
      keyboardType,
      multiline,
      numberOfLines,
      onChangeText,
      onSubmitEditing,
      placeholder,
      returnKeyType,
      secured,
      textLabel,
      value,
      id,
      ...props
    } = this.props;

    return (
      <View>
        <LabelForm style={labelStyle} id={id}>
          {textLabel}
        </LabelForm>
        <InputForm>
          <InputIcon name={iconName} />
          <InputField
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            placeholderTextColor="#007FFF"
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            numberOfLines={numberOfLines}
            multiline={multiline}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secured}
            blurOnSubmit={false}
            value={value}
            {...props}
            style={inputstyle}
          />
        </InputForm>
      </View>
    );
  }
}
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
