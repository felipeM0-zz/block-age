import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  vwContainer: {
    height: 50,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(51,51,51,0.1)',
  },
  txtVal: (props, corInv) => ({
    fontSize: 12,
    color: corInv,
    fontWeight: 'bold',
    backgroundColor:
      props.labelTxt == '#212121'
        ? 'rgba(219, 219, 219, 0.3)'
        : 'rgba(51, 51, 51, 0.1)',
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  }),
  txtLabel: (corInv) => ({
    fontSize: 12,
    color: corInv,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  }),
});
