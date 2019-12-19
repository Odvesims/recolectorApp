import {StyleSheet, Platform} from 'react-native';
import {theme} from '../../constants';

export const styles = StyleSheet.create({
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: 0,
      },
    }),
  },
  list: {
    margin: 5,
    backgroundColor: 'white',
    height: 80,
    paddingLeft: 12,
    elevation: 1,
  },
  content: {
    backgroundColor: theme.colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 12,
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
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },

  address: {
    fontSize: 12,
    color: 'gray',
    overflow: 'hidden',
  },

  headerCode: {
    backgroundColor: theme.colors.lightGray,
    paddingLeft: 24,
    elevation: 0,
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

  error: {borderColor: theme.colors.accent},

  default: {
    borderColor: theme.colors.gray2,
  },

  paddingBottom: {
    paddingBottom: theme.sizes.base,
  },
});
