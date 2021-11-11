import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './RootStackNavigation';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import TabsScreen from './TabNavigation';
import { getUserAction } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import StackScreen from './TabNavigation';
import VerifyNavigation from './VerifyNavigation';
import AdminNavigation from './AdminNavigation';



export default function Routes() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const userState = useSelector(state => state.user)
    // Handle user state changes
    console.log('userroutes', user)
    console.log('userState:', userState)
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

    return (
        <NavigationContainer>
            {user ? userState?.response?.role ? <AdminNavigation /> : <StackScreen /> : <RootStackScreen />}
        </NavigationContainer>
    );
}
