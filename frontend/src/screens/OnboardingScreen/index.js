import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';
import { colors } from '../../../assets/style';

const Dots = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? colors.default : colors.orange;

    return (
        <View
            style={{
                width: selected ? 16 : 6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius: 6
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16, color: colors.default }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16, color: colors.default }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        {...props}
    >
        <Text style={{ fontSize: 16, color: colors.default }}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("SignInScreen")}
            onDone={() => navigation.navigate("SignInScreen")}
            titleStyles={{ paddingBottom: 40, color: colors.default }}
            subTitleStyles={{ fontSize: 18 }}
            bottomBarColor={'#fff'}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ height: 300, width: 310, }} resizeMode={'contain'} source={require('../../../assets/images/onboarding1.png')} />,
                    title: 'Select a restaurant',
                    subtitle: 'The nearest restaurant around you.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ height: 300, width: 310 }} resizeMode={'contain'} source={require('../../../assets/images/onboarding2.png')} />,
                    title: 'Order food you like',
                    subtitle: 'Select your favorite food and purschase.',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={{ height: 300, width: 310 }} resizeMode={'contain'} source={require('../../../assets/images/onboarding3.png')} />,
                    title: 'Deliver to your home',
                    subtitle: "The order will be delivery right away!",
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
