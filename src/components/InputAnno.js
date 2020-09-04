import React, {useEffect, useState, useRef} from 'react';
import {View, TextInput, ScrollView, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useRoute, useIsFocused, useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {translate} from '../locales';
// STYLES
import styles from '../styles/InputAnno';

const InfoAnno = (props) => {
  const [cont, setCont] = useState('');
  const [dt, setDt] = useState(new Date());

  const route = useRoute();
  const viewRef = useRef();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    verify();
  }, [isFocused]);

  useEffect(() => {
    props.qnt(cont);
    props.vwRef(viewRef);
    props.data(dt);
  }, [cont, dt]);

  const changeText = async (t) => {
    try {
      setCont(t);
      setDt(new Date());
      await AsyncStorage.setItem('@contAnno', t);
      await AsyncStorage.setItem('@dataAnno', new Date().toString());
    } catch (error) {
      console.log('PROBLEMA CHANGETEXT: ', error);
    }
  };

  const verify = async () => {
    try {
      if (props.status) {
        setCont('');
        setDt(new Date());
        await AsyncStorage.multiRemove(['@contAnno', '@dataAnno']);
        props.setStatus(false);
      } else {
        let conteudo = '';
        let data = '';
        if (route.params.id != undefined && props.check == false) {
          await AsyncStorage.multiRemove(['@contAnno', '@dataAnno']);
          JSON.parse(await AsyncStorage.getItem(route.params.id)).forEach(
            (e) => {
              conteudo = e.conteudo;
              data = e.data;
            },
          );
        }

        if ((await AsyncStorage.getItem('@contAnno')) != null) {
          setCont(await AsyncStorage.getItem('@contAnno'));
          setDt(new Date(await AsyncStorage.getItem('@dataAnno')));
        } else if (route.params.id != undefined && props.check == false) {
          setCont(conteudo);
          setDt(new Date(data));
          props.setCheck(true);
          await AsyncStorage.setItem('@contAnno', conteudo);
          await AsyncStorage.setItem('@dataAnno', new Date(data).toString());
          await AsyncStorage.setItem('@initContAnno', conteudo);
        }
      }
    } catch (error) {
      console.log('PROBLEMA VERIFY: ', error);
    }
  };

  const returnColor = () => {
    let corInv = props.labelTxt == '#212121' ? '#FFFFFF' : '#212121';
    return corInv;
  };

  return (
    <View style={styles.vwContent}>
      <LinearGradient
        style={styles.gradientBgcTop}
        colors={[props.labelTxt, 'transparent']}
      />
      <ScrollView>
        <View
          backgroundColor={props.labelTxt}
          style={styles.vwScrollInput}
          ref={viewRef}>
          <TextInput
            multiline={true}
            value={cont}
            onChangeText={(t) => {
              changeText(t);
              t.length >= 9999
                ? ToastAndroid.show(
                    translate('txtlimitanno'),
                    ToastAndroid.LONG,
                  )
                : null;
            }}
            placeholderTextColor="#333"
            maxLength={9999}
            style={styles.inputTxt(returnColor(), props.fonte)}
            placeholder={translate('placeannocontent')}
            placeholderTextColor={
              props.labelTxt == '#212121'
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(51,51,51,0.8)'
            }
          />
        </View>
      </ScrollView>
      <LinearGradient
        style={styles.gradientBgcBottom}
        colors={['transparent', props.labelTxt]}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.annoReducer.status,
    check: state.annoReducer.check,
    primary: state.annoReducer.primary,
    fonte: state.annoReducer.fonte,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (status) => dispatch({type: 'SET_STATUS', payload: {status}}),
    setCheck: (check) => dispatch({type: 'SET_CHECK', payload: {check}}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoAnno);
