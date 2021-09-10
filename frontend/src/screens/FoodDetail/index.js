import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FoodDetail = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Pho My Food</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                    <Text>
                        Move to home
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default FoodDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
