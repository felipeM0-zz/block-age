import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  AreaDone: (status) => ({
    color: status ? '#90ee90' : 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: status ? 'transparent' : '#3d3d3d',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 5,
  }),
  ViewTextResult: {
    height: 20,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  ViewInfo: {
    height: 20,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  InfoDel: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    marginRight: 5,
  },
});
