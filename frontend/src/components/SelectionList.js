import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { fonts } from '../../assets/style'

const SelectionList = (props) => {
    const [isSelected, setIsSelected] = useState(false)
    return props.data.require.map((item) => {
        return (
            <View style={{ padding: '3%' }}>
                <TouchableOpacity onPress={() => setIsSelected(!isSelected)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.data.require.status ? <MaterialIcons name={'radio-button-off'} size={20} /> : <MaterialIcons name={'radio-button-on'} size={20} />}
                    <Text style={{ paddingLeft: 10, ...fonts.type1, fontSize: 16, }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    })

}

export default SelectionList

const styles = StyleSheet.create({})
