import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// STYLES
import styles from '../styles/ListaItemSwipe';

export default () => {
  return (
    <View style={styles.ViewIcon}>
      <Icon name="trash" size={23} color="#b52121" style={styles.iconTrash} />
    </View>
  );
};
