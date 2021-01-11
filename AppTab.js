import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppList from './AppList';
import AppForm from './AppForm';

import homeIcon from './assets/home.png';
import barchartIcon from './assets/bar-chart.png';
import starIcon from './assets/iconfinder_star_326703.png';
import settingsIcon from './assets/black-settings-button.png';

const { Navigator, Screen } = createBottomTabNavigator();

const icon = ({icon, color, size }) => (
    <Image source={icon} tintColor={color} style={{ width: size, height: size }} />
    /*<MaterialCommunityIcons name="bell" color={color} size={size} />*/
);

function AppTab() {
    return (
        <NavigationContainer>
            <Navigator
                tabBarOptions={{
                    style: {
                        elevation: 0,
                        shadowOpacity: 0,
                        height: 60,
                        backgroundColor: "#1F2E46",
                    },
                    tabStyle: {
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    showLabel: false,
                    labelStyle: {
                        fontSize: 13,
                        textAlign: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    labelPosition: "below-icon",
                    inactiveTintColor: '#647482',
                    activeTintColor: '#1B8FFF'
                }}
            >
                <Screen name="Home" component={AppList}
                    options={{
                        tabBarLabel: "Compras",
                        tabBarIcon: ({color, size}) => icon({icon:homeIcon, color, size}),
                    }}
                />
                <Screen name="Stats" component={AppForm}
                    options={{
                        tabBarLabel: "Adicionar",
                        tabBarIcon: ({color, size}) => icon({icon:barchartIcon, color, size}),
                    }}
                />
                <Screen name="Add" component={AppForm}
                    options={{
                        tabBarLabel: "Adicionar",
                        tabBarIcon: ({ color }) => (
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <Screen name="Plan" component={AppForm}
                    options={{
                        tabBarLabel: "Adicionar",
                        tabBarIcon: ({color, size}) => icon({icon:starIcon, color, size}),
                    }}
                />
                <Screen name="Settings" component={AppForm}
                    options={{
                        tabBarLabel: "Adicionar",
                        tabBarIcon: ({color, size}) => icon({icon:settingsIcon, color, size}),
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: -20,
      marginTop: 10,
      height: 60,
      backgroundColor: 'blue',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
  });

export default AppTab;