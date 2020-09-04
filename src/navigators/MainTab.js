import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import AnnoStack from './AnnoStack';
import TaskStack from './TaskStack';
import TabBarBadge from '../components/TabBarBadge';
import {translate} from '../locales/';

const Tab = createBottomTabNavigator();

const MainTab = (props) => {

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
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color().active,
        inactiveTintColor: color().inactive,
        labelStyle: {
          fontWeight: 'bold',
        },
        style: {
          backgroundColor: props.primary,
          height: 57,
          paddingBottom: 3,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: color().active,
          display: props.init ? 'flex' : 'none',
        },
      }}
      // LAZY = RENDERIZAR TODAS AS TELAS - (FALSE PARA TODAS) - (TRUE PARA FOCADAS)
      lazy={false}
      screenOptions={({route}) => ({
        tabBarIcon: (focused) => (
          <TabBarBadge active={focused} name={route.name} />
        ),
      })}>
      <Tab.Screen name={translate('tablabelanno')} component={AnnoStack} />
      <Tab.Screen name={translate('tablabeltask')} component={TaskStack} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    primary: state.annoReducer.primary,
    padrao: state.annoReducer.padrao,
    init: state.annoReducer.init,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
