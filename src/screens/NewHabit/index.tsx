import React, { Component, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../stacks/MainStack';
import DefaultText from '../../components/DefaultText';
import { BackIcon } from '../../Icons';

type Props = {
	navigation: StackNavigationProp<MainStackParamList, 'NewHabit'>
};

const NewHabitFormName = ({ value, handleChangeText, handleSubmit, }:
	{ value: string, handleChangeText: (text: string) => void, handleSubmit: () => void; }) => (
	<View style={{ height: 40, flex: 1, }}>
		<TextInput
			value={value}
			onChangeText={handleChangeText} />
		<Button
			onPress={handleSubmit}
			title="Create"
		/>
	</View>
);

const CategoryItem = ({ name, desc, img, }: { name: string, desc: string, img: string }) => (
	<>
		<Text>{name}</Text>
		<Text>{desc}</Text>
		<Text>{img}</Text>
	</>
);

const Header = ({ title, back, }: { title: string, back: () => void }) => (
	<View style={{ height: 44, alignItems: 'center', justifyContent: 'center', }}>
		<DefaultText style={{ fontSize: 16, }}>{title}</DefaultText>
		<BackIcon size={22} color="#E9EAFA" />
	</View>
);

const NewHabitWithSuggestions = ({ navigation, }: Props) => {
	const [habitName, setHabitName] = useState('teste');

	const goToNewHabitScreen = () => navigation.pop();
	const handleChangeText = (text: string) => setHabitName(text);

	const categories = [{ name: 'category 1', desc: 'desc 1', img: 'img 1', }, { name: 'category 2', desc: 'desc 2', img: 'img 2', }];

	return (
		<View style={styles.container}>
			<Header title="Novo Habito" back={goToNewHabitScreen} />
			<NewHabitFormName value={habitName} handleChangeText={handleChangeText} handleSubmit={goToNewHabitScreen} />
			<FlatList
				data={categories}
				renderItem={({ item, }) => <CategoryItem name={item.name} desc={item.desc} img={item.img} />}
				keyExtractor={({ name, }) => name}
			/>
		</View>
	);
};

export default NewHabitWithSuggestions;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1F2E46',
		alignItems: 'center',
		justifyContent: 'center',
	},
});