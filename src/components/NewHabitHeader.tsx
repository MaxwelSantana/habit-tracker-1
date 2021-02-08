import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NewHabitHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CreateHabit</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
});