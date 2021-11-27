import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
// import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

import { colors, fonts } from '../../../assets/style';


const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const reauthenticate = () => {
        const user = firebase.auth().currentUser
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        console.log(cred)
        return user.reauthenticateWithCredential(cred)
    }

    const onPressChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setMessage({ mess: 'Confirm password does not match', success: false })
            return
        }
        setIsLoading(true)

        reauthenticate().then(() => {
            const user = firebase.auth().currentUser
            user.updatePassword(newPassword).then(() => {
                setCurrentPassword('')
                setNewPassword('')
                setConfirmNewPassword('')

                setIsLoading(false)
                setMessage({ mess: 'Password changed successfully', success: true })
                // Alert.alert('Password changed')
            }).catch((e) => {
                console.log(e.message)

                setIsLoading(false)
                setMessage({ mess: 'Some thing wrong in the server please try again', success: false })
            })
        })
            .catch((e) => {
                setIsLoading(false)
                if (e.code == 'auth/wrong-password') {
                    setMessage({ mess: 'Current password does not match', success: false })
                }
            })
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ padding: '3%' }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#324b68'
                    }}>
                        Current password
                    </Text>
                </View>
                <View style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        secureTextEntry
                        placeholder="Current Password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        maxLength={100}
                    />
                </View>
            </View>

            <View style={{ padding: '3%' }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#324b68'
                    }}>
                        New password
                    </Text>
                </View>
                <View style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        secureTextEntry
                        placeholder="New password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        maxLength={100}
                    />
                </View>
            </View>

            <View style={{ padding: '3%' }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#324b68'
                    }}>
                        Confirm new password
                    </Text>
                </View>
                <View style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        secureTextEntry
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        maxLength={100}
                    />
                </View>
            </View>
            {isLoading ?
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
                : null
            }
            {message != '' ?
                <View style={{ paddingBottom: 6, padding: '3%' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: message.success ? 'green' : 'red'
                        }}
                    >
                        {message.mess}
                    </Text>
                </View> : null
            }


            <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', bottom: 10, width: '100%', padding: '2%' }}>
                <TouchableOpacity onPress={() => { onPressChangePassword() }} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                        Change password
                    </Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({})
