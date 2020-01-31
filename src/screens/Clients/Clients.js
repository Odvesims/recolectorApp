import React, {Component} from 'react';
import {theme} from '../../constants';
import {SearchBar, FetchingData, EmptyList, BtnIcon} from '../../components';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';

import {styles} from './styles';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  Alert,
} from 'react-native';

import {
  Root,
  Icon,
  Button,
  Container,
  Content,
  Header,
  Body,
  Left,
  Item,
  Fab,
  Right,
  Title,
  ActionSheet,
} from 'native-base';

import {saveClients, getStoredClients} from '../../helpers/sql_helper';
import {getData} from '../../helpers/apiconnection_helper';

export default class Clients extends Component {
  constructor(props) {
    super(props);
    const {t} = props.screenProps;
    this.state = {
      data: [],
      dataAll: [],
      loading: true,
      loadingMessage: t('message.loading.clients'),
      request_timeout: false,
      show: false,
      BUTTONS: [
        {
          text: t('general.edit'),
          icon: 'create',
          iconColor: theme.colors.primary,
        },
        {
          text: t('general.cancel'),
          icon: 'close',
          iconColor: theme.colors.gray,
        },
      ],
      DESTRUCTIVE_INDEX: 3,
      CANCEL_INDEX: 4,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      try {
        this.enterHandler();
      } catch (err) {
        this.enterHandler();
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  refresh(value) {
    if (value) {
      this.refreshHandler();
    } else {
      this.enterHandler();
    }
  }

  enterHandler = () => {
    this.setState({
      loading: true,
      loadingMessage: global.translate('message.loading.clients'),
    });
    this.storedClients();
  };

  storedClients = () => {
    getStoredClients().then(clients => {
      if (clients.length > 0) {
        this.setState({data: clients, dataAll: clients, loading: false});
      } else {
        this.setState({loading: false});
      }
    });
  };

  refreshHandler = () => {
    const {loading, request_timeout} = this.state;
    this.setState({
      loading: true,
      request_timeout: false,
      loadingMessage: global.translate('message.loading.clients'),
    });
    if (loading) {
      this.setState({loading: false, request_timeout: true});
      Alert.alert(global.translate('error.request_timeout'));
    }
    getData('GET_CLIENTS').then(result => {
      if (!request_timeout) {
        this.setState({loading: false, request_timeout: false});
        if (result.valid) {
          saveClients(result.arrResponse, []).then(res => {
            this.storedClients();
          });
        } else {
          alert(global.translate(result.response));
        }
      } else {
        this.setState({loading: false, request_timeout: false});
      }
    });
  };

  goBack = () => {
    this.props.navigation.goback();
  };

  openDrawer = props => {
    this.props.navigation.openDrawer();
  };

  listEmpty = () => <EmptyList />;

  onPressFab = () => {
    this.props.navigation.navigate('Client', {
      operation: 'action.add.client',
      loading_message: 'message.register.client',
      onGoBack: () => this.refresh(true),
      isNewRecord: true,
      state: global.translate('form.placeholder.select.state'),
    });
  };

  showHideSearchBar = () => {
    // this.state.show === true
    if (this.state.show) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  searchBarHandler = (data, text) => {
    this.setState({
      data: data,
      query: text,
    });
  };

  onPressAction = item => {
    const {BUTTONS, DESTRUCTIVE_INDEX, CANCEL_INDEX} = this.state;

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: global.translate('label.options'),
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.props.navigation.navigate('Client', {
              operation: 'action.edit.client',
              code: item.client_code,
              name: item.name,
              address: item.address,
              city: item.city,
              state: item.state,
              country: item.country,
              phone: item.phone_number,
              loading_message: 'message.update.client',
              isNewRecord: false,
              onGoBack: () => this.refresh(false),
            });
            break;
          case 1:
            ActionSheet.hide();
            break;
        }
      },
    );
  };

  renderItem = ({item}) => {
    return (
      <Item style={styles.list}>
        <Text style={styles.code}>{item.client_code}</Text>
        <View style={{marginLeft: 8, flex: 1}}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.address} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        <Button
          transparent
          style={styles.more}
          onPress={() => this.onPressAction(item)}>
          <Icon style={{color: 'gray'}} name="more" />
        </Button>
      </Item>
    );
  };

  render() {
    const {
      modalVisible,
      data,
      loading,
      show,
      loadingMessage,
      dataAll,
    } = this.state;

    const {t, i18n} = this.props.screenProps;

    return (
      <Root>
        <Container style={styles.androidHeader}>
          {/* Header */}
          <Spinner
            visible={loading}
            textContent={loadingMessage}
            color={'CE2424'}
            overlayColor={'rgba(255, 255, 255, 0.4)'}
            animation={'slide'}
          />
          <Header>
            <Left>
              <BtnIcon iconName="menu" onPress={this.openDrawer} />
            </Left>
            <Body>
              <Title>{global.translate('label.clients')}</Title>
            </Body>
            <Right>
              <FetchingData syncData={this.refreshHandler} fetching={loading} />
              {/* <BtnIcon iconName="funnel" /> */}
              <BtnIcon iconName="search" onPress={this.showHideSearchBar} />
            </Right>
          </Header>

          {/* SearchBar */}
          {show ? (
            <SearchBar
              data={this.searchBarHandler}
              visible={this.searchHandler}
              dataValue={dataAll}
              placeholder={'Busque su orden'}
              onPressCancel={this.showHideSearchBar}
            />
          ) : null}

          <Toast
            ref="toast"
            style={{backgroundColor: '#CE2424'}}
            position="bottom"
            positionValue={0}
            fadeInDuration={750}
            fadeOutDuration={750}
            opacity={0.8}
            textStyle={{color: 'white'}}
          />

          {/* Content */}
          <Content style={styles.content}>
            <FlatList
              data={data}
              ListEmptyComponent={this.listEmpty}
              renderItem={this.renderItem}
              keyExtractor={item => `${item.client_code}`}
            />
          </Content>

          <Fab
            style={{backgroundColor: theme.colors.primary, right: 10}}
            position="bottomRight"
            onPress={this.onPressFab}>
            <Icon name="add" />
          </Fab>
        </Container>
      </Root>
    );
  }
}
