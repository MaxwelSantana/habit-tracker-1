import * as React from 'react';
import { View, Text, Button, Platform, Pressable } from 'react-native';
import { Link } from '@react-navigation/native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
//import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionSpecs } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import AppList from '../../Temporary/AppList';
import AppForm from '../../Temporary/AppForm';
import TodayHabitList from '../../TodayHabitList/TodayHabitList';
import CreateHabit from '../../CreateHabit/CreateHabit';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MyTabBar from './MyTabBar';
import MyTabBar2 from './MyTabBar2';


import { useTheme, Portal, FAB, IconButton } from 'react-native-paper';

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

const EmptyComponent = () => {
	return null;
}

const TabBarButton3 = ({ style, ...rest }) => {
	return (
		<View style={[style]}>
			<TouchableWithoutFeedback {...rest} />
		</View>
	);
}

const MiddleButton = () => {
	const theme = useTheme();

	return (
		<FAB
			visible={true}
			icon="plus"
			color="white"
			style={{
				position: 'absolute',
				bottom: 20,
			}}
			theme={{
				colors: {
					accent: theme.colors.primary,
				},
			}}
			onPress={() => { alert('pressed') }}
		/>
	);
}

function MainStackScreen() {
	//tabBar={props => <MyTabBar2 {...props} />}
	return (
		<MainStack.Navigator
			tabBar={props => <MyTabBar2 {...props} />}
			tabBarOptions={{
				style: {
					height: 40,
					backgroundColor: 'green'
				},
				showIcon: true,
				showLabel: false,
				inactiveTintColor: '#647482',
				activeTintColor: '#1B8FFF',
			}}
		>
			<MainStack.Screen name="Home" component={TodayHabitList}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="home" size={size} color={color} />
					),
				}}
			/>
			<MainStack.Screen name="Stats" component={TodayHabitList}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="bar-graph" size={size} color={color} />
					),
				}}
			/>
			<MainStack.Screen name="EmptyComponent" component={EmptyComponent}
				options={({ navigation, route }) => ({
					tabBarButton: props => <TabBarButton3 {...props} />,
					tabBarIcon: ({ color }) => (
						<MiddleButton />
					)
				})}
			/>
			<MainStack.Screen name="Plan" component={AppList}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="star" size={size} color={color} />
					),
				}}
			/>
			<MainStack.Screen name="Settings" component={AppForm}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="settings" size={size} color={color} />
					),
				}}
			/>
		</MainStack.Navigator>
	);
}

function AppTab2() {
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

export default AppTab2;