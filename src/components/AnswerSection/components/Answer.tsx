import { useEffect } from 'react';
import { Pressable, Platform, Text, Animated, View, Dimensions, StyleSheet } from 'react-native';
import { fonts, styles } from '../../../constants/global';
import { Option } from '../../../types';

const { width } = Dimensions.get('window');

const Answer = ({
    option,
    selectAnswer,
    showRightChoice,
    showSwiper,
    startAnimations,
    translateXBg,
    translateXGif,
    selectedAnswerId,
    translateXBgReverse,
}: {
    option: Option;
    selectAnswer: () => void;
    showRightChoice: boolean;
    showSwiper: boolean;
    translateXGif: Animated.Value;
    translateXBg: Animated.Value;
    translateXBgReverse: Animated.Value | null;
    startAnimations: () => void;
    selectedAnswerId: string;
}) => {
    useEffect(() => {
        if (showSwiper) {
            startAnimations();
        }
    }, [showSwiper]);

    return (
        <Pressable
            onPress={selectAnswer}
            style={{
                borderRadius: 10,
                height: 52,
                paddingHorizontal: 12,
                marginTop: 8,
                position: 'relative',
                overflow: 'hidden',

                ...Platform.select({
                    ios: {
                        shadowColor: 'black',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                    },
                    android: {
                        elevation: 2,
                    },
                }),
            }}
        >
            <Animated.View
                style={[
                    localStyles.swiper,
                    {
                        backgroundColor: '#abababa9',
                        left: 0,
                        transform: [
                            {
                                translateX: translateXBgReverse ?? 0,
                            },
                        ],
                    },
                ]}
            />

            {showSwiper && (
                <Animated.View
                    style={[
                        localStyles.swiper,
                        {
                            backgroundColor: showRightChoice
                                ? 'rgba(40, 177, 143, 0.5)'
                                : 'rgba(220, 95, 95, 0.6)',

                            right: 0,
                            transform: [{ translateX: translateXBg }],
                        },
                    ]}
                />
            )}

            <Text
                style={[
                    styles.text,
                    {
                        fontFamily: fonts.medium,
                        fontSize: 17,
                        textShadowColor: 'black',
                        textShadowOffset: { width: 2, height: 2 },
                        textShadowRadius: 5,
                        lineHeight: option.answer.length > 49 ? 26 : 29.29,
                        transform: [
                            {
                                translateY:
                                    option.answer.length > (Platform.OS === 'ios' ? 49 : 40)
                                        ? 3.5
                                        : 12.5,
                            },
                        ],
                    },
                ]}
            >
                {option.answer}
            </Text>

            {selectedAnswerId === option.id && (
                <Animated.Image
                    source={
                        showRightChoice
                            ? require('../../../assets/correct.gif')
                            : require('../../../assets/wrong.gif')
                    }
                    style={{
                        width: 53,
                        height: 52,
                        position: 'absolute',
                        right: 1.5,
                        zIndex: 6,
                        transform: [
                            showRightChoice ? { rotateY: '180deg' } : { rotate: '180deg' },
                            { translateX: translateXGif },
                        ],
                        top: showRightChoice ? -10 : 9,
                    }}
                />
            )}
        </Pressable>
    );
};

const localStyles = StyleSheet.create({
    swiper: {
        position: 'absolute',
        top: 0,
        borderRadius: 10,
        height: 100,
        width: width - 80,
        zIndex: -3,
    },
});

export default Answer;
