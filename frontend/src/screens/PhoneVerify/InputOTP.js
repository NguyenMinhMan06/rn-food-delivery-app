import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { addUserPhoneAction, getUserAction } from '../../redux/action';


const InputOTP = ({ navigation, route }) => {
    let textInput = useRef(null)
    let clockCall = null
    const defaultCd = 30
    const lengthInput = 6
    const [internalVal, setInternalVal] = useState("")
    const [countdown, setCountdown] = useState(defaultCd)
    const [enableResend, setEnableResend] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        textInput.focus()
    }, [])

    const confirmCode = async () => {
        const verificationId = route.params.verificationId
        try {
            const credential = auth.PhoneAuthProvider.credential(verificationId, internalVal);
            let userData = await auth().currentUser.linkWithCredential(credential);

            if (userData) {
                console.log('action commin')
                const data = { userId: userData.user.uid, phoneNumber: userData.user.phoneNumber }
                const action = addUserPhoneAction(data)
                dispatch(action)
                // const action2 = getUserAction(userData.user.uid)
                // dispatch(action2)
            }
            console.log(userData.user)
        } catch (error) {
            if (error.code == 'auth/invalid-verification-code') {
                console.log('Invalid code.');
            } else {
                console.log('Account linking error');
            }
        }
    }
    useEffect(() => {
        if (auth().currentUser?.phoneNumber != null) {
            alert('Add phone number successfully')
            navigation.replace('Main')
        }
    }, [auth().currentUser?.phoneNumber])


    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock()
        }, 1000)
        return () => {
            clearInterval(clockCall)
        }
    })

    const decrementClock = () => {
        if (countdown === 0) {
            setEnableResend(true)
            setCountdown(0)
            clearInterval(clockCall)
        }
        else {
            setCountdown(countdown - 1)
        }
    }



    const onChangeNumber = () => {
        confirmCode()
    }
    const onResendOTP = () => {
        if (enableResend) {
            setCountdown(defaultCd)
            setEnableResend(false)
            clearInterval(clockCall)
            clockCall = setInterval(() => {
                decrementClock(0)
            }, 1000)
        }
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={styles.textTitle}> Input your OTP code sent via SMS</Text>
                <TextInput
                    ref={(input) => textInput = input}
                    style={{ width: 0, height: 0, }}
                    maxLength={lengthInput}
                    keyboardType="numeric"
                    value={internalVal}
                    returnKeyType='done'
                    onChangeText={(val) => {
                        setInternalVal(val)
                    }}
                />
                <View style={styles.containerInput}>
                    {Array(lengthInput).fill().map((data, index) => (
                        <TouchableOpacity style={styles.cellView}
                            key={index}
                            onPress={() => textInput.focus()}
                        >
                            <Text style={styles.cellText}>
                                {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                            </Text>
                        </TouchableOpacity>
                    ))}

                </View>

                <View style={styles.viewBottom}>
                    <TouchableOpacity onPress={onResendOTP}>
                        <View style={styles.btnResend}>
                            <Text style={[styles.textResend, { color: enableResend ? '#000' : 'gray' }]}>
                                Resend OTP({countdown})
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onChangeNumber}>
                        <View style={styles.btnChangeNumber}>
                            <Text style={styles.textChange}>
                                Done
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default InputOTP

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidingView: {
        flex: 1, alignItems: 'center', padding: 10,
    },
    textTitle: {
        marginBottom: 50,
        marginTop: 50,
        fontSize: 16,
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
    },
    viewBottom: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 50,
        alignItems: 'flex-end'
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textChange: {
        alignItems: 'center',
        fontSize: 16,
    }, btnResend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textResend: {
        alignItems: 'center',
        fontSize: 16,
    }

})
