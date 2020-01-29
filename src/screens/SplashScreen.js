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
    const tableDb = await tableDatabaseVersion(global.database_version);
    console.log('dbDone ==>', tableDb);

    if (tableDb) {
      const dbVersion = await getDatabaseVersion();
      console.log('dbVersion ==>', dbVersion);

      if (dbVersion.currentVersion > dbVersion.storedVersion) {
        const setUser = await setUserTable();
        console.log('res ==>', setUser);

        const updateDB = await updateDatabaseVersion(global.database_version);
        console.log('ud ==>', updateDB);
      }
    }
    return tableDb;
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    console.log('data', data);
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
