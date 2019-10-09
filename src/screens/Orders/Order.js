import React, {Component} from 'react';
import {theme} from '../../constants';
import styled from 'styled-components/native';
import CustomPicker from '../../components/CustomPicker';
import Detail from './Detail';
import {View, StyleSheet, FlatList, Modal, Alert} from 'react-native';
import {
  Container,
  Left,
  Right,
  Title,
  Body,
  Header,
  Button,
  Icon,
  Text,
  Form,
  Root,
  Item,
  ActionSheet,
} from 'native-base';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {getStoredClients} from '../../helpers/sql_helper';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      show: false,
      date: '',
      clients: [],
      client: '',
      client_address: '',
      client_city: '',
      client_state: '',
      client_phone: '',
      placeholder: global.translate('PLACEHOLDER_SELECT_CLIENT'),
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
    this.getClientsHandler();
    this.selectedItem = this.selectedItem.bind(this);
  }

  selectedItem(item) {
    this.setState({
      client: item.Name,
      client_address: item.Address,
      client_city: item.City,
      client_state: item.State,
      client_phone: item.Phone,
    });
  }

  getClientsHandler() {
    getStoredClients().then(clients => {
      this.setClientsPicker(clients).then(res => {
        this.setState({clients: res});
      });
    });
  }

  setClientsPicker(clients) {
    return new Promise((resolve, reject) => {
      let arrClients = [];
      for (let i = 0; i < clients.length; ++i) {
        let client = clients[i];
        arrClients.push({
          Name: client.client_code + '- ' + client.name,
          Code: client.client_code,
          Address: client.address,
          City: client.city,
          State: client.state,
          Phone: client.phone_number,
        });
      }
      resolve(arrClients);
    });
  }
  componentDidMount() {}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    let renderItem = ({item}) => (
      <Item style={styles.list}>
        <View
          key={item.key}
          style={{
            marginRight: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexBasis: '100%',
          }}>
          <Text style={styles.name}>{item.description}</Text>
          <Text style={styles.address}>{item.quantity}</Text>
        </View>
        <Button
          transparent
          style={styles.more}
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: 'Opciones',
              },
              buttonIndex => {
                this.setState({clicked: BUTTONS[buttonIndex]});
              },
            )
          }>
          <Icon style={{color: 'gray'}} name="more" />
        </Button>
      </Item>
    );
    const {modalVisible, data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>
                {global.translate(this.props.navigation.state.params.operation)}
              </Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('OrderScreen')}>
                <Icon name="checkmark" />
              </Button>
            </Right>
          </Header>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View>
              <View>
                <View style={styles.currentDate}>
                  <Text style={styles.currentDateText}>
                    {global.translate('TITLE_DATE')}
                  </Text>
                  <Text style={({marginLeft: 4}, styles.currentDateText)}>
                    {`: ${this.props.navigation.state.params.date}`}
                  </Text>
                </View>
                <Form style={styles.container}>
                  <View style={styles.paddingBottom}>
                    <Text>{global.translate('TITLE_CLIENT')}</Text>
                    <CustomPicker
                      items={this.state.clients}
                      placeholder={this.state.placeholder}
                      value={this.state.client}
                      selectedItem={this.selectedItem}
                    />
                    <Text style={styles.client_data}>
                      {this.state.client_address}
                    </Text>
                    <Text style={styles.client_data}>
                      {this.state.client_city}
                    </Text>
                    <Text style={styles.client_data}>
                      {this.state.client_state}
                    </Text>
                    <Text style={styles.client_data}>
                      {this.state.client_phone}
                    </Text>
                  </View>
                </Form>
              </View>
              <View style={{backgroundColor: 'gray'}}>
                <View style={styles.addPoint}>
                  <View style={{paddingBottom: 8}}>
                    <Text style={styles.detailText}>
                      {global.translate('TITLE_DETAILS')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonGhost}
                    onPress={() => {
                      this.props.navigation.navigate('Detail');
                    }}>
                    <Icon name="add" style={{color: theme.colors.primary}} />
                    <Text
                      style={{
                        marginLeft: 24,
                        fontSize: theme.sizes.base,
                        color: theme.colors.primary,
                        textTransform: 'uppercase',
                      }}>
                      {global.translate('TITLE_DETAILS')}
                    </Text>
                    <FlatList
                      style={{overflow: 'hidden'}}
                      data={data}
                      keyExtractor={item => item.id}
                      renderItem={renderItem}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  headerCodeText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: 'bold',
  },

  currentDate: {
    // display: 'flex',
    backgroundColor: theme.colors.lightGray,
    padding: 16,
    flexDirection: 'row',
  },
  currentDateText: {color: theme.colors.gray},

  container: {
    // flex: 1,
    padding: theme.sizes.padding,
  },

  client_data: {
    fontSize: 14,
  },

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    margin: 5,
    backgroundColor: 'white',
    height: 80,
    paddingLeft: 12,
    elevation: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },

  button: {
    fontSize: theme.sizes.caption,
    textTransform: 'uppercase',
    backgroundColor: '#4285F4',
  },

  textCenter: {
    alignItems: 'center',
  },

  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  label: {
    fontSize: theme.sizes.base,
    color: theme.colors.darkGray,
  },

  labelForgot: {
    color: theme.colors.primary,
    fontSize: theme.fonts.caption.fontSize,
    alignSelf: 'flex-end',
  },

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },

  addPoint: {
    // flex: 2,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.lightGray,
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

  buttonGhost: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default Order;