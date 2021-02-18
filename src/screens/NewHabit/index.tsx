import React, { Component, useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../stacks/MainStack';
import DefaultText from '../../components/DefaultText';
import { BackIcon } from '../../icons';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { StyledView } from './styles';

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

const HeaderView = styled.View`
	align-items: center;
	height: 44;
	justify-content: center;
	margin: 10px;
`;

const HeaderTitle = styled(DefaultText)`
	color: ${props => props.theme.colors.text};
	font-size: 16px;
`;

const HeaderLeftBackbutton = styled.TouchableOpacity`
	justify-content: center;
	left: 0;
	position: absolute;
`;

const Header = ({ title, back, }: { title: string, back: () => void }) => {
	const { colors, } = useContext(ThemeContext);
	return (
		<HeaderView>
			<HeaderTitle>{title}</HeaderTitle>
			<HeaderLeftBackbutton onPress={back}>
				<BackIcon size={24} color={colors.text} />
			</HeaderLeftBackbutton>
		</HeaderView>
	);
};


const NewHabitWithSuggestions = ({ navigation, }: Props) => {
	const [habitName, setHabitName] = useState('teste');

	const goToNewHabitScreen = () => navigation.navigate('MainTab');
	const handleChangeText = (text: string) => setHabitName(text);

	const categories = [{ name: 'category 1', desc: 'desc 1', img: 'img 1', }, { name: 'category 2', desc: 'desc 2', img: 'img 2', }];

	return (
		<StyledView>
			<Header title="Novo Habito" back={goToNewHabitScreen} />
			<NewHabitFormName value={habitName} handleChangeText={handleChangeText} handleSubmit={goToNewHabitScreen} />
			<FlatList
				data={categories}
				renderItem={({ item, }) => <CategoryItem name={item.name} desc={item.desc} img={item.img} />}
				keyExtractor={({ name, }) => name}
			/>
		</StyledView>
	);
};

export default NewHabitWithSuggestions;