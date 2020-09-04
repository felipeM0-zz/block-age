import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StatusBar,
  BackHandler,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {translate} from '../locales';
// IMPORTED SCRIPTS JS
import {anno} from '../scripts/data';
// IMPORT COMPONENTS
import EmptyList from '../components/EmptyList';
import AnnoList from '../components/AnnoList';
import MdlConfig from '../components/MdlConfig';
import VwBottomButtons from '../components/vwBottomButtons';
import BottomAlert from '../components/BottomAlert';
import HeaderAnnoScreen from '../components/HeaderAnnoScreen';
import MdlLoading from '../components/MdlLoading';
// STYLES
import styles from '../styles/AnnotationScreen';

const AnnotationScreen = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [items, setItems] = useState([]);
  const [flx, setFlx] = useState(0);
  const [alignList, setAlignList] = useState('stretch');
  const [mdlConfig, setMdlConfig] = useState(false);
  const [spin, setSpin] = useState(true);
  const [showAlertAdd, setShowAlertAdd] = useState(false);
  const [showAlertExit, setShowAlertExit] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    importData();
    BackHandler.addEventListener('hardwareBackPress', async () => {
      setShowAlertExit(!showAlertExit);
    });
  }, [isFocused]);

  const TopBar = (props) => {
    return isFocused ? <StatusBar hidden={spin} {...props} /> : null;
  };

  const importData = async () => {
    try {
      anno().then((list) => {
        props.setAnno(list.length);
        verifyCount(list);
      });

      colorAll();
      keyboardType();
      checkConfig();

      setTimeout(() => {
        setSpin(false);
      }, 2100);

      setShowAlertAdd(props.add);

      props.add
        ? setTimeout(() => {
            setShowAlertAdd(false);
            props.setAdd(false);
          }, 3000)
        : null;
    } catch (error) {
      console.log('PROBLEMA: ', error);
    }
  };

  const checkConfig = async () => {
    try {
      let downshare = await AsyncStorage.getItem('@downshare');
      let fonte = await AsyncStorage.getItem('@fonte');
      if (downshare != null) {
        let v = Number(downshare).toFixed(1);
        v == 1.0 ? props.setQuality(1) : props.setQuality(v);
      }
      if (fonte != null) {
        let v = Number(fonte);
        props.setFonte(v);
      }
    } catch (error) {
      console.log('PROBLEMA CHECKCONFIG: ', error);
    }
  };

  const verifyCount = (lista) => {
    lista.length <= 0
      ? (setFlx(1), setAlignList('center'))
      : (setFlx(0), setAlignList('stretch'));
    setItems(lista);
  };

  // TODO: FORMA 1 PARA "CORRIGIR" DIMENSÃO DO ULTIMO ITEM DA LISTA
  // const { height, width } = Dimensions.get('window');
  // const itemWidth = (width - 60) / 2;
  // (minWidth: itemWidth, maxWidth: itemWidth) <<- NO style VIEW DO FLATLIST

  const AnswerOptions = async (items, idDel) => {
    verifyCount(items);
    props.setAnno(items.length);
    await AsyncStorage.removeItem(idDel);
  };

  const sendNew = () => {
    props.setStatus(true);
    props.setCheck(false);
    navigation.navigate('AnnotationCreate', {
      id: undefined,
    });
    props.setCor('#474747');
  };

  const bgcSaved = (bgc, ind) => {
    props.setStatus(false);
    props.setCheck(false);
    navigation.navigate('AnnotationCreate', {
      id: ind,
    });
    props.setCor(bgc == '#000000' ? '#212121' : bgc);
  };

  const colorAll = async (color) => {
    try {
      color == 'd' || (await AsyncStorage.getItem('@padrao')) == '0'
        ? (props.setPrimary('#212121'),
          props.setPadrao('#FFFFFF'),
          props.setCor('#212121'),
          props.setPosition(0),
          await AsyncStorage.setItem('@padrao', '0'))
        : null;

      color == 'l' || (await AsyncStorage.getItem('@padrao')) == '1'
        ? (props.setPrimary('#FFFFFF'),
          props.setPadrao('#212121'),
          props.setCor('#FFFFFF'),
          props.setPosition(1),
          await AsyncStorage.setItem('@padrao', '1'))
        : null;

      color == 'p' || (await AsyncStorage.getItem('@padrao')) == '2'
        ? (props.setPrimary('#212121'),
          props.setPadrao('#ffd700'),
          props.setCor('#212121'),
          props.setPosition(2),
          await AsyncStorage.setItem('@padrao', '2'))
        : null;
    } catch (error) {
      console.log('PROBLEM COLORALL ANNO: ', error);
    }
  };

  const keyboardType = async (type) => {
    try {
      type == 'y' || (await AsyncStorage.getItem('@keyb')) == 'y'
        ? (props.setKeyboard('y'), await AsyncStorage.setItem('@keyb', 'y'))
        : null;

      type == 'n' || (await AsyncStorage.getItem('@keyb')) == 'n'
        ? (props.setKeyboard('n'), await AsyncStorage.setItem('@keyb', 'n'))
        : null;
    } catch (error) {
      console.log('PROBLEM KEYBOARDTYPE: ', error);
    }
  };

  const deleteAll = async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('@padrao', '2');
    setMdlConfig(!mdlConfig);
    importData();
    props.setAnno(0);
    props.setTask(0);
    props.setQuality(0.8);
    props.setFonte(17);
    props.setKeyboard('n');
  };

  return (
    <SafeAreaView style={styles.container(props)}>
      {spin && <MdlLoading />}

      {!spin && (
        <>
          <HeaderAnnoScreen
            bgc={props.primary}
            padrao={props.padrao}
            active={active}
            refresh={() => importData()}
            returnActive={(res) => setActive(res)}
          />

          <View style={styles.vwFlat}>
            <FlatList
              data={items}
              horizontal={false}
              numColumns={2}
              renderItem={({item}) => (
                <AnnoList
                  AnswerOptions={AnswerOptions}
                  longPress={(res) => setActive(res)}
                  showDel={active}
                  ind={item.id}
                  data={item.data}
                  list={items}
                  bgc={item.bgc == '#212121' ? '#000000' : item.bgc}
                  bgSaved={(bgc, ind) => bgcSaved(bgc, ind)}
                  conteudo={item.conteudo}
                />
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => {
                return <EmptyList bgc={props.primary} nameicon="edit" />;
              }}
              contentContainerStyle={styles.flatStyle(flx, alignList)}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <VwBottomButtons
            padrao={props.padrao}
            primary={props.primary}
            onPress={(v) => {
              setMdlConfig(v);
              setActive(false);
            }}
            sendNew={sendNew}
            showInfoDel={items.length}
          />

          <TopBar
            backgroundColor={props.primary}
            barStyle={
              props.primary != '#212121' ? 'dark-content' : 'light-content'
            }
          />

          {mdlConfig && (
            <MdlConfig
              deleteAll={deleteAll}
              colorChangeAll={(v) => colorAll(v)}
              sendKeyboardType={(v) => keyboardType(v)}
              activ={mdlConfig}
              closeModal={(res) => setMdlConfig(res)}
            />
          )}

          {showAlertAdd && (
            <BottomAlert
              title={translate('titlealertadd')}
              text={translate('txtalertadd')}
              icon="success"
              loop={false}
              showConfirm={false}
              closeAlert={() => {
                props.setAdd
                  ? (setShowAlertAdd(false), props.setAdd(false))
                  : null;
              }}
              visible={showAlertAdd}
              position="center"
            />
          )}

          {showAlertExit && (
            <BottomAlert
              title={translate('titlealertexit')}
              text={translate('txtalertexit')}
              icon="think"
              loop={true}
              showConfirm={true}
              onConfirm={() => BackHandler.exitApp()}
              closeAlert={() => setShowAlertExit(false)}
              visible={showAlertExit}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    primary: state.annoReducer.primary,
    padrao: state.annoReducer.padrao,
    position: state.annoReducer.position,
    add: state.annoReducer.add,
    cor: state.annoReducer.cor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (status) => dispatch({type: 'SET_STATUS', payload: {status}}),
    setAnno: (anno) => dispatch({type: 'SET_ANNO', payload: {anno}}),
    setTask: (task) => dispatch({type: 'SET_TASK', payload: {task}}),
    setCor: (cor) => dispatch({type: 'SET_COR', payload: {cor}}),

    setPrimary: (primary) =>
      dispatch({type: 'SET_PRIMARY', payload: {primary}}),
    setPadrao: (padrao) => dispatch({type: 'SET_PADRAO', payload: {padrao}}),
    setPosition: (position) =>
      dispatch({type: 'SET_POSITION', payload: {position}}),
    setAdd: (add) => dispatch({type: 'SET_ADD', payload: {add}}),
    setCheck: (check) => dispatch({type: 'SET_CHECK', payload: {check}}),
    setQuality: (quality) =>
      dispatch({type: 'SET_QUALITY', payload: {quality}}),
    setFonte: (fonte) => dispatch({type: 'SET_FONTE', payload: {fonte}}),
    setInit: (init) => dispatch({type: 'SET_INIT', payload: {init}}),
    setKeyboard: (keyboard) =>
      dispatch({type: 'SET_KEYBOARD', payload: {keyboard}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationScreen);
