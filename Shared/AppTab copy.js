import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AppList from '../Temporary/AppList';
import AppForm from '../Temporary/AppForm';

const {Navigator, Screen} = createBottomTabNavigator();

function AppTab(){
    return (
        <NavigationContainer>
            <Navigator
                tabBarOptions={{
                    style: {
                        elevation: 0,
                        shadowOpacity: 0,
                        height: 40,
                        backgroundColor: "#1F2E46",
                    },
                    tabStyle: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    labelStyle: {
                        fontSize: 13,
                        marginLeft: 16
                    },
                    inactiveBackgroundColor: '#fafafc',
                    activeBackgroundColor: '#ebebf5',
                    inactiveTintColor: '#c1bccc',
                    activeTintColor: '#32264d'
                }}
            >
                <Screen name="AppList" component={AppList}
                    options={{
                        tabBarLabel: "Compras"
                    }}
                />
                <Screen name="AppForm" component={AppForm}
                    options={{
                        tabBarLabel: "Adicionar"
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppTab;