import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultText from '../Shared/DefaultText';
import WeekCalendar from "../WeeklyCalendar/WeekCalendar";

//https://github.com/BugiDev/react-native-calendar-strip
export default function CalendarHeader() {
    return (
        <View style={styles.container}>
            <DefaultText style={styles.selectedDay}>1 de Janeiro</DefaultText>
            <WeekCalendar
                style={styles.calendar}
                onWeekChanged={(weekStartDate, weekEndDate) => console.log({ weekStartDate, weekEndDate })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1F2E46',
    },
    selectedDay: {
        fontSize: 16,
        color: '#E9EAFA',
        alignSelf: 'center',
        padding: 16
    },
    calendar: {
        marginBottom: 20,
        height: 60
    }
});