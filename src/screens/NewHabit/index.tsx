import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp  } from '@react-navigation/stack';
import { MainStackParamList } from '../../stacks/MainStack';

type Props = {
    navigation: StackNavigationProp<MainStackParamList, 'NewHabit'>
};

export default ({ navigation, }: Props ) => (
    <View style={styles.container}>
        <TouchableOpacity
            style={{ backgroundColor: 'white', padding: 20, }}
            onPress={() => navigation.pop()}
        >
            <Text>Modal me</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});