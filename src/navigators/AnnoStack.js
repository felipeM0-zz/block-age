import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AnnotationScreen from '../screens/AnnotationScreen';
import AnnotationCreate from '../screens/AnnotationCreate';

const AnnoStack = createStackNavigator();

export default (props) => {
  return (
    <AnnoStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AnnoStack.Screen name="AnnotationScreen" component={AnnotationScreen} />
      <AnnoStack.Screen name="AnnotationCreate" component={AnnotationCreate} />
    </AnnoStack.Navigator>
  );
};
