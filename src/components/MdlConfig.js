import React, {useState} from 'react';
import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import {translate} from '../locales/';
// IMPORTED COMPONENTS
import BottomAlert from '../components/BottomAlert';
// STYLES
import styles from '../styles/MdlConfig';

const MdlConfig = (props) => {
  const [showAlertFabric, setShowAlertFabric] = useState(false);

  const saveDownShare = async (v) => {
    try {
      props.setQuality(Number(v));
      await AsyncStorage.setItem('@downshare', Number(v).toString());
    } catch (error) {
      console.log('PROBLEM SAVEDOWNSHARE: ', error);
    }
  };

  const saveFonte = async (v) => {
    try {
      props.setFonte(Number(v));
      await AsyncStorage.setItem('@fonte', Number(v).toString());
    } catch (error) {
      console.log('PROBLEM SAVEFONTE: ', error);
    }
  };

  return (
    <SafeAreaView>
      {showAlertFabric && (
        <BottomAlert
          title={translate('titlealertfabric')}
          text={translate('txtalertfabric')}
          showCancel={true}
          icon="warning"
          loop={false}
          showConfirm={true}
          onCancel={() => setShowAlertFabric(false)}
          onConfirm={() => props.deleteAll()}
          closeAlert={() => setShowAlertFabric(false)}
          visible={showAlertFabric}
        />
      )}
      <Modal
        visible={props.activ}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => props.closeModal(false)}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="none"
          onPress={() => props.closeModal(false)}
          style={styles.modal}>
          <View style={styles.ModalBody}>
            <TouchableHighlight
              onPress={() => {}}
              underlayColor="transparent"
              style={styles.lastBox}>
              <>
                <View style={styles.vwBody}>
                  <Text style={styles.txtCorFundo}>{translate('theme')}</Text>
                  <SwitchSelector
                    style={styles.themeSelector}
                    initial={props.position}
                    onPress={(value) => props.colorChangeAll(value)}
                    textColor="#212121"
                    selectedColor="#FFFFFF"
                    animationDuration={300}
                    buttonColor="#212121"
                    borderColor="#212121"
                    backgroundColor="#FFFFFF"
                    hasPadding
                    options={[
                      {label: translate('txtthemedark'), value: 'd'},
                      {label: translate('txtthemelight'), value: 'l'},
                      {label: translate('txtthemedefault'), value: 'p'},
                    ]}
                  />
                </View>

                <View style={styles.vwBody}>
                  <Text style={styles.txtCorFundo}>
                    {translate('keyboard')}
                  </Text>
                  <Text style={styles.txtInfoKey}>
                    {translate('keyquestion')}
                  </Text>
                  <SwitchSelector
                    style={styles.keyboardSelector}
                    initial={props.keyboard == 'n' ? 1 : 0}
                    onPress={(value) => props.sendKeyboardType(value)}
                    textColor="#212121"
                    selectedColor="#FFFFFF"
                    animationDuration={300}
                    buttonColor="#212121"
                    borderColor="#212121"
                    backgroundColor="#FFFFFF"
                    hasPadding
                    options={[
                      {label: translate('keyboardyes'), value: 'y'},
                      {label: translate('keyboardno'), value: 'n'},
                    ]}
                  />
                </View>

                <View style={styles.vwBody}>
                  <Text style={styles.txtCorFundo}>
                    {translate('downshare')}
                  </Text>
                  <View style={styles.vwSlider}>
                    <Slider
                      value={Number(props.quality)}
                      onValueChange={(v) => saveDownShare(v)}
                      minimumValue={0.1}
                      maximumValue={1}
                      step={0.1}
                      maximumTrackTintColor="#212121"
                      minimumTrackTintColor="#212121"
                      thumbTintColor="#212121"
                      style={styles.slider}
                    />
                    <Text style={styles.txtInfoSlider}>
                      {Number(props.quality).toFixed(1) * 100}%
                    </Text>
                  </View>
                  <Text style={styles.txtQualityDownShare}>
                    {translate('txtquality')}
                  </Text>
                </View>

                <View style={styles.vwBody}>
                  <Text style={styles.txtCorFundo}>
                    {translate('txtfonte')}
                  </Text>
                  <View style={styles.vwSlider}>
                    <Slider
                      value={Number(props.fonte)}
                      onValueChange={(v) => saveFonte(v)}
                      minimumValue={14}
                      maximumValue={22}
                      step={1}
                      maximumTrackTintColor="#212121"
                      minimumTrackTintColor="#212121"
                      thumbTintColor="#212121"
                      style={styles.slider}
                    />
                    <Text style={styles.txtInfoSlider}>
                      {Number(props.fonte)}
                    </Text>
                  </View>
                </View>

                <View style={styles.vwBody}>
                  <Text style={styles.txtCorFundo}>
                    {translate('txtreturnsettings')}
                  </Text>
                  <Text style={styles.txtFabric}>
                    {translate('txtmsgwarning')}
                  </Text>
                  <TouchableHighlight
                    style={styles.VwConfirmFabric}
                    underlayColor="none"
                    activeOpacity={1}
                    onPress={() => setShowAlertFabric(true)}>
                    <Text style={styles.txtConfirm}>
                      {translate('txtreset')}
                    </Text>
                  </TouchableHighlight>
                </View>
              </>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(51,51,51,0.2)"
              onPress={() => props.closeModal(false)}
              style={styles.btnClose}>
              <Icon name="close" size={25} />
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    position: state.annoReducer.position,
    primary: state.annoReducer.primary,
    quality: state.annoReducer.quality,
    fonte: state.annoReducer.fonte,
    cortab: state.annoReducer.cortab,
    keyboard: state.annoReducer.keyboard,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setQuality: (quality) =>
      dispatch({type: 'SET_QUALITY', payload: {quality}}),
    setFonte: (fonte) => dispatch({type: 'SET_FONTE', payload: {fonte}}),
    setCorTab: (cortab) => dispatch({type: 'SET_CORTAB', payload: {cortab}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MdlConfig);
