import React, {Component} from 'react';
import {theme} from '../../constants';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  TouchableOpacity,
  CheckBox,
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
export default class Active extends Component {
  state = {
    data: [],
    dataSelected: [],
    isChecked: null,
    loading: false,
    show: true,
  };

  componentDidMount() {
    this.fetchData().then(result => {
      if (this.props.navigation.state.params.checkedItems !== undefined) {
        this.checkItems(
          this.props.navigation.state.params.checkedItems,
          result,
        ).then(res => {
          this.setState({
            data: res,
            isChecked: true,
          });
        });
      }
    });
  }

  /*fetchData() {
    return new Promise((resolve, reject) => {
      let not_assigned;
      getNotAssignedOrders().then(not_assigned => {
        not_assigned = not_assigned.map(item => {
          item.isSelect = false;
          item.isChecked = false;
          item.selectAll = false;
          item.selectedClass = styles.list;
          return item;
        });
      });
      resolve(not_assigned);
    });
  }*/

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

  checkItems(dataList, data) {
    return new Promise((resolve, reject) => {
      dataList.map(i => {
        const index = this.state.data.findIndex(item => i.id === item.id);
        data[index] = i;
      });
      resolve(data);
    });
  }

  insertInArr(selected) {
    return new Promise((resolve, reject) => {
      selectedData.push(selected);
      resolve(selectedData);
    });
  }

  removeDuplicates(myArr, prop) {
    return new Promise((resolve, reject) => {
      resolve(
        myArr.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        }),
      );
    });
  }

  setSelectedArr(selected) {
    return new Promise((resolve, reject) => {
      let list = selectedData;
      let newArr = [];
      list.map(item => {
        if (item.isChecked) {
          newArr.push(item);
        }
      });
      resolve(newArr);
    });
  }

  selectItem = dataList => {
    const {data} = this.state;
    dataList.item.isSelect = !dataList.item.isSelect;
    dataList.item.isChecked = !dataList.item.isChecked;
    dataList.item.selectedClass = dataList.item.isSelect
      ? styles.selected
      : styles.list;

    const index = this.state.data.findIndex(
      item => dataList.item.id === item.id,
    );

    data[index] = dataList.item;
    if (dataList.item.isSelect) {
      this.insertInArr(dataList.item).then(s => {
        this.setSelectedArr(dataList.item).then(res => {
          this.removeDuplicates(res, 'id').then(result => {
            this.setState({
              dataSelected: result,
              data: this.state.data,
              isChecked: true,
            });
          });
        });
      });
    } else {
      this.setSelectedArr(dataList.item).then(res => {
        this.removeDuplicates(res, 'id').then(result => {
          this.setState({
            dataSelected: result,
            data: this.state.data,
            isChecked: true,
          });
        });
      });
    }
  };

  selectAll = dataList => {
    dataList.item.isSelect = !dataList.item.isSelect;
    dataList.item.isChecked = !dataList.item.isChecked;
    dataList.item.isSelectedAll = !dataList.item.isSelectedAll;
    dataList.item.selectedClass = dataList.item.isSelect
      ? styles.selected
      : styles.list;

    const index = this.state.data.findIndex(
      item => dataList.item.id === item.id,
    );
    this.state.data[index] = dataList.item;
    this.setState({
      data: this.state.data,
      isChecked: true,
      isSelectedAll: true,
    });
  };

  //   ({item, index})
  goToNewRoute = item => {
    this.props.navigation.navigate('NewRoute', {selected: item});
  };

  renderItem = dataList => (
    <Item style={[styles.list, dataList.item.selectedClass]} onPress={() => {}}>
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
            this.selectItem(dataList);
          }}
          value={dataList.item.isChecked}
          //   isChecked={isChecked[index]}
        />
        <View key={dataList.item.key} style={styles.listContainer}>
          <Text style={styles.code}>
            {global.translate('TITLE_CODE')}: {dataList.item.document}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text numberOfLines={1} style={styles.name}>
              {dataList.item.client} - {dataList.item.name}
            </Text>
            <Text numberOfLines={1} style={styles.price}>
              $ {dataList.item.order_total}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.address}>
            {dataList.item.address}
          </Text>
        </View>
      </View>
    </Item>
  );

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
          extraData={this.state}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          // initialNumToRender={10}
          // ListHeaderComponent={this.renderHeader}
        />
      );
    }

    // const {isChecked} = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_AVAILABLE')}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate('NewRoute', {
                  orders: dataSelected,
                });
              }}>
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
              <Text style={styles.number}>Seleccionados: {itemNumber}</Text>
              <Text style={styles.number}>Seleccionados: {selectedItems}</Text>
            </View>
            <Text
              onChange={dataList => {
                this.selectAll(dataList);
              }}
              style={{
                color: theme.colors.primary,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              Seleccionar todos
            </Text>
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

//   showHideSearchBar = () => {
//     this.setState(previousState => ({show: !previousState.show}));
//   };

//   componentWillMount() {
//     let {data, isChecked} = this.state;
//     let intialCheck = data.map(x => false);
//     this.setState({isChecked: intialCheck});
//   }

//   handleChange = index => {
//     let isChecked = [...this.state.isChecked];
//     isChecked[index] = !isChecked[index];
//     this.setState({isChecked});
//   };

//   renderHeader = () => {
//     return <SearchBar placeholder="Type Here..." />;
//   };

//   {
//     code: 1983,
//     name: 'Oscar Valdez Gonzalo Medina asdasa',
//     address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
//     totalPrice: '200,000',
//   },
//   {
//     code: 1983,
//     name: 'Oscar Valdez Gonzalo',
//     address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
//     totalPrice: 200,
//   },
//   {
//     code: 1983,
//     name: 'Oscar Valdez Gonzalo ',
//     address: 'Las Palmas de Alma Rosa, Santodsaasdasdaddasdas Domingo Este',
//     totalPrice: 200,
//   },
//   {
//     code: 1983,
//     name: 'Oscar Valdez Gonzalo Peña Nieto sadsds',
//     address: 'Las Palmas de Alma Rosa, Santo Domingo Este',
//     totalPrice: 20000000,
//   },
//   {
//     code: 1983,
//     name: 'Oscar Valdez Gonzalo asdsafasdadsada',
//     address: 'Las Palmas de Alma Rosa, Santo Domingo Este saddsads',
//     totalPrice: 200,
//   },
