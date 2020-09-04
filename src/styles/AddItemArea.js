import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  addItemArea: {
    backgroundColor: '#333333',
    padding: 10,
    paddingTop: 5,
    flexDirection: 'row',
  },
  AddItemInput: (cor) => ({
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    height: 50,
    borderRadius: 5,
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderWidth: cor == '#FFFFFF' || cor == "#212121" ? 0 : 3,
    borderColor: cor,
    marginTop: 5,
    padding: 10,
    flex: 1,
  }),
  AreaRadio: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  TouchRadio: {
    marginTop: 7,
    height: 30,
    width: 30,
  },
  RadioBtn: (radio, radioVal, props) => ({
    flex: 1,
    borderRadius: 20,
    borderColor: '#FFFFFF',
    borderWidth: 3,
    backgroundColor:
      props.editIndex == ''
        ? radio
          ? '#90ee90'
          : 'transparent'
        : radioVal
        ? '#90ee90'
        : 'transparent',
  }),
});
