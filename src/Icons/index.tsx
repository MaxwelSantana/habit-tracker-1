import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

type IconProps = {
    size: number,
    color: string,
};

type HabitIconProps = {
    name: 'water' | 'bookmark'
}

export const UndoIcon = ({ size, color, }: IconProps) => (
	<FontAwesome name="rotate-left" size={size} color={color} />
);

export const DoneIcon = ({ size, color, }: IconProps) => (
	<FontAwesome5 name="check" size={size} color={color} />
);

export const BackIcon = ({ size, color, }: IconProps) => (
	<Feather name="chevron-left" size={size} color={color} />
);

export const HabitIcon = ({ name, size, color, }: HabitIconProps & IconProps) => (
	<MaterialCommunityIcons name={name} size={size} color={color} />
);