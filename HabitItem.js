import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HabitItem(props) {
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.progress}>
                <MaterialCommunityIcons name="water" size={19} color="black" />
            </View>
            <Text>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 10,
        fontSize: 18,
        height: 60,
        backgroundColor: '#3C4858',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10
    },
    progress: {
        borderWidth: 4,
        borderColor: '#20232a',
        width: 38,
        height: 38,
        borderRadius: 38/2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})