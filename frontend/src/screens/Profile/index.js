import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { getUserAction, logOutAction } from '../../redux/action'
import auth from '@react-native-firebase/auth';


const Profile = ({ navigation }) => {
    // const homeState = useSelector(state => state ? state.login.response ? state.login.response : state.register.response : null)
    const homeState = useSelector(state => state.user.response)
    console.log('my state user', homeState)

    const dispatch = useDispatch()

    // const [user, setUser] = useState();

    // // Handle user state changes
    // function onAuthStateChanged(user) {
    //     setUser(user);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     console.log('im running useeffect')
    //     return subscriber; // unsubscribe on unmount
    // }, []);
    // console.log('???', user)


    const logOutHandler = () => {
        const action = logOutAction()
        dispatch(action)
    }

    // useEffect(() => {
    //     if (user) {
    //         console.log(user.uid)
    //         const action = getUserAction(user.uid)
    //         dispatch(action)
    //     }
    // }, [user])

    return (
        <SafeAreaView style={styles.container}>
            <Text>Welcome to profile {homeState._data.name ? homeState._data.name : homeState._data.email}</Text>
            <View>
                <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                    <Text>
                        Move to HOME
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => { logOutHandler() }}>
                    <Text>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
