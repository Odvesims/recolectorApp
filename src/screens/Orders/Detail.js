import React, {Component} from 'react';
import {theme} from '../../constants';
// import ButtonDone from '../../../../components'
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomPicker from '../../components/CustomPicker';

import {ButtonGroup} from '../../components';

import {View, StyleSheet, TextInput} from 'react-native';
import {
  Content,
  Container,
  Picker,
  Left,
  Right,
  Title,
  Body,
  Header,
  Button,
  Icon,
  Text,
  List,
  Order,
  Radio,
  Form,

  //   DatePicker,
} from 'native-base';
import {
  getStoredCategories,
  getStoredSubcategories,
  getStoredArticles,
} from '../../helpers/sql_helper';

const CustomButton = styled(Button)`
  background: ${props => (props.bordered ? 'transparent' : ' #4285f4')};
  border-color: ${props =>
    props.bordered ? theme.colors.gray : ' transparent'};
  border: ${props => (props.bordered ? '3px solid gray' : '#4285f4')};
  text-transform: uppercase;
  flex-basis: 48%;
  justify-content: center;
`;

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedIndex: 2};
    this.getArticlesData();
    this.selectedItem = this.selectedItem.bind(this);
  }

  getClientsHandler() {
    getStoredCategories().then(categories => {
      getStoredSubcategories().then(subcategories => {
        getStoredArticles().then(articles => {
          this.setArticlesPicker(categories).then(res => {
            this.setState({clients: res});
          });
        });
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

  updateIndex = selectedIndex => {
    this.setState({selectedIndex});
  };

  static navigationOptions = {
    header: null,
  };

  selectedItem(item) {
    this.setState({
      article: item.Description,
      article_price: item.Price,
    });
  }

  render() {
    const {close} = this.props;
    const buttons = [
      global.translate('TITLE_CATEGORY'),
      global.translate('TITLE_SUBCATEGORY'),
      global.translate('TITLE_ARTICLE'),
    ];
    const {selectedIndex} = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack(null)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{global.translate('TITLE_ARTICLE')}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Order')}>
              <Icon name="checkmark" />
            </Button>
          </Right>
        </Header>
        <Content style={styles.container}>
          <ScrollView>
            <Form>
              <View style={styles.paddingBottom}>
                <Text>{global.translate('TITLE_SELECT')}</Text>
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: 40}}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text>{global.translate('TITLE_DESCRIPTION')}</Text>
                <CustomPicker />
              </View>

              <View style={styles.paddingBottom}>
                <Text>{global.translate('TITLE_PRICE')}</Text>
                <TextInput
                  style={styles.inputNumber}
                  keyboardType="number-pad"
                  onChangeText={item => {}}
                />
              </View>

              <View style={styles.paddingBottom}>
                <Text>{global.translate('TITLE_QUANTITY')}</Text>
                <TextInput
                  style={styles.inputNumber}
                  keyboardType="number-pad"
                  onChangeText={item => {}}
                />
              </View>
            </Form>
          </ScrollView>
        </Content>
        <View style={styles.actionContainer}>
          <CustomButton
            bordered
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text style={{color: theme.colors.darkGray}}>
              {global.translate('TITLE_CANCEL')}
            </Text>
          </CustomButton>
          <CustomButton>
            <Text>{global.translate('TITLE_ACCEPT')}</Text>
          </CustomButton>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: 4,
  },
  headerCodeText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    padding: theme.sizes.padding,
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

  inputNumber: {
    flexBasis: '50%',
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
    flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.lightGray,
  },

  buttonGhost: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
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

  radioButton: {
    flexDirection: 'row',
  },
});
