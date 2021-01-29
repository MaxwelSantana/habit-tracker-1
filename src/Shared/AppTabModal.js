import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionSpecs } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import AppList from '../Temporary/AppList';
import AppForm from '../Temporary/AppForm';
import TodayHabitList from '../TodayHabitList/TodayHabitList';
import CreateHabit from '../CreateHabit/CreateHabit';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

function ModalScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 30 }}>This is a modal!</Text>
			<Button onPress={() => navigation.navigate('MyModal2')} title="MyModal2" />
			<Button onPress={() => navigation.goBack()} title="Dismiss" />
		</View>
	);
}

function ModalScreen2({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 30 }}>This is a modal!</Text>
			<Button onPress={() => navigation.goBack()} title="Dismiss2" />
		</View>
	);
}

const RootStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

function MainStackScreen() {
	const buttonAbsolute = {
		backgroundColor: '#1F8DFC',
		position: 'absolute',
		top: -30,
	};

	return (
		<MainStack.Navigator
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
			<MainStack.Screen name="CreateHabit" component={CreateHabit}
				options={({ navigation, route }) => ({
					tabBarLabel: "Adicionar",
					tabBarIcon: ({ color }) => (
						<IconButton
							icon="plus"
							color="#E9EAFA"
							size={40}
							onPress={() => {
								navigation.navigate('MyModal');
							}}
							style={buttonAbsolute}
						/>
					)
				})}
			/>
			<MainStack.Screen name="Plan" component={AppList}
				options={{
					tabBarLabel: "Adicionar",
					tabBarIcon: ({ color, size }) => (
						<Entypo name="star" size={size} color={color} />
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
	);
}

function AppTabModal() {
	return (
		<NavigationContainer>
			<RootStack.Navigator
				mode="modal" headerMode="none">
				<RootStack.Screen
					name="Main" component={MainStackScreen}
				/>
				<RootStack.Screen
					name="MyModal" component={ModalScreen}
					options={{
						cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
					}}
				/>
				<RootStack.Screen name="MyModal2" component={ModalScreen2} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default AppTabModal;