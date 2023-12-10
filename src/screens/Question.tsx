import { Dimensions, ImageBackground, Platform, StatusBar, Text, View } from 'react-native';
import { fonts, styles } from '../constants/global';
import AnswerSection from '../components/AnswerSection';
import CustomSVG from '../components/CustomSVG';
import iconPaths from '../constants/iconPaths';
import { User } from '../types';

const Question = ({
    image,
    question,
    playlist,
    height,
    user,
    description,
    children,
}: {
    description: string;
    user: User;
    height: number;
    image: string;
    question: string;
    playlist: string;
    children: React.JSX.Element;
}) => {
    return (
        <ImageBackground
            source={{
                uri: image,
            }}
            style={{
                paddingTop: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
                position: 'relative',
                backgroundColor: 'yellow',
                height,
            }}
        >
            <View
                style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                    backgroundColor: 'black',
                    opacity: 0.4,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                }}
            />

            <Text
                style={[
                    styles.text,
                    {
                        width: '73%',
                        backgroundColor: 'rgba(0, 0, 0, 0.561)',
                        borderRadius: 10,
                        marginTop: 100,
                        fontSize: Platform.OS === 'ios' ? 32 : 24,
                        lineHeight: Platform.OS === 'ios' ? 50 : 40,
                        paddingLeft: 8,
                        fontFamily: fonts.medium,
                        overflow: 'hidden',
                        marginHorizontal: 14,
                    },
                ]}
            >
                {question}
            </Text>

            <AnswerSection description={description} user={user}>
                {children}
            </AnswerSection>

            <View
                style={{
                    backgroundColor: 'rgba(22, 22, 22, 1)',
                    height: 36,
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 6,
                    paddingHorizontal: 14,
                }}
            >
                <CustomSVG w="20" h="15" icon={iconPaths.playlist} color="white" />
                <Text
                    style={[
                        styles.text,
                        {
                            fontSize: 13,
                            fontFamily: fonts.semiBold,
                            marginLeft: 5,
                            marginRight: 'auto',
                        },
                    ]}
                >
                    {playlist}
                </Text>
                <CustomSVG w="11" h="14" icon={iconPaths.rightArrow} color="white" />
            </View>
        </ImageBackground>
    );
};

export default Question;
