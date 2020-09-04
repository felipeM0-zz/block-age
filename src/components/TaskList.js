import React, {useState, useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {translate} from '../locales';
// STYLES
import styles from '../styles/TaskList';

export default (props) => {
  const [active, setActive] = useState(false);
  const [list, setList] = useState(props.list);
  const [separate, setSeparete] = useState(props.conteudo);

  useEffect(() => {
    props.showDel == false ? setActive(props.showDel) : null;
  }, [props.showDel]);

  const whoRemove = async (id) => {
    active
      ? await AsyncStorage.removeItem('@delTask' + id)
      : await AsyncStorage.setItem('@delTask' + id, id);
  };

  return (
    <TouchableHighlight
      style={styles.TouchTask(props)}
      underlayColor="none"
      disabled={active}
      onLongPress={() => {
        props.longPress(true);
        setActive(true);
        setList(props.list);
        whoRemove(props.ind);
      }}
      onPress={() => props.onPress(props.bgc, props.ind)}
      key={props.ind}>
      <>
        <Text style={styles.TextTitle(props)} numberOfLines={1}>
          &#9679; {props.title == '' ? translate('txtnotitle') : props.title}
        </Text>
        <Text style={styles.txtCont(props.bgc)} numberOfLines={4}>
          {separate}
        </Text>

        <Text style={styles.data}>{props.data}</Text>
        <Text style={[styles.data, styles.qnt]}>
          {props.qnt}{' '}
          {props.qnt == 1 ? translate('txttask') : translate('txttasks')}
        </Text>

        {props.done && !props.showDel && (
          <View style={styles.vwDone}>
            <Icon name="check-circle" size={15} color="lightgreen" />
          </View>
        )}

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
