import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  InputTitle: (cor) => ({
    flex: 1,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
    fontWeight: 'bold',
    color: cor,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  }),
  AreaHeader: (background) => ({
    height: 50,
    width: '100%',
    backgroundColor: background,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  icons: {
    height: 50,
    width: 50,
    textAlign: 'center',
    paddingTop: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  },
  touchIcons: {
    borderRadius: 30,
  },
});
