import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  StatusBar,
  ScrollView,
  View,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  LogBox,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import moment from 'moment';
import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {translate} from '../locales/';
// IMPORT COMPONENTS
import HeaderTask from '../components/HeaderTask';
import InfoActions from '../components/InfoActions';
import ListaItem from '../components/ListaItem';
import ListaItemSwipe from '../components/ListaItemSwipe';
import EmptyTask from '../components/EmptyTask';
import ViewButtons from '../components/ViewButtons';
import AddItemArea from '../components/AddItemArea';
import MdlColor from '../components/MdlColor';
import BottomAlert from '../components/BottomAlert';
import MdlOptions from '../components/MdlOptions';
// STYLES
import styles from '../styles/TaskCreate';

const TaskCreate = (props) => {
  //TODO: REMOVER ISSO QUANDO CORRIGIR O PROBLEMA DE FLATSLIST DENTRO DO SCROLLVIEW (ERRO CAUSADO POR AMBOS SEREM ROLÁVEIS PARA SENTIDOS IGUAIS)
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const viewRef = useRef();

  const [items, setItems] = useState([]);
  const [idSaved, setIdSaved] = useState('');
  const [title, setTitle] = useState('');
  const [done, setDone] = useState(false);
  const [numT, setNumT] = useState(0);
  const [more, setMore] = useState(false);
  const [change, setChange] = useState(true);
  const [editIndex, setEditIndex] = useState('');
  const [editArray, setEditArray] = useState([]);
  const [active, setActive] = useState(false);
  const [showAlertDragItem, setShowAlertDragItem] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAlertReturn, setShowAlertReturn] = useState(false);
  const [showClearMsg, setShowClearMsg] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [quality, setQuality] = useState(0.8);
  const [background, setBackground] = useState(
    props.cor != '#474747' ? props.cor : props.primary,
  );

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      props.setInit(false);
      InitVerify(route.params?.id ?? '');
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

  const TopBar = (props) => {
    return isFocused ? <StatusBar {...props} /> : null;
  };

  //ADICIONA NOVOS ITENS Á LISTA
  const AddNewItem = async (ind, txt, status) => {
    try {
      props.keyboard == 'n' ? setMore(false) : setMore(true);
      let newItems = [...items];
      if (ind != '') {
        for (let i = 0; i < newItems.length; i++) {
          if (ind == newItems[i].id) {
            newItems[i].task = txt.trim();
            newItems[i].done = status;
          }
        }
        setMore(false);
      } else {
        newItems.push({
          id: uuid(),
          task: txt.trim(),
          done: status,
        });
      }
      verify(newItems);
      newItems.length >= 100
        ? ToastAndroid.show(translate('txtlimittask'), ToastAndroid.LONG)
        : null;
    } catch (error) {
      console.log('PROBLEM TASK ADDNEW: ', error);
    }
  };

  const toggleDone = async (index) => {
    try {
      let changeCheck = [...items];
      changeCheck[index].done = !changeCheck[index].done;
      verify(changeCheck);
    } catch (error) {
      console.log('PROBLEM TASK TOGGLEDONE: ', error);
    }
  };

  const alternateList = async () => {
    try {
      let changeCheck = [...items];
      for (let i = 0; i < changeCheck.length; i++) {
        changeCheck[i].done = change;
      }
      setChange(!change);
      verify(changeCheck);
    } catch (error) {
      console.log('PROBLEM TASK ALTERNATELIST: ', error);
    }
  };

  const deleteItem = async (index) => {
    try {
      let newItems = [...items];
      newItems = newItems.filter((i) => i.id != index);
      verify(newItems);
    } catch (error) {
      console.log('PROBLEM TASK DELETEITEM: ', error);
    }
  };

  const verify = (valor) => {
    let f = 0,
      t = 0;
    for (let i = 0; i < valor.length; i++) {
      valor[i].done == false ? f++ : t++;
    }
    f <= 0 ? setDone(true) : setDone(false);
    t > 0 ? setChange(false) : setChange(true);
    setNumT(t);
    setItems(valor);
  };

  const isObject = (object) => {
    return object != null && typeof object === 'object';
  };

  const comparative = (object1, object2) => {
    try {
      if (object1 === null || object2 === null) {
        return false;
      }

      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
          (areObjects && !comparative(val1, val2)) ||
          (!areObjects && val1 !== val2)
        ) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.log('PROBLEM COMPARATIVE TASK: ', error);
    }
  };

  const saveAll = async () => {
    try {
      let nameAsync = '@list' + uuid();
      nameAsync = idSaved != '' ? idSaved : nameAsync;
      let initcontent = await AsyncStorage.getItem('@initContTask'),
        inittitle = await AsyncStorage.getItem('@initTitleTask'),
        initbgc = await AsyncStorage.getItem('@initBgcTask'),
        lastbgc = initbgc == '#000000' ? '#212121' : initbgc;

      if (
        (comparative(JSON.parse(initcontent), items) &&
          inittitle == title &&
          lastbgc == background) ||
        (comparative(JSON.parse(initcontent), items) &&
          inittitle == null &&
          title == '' &&
          lastbgc == background)
      ) {
        returnPage();
      } else {
        let saveList = [
          {
            doneAll: done,
            items: items,
            title: title,
            id: nameAsync,
            bgc:
              background == props.primary
                ? props.primary == '#FFFFFF'
                  ? '#FFFFFF'
                  : '#000000'
                : background,
            data: moment(new Date()).format('DD/MM/YY (HH:mm a)'),
          },
        ];
        await AsyncStorage.setItem(nameAsync, JSON.stringify(saveList));
        props.setAdd(true);
        returnPage();
      }
    } catch (error) {
      console.log('PROBLEM TASK SAVEALL: ', error);
    }
  };

  const InitVerify = async (asyncName) => {
    try {
      await AsyncStorage.multiRemove([
        '@initContTask',
        '@initTitleTask',
        '@initBgcTask',
      ]);
      let initial = [],
        items = [];
      let title = '',
        bgc = '';

      if ((await AsyncStorage.getItem('@downshare')) != null) {
        setQuality(Number(await AsyncStorage.getItem('@downshare')));
      }

      if (asyncName != '' && initial != null) {
        initial = JSON.parse(await AsyncStorage.getItem(asyncName));
        if (initial != null) {
          initial.forEach((e) => {
            setIdSaved(e.id);
            items = e.items;
            setTitle(e.title);
            title = e.title;
            bgc = e.bgc;
          });
        }
        verify(items);
        await AsyncStorage.setItem('@initContTask', JSON.stringify(items));
        await AsyncStorage.setItem('@initTitleTask', title);
        await AsyncStorage.setItem('@initBgcTask', bgc);
      } else {
        BackHandler.addEventListener('hardwareBackPress', async () => {
          handleBackButton();
        });
        await AsyncStorage.setItem('@initBgcTask', background);
      }
    } catch (error) {
      console.log('PROBLEM TASK INITVERIFY: ', error);
    }
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
      console.log('PROBLEM TASK PERMISSÃO: ', error);
    }
  };

  const downloadImage = async () => {
    try {
      setShowOptions(false);
      const uri = await captureRef(viewRef, {
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
      }
    } catch (error) {
      console.log('PROBLEM TASK DOWNLOADIMAGEM: ', error);
    }
  };

  const shareImage = async () => {
    try {
      setShowOptions(false);
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: quality,
      });

      const shareResponse = await Share.open({
        url: uri,
        message:
          `${translate('shared')} — ` +
          moment(new Date()).format('DD/MM/YY (HH:mm a)'),
        failOnCancel: false,
      });
    } catch (error) {
      console.log('PROBLEM TASK SHAREIMAGEM: ', error);
    }
  };

  const handleBackButton = async () => {
    try {
      let initcontent = await AsyncStorage.getItem('@initContTask'),
        inittitle = await AsyncStorage.getItem('@initTitleTask'),
        initbgc = await AsyncStorage.getItem('@initBgcTask'),
        lastbgc = initbgc == '#000000' ? '#212121' : initbgc;

      (comparative(JSON.parse(initcontent), items) &&
        inittitle == title &&
        lastbgc == background) ||
      (comparative(JSON.parse(initcontent), items) &&
        inittitle == null &&
        title == '' &&
        lastbgc == background) ||
      (items.length <= 0 &&
        inittitle == null &&
        title == '' &&
        lastbgc == background)
        ? returnPage()
        : showAlertReturn
        ? setShowAlertReturn(false)
        : setShowAlertReturn(true);
    } catch (error) {
      console.log('PROBLEM HANDLEBACK TASK: ', error);
    }
    return true;
  };

  const returnPage = async () => {
    try {
      setItems([]);
      setShowAlertReturn(false);
      navigation.navigate('TaskScreen');
    } catch (error) {
      console.log('PROBLEM RETURNPAGE TASK: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      {showAlertReturn && (
        <BottomAlert
          title={translate('titlealertreturn')}
          text={translate('txtalertreturn')}
          icon="warning"
          loop={false}
          showConfirm={true}
          showSave={items.length > 0}
          onConfirm={() => returnPage()}
          onSave={() => saveAll()}
          closeAlert={() => setShowAlertReturn(false)}
          visible={showAlertReturn}
        />
      )}

      {/* SIDEBAR */}
      {showOptions && (
        <MdlOptions
          active={showOptions}
          closeModal={() => setShowOptions(false)}
          bgc={props.primary}
          modalColor={() => setActive(true)}
          downloadImage={() => downloadImage()}
          shareImage={() => shareImage()}
          showCopy={false}
          showDownAndShare={items.length > 0 ? true : false}
        />
      )}

      {/* CABEÇALHO */}
      <HeaderTask
        color={background}
        Return={() => handleBackButton()}
        newTitle={(txt) => setTitle(txt)}
        title={title}
        quant={items.length}
        SaveAll={saveAll}
        showOptions={() => setShowOptions(true)}
      />

      {/* INFORMAÇÕES DO TOP DA LISTA */}
      {items.length > 0 && (
        <InfoActions status={done} finished={numT} listLength={items.length} />
      )}

      {/* LISTA RENDERIZADA */}
      <View style={styles.vwContent}>
        <View style={styles.vwLista(more, items.length)}>
          <ScrollView
            scrollEnabled={scroll}
            directionalLockEnabled={true}
            contentContainerStyle={styles.contentScroll(items.length)}>
            <View backgroundColor="transparent" ref={viewRef}>
              <SwipeListView
                swipeGestureBegan={() => setScroll(false)}
                swipeGestureEnded={() => setScroll(true)}
                directionalDistanceChangeThreshold={0}
                initialNumToRender={20}
                maxToRenderPerBatch={2}
                tension={50}
                style={styles.swipeList}
                data={items}
                directionalLockEnabled={true}
                renderItem={({item, index}) => (
                  <ListaItem
                    onPress={() => toggleDone(index)}
                    onLongPress={() => {
                      setEditIndex(item.id);
                      setEditArray(item);
                      setMore(true);
                    }}
                    data={item}
                    cor={background}
                  />
                )}
                recalculateHiddenLayout={true}
                renderHiddenItem={({index}) => <ListaItemSwipe />}
                leftOpenValue={Dimensions.get('window').width}
                onRowOpen={deleteItem}
                ListEmptyComponent={<EmptyTask nameicon="check-square-o" />}
                disableLeftSwipe={true}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
        </View>

        {/* AREA DOS BOTÕES COM AÇÕES NO RODAPÉ */}
        {!more && (
          <>
            <ViewButtons
              color={background}
              altern={change}
              New={() => {
                setEditIndex('');
                setEditArray([]);
                setMore(true);
              }}
              switchList={() => alternateList()}
              clearAll={() => setShowClearMsg(true)}
              listLength={items.length}
            />
          </>
        )}
      </View>

      {/* TECLADO */}
      {more && (
        <AddItemArea
          blur={() => setMore(false)}
          editIndex={editIndex}
          editArray={editArray}
          listLength={items.length}
          onAdd={AddNewItem}
          bgc={background}
          showAlert={(res) => setShowAlertDragItem(res)}
        />
      )}

      {active && (
        <MdlColor
          bgc={background}
          activ={active}
          background={props.primary}
          bgColor={(value) => {
            setBackground(value);
            props.setCor(value);
          }}
          closeModal={(value) => setActive(value)}
        />
      )}

      {showAlertDragItem && (
        <BottomAlert
          title={translate('titlealertdrag')}
          text={translate('txtalertdrag')}
          icon="info"
          loop={false}
          showConfirm={false}
          onConfirm={() => setShowAlertDragItem(false)}
          closeAlert={() => setShowAlertDragItem(false)}
          visible={showAlertDragItem}
        />
      )}

      {showClearMsg && (
        <BottomAlert
          title={translate('titlealertclear')}
          text={translate('txtalertclear')}
          icon="warning"
          loop={false}
          showConfirm={true}
          onConfirm={() => {
            setItems([]);
            setShowClearMsg(false);
          }}
          closeAlert={() => setShowClearMsg(false)}
          visible={showClearMsg}
        />
      )}

      {/* ESTILO DA STATUS BAR */}
      <TopBar
        backgroundColor={background}
        barStyle={background == '#212121' ? 'light-content' : 'dark-content'}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    cor: state.annoReducer.cor,
    primary: state.annoReducer.primary,
    keyboard: state.annoReducer.keyboard,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCor: (cor) => dispatch({type: 'SET_COR', payload: {cor}}),
    setAdd: (add) => dispatch({type: 'SET_ADD', payload: {add}}),
    setInit: (init) => dispatch({type: 'SET_INIT', payload: {init}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreate);
