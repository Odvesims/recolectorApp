import React, {Component} from 'react';
import {theme} from '../../constants';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

import styled from 'styled-components/native';
import {SearchBar} from '../../components';
import {View, StyleSheet, FlatList} from 'react-native';
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

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataAll: [],
      value: '',
      isloading: false,
      error: null,
      modalVisible: false,
      show: false,
      BUTTONS: [
        {text: 'Delete', icon: 'trash', iconColor: theme.colors.accent},
        {text: 'Edit', icon: 'create', iconColor: theme.colors.primary},
        {text: 'Cancel', icon: 'close', iconColor: theme.colors.gray},
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
    // this.arrData = [];
    // this.arrayholder = [];
  }

  // searchHandler = event => {
  //   event.preventDefault();
  //   console.log(this.searchBarRef.current);
  // };

  componentDidMount() {
    this.fetchData();
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    //   try {
    //     let item = this.props.navigation.state.params.selItem;
    //     if (item !== undefined) {
    //       this.arrData.push(item);
    //       this.setState({data: this.arrData});
    //     }
    //   } catch (err) {
    //     alert(err);
    //   }
    // });
  }

  componentWillUnmount() {
    // this.focusListener.remove();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  showHideSearchBar = () => {
    // this.setState({show: true});
    if (this.state.show === true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  fetchData = () => {
    this.setState({loading: true});
    const url = 'https://jsonplaceholder.typicode.com/users';
    this.setState({loading: true});
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          loading: false,
          data: res,
          dataAll: res,
        });

        // this.arrayholder = res;
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  // searchFilter = (text, name) => {
  //   const {arrayData} = this.state;
  //   let newData = arrayData;
  //   newData = arrayData.filter(item => {
  //     const itemData = `${item[name].toLowerCase()}`;
  //     const textData = text.toLowerCase();
  //     return itemData.indexOf(textData) > -1;
  //   });
  //   this.setState({data: newData, query: text});
  // };

  renderItem = ({item}) => {
    const {navigate} = this.props.navigation;
    return (
      <Item
        style={[styles.list, item.selectedClass]}
        onPress={() =>
          navigate('RouteDetail', {
            routeName: item.name,
            date: this.state.date,
            onGoBack: () => this.refresh(true),
            email: item.email,
            zipcode: item.address.zipcode,
            info: item,
          })
        }>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
          }}>
          <View key={item.key} style={styles.listContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.name}>
                {item.name}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.address}>
              {item.address.street}
            </Text>
          </View>
        </View>
      </Item>
    );
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  listEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Text>No hay resultados</Text>
      </View>
    );
  };

  handler = (data, text) => {
    this.setState({
      data: data,
      query: text,
    });
  };

  render() {
    const {modalVisible, data, loading, show} = this.state;

    let content = (
      <ContentLoader>
        <Rect x="0" y="20" rx="5" ry="5" width="250" height="12" />
        <Rect x="0" y="40" rx="5" ry="5" width="180" height="12" />
      </ContentLoader>
    );

    if (!loading) {
      content = (
        <FlatList
          ListEmptyComponent={this.listEmpty}
          keyboardShouldPersistTaps={'handled'}
          // style={{overflow: 'hidden'}}
          data={data}
          extraData={this.state}
          keyExtractor={item => item.id} //.toString()
          renderItem={this.renderItem}
        />
      );
    }

    return (
      <Root>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{global.translate('TITLE_MYROUTES')}</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.showHideSearchBar}>
                <Icon name="search" />
              </Button>
            </Right>
          </Header>

          {/* SearchBar */}
          {show ? (
            <SearchBar
              arrayData={this.state.arrayData}
              data={this.handler}
              dataValue={this.state.dataAll}
              ref={this.searchBarRef}
              style={styles.searchbar}
              placeholder={'Busque su orden'}
              // filter={text => {
              //   this.searchFilter(text, 'name');
              // }}
              onPressCancel={() => {
                this.showHideSearchBar();
              }}
              // onPressClear={() => {
              //   this.searchFilter('');
              // }}
            />
          ) : null}

          {/* SearchBar */}

          <Content
            style={{
              flexDirection: 'column',
              flex: 1,
              backgroundColor: theme.colors.lightGray,
              padding: 12,
            }}>
            {content}
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // height: 500,
  },

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

  name: {
    flexBasis: 150,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'scroll',
    flexGrow: 2,
    flexWrap: 'nowrap',
  },
});

export default Order;
