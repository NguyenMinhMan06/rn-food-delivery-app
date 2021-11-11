import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../../../assets/style'
import auth from '@react-native-firebase/auth';
import { objectIsNull } from '../../../utils/function';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';


const InputPhone = ({ navigation }, props) => {
    const [phoneNumber, setPhoneNumber] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    const onChangPhone = (number) => {
        setPhoneNumber(number)
    }
    const onPressContinue = () => {
        if (phoneNumber) {
            setModalVisible(true)
            verifyPhoneNumber(`+84${phoneNumber}`)
        }
    }
    const verifyPhoneNumber = async (phoneNumber) => {
        try {
            const confirmation = await auth().verifyPhoneNumber(phoneNumber);
            console.log('confirm', confirmation)
            if (confirmation?.verificationId) {
                setModalVisible(false)
                navigation.replace('InputOTP', { verificationId: confirmation.verificationId })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={styles.textTitle}> Please input your mobile phone number to verify</Text>

                <View style={[styles.containerInput, { borderBottomColor: colors.grey }]}>
                    <View style={styles.openDialogView}>
                        <Text>{"+84 |"}</Text>
                    </View>

                    <TextInput
                        style={styles.phoneInputStyle}
                        placeholder="922 444 333"
                        keyboardType="numeric"
                        value={phoneNumber}
                        onChangeText={onChangPhone}
                        secureTextEntry={false}
                    />
                </View>
                <View style={styles.viewBottom}>
                    <TouchableOpacity onPress={onPressContinue}>
                        <View style={[styles.btnContinue, { backgroundColor: phoneNumber ? colors.default : 'gray' }]}
                        >
                            <Text style={styles.textContinue}>
                                Continue
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal
                    transparent={true}
                    visible={modalVisible}

                >
                    <View style={{ justifyContent: 'flex-end', height: windowHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: modalVisible ? 'rgba(0,0,0,0.5)' : '' }}>
                        <View style={{ height: windowHeight / 6, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', width: windowWidth / 3 }}>
                            <ActivityIndicator size="large" color="grey" />
                        </View>
                    </View>

                </Modal>
            </KeyboardAvoidingView>
        </View>
    )
}

export default InputPhone

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
        flexDirection: 'row', paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', borderBottomWidth: 1.5

    },
    openDialogView: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    phoneInputStyle: {
        marginLeft: 5, flex: 1, height: 50,
    },
    viewBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        alignItems: 'center'
    },
    btnContinue: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textContinue: {
        color: '#ffffff',
        alignItems: 'center'
    }
})
