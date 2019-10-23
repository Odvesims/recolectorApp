import React, {Component} from 'react';
import {theme} from '../../constants';
import styled from 'styled-components/native';
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
  Content,
} from 'native-base';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {getStoredClients} from '../../helpers/sql_helper';

export default class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.state.params.info,
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
    this.arrData = [];
  }

  //   componentDidMount() {
  /*this.focusListener = this.props.navigation.addListener('didFocus', () => {
      try {
        let item = this.props.navigation.state.params.selItem;
        if (item !== undefined) {
          this.arrData.push(item);
          this.setState({data: this.arrData});
        }
      } catch (err) {
        alert(err);
      }
    });*/
  //   }

  //   componentWillUnmount() {
  //     // this.focusListener.remove();
  //   }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderItem = dataList => (
    <Item style={[styles.list, dataList.selectedClass]} onPress={() => {}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
        <View key={dataList.key} style={styles.listContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={styles.name}>
              {dataList.name}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.address}>
            {dataList.address.street}
          </Text>
        </View>
      </View>
    </Item>
  );

  render() {
    const {modalVisible, data} = this.state;
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;
    const {state, navigate} = this.props.navigation;

    let info = state.params.info;

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
              <Title>{`${state.params.routeName}`}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => navigate('')}>
                <Icon name="checkmark" />
              </Button>
            </Right>
          </Header>

          {/* Content */}
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              backgroundColor: theme.colors.lightGray,
            }}>
            <View style={styles.RouteDetails}>
              <View style={styles.currentDate}>
                <Text style={styles.currentDateText}>Ruta</Text>
                <Text
                  style={
                    ({marginLeft: 4, backgroundColor: 'blue'},
                    styles.currentDateText)
                  }>
                  {`: ${state.params.routeName}`}
                </Text>
              </View>
              <View style={styles.currentDate}>
                <Text style={styles.currentDateText}>
                  {global.translate('TITLE_DATE')}
                </Text>
                <Text style={({marginLeft: 4}, styles.currentDateText)}>
                  {`: ${state.params.date}`}
                </Text>
              </View>
            </View>

            <View style={{flex: 1}}>
              <View style={styles.addPoint}>
                <View style={{paddingBottom: 8}}>
                  <Text style={styles.detailText}>Ordenes</Text>
                </View>
                <ScrollView>
                  <View>
                    <FlatList
                      style={{overflow: 'hidden', marginBottom: 12}}
                      data={data}
                      keyExtractor={item => item.id.toString()}
                      renderItem={item => this.renderItem(item)}
                    />
                    <Button onPress={() => navigate('Registry')}>
                      <Text>Ir</Text>
                    </Button>
                  </View>
                </ScrollView>
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

  RouteDetails: {backgroundColor: 'white', padding: 16},

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

  addPoint: {
    padding: theme.sizes.padding,
    marginBottom: 24,
  },

  name: {
    flexBasis: 150,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'scroll',
    flexGrow: 2,
    flexWrap: 'nowrap',
  },

  quantity: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },
});
