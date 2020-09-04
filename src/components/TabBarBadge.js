import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
// STYLES
import styles from '../styles/TabBarBadge';

const TabBarBadge = (props) => {
  let iconName = null;
  let badgeCount = 0;

  switch (props.name) {
    case 'Anotações':
    case 'Anotaciones':
    case 'Annotations':
      iconName = 'edit';
      badgeCount = props.anno;
      break;
    case 'Tarefas':
    case 'Tareas':
    case 'Tasks':
      iconName = 'check-square-o';
      badgeCount = props.task;
      break;
  }

  const color = () => {
    let active = props.padrao;
    let inactive = '';

    props.padrao == '#ffd700'
      ? (inactive = 'rgba(255, 215, 0, 0.2)')
      : props.padrao == '#212121'
      ? (inactive = 'rgba(51, 51, 51, 0.3)')
      : (inactive = 'rgba(255, 255, 255, 0.2)');

    return {active, inactive};
  };

  return (
    <View>
      <Icon
        name={iconName}
        size={35}
        style={styles.iconTab}
        color={props.active.focused ? color().active : color().inactive}
      />
      {badgeCount > 0 && (
        <View style={styles.vwTab(props.primary)}>
          <View style={styles.vwTabBody(props.active.focused)}>
            <Text style={styles.txtBadge(props.active.focused)}>
              {badgeCount}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    anno: state.annoReducer.anno,
    task: state.annoReducer.task,
    primary: state.annoReducer.primary,
    padrao: state.annoReducer.padrao,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBarBadge);
