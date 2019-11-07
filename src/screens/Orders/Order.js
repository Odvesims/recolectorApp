import React, {Component} from 'react';
import {theme} from '../../constants';
import {ButtonGroup} from 'react-native-elements';
import styled from 'styled-components/native';
import CustomPicker from '../../components/CustomPicker';
// import Detail from './Detail';
import {View, StyleSheet, FlatList, Modal, Alert} from 'react-native';
import {
  Container,
  Left,
  Right,
  Title,
  Body,
  Header,
  Icon,
  Text,
  Form,
  Root,
  Item,
  Button,
  ActionSheet,
  Content,
  Tabs,
  Tab,
  Segment,
} from 'native-base';

import Spinner from 'react-native-loading-spinner-overlay';
import DetailsTab from './Tabs/DetailsTab';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {getStoredClients} from '../../helpers/sql_helper';
import {dataOperation} from '../../helpers/apiconnection_helper';
import {
  printText,
  enableBT,
  connectBluetooth,
} from '../../helpers/bluetooth_helper';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      modalVisible: false,
      show: false,
      //
      selectedIndex: 0,
      categories: [],
      subcategories: [],
      articles: [],
      picker_data: [],
      article: '',
      article_price: '',
      quantity: 1,
      //
      picking: [],
      shopping: [],
      activePage: 1,
      //
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
    this.arrData = [];
    this.arrDataPicking = [];
    this.arrDataShopping = [];
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        let item = this.props.navigation.state.params.selItem;
        if (item !== undefined) {
          this.arrData.push(item);
          this.setState({picking: this.arrDataPicking});
        }
      } catch (err) {
        alert(err);
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  // Select
  selectComponent = activePage => () => this.setState({activePage});
  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };
  _renderComponent = () => {
    const {picking, shopping, activePage} = this.state;

    if (activePage === 0) {
      return (
        <DetailsTab tab_data={picking} navigation={this.props.navigation} />
      );
    } else {
      return (
        <DetailsTab tab_data={shopping} navigation={this.props.navigation} />
      );
    }
  };

  getClientsHandler = () => {
    getStoredClients().then(clients => {
      this.setClientsPicker(clients).then(res => {
        this.setState({clients: res});
      });
    });
  };

  execOperation = () => {
    let order_data = {
      setma_id: global.setma_id,
      client_code: this.state.client.split('-')[0],
      supervisor_code: global.employee_code,
      order_state: 'A',
      order_completed: false,
      order_details: this.state.data,
    };
    this.setState({loading: true, loadingMessage: 'MESSAGE_REGISTERING_ORDER'});
    dataOperation('ORDER_OPERATION', order_data).then(res => {
      if (res.valid) {
        if (global.printer_address === '') {
          alert(global.translate('ALERT_PRINTER_NOT_CONFIGURED'));
        } else {
          enableBT().then(e => {
            connectBluetooth(global.printer_name, global.printer_address).then(
              c => {
                printText(res.responseObject).then(p => {});
              },
            );
          });
        }
        alert(global.translate('ALERT_REGISTER_SUCCESFUL'));
        this.setState({
          client: '',
          client_address: '',
          client_city: '',
          client_state: '',
          client_phone: '',
          placeholder: '',
          selectedItem: [],
          data: [],
          loading: false,
        });
      } else {
        this.setState({loading: false});
      }
    });
  };

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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  selectedItem = item => {
    this.setState({
      theItem: item,
      article: item.Name,
      article_price: item.Code,
      total: item.Code * this.state.quantity,
      selItem: {
        item: item.Name.split('-')[0],
        description: item.Name.split('-')[1],
        price: item.Code,
        quantity: this.state.quantity,
        line_type: item.Type,
        line_id: item.Id,
      },
    });
  };

  renderItem = ({item}) => (
    <Item style={styles.list}>
      <View key={item.key} style={styles.listContainer}>
        <View
          key={item.key}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Name numberOfLines={1}>{item.description}</Name>
          <Quantity numberOfLines={1}>{item.quantity}</Quantity>
        </View>
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

  render() {
    let ClientInfo = null;
    const {client} = this.state;
    const buttons = ['Recolección', 'Compras']; //global.translate('TITLE_CATEGORY')];

    if (!client === '') {
      ClientInfo = (
        <View>
          <Text style={styles.client_data}>{this.state.client_address}</Text>
          <Text style={styles.client_data}>{this.state.client_city}</Text>
          <Text style={styles.client_data}>{this.state.client_state}</Text>
          <Text style={styles.client_data}>{this.state.client_phone}</Text>
        </View>
      );
    }

    const {modalVisible, data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    return (
      <Root>
        <Container>
          <Header>
            <Spinner
              visible={this.state.loading}
              textContent={global.translate(this.state.loadingMessage)}
              color={'CE2424'}
              overlayColor={'rgba(255, 255, 255, 0.4)'}
              animation={'slide'}
            />
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
              <Button transparent onPress={this.execOperation}>
                <Icon name="checkmark" />
              </Button>
            </Right>
          </Header>

          {/* Content */}
          <DetailContent>
            <View>
              {/* CurrentDate */}
              <CurrentDate style={styles.currentDate}>
                <Text style={styles.currentDateText}>
                  {global.translate('TITLE_DATE')}
                </Text>
                <Text style={({marginLeft: 4}, styles.currentDateText)}>
                  {`: ${this.props.navigation.state.params.date}`}
                </Text>
              </CurrentDate>

              {/*ClientForm*/}
              <Form style={styles.container}>
                <ClientForm>
                  <Text>{global.translate('TITLE_CLIENT')}</Text>
                  <CustomPicker
                    items={this.state.clients}
                    placeholder={this.state.placeholder}
                    selectedHolder={this.selectedItem.Name}
                    selectedItem={this.selectedItem}
                  />
                </ClientForm>
                {ClientInfo}
              </Form>
            </View>
            {/* Details */}
            <View style={{flex: 1}}>
              <View style={styles.addPoint}>
                <View style={{paddingBottom: 8}}>
                  <Text style={styles.detailText}>
                    {global.translate('TITLE_DETAILS')}
                  </Text>
                </View>
                {/* <ScrollView> */}
                <View>
                  {/* Tabs */}
                  <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 50}}
                  />

                  {this._renderComponent()}

                  <FlatList
                    style={{overflow: 'hidden', marginBottom: 12}}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem}
                  />
                </View>

                <ButtonOutlined
                  onPress={() => {
                    this.props.navigation.navigate('Detail');
                  }}>
                  <Icon name="add" style={{color: theme.colors.primary}} />
                  <TextButton>{global.translate('TITLE_DETAILS')}</TextButton>
                </ButtonOutlined>
                {/* </ScrollView> */}
              </View>
            </View>
          </DetailContent>
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
    backgroundColor: theme.colors.white,
  },

  client_data: {
    fontSize: 14,
  },

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
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

  addPoint: {
    padding: theme.sizes.padding,
    marginBottom: 24,
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

const ButtonOutlined = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.colors.primary};
  border-width: 1;
  padding-vertical: 12;
  border-radius: 4;
  align-items: center;
`;
const TextButton = styled.Text`
  margin-left: 24;
  font-size: ${theme.sizes.base};
  color: ${theme.colors.primary};
  text-transform: uppercase;
`;
const ClientForm = styled.View``;
const Name = styled.Text`
  flex-basis: 150;
  font-size: 16;
  color: black;
  font-weight: bold;
  overflow: scroll;
  flex-grow: 2;
  flex-wrap: nowrap;
`;
const Quantity = styled.Text`
  flex-shrink: 10;
  color: ${theme.colors.success};
  font-size: 14;
  font-weight: bold;
  flex-wrap: nowrap;
`;
const CurrentDate = styled.View``;
const DetailContent = styled.View`
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.lightGray};
`;

{
  /* <Segment style={{backgroundColor: 'transparent'}}>
                      <Button
                        first
                        active={this.state.activePage === 1}
                        onPress={this.selectComponent(1)}
                        style={{flex: 1, justifyContent: 'center'}}>
                        <Text>Venta</Text>
                      </Button>

                      <Button
                        last
                        active={this.state.activePage === 2}
                        onPress={this.selectComponent(2)}
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <Text>Compras</Text>
                      </Button>
                    </Segment> */
}
