import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../redux/action';
import AdminNavigation from './AdminNavigation';
import RootStackScreen from './RootStackNavigation';
import StackScreen from './TabNavigation';



export default function Routes() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const userState = useSelector(state => state.user)
    // Handle user state changes
    // console.log('userroutes', user)
    // console.log('userState:', userState)
    const dispatch = useDispatch()


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false)
    }

    useEffect(() => {
        if (user?.uid) {
            // console.log(user.uid)
            const action = getUserAction(user.uid)
            dispatch(action)
        }
    }, [user])

    useEffect(() => {

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }

    if (userState.response?.role === 'admin' || userState.response?.role === 'manager') {
        return (
            <NavigationContainer>
                <AdminNavigation />
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer>
            {user ? <StackScreen /> : <RootStackScreen />}
        </NavigationContainer>
    );
}
