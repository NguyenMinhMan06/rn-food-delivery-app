import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Resgiter';
import Home from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnboardingScreen from '../screens/OnboardingScreen';
import InputPhone from '../screens/PhoneVerify/InputPhone';
import InputOTP from '../screens/PhoneVerify/InputOTP';
import { useSelector } from 'react-redux';
import ForgotPassword from '../screens/Login/ForgotPassword';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;
    // const loginState = useSelector(state => state.login.response)
    // console.log('root stack', loginState)


    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
    }, []);


    if (isFirstLaunch === null) {
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    } else if (isFirstLaunch == true) {
        routeName = 'Onboarding';
    } else {
        routeName = 'SignInScreen';
    }

    return (
        <RootStack.Navigator headerMode='none' initialRouteName={routeName}>
            <RootStack.Screen
                name="Onboarding"
                component={OnboardingScreen}
            />
            <RootStack.Screen name="SignInScreen" component={Login} />
            <RootStack.Screen name="SignUpScreen" component={Register} />
            <RootStack.Screen name="ForgotScreen" component={ForgotPassword} />

        </RootStack.Navigator>
    )
}

export default RootStackScreen;