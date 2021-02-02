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

export default function MyTabBar(props) {
    const { state, descriptors, navigation, activeTintColor, inactiveTintColor, style, tabStyle, } = props;
    const { routes, index: activeRouteIndex } = state;

    return (
        <View style={{ height: 40 }} >
            <View style={{ flex: 1, flexDirection: 'row', }}>
                {routes.map((route, routeIndex) => {
                    const { options, render } = descriptors[route.key];
                    const { tabBarIcon, tabBarButton } = options;

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

                    const renderItem = () => {
                        return (
                            tabBarButton ?
                                tabBarButton() :
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    {tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 })}
                                </View>
                        );
                    }

                    const RenderItem2 = ({
                        children,
                        style,
                        onPress,
                        to,
                        accessibilityRole,
                        ...rest
                    }) => {
                        return tabBarButton ? tabBarButton({ onPress }) :
                            (<TouchableWithoutFeedback
                                {...rest}
                                accessibilityRole={accessibilityRole}
                                onPress={onPress}
                            >
                                <View style={style}>{children}</View>
                            </TouchableWithoutFeedback>);
                    }
                    /*
                                    return (
                                        <View
                                            key={routeIndex}
                                            style={{ flex: 1 }}>
                                            <RenderItem2
                                                onPress={onPress}
                                                onLongPress={onLongPress}
                                                style={{ flex: 1 }}
                                            >
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                                    {tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 })}
                                                </View>
                                            </RenderItem2>
                                        </View>
                                    );*/

                    /*
                    return (
                        <View
                            key={routeIndex}
                            style={{ flex: 1 }}>
                            <TouchableWithoutFeedback
                                key={routeIndex}
                                accessibilityRole="button"
                                accessibilityState={isRouteActive ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1 }}
                            >
                                {renderItem()}
    
                            </TouchableWithoutFeedback>
                        </View>
                    );
                    */

                    /*
    
                     return (
                         <TouchableWithoutFeedback
                    key={routeIndex}
                    accessibilityRole="button"
                    accessibilityState={isRouteActive ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 })}
                    </View>
                </TouchableWithoutFeedback>
                     );
                     */

                    /*
                                    return (
                                        <View
                                            key={routeIndex}
                                            style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <TouchableWithoutFeedback
                                                accessibilityRole="button"
                                                accessibilityState={isRouteActive ? { selected: true } : {}}
                                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                                testID={options.tabBarTestID}
                                                onPress={onPress}
                                                onLongPress={onLongPress}
                                                style={{ flex: 1 }}
                                            >
                                                {tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 })}
                                            </TouchableWithoutFeedback>
                    
                                        </View>
                                    );*/

                    return (
                        <NavigationContext.Provider
                            key={route.key}
                            value={descriptors[route.key].navigation}
                        >
                            <NavigationRouteContext.Provider value={route}>
                                <View
                                    style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <TouchableWithoutFeedback
                                        accessibilityRole="button"
                                        accessibilityState={isRouteActive ? { selected: true } : {}}
                                        accessibilityLabel={options.tabBarAccessibilityLabel}
                                        testID={options.tabBarTestID}
                                        onPress={onPress}
                                        onLongPress={onLongPress}
                                        style={{ flex: 1 }}
                                    >
                                        {tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 })}
                                    </TouchableWithoutFeedback>

                                </View>
                            </NavigationRouteContext.Provider>
                        </NavigationContext.Provider>
                    );
                })}
            </View>
        </View>
    );
}

/*
<TouchableOpacity
    key={routeIndex}
    accessibilityRole="button"
    accessibilityState={isRouteActive ? { selected: true } : {}}
    accessibilityLabel={options.tabBarAccessibilityLabel}
    testID={options.tabBarTestID}
    onPress={onPress}
    onLongPress={onLongPress}
    style={{ flex: 1 }}
>
</TouchableOpacity>
{renderIcon({ route, focused: isRouteActive, tintColor })}
<Text style={{ color: isRouteActive ? '#673ab7' : '#222' }}>
    {label}
</Text>
*/

const styles = StyleSheet.create({
    tabBar: {
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: StyleSheet.hairlineWidth,
        elevation: 8,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
});