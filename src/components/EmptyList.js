import React from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import {translate} from '../locales/';
// IMAGES JSON
import SleepDark from '../images/json/sleep-dark.json';
import SleepLight from '../images/json/sleep-light.json';
// STYLES
import styles from '../styles/EmptyList';

export default (props) => {
  const Color = () => {
    let cor = props.bgc == '#FFFFFF' ? '#212121' : '#FFFFFF';
    return cor;
  };

  return (
    <View style={styles.vwContainer(props.bgc)}>
      <View style={styles.vwLottie}>
        <Lottie
          style={styles.ltEmpty}
          resizeMode="contain"
          autoSize
          source={props.bgc == '#FFFFFF' ? SleepLight : SleepDark}
          autoPlay
          loop
        />
        <Text style={styles.txtEmpty(Color())}>{translate('msgcat')}</Text>
      </View>
    </View>
  );
};
