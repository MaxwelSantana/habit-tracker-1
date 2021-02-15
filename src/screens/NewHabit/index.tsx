import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../stacks/MainStack';

type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'NewHabit'>
};

const NewHabitFormName = ({ value, handleChangeText, handleSubmit, }: 
	{ value: string, handleChangeText: (text: string) => void, handleSubmit: () => void; }) => (
	<View>
		<TextInput
			value={value}
			onChangeText={handleChangeText} />
		<Button
			onPress={handleSubmit}
			title="Login"
		/>
	</View>
);

const NewHabitWithSuggestions = ({ navigation, }: Props) => {
	const goToNewHabitScreen = () => navigation.navigate('NewHabit');
	return (
		<NewHabitFormName />
	);
};

export default ({ navigation, }: Props) => (
	<View style={styles.container}>
		<TouchableOpacity
			style={{ backgroundColor: 'white', padding: 20, }}
			onPress={() => navigation.pop()}
		>
			<Text>Modal me</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});