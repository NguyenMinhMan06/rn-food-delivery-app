import React, { useContext, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'
import { loginAction } from '../../redux/action'


const Login = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const loginState = useSelector(state => state.login.response)

    const dispatch = useDispatch()

    const loginHandler = (email, password) => {
        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        if (email.length == 0 || password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        const action = loginAction(email, password)
        dispatch(action)

    }

    useEffect(() => {
        if (loginState === "auth/user-not-found") {
            alert('Email dont exist')
        }
        if (loginState === "auth/invalid-email") {
            alert('Wrong format')
        }
        if (loginState === "auth/wrong-password") {
            alert('wrong pass')
        }
        console.log('my state login', loginState)
    }, [loginState])

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../../../assets/images/ramen.png')}
                style={styles.logo}
            />
            <Text style={{ ...fonts.type1, fontStyle: 'italic', paddingBottom: 20, fontSize: 24, color: colors.default }}>
                Pho-My Food
            </Text>
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

            <View style={{ flexDirection: 'row', marginBottom: 60 }}>
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
