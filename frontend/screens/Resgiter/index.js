import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Register = ({ navigation }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
        confirm_password: '',
    })


    return (
        <SafeAreaView style={styles.container}>
            <Text>Register Pho My Food Member</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Username"
                onChangeText={(val) => { setData({ ...data, username: val }) }}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Password"
                onChangeText={(val) => { setData({ ...data, password: val }) }}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Confirm password"
                onChangeText={(val) => { setData({ ...data, confirm_password: val }) }}
            />
            <View >
                <TouchableOpacity style={styles.btn} onPress={() => {
                    alert('still develop')
                }}>
                    <Text>
                        Sign In
                    </Text>
                </TouchableOpacity>

            </View>
            <View>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Text>
                        Move to login
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
