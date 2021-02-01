import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppList from '../../Temporary/AppList';
import AppForm from '../../Temporary/AppForm';
import TodayHabitList from '../../TodayHabitList/TodayHabitList';
import CreateHabit from '../../CreateHabit/CreateHabit';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme, Portal, FAB, IconButton } from 'react-native-paper';

const RootStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

function MainStackScreen() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <MainStack.Navigator
                tabBarOptions={{
                    style: {
                        height: 60,
                        backgroundColor: "#1F2E46",
                    },
                    tabStyle: {
                        paddingTop: 5,
                    },
                    showIcon: true,
                    showLabel: false,
                    inactiveTintColor: '#647482',
                    activeTintColor: '#1B8FFF',
                    allowFontScaling: true,
                }}
            >
                <MainStack.Screen name="Home" component={TodayHabitList}
                    options={{
                        title: "Compras",
                        tabBarLabel: "Compras",
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="home" size={size} color={color} />
                        ),
                    }}
                />
                <MainStack.Screen name="Stats" component={TodayHabitList}
                    options={{
                        tabBarLabel: "Adicionar",
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="bar-graph" size={size} color={color} />
                        ),
                    }}
                />
                <MainStack.Screen name="Settings" component={AppForm}
                    options={{
                        tabBarLabel: "Adicionar",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" size={size} color={color} />
                        ),
                    }}
                />
            </MainStack.Navigator>
            <Portal>
                <FAB
                    visible={true}
                    icon="plus"
                    color="white"
                    style={{
                        position: 'absolute',
                        bottom: 65,
                        right: 16,
                    }}
                    theme={{
                        colors: {
                            accent: theme.colors.primary,
                        },
                    }}
                    onPress={() => { }}
                />
            </Portal>
        </React.Fragment>
    );
}

export default function BottomTabs() {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                mode="modal" headerMode="none">
                <RootStack.Screen
                    name="Main" component={MainStackScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}