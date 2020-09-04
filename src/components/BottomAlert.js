import React, {useState, useEffect} from 'react';
import {TouchableHighlight, View, Text, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import {translate} from '../locales';
// IMAGES JSON
import success from '../images/json/success.json';
import info from '../images/json/info.json';
import warning from '../images/json/warning.json';
import error from '../images/json/error.json';
import think from '../images/json/think.json';
// STYLES
import styles from '../styles/BottomAlert';

export default (props) => {
  const isFocused = useIsFocused();

  const [showConfirm, setShowConfirm] = useState(true);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    props.showConfirm == false ? setShowConfirm(false) : null;
    !props.showSave ? setShowSave(false) : setShowSave(true);
  }, [isFocused]);

  const returnIcon = () => {
    let icon =
      props.icon == 'success'
        ? success
        : props.icon == 'info'
        ? info
        : props.icon == 'warning'
        ? warning
        : props.icon == 'error'
        ? error
        : props.icon == 'think'
        ? think
        : null;
    return icon;
  };

  const corInfo = () => {
    let req = props.icon == 'warning',
      bgc = req ? '#c22f47' : '#90ee90',
      txt = req ? '#FFFFFF' : '#006400';
    return [bgc, txt];
  };

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => props.closeAlert()}>
      <TouchableHighlight
        underlayColor="none"
        activeOpacity={1}
        onPress={() => props.closeAlert()}
        style={styles.modal(props.position)}>
        <TouchableHighlight style={styles.boxBottom(props.position)}>
          <>
            <View style={styles.vwTitle}>
              <Text numberOfLines={2} style={styles.txtTitle}>
                {props.title}
              </Text>
            </View>
            {props.icon != null && (
              <View style={styles.vwIcon}>
                <Lottie
                  resizeMode="contain"
                  autoSize
                  source={returnIcon()}
                  autoPlay
                  loop={props.loop == null ? true : props.loop}
                />
              </View>
            )}
            <View style={styles.vwContent(showConfirm)}>
              <Text numberOfLines={5} style={styles.txtContent}>
                {props.text}
              </Text>
            </View>
            {showConfirm && (
              <View style={styles.vwButtons}>
                <View style={styles.btnGroup}>
                  <TouchableHighlight
                    underlayColor="none"
                    activeOpacity={1}
                    onPress={() => props.onConfirm()}
                    style={[
                      styles.btnConfirm,
                      styles.btnConfirmBgc(corInfo()[0]),
                    ]}>
                    <Text
                      style={[
                        styles.txtConfirm,
                        styles.txtConfirmColor(corInfo()[1]),
                      ]}>
                      {translate('btnconfirm')}
                    </Text>
                  </TouchableHighlight>
                  {showSave && (
                    <TouchableHighlight
                      underlayColor="none"
                      activeOpacity={1}
                      onPress={() => props.onSave()}
                      style={[styles.btnConfirm, styles.btnSave]}>
                      <Text style={[styles.txtConfirm, styles.txtSave]}>
                        {translate('btnsave')}
                      </Text>
                    </TouchableHighlight>
                  )}
                </View>
              </View>
            )}
            <TouchableHighlight
              underlayColor="rgba(51,51,51,0.2)"
              onPress={() => props.closeAlert()}
              style={styles.btnClose}>
              <Icon name="close" size={25} />
            </TouchableHighlight>
          </>
        </TouchableHighlight>
      </TouchableHighlight>
    </Modal>
  );
};
