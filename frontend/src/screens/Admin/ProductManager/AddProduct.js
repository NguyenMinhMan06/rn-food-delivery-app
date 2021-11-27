import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, ActivityIndicator, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../../assets/style'
import { arrayIsEmpty } from '../../../../utils/function'
import { addItemAction, getItemCatAction } from '../../../redux/action'
import ImagePicker from 'react-native-image-crop-picker';
import { windowHeight, windowWidth } from '../../../../utils/Dimentions'
import AntDesign from 'react-native-vector-icons/AntDesign'
import storage from '@react-native-firebase/storage';


const AddProduct = () => {

    const catState = useSelector(state => state.itemCat)
    const itemState = useSelector(state => state.item)

    // console.log(itemState)
    // console.log(catState)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);

    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [categorySelect, setCategorySelect] = useState(null)
    const [price, setPrice] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const setItem = () => {
        if (!arrayIsEmpty(catState.response)) {
            const listItem = []
            catState.response.map(item => {
                listItem.push({ label: item.name, value: item.id })
            })
            console.log(listItem)
            setItems(listItem)
        }
    }

    useEffect(() => {
        setItem()
    }, [])

    // const addProductFireStore = async (catid, catname, foodname, des, price) => {
    //     try {
    //         await firestore().collection('foods').doc('foodDetail').collection('food').add({
    //             catId: catid,
    //             catName: catname,
    //             description: des,
    //             foodName: foodname,
    //             price: price,
    //             rating: 0
    //         }).then((doc) => console.log(doc.id))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    const onPressAddProduct = async () => {
        if (productName == '' || description == '' || categorySelect == '' || price == '' || image == null) {
            alert('Please input field')
            return
        }
        setIsLoading(true)
        const imageUrl = await uploadImage()
        const catName = catState.response.find(item => {
            return item.id == categorySelect
        })

        console.log(`desciprtion: ${description}, product:${productName}, category:${categorySelect}, catName:${catName.name}`)
        const data = {
            catId: categorySelect,
            catName: catName.name,
            description: description,
            foodName: productName,
            price: price,
            image: imageUrl
        }
        const action = addItemAction(data)
        dispatch(action)
        setShowMessage(true)
    }

    useEffect(() => {
        const action = getItemCatAction()
        dispatch(action)
        if (itemState.error == null) {
            setMessage({ mess: 'Add successfully', success: true })
        }
        else {
            setMessage({ mess: 'Something wrong with server please try again later', success: false })
        }
    }, [itemState.response])

    // console.log(catState)

    const [image, setImage] = useState(null)

    const onPressChoosePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path)
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
            setImage(image.path)
            setModalVisible(!modalVisible)
        });
    }

    const [isLoading, setIsLoading] = useState(false)

    const uploadImage = async () => {
        if (image == null) {
            alert('No image selected please try again')
            return
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        //add timestamp
        const extension = filename.split('.').pop()
        const name = filename.split('.').slice(0, -1).join('.');

        filename = name + Date.now() + '.' + extension

        try {
            const storageRef = storage().ref(`food/${filename}`)
            await storageRef.putFile(uploadUri).then(() => {
                // alert('ADD SUCCESSFULLY')
                setIsLoading(false)
            })
            const url = await storageRef.getDownloadURL()
            return url
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            return null
        }
    }


    if (catState.isLoading || isLoading) {
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
                                    Loading data please wait...
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
                <View style={{}}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            Product name:
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
                            placeholder="Product Name"
                            value={productName}
                            onChangeText={setProductName}
                        />
                    </View>
                </View>

                <View style={{}}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            Description(100):
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
                            value={description}
                            onChangeText={setDescription}
                            maxLength={100}
                        />
                    </View>
                </View>

                <View style={{}}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            Price:
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
                            placeholder="Price"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                <View style={{}}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            Category
                        </Text>
                    </View>

                    <DropDownPicker
                        placeholder="Select category"
                        open={open}
                        value={categorySelect}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategorySelect}
                        setItems={setItems}
                        textStyle={{
                            fontSize: 14,
                        }}
                        style={{
                            borderWidth: 1,
                            borderColor: '#dfdee4',
                            borderRadius: 6,
                            height: 40,
                            paddingLeft: 14,
                        }}
                        dropDownContainerStyle={{
                            borderWidth: 1,
                            borderColor: '#dfdee4',
                            borderRadius: 6,
                            paddingLeft: 14,

                        }}
                        zIndex={1000}
                    />
                </View>
                <View style={{}}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#324b68'
                        }}>
                            Select picture:
                        </Text>
                    </View>
                    <TouchableOpacity style={{
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
                        <Text style={{ color: image ? 'green' : '#000' }}>
                            {image ? 'Selected' : 'Select Image'}
                        </Text>

                    </TouchableOpacity>
                    {
                        image != null ?
                            <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: image }} style={{ width: 70, height: 70, }} />
                            </View>
                            : null
                    }
                </View>
            </View>

            {message != '' && showMessage ?
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


            <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', bottom: 10, width: '100%', }}>
                <TouchableOpacity onPress={() => { onPressAddProduct() }} style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                        Add Product
                    </Text>
                </TouchableOpacity>

            </View>


        </SafeAreaView >
    )
}

export default AddProduct

const styles = StyleSheet.create({})
