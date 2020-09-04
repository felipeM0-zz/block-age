import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {translate} from '../locales/';
// STYLES
import styles from '../styles/InfoActions';

export default (props) => {
  return (
    <>
      <View style={styles.ViewInfo}>
        <Text style={styles.InfoDel}>{translate('txtinfodeltask')}</Text>
        <Icon
          name="long-arrow-right"
          color="rgba(255,255,255, 0.3)"
          style={{paddingTop: 2}}
        />
      </View>
      <View style={styles.ViewInfo}>
        <Text style={styles.InfoDel}>{translate('txtinfoedittask')}</Text>
        <IconM name="touch-app" color="rgba(255,255,255, 0.3)" />
      </View>
      <View style={styles.ViewTextResult}>
        <Text style={styles.AreaDone(props.status)}>
          {props.listLength <= 0
            ? ''
            : props.status
            ? translate('txtinfodonetask')
            : `${props.finished}/${props.listLength}`}
        </Text>
        {props.status && props.listLength > 0 && (
          <Icon
            name="check"
            style={{paddingTop: 2}}
            size={15}
            color="#90ee90"
          />
        )}
      </View>
    </>
  );
};
