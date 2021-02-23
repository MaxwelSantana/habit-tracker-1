import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';

import AddHabit from '../screens/AddHabit';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="AddHabit"
    headerMode="none"
    screenOptions={{
      headerShown: false,
      animationEnabled: false,
    }}
    mode="modal">
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen
      name="AddHabit"
      component={AddHabit}
      options={{
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    />
  </Stack.Navigator>
);
