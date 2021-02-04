import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from '../Shared/CircularProgress';

export default function AppList() {
	return (
		<View style={styles.container}>

			<CircularProgress percentage={50} color='black' />
			<CircularProgress percentage={75} color='blue' />
			<CircularProgress percentage={90} color='black' />
			<CircularProgress percentage={65} color='blue' />

			<Text>List!</Text>
			<StatusBar style="light" />

			<LinearGradient
				// Button Linear Gradient
				colors={['#4c669f', '#3b5998', '#192f6a']}
				style={styles.button}>
				<Text style={styles.text}>Sign in with Facebook</Text>
			</LinearGradient>

			<IconButton
				icon="plus"
				color="#E9EAFA"
				size={50}
				onPress={() => console.log('Pressed')}
				style={{ backgroundColor: "#1F8DFC" }}
			/>


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