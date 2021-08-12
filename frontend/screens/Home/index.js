import React, { useContext } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../../components/context'

const Home = ({ navigation }) => {
    const { signOut } = useContext(AuthContext)
    return (
        <SafeAreaView style={styles.container}>
            <Text>Day la trang Home</Text>
            <View>
                <TouchableOpacity onPress={() => { navigation.navigate('Food Detail') }}>
                    <Text>
                        Move to Detail
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => { signOut() }}>
                    <Text>
                        Log out
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
