import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';
import moment from 'moment';
import {translate} from '../locales';
// IMPORT COMPONENTS
import HeaderAnno from '../components/HeaderAnno';
import InfoAnno from '../components/InfoAnno';
import InputAnno from '../components/InputAnno';
import MdlOptions from '../components/MdlOptions';
import MdlColor from '../components/MdlColor';
import BottomAlert from '../components/BottomAlert';
// STYLES
import styles from '../styles/AnnotationCreate';

const AnnoPage = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [quality, setQuality] = useState(0.8);
  const [downShare, setDownShare] = useState();
  const [qnt, setQnt] = useState('');
  const [data, setData] = useState(new Date());
  const [active, setActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAlertReturn, setShowAlertReturn] = useState(false);
  const [background, setBackground] = useState(
    props.cor != '#474747' ? props.cor : props.primary,
  );

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      props.setInit(false);
      verify();
    });
    return focus;
  }, [navigation]);

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setTimeout(() => {
        props.setInit(true);
      }, 450);
    });
    return blur;
  }, [navigation]);

  BackHandler.addEventListener('hardwareBackPress', async () => {
    handleBackButton();
  });

  const verify = async () => {
    try {
      await AsyncStorage.multiRemove([
        '@contAnno',
        '@dataAnno',
        '@initContAnno',
        '@initBgcAnno',
      ]);
      if ((await AsyncStorage.getItem('@downshare')) != null) {
        setQuality(Number(await AsyncStorage.getItem('@downshare')));
      }
    } catch (error) {
      console.log('PROBLEM VERIFYANNO: ', error);
    } finally {
      await AsyncStorage.setItem('@initBgcAnno', background);
    }
  };

  const TopBar = (props) => {
    return isFocused ? <StatusBar {...props} /> : null;
  };

  const saveAll = async () => {
    try {
      let nameAsync = '@anno' + uuid();
      nameAsync = route.params.id != undefined ? route.params.id : nameAsync;
      let conteudo = await AsyncStorage.getItem('@initContAnno');
      let initcor = await AsyncStorage.getItem('@initBgcAnno');

      if (
        conteudo != null &&
        qnt != '' &&
        conteudo == qnt &&
        initcor == background
      ) {
        ReturnPage();
      } else {
        let saveAnno = [
          {
            conteudo: await AsyncStorage.getItem('@contAnno'),
            id: nameAsync,
            data: new Date().toString(),
            bgc:
              background == props.primary
                ? props.primary == '#FFFFFF'
                  ? '#FFFFFF'
                  : '#000000'
                : background,
          },
        ];

        props.setAdd(true);

        await AsyncStorage.setItem(nameAsync, JSON.stringify(saveAnno));
        ReturnPage();
      }
    } catch (error) {
      console.log('PROBLEM SAVEALL ANNO: ', error);
    }
  };

  const ReturnPage = async () => {
    try {
      navigation.navigate('AnnotationScreen');
      setShowAlertReturn(false);
    } catch (error) {
      console.log('PROBLEM RETURNPAGE ANNO: ', error);
    }
  };

  const bgc = (color) => {
    setBackground(color);
    props.setCor(color);
  };

  const CopyTextClipboard = () => {
    Clipboard.setString(qnt);
    ToastAndroid.showWithGravityAndOffset(
      translate('copied'),
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      150,
    );
    setShowOptions(false);
  };

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        ToastAndroid.showWithGravityAndOffset(
          translate('permission'),
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          150,
        );
      }
    } catch (error) {
      console.log('PROBLEM PERMISSION: ', error);
    }
  };

  const downloadImage = async () => {
    try {
      setShowOptions(false);
      const uri = await captureRef(downShare, {
        format: 'jpg',
        quality: quality,
      });

      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        ToastAndroid.showWithGravityAndOffset(
          translate('downloadsaved'),
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          150,
        );
        setShowOptions(false);
      }
    } catch (error) {
      console.log('PROBLEM DOWNLOAD IMAGEM: ', error);
    }
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(downShare, {
        format: 'jpg',
        quality: quality,
      });

      setShowOptions(false);
      const shareResponse = await Share.open({
        url: uri,
        message:
          `${translate('shared')} — ` +
          moment(new Date()).format('DD/MM/YY (HH:mm a)'),
        failOnCancel: false,
      });
    } catch (error) {
      console.log('PROBLEM SHAREIMAGEM: ', error);
    }
  };

  const handleBackButton = async () => {
    try {
      let conteudo = await AsyncStorage.getItem('@initContAnno');
      let initcor = await AsyncStorage.getItem('@initBgcAnno');

      (conteudo != null && conteudo == qnt && initcor == background) ||
      (conteudo == null && qnt == '' && initcor == background)
        ? ReturnPage()
        : showAlertReturn
        ? setShowAlertReturn(false)
        : setShowAlertReturn(true);

      return true;
    } catch (error) {
      console.log('PROBLEM HANDLEBACK ANNO: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.savPage(background)}>
      {showAlertReturn && (
        <BottomAlert
          title={translate('titlealertreturn')}
          text={translate('txtalertreturn')}
          icon="warning"
          loop={false}
          showConfirm={true}
          showSave={qnt.length > 0}
          onConfirm={() => ReturnPage()}
          onSave={() => saveAll()}
          closeAlert={() => setShowAlertReturn(false)}
          visible={showAlertReturn}
        />
      )}

      <TopBar
        backgroundColor={background}
        barStyle={background == '#212121' ? 'light-content' : 'dark-content'}
      />

      <HeaderAnno
        ReturnClear={() => handleBackButton()}
        saveAll={() => saveAll()}
        labelTxt={background}
        qnt={qnt.length}
        showOptions={() => setShowOptions(true)}
      />

      <InfoAnno qnt={qnt.length} labelTxt={background} data={data} />

      <InputAnno
        qnt={(res) => setQnt(res)}
        vwRef={(res) => setDownShare(res)}
        data={(res) => setData(res)}
        labelTxt={background}
      />

      {showOptions && (
        <MdlOptions
          active={showOptions}
          closeModal={() => setShowOptions(false)}
          modalColor={() => setActive(true)}
          copy={() => CopyTextClipboard()}
          downloadImage={() => downloadImage()}
          shareImage={() => shareImage()}
          showCopy={true}
          showDownAndShare={qnt.length > 0 ? true : false}
        />
      )}

      {active && (
        <MdlColor
          bgc={background}
          activ={active}
          bgColor={(value) => bgc(value)}
          bgc={background}
          background={props.primary}
          closeModal={(value) => setActive(value)}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.annoReducer.status,
    cor: state.annoReducer.cor,
    primary: state.annoReducer.primary,
    padrao: state.annoReducer.padrao,
    position: state.annoReducer.position,
    add: state.annoReducer.add,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (status) => dispatch({type: 'SET_STATUS', payload: {status}}),
    setCor: (cor) => dispatch({type: 'SET_COR', payload: {cor}}),
    setAdd: (add) => dispatch({type: 'SET_ADD', payload: {add}}),
    setCheck: (check) => dispatch({type: 'SET_CHECK', payload: {check}}),
    setInit: (init) => dispatch({type: 'SET_INIT', payload: {init}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnoPage);
