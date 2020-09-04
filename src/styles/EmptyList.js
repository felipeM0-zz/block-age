import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  vwContainer: (corbgc) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: corbgc,
  }),
  vwLottie: {
    width: '100%',
  },
  ltEmpty: {
    alignSelf: 'center',
  },
  txtEmpty: (cor) => ({
    color: cor,
    fontSize: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '15%',
  }),
});
