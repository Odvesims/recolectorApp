import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  NativeModules,
} from 'react-native';
import {Icon} from 'native-base';
import HorizontalLine from './HorizontalLine';
import {getTranslation} from '../helpers/translation_helper';
export default class DrawerContentComponents extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  constructor(props) {
    super(props);
    this.state = {
      deviceLanguage: 'en',
    };
  }

  componentDidMount() {
    this.setState({loading: false});
    if (Platform.OS === 'android') {
      this.setState({
        deviceLanguage: NativeModules.I18nManager.localeIdentifier.split(
          '_',
        )[0],
      });
    } else {
      this.setState({
        deviceLanguage: NativeModules.SettingsManager.settings.AppleLocale.split(
          '_',
        )[0],
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}></View>
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'HomeScreen'
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
              {getTranslation(this.state.deviceLanguage, 'TITLE_PRINCIPAL')}
            </Text>
          </View>
          <HorizontalLine />
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'ClientsScreen'
                ? styles.activeBackgroundColor
                : null,
            ]}>
            <Icon
              name="people"
              style={{fontSize: 18, marginLeft: 20, marginRight: 10}}
            />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == 'ClientsScreen'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen('ClientsScreen')}>
              {getTranslation(this.state.deviceLanguage, 'TITLE_CLIENTS')}
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'RoutesScreen'
                ? styles.activeBackgroundColor
                : null,
            ]}>
            <Icon
              name="navigate"
              style={{fontSize: 18, marginLeft: 20, marginRight: 10}}
            />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == 'RoutesScreen'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen('RoutesScreen')}>
              {getTranslation(this.state.deviceLanguage, 'TITLE_ROUTES')}
            </Text>
          </View>
          <HorizontalLine />
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == 'ConfigScreen'
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
                this.props.activeItemKey == 'ConfigScreen'
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen('ConfigScreen')}>
              {getTranslation(this.state.deviceLanguage, 'TITLE_CONFIGURATION')}
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
