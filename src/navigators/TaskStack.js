import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScreen from '../screens/TaskScreen';
import TaskCreate from '../screens/TaskCreate';

const TaskStack = createStackNavigator();

export default () => {
  return (
    <TaskStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TaskStack.Screen name="TaskScreen" component={TaskScreen} />
      <TaskStack.Screen name="TaskCreate" component={TaskCreate} />
    </TaskStack.Navigator>
  );
};
