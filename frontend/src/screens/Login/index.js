import React, { useContext, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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
        // <SafeAreaView style={styles.container}>
        //     <View>
        //         <Text style={styles.textLogo}>Pho My Food</Text>
        //     </View>
        //     <TextInput
        //         style={styles.textInput}
        //         placeholder="Username"
        //         onChangeText={(val) => { setData({ ...data, username: val }) }}
        //         value={data.username}
        //     />

        //     <TextInput
        //         style={styles.textInput}
        //         placeholder="Password"
        //         onChangeText={(val) => { setData({ ...data, password: val }) }}
        //         value={data.password}
        //     />
        //     <View >
        //         <TouchableOpacity style={styles.btn} onPress={() => {
        //             loginHandler(data.username, data.password)
        //         }}>
        //             <Text>
        //                 Sign In
        //             </Text>
        //         </TouchableOpacity>

        //     </View>
        //     <View>
        //         <TouchableOpacity onPress={() => {
        //             setData({ username: '', password: '' })
        //             navigation.navigate('SignUpScreen')

        //         }}>
        //             <Text style={styles.textHref}>
        //                 Does not have account? Sign up now
        //             </Text>
        //         </TouchableOpacity>
        //     </View>
        // </SafeAreaView>

        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
            />
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
                <Text>
                    Or
                </Text>
            </ImageBackground>

            <View style={{flexDirection:'row',marginBottom:60}}>
                <Text style={styles.navButtonText}>
                    Don't have an acount?{" "}
                </Text>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigation.navigate('SignUpScreen')
                        setData({ email: '', password: '' })
                    }}><Text style={{ ...styles.navButtonText, color: "#2e64e5" }} >Create here</Text>
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
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginBottom: 20,
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
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#666',
        fontFamily: 'Lato-Regular',
    },

})
