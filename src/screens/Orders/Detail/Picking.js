import React, {Component} from 'react';
import {theme} from '../../../constants';
import styled from 'styled-components/native';
<<<<<<< HEAD
import {CustomPicker, NumberInput} from '../../../components';
import {ButtonGroup} from 'react-native-elements';
=======
import NumericInput from 'react-native-numeric-input';
import {CustomPicker, ButtonGroup, ActionButton} from '../../../components';
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getStoredCategories,
  getStoredSubcategories,
  getStoredArticles,
} from '../../../helpers/sql_helper';
<<<<<<< HEAD
import {View, StyleSheet} from 'react-native';
=======
import {View, StyleSheet, TextInput} from 'react-native';
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
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
=======
    const {params} = this.props.navigation.state;
    this.state = {
      theItem: {},
      selectedIndex: 2,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      categories: [],
      subcategories: [],
      articles: [],
      picker_data: [],
      article: '',
<<<<<<< HEAD
      article_price: price,
      quantity: params.quantity, //
      placeholder: params.detail_description, // params.data.detail_description ||
      total: params.detail_total,
=======
      article_price: '',
      quantity: 1,
      placeholder: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
      //
      //order_selection: params.selection,
      //order_description: params.description,
      //placeholder: params.order_name,
      //chosenQuantity: params.quantity,
      //order_total: params.total,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    };
    // this.getArticlesData();
  }

  setArticleHandler(select, symbol) {
<<<<<<< HEAD
    return new Promise((resolve, reject) => {
=======
    return new Promise((resolve, reject, hola) => {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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

<<<<<<< HEAD
<<<<<<< HEAD
  async getArticlesData() {
    // const storedCategories = await getStoredCategories();
    // const storesSubCategories = await getStoredSubcategories(storedCategories);
    // const storedArticles = await getStoredArticles(storesSubCategories);
    // const articleHandler = this.setArticleHandler(storedArticles, 'A');
    // this.setState({
    //   categories: storedCategories,
    //   subcategories: storesSubCategories,
    //   articles: articleHandler,
    //   picker_data: res,
    // });
=======
  getArticlesData() {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    getStoredCategories().then(categories => {
      getStoredSubcategories().then(subcategories => {
        getStoredArticles().then(articles => {
          this.setArticleHandler(articles, 'A').then(res => {
            this.setState({
<<<<<<< HEAD
              categories,
              subcategories,
              articles,
=======
              categories: categories,
              subcategories: subcategories,
              articles: articles,
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
              picker_data: res,
            });
          });
        });
      });
=======
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
>>>>>>> Andris
    });
  };

  componentDidMount() {
    this.getArticlesData();
  }

  changeQuantity = value => {
    const {theItem, article_price} = this.state;
<<<<<<< HEAD
<<<<<<< HEAD
    let description = theItem.Name.split('-')[1];
=======
    const description = theItem.Name.split('-')[1];
>>>>>>> Andris

=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
    this.setState({
      quantity: value,
      total: article_price * value,
      itemSelected: {
<<<<<<< HEAD
        item: theItem.Id,
        detail_description: description.trim(),
=======
        item: theItem.Name.split('-')[0],
        description: theItem.Name.split('-')[1],
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
        this.setArticleHandler(categories, 'C').then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            selectedItem: {Name: '', Code: ''},
            placeholder: global.translate('PLACEHOLDER_SELECT_CATEGORY'),
            article_price: '',
            type: 'C',
            total: 0,
<<<<<<< HEAD
            quantity: 1,
=======
            quantity: '',
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
            quantity: 1,
=======
            quantity: '',
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
            quantity: 1,
=======
            quantity: '',
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
          });
        });
=======
        this.groupHandler(categories, 'CATEGORY', selectedIndex);
        break;
      case 1:
        this.groupHandler(subcategories, 'SUBCATEGORY', selectedIndex);
        break;
      case 2:
        this.groupHandler(articles, 'ARTICLE', selectedIndex);
>>>>>>> Andris
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
<<<<<<< HEAD
        placeholder: item.Name,
        itemSelected: {
          item: item.Id,
          detail_description: item.Name.split('-')[1],
=======
        placeholder: global.translate('PLACEHOLDER_SELECT_ARTICLE'),
        itemSelected: {
          item: item.Name.split('-')[0],
          description: item.Name.split('-')[1],
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
<<<<<<< HEAD
    console.log('quantity ==>', quantity);
=======

>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
=======
    // console.log('quantity ==>', quantity);
>>>>>>> Andris
    if (quantity) {
      this.props.navigation.navigate('Order', {
        itemSelected,
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
<<<<<<< HEAD
    // console.log('Picking ==>', this.props.navigation.state.params);
    console.log('Picking STATE ==>', this.state);
    let {
=======
    const {
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      selectedIndex,
      article_price,
      quantity,
      placeholder,
      picker_data,
      total,
    } = this.state;
<<<<<<< HEAD

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
=======
    const {navigation} = this.props;
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0

    return (
      <Container>
        {/* header */}
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
<<<<<<< HEAD
            <Title>Articulos a Recoger</Title>
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
=======
            <Title>{global.translate('TITLE_ARTICLES_TO_PICK')}</Title>
          </Body>
        </Header>

        {/* Content */}
        <Content style={styles.container}>
          <KeyboardAwareScrollView>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
            <Form>
              <View style={styles.paddingBottom}>
                <Text>{global.translate('TITLE_SELECT')}</Text>
                <ButtonGroup
                  onPress={this.updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{height: 40}}
<<<<<<< HEAD
                  disabled={!isEditable}
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
                    <PriceQuantity>{article_price}</PriceQuantity>
=======
                    <PriceQuantity>{article_price || '0'}</PriceQuantity>
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
                  </Price>
                </View>
                <CustomPicker
                  placeholder={placeholder}
<<<<<<< HEAD
                  items={picker_data}
                  onSelected={this.selectedItem}
                  disabled={!isEditable}
                />
              </View>
              {/* Quantity */}
              <NumberInput
                label={global.translate('TITLE_QUANTITY')}
                rounded
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
=======
                  selectedHolder={this.selectedItem.Name}
                  items={picker_data}
                  selectedItem={this.selectedItem}
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
                  minValue={1}
                />
              </View>
            </Form>

            {/* Total */}
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPrice}>
                {global.translate('TITLE_TOTAL')}: $ {total || 0}
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </Content>

        {/* actionButton */}
        <ActionButton
          cancel={() => {
            navigation.goBack();
          }}
          accept={this.onPressHandler}
        />
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
      </Container>
    );
  }
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   padding: theme.sizes.padding,
  //   // backgroundColor: 'green',
  // },
=======
  container: {
    flex: 1,
    padding: theme.sizes.padding,
  },
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0

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
<<<<<<< HEAD
    justifyContent: 'flex-end',
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
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
<<<<<<< HEAD
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
=======
>>>>>>> c28c82ec2a1921b45c79bf65f7b90bdfe49672a0
