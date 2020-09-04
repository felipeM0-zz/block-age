import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  vwContent: {
    flex: 1,
  },
  swipeList: {
    flexGrow: 0,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  contentScroll: (items) => ({
    flexGrow: 1,
    justifyContent: items <= 0 ? 'center' : 'flex-start',
  }),
  vwLista: (more, items) => ({
    flex: 1,
    justifyContent: items <= 0 ? 'center' : 'flex-start',
    paddingTop: 15,
    paddingBottom: more ? 0 : 8,
  }),
  containerSafe: {
    flex: 1,
    backgroundColor: '#333',
  },
});
