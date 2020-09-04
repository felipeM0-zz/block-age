import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import {connect} from 'react-redux';
// STYLES
import styles from '../styles/ListaItem';

const ListaItem = (props) => {
  return (
    <>
      <TouchableHighlight
        style={styles.Item(props)}
        act={props.active}
        onLongPress={props.onLongPress}
        onPress={props.onPress}
        underlayColor="#3d3d3d"
        activeOpacity={0}>
        <>
          <Text style={styles.ItemText(props, props.fonte)}>
            {props.data.task}
          </Text>
          <View style={styles.ItemCheck(props)} />
        </>
      </TouchableHighlight>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    fonte: state.annoReducer.fonte,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListaItem);
