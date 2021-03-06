import { useIsFocused } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { fonts } from '../../../../assets/style'
import { windowHeight, windowWidth } from '../../../../utils/Dimentions'

const Product = ({ navigation }) => {
    const catState = useSelector(state => state.itemCat)
    const itemState = useSelector(state => state.item)

    console.log(catState)
    const [itemFood, setItemFood] = useState(itemState.response)
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     setItemFood(itemState.response)
    // })
    const isFocused = useIsFocused();

    useEffect(() => {
        setItemFood(itemState.response)
        setDataFiltered(itemState.response)
    }, [isFocused]);



    const [search, setSearch] = useState('')

    const [dataFiltered, setDataFiltered] = useState(itemFood)

    const searchItemFood = (value) => {
        setSearch(value)
        if (value == '') {
            setDataFiltered(itemFood)
            return
        }
        const newData = itemFood.filter(i => {
            return i.foodName.toLowerCase().includes(value.toLowerCase())
        })
        setDataFiltered(newData)
    }

    const renderProduct = (navigation) => {
        const renderList = []
        dataFiltered.map((item, index) => {
            return renderList.push(
                <View key={index} style={{ paddingVertical: 10, }} >
                    <TouchableOpacity onPress={() => { navigation.navigate('EditProduct', { item }) }}>
                        <Text style={{ ...fonts.type1 }}>
                            Name: <Text style={{ ...fonts.type1, fontWeight: 'bold' }}>{item.foodName}</Text>
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ ...fonts.type1 }}>
                                Category: {item.catName}
                            </Text>
                            <Text style={{ ...fonts.type1 }}>
                                Price: {item.price}
                            </Text>

                        </View>
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <ScrollView style={{ paddingHorizontal: 20, }}>
                {renderList}
            </ScrollView>
        )
    }


    if (itemState.isLoading || catState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Modal
                    transparent={true}
                    visible={true}
                >
                    <View style={{
                        justifyContent: 'flex-end',
                        height: windowHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}>
                        <View style={{
                            height: windowHeight / 6,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            width: windowWidth / 1.5
                        }}>
                            <View style={{
                                width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3'
                            }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold' }}>
                                    Getting data please wait...
                                </Text>
                            </View>
                            <View style={{ padding: 20 }}>
                                <ActivityIndicator size="large" color="grey" />

                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 60, padding: 10, }}>
                <View style={{

                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        placeholder="Search name..."
                        value={search}
                        onChangeText={(value) => { searchItemFood(value) }}
                    />
                </View>
            </View>

            {renderProduct(navigation)}
        </SafeAreaView>
    )
}

export default Product

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
