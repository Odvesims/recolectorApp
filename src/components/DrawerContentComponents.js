import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {Icon} from 'native-base';
import {white} from 'ansi-colors';
import {HorizontalLine} from './HorizontalLine';

export default class DrawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer} />
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey === 'HomeScreen'
                ? styles.activeBackgroundColor
                : null,
            ]}>
            <Icon
              name="home"
              style={{fontSize: 18, marginLeft: 20, marginRight: 10}}
            />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == 'HomeScreen'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen('HomeScreen')}>
              Home
            </Text>
          </View>
          <HorizontalLine />
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'Settings'
                ? styles.activeBackgroundColor
                : null,
            ]}>
            <Icon
              name="settings"
              style={{fontSize: 18, marginLeft: 20, marginRight: 10}}
            />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey === 'Settings'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen('Settings')}>
              Settings
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    height: 150,
  },
  headerText: {
    color: '#fff8f8',
  },
  screenContainer: {
    paddingTop: 20,
    width: '100%',
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  screenTextStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedTextStyle: {
    fontWeight: 'bold',
  },
  activeBackgroundColor: {
    backgroundColor: '#F2F2F2',
  },
});
