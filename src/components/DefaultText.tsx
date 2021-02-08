import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

type Props = {
    style: StyleProp<TextStyle>,
    children: React.ReactNode;
}

export default function DefaultText({ children, style, }: Props) {
    return (
        <Text style={[{ fontWeight: '700', }, style, { fontFamily: 'Roboto', }]}>{children}</Text>
    );
}