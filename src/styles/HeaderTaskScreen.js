import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tcbClose: {
    borderRadius: 25,
    padding: 7,
  },
  vwMsgTopo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  txtMsgTopo: (cor) => ({
    fontSize: 22,
    color: cor,
    fontWeight: 'bold',
  }),
});
