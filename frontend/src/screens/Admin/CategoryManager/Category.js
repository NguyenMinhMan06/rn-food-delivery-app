import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fonts } from '../../../../assets/style'
import { getItemCatAction } from '../../../redux/action'

const Category = ({ navigation }) => {

    const catState = useSelector(state => state.itemCat)
    const itemState = useSelector(state => state.item)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     const action = getItemCatAction()
    //     dispatch(action)
    // }, [])

    console.log(catState)

    const [search, setSearch] = useState('')
    const [categoryItem, setCategoryItem] = useState(catState.response)
    const [dataFiltered, setDataFiltered] = useState(categoryItem)

    const searchCategory = (value) => {
        setSearch(value)
        if (value == '') {
            setDataFiltered(categoryItem)
            return
        }
        const newData = categoryItem.filter(i => {
            return i.name.toLowerCase().includes(value.toLowerCase())
        })
        setDataFiltered(newData)
    }

    const renderProduct = (navigation) => {
        const renderList = []
        dataFiltered.map((item, index) => {
            return renderList.push(
                <View key={index} style={{ paddingVertical: 10, }} >
                    <TouchableOpacity onPress={() => { navigation.navigate('EditCategory', { item }) }}>
                        <Text style={{ ...fonts.type1 }}>
                            Name: <Text style={{ ...fonts.type1, fontWeight: 'bold' }}>{item.name}</Text>
                        </Text>
                        <Text style={{ ...fonts.type1 }}>
                            Product: {item.count}
                        </Text>
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
        <View>
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
                        onChangeText={(value) => { searchCategory(value) }}
                    />
                </View>
            </View>
            {renderProduct(navigation)}
        </View>
    )
}

export default Category

const styles = StyleSheet.create({})
