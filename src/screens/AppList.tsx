import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { CircularProgress } from '../components/CircularProgress';

export default function AppList() {
	return (
		<View style={styles.container}>

			<CircularProgress done={5} total={10} color='black' />
			<CircularProgress done={7} total={10} color='blue' />
			<CircularProgress done={9} total={10} color='black' />
			<CircularProgress done={6} total={10} color='blue' />

			<Text>List!</Text>
			<StatusBar style="light" />

			<LinearGradient
				// Button Linear Gradient
				colors={['#4c669f', '#3b5998', '#192f6a']} >
				<Text>Sign in with Facebook</Text>
			</LinearGradient>


		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#343F4D',
		alignItems: 'center',
		justifyContent: 'center',
	},
});