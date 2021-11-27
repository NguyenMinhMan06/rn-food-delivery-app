import React, { useState } from 'react'
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import { colors, fonts } from '../../../../assets/style'
import firestore from '@react-native-firebase/firestore';
import { getItemAction, getItemCatAction } from '../../../redux/action';
import { useDispatch } from 'react-redux';
import { windowHeight, windowWidth } from '../../../../utils/Dimentions';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { foodItem } from '../../../redux/middleware/Firestore';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';


const EditProduct = ({ navigation, route }) => {
    console.log(route.params)
    const [item, setItem] = useState(route.params.item)
    const [message, setMessage] = useState('')

    const [modalVisibleConfirmDelete, setModalVisibleConfirmDelete] = useState(false)
    const [modalVisibleCompleteDelete, setModalVisibleCompleteDelete] = useState(false)
    const [modalVisibleConfirmEdit, setModalVisibleConfirmEdit] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()

    const onPressConfirmEdit = async () => {
        const imageUrl = await uploadImage()
        const data = { ...item, image: imageUrl }
        console.log(data)
        try {
            await firestore().collection('foods')
                .doc('foodDetail')
                .collection('food')
                .doc(`${item.id}`)
                .update(data)
                .then(() => {
                    const action = getItemAction()
                    dispatch(action)
                    setMessage({ mess: 'Update successfully', success: true })
                    console.log('update success')
                    setModalVisibleConfirmEdit(!modalVisibleConfirmEdit)
                })
        } catch (error) {
            console.log(error)
            setMessage({ mess: 'Update failed please try again later!', success: false })
        }
    }


    const onPressConfirmDelete = async () => {
        try {
            await firestore().collection('foods')
                .doc('foodDetail')
                .collection('food')
                .doc(`${item.id}`)
                .delete()
                .then(() => {
                    foodItem.updateFoodCategoryCount(`${item.catId}`, true).then(() => {
                        const action = getItemAction()
                        const action1 = getItemCatAction()
                        dispatch(action)
                        dispatch(action1)
                    })
                    setModalVisibleConfirmDelete(!modalVisibleConfirmDelete)
                    setModalVisibleCompleteDelete(!modalVisibleCompleteDelete)

                    console.log('delete success')
                })
        } catch (error) {
            console.log(error)
        }
    }

    const onPressChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setItem({ ...item, image: image.path })
            setModalVisible(!modalVisible)
        })

    }

    const onPressTakePhoto = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setItem({ ...item, image: image.path })
            setModalVisible(!modalVisible)
        });
    }

    const deleteBeforeUpdateImage = (url) => {
        let imageRef = storage().refFromURL(url)
        imageRef.delete().then(() => {
            console.log("Deleted")
        }).catch(err => console.log(err))

    }
    console.log(item)

    const uploadImage = async () => {
        if (item.image == null) {
            alert('No image selected please try again')
            return
        }
        const currentImageUrl = route.params.item.image
        deleteBeforeUpdateImage(currentImageUrl)

        
        const uploadUri = item.image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        //add timestamp
        const extension = filename.split('.').pop()
        const name = filename.split('.').slice(0, -1).join('.');

        filename = name + Date.now() + '.' + extension

        try {
            const storageRef = storage().ref(`food/${filename}`)
            await storageRef.putFile(uploadUri)
            const url = await storageRef.getDownloadURL()
            return url
        } catch (error) {
            console.log(error)
            return null
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: '2%' }}>
                <View style={{ paddingBottom: 6 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}
                    >
                        Food Name
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
                        placeholder="Food Name"
                        value={item.foodName}
                        onChangeText={value => setItem({ ...item, foodName: value })}
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
                        Category
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
                        placeholder="Category"
                        value={item.catName}
                        editable={false}
                        selectTextOnFocus={false}
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
                        Rating
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
                        placeholder="Category"
                        value={`${item.rating}`}
                        editable={false}
                        selectTextOnFocus={false}
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
                        Description
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
                        placeholder="Description"
                        value={item.description}
                        onChangeText={value => setItem({ ...item, description: value })}
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
                        Price
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
                        placeholder="Description"
                        value={`${item.price}`}
                        onChangeText={value => setItem({ ...item, price: value })}
                    />
                </View>
            </View>

            <View style={{ padding: '2%' }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#324b68'
                    }}>
                        Select picture:
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity style={{
                        width: item.image != null ? '70%' : '100%',
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#dfdee4',
                        borderRadius: 6,
                        color: '#000',
                        fontSize: 14,
                        paddingLeft: 14,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => { setModalVisible(!modalVisible) }}>
                        <Text style={{ color: item.image ? 'green' : '#000' }}>
                            {item.image ? 'Selected' : 'Select Image'}
                        </Text>

                    </TouchableOpacity>
                    {
                        item.image != null ?
                            <View style={{ width: '30%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: item.image }} style={{ width: 70, height: 70, }} />
                            </View>
                            : null
                    }
                </View>

            </View>

            {/* MODAL IMAGE SELECTION */}
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ justifyContent: 'flex-end', height: windowHeight, backgroundColor: modalVisible ? 'rgba(0,0,0,0.5)' : '' }}>
                    <View style={{ height: windowHeight / 2.2, backgroundColor: '#fff', }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3' }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold', }}>
                                Select Image
                            </Text>

                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => { setModalVisible(!modalVisible) }}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', padding: '3%', }}>
                            <TouchableOpacity onPress={() => { onPressTakePhoto() }} style={{ justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 10, backgroundColor: colors.default }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                                    Take photo
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', padding: '3%', }}>
                            <TouchableOpacity onPress={() => { onPressChoosePhoto() }} style={{ justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 10, backgroundColor: colors.default }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                                    Choose form library
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', padding: '3%', }}>
                            <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} style={{ justifyContent: 'center', alignItems: 'center', padding: 14, borderRadius: 10, backgroundColor: colors.default }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>

            </Modal>

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
                    <TouchableOpacity onPress={() => { setModalVisibleConfirmEdit(!modalVisibleConfirmEdit) }}
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

            {/* Modal DELETE */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleConfirmDelete}
                onRequestClose={() => {
                    setModalVisibleConfirmDelete(!modalVisibleConfirmDelete);
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
                            <Text style={{ ...fonts.type1 }}>
                                You sure you want to delete this product?
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


            {/* Modal EDIT */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleConfirmEdit}
                onRequestClose={() => {
                    setModalVisibleConfirmEdit(!modalVisibleConfirmEdit);
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
                            justifyContent:
                                'center', alignItems:
                                'center', flexDirection: 'row',
                            padding: '3%',
                            borderBottomWidth: 1,
                            borderColor: '#adaba3'
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold' }}>
                                Confirm edit
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...fonts.type1 }}>
                                You sure you want to edit this product?
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
                                    onPress={() => {
                                        setModalVisibleConfirmEdit(!modalVisibleConfirmEdit);
                                    }}>
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
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: 'blue',
                                        width: '80%',
                                        borderRadius: 10,
                                        padding: 12,
                                    }}
                                    onPress={() => { onPressConfirmEdit() }} >
                                    <Text style={{ ...fonts.type1, color: '#fff', textAlign: 'center' }}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

            </Modal>

            {/* MODAL DELETE STATUS */}
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
        </SafeAreaView >
    )
}

export default EditProduct

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
