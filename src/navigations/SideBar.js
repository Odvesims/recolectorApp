import React from 'react';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {theme} from '../constants';

import {StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {Text, View, Badge, Icon, Button} from 'native-base';

const SideBar = props => {
  // console.log('props', props);
  return (
    <ScrollView>
      <View style={styles.content}>
        <View>
          <Text style={styles.user}>{global.userDisplayName}</Text>
          <Badge primary style={styles.role}>
            <Text>{global.translate(global.userRole)}</Text>
          </Badge>
        </View>
      </View>

      <DrawerNavigatorItems {...props} labelStyle={styles.label} />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            global.translate('message.sign_out'),
            global.translate('message.close_question'),
            [
              {
                text: global.translate('form.picking.yes'),
                onPress: () => props.navigation.navigate('Auth'),
              },
              {
                text: global.translate('form.picking.no'),
                onPress: () => props.navigation.goBack(null),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          )
        }
        style={{
          flexDirection: 'row',
        }}>
        <Button transparent style={styles.iconContainer}>
          <Icon name="log-out" style={styles.menuIcon} />
        </Button>
        <Text style={{marginLeft: 8, color: theme.colors.black}}>
          {global.translate('links.logout')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.darkGray,
    paddingHorizontal: theme.sizes.p12,
    paddingVertical: theme.sizes.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: theme.sizes.base,
    paddingBottom: theme.sizes.p8,
  },
  role: {borderRadius: 4, backgroundColor: theme.colors.primary},
  iconContainer: {
    width: 55,
    height: 25,
  },
  menuIcon: {
    color: theme.colors.gray,
  },
  andris: {color: '#7D7D7D'},
  label: {fontSize: 16, fontWeight: '200'},
});
