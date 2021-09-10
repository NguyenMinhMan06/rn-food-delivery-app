import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Resgiter';
import Home from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage'
import OnboardingScreen from '../screens/OnBoardingScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;


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
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
            />
            <RootStack.Screen name="SignInScreen" component={Login} />
            <RootStack.Screen name="SignUpScreen" component={Register} />
        </RootStack.Navigator>
    )
}

export default RootStackScreen;