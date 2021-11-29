import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors, fonts } from '../../../../assets/style';
import { windowHeight, windowWidth } from '../../../../utils/Dimentions';
import { getLocationListAction } from '../../../redux/action';

const EditBranch = ({ navigation, route }) => {

    const [branch, setBranch] = useState(route.params.item)
    const [name, setName] = useState(route.params.item.name)
    const [message, setMessage] = useState('')

    const [modalVisibleConfirmDelete, setModalVisibleConfirmDelete] = useState(false)
    const [modalVisibleCompleteDelete, setModalVisibleCompleteDelete] = useState(false)
    // console.log(route.params.item)

    const dispatch = useDispatch()
    const onPressEditBranch = async () => {
        if (name == '') {
            Alert.alert('Input Empty', 'Please fill your input before edit')
            return
        }
        try {
            await firestore().collection('branch')
                .doc(branch.id)
                .update({
                    name: name
                })
                .then(() => {
                    const action = getLocationListAction()
                    dispatch(action)
                    setMessage({ mess: "Update successfully", success: true })
                })
        } catch (error) {
            console.log(error)
            setMessage({ mess: "Update failed. Please try again later", success: false })

        }
    }

    const onPressConfirmDelete = async () => {

        try {
            await firestore().collection('branch')
                .doc(branch.id)
                .delete()
                .then(() => {
                    const action = getLocationListAction()
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
            <View style={{ paddingHorizontal: '3%', }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                        Branch name:
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
                        placeholder="Branch name"
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                </View>
            </View>

            <View style={{ paddingHorizontal: '3%', }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                        Address:
                    </Text>
                </View>
                <View style={{

                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        placeholder="Address"
                        value={branch.address}
                        editable={false}
                        multiline={true}
                        numberOfLines={3}
                        selectTextOnFocus={false}
                    />
                </View>
            </View>

            <View style={{ paddingHorizontal: '3%', }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                        Latitude:
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
                        placeholder="Latitude"
                        value={`${branch.coords.latitude}`}
                        editable={false}
                        selectTextOnFocus={false}
                    />
                </View>
            </View>

            <View style={{ paddingHorizontal: '3%', }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                        Latitude:
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
                        placeholder="Longitude"
                        value={`${branch.coords.longitude}`}
                        editable={false}
                        selectTextOnFocus={false}
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', bottom: 20, width: '100%', paddingHorizontal: '2%' }}>
                <View style={{ width: '46%' }}>
                    <TouchableOpacity onPress={() => { onPressEditBranch() }}
                        style={{ justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.default }}>
                        <Text style={{ ...fonts.type1, color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '46%' }}>
                    <TouchableOpacity onPress={() => { setModalVisibleConfirmDelete(!modalVisibleConfirmDelete) }}
                        style={{ justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: colors.default }}>
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
            </View>

            {/* Modal confirm delete */}
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
                                You sure you want to delete this branch?
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

export default EditBranch

const styles = StyleSheet.create({})
