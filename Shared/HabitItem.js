import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import DefaultText from './DefaultText';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function HabitItem() {
    const size = 25;
    const color = '#1F8DFC';
    const { done, total, measure } = {
        done: 5,
        total: 5,
        measure: 'Copos'
    }
    const progress = () => `${done}/${total}`;
    const completed = () => done === total;
    const opacity = completed() ? 0.45 : 1;
    return (
        <TouchableOpacity style={styles.item}>
            <View style={styles.content}>
                <CircularProgress
                    style={styles.circularProgress}
                    done={done}
                    total={total}
                    size={33}
                    strokeWidth={5}
                    color={color}
                    opacity={opacity}
                    duration={500}
                >
                    <MaterialCommunityIcons name="water" {...{ size, color }} />
                </CircularProgress>
                <View style={styles.titleBlock}>
                    <DefaultText style={[styles.title, { opacity }, completed() && {textDecorationLine: 'line-through', textDecorationStyle: 'solid'}]}>Beber água</DefaultText>
                    <DefaultText style={[styles.motivationPhrase, { opacity }]}>Go for it</DefaultText>
                </View>
                <View style={styles.goalsBlock}>
                    <DefaultText style={[styles.goalProgress, { color, opacity }]}>{progress()}</DefaultText>
                    <DefaultText style={[styles.goalMeasure, { opacity }]}>{measure}</DefaultText>
                </View>
            </View>
            <View style={styles.actions}>
                {
                    completed()
                        ? <FontAwesome name="rotate-left" size={20} color='#E9EAFA' />
                        : <FontAwesome5 name="check" size={20} color='#E9EAFA' />
                }

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        flexDirection: 'row',
        padding: 10,
        paddingRight: 0,
        fontSize: 18,
        backgroundColor: '#3C4858',
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: "#1F2E46",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    circularProgress: {},
    titleBlock: {
        flex: 1,
        marginLeft: 12,
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
        marginRight: 12,
        justifyContent: 'center',
    },
    goalProgress: {
        fontSize: 16,
        lineHeight: 18,
    },
    goalMeasure: {
        fontSize: 10,
        lineHeight: 12,
        color: 'rgba(233, 234, 250, 0.45)',
    },
    actions: {
        borderLeftWidth: 1,
        borderLeftColor: '#465161',
        width: 40 + 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconShadow: {
        shadowColor: "#1F2E46",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
    }
})