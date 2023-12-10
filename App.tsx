import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, NativeScrollEvent, StatusBar, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Question as QuestionType } from './src/types';
import Question from './src/screens/Question';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import useElmDimension from './src/hooks/useElmDimension';
import fetchTenQuestionsAndAnswers from './src/utils/fetchTenQuestionsAndAnswers';
import { fonts, styles } from './src/constants/global';
import Answers from './src/components/AnswerSection/components/Answers';

SplashScreen.preventAutoHideAsync();

StatusBar.setBarStyle('light-content');

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'SF-Pro-Rounded-Regular': require('./src/assets/fonts/SF-Pro-Rounded-Regular.otf'),
        'SF-Pro-Rounded-Medium': require('./src/assets/fonts/SF-Pro-Rounded-Medium.otf'),
        'SF-Pro-Rounded-Semibold': require('./src/assets/fonts/SF-Pro-Rounded-Semibold.otf'),
        'SF-Pro-Rounded-Bold': require('./src/assets/fonts/SF-Pro-Rounded-Bold.otf'),
        'SF-Pro-Rounded-Heavy': require('./src/assets/fonts/SF-Pro-Rounded-Heavy.otf'),
    });

    const answerRefs = useRef<any[]>([]);

    const [error, setError] = useState('');
    const {
        elmRef: swiperRef,
        getElmDimensions: getSwiperDimensions,
        elmDimensions: swiperDimensions,
    } = useElmDimension();

    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionsLoading, setQuestionsLoading] = useState(false);

    const fetchData = () =>
        fetchTenQuestionsAndAnswers(setQuestionsLoading, setQuestions, setError);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (error) {
            Alert.alert('Unable To Questions', error, [
                {
                    text: 'Try Again',
                    onPress: () => {
                        setError('');
                        fetchData();
                    },
                },
            ]);
        }
    }, [error]);

    const fetchNewPages = useCallback(
        (index: number) => {
            const closeToEnd = index >= questions.length - 2;

            if (closeToEnd && !questionsLoading && questions.length < 10) {
                fetchData();
            }
        },
        [questions, questionsLoading]
    );

    const getSwipeOffset = (nativeEvent: NativeScrollEvent) => {
        const { contentOffset, layoutMeasurement } = nativeEvent;
        const scrollY = contentOffset.y;
        const questionHeight = layoutMeasurement.height;

        const scrollPercentage = Math.floor((scrollY / questionHeight) * 100);
        const percentOut = 43 + Number(currentIndex ? currentIndex * 100 : 0);
        const percentIn = Number((currentIndex ? currentIndex - 1 || '' : '') + '85');

        if (scrollPercentage > percentOut || scrollPercentage <= percentIn) {
            answerRefs.current[currentIndex].resetClick();
        }
    };

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <>
            {questionsLoading && !questions.length ? (
                <Status />
            ) : (
                <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                    <Header />

                    <View onLayout={getSwiperDimensions} ref={swiperRef} style={{ flex: 1 }}>
                        {!swiperDimensions?.height ? (
                            <Status />
                        ) : (
                            <SwiperFlatList
                                onChangeIndex={({ index, prevIndex }) => {
                                    answerRefs.current[prevIndex].resetClick();
                                    setCurrentIndex(index);
                                    fetchNewPages(index);
                                }}
                                onScroll={({ nativeEvent }) => getSwipeOffset(nativeEvent)}
                                vertical
                                ListEmptyComponent={
                                    <Status showLoader={false} fetchData={fetchData} />
                                }
                                data={questions}
                                renderItem={({ item, index }) => (
                                    <Question
                                        height={swiperDimensions.height}
                                        {...item}
                                        key={item.id}
                                    >
                                        <Answers
                                            options={item.options}
                                            correct_option_id={item.correct_option_id!}
                                            ref={(ref) => (answerRefs.current[index] = ref)}
                                        />
                                    </Question>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        )}
                    </View>

                    <Footer />
                </View>
            )}
        </>
    );
}

const Status = ({ showLoader = true, fetchData = () => {} }) => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'rgba(22, 22, 22, 1)',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        {showLoader && <ActivityIndicator size={'large'} color={'white'} />}

        <Text style={[styles.text, { fontFamily: fonts.medium, fontSize: 20, marginTop: 20 }]}>
            {showLoader ? 'Loading Questions...' : 'No Questions Available'}
        </Text>

        {!showLoader && (
            <Text
                style={[
                    styles.text,
                    {
                        fontFamily: fonts.medium,
                        fontSize: 18,
                        marginTop: 20,
                        borderWidth: 2,
                        borderRadius: 6,
                        borderColor: 'white',
                        paddingVertical: 12,
                        paddingHorizontal: 25,
                    },
                ]}
                onPress={fetchData}
            >
                Reload
            </Text>
        )}
    </View>
);
