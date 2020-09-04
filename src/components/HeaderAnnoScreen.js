import React, {useState, useEffect} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import DeleteTrash from '../images/json/delete-trash.json';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {translate} from '../locales/';
// IMPORTED COMPONENTS
import BottomAlert from '../components/BottomAlert';
// STYLES
import styles from '../styles/HeaderAnnoScreen';

export default (props) => {
  const isFocused = useIsFocused();
  const [showAlert, setShowAlert] = useState(false);
  const [infoALert, setInfoALert] = useState([]);

  useEffect(() => {
    closeAll();
  }, [isFocused]);

  const closeAll = async () => {
    const keys = await AsyncStorage.getAllKeys();

    for (let i = 0; i < keys.length; i++) {
      keys[i].substr(0, 8) == '@delAnno'
        ? await AsyncStorage.removeItem(keys[i])
        : null;
    }
    props.returnActive(false);
  };

  const verifyDel = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let qnt = 0;

    for (let i = 0; i < keys.length; i++) {
      keys[i].substr(0, 8) == '@delAnno' ? qnt++ : null;
    }

    qnt > 0
      ? setInfoALert([translate('msgalertwarning'), 'warning', true])
      : (setInfoALert([translate('msgalertwarning2'), 'error', false]),
        props.returnActive(false));

    setShowAlert(true);
  };

  const deleteAll = async () => {
    let keys = await AsyncStorage.getAllKeys();

    for (let i = 0; i < keys.length; i++) {
      keys[i].substr(0, 8) == '@delAnno'
        ? (await AsyncStorage.removeItem(await AsyncStorage.getItem(keys[i])),
          await AsyncStorage.removeItem(keys[i]))
        : null;
    }
    props.returnActive(false);
    props.refresh();
    setTimeout(() => {
      setShowAlert(false);
    }, 100);
  };

  return (
    <View style={styles.vwMsgTopo}>
      {props.active && (
        <TouchableHighlight
          underlayColor="rgba(51,51,51,0.3)"
          activeOpacity={1}
          onPress={() => closeAll()}
          style={styles.tcbClose}>
          <Icon
            name="close"
            size={30}
            color={props.bgc == '#FFFFFF' ? '#212121' : '#FFFFFF'}
          />
        </TouchableHighlight>
      )}
      <Text style={styles.txtMsgTopo(props.padrao)}>
        {translate('headeranno')}
      </Text>
      {props.active && (
        <TouchableHighlight
          underlayColor="none"
          activeOpacity={1}
          onPress={() => verifyDel()}>
          <Lottie
            resizeMode="contain"
            autoSize
            source={DeleteTrash}
            autoPlay
            loop
          />
        </TouchableHighlight>
      )}

      {showAlert && (
        <BottomAlert
          title={translate('titlealertwarning')}
          text={infoALert[0]}
          icon={infoALert[1]}
          loop={false}
          showConfirm={infoALert[2]}
          onConfirm={() => deleteAll()}
          closeAlert={() => setShowAlert(false)}
          visible={true}
        />
      )}
    </View>
  );
};
