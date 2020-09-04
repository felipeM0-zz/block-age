import React, {useState} from 'react';
import {View, TextInput, TouchableHighlight, ToastAndroid} from 'react-native';
import {translate} from '../locales/';
import {connect} from 'react-redux';
// STYLES
import styles from '../styles/AddItemArea';

const AddItemArea = (props) => {
  const [item, setItem] = useState('');
  const [radio, setRadio] = useState(false);
  const [val, setVal] = useState('');
  const [radioVal, setRadioVal] = useState(false);

  const handleSubmit = () => {
    props.editIndex != ''
      ? val.trim() != ''
        ? props.onAdd(props.editIndex, val, radioVal)
        : props.showAlert(true)
      : item.trim() != ''
      ? (props.onAdd('', item, radio),
        setVal(''),
        setItem(''),
        setRadio(false),
        setRadioVal(false))
      : null;
  };

  const takeTask = (ind, array) => {
    let items = [array];
    for (let i = 0; i < items.length; i++) {
      ind = items[i].id
        ? (setVal(items[i].task), setRadioVal(items[i].done))
        : null;
    }
  };

  const radioTouch = () => {
    props.editIndex == '' ? setRadio(!radio) : setRadioVal(!radioVal);

    let v =
      (props.editArray == '' && !radio) || (props.editIndex != '' && !radioVal)
        ? translate('sending1')
        : translate('sending2');

    ToastAndroid.showWithGravityAndOffset(
      v,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      150,
    );
  };

  return (
    <View style={styles.addItemArea}>
      <TextInput
        style={styles.AddItemInput(props.bgc)}
        autoFocus={true}
        placeholder={translate('placeadditem')} // TEXTO TEMPORÁRIO DO CAMPO
        value={props.editIndex != '' ? val : item} // VALOR DO CAMPO DE TEXTO
        onBlur={() => props.blur()}
        onFocus={() => takeTask(props.editIndex, props.editArray)}
        onChangeText={(e) => {
          setItem(e);
          setVal(e);
        }}
        blurOnSubmit={props.keyboard == 'n' ? true : false}
        onSubmitEditing={() => handleSubmit()} // FAZER ALGO AO FINALIZAR EDIÇÃO NO TECLADO
        returnKeyType="send" //MODIFICAR BOTÃO DE ENVIO DO TECLADO
      />
      <View style={styles.AreaRadio}>
        <TouchableHighlight
          style={styles.TouchRadio}
          underlayColor="transparent"
          onPress={() => radioTouch()}>
          <View style={styles.RadioBtn(radio, radioVal, props)} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    keyboard: state.annoReducer.keyboard,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemArea);
