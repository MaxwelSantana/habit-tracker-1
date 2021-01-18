import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import DefaultText from './DefaultText';

export default function HabitItem(props) {
    const size = 25;
    const color = '#1F8DFC';
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.content}>
                <CircularProgress
                    style={styles.circularProgress}
                    percentage={100}
                    size={38}
                    strokeWidth={5}
                    color='#1F8DFC'
                >
                    <MaterialCommunityIcons name="water" {...{ size, color }} />
                </CircularProgress>
                <View style={styles.titleBlock}>
                    <DefaultText style={styles.title}>Beber água</DefaultText>
                    <DefaultText style={styles.motivationPhrase}>Go for it</DefaultText>
                </View>
                <View style={styles.goalsBlock}>
                    <DefaultText style={styles.goalsProgress}>1/5</DefaultText>
                    <DefaultText style={styles.goalsTitle}>copos</DefaultText>
                </View>
            </View>
            <View style={styles.actions}>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#3C4858',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    circularProgress: {},
    titleBlock: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        lineHeight: 18,
        color: '#E9EAFA'
    },
    motivationPhrase: {
        fontSize: 10,
        lineHeight: 12,
        color: 'rgba(233, 234, 250, 0.45)',
    },
    goalsBlock: {
        alignItems: 'flex-end', 
        marginRight: 20,
        justifyContent: 'center',
    },
    goalsProgress: {
        fontSize: 16,
        lineHeight: 18,
        color: '#1F8DFC'
    },
    goalsTitle: {
        fontSize: 10,
        lineHeight: 12,
        color: 'rgba(233, 234, 250, 0.45)',
    },
    actions: {
        width: 40,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'blue',
    }
})