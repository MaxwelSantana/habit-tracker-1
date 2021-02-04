import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';

import AppList from '../../Temporary/AppList';
import AppForm from '../../Temporary/AppForm';
import TodayHabitList from '../../TodayHabitList/TodayHabitList';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import TabBarAdvancedButton from './TabBarAdvancedButton';

import { useTheme } from 'react-native-paper';

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

const IS_IPHONE_X = false;

function MainStackScreen() {
	const theme = useTheme();
	const barColor = '#1F2E46';

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
				showLabel: false,
				style: styles.navigator,
				tabStyle: {
					backgroundColor: barColor,
				},
				allowFontScaling: true,
			}}
		>
			<MainStack.Screen name="Home" component={TodayHabitList}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="home" size={24} color={color} />
					),
				}}
			/>
			<MainStack.Screen name="Stats" component={TodayHabitList}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="bar-graph" size={24} color={color} />
					),
				}}
			/>
			<MainStack.Screen name="EmptyComponent" component={EmptyComponent}
				options={({ navigation, route }) => ({
					//tabBarButton: () => (<PayScreenModal />),
					tabBarButton: props => <TabBarAdvancedButton bgColor={barColor} {...props} />,
				})}
			/>
			<MainStack.Screen name="Plan" component={AppList}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Entypo name="star" size={24} color={color} />
					),
				}}
			/>
			<MainStack.Screen name="Settings" component={AppForm}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="settings" size={24} color={color} />
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
		elevation: 30,
		maxHeight: 150,
		height: 40,
	},
	xFillLine: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 34
	}
});

export default AppTab;