import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, fonts } from '../../assets/style'
import { windowWidth } from '../../utils/Dimentions'

const ListTabSelection = (props) => {
    const [isSelected, setIsSelected] = useState(1)
    const [listTab, setListTab] = useState([])

    const onPressTab = (id) => {
        props.onPressTab && props.onPressTab(id)
    }
    return (
        <View style={{
            backgroundColor: '#F5F5F5',
            marginHorizontal: 14,
            padding: 10,
            borderRadius: 20,
            width: windowWidth - 14 * 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            {
                props.listTab.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={{
                                // backgroundColor: item.isSelected ? colors.default : "#F5F5F5",
                                // borderRadius: 20,
                                width: (windowWidth - 14 * 2) / props.listTab.length - (10 * 2),
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 4,
                                borderBottomColor: item.isSelected ? colors.default : "#F5F5F5",
                                borderBottomWidth: 1,
                            }}
                            onPress={() => {
                                onPressTab(item.id)
                            }}
                        >
                            <Text style={{ ...fonts.type1, fontSize: 20, color: item.isSelected ? colors.default : "#BFBFBF" }}>
                                {item.title}
                            </Text>

                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default ListTabSelection

const styles = StyleSheet.create({})
