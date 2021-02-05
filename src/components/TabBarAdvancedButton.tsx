import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo as Icon } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

//https://itnext.io/reactnative-curved-tabbar-dc62e681c24d
export default function TabBarAdvancedButton({
    bgColor,
    onPress,
    ...props
}) {
    const theme = useTheme();

    const border = { borderWidth: 5, borderColor: bgColor }

    return (
        <View
            style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: bgColor }}
            pointerEvents="box-none"
        >
            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={onPress}
            >
                <Icon
                    name="plus"
                    style={styles.buttonIcon}
                />
            </TouchableOpacity>

        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        top: 0,
    },
    button: {
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#E94F37',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    buttonIcon: {
        fontSize: 25,
        color: '#F6F7EB'
    }
});