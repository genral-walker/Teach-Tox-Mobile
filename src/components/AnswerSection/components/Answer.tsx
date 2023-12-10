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
}: {
    option: Option;
    selectAnswer: () => void;
    showRightChoice: boolean;
    showSwiper: boolean;
    translateXGif: Animated.Value;
    translateXBg: Animated.Value;
    startAnimations: () => void;
    selectedAnswerId: string;
}) => {
    useEffect(() => {
        if (showSwiper) {
            startAnimations();
        }
    }, [showSwiper]);

    console.log('showRightChoice ', showRightChoice, 'answer ', option.answer);

    return (
        <Pressable
            onPress={selectAnswer}
            style={{
                backgroundColor: '#abababa9',
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
            {showSwiper && (
                <Animated.View
                    style={{
                        backgroundColor: showRightChoice
                            ? 'rgba(40, 177, 143, 0.5)'
                            : 'rgba(220, 95, 95, 0.6)',
                        position: 'absolute',
                        borderRadius: 10,
                        right: 0,
                        top: 0,
                        height: 100,
                        width,
                        zIndex: -3,

                        transform: [{ translateX: translateXBg }],
                    }}
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

            {selectedAnswerId === option.id && showSwiper && (
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

export default Answer;
