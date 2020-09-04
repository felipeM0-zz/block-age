import React from 'react';
import {Modal, View, Text, TouchableHighlight} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import {translate} from '../locales';
// import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
// STYLES
import styles from '../styles/MdlOptions';

export default (props) => {
  return (
    <Modal
      visible={props.active}
      animationType="fade"
      transparent={false}
      statusBarTranslucent={true}
      onRequestClose={() => props.closeModal()}>
      <BlurView
        style={styles.vwContent}
        blurType="dark"
        blurAmount={80}
        reducedTransparencyFallbackColor="#212121"
      />
      <View style={styles.vwAll}>
        <TouchableHighlight
          onPress={() => props.closeModal()}
          underlayColor="rgba(255,255,255,0.12)"
          activeOpacity={1}
          style={styles.tchCloseTop}>
          <IconM name="close" size={35} color="#FFFFFF" />
        </TouchableHighlight>
        <View style={styles.contentGroup}>
          <View style={styles.vwButtons}>
            <TouchableHighlight
              underlayColor="rgba(51,51,51,0.5)"
              style={styles.tchViewButton}
              onPress={() => {
                props.modalColor();
                props.closeModal();
              }}
              activeOpacity={1}>
              <View style={styles.btnOption}>
                <IconM style={styles.iconOption} name="color-lens" size={30} />
              </View>
            </TouchableHighlight>
            <Text style={styles.txtButton}>{translate('txtmdloptions1')}</Text>
          </View>

          {props.showDownAndShare && (
            <View style={styles.vwButtons}>
              <TouchableHighlight
                underlayColor="rgba(51,51,51,0.5)"
                style={styles.tchViewButton}
                onPress={() => props.downloadImage()}
                activeOpacity={1}>
                <View style={styles.btnOption}>
                  <IconF style={styles.iconOption} name="download" size={25} />
                </View>
              </TouchableHighlight>
              <Text style={styles.txtButton}>
                {translate('txtmdloptions2')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.contentGroup}>
          {props.showDownAndShare && (
            <View style={styles.vwButtons}>
              <TouchableHighlight
                underlayColor="rgba(51,51,51,0.5)"
                style={styles.tchViewButton}
                onPress={() => props.shareImage()}
                activeOpacity={1}>
                <View style={styles.btnOption}>
                  <IconF
                    style={styles.iconOption}
                    name="share-square-o"
                    size={25}
                  />
                </View>
              </TouchableHighlight>
              <Text style={styles.txtButton}>
                {translate('txtmdloptions3')}
              </Text>
            </View>
          )}

          {props.showCopy && props.showDownAndShare && (
            <View style={styles.vwButtons}>
              <TouchableHighlight
                underlayColor="rgba(51,51,51,0.5)"
                style={styles.tchViewButton}
                onPress={() => props.copy()}
                activeOpacity={1}>
                <View style={styles.btnOption}>
                  <IconM
                    style={styles.iconOption}
                    name="content-copy"
                    size={25}
                  />
                </View>
              </TouchableHighlight>
              <Text style={styles.txtButton}>
                {translate('txtmdloptions4')}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
