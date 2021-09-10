import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { getUserAction, logOutAction } from '../../redux/action'
import auth from '@react-native-firebase/auth';


const Discover = ({ navigation }) => {
    // const homeState = useSelector(state => state ? state.login.response ? state.login.response : state.register.response : null)
    // const homeState = useSelector(state => state.user.response)
    // console.log('my state user', homeState)
    // const [isLoading, setIsLoading] = useState(true)

    // const dispatch = useDispatch()

    const logOutHandler = () => {
        const action = logOutAction()
        dispatch(action)
    }

    // useEffect(() => {
    //     if (homeState) {
    //         setIsLoading(false)
    //     }
    // }, [homeState])

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
    //             <ActivityIndicator size="large" color="grey" />
    //         </View>
    //     );
    // }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>Welcome {homeState._data.name ? homeState._data.name : homeState._data.email}</Text> */}
            <Text>Welcome to Discover</Text>
            <View>
                <TouchableOpacity onPress={() => { navigation.navigate('Food Detail') }}>
                    <Text>
                        Move to Detail
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

export default Discover

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
