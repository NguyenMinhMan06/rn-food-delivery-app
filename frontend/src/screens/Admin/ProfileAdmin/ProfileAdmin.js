import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { colors, fonts } from '../../../../assets/style'
import { logOutAction } from '../../../redux/action'

const ProfileAdmin = ({ navigation }) => {


    const dispatch = useDispatch()

    const logOutHandler = () => {
        const action = logOutAction()
        dispatch(action)
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center', alignItems: 'center'
        }}>
            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('AuthManagement') }}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Authorize management
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Order') }}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Order management
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('ChangePassword') }}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Change password
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', marginTop: 20, }}>
                <TouchableOpacity style={{ height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={() => { logOutHandler() }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, fontWeight: 'bold', color: colors.default }}>
                        Log Out
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default ProfileAdmin

const styles = StyleSheet.create({})
