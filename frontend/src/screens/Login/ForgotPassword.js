import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import FormButton from '../../components/FormButton'
import FormInput from '../../components/FormInput'



const ForgotPassword = ({ navigation }) => {
    const [data, setData] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const onPressForgotPassword = async () => {
        if (data == '') {
            Alert.alert('Wrong input', 'Field can not be empty.')
            return
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(data) === false) {
            Alert.alert("Wrong format", "Please input the right format.");
            return
        }
        setModalVisible(!modalVisible)

        try {
            await auth().sendPasswordResetEmail(data).then(() => {
                Alert.alert('Send email successfully', 'Check your email for starting reset your password.')
                setModalVisible(false)
            })
        } catch (error) {
            console.log(error)
            Alert.alert('Send email failed', 'Your account not exist.')
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source={require('../../../assets/images/ramen.png')}
                style={styles.logo}
            />
            <Text style={{ ...fonts.type1, paddingBottom: 20, fontSize: 24, color: colors.default }}>
                Forgot password
            </Text>
            <FormInput
                labelValue={data.username}
                onChangeText={(val) => { setData(val) }}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={false}
            />


            <FormButton
                buttonTitle="Reset password"
                onPress={() => onPressForgotPassword()}
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

                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => {
                        navigation.goBack()
                    }}><Text style={{ ...fonts.type3, color: "#2e64e5" }} >Back to login</Text>
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

export default ForgotPassword

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
