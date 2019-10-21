import React, {Component} from 'react';
import {FetchingData} from '../components';

import {StyleSheet, Platform, BackHandler, Alert} from 'react-native';

import {
  Icon,
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Title,
} from 'native-base';

import {
  saveCategories,
  saveSubcategories,
  saveArticles,
  saveEmployees,
  saveRoutes,
  saveOrders,
} from '../helpers/sql_helper';
import {getData} from '../helpers/apiconnection_helper';

export default class Home extends Component {
  // _didFocusSubscription;
  // _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    // this._didFocusSubscription = props.navigation.addListener(
    //   'didFocus',
    //   payload =>
    //     BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       this.handleBackButton,
    //     ),
    // );
  }

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_DATA'),
    });
    getData('GET_EMPLOYEES').then(emp => {
      if (!this.state.request_timeout) {
        saveEmployees(emp.arrResponse).then(res => {
          getData('GET_ARTICLES_CATEGORIES').then(cat => {
            if (!this.state.request_timeout) {
              saveCategories(cat.arrResponse).then(res => {
                getData('GET_ARTICLES_SUBCATEGORIES').then(sub => {
                  if (!this.state.request_timeout) {
                    saveSubcategories(sub.arrResponse).then(res => {
                      getData('GET_ARTICLES').then(art => {
                        if (!this.state.request_timeout) {
                          saveArticles(art.arrResponse).then(res => {
                            getData('GET_ORDERS').then(ord => {
                              if (!this.state.request_timeout) {
                                saveOrders(ord.arrResponse).then(res => {
                                  getData('GET_ROUTES').then(rte => {
                                    if (!this.state.request_timeout) {
                                      saveRoutes(rte.arrResponse).then(res => {
                                        this.setState({
                                          request_timeout: false,
                                          loading: false,
                                        });
                                      });
                                    }
                                  });
                                });
                              }
                            });
                          });
                        }
                      });
                    });
                  }
                });
              });
            }
          });
        });
      }
    });
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  // componentDidMount() {
  //   this._willBlurSubscription = this.props.navigation.addListener(
  //     'willBlur',
  //     payload =>
  //       BackHandler.removeEventListener(
  //         'hardwareBackPress',
  //         this.handleBackPress,
  //       ),
  //   );
  // }

  // componentWillUnmount() {
  //   this._didFocusSubscription && this._didFocusSubscription.remove();
  //   this._willBlurSubscription && this._willBlurSubscription.remove();
  // }

  // componentDidMount() {
  //   this.backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButton,
  //   );
  // }

  // handleBackButton = () => {
  //   Alert.alert(
  //     'Cerrar Sesión',
  //     'Seguro que desea salir?',
  //     [
  //       {
  //         text: 'Volver',
  //         onPress: () => console.log('NO Pressed'),
  //       },
  //       {
  //         text: 'Salir',
  //         onPress: () => BackHandler.exitApp(),
  //       },
  //     ],
  //     {
  //       cancelable: false,
  //     },
  //   );
  //   return true;
  // };

  // componentWillUnmount() {
  //   this.backHandler = BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButton,
  //   );
  // }

  render() {
    const {loading} = this.state;
    return (
      <Container style={styles.androidHeader}>
        <Header>
          <Left>
            <Button transparent onPress={this.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_PRINCIPAL')}</Title>
          </Body>
          <Right>
            <FetchingData syncData={this.refreshHandler} fetching={loading} />
            <Button transparent>
              <Icon name="notifications" />
            </Button>
          </Right>
        </Header>
        <Content></Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        //paddingTop: StatusBar.currentHeight
      },
    }),
  },
});
