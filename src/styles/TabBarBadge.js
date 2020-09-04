import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconTab: {
    marginLeft: 6,
    padding: 5,
  },
  vwTab: (tab) => ({
    position: 'absolute',
    width: 22,
    height: 22,
    left: 0,
    top: 0,
    backgroundColor: tab,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  }),
  vwTabBody: (focado) => ({
    backgroundColor: focado ? '#FF0000' : 'rgba(255,0,0,0.3)',
    width: 17,
    height: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
  txtBadge: (focado) => ({
    color: focado ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
    fontSize: 8,
    fontWeight: 'bold',
  }),
});
