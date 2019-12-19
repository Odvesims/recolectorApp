import React, {Component} from 'react';
import {theme} from '../../constants';
import CheckBox from '@react-native-community/checkbox';

import {styles} from './styles';

import {BtnIcon} from '../../components';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import {
  Content,
  Item,
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
          />
          <View key={item.key} style={styles.listContainer}>
            <Text style={styles.oCode}>
              {global.translate('TITLE_CODE')}: {item.order_document}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.oName}>
                {item.client} - {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                {`  $ ${item.order_total}`}
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
    const {data, loading} = this.state;
    const itemNumber = data.filter(item => item.isSelect).length;

    let orderList = (
      <ActivityIndicator size="large" color={theme.colors.primary} />
    );

    if (!loading) {
      orderList = (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
          extraData={this.state}
        />
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <BtnIcon iconName={'arrow-back'} onPress={this.goBack} />
          </Left>
          <Body>
            <Title>{global.translate('TITLE_AVAILABLE')}</Title>
          </Body>
          <Right>
            <BtnIcon
              label={'TITLE_DONE'}
              iconName={'checkmark'}
              onPress={this.goBack}
            />
          </Right>
        </Header>

        <Content style={styles.content}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.numberBox}>
              <Text style={styles.number}>
                {`${global.translate('TITLE_SELECTED')}: ${itemNumber}`}
              </Text>
            </View>
          </View>

          <ScrollView style={{marginBottom: 24}}>
            {/* FLATLIST */}
            {orderList}
          </ScrollView>
        </Content>
        {/* Content */}
      </Container>
    );
  }
}
