import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  vwContent: {
    flex: 1,
  },
  inputTxt: (corInv, fonte) => ({
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
    width: '93%',
    color: corInv,
    textAlignVertical: 'top',
    fontSize: fonte,
    marginTop: 5,
    alignSelf: 'center',
  }),
  gradientBgcBottom: {
    position: 'absolute',
    bottom: 0,
    elevation: 1,
    width: '100%',
    height: 30,
  },
  gradientBgcTop: {
    position: 'absolute',
    top: 0,
    elevation: 1,
    width: '100%',
    height: 30,
  },
  vwScrollInput: {
    paddingBottom: 10,
    paddingTop: 10,
  },
});
