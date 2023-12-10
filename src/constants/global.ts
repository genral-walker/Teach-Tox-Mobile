import { StyleSheet } from 'react-native';

export const fonts = {
    regular: 'SF-Pro-Rounded-Regular',
    medium: 'SF-Pro-Rounded-Medium',
    semiBold: 'SF-Pro-Rounded-Semibold',
    bold: 'SF-Pro-Rounded-Bold',
    extraBold: 'SF-Pro-Rounded-Heavy',
};

export const styles = StyleSheet.create({
    flexBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'SF-Pro-Rounded-Regular',
        color: 'white',
    },
});
