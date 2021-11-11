import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { objectIsNull } from '../../../utils/function'
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'
import { registerAction } from '../../redux/action'


const Register = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        name: 'Man'
    })
    const [modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const dispatch = useDispatch()
    const registerState = useSelector(state => state.register)


    const registerHandler = () => {

        if (data.email.length == 0 || data.password.length == 0 || data.confirm_password.length == 0) {
            setErrorMessage('field cannot be empty');
            return;
        }
        if (data.password != data.confirm_password) {
            setErrorMessage('Password does not match')
            return;
        }

        if (registerState?.response) {
            setModalVisible(false)
        }
        else {
            setModalVisible(true)
        }
        const action = registerAction(data.email, data.password, data.name)
        dispatch(action)
    }

    useEffect(() => {
        if (registerState?.response) {
            setModalVisible(false)
        }
        if (registerState?.response === 'auth/email-already-in-use') {
            setErrorMessage('Email exist! Please try again')
        }
        if (registerState?.response === 'auth/invalid-email') {
            setErrorMessage('Email Wrong format. Please try again')
        }
        if (registerState?.response?.user) {
            setErrorMessage('')
        }
    }, [registerState, registerState.response, modalVisible])


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../../../assets/images/ramen.png')}
                style={styles.logo}
            />
            <Text style={{ ...fonts.type1, paddingBottom: 20, fontSize: 24, color: colors.default }}>
                Register account
            </Text>
            <View style={{ height: 20, justifyContent: 'center', alignItems: 'center' }}>
                {errorMessage != "" &&
                    <Text style={{ ...fonts.type1, color: 'red' }}>
                        {errorMessage}
                    </Text>
                }
            </View>
            <FormInput
                labelValue={data.username}
                onChangeText={(val) => { setData({ ...data, email: val }) }}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
            />
            <FormInput
                labelValue={data.name}
                onChangeText={(val) => { setData({ ...data, name: val }) }}
                placeholderText="Full Name"
                iconType="user"
                autoCapitalize="words"
                autoCorrect={false}
                secureTextEntry={false}
            />


            <FormInput
                labelValue={data.password}
                onChangeText={(val) => { setData({ ...data, password: val }) }}
                placeholderText="Password"
                iconType="lock"
                iconPassword={true}
            />
            <FormInput
                labelValue={data.confirm_password}
                onChangeText={(val) => { setData({ ...data, confirm_password: val }) }}
                placeholderText="Confirm password"
                iconType="lock"
                passCheck={data.password}
            />

            <FormButton
                buttonTitle="Sign In"
                onPress={() => registerHandler()}
            />

            <ImageBackground
                style={{
                    marginVertical: 20,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor:'red'
                }}
                source={require('../../../assets/images/slide.png')}
                resizeMode="contain"
            >
                <Text style={fonts.type1}>
                    Or
                </Text>
            </ImageBackground>
            <View style={{ flexDirection: 'row' }}>
                <Text style={fonts.type3}>
                    Already have account?{" "}
                </Text>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigation.goBack()
                    }}><Text style={{ ...fonts.type3, color: "#2e64e5" }} >Login here</Text>
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

        </ScrollView>

    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF'
    },
    logo: {
        height: windowHeight / 4.5,
        width: windowWidth / 2,
        resizeMode: 'cover',
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        // marginVertical: 20,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#666',
        fontFamily: 'Lato-Regular',
    },

})
