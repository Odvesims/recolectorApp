import React, {Component} from 'react';
import {AppRegistry, Image, StatusBar} from 'react-native';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  View,
  Badge,
  Icon,
} from 'native-base';
import {theme} from '../constants';
const routes = ['HomeScreen', 'Clients', 'Routes', 'Configuration'];
export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View
            style={{
              backgroundColor: theme.colors.darkGray,
              paddingHorizontal: theme.sizes.p12,
              paddingVertical: theme.sizes.padding,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: theme.fonts.base,
                  paddingBottom: theme.sizes.p8,
                }}>
                Andris Ramirez Chireno
              </Text>
              <Badge primary>
                <Text>Supervisor</Text>
              </Badge>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="create"
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.sizes.base,
                }}
              />
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.sizes.small,
                  marginLeft: theme.sizes.p8,
                }}>
                Editar Perfil
              </Text>
            </View>
          </View>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Icon name="arrow-back" />
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
