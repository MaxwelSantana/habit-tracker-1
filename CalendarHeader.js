import React from "react";
import { View, StyleSheet, Text } from "react-native";
import DefaultText from './DefaultText';
import CalendarStrip from 'react-native-calendar-strip';

//https://github.com/BugiDev/react-native-calendar-strip
export default function CalendarHeader() {
    return (
        <View style={styles.container}>
            <DefaultText style={styles.selectedDay}>1 de Janeiro</DefaultText>
            <CalendarStrip
                scrollable
                style={{ height: 50 }}
                calendarColor={'#3343CE'}
                calendarHeaderStyle={{ color: 'white' }}
                dateNumberStyle={{ color: 'white' }}
                dateNameStyle={{ color: 'white' }}
                iconContainer={{ flex: 0.1 }}
                showMonth={false}
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
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 20,
        backgroundColor: 'blue',
        height: 38
    }
});