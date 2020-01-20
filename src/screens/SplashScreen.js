import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {theme} from '../constants';

import {
  tableDatabaseVersion,
  getDatabaseVersion,
  setUserTable,
  updateDatabaseVersion,
} from '../helpers/sql_helper';

export class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      loadingMessage: 'MESSAGE_INITIAL_CONFIG',
    };
  }
  performTimeConsumingTask = async () => {
    return new Promise((resolve, reject) => {
      tableDatabaseVersion(global.database_version).then(dbDone => {
        console.log('dbDone ==>', dbDone);
        if (dbDone) {
          getDatabaseVersion().then(result => {
            console.log('result ==>', result);
            console.log(
              'result comparison ==>',
              result.currentVersion,
              result.storedVersion,
            );
            if (result.currentVersion > result.storedVersion) {
              setUserTable().then(res => {
                console.log('res ==>', res);
                updateDatabaseVersion(global.database_version).then(ud => {
                  console.log('ud ==>', ud);
                });
              });
            }
            setTimeout(() => {
              resolve('result');
            }, 1000);
          });
        }
      });
    });
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/Logo.png')} />
        <Text style={styles.text}> RecolectorApp </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },

  logo: {
    width: 200,
    height: 200,
  },

  text: {
    color: theme.colors.white,
    fontSize: theme.sizes.h1,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
