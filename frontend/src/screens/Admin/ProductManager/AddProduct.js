import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const AddProduct = () => {
    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: '3%', backgroundColor: '#fff' }}>
            <View style={{}}>
                <View style={{ paddingVertical: 10, }}>
                    <Text>
                        Product name:
                    </Text>
                </View>
                <View style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        placeholder="Input product name"
                        onChangeText={() => { }}
                    />

                </View>
            </View>

        </SafeAreaView >
    )
}

export default AddProduct

const styles = StyleSheet.create({})
