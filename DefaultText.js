import React from 'react';
import { Text } from 'react-native';

export default function DefaultText({ children, style }) {
    return (
        <Text style={[style, { fontFamily: 'Roboto', fontWeight: '700'}]}>{children}</Text>
    );
}