import React, { Component } from 'react';
import { SectionList, FlatList, StyleSheet, Text, View } from 'react-native';
import HabitItem from '../Shared/HabitItem';
import DefaultText from '../Shared/DefaultText';
import CalendarHeader from "./CalendarHeader";

export default class TodayHabitList extends Component {
	render() {
		return (
			<View style={styles.container}>
				<CalendarHeader />
				<SectionList style={styles.habitList}
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
		backgroundColor: '#343F4D',
	},
	habitList: {
		paddingLeft: 16,
		paddingRight: 16,
	},
	sectionHeader: {
		fontSize: 12,
		fontWeight: '400',
		color: 'rgba(233, 234, 250, 0.8)',
		marginTop: 10,
		marginBottom: 20
	},
})