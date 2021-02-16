import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/stacks/MainStack';
import Constants from 'expo-constants';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#1F8DFC',
		accent: 'yellow',
	},
};

export default function App() {
	const statusBar = false;
	const teste = 0;
	return (
		<View style={styles.container}>

			<PaperProvider theme={theme}>
				<NavigationContainer>
					<MainStack />
				</NavigationContainer>
				{statusBar && <StatusBar style="light" />}
			</PaperProvider>
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