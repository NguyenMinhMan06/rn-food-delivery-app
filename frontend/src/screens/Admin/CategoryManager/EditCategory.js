import React, { useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { colors, fonts } from '../../../../assets/style'
import { windowHeight, windowWidth } from '../../../../utils/Dimentions'
import { getItemCatAction } from '../../../redux/action'
import firestore from '@react-native-firebase/firestore';

const EditCategory = ({ navigation, route }) => {

    const [item, setItem] = useState(route.params.item)

    const [modalVisibleConfirmDelete, setModalVisibleConfirmDelete] = useState(false)
    const [modalVisibleCompleteDelete, setModalVisibleCompleteDelete] = useState(false)

    const dispatch = useDispatch()

    console.log(item)

    const onPressConfirmDelete = async () => {
        if (item.count != 0) {
            alert('You can not delete this category. There still have item in this category')
            return
        }
        try {
            await firestore().collection('foods')
                .doc('foodCat')
                .collection('category')
                .doc(`${item.id}`)
                .delete()
                .then(() => {
                    const action = getItemCatAction()
                    dispatch(action)
                    setModalVisibleConfirmDelete(!modalVisibleConfirmDelete)
                    setModalVisibleCompleteDelete(!modalVisibleCompleteDelete)
                    console.log('delete success')
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ padding: '2%' }}>
                <View style={{ paddingBottom: 6 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}
                    >
                        Category Name
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
                        value={item.name}
                        editable={false}
                        selectTextOnFocus={false}
                        style={{ color: '#000' }}
                    />
                </View>
            </View>

            <View style={{ padding: '2%' }}>
                <View style={{ paddingBottom: 6 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}
                    >
                        Quantity currently available
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
                        value={`${item.count}`}
                        editable={false}
                        selectTextOnFocus={false}
                        style={{ color: '#000' }}
                    />
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', bottom: 20, width: '100%', paddingHorizontal: '2%' }}>
                <TouchableOpacity
                    onPress={() => { setModalVisibleConfirmDelete(!modalVisibleConfirmDelete) }}
                    style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.default }}>
                    <Text
                        style={{
                            backgroundColor: 'red',
                            borderRadius: 10,
                            padding: 12,
                        }}
                        style={{ ...fonts.type1, color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal delete */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleConfirmDelete}
                onRequestClose={() => {
                    setModalVisibleConfirmDelete(!modalVisibleConfirmDelete)
                }}
            >
                <View style={{
                    justifyContent: 'flex-end',
                    height: windowHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        height: windowHeight / 5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: windowWidth / 1.3
                    }}>
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            padding: '3%',
                            borderBottomWidth: 1,
                            borderColor: '#adaba3'
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold' }}>
                                Confirm delete
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...fonts.type1, textAlign: 'center' }}>
                                You sure you want to delete this category?
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', padding: 6, justifyContent: 'space-evenly' }}>
                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{
                                        width: '80%',
                                        borderRadius: 10,
                                        padding: 12,
                                    }}
                                    onPress={() => { setModalVisibleConfirmDelete(!modalVisibleConfirmDelete) }}>
                                    <Text style={{ ...fonts.type1, color: colors.grey, textAlign: 'center' }}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: 'red',
                                    width: '80%',
                                    borderRadius: 10,
                                    padding: 12,
                                }} onPress={() => { onPressConfirmDelete() }} >
                                    <Text style={{ ...fonts.type1, color: '#fff', textAlign: 'center' }}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

            </Modal>

            {/* Modal status delete */}
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisibleCompleteDelete}
                onRequestClose={() => {
                    setModalVisibleCompleteDelete(!modalVisibleCompleteDelete);
                }}
            >
                <View style={{
                    justifyContent: 'flex-end',
                    height: windowHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        height: windowHeight / 5,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: windowWidth / 1.3
                    }}>
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            padding: '3%',
                            borderBottomWidth: 1,
                            borderColor: '#adaba3'
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold' }}>
                                Delete status
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...fonts.type1 }}>
                                Delete successfully go back to home page
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', padding: 6, justifyContent: 'space-evenly' }}>
                            <View style={{
                                width: '40%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor: 'green',
                                    width: '80%',
                                    borderRadius: 10,
                                    padding: 12,
                                }} onPress={() => { navigation.popToTop() }} >
                                    <Text style={{ ...fonts.type1, color: '#fff', textAlign: 'center' }}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

            </Modal>

        </SafeAreaView>
    )
}

export default EditCategory

const styles = StyleSheet.create({})
