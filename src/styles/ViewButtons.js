import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  TxtButton: {
    width: 80,
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    textAlign: 'center',
  },
  AreaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignSelf: 'center',
  },
  AreaLabelButtons: {
    paddingBottom: 5,
  },
  icons: (props) => ({
    height: 50,
    width: 50,
    textAlign: 'center',
    paddingTop: 12,
    backgroundColor: props.color,
    color: props.color == '#212121' ? '#FFFFFF' : '#212121',
    alignSelf: 'flex-end',
    borderRadius: 30,
    elevation: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  }),
});
