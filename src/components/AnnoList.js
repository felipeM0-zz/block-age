import React, {useState, useEffect} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
// STYLES
import styles from '../styles/AnnoList';

export default (props) => {
  const [active, setActive] = useState(false);
  const [list, setList] = useState(props.list);

  useEffect(() => {
    props.showDel == false ? setActive(props.showDel) : null;
  }, [props.showDel]);

  const whoRemove = async (id) => {
    active
      ? await AsyncStorage.removeItem('@delAnno' + id)
      : await AsyncStorage.setItem('@delAnno' + id, id);
  };

  return (
    <TouchableHighlight
      style={styles.ListBody(props)}
      underlayColor="none"
      onLongPress={() => {
        props.longPress(true);
        setActive(true);
        setList(props.list);
        whoRemove(props.ind);
      }}
      onPress={() => props.bgSaved(props.bgc, props.ind)}
      key={props.ind}>
      <>
        <View style={styles.vwContent}>
          <Text style={styles.TextCont(props)} numberOfLines={5}>
            {props.conteudo}
          </Text>
          <View style={styles.vwPropsContent}>
            <View style={styles.data}>
              <Text style={styles.txtannolistinfo}>
                {props.conteudo.length}
              </Text>
            </View>
            <View style={styles.data}>
              <Text style={styles.txtannolistinfo}>{props.data}</Text>
            </View>
          </View>
        </View>
        {props.showDel && (
          <TouchableHighlight
            underlayColor="none"
            activeOpacity={1}
            onPress={() => {
              setActive(!active);
              whoRemove(props.ind);
            }}
            style={styles.tcbRemove}>
            <View>
              {!active && (
                <View style={styles.vwOnlySpace}>
                  <View style={styles.vwContentSpace}></View>
                </View>
              )}
              {active && (
                <View style={styles.vwOnlySpace}>
                  <View style={styles.vwContentIcon}>
                    <Icon
                      name="check-circle"
                      size={19}
                      color="#FF0025"
                      style={styles.iconSelectedDel}
                    />
                  </View>
                </View>
              )}
            </View>
          </TouchableHighlight>
        )}
      </>
    </TouchableHighlight>
  );
};
