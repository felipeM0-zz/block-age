import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: (props) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: props.primary,
  }),
  vwMsgTopo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtMsgTopo: (props) => ({
    fontSize: 22,
    color: props.padrao,
    fontWeight: 'bold',
  }),
  vwPlus: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  vwFlat: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  iconPlus: (props) => ({
    backgroundColor: props.padrao,
    borderTopLeftRadius: 50,
    width: 60,
    height: 60,
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 7,
    marginTop: 5,
    color: props.primary,
  }),
  iconConfig: (props) => ({
    backgroundColor: props.padrao,
    borderTopRightRadius: 50,
    width: 40,
    height: 40,
    textAlign: 'center',
    paddingTop: 14,
    paddingRight: 7,
    marginTop: 5,
    color: props.primary,
  }),
  spinnerTextStyle: {
    color: '#FFF',
  },
  flatStyle: (flx, alignList) => ({
    justifyContent: 'center',
    flex: flx,
    alignItems: alignList,
  }),
});
