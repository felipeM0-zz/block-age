import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {translate} from '../locales';
// STYLES
import styles from '../styles/EmptyTask';

export default (props) => {
  return (
    <View>
      <Icon
        name={props.nameicon}
        size={100}
        color="#DDD"
        style={styles.icon(props.nameicon)}
      />
      <Text style={styles.EmptyText}>{translate('txtemptytask')}</Text>
    </View>
  );
};
