import { View, Text, Image, Platform } from 'react-native';
import { fonts, styles } from '../../constants/global';
import iconPaths from '../../constants/iconPaths';
import CustomSVG from '../CustomSVG';
import { User } from '../../types';

const AnswerSection = ({
    description,
    user,
    children,
}: {
    description: string;
    user: User;
    children: React.JSX.Element;
}) => {
    const indexOfHash = description.lastIndexOf('#');

    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: 'auto',
                marginHorizontal: 14,
                transform: [{ translateY: Platform.OS === 'ios' ? 27 : 50 }],
            }}
        >
            <View style={{ flex: 1 }}>
                {children}

                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.text, { fontSize: 15, fontFamily: fonts.semiBold }]}>
                        {user.name}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { fontSize: 13, marginTop: Platform.OS === 'ios' ? 6 : -3 },
                        ]}
                    >
                        {description.slice(0, indexOfHash)}{' '}
                        <Text style={{ fontFamily: fonts.bold }}>
                            {description.slice(indexOfHash)}
                        </Text>
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexBasis: 55,
                    alignItems: 'center',
                    transform: [{ translateX: 12 }, { translateY: -50 }],
                }}
            >
                <View>
                    <Image
                        style={{
                            borderColor: 'white',
                            borderRadius: 200,
                            borderWidth: 1,
                            width: 47,
                            height: 47,
                        }}
                        source={{
                            uri: user.avatar,
                        }}
                    />

                    <View
                        style={{
                            height: 21,
                            width: 21,
                            borderRadius: 200,
                            overflow: 'hidden',
                            position: 'relative',
                            left: 13,
                            bottom: 15,
                        }}
                    >
                        <CustomSVG
                            icon={iconPaths.addCircle}
                            h="21"
                            w="21"
                            color="white"
                            style={{
                                backgroundColor: 'rgba(40, 177, 143, 1)',
                            }}
                        />
                    </View>
                </View>
                {[
                    { icon: iconPaths.like, text: 87 },
                    { icon: iconPaths.comment, text: 2 },
                    { icon: iconPaths.bookmark, text: 203 },
                    { icon: iconPaths.share, text: 17 },
                ].map(({ icon, text }, idx) => (
                    <View style={{ alignItems: 'center', marginTop: idx ? 15 : -4 }} key={text}>
                        <CustomSVG icon={icon} h="30" w="30" color="white" />
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: 12,
                                    fontFamily: fonts.medium,
                                    transform: [{ translateY: Platform.OS === 'ios' ? 0 : -4 }],
                                },
                            ]}
                        >
                            {text}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default AnswerSection;
