import React, {PureComponent} from 'react';
import {theme} from '../../../constants';
import styled from 'styled-components/native';
import NumericInput from 'react-native-numeric-input';
import {CustomPicker, ButtonGroup} from '../../../components';
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
    let {params} = this.props.navigation.state;
    let type = params.detail_type;
    switch (type) {
      case 'C':
        type = 0;
        break;
      case 'S':
        type = 1;
        break;
      default:
        type = 2;
        break;
    }
    let quantity = Number(params.quantity);

    this.state = {
      theItem: {},
      selectedIndex: type,
      categories: [],
      subcategories: [],
      articles: [],
      picker_data: [],
      article: '',
      article_price: '',
      quantity: quantity,
      price: params.price,
      total: params.detail_total,
      placeholder: params.detail_description, //global.translate('PLACEHOLDER_SELECT_ARTICLE')
    };
    this.getArticlesData();
  }

  setArticleHandler(select, symbol) {
    return new Promise((resolve, reject) => {
      let arrSelect = [];
      select.map(item => {
        arrSelect.push({
          Name: item.code + '- ' + item.description,
          // Price: item.price,
          Type: `${symbol}`,
          Id: item.line_id,
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
    const {quantity} = this.state;
    let total = parseFloat(value * quantity);
    this.setState(prevState => ({
      price: value,
      total: total,
      itemSelected: {
        ...prevState.itemSelected,
        price: value,
        total: total,
        quantity: quantity,
      },
    }));
  }

  changeQuantity(value) {
    const {price, quantity} = this.state;
    this.setState(prevState => ({
      quantity: value,
      price: price,
      total: price * value,
      itemSelected: {
        ...prevState.itemSelected,

        price: price,
        total: price * quantity,
        quantity: value,
      },
    }));
  }

  updateIndex = selectedIndex => {
    const {articles, categories, subcategories, quantity} = this.state;
    switch (selectedIndex) {
      case 0:
        this.setArticleHandler(categories, 'C').then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('PLACEHOLDER_SELECT_CATEGORY'),
            article_price: '',
            type: 'C',
            total: 0,
            quantity: quantity,
          });
        });
        break;
      case 1:
        this.setArticleHandler(subcategories, 'S').then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('PLACEHOLDER_SELECT_SUBCATEGORY'),
            article_price: '',
            type: 'S',
            total: 0,
            quantity: quantity,
          });
        });
        break;
      case 2:
        this.setArticleHandler(articles, 'A').then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
            article_price: '',
            type: 'A',
            total: 0,
            quantity: quantity,
          });
        });
        break;
    }
  };

  selectedItem = item => {
    const {quantity, price} = this.state;
    if (item.Name !== undefined) {
      this.setState({
        theItem: item,
        article: item.Name,
        placeholder: item.Name,
        itemSelected: {
          item: item.Name.split('-')[0],
          detail_description: item.Name.split('-')[1],
          price: price,
          quantity: quantity,
          total: price,
          line_type: item.Type,
          line_id: item.Id,
        },
      });
    }
  };

  onPressHandler = () => {
    const {quantity, itemSelected} = this.state;
    if (quantity) {
      this.props.navigation.navigate('Order', {
        itemSelected: itemSelected,
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
    //
    const {
      selectedIndex,
      quantity,
      placeholder,
      picker_data,
      total,
      price,
    } = this.state;
    //
    const {
      params: {editable},
    } = this.props.navigation.state;
    const isEditable = editable;
    let save = null;
    if (isEditable) {
      save = (
        <Right>
          <Button transparent onPress={this.onPressHandler}>
            <Icon name="checkmark" />
          </Button>
        </Right>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate('Order', {
                  itemSelected: undefined,
                })
              }>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Articulos a Comprar</Title>
          </Body>
          {save}
        </Header>
        {/* // */}
        <BContent>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <Form>
              <View style={styles.paddingBottom}>
                <Text>{global.translate('TITLE_SELECT')}</Text>
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: 40}}
                  disableSelected={true}
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
                  items={picker_data}
                  onSelected={this.selectedItem}
                  disabled={!isEditable}
                />
              </View>

              {/* Price */}
              <View style={styles.paddingBottom}>
                {/* {global.translate('TITLE_QUANTITY')} */}
                <Text>Precio</Text>
                <TextInput
                  editable={isEditable}
                  value={price}
                  style={styles.inputNumber}
                  keyboardType="number-pad"
                  onChangeText={price => {
                    this.priceHandler(price);
                  }}
                />
              </View>
              {/* Quantity */}
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
                  minValue={1}
                  editable={isEditable}
                />
              </View>
            </Form>
            {/* Total */}
            <Total>
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPrice}>
                  {global.translate('TITLE_TOTAL')}: $ {total}
                </Text>
              </View>
            </Total>
          </KeyboardAwareScrollView>
        </BContent>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: theme.sizes.padding,
  // },

  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
    backgroundColor: 'yellow',
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

const BContent = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${theme.sizes.padding}px;
`;
const Total = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;
