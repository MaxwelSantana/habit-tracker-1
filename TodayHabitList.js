import React, { Component } from 'react';
import { SectionList, FlatList, StyleSheet, Text, View } from 'react-native';
import HabitItem from './HabitItem';

export default class TodayHabitList extends Component {
	render() {
		return (
			<View style={styles.container}>
				<SectionList
					sections={[
						{ title: 'Manhã', data: ['Devin ', 'Dan', 'Dominic'] },
						{ title: 'Tarde', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
					]}
					renderItem={({ item }) => <HabitItem name={item} ></HabitItem>}
					renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
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
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#343F4D',
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: 'bold',
		backgroundColor: 'rgba(247,247,247,1.0)',
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
})