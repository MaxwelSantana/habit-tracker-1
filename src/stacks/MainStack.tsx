import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import MainTab from './MainTab';
import NewHabit from '../screens/NewHabit';

const Stack = createStackNavigator();

export type MainStackParamList = {
    MainTab: undefined;
    NewHabit: undefined;
};

export default () => (
    <Stack.Navigator
        initialRouteName="MainTab"
        headerMode="none"
        screenOptions={{
            headerShown: false,
            animationEnabled: false,
        }}
        mode="modal"
    >
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen
            name="NewHabit"
            component={NewHabit}
            options={{
                animationEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}
        />
    </Stack.Navigator>
);