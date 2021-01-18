import React from 'react';
import { Text } from 'react-native';

export default function DefaultText({ children, style }) {
    return (
        <Text style={[{ fontWeight: '700'}, style, { fontFamily: 'Roboto'}]}>{children}</Text>
    );
}