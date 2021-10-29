import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../assets/style'

const TopTab = (props) => {
    const [flag, setFlag] = useState(props.isSelected ? props.isSelected : 0)

    const onPressHandler = (name, num) => {
        props.navigation.navigate(name)
        setFlag(num)
    }
    return (
        <View style={{ width: '50%', height: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}>
            <TouchableOpacity style={{ backgroundColor: flag === 0 ? colors.default : null, width: '48%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}
                onPress={() => onPressHandler('Delivery', 0)}
            >
                <Text style={{ ...fonts.type1, color: flag === 0 ? '#fff' : colors.black, fontSize: 16 }}>Delivery</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: flag === 1 ? colors.default : null, width: '48%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}
                onPress={() => onPressHandler('Pick-up', 1)}
            >
                <Text style={{ ...fonts.type1, color: flag === 1 ? '#fff' : colors.black, fontSize: 16 }}>Pick-up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TopTab

const styles = StyleSheet.create({})
