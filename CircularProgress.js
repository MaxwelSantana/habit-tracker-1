import * as React from 'react';
import Svg, { Circle, G } from "react-native-svg";
import { View, Easing, StyleSheet, Animated } from "react-native";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const size = 100;
const strokeWidth = 10;
const strokeLinejoin = "round"
const strokeLinecap = "round"
const fill = "none"


const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = "50%";
const cy = "50%";

export default function CircularProgress({
    percentage = 85,
    radius = 40,
    duration = 500,
    color = "#1F8DFC",
    max = 100
}) {
    const animated = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;

    const animation = (toValue) => {
        return Animated.timing(animated, {
            delay: 100,
            toValue,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    };

    React.useEffect(() => {
        animation(percentage);
        animated.addListener((v) => {
            const maxPerc = 100 * v.value / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;

            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        }, [max, percentage]);

        return () => {
            animated.removeAllListeners();
        };
    });


    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>

            <Svg 
                width={radius * 2} 
                height={radius * 2} 
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`} >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <AnimatedCircle
                        ref={circleRef}
                        r={radius}
                        stroke={color}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        {...{
                            strokeLinecap, strokeWidth, cx, cy, fill,
                        }}
                    />

                    <Circle
                        r={radius}
                        stroke={color}
                        strokeOpacity=".1"
                        {...{
                            strokeLinejoin, strokeWidth, cx, cy, fill
                        }}
                    />
                </G>
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        transform: [{ rotateZ: "270deg" }],
    },
});