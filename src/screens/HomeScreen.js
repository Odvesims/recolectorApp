import React, {Component} from 'react';
import {FetchingData} from '../components';

import {StyleSheet, Platform} from 'react-native';

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
} from '../helpers/sql_helper';
import {getData} from '../helpers/apiconnection_helper';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {}

  refreshHandler = () => {
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('MESSAGE_LOADING_DATA'),
    });
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({loading: false, request_timeout: true});
        alert(global.translate('ALERT_REQUEST_TIMEOUT'));
      }
    }, 30000);
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
  };

  static navigationOptions = {
    header: null,
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

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
