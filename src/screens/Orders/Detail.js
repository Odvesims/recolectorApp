import React, {Component} from 'react';
import {theme} from '../../constants';
import styled from 'styled-components/native';
import CustomPicker from '../../components/CustomPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  getStoredCategories,
  getStoredSubcategories,
  getStoredArticles,
} from '../../helpers/sql_helper';
import {ButtonGroup} from '../../components';
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
      placeholder: global.translate('form.placeholder.select.article'),
    };
    this.getArticlesData();
  }

  getArticlesData() {
    getStoredCategories().then(categories => {
      getStoredSubcategories().then(subcategories => {
        getStoredArticles().then(articles => {
          this.setArticlesPicker(articles).then(res => {
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

  changeQuantity(theQuantity) {
    this.setState({
      quantity: theQuantity,
      total: this.state.article_price * theQuantity,
      selItem: {
        item: this.state.theItem.Name.split('-')[0],
        description: this.state.theItem.Name.split('-')[1],
        price: this.state.theItem.Code,
        quantity: theQuantity,
        line_type: this.state.theItem.Type,
        line_id: this.state.theItem.Id,
      },
    });
  }

  setCategoriesPicker(categories) {
    return new Promise((resolve, reject) => {
      let arrCategories = [];
      for (let i = 0; i < categories.length; ++i) {
        let category = categories[i];
        arrCategories.push({
          Name: category.category_code + '- ' + category.description,
          Code: category.price,
          Type: 'C',
          Id: category.category_id,
        });
      }
      resolve(arrCategories);
    });
  }

  setSubcategoriesPicker(subcategories) {
    return new Promise((resolve, reject) => {
      let arrSubcategories = [];
      for (let i = 0; i < subcategories.length; ++i) {
        let subcategory = subcategories[i];
        arrSubcategories.push({
          Name: subcategory.subcategory_code + '- ' + subcategory.description,
          Code: subcategory.price,
          Type: 'S',
          Id: subcategory.subcategory_id,
        });
      }
      resolve(arrSubcategories);
    });
  }

  setArticlesPicker(articles) {
    return new Promise((resolve, reject) => {
      let arrArticles = [];
      for (let i = 0; i < articles.length; ++i) {
        let article = articles[i];
        arrArticles.push({
          Name: article.article_code + '- ' + article.description,
          Code: article.price,
          Type: 'A',
          Id: article.article_id,
        });
      }
      resolve(arrArticles);
    });
  }

  updateIndex = selectedIndex => {
    switch (selectedIndex) {
      case 0:
        this.setCategoriesPicker(this.state.categories).then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            selectedItem: {Name: '', Code: ''},
            placeholder: global.translate('form.placeholder.select.category'),
            article_price: '',
            total: 0,
            quantity: '',
          });
        });
        break;
      case 1:
        this.setSubcategoriesPicker(this.state.subcategories).then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('form.placeholder.select.subcategory'),
            article_price: '',
            total: 0,
            quantity: '',
          });
        });
        break;
      case 2:
        this.setArticlesPicker(this.state.articles).then(res => {
          this.setState({
            selectedIndex,
            picker_data: res,
            theItem: {},
            placeholder: global.translate('form.placeholder.select.article'),
            article_price: '',
            total: 0,
            quantity: '',
          });
        });
        break;
    }
  };

  static navigationOptions = {
    header: null,
  };

  selectedItem = item => {
    this.setState({
      theItem: item,
      article: item.Name,
      article_price: item.Code,
      total: item.Code * this.state.quantity,
      selItem: {
        item: item.Name.split('-')[0],
        description: item.Name.split('-')[1],
        price: item.Code,
        quantity: this.state.quantity,
        line_type: item.Type,
        line_id: item.Id,
      },
    });
  };

  onPresHandler = () => {
    if (this.state.quantity) {
      this.props.navigation.navigate('Order', {
        selItem: this.state.selItem,
      });
    } else {
      alert(global.translate('error.quantity_blank'));
    }
  };

  render() {
    const buttons = [
      global.translate('form.label.category'),
      global.translate('form.label.subcategory'),
      global.translate('form.label.article'),
    ];
    const {selectedIndex, article_price, quantity} = this.state;

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
            <Title>{global.translate('header.articles')}</Title>
          </Body>
          <Right />
        </Header>
        {/* Content */}
        <Content style={styles.container}>
          <KeyboardAwareScrollView>
            <Form>
              <View style={styles.paddingBottom}>
                <Text>{global.translate('form.label.select')}</Text>
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
                  <Text>{global.translate('form.label.description')}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: theme.colors.success}}>
                      {global.translate('form.label.price')}:{' '}
                    </Text>
                    <Text
                      style={{color: theme.colors.success, fontWeight: 'bold'}}>
                      $ {article_price}
                    </Text>
                  </View>
                </View>
                <CustomPicker
                  placeholder={this.state.placeholder}
                  selectedHolder={this.selectedItem.Name}
                  items={this.state.picker_data}
                  selectedItem={this.selectedItem}
                />
              </View>
              <View style={styles.paddingBottom}>
                <Text>{global.translate('form.label.quantity')}</Text>
                <TextInput
                  ref={input => {
                    this.secondTextInput = input;
                  }}
                  style={styles.inputNumber}
                  keyboardType="number-pad"
                  onChangeText={quantity => {
                    this.changeQuantity(quantity);
                  }}
                />
              </View>
            </Form>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPrice}>
                {global.translate('label.total')}: $ {this.state.total}
              </Text>
            </View>
          </KeyboardAwareScrollView>
        </Content>
        <View style={styles.actionContainer}>
          <CustomButton
            bordered
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text style={{color: theme.colors.darkGray}}>
              {global.translate('general.cancel')}
            </Text>
          </CustomButton>
          <CustomButton onPress={this.onPresHandler}>
            <Text>{global.translate('general.accept')}</Text>
          </CustomButton>
        </View>
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
