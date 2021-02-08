import * as React from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { View, Easing, StyleSheet, Animated } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const strokeLinejoin: any = 'butt' || 'round';
const strokeLinecap: any = 'butt' || 'round';
const fill = 'none';
const cx = '50%';
const cy = '50%';

type Props = {
    done: number,
    total: number,
    strokeWidth?: number,
    size?: number,
    duration?: number,
    color?: string,
    opacity?: number,
    children?: React.ReactNode;
};

export const CircularProgress: React.FC<Props> = ({
    strokeWidth = 3,
    done = 90,
    total = 100,
    size = 20,
    duration = done * 5,
    color = '#1F8DFC',
    opacity = 1,
    children,
}) => {
    const radius = (size + strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;
    const animated = new Animated.Value(0);

    done = done > total ? total : done < 0 ? 0 : done;
    const maxPerc = 100 * done / total;
    const circumferenceProgress = (circumference * maxPerc) / 100;

    const strokeDashoffset = animated.interpolate({
        inputRange: [0, circumference],
        outputRange: [circumference, 0],
        extrapolate: 'clamp',
    });

    React.useEffect(() => {
        Animated.timing(
            animated,
            {
                delay: 0,
                toValue: circumferenceProgress,
                duration,
                useNativeDriver: true,
                easing: Easing.linear,
            }
        ).start();

        return () => {
            animated.removeAllListeners();
        };
    }, [animated]);

    return (
        <View style={{ width: radius * 2, height: radius * 2, }}>

            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`} >
                <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                    <AnimatedCircle
                        r={radius}
                        stroke={color}
                        strokeDasharray={circumference}
                        strokeOpacity={opacity}
                        {...{
                            strokeDashoffset, strokeLinecap, strokeWidth, cx, cy, fill,
                        }}
                    />

                    <Circle
                        r={radius}
                        strokeOpacity=".1"
                        {...{
                            strokeLinejoin, strokeWidth, cx, cy, fill,
                        }}
                    />
                </G>
            </Svg>
            <View style={[StyleSheet.absoluteFillObject, styles.icon, { opacity, }]}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        transform: [{ rotateZ: '270deg', }],
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});