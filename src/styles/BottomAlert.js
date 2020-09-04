import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnClose: {
    height: 30,
    width: 30,
    backgroundColor: 'rgba(51,51,51,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  modal: (position) => ({
    flex: 1,
    justifyContent: position == 'center' ? 'center' : 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(51,51,51,0.4)',
  }),
  vwIcon: {
    height: 100,
    width: '100%',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtConfirm: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  txtConfirmColor: (cor) => ({
    color: cor,
  }),
  txtSave: {
    color: '#6e642f',
  },
  btnConfirmBgc: (cor) => ({
    backgroundColor: cor,
  }),
  btnConfirm: {
    margin: 10,
    elevation: 2,
    padding: 12,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    backgroundColor: '#d9c557',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  vwButtons: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vwContent: (confirm) => ({
    paddingTop: 5,
    width: '85%',
    alignItems: 'center',
    marginBottom: confirm ? 0 : 30,
  }),
  txtContent: {
    fontSize: 17,
    textAlign: 'center',
    color: 'rgba(51,51,51,0.7)',
  },
  vwTitle: {
    padding: 4,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 10,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  boxBottom: (position) => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: position == 'center' ? '80%' : '100%',
    backgroundColor: '#FFFFFF',
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: position == 'center' ? 30 : 0,
    borderBottomRightRadius: position == 'center' ? 30 : 0,
  }),
});
