import React, { useContext, useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { getUserAction, logOutAction } from '../../redux/action'
import auth from '@react-native-firebase/auth';
import { colors, fonts } from '../../../assets/style'
import FA5 from 'react-native-vector-icons/FontAwesome5'


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
            <View style={{ width: '100%', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 18 }}>
                    Personal details
                </Text>
                <TouchableOpacity>
                    <Text style={{ ...fonts.type1, fontSize: 15, color: colors.default }}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 10, borderWidth: 0, padding: 10, marginBottom: 10, backgroundColor: '#fff' }}>
                <View style={{ width: '40%', justifyContent: 'center', paddingHorizontal: 10, }}>
                    <Image source={require('../../../assets/images/avatar-1.jpg')} style={{ width: 100, height: 100, borderRadius: 75, backgroundColor: 'cyan' }} resizeMode={'cover'} />

                </View>
                <View>

                    <Text style={{ ...fonts.type3, fontWeight: 'bold', paddingBottom: 10, }}>{homeState._data.name ? homeState._data.name : homeState._data.email}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <FA5 name={'envelope'} size={18} color={colors.grey} style={{ paddingRight: 6, }} />
                        <Text style={{ ...fonts.type1, color: colors.grey, width: '100%', paddingBottom: 4, }}> {homeState._data.email}</Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FA5 name={'phone-alt'} size={18} color={colors.grey} style={{ paddingRight: 6, }} />
                        <Text style={{ ...fonts.type1, color: colors.grey, width: '100%', paddingBottom: 4, }}> 0984277152</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FA5 name={'map-marked-alt'} size={18} color={colors.grey} style={{ paddingRight: 6, }} />
                        <Text style={{ ...fonts.type1, color: colors.grey, width: '100%', paddingBottom: 4, }}>Ho Chi Minh, Viet Nam</Text>
                    </View>
                </View>

            </View>
            <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', marginBottom: 10, }}>
                <TouchableOpacity style={{ width: '30%', height: 80, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}>
                    <FA5 name={'bell'} size={26} style={{ paddingBottom: 10, }} />
                    <Text style={{ ...fonts.type1, }}>
                        Notifications
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '30%', height: 80, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}>
                    <FA5 name={'credit-card'} size={26} style={{ paddingBottom: 10, }} />
                    <Text style={{ ...fonts.type1, }}>
                        Payments
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '30%', height: 80, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}>
                    <FA5 name={'cog'} size={26} style={{ paddingBottom: 10, }} />
                    <Text style={{ ...fonts.type1, }}>
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', borderWidth: 0, borderRadius: 10, height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, }}>
                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>Manage Address</Text>
                <FA5 name={'chevron-right'} size={18} />

            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', borderWidth: 0, borderRadius: 10, height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, }}>
                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>Your Order</Text>
                <FA5 name={'chevron-right'} size={18} />

            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', backgroundColor: '#fff', borderWidth: 0, borderRadius: 10, height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, }}>
                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>Feedback & Refunds</Text>
                <FA5 name={'chevron-right'} size={18} />

            </TouchableOpacity>

            <TouchableOpacity style={{ width: '30%', backgroundColor: '#fff', borderRadius: 10, height: 40, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, }}>
                <FA5 name={'info-circle'} size={16} />

                <Text style={{ ...fonts.type1, fontSize: 14, }}>About</Text>

            </TouchableOpacity>

            <View style={{ width: '100%', marginTop: 20, }}>
                <TouchableOpacity style={{ width: '30%', height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => { logOutHandler() }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, fontWeight: 'bold', color: colors.default }}>
                        Log Out
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
        paddingHorizontal: '3%',
    }

})
