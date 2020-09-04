import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconOption: {
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
  },
  vwContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  vwAll: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    elevation: 1,
  },
  btnOption: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tchCloseTop: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    position: 'absolute',
    bottom: 0,
    margin: 20,
    padding: 10,
    borderRadius: 50,
  },
  vwButtons: {
    alignItems: 'center',
    width: '30%',
  },
  txtButton: {
    color: 'rgba(255,255,255,0.8)',
    textShadowColor: 'rgba(0,0,0,1)',
    textShadowRadius: 1,
    textShadowOffset: {width: -0.5, height: 0.5},
    fontSize: 13,
    textAlign: 'center',
  },
  tchViewButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
    marginBottom: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
  },
  contentGroup: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
