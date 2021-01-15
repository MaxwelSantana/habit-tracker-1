import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';

export default function HabitItem(props) {
    const size = 25;
    const color = '#1F8DFC';
    return (
        <TouchableOpacity style={styles.item}>
            <CircularProgress
                style={styles.circularProgress}
                percentage={100}
                size={38}
                strokeWidth={5}
                color='#1F8DFC'
            >
                <MaterialCommunityIcons name="water" {...{size, color}} />
            </CircularProgress>
        </TouchableOpacity>
    );
}
/*
<MaterialCommunityIcons name="water" {...{size, color}} />
<View style={styles.progress}>
                <MaterialCommunityIcons name="water" size={19} color="black" />
            </View>
            <Text>{props.name}</Text>
*/

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 10,
        fontSize: 18,
        /*height: 60,*/
        backgroundColor: '#3C4858',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    circularProgress: {

    },
    progress: {
        borderWidth: 4,
        borderColor: '#20232a',
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})