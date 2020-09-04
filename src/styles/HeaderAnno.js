import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  AreaHeader: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchIcons: {
    borderRadius: 30,
  },
  iconsConfig: {
    height: 50,
    width: 50,
    textAlign: 'center',
    paddingTop: 12,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 2,
  },
  vwRightIcons: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
