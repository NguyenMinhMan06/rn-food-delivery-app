import React, { useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../../assets/style'
import firestore from '@react-native-firebase/firestore';
import { getItemCatAction } from '../../../redux/action';

const AddCategory = () => {

    const catState = useSelector(state => state.itemCat)
    const itemState = useSelector(state => state.item)

    // console.log(itemState)
    // console.log(catState)
    const dispatch = useDispatch()

    const [productName, setProductName] = useState('')
    const [message, setMessage] = useState('')

    const onPressAddProduct = async () => {
        if (productName == '') {
            alert('Please input field')
            return
        }
        const found = catState.response.filter(item => item.name.toLowerCase() == productName.toLowerCase()).length
        console.log(found)

        if (found > 0) {
            setMessage({ mess: 'Category already exist', success: false })
            return
        }

        try {
            await firestore().collection('foods').doc('foodCat').collection('category')
                .add({
                    catName: productName,
                    productCount: 0
                }).then(() => {
                    const action = getItemCatAction()
                    dispatch(action)
                    setMessage({ mess: 'Add successfully', success: true })
                })
        } catch (error) {
            console.log(error)
            setMessage({ mess: 'Something error please try again later', success: false })
        }

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ paddingHorizontal: '3%', }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                        Category name:
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
                        placeholder="Category Name"
                        value={productName}
                        onChangeText={setProductName}
                    />
                </View>
            </View>

            {message != '' ?
                <View style={{ paddingBottom: 6, padding: '2%' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: message.success ? 'green' : 'red'
                        }}
                    >
                        {message.mess}
                    </Text>
                </View> : null
            }

            <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', bottom: 10, width: '100%', }}>
                <TouchableOpacity onPress={() => { onPressAddProduct() }} style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                        Add Category
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default AddCategory

const styles = StyleSheet.create({})
