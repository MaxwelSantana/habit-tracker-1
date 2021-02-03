import * as React from 'react';
import { View, Text, Button, Platform, Pressable, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';
import { TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
//import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import TabBarAdvancedButton from './TabBarAdvancedButton';

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

const IS_IPHONE_X = false;

function MainStackScreen() {
	const barColor = "#F6F7EB";
	//tabBar={props => <MyTabBar2 {...props} />}
	return (
		<MainStack.Navigator
			tabBar={(props) => (
				<View style={styles.navigatorContainer}>
					<BottomTabBar
						{...props}
					/>
					{IS_IPHONE_X && (
						<View style={[styles.xFillLine, {
							backgroundColor: barColor
						}]} />
					)}
				</View>
			)}
			tabBarOptions={{
				showIcon: true,
				style: styles.navigator,
				tabStyle: {
					backgroundColor: barColor
				}
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
					tabBarButton: props => <TabBarAdvancedButton bgColor={barColor} {...props} />,
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

function AppTab3() {
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

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navigatorContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		// SHADOW
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	navigator: {
		borderTopWidth: 0,
		backgroundColor: 'transparent',
		elevation: 30
	},
	xFillLine: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 34
	}
});

export default AppTab3;