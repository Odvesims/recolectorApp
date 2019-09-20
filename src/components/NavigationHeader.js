import React, {Component} from 'react';
import {Icon, Button, Header, Body, Left, Right, Title} from 'native-base';

class NavigationHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" onPress={this.props.navigation.openDrawer} />
          </Button>
        </Left>
        <Body>
          <Title>Inicio</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="notifications" />
          </Button>
        </Right>
      </Header>
    );
  }
}
export default NavigationHeader;
