import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  ItemCheck: (props) => ({
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    elevation: 3,
    borderColor: '#FFFFFF',
    backgroundColor: props.data.done ? '#90ee90' : 'transparent',
  }),
  ItemText: (props, fonte) => ({
    fontSize: fonte,
    flex: 1,
    color: '#ffffff',
    padding: 0,
    paddingRight: 10,
    textDecorationLine: props.data.done ? 'line-through' : 'none',
    fontWeight: props.data.done ? 'bold' : 'normal',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  }),
  Item: (props) => ({
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#383838',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    elevation: 5,
    borderLeftWidth: 7,
    borderColor: props.cor,
  }),
});
