import React, { useContext, useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'
import { registerAction } from '../../redux/action'


const Register = ({ navigation }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        confirm_password: '',
        name: 'MINH MAN'
    })

    const dispatch = useDispatch()
    const registerState = useSelector(state => state.register)

    const registerHandler = () => {

        if (data.username.length == 0 || data.password.length == 0 || data.confirm_password.length == 0) {
            Alert.alert('Wrong Input!', 'field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        if (data.password != data.confirm_password) {
            Alert.alert('Password does not match', 'Please try again', [{ text: 'Okay' }])
            return;
        }

        const action = registerAction(data.username, data.password, data.name)
        dispatch(action)
    }

    useEffect(() => {
        if (registerState.response === 'auth/email-already-in-use') {
            alert('Email exist! Please try again')
        }
        if (registerState.response === 'auth/invalid-email') {
            alert('Bad format. Please try again')
        }
        console.log('my register state', registerState)
    }, [registerState])


    return (
        // <SafeAreaView style={styles.container}>
        //     <Text>Register Pho My Food Member</Text>
        //     <TextInput
        //         style={styles.textInput}
        //         placeholder="Username"
        //         onChangeText={(val) => { setData({ ...data, username: val }) }}
        //     />

        //     <TextInput
        //         style={styles.textInput}
        //         placeholder="Password"
        //         onChangeText={(val) => { setData({ ...data, password: val }) }}
        //     />

        //     <TextInput
        //         style={styles.textInput}
        //         placeholder="Confirm password"
        //         onChangeText={(val) => { setData({ ...data, confirm_password: val }) }}
        //     />
        //     <View >
        //         <TouchableOpacity style={styles.btn} onPress={() => {
        //             registerHandler()
        //         }}>
        //             <Text>
        //                 Sign Up
        //             </Text>
        //         </TouchableOpacity>

        //     </View>
        //     <View>
        //         <TouchableOpacity onPress={() => { navigation.goBack() }}>
        //             <Text style={styles.textHref}>
        //                 Already have account? Login here
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
                marginVertical:20,
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                // backgroundColor:'red'
            }} 
            source={require('../../../assets/images/slide.png')}
            resizeMode="contain"
            >
                <Text>
                    Or
                </Text>
            </ImageBackground>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.navButtonText}>
                Already have account?{" "}
                </Text>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigation.goBack()
                    }}><Text style={{ ...styles.navButtonText, color: "#2e64e5" }} >Login here</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFF'
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginBottom:20
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
