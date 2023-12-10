import { forwardRef, useImperativeHandle, useState } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import Answer from './Answer';
import { Option } from '../../../types';

const { width } = Dimensions.get('window');

const Answers = forwardRef(
    (
        {
            options,
            correct_option_id,
        }: {
            options: Option[];
            correct_option_id: string;
        },
        outerRef: any
    ) => {
        const [selectedAnswerId, setSelectedAnswerId] = useState('');

        const translateXGif = new Animated.Value(-40);
        const translateXBg = new Animated.Value(width);
        const translateXBgReverse = new Animated.Value(0);

        const animationConfig = {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        };

        const thisItemClicked = (optionId: string) => selectedAnswerId === optionId;
        const rightChoiceUnClicked = (optionId: string) =>
            Boolean(selectedAnswerId && correct_option_id === optionId);

        const startAnimations = () => {
            Animated.timing(translateXGif, animationConfig).start();
            Animated.timing(translateXBg, animationConfig).start();
            Animated.timing(translateXBgReverse, { ...animationConfig, toValue: -width }).start();
        };

        const resetAnimations = () => {
            Animated.timing(translateXGif, { ...animationConfig, toValue: -40 }).start();
            Animated.timing(translateXBg, { ...animationConfig, toValue: width }).start();
            Animated.timing(translateXBgReverse, { ...animationConfig, toValue: 0 }).start();
        };

        useImperativeHandle(outerRef, () => ({
            resetClick: () => {
                setSelectedAnswerId('');
                resetAnimations();
            },
        }));

        return (
            <View style={{ pointerEvents: selectedAnswerId ? 'none' : 'auto' }} ref={outerRef}>
                {options.map((option, idx) => (
                    <Answer
                        selectAnswer={() => setSelectedAnswerId(option.id)}
                        option={option}
                        showRightChoice={Boolean(
                            selectedAnswerId === correct_option_id ||
                                rightChoiceUnClicked(option.id)
                        )}
                        showSwiper={thisItemClicked(option.id) || rightChoiceUnClicked(option.id)}
                        translateXBg={translateXBg}
                        translateXGif={translateXGif}
                        startAnimations={startAnimations}
                        selectedAnswerId={selectedAnswerId}
                        translateXBgReverse={translateXBgReverse}
                        key={option.answer + idx}
                    />
                ))}
            </View>
        );
    }
);

export default Answers;
