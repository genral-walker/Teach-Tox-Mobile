import { fonts, styles } from '../constants/global';
import iconPaths from '../constants/iconPaths';
import { Dimensions, Platform, StatusBar, Text, View } from 'react-native';
import CustomSVG from './CustomSVG';
import useStopwatch from '../hooks/useStopwatch';

const Header = () => {
    const { seconds, minutes } = useStopwatch();

    return (
        <View
            style={[
                styles.flexBetween,
                {
                    paddingHorizontal: 14,
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight! + 8,
                    left: 0,
                    width: Dimensions.get('window').width,
                    zIndex: 50,
                },
            ]}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: 52 }}>
                <CustomSVG w="20" h="19" icon={iconPaths.timer} />
                <Text style={[styles.text, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    {minutes ? `${minutes}m` : `${seconds}s`}
                </Text>
            </View>

            <View style={{ alignItems: 'center', transform: [{ translateX: -12 }] }}>
                <Text style={[styles.text, { fontFamily: fonts.semiBold, fontSize: 16 }]}>
                    For You
                </Text>
                <View
                    style={{
                        height: 4,
                        width: 30,
                        backgroundColor: 'white',
                        marginTop: Platform.OS === 'ios' ? 6 : 1,
                    }}
                />
            </View>

            <CustomSVG
                h="22"
                w="22"
                icon={iconPaths.search}
                color="white"
                style={{ marginEnd: 5 }}
            />
        </View>
    );
};

export default Header;
