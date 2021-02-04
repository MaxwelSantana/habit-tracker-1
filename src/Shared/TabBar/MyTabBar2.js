import * as React from 'react';
import { Link, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    NavigationContext,
    NavigationRouteContext,
    TabNavigationState,
    ParamListBase,
    CommonActions,
    useTheme,
    useLinkBuilder,
} from '@react-navigation/native';

export default function MyTabBar2(props) {
    const { state, descriptors, navigation, activeTintColor, inactiveTintColor, style, tabStyle, } = props;
    const { routes, index: activeRouteIndex } = state;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 40, backgroundColor: 'white' }}>
                {routes.map((route, routeIndex) => {
                    const { options, render } = descriptors[route.key];
                    const { tabBarIcon, tabBarButton = ({
                        children,
                        style,
                        onPress,
                        to,
                        accessibilityRole,
                        ...rest
                    }) => (
                        <TouchableWithoutFeedback
                            {...rest}
                            accessibilityRole={accessibilityRole}
                            onPress={onPress}
                        >
                            <View style={style}>{children}</View>
                        </TouchableWithoutFeedback>
                    ) } = options;

                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isRouteActive = routeIndex === activeRouteIndex;
                    const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isRouteActive && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const renderIcon = () => {
                        if (tabBarIcon === undefined) {
                            return null;
                        }
                        return tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 });
                    };

                    return (
                        tabBarButton({
                            key: route.key,
                            accessibilityRole: "button",
                            accessibilityState: isRouteActive ? { selected: true } : {},
                            accessibilityLabel: options.tabBarAccessibilityLabel,
                            testID: options.tabBarTestID,
                            onPress: onPress,
                            onLongPress: onLongPress,
                            children: renderIcon(),
                            style: [{ flex: 1, alignItems: 'center', justifyContent: 'center' }]
                        })
                    );
                })}
            </View>
        </View>
    );
}