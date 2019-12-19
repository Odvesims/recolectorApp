import React, {Component} from 'react';
import {theme} from '../../../constants';
import styled from 'styled-components/native';
import {CustomPicker, NumberInput, BtnIcon} from '../../../components';
import {ButtonGroup} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getStoredCategories,
  getStoredSubcategories,
  getStoredArticles,
} from '../../../helpers/sql_helper';
import {View, StyleSheet} from 'react-native';
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

export default class Picking extends Component {
  constructor(props) {
    super(props);
    let {params} = this.props.navigation.state;
    let type = params.detail_type;
    switch (type) {
      case 'C':
        type = 0 || '0';
        break;
      case 'S':
        type = 1 || '1';
        break;
      default:
        type = 2 || '2';
        break;
    }
    let quantity = Number(params.quantity);
    let price = Number(params.price);

    this.state = {
      theItem: {},
      selectedIndex: type,
      categories: [],
      subcategories: [],
      articles: [],
      picker_data: [],
      article: '',
      article_price: price,
      quantity: params.quantity, //
      placeholder: params.detail_description, // params.data.detail_description ||
      total: params.detail_total,
    };
    // this.getArticlesData();
  }

  setArticleHandler(select, symbol) {
    return new Promise((resolve, reject) => {
      let arrSelect = [];
      select.map(item => {
        arrSelect.push({
          Id: item.line_id,
          Name: item.code + '- ' + item.description,
          Price: item.price,
          Type: `${symbol}`,
        });
      });
      resolve(arrSelect);
    });
  }

  getArticlesData = async () => {
    const categories = await getStoredCategories();
    const subcategories = await getStoredSubcategories();
    const articles = await getStoredArticles();
    const articleHandler = await this.setArticleHandler(articles, 'A');
    this.setState({
      categories: categories,
      subcategories: subcategories,
      articles: articles,
      picker_data: articleHandler,
    });
  };

  componentDidMount() {
    this.getArticlesData();
  }

  changeQuantity = value => {
    const {theItem, article_price} = this.state;
    const description = theItem.Name.split('-')[1];

    this.setState({
      quantity: value,
      total: article_price * value,
      itemSelected: {
        item: theItem.Id,
        detail_description: description.trim(),
        price: theItem.Price,
        quantity: value,
        line_type: theItem.Type,
        line_id: theItem.Id,
      },
    });
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
    const {quantity} = this.state;
    if (item.Name !== undefined) {
      this.setState({
        theItem: item,
        article: item.Name,
        article_price: item.Price,
        total: item.Price,
        placeholder: item.Name,
        itemSelected: {
          item: item.Id,
          detail_description: item.Name.split('-')[1],
          price: item.Price,
          quantity: quantity,
          line_type: item.Type,
          line_id: item.Id,
        },
      });
    }
  };

  onPressHandler = () => {
    const {quantity, itemSelected} = this.state;
    // console.log('quantity ==>', quantity);
    if (quantity) {
      this.props.navigation.navigate('Order', {
        itemSelected,
      });
    } else {
      alert(global.translate('ALERT_QUANTITY_BLANK'));
    }
  };

  goToOrder = () => {
    this.props.navigation.navigate('Order', {
      itemSelected: undefined,
    });
  };

  render() {
    const buttons = [
      global.translate('TITLE_CATEGORY'),
      global.translate('TITLE_SUBCATEGORY'),
      global.translate('TITLE_ARTICLE'),
    ];
    // console.log('Picking ==>', this.props.navigation.state.params);
    console.log('Picking STATE ==>', this.state);
    let {
      selectedIndex,
      article_price,
      quantity,
      placeholder,
      picker_data,
      total,
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
          <BtnIcon iconName={'checkmark'} onPress={this.onPressHandler} />
        </Right>
      );
    }

    return (
      <Container>
        {/* header */}
        <Header>
          <Left>
            <BtnIcon iconName={'arrow-back'} onPress={this.goToOrder} />
          </Left>
          <Body>
            <Title>{global.translate('ARTICLES_TO_PICK_UP')}</Title>
          </Body>
          {save}
        </Header>
        {/* Content */}
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

              {/* Description */}
              <View style={styles.paddingBottom}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{global.translate('TITLE_DESCRIPTION')}</Text>
                  <Price>
                    <PriceLabel>
                      {global.translate('TITLE_PRICE')}: $
                    </PriceLabel>
                    <PriceQuantity>{article_price}</PriceQuantity>
                  </Price>
                </View>
                <CustomPicker
                  placeholder={placeholder}
                  items={picker_data}
                  onSelected={this.selectedItem}
                  disabled={!isEditable}
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

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   padding: theme.sizes.padding,
  //   // backgroundColor: 'green',
  // },

  input: {
    marginVertical: theme.sizes.p8,
    padding: theme.sizes.p12,
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 4,
    color: '#000',
  },

  paddingBottom: {
    paddingBottom: theme.sizes.padding,
  },

  totalPrice: {
    color: theme.colors.success,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  totalPriceContainer: {
    borderColor: theme.colors.success,
    borderWidth: 1,
    justifyContent: 'flex-end',
    borderStyle: 'solid',
    padding: theme.sizes.p12,
    alignItems: 'center',
    backgroundColor: 'rgba(7, 139, 117, 0.05)',
  },
  price: {},
});

const PriceQuantity = styled.Text`
  color: ${theme.colors.success};
  font-weight: bold;
  font-size: 16;
`;

const PriceLabel = styled.Text`
  color: ${theme.colors.success};
`;
const Price = styled.Text`
  flex-direction: row;
`;
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
