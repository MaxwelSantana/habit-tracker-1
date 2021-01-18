import * as React from 'react';
import Svg, { Circle, G } from "react-native-svg";
import { View, Easing, StyleSheet, Animated } from "react-native";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const strokeLinejoin = "butt" | "round"
const strokeLinecap = "butt" | "round"
const fill = "none"
const cx = "50%";
const cy = "50%";

export default function CircularProgress({
    strokeWidth = 3,
    percentage = 90,
    max = 100,
    size = 20,
    duration = percentage * 5,
    color = "#1F8DFC",
    children
}) {
    const radius = (size + strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;
    const animated = new Animated.Value(0);

    percentage = percentage > max ? max : percentage < 0 ? 0 : percentage;
    const maxPerc = 100 * percentage / max;
    const circumferenceProgress = (circumference * maxPerc) / 100;

    const strokeDashoffset = animated.interpolate({
        inputRange: [0, circumference],
        outputRange: [circumference, 0],
        extrapolate: 'clamp'
    });

    React.useEffect(() => {
        Animated.timing(
            animated,
            {
                delay: 0,
                toValue: circumferenceProgress,
                duration,
                useNativeDriver: true,
                easing: Easing.linear
            }
        ).start();

        return () => {
            animated.removeAllListeners();
        };
    }, [animated]);

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>

            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`} >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <AnimatedCircle
                        r={radius}
                        stroke={color}
                        strokeDasharray={circumference}
                        {...{
                            strokeDashoffset, strokeLinecap, strokeWidth, cx, cy, fill,
                        }}
                    />

                    <Circle
                        r={radius}
                        strokeOpacity=".1"
                        {...{
                            strokeLinejoin, strokeWidth, cx, cy, fill
                        }}
                    />
                </G>
            </Svg>
            <View style={[StyleSheet.absoluteFillObject, styles.icon]}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        transform: [{ rotateZ: "270deg" }],
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});