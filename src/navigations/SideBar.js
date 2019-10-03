import React, {Component} from 'react';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {theme} from '../constants';
import {
  AppRegistry,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  View,
  Badge,
  Icon,
  Button,
} from 'native-base';

const primaryRoutes = [
  {
    name: 'HomeScreen',
    icon: 'home',
    text: 'TITLE_PRINCIPAL',
  },
  {
    name: 'ClientScreen',
    icon: 'people',
    text: 'TITLE_CLIENTS',
  },
  {
    name: 'RouteScreen',
    icon: 'navigate',
    text: 'TITLE_ROUTES',
  },
];

const secondaryRoutes = [
  {
    name: 'ConfigScreen',
    icon: 'settings',
    text: 'TITLE_CONFIGURATION',
  },
  {
    name: 'Logout',
    icon: 'log-out',
    text: 'TITLE_LOGOUT',
  },
];

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <View style={styles.content}>
          <View>
            <Text style={styles.user}>{global.userDisplayName}</Text>
            <Badge primary style={styles.role}>
              <Text>{global.translate(global.userRole)}</Text>
            </Badge>
          </View>

          <Button transparent>
            <Icon
              name="create"
              style={{
                color: theme.colors.primary,
              }}
            />
            {/* <Text style={{color: theme.colors.primary}}>Editar</Text> */}
          </Button>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <List
            style={{marginTop: 16}}
            dataArray={primaryRoutes}
            renderRow={data => {
              return (
                <ListItem
                  style={{
                    borderColor: 'transparent',
                  }}
                  button
                  onPress={() => this.props.navigation.navigate(data.name)}>
                  <Button transparent style={styles.iconContainer}>
                    <Icon name={data.icon} style={styles.menuIcon} />
                  </Button>
                  <Text style={{marginLeft: 8}}>
                    {global.translate(data.text)}
                  </Text>
                </ListItem>
              );
            }}
          />
          <View
            style={{
              justifyContent: 'flex-end',
            }}>
            <List
              style={{
                marginVertical: 16,
              }}
              dataArray={secondaryRoutes}
              renderRow={data => {
                return (
                  <ListItem
                    style={{
                      borderColor: 'transparent',
                    }}
                    button
                    onPress={() => this.props.navigation.navigate(data.name)}>
                    <Button transparent style={styles.iconContainer}>
                      <Icon name={data.icon} style={styles.menuIcon} />
                    </Button>
                    <Text style={{marginLeft: 8}}>
                      {global.translate(data.text)}
                    </Text>
                  </ListItem>
                );
              }}
            />
          </View>
        </View>
      </Container>
    );
  }
}

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
});
