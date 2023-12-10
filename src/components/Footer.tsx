import { View, Text, Platform } from 'react-native';
import iconPaths from '../constants/iconPaths';
import CustomSVG from './CustomSVG';
import { fonts, styles } from '../constants/global';

const Footer = () => {
    return (
        <View
            style={{
                height: Platform.OS === 'ios' ? 95 : 70,
                backgroundColor: 'black',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingHorizontal: 25,
            }}
        >
            {[
                { title: 'Home', icon: iconPaths.home },
                { title: 'Discover', icon: iconPaths.discover },
                { title: 'Activity', icon: iconPaths.timer },
                { title: 'Bookmarks', icon: iconPaths.bookmark },
                { title: 'Profile', icon: iconPaths.profile },
            ].map(({ title, icon }, idx) => (
                <View
                    key={title}
                    style={{
                        alignItems: 'center',
                        transform: [{ translateY: -1 }],
                    }}
                >
                    <CustomSVG
                        h="40"
                        w={idx ? '23' : '24'}
                        icon={icon}
                        color={!idx ? 'white' : undefined}
                    />
                    <Text
                        style={[
                            styles.text,
                            {
                                color: idx ? 'rgba(255, 255, 255, 0.4)' : 'white',
                                fontSize: Platform.OS === 'ios' ? 12 : 10,
                                fontFamily: fonts.medium,
                                transform: [{ translateY: Platform.OS === 'ios' ? -5 : -8 }],
                            },
                        ]}
                    >
                        {title}
                    </Text>
                </View>
            ))}
        </View>
    );
};

export default Footer;
