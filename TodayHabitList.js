import React, { Component } from 'react';
import { SectionList, FlatList, StyleSheet, Text, View } from 'react-native';
import HabitItem from './HabitItem';
import DefaultText from './DefaultText';

export default class TodayHabitList extends Component {
	render() {
		return (
			<View style={styles.container}>
				<SectionList
					sections={[
						{ title: 'Manhã (3)', data: ['Devin ', 'Dan', 'Dominic'] },
						{ title: 'Tarde (7)', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
					]}
					renderItem={({ item }) => <HabitItem name={item} ></HabitItem>}
					renderSectionHeader={({ section }) => <DefaultText style={styles.sectionHeader}>{section.title}</DefaultText>}
					keyExtractor={(item, index) => index}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
		paddingLeft: 16,
		paddingRight: 16,
		backgroundColor: '#343F4D',
	},
	sectionHeader: {
		fontSize: 12,
		fontWeight: '400',
		color: 'rgba(233, 234, 250, 0.8)',
		marginTop: 10,
		marginBottom: 20
	},
})