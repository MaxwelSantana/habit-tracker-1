import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import TabBg from './TabBg';
//https://itnext.io/reactnative-curved-tabbar-dc62e681c24d
export default function TabBarAdvancedButton({
    bgColor,
    ...props
}) {
    return (
        <View
            style={styles.container}
            pointerEvents="box-none"
        >
            <View style={{ height: 60 }}></View>
            <TabBg
                color={bgColor}
                style={styles.background}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPress}
            >
                <Icon
                    name="rocket"
                    style={styles.buttonIcon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 75,
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        top: 0,
    },
    button: {
        top: -70,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 27,
        backgroundColor: '#E94F37',
    },
    buttonIcon: {
        fontSize: 16,
        color: '#F6F7EB'
    }
});