import React from 'react';
import {View, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {translate} from '../locales';
// STYLES
import styles from '../styles/vwBottomButtons';

const VwBottomButtons = (props) => {
  return (
    <View style={styles.vwPlus}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => props.onPress(true)}>
        <Icon name="gear" size={30} style={styles.iconConfig(props)} />
      </TouchableHighlight>
      {props.showInfoDel > 0 && (
        <View style={styles.vwDelInfo}>
          <Text style={styles.txtDelInfo(props)}>{translate('msgdelete')}</Text>
        </View>
      )}
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => props.sendNew()}>
        <Icon
          name="plus"
          size={30}
          style={[styles.iconConfig(props), styles.iconPlus]}
        />
      </TouchableHighlight>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    primary: state.annoReducer.primary,
    padrao: state.annoReducer.padrao,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VwBottomButtons);
