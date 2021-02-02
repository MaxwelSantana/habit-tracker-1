import * as React from 'react';
import { View, Text, Button, Platform } from 'react-native';
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

let keyCount = 0;
const MiddleButton2 = (props) => {
	return (
		<View
			key={keyCount++}
			style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}
		>
			{props.children}
		</View>
	);
}

const MiddleButton3 = (props) => {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ position: 'absolute', zIndex: 3, bottom: 30 }}>
				<TouchableOpacity
					onPress={() => alert('teste')}
				>
					<View style={{ width: 60, height: 60, backgroundColor: 'blue', }}>
						<Text>teste</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const MiddleButton = () => {
	const theme = useTheme();

	const buttonAbsolute = {
		backgroundColor: '#1F8DFC',
		transform: [
			{ translateY: -10 }
		],
	};

	return (
		/*
		<IconButton
			icon="plus"
			color="#E9EAFA"
			size={40}
			onPress={() => {
				alert('teste');
			}}
			style={buttonAbsolute}
		/>*/
		<FAB
			visible={true}
			icon="plus"
			color="white"
			style={{
				position: 'absolute',
				bottom: 20,
				zIndex: 10,
				elevation: 10
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

const EmptyComponent = () => {
	return null;
}

const TabBarButton = (props) => {
	const { style, to, children, ...rest } = props;
	console.log({ rest })
	return <MiddleButton />
}

const TabBarButton2 = ({
	children,
	style,
	onPress,
	to,
	accessibilityRole,
	...rest
}) => {
	if (Platform.OS === 'web' && to) {
		// React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
		// We need to use `onClick` to be able to prevent default browser handling of links.
		return (
			<Link
				{...rest}
				to={to}
				style={[{ display: 'flex', }, style]}
				onPress={(e) => {
					if (
						!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
						(e.button == null || e.button === 0) // ignore everything but left clicks
					) {
						e.preventDefault();
						onPress?.(e);
					}
				}}
			>
				{children}
			</Link>
		);
	} else {
		return (
			<TouchableWithoutFeedback
				{...rest}
				accessibilityRole={accessibilityRole}
				onPress={onPress}
			>
				<View style={style}>{children}</View>
			</TouchableWithoutFeedback>
		);
	}
}

const TabBarButton3 = ({
	children,
	style,
	onPress,
	to,
	accessibilityRole,
	...rest
}) => {
	if (Platform.OS === 'web' && to) {
		// React Native Web doesn't forward `onClick` if we use `TouchableWithoutFeedback`.
		// We need to use `onClick` to be able to prevent default browser handling of links.
		return (
			<Link
				{...rest}
				to={to}
				style={[{ display: 'flex', }, style]}
				onPress={(e) => {
					if (
						!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && // ignore clicks with modifier keys
						(e.button == null || e.button === 0) // ignore everything but left clicks
					) {
						e.preventDefault();
						onPress?.(e);
					}
				}}
			>
				{children}
			</Link>
		);
	} else {
		return (
			<TouchableWithoutFeedback
				{...rest}
				accessibilityRole={accessibilityRole}
				onPress={() => alert('teste')}
			>
				<View style={style}><MiddleButton /></View>
			</TouchableWithoutFeedback>
		);
	}
}

function MainStackScreen() {
	//tabBar={props => <MyTabBar {...props} />}
	return (
		<MainStack.Navigator
			tabBar={props => <MyTabBar {...props} />}
			tabBarOptions={{
				style: {
					height: 40,
					backgroundColor: "#1F2E46",
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