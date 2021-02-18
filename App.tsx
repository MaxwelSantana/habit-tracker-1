import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/stacks/MainStack';
import Constants from 'expo-constants';

import { ThemeProvider, DefaultTheme } from 'styled-components/native';
import { dark } from './src/styles/themes/dark';

export default function App() {
	const statusBar = false;
	return (
		<View style={styles.container}>
			<ThemeProvider theme={dark}>
				<NavigationContainer>
					<MainStack />
				</NavigationContainer>
				{statusBar && <StatusBar style="light" />}
			</ThemeProvider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ECF0F1',
	},
	buttonContainer: {
		padding: 10,
	},
	textStyle: {
		textAlign: 'center',
	},
});