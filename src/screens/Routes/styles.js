import styled from 'styled-components/native';
import {TouchableOpacity, Platform, StyleSheet, StatusBar} from 'react-native';
import {theme} from '../../constants';

export {
  BContent,
  ButtonOutlined,
  Client,
  ClientData,
  ClientForm,
  CurrentDate,
  DetailContent,
  ListBody,
  Name,
  Price,
  PriceLabel,
  PriceQuantity,
  Quantity,
  styles,
  TextButton,
  Total,
};
const Client = styled.Text`
  font-size: 14px;
  color: ${theme.colors.darkGray};
`;
const ClientData = styled.View`
  background-color: ${theme.colors.lightGreen};
  border-color: green;
  border-width: 1;
  border-radius: 2;
  padding-horizontal: 8;
  padding-vertical: 12;
`;
const ButtonOutlined = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  border-style: solid;
  border-color: ${theme.colors.primary};
  border-width: 1;
  padding-vertical: 12px;
  margin-top: 12px;
  border-radius: 4px;
  align-items: center;
`;
const TextButton = styled.Text`
  margin-left: 24px;
  font-size: ${theme.sizes.base};
  color: ${theme.colors.primary};
  text-transform: uppercase;
`;
const Name = styled.Text`
  flex-basis: 150;
  font-size: 16;
  color: black;
  font-weight: bold;
  overflow: scroll;
  flex-grow: 2;
  flex-wrap: nowrap;
`;
const ClientForm = styled.View``;
const CurrentDate = styled.View`
  background-color: ${theme.colors.lightGray};
  padding: 16px;
  flex-direction: row;
`;
const DetailContent = styled.View`
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.lightGray};
`;
const Quantity = styled.Text`
  flex-shrink: 10;
  color: ${theme.colors.success};
  font-size: 14;
  font-weight: bold;
  flex-wrap: nowrap;
`;
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
const ListBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },

  addPoint: {
    padding: theme.sizes.padding,
  },

  list: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    height: 80,
    alignItems: 'center',

    paddingLeft: 12,
    elevation: 1,
  },

  code: {
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },

  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },

  more: {
    position: 'absolute',
    right: 0,
  },

  headerCodeText: {
    color: theme.colors.gray,
    fontSize: theme.sizes.base,
    fontWeight: 'bold',
  },

  currentDate: {
    backgroundColor: theme.colors.lightGray,
    padding: 16,
    flexDirection: 'row',
  },
  currentDateText: {color: theme.colors.gray},

  container: {
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },

  client_data: {
    fontSize: 14,
  },

  detailText: {textTransform: 'uppercase', color: theme.colors.gray},

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

  quantity: {
    flexShrink: 10,
    color: theme.colors.gray2,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  total: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  leftSwipeItem: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    height: 48,
    elevation: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    backgroundColor: '#c3000d',
  },

  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    backgroundColor: '#c3000d',
  },

  totalPriceContainer: {
    borderColor: theme.colors.success,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: theme.sizes.p12,

    alignItems: 'center',
    backgroundColor: 'rgba(7, 139, 117, 0.05)',
  },
  totalPrice: {
    color: theme.colors.success,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  hiddenList: {
    margin: 5,
    backgroundColor: '#c3000d',
    height: 44,
    elevation: 1,
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

  dList: {
    margin: 4,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  oList: {
    margin: 5,
    flex: 1,
    backgroundColor: 'white',
    height: 80,
    alignItems: 'center',
    paddingLeft: 12,
    elevation: 1,
  },

  listContainer: {
    flex: 1,
    // paddingVertical: 12,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  oCode: {
    textAlign: 'left',
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: 'bold',
  },

  oName: {
    flexBasis: 150,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    overflow: 'scroll',
    flexGrow: 2,
    flexWrap: 'nowrap',
  },

  price: {
    flexShrink: 10,
    color: theme.colors.success,
    fontSize: 14,
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
    flexWrap: 'nowrap',
  },

  listEmpty: {alignItems: 'center', justifyContent: 'center'},

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    elevation: 8,
  },

  numberBox: {
    marginBottom: theme.sizes.p8,
  },

  selected: {backgroundColor: '#E2FAE8'},
});
