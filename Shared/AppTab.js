import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton, Colors } from 'react-native-paper';

import AppList from '../Temporary/AppList';
import AppForm from '../Temporary/AppForm';
import TodayHabitList from '../TodayHabitList/TodayHabitList';
import WeekCalendar from '../WeeklyCalendar/WeekCalendar';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

const icon = ({ icon, color, size }) => {
	console.log('teste', size);
	size = 25;
	return (
		<Image source={icon} tintColor={color} style={{ width: size, height: size }} />
	);
};

function AppTab({ navigation }) {
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
						alignContent: 'center',
						alignItems: 'center',
						justifyContent: 'center'
					},
					showLabel: false,
					labelStyle: {
						fontSize: 10,
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
				<Screen name="Home" component={TodayHabitList}
					options={{
						tabBarLabel: "Compras",
						tabBarIcon: ({ color, size }) => (
							<Entypo name="home" size={size} color={color} />
						),
					}}
				/>
				<Screen name="Stats" component={TodayHabitList}
					options={{
						tabBarLabel: "Adicionar",
						tabBarIcon: ({ color, size }) => (
							<Entypo name="bar-graph" size={size} color={color} />
						),
					}}
				/>
				<Screen name="Add" component={AppForm}
					options={({ navigation, route }) => ({
						tabBarLabel: "Adicionar",
						tabBarIcon: ({ color }) => (
							<IconButton
								icon="plus"
								color="#E9EAFA"
								size={40}
								onPress={() => {
									navigation .navigate('Home');
									console.log('pressed');
								}}
								style={{ ...styles.buttonAbsolute, backgroundColor: "#1F8DFC" }}
							/>
						)
					})}
				/>
				<Screen name="Plan" component={AppList}
					options={{
						tabBarLabel: "Adicionar",
						tabBarIcon: ({ color, size }) => (
							<Entypo name="star" size={size} color={color} />
						),
					}}
				/>
				<Screen name="Settings" component={AppForm}
					options={{
						tabBarLabel: "Adicionar",
						tabBarIcon: ({ color, size }) => (
							<MaterialIcons name="settings" size={size} color={color} />
						),
					}}
				/>
			</Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	buttonAbsolute: {
		position: 'absolute',
		top: -30,
	},
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