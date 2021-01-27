import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DefaultText from '../Shared/DefaultText';
import WeekCalendar from "../WeeklyCalendar/WeekCalendar";
//import moment from 'moment/min/moment-with-locales';
import moment from "../Shared/Moment";

export default class CalendarHeader extends Component {
    constructor() {
        super();

        const today = moment();
        const selectedDate = today.clone();

        this.state = {
            today,
            selectedDate,
            selectedDateFormatted: selectedDate.format('LL'),
        }
    }

    onDateSelected = (selectedDate) => {
        this.setState({ selectedDate, selectedDateFormatted: selectedDate.format('LL') });
    }

    goToday = () => {
        this.weekCalendar.goToday();
    }

    isToday = () => {
        const { today, selectedDate } = this.state;

        if (today && selectedDate)
            return today.isSame(selectedDate, 'day');

        return false;
    }

    render() {
        const isToday = this.isToday();
        return (
            <View style={styles.container}>
                <View style={styles.dayContainer}>
                    <DefaultText style={[styles.selectedDay]}>{this.state.selectedDateFormatted}</DefaultText>
                    <View style={styles.actionButton}>
                        {
                            !isToday && 
                            <TouchableOpacity disabled={isToday} onPress={this.goToday}>
                                <DefaultText style={styles.today}>Hoje</DefaultText>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <WeekCalendar
                    ref={weekCalendar => this.weekCalendar = weekCalendar}
                    style={styles.calendar}
                    localeName={'en'}
                    selectedDate={this.state.selectedDate}
                    onDateSelected={this.onDateSelected}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1F2E46',
        paddingTop: 10
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative'
    },
    selectedDay: {
        fontSize: 16,
        color: '#E9EAFA',
        padding: 16,
    },
    actionButton: {
        right: 0,
        position: 'absolute',
    },
    today: {
        fontSize: 16,
        color: '#E9EAFA',
        padding: 16,
    },
    calendar: {
        marginBottom: 20,
        height: 60
    }
});