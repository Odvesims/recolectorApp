import React, {PureComponent} from 'react';

import {styles, BContent, Total} from '../styles';

import {CustomPicker, NumberInput} from '../../../components';
import {ButtonGroup} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getStoredCategories,
  getStoredSubcategories,
  getStoredArticles,
} from '../../../helpers/sql_helper';
import {View, TextInput} from 'react-native';
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

  getArticlesData = async () => {
    const categories = await getStoredCategories();
    const subcategories = await getStoredSubcategories();
    const articles = await getStoredArticles();
    const picker_data = await this.setArticleHandler(articles, 'A');
    this.setState({
      categories,
      subcategories,
      articles,
      picker_data,
    });
  };

  componentDidMount() {
    this.getArticlesData();
  }

  priceHandler = price => {
    const {quantity} = this.state;
    let total = parseFloat(price * quantity);
    this.setState(prevState => ({
      price: price,
      total: total,
      itemSelected: {
        ...prevState.itemSelected,
        price: price,
        total: total,
        quantity: quantity,
      },
    }));
  };

  changeQuantity = value => {
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
  };

  groupHandler = async (group, placeholder, i) => {
    let type = placeholder.substr(0, 1);
    let res = await this.setArticleHandler(group, type);
    this.setState({
      selectedIndex: i,
      picker_data: res,
      theItem: {},
      placeholder: global.translate(`PLACEHOLDER_SELECT_${placeholder}`),
      article_price: '',
      type: type,
      total: 0,
      quantity: 1,
    });
  };

  updateIndex = async selectedIndex => {
    const {articles, categories, subcategories} = this.state;
    switch (selectedIndex) {
      case 0:
        this.groupHandler(categories, 'CATEGORY', selectedIndex);
        break;
      case 1:
        this.groupHandler(subcategories, 'SUBCATEGORY', selectedIndex);
        break;
      case 2:
        this.groupHandler(articles, 'ARTICLE', selectedIndex);
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
    console.log(this.state);

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
                  disabled={!isEditable}
                />
              </View>
              <CustomPicker
                label={'TITLE_DESCRIPTION'}
                placeholder={placeholder}
                items={picker_data}
                onSelected={this.selectedItem}
                disabled={!isEditable}
              />

              {/* Price */}
              <View style={styles.paddingBottom}>
                <Text>Precio</Text>
                <TextInput
                  editable={isEditable}
                  value={price}
                  style={styles.inputNumber}
                  keyboardType="number-pad"
                  onChangeText={this.priceHandler}
                />
              </View>
              {/* Quantity */}
              <NumberInput
                rounded
                label={'TITLE_QUANTITY'}
                iconStyle={{color: 'green'}}
                value={Number(quantity)}
                onChange={this.changeQuantity}
                minValue={1}
                editable={isEditable}
              />
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
