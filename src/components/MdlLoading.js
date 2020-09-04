import React from 'react';
import {Modal, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
// IMPORTED COMPONENTS
import Loading from '../images/json/loading.json';
// STYLES
import styles from '../styles/MdlLoading';

export default () => {
  return (
    <Modal
      visible={true}
      onRequestClose={() => {}}
      statusBarTranslucent={false}>
      <View style={styles.vwContainer}>
        <View style={styles.vwBgc}>
          <View style={styles.vwContent}>
            <Lottie
              resizeMode="contain"
              autoSize
              source={Loading}
              autoPlay
              loop
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
