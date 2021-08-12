import React, { useContext, useState } from 'react'
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../components/context';

const Login = ({ navigation }) => {
    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const { signIn } = useContext(AuthContext);


    const loginHandler = (username, password) => {
        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }

        signIn(username, password);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textLogo}>Pho My Food</Text>
            </View>
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
            <View >
                <TouchableOpacity style={styles.btn} onPress={() => {
                    loginHandler(data.username, data.password)
                }}>
                    <Text>
                        Sign In
                    </Text>
                </TouchableOpacity>

            </View>
            <View>
                <TouchableOpacity style={styles.textHref} onPress={() => { navigation.navigate('SignUpScreen') }}>
                    <Text>
                        Create account
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLogo: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 2,
        borderRadius: 4,
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
        margin: '2%',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 4,
        width: 80,
        height: 40,
    },
    textHref: {

    }

})
