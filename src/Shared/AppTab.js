import * as React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
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

import MyTabBar from './MyTabBar';

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

const MiddleButton = () => {
	const buttonAbsolute = {
		backgroundColor: '#1F8DFC',
		transform: [
			{ translateY: -10 }
		],
	};

	return (
		<IconButton
			icon="plus"
			color="#E9EAFA"
			size={40}
			onPress={() => {
				alert('teste');
				//navigation.navigate('MyModal');
			}}
			style={buttonAbsolute}
		/>
	);
}

function MainStackScreen() {
	return (
		<MainStack.Navigator	
			tabBar={props => <MyTabBar {...props} />}
			tabBarOptions={{
				style: {
					height: 40,
					backgroundColor: "#1F2E46",
					position: 'absolute'
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
			<MainStack.Screen name="CreateHabit" component={CreateHabit}
				options={({ navigation, route }) => ({
					tabBarIcon: ({ color }) => (
						<View
							style={{
								position: 'absolute',
								bottom: 0,
								height: 68,
								width: 68,
								borderRadius: 68,
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Entypo name="plus" size={68} color='#E9EAFA'/>
						</View>
						/*
						<MiddleButton />
						/*
						<TouchableOpacity style={[buttonAbsolute]}>
								<Text>Teste</Text>
							</TouchableOpacity>
						*/
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

function AppTab() {
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

export default AppTab;