import React, {Component} from 'react';
import {theme} from '../../constants';
import CheckBox from '@react-native-community/checkbox';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// import ContentCustom from '../components';

import {
  Icon,
  Button,
  Content,
  Item,
  ActionSheet,
  SearchBar,
  Container,
  Header,
  Right,
  Left,
  Body,
  Title,
} from 'native-base';
import {getNotAssignedOrders} from '../../helpers/sql_helper';

const selectedData = [];
export default class OrderList extends Component {
  state = {
    data: [],
    dataSelected: [],
    isChecked: null,
    loading: false,
    show: true,
  };

  componentDidMount() {
    let {checkedItems} = this.props.navigation.state.params;
    this.fetchData().then(result => {
      if (checkedItems !== undefined) {
        this.checkItems(checkedItems, result).then(res => {
          this.setState({
            data: res,
            isChecked: true,
            isSelect: true,
            selectedClass: styles.selected,
          });
        });
        checkedItems = undefined;
      }
    });
  }

  checkItems(item, data) {
    return new Promise((resolve, reject) => {
      item.map(i => {
        const index = this.state.data.findIndex(d => i.order_id === d.order_id);
        data[index] = i;
      });
      resolve(data);
    });
  }

  fetchData = () => {
    return new Promise((resolve, reject) => {
      this.setState({loading: true});
      getNotAssignedOrders()
        .then(not_assigned => {
          not_assigned = not_assigned.map(item => {
            item.isSelect = false;
            item.isChecked = false;
            item.selectAll = false;
            item.selectedClass = styles.list;
            return item;
          });
          this.setState({
            loading: false,
            data: not_assigned,
          });
          resolve(not_assigned);
        })
        .catch(error => {
          this.setState({loading: false});
        });
    });
  };

  selectItem = item => {
    const {data} = this.state;
    item.isSelect = !item.isSelect;
    item.isChecked = !item.isChecked;
    item.selectedClass = item.isSelect ? styles.list : styles.list;

    const index = data.findIndex(d => d.id === item.id);

    data[index] = item;
    this.setState({
      dataSelected: data,
      data: data,
      isChecked: true,
    });
  };

  renderItem = ({item}) => {
    console.log('renderItem', item);

    return (
      <Item style={[styles.list, item.selectedClass]} onPress={() => {}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <CheckBox
            style={{marginRight: 8}}
            onChange={() => {
              this.selectItem(item);
            }}
            value={item.isChecked}
            //   isChecked={isChecked[index]}
          />
          <View key={item.key} style={styles.listContainer}>
            <Text style={styles.code}>
              {global.translate('TITLE_CODE')}: {item.order_document}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.name}>
                {item.client} - {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                $ {item.order_total}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.address}>
              {item.address}
            </Text>
          </View>
        </View>
      </Item>
    );
  };

  onPressHandler = () => {
    let arrSelected = [];
    this.state.data.map(i => {
      if (i.isChecked) {
        arrSelected.push({
          ...i,
          isChecked: true,
          isSelect: true,
        });
      }
    });
    this.props.navigation.navigate('Route', {
      orders: arrSelected,
    });
  };

  goBack = () => {
    let arrSelected = [];
    this.state.data.map(i => {
      if (i.isChecked) {
        arrSelected.push({
          ...i,
          isChecked: true,
          isSelect: true,
        });
      }
    });
    this.props.navigation.state.params.updateData(arrSelected);
    this.props.navigation.goBack();
  };

  render() {
    const {data, loading, dataSelected} = this.state;
    const itemNumber = data.filter(item => item.isSelect).length;
    const selectedItems = data.filter(item => {
      item.isSelect;
    });

    let orderList = (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    );

    if (!loading) {
      orderList = (
        <FlatList
          style={{overflow: 'hidden'}}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          extraData={this.state}
        />
      );
    }

    // const {isChecked} = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_AVAILABLE')}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.goBack}>
              <Icon name="checkmark" />
              <Text style={{color: 'white', marginLeft: 8}}>
                {global.translate('TITLE_DONE')}
              </Text>
            </Button>
          </Right>
        </Header>

        <Content style={styles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.numberBox}>
              <Text style={styles.number}>
                {global.translate('TITLE_SELECTED')}: {itemNumber}
              </Text>
            </View>
          </View>

          <ScrollView style={{marginBottom: 24}}>
            {/* FLATLIST */}
            {orderList}
            {/* FLATLIST */}
          </ScrollView>
        </Content>
        {/* Content */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
  list: {
    margin: 5,
    backgroundColor: theme.colors.white,
    height: 80,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  code: {
    textAlign: 'left',
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },

  numberBox: {
    marginBottom: theme.sizes.p8,
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

  price: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    elevation: 8,
  },

  more: {
    position: 'absolute',
    right: 0,
  },

  selected: {backgroundColor: '#E2FAE8'},
});
