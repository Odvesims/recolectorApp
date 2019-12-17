/*Custom Button*/
import React from 'react';
<<<<<<< HEAD
import {Text, StyleSheet} from 'react-native';
=======
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
import {View, Button} from 'native-base';
import styled from 'styled-components/native';
import {theme} from '../../constants';

<<<<<<< HEAD
const ActionButton = React.memo(({cancel, accept}) => {
=======
const ActionButton = ({cancel, accept}) => {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
  return (
    <View style={styles.actionContainer}>
      <CButton bordered onPress={cancel}>
        <Text style={{color: theme.colors.darkGray}}>
          {global.translate('TITLE_CANCEL')}
        </Text>
      </CButton>
      <CButton onPress={accept}>
        <Text>{global.translate('TITLE_ACCEPT')}</Text>
      </CButton>
    </View>
  );
<<<<<<< HEAD
});

export default ActionButton;

const CButton = styled(Button)`
  background: ${props => (props.bordered ? 'transparent' : ' #4285f4')};
  border-color: ${props =>
    props.bordered ? theme.colors.gray : ' transparent'};
  border: ${props => (props.bordered ? '3px solid gray' : '#4285f4')};
  text-transform: uppercase;
  flex-basis: 48%;
  justify-content: center;
`;

=======
};
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes.padding,
  },

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },

  actionContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexBasis: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
});
<<<<<<< HEAD
=======

export default ActionButton;

const CButton = styled(Button)`
  background: ${props => (props.bordered ? 'transparent' : ' #4285f4')};
  border-color: ${props =>
    props.bordered ? theme.colors.gray : ' transparent'};
  border: ${props => (props.bordered ? '3px solid gray' : '#4285f4')};
  text-transform: uppercase;
  flex-basis: 48%;
  justify-content: center;
`;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
