import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const SearchTab = () => {
    return (
        <View>
            <TextInput placeholder={'Food, cake, desert'} />
        </View>
    )
}

export default SearchTab

const styles = StyleSheet.create({})
