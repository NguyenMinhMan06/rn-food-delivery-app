import 'react-native-gesture-handler';
import React, { useContext, useEffect, useMemo, useReducer } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodDetail from '../screens/FoodDetail';
import Home from '../screens/Home';
import RootStackScreen from './RootStackNavigation';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginReducer from '../redux/reducers/loginReducer';
import HomeNavigation from './HomeNavigation';
import { AuthContext } from '../components/context';

export default function AuthenNavigation() {
    const { loginState, dispatch } = useContext(AuthContext)

    useEffect(() => {
        setTimeout(async () => {
            // setIsLoading(false)
            let userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
        }, 1000);
    }, []);


    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }
    return (
        loginState.userToken !== null ? <HomeNavigation /> : <RootStackScreen />
    )

}
