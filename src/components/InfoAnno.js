import React from 'react';
import {View, Text} from 'react-native';
import Moment from 'react-moment';
import {translate} from '../locales/';
// STYLES
import styles from '../styles/AnnoInfo';

export default (props) => {
  const returnColor = () => {
    let corInv = props.labelTxt == '#212121' ? '#FFFFFF' : '#212121';
    return corInv;
  };

  return (
    <View style={styles.vwContainer}>
      <Text style={styles.txtVal(props, returnColor())}>{props.qnt}</Text>
      <Text style={styles.txtLabel(returnColor())}>
        {' '}
        {translate('txtchars')} |
      </Text>
      <Text style={styles.txtLabel(returnColor())}>
        {' '}
        {translate('txtlastmodify')}:{' '}
      </Text>
      <Moment
        style={styles.txtVal(props, returnColor())}
        element={Text}
        format="DD/MM/YY (HH:mm a)">
        {props.data}
      </Moment>
    </View>
  );
};
