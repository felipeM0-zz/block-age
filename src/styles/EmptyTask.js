import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  EmptyText: {
    color: '#DDD',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.2,
  },
  icon: (nameicon) => ({
    textAlign: 'center',
    justifyContent: 'center',
    paddingLeft: nameicon == 'edit' ? 15 : 8,
    opacity: 0.2,
  }),
});
