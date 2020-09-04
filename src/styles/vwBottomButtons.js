import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  vwDelInfo: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginBottom: 5,
    flexDirection: 'row',
  },
  txtDelInfo: (props) => ({
    fontSize: 9,
    color: props.padrao,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: -0.3, height: 0.3},
    textShadowRadius: 0.5,
    marginRight: 2,
    textAlign: 'center',
  }),
  vwPlus: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconPlus: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    paddingLeft: 15,
    flex: 1,
  },
  iconConfig: (props) => ({
    backgroundColor: props.padrao,
    borderTopRightRadius: 50,
    width: 60,
    height: 60,
    textAlign: 'center',
    paddingTop: 20,
    paddingRight: 7,
    marginTop: 5,
    color: props.primary,
  }),
});
