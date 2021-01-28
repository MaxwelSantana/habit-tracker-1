import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import NewHabitHeader from './NewHabitHeader';

export default class CreateHabit extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NewHabitHeader />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#343F4D',
        flex: 1,
    }
});