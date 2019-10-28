import React, {Component, createRef} from 'react';
import {theme} from '../../constants';
import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {CustomTextInput} from '../../components';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Header,
  Right,
  Left,
  Body,
  Button,
  Icon,
  Container,
  Title,
  Content,
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

const ItemTitle = styled.Text`
  text-align: left;
  width: 180px;
  overflow: hidden;
  font-size: 14px;
`;

const ItemsContainer = styled.View`
  flex-direction: row;
  padding-vertical: 12;
  margin-left: 24;
  align-items: center;
`;

const InputValues = styled(CustomTextInput)`
  flex-basis: 100px;
  margin-left: 20px;
  padding: 12px;
  background-color: #fff;
  border-color: #bdbdbd;
  border-width: 1px;
  border-radius: 4px;
`;

const HeaderItems = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-vertical: 12px;
  background-color: ${theme.colors.gray3};
`;

const RContent = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${theme.colors.lightGray};
`;

export default class Registry extends Component {
  //   constructor(props) {
  //     super(props);

  //     };
  //   }
  constructor(props) {
    super(props);
  }

  state = {
    //   data: [], //this.props.navigation.state.params.info
    articles: [
      {
        id: 1,
        name: 'Calambres',
        address: 'Kulas Light',
        value: '',
      },
      {
        id: 2,
        name: 'Alambres',
        address: 'Kulas Light',
        value: '',
      },
      {
        id: 3,
        name: 'Tornillos Tornillos Tornillos',
        address: 'Kulas Light',
        value: '',
      },
      {
        id: 4,
        name: 'Tornillos Tornillos',
        address: 'Kulas Light',
        value: '',
      },
      {
        id: 5,
        name: 'Tornillos dfasdadsad Tornillos',
        address: 'Kulas Light',
        value: '',
      },
      {
        id: 6,
        name: 'Muletas Tornillos',
        address: 'Kulas Light',
        value: '',
      },
    ],
    textInputs: [],
  };

  render() {
    let {articles} = this.state;
    // const {state, navigate} = this.props.navigation;

    let renderItem = ({item}) => (
      <ItemsContainer>
        <ItemTitle numberOfLines={1}>{item.name}</ItemTitle>
        <InputValues
          blurOnSubmit={false}
          value={item.value}
          returnKeyType="next"
          keyboardType="number-pad"
          onChangeText={text => {
            item.value = text;
            this.setState({
              text,
            });
            console.log(item);
          }}
        />
        {console.log(item.id)}
      </ItemsContainer>
    );

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Detalles</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {}}>
              <Icon name="checkmark" />
              <Text
                style={{
                  marginLeft: 8,
                  color: theme.colors.white,
                  fontSize: 16,
                }}>
                Guardar
              </Text>
            </Button>
          </Right>
        </Header>

        {/* Content */}
        <RContent>
          <View style={styles.RouteDetails}>
            <Text style={styles.currentDateText}>{`Numero : 1`}</Text>
            <Text style={styles.currentDateText}>
              {`${global.translate('TITLE_DATE')} : 20/25/58`}
            </Text>
            <Text style={styles.currentDateText}>
              {`Dirección : Las Palmas de Alma Rosa, SDE`}
            </Text>
          </View>
          <HeaderItems>
            <Text style={styles.bodyHeader}>Articulos</Text>
            <Text style={styles.bodyHeader}>Recodigos</Text>
          </HeaderItems>
          <KeyboardAwareScrollView>
            {/* FlatList */}
            <FlatList
              data={articles}
              extraData={this.state}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem} //item => this.renderItem(item)
            />
          </KeyboardAwareScrollView>
          {/* End flatList */}
        </RContent>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerCodeText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: 'bold',
  },

  currentDate: {
    // display: 'flex',

    flexDirection: 'row',
  },
  currentDateText: {color: theme.colors.gray},

  container: {
    // flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  client_data: {
    fontSize: 14,
  },

  RouteDetails: {backgroundColor: 'white', padding: 16},

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    paddingVertical: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },

  input: {
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

  addPoint: {
    padding: theme.sizes.padding,
    marginBottom: 24,
  },

  name: {
    flexBasis: 150,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'scroll',
    flexGrow: 2,
    flexWrap: 'nowrap',
  },

  quantity: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  bodyHeader: {
    textTransform: 'uppercase',
  },
});