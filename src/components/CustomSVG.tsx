import { StyleProp, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface SVG_COMP {
    icon: { d: string; viewBox: string };
    w?: string;
    h?: string;
    color?: string;
    style?: StyleProp<ViewStyle>;
}

const CustomSVG = (props: SVG_COMP) => (
    <Svg width={props.w} height={props.h} viewBox={props.icon.viewBox} style={props.style}>
        <Path d={props.icon.d} fill={props.color ?? '#FFFFFF99'} />
    </Svg>
);

export default CustomSVG;
