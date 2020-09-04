import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: (props) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: props.primary,
  }),
  vwFlat: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  flatStyle: (flx, alignList) => ({
    justifyContent: 'center',
    flex: flx,
    alignItems: alignList,
  }),
});
