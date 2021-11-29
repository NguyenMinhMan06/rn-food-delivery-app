import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { objectIsNull } from '../../../utils/function'
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'
import { loginAction } from '../../redux/action'


const Login = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const loginState = useSelector(state => state.login)
    const [erroMessage, setErroMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    // console.log('state login here:           ', loginState.response)

    // console.log('login state', loginState)

    const dispatch = useDispatch()

    const loginHandler = (email, password) => {
        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        if (email.length == 0 || password.length == 0) {
            setErroMessage('Please input your email and password')
            return;
        }
        setModalVisible(true)
        if (loginState?.response === "auth/user-not-found" || loginState?.response === "auth/invalid-email" || loginState?.response === "auth/wrong-password") {
            setErroMessage('account/password not correct')
            setModalVisible(false)
        }
        const action = loginAction(email, password)
        dispatch(action)
    }

    useEffect(() => {
        if (loginState.response === "auth/user-not-found" || loginState.response === "auth/invalid-email" || loginState.response === "auth/wrong-password") {

            setErroMessage('account/password not correct')
            setModalVisible(false)
        }
        if (!objectIsNull(loginState.response)) {
            if (!objectIsNull(loginState.response.user)) {
                setModalVisible(false)
                setErroMessage('')
                // navigation.navigate("VerifyPhone")
            }
        }
    }, [loginState, loginState.response])

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../../../assets/images/ramen.png')}
                style={styles.logo}
            />
            <Text style={{ ...fonts.type1, fontStyle: 'italic', paddingBottom: 20, fontSize: 24, color: colors.default }}>
                Pho-My Food
            </Text>
            <View style={{ height: 20, justifyContent: 'center', alignItems: 'center' }}>
                {erroMessage != "" &&
                    <Text style={{ ...fonts.type1, color: 'red' }}>
                        {erroMessage}
                    </Text>
                }
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

            <FormInput
                labelValue={data.email}
                onChangeText={(val) => { setData({ ...data, email: val }) }}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />


            <FormInput
                labelValue={data.password}
                onChangeText={(val) => { setData({ ...data, password: val }) }}
                placeholderText="Password"
                iconType="lock"
                iconPassword={true}
            />

            <FormButton
                buttonTitle="Sign In"
                onPress={() => loginHandler(data.email, data.password)}
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

            <View style={{ flexDirection: 'row', }}>
                <Text style={fonts.type3}>
                    Don't have an acount?{" "}
                </Text>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigation.navigate('SignUpScreen')
                        setData({ email: '', password: '' })
                    }}><Text style={{ ...fonts.type3, color: "#2e64e5" }} >Create here</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 60 }}>
                
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigation.navigate('ForgotScreen')
                        setData({ email: '', password: '' })
                    }}><Text style={{ ...fonts.type3, color: "#2e64e5" }} >Forgot your password?</Text>
                </TouchableOpacity>
            </View>


        </ScrollView >
    )
}

export default Login

const styles = StyleSheet.create({

    container: {
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF',
    },
    logo: {
        height: windowHeight / 4.5,
        width: windowWidth / 2,
        resizeMode: 'cover',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
    },

})
