import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  BackHandler,
} from 'react-native';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {translate} from '../locales';
// IMMPORTED SCRIPTS JS
import {task} from '../scripts/data';
// IMPORTED COMPONENTS
import EmptyList from '../components/EmptyList';
import TaskList from '../components/TaskList';
import MdlConfig from '../components/MdlConfig';
import VwBottomButtons from '../components/vwBottomButtons';
import BottomAlert from '../components/BottomAlert';
import HeaderTaskScreen from '../components/HeaderTaskScreen';
// STYLES
import styles from '../styles/TaskScreen';

const TaskScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [items, setItems] = useState([]);
  const [flx, setFlx] = useState(0);
  const [alignList, setAlignList] = useState('stretch');
  const [mdlConfig, setMdlConfig] = useState(false);
  const [iconName, setIconName] = useState(
    route.name != 'AnnotationScreen' ? 'check-square-o' : 'edit',
  );
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
    return isFocused ? <StatusBar {...props} /> : null;
  };

  const importData = async () => {
    try {
      task().then((list) => {
        props.setTask(list.length);
        verifyCount(list);
      });
      colorAll();
      keyboardType();
      checkConfig();

      setShowAlertAdd(props.add);

      props.add
        ? setTimeout(() => {
            setShowAlertAdd(false);
            props.setAdd(false);
          }, 4000)
        : null;
    } catch (error) {
      console.log('PROBLEM TASK IMPORTDATA: ', error);
    }
  };

  const checkConfig = async () => {
    try {
      if ((await AsyncStorage.getItem('@downshare')) != null) {
        let v = Number(await AsyncStorage.getItem('@downshare')).toFixed(1);
        v == 1.0 ? props.setQuality(1) : props.setQuality(v);
      }
      if ((await AsyncStorage.getItem('@fonte')) != null) {
        let v = Number(await AsyncStorage.getItem('@fonte'));
        props.setFonte(v);
      }
    } catch (error) {
      console.log('PROBLEM TASK CHECKCONFIG: ', error);
    }
  };

  const verifyCount = (lista) => {
    lista.length <= 0
      ? (setFlx(1), setAlignList('center'))
      : (setFlx(0), setAlignList('stretch'));
    setItems([]);
    setItems(lista);
  };

  const NewRequest = (bgc, id) => {
    navigation.navigate('TaskCreate', {
      id: id,
    });
    props.setCor(bgc == '#000000' ? '#212121' : bgc);
  };

  const AnswerOptions = async (items, idDel) => {
    try {
      verifyCount(items);
      props.setTask(items.length);
      await AsyncStorage.removeItem(idDel);
    } catch (error) {
      console.log('PROBLEM TASK ANSWEROPTIONS: ', error);
    }
  };

  const sendNew = () => {
    navigation.navigate('TaskCreate');
    props.setCor('#474747');
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
      console.log('PROBLEM TASK COLORALL: ', error);
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
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem('@padrao', '2');
      setMdlConfig(!mdlConfig);
      importData();
      props.setAnno(0);
      props.setTask(0);
      props.setQuality(0.8);
      props.setFonte(17);
      props.setKeyboard('n');
    } catch (error) {
      console.log('PROBLEM DELETEALL: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container(props)}>
      <TopBar
        barStyle={props.primary != '#212121' ? 'dark-content' : 'light-content'}
        backgroundColor={props.primary}
      />

      <HeaderTaskScreen
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
          renderItem={({item}) => (
            <TaskList
              onPress={(bgc, id) => NewRequest(bgc, id)}
              AnswerOptions={AnswerOptions}
              list={items}
              ind={item.id}
              showDel={active}
              longPress={(res) => setActive(res)}
              done={item.doneAll}
              bgc={item.bgc == '#212121' ? '#000000' : item.bgc}
              title={item.title}
              qnt={item.qnt}
              data={item.data}
              conteudo={item.tasks}
            />
          )}
          ListEmptyComponent={() => {
            return <EmptyList bgc={props.primary} nameicon={iconName} />;
          }}
          contentContainerStyle={styles.flatStyle(flx, alignList)}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <VwBottomButtons
        showInfoDel={items.length}
        onPress={(v) => {
          setMdlConfig(v);
          setActive(false);
        }}
        sendNew={sendNew}
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
            props.setAdd ? (setShowAlertAdd(false), props.setAdd(false)) : null;
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
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    primary: state.annoReducer.primary,
    padrao: state.annoReducer.padrao,
    position: state.annoReducer.position,
    add: state.annoReducer.add,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAnno: (anno) => dispatch({type: 'SET_ANNO', payload: {anno}}),
    setTask: (task) => dispatch({type: 'SET_TASK', payload: {task}}),
    setCor: (cor) => dispatch({type: 'SET_COR', payload: {cor}}),
    setPrimary: (primary) =>
      dispatch({type: 'SET_PRIMARY', payload: {primary}}),
    setPadrao: (padrao) => dispatch({type: 'SET_PADRAO', payload: {padrao}}),
    setPosition: (position) =>
      dispatch({type: 'SET_POSITION', payload: {position}}),
    setAdd: (add) => dispatch({type: 'SET_ADD', payload: {add}}),
    setQuality: (quality) =>
      dispatch({type: 'SET_QUALITY', payload: {quality}}),
    setFonte: (fonte) => dispatch({type: 'SET_FONTE', payload: {fonte}}),
    setKeyboard: (keyboard) =>
      dispatch({type: 'SET_KEYBOARD', payload: {keyboard}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreen);
