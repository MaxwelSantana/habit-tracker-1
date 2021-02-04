import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import TabBg from './TabBg';
//https://itnext.io/reactnative-curved-tabbar-dc62e681c24d
export default function TabBarAdvancedButton2({
    bgColor,
    ...props
}) {
    return (
        <View
            style={{flex:1, flexDirection: 'column'}}
            pointerEvents="box-none"
        >
            <TouchableOpacity
                style={styles.button}
                onPress={() => alert('pressed')}
            >
                <Icon
                    name="rocket"
                    style={styles.buttonIcon}
                />
            </TouchableOpacity>
            <View style={{ height: 60, width: 75 }}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 75,
        height: 75,
        alignItems: 'center',
        top: -16,
    },
    background: {
        position: 'absolute',
        top: 0,
    },
    button: {
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