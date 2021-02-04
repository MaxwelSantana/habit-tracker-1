import React from "react"
import Svg, { Path, SvgProps } from "react-native-svg";

export default function TabBg({
    color = '#FFFFFF',
    ...props
}){
    return (
        <Svg
            width={75}
            height={61}
            viewBox="0 0 75 61"
            {...props}
        >
            <Path
                d="M 75.2 0 L 75.2 61 L 0 61 L 0 0 C 4.1 0 7.4 3.1 7.9 7.1 C 10 21.7 22.046 41.027 37.246 41.027 C 52.446 41.027 65.4 21.7 67.4 7.1 C 67.9 3.1 71.3 0 75.3 0 L 75.2 0 L 75.2 0 Z"
                fill={color}
            />
        </Svg>
    )
};
