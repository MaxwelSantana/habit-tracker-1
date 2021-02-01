import * as React from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function MyTabBar(props) {
    const { state, descriptors, navigation, activeTintColor, inactiveTintColor } = props;
    const { routes, index: activeRouteIndex } = state;
    return (
        <View style={{ flexDirection: 'row', height: 40, position: 'relative' }}>
            {routes.map((route, routeIndex) => {
                const { options } = descriptors[route.key];
                const { tabBarIcon } = options;
                //console.log('###########', { activeTintColor, inactiveTintColor })
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
                
                return (
                    <View
                        key={routeIndex}
                        style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {tabBarIcon({ route, focused: isRouteActive, color: tintColor, size: 25 })}
                    </View>
                );
            })}
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