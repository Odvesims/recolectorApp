import React, {PureComponent} from 'react';
import {theme} from '../../../constants';
import styled from 'styled-components/native';
import NumericInput from 'react-native-numeric-input';
import {
  CustomPicker,
  ButtonGroup,
  CustomButton,
  ActionButton,
} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getStoredCategories,
  getStoredSubcategories,
  getStoredArticles,
} from '../../../helpers/sql_helper';
import {View, StyleSheet, TextInput} from 'react-native';
import {
  Content,
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
} from 'native-base';

export default class Shopping extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theItem: {},
      selectedIndex: 2,
      categories: [],
      subcategories: [],
      articles: [],
      picker_data: [],
      article: '',
      article_price: '',
      quantity: 1,
      price: '',
      placeholder: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
    };
    this.getArticlesData();
  }

  setArticleHandler(select, symbol) {
    return new Promise((resolve, reject) => {
      let arrSelect = [];
      select.map(item => {
        arrSelect.push({
          Name: item.code + '- ' + item.description,
          Code: item.price,
          Type: `${symbol}`,
          Id: item.subcategory_id,
        });
      });
      resolve(arrSelect);
    });
  }

  getArticlesData() {
    getStoredCategories().then(categories => {
      getStoredSubcategories().then(subcategories => {
        getStoredArticles().then(articles => {
          this.setArticleHandler(articles, 'A').then(res => {
            this.setState({
              categories: categories,
              subcategories: subcategories,
              articles: articles,
              picker_data: res,
            });
          });
        });
      });
    });
  }

  priceHandler(value) {
    this.setState({
      price: value,
    });
  }

  changeQuantity(value) {
    const {theItem, article_price} = this.state;
    console.log(theItem);
    this.setState({
      quantity: value,
      total: article_price * value,
      selItem: {
        item: theItem.Name.split('-')[0],
        description: theItem.Name.split('-')[1],
        price: theItem.Code,
        quantity: value,
        line_type: theItem.Type,
        line_id: theItem.Id,
      },
    });
  }

  updateIndex = selectedIndex => {
    const {articles, categories, subcategories} = this.state;
    switch (selectedIndex) {
      case 0:
        this.setArticleHandler(categories).then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('PLACEHOLDER_SELECT_CATEGORY'),
            article_price: '',
            total: 0,
            quantity: '',
          });
        });
        break;
      case 1:
        this.setArticleHandler(subcategories).then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('PLACEHOLDER_SELECT_SUBCATEGORY'),
            article_price: '',
            total: 0,
            quantity: '',
          });
        });
        break;
      case 2:
        this.setArticleHandler(articles).then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
            article_price: '',
            total: 0,
            quantity: '',
          });
        });
        break;
    }
  };

  selectedItem = item => {
    const {quantity} = this.state;
    if (item.Name !== undefined) {
      this.setState({
        theItem: item,
        article: item.Name,
        article_price: item.Code,
        total: item.Code,
        placeholder: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
        selItem: {
          item: item.Name.split('-')[0],
          description: item.Name.split('-')[1],
          price: item.Code,
          quantity: quantity,
          line_type: item.Type,
          line_id: item.Id,
        },
      });
    }
  };

  onPressHandler = () => {
    const {quantity, selItem} = this.state;
    if (quantity) {
      this.props.navigation.navigate('Order', {
        selItem: selItem,
      });
    } else {
      alert(global.translate('ALERT_QUANTITY_BLANK'));
    }
  };

  render() {
    const buttons = [
      global.translate('TITLE_CATEGORY'),
      global.translate('TITLE_SUBCATEGORY'),
      global.translate('TITLE_ARTICLE'),
    ];
    const {
      selectedIndex,
      article_price,
      quantity,
      placeholder,
      picker_data,
      total,
    } = this.state;
    const {navigation} = this.props;

    return (
      <Container>
        {/* header */}
        <Header>
          <Left>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('Order', {selItem: undefined})
              }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Articulos a Comprar</Title>
          </Body>
        </Header>
        {/* Content */}
        <Content style={styles.container}>
          <KeyboardAwareScrollView>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{global.translate('TITLE_DESCRIPTION')}</Text>
                </View>
                <CustomPicker
                  placeholder={placeholder}
                  selectedHolder={this.selectedItem.Name}
                  items={picker_data}
                  selectedItem={this.selectedItem}
                />
              </View>

              {/* Price */}
              <View style={styles.paddingBottom}>
                {/* {global.translate('TITLE_QUANTITY')} */}
                <Text>Precio</Text>
                <TextInput
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  style={styles.inputNumber}
                  keyboardType="number-pad"
                  onChangeText={price => {
                    this.priceHandler(price);
                  }}
                />
              </View>
              {/* quantity */}
              <View style={styles.paddingBottom}>
                <Text style={{marginBottom: 8}}>
                  {global.translate('TITLE_QUANTITY')}
                </Text>
                <NumericInput
                  rounded
                  iconStyle={{color: 'green'}}
                  value={quantity}
                  onChange={quantity => {
                    this.changeQuantity(quantity);
                  }}
                  minValue={0}
                />
              </View>
            </Form>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPrice}>
                {global.translate('TITLE_TOTAL')}: $ {total || 0}
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </Content>
        <ActionButton
          cancel={() => {
            navigation.goBack();
          }}
          accept={this.onPressHandler}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.sizes.padding,
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
    width: '25%',
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p8,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
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

  totalPrice: {
    color: theme.colors.success,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  totalPriceContainer: {
    borderColor: theme.colors.success,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: theme.sizes.p12,

    alignItems: 'center',
    backgroundColor: 'rgba(7, 139, 117, 0.05)',
  },
  price: {},
});
