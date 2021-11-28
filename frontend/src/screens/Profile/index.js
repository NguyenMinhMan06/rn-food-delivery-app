import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { getUserAction, logOutAction } from '../../redux/action'
import auth from '@react-native-firebase/auth';
import { colors, fonts } from '../../../assets/style'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import Geocoder from 'react-native-geocoding'
import ImagePicker from 'react-native-image-crop-picker';
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import AntDesign from 'react-native-vector-icons/AntDesign'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';




const Profile = ({ navigation }) => {
    // const homeState = useSelector(state => state ? state.login.response ? state.login.response : state.register.response : null)
    const homeState = useSelector(state => state.user)
    console.log('my state user', homeState)

    const dispatch = useDispatch()

    // const [user, setUser] = useState();

    // // Handle user state changes
    // function onAuthStateChanged(user) {
    //     setUser(user);
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     console.log('im running useeffect')
    //     return subscriber; // unsubscribe on unmount
    // }, []);
    // console.log('???', user)
    const logOutHandler = () => {
        const action = logOutAction()
        dispatch(action)
    }

    // useEffect(() => {
    //     if (user) {
    //         console.log(user.uid)
    //         const action = getUserAction(user.uid)
    //         dispatch(action)
    //     }
    // }, [user])
    console.log(homeState)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleConfirmPhoto, setModalVisibleConfirmPhoto] = useState(false)

    const checkImage = () => {
        return homeState.response?.avatar != '' ? homeState.response.avatar : null
    }
    const [image, setImage] = useState(checkImage)

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
            setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto)
        })

    }

    const onPressTakePhoto = () => {
        console.log('running')
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setImage(image.path)
            setModalVisible(!modalVisible)
            setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto)
        });
    }

    const [isLoading, setIsLoading] = useState(false)
    const deleteBeforeUpdateImage = (url) => {
        let imageRef = storage().refFromURL(url)
        imageRef.delete().then(() => {
            console.log("Deleted")
        }).catch(err => console.log(err))

    }

    const uploadImage = async () => {
        if (image == null) {
            alert('No image selected please try again')
            return
        }
        if (homeState.response?.avatar != '') {
            deleteBeforeUpdateImage(homeState.response.avatar)
        }
        setIsLoading(true)

        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        //add timestamp
        const extension = filename.split('.').pop()
        const name = filename.split('.').slice(0, -1).join('.');

        filename = name + Date.now() + '.' + extension

        try {
            const id = homeState.response.id
            const storageRef = storage().ref(`user/${filename}`)
            await storageRef.putFile(uploadUri).then(() => {
                // alert('ADD SUCCESSFULLY')
                setIsLoading(false)
            })
            const url = await storageRef.getDownloadURL()
            await firestore().collection('users')
                .doc(`${id}`)
                .update({
                    avatar: url
                }).then(() => {
                    const action = getUserAction(id)
                    dispatch(action)
                    setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto)
            setIsLoading(false)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 18 }}>
                    Personal details
                </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', borderRadius: 10, borderWidth: 0, padding: 10, marginBottom: 10, backgroundColor: '#fff' }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{ width: '40%', justifyContent: 'center', paddingHorizontal: 10, }}>
                    <Image
                        source={image == null ? require('../../../assets/images/avatar-5.jpg') : { uri: image }}
                        style={{ width: 100, height: 100, borderRadius: 75, }} resizeMode={'cover'} />
                </TouchableOpacity>
                <View>

                    <Text style={{ ...fonts.type3, fontWeight: 'bold', paddingBottom: 10, }}>
                        {homeState?.response?.name ? homeState?.response?.name : homeState?.response?.email}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <FA5 name={'envelope'}
                            size={18}
                            color={colors.grey}
                            style={{ paddingRight: 6, }} />
                        <Text style={{ ...fonts.type1, color: colors.grey, width: '100%', paddingBottom: 4, }}>
                            {homeState.response?.email}
                        </Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FA5 name={'phone-alt'}
                            size={18}
                            color={colors.grey}
                            style={{ paddingRight: 6, }} />
                        <Text style={{ ...fonts.type1, color: colors.grey, width: '100%', paddingBottom: 4, }}>
                            {homeState.response?.phoneNumber}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FA5 name={'map-marked-alt'}
                            size={18}
                            color={colors.grey}
                            style={{ paddingRight: 6, }} />
                        <Text style={{ ...fonts.type1, color: colors.grey, width: '100%', paddingBottom: 4, }}>
                            {homeState.response?.address}
                        </Text>
                    </View>
                </View>

            </View>
            {/* <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', marginBottom: 10, }}>
                <TouchableOpacity disabled style={{ width: '30%', height: 80, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}>
                    <FA5 name={'bell'} size={26} style={{ paddingBottom: 10, }} />
                    <Text style={{ ...fonts.type1, }}>
                        Notifications
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled style={{ width: '30%', height: 80, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}>
                    <FA5 name={'credit-card'} size={26} style={{ paddingBottom: 10, }} />
                    <Text style={{ ...fonts.type1, }}>
                        Payments
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '30%', height: 80, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0, }}>
                    <FA5 name={'cog'} size={26} style={{ paddingBottom: 10, }} />
                    <Text style={{ ...fonts.type1, }}>
                        Settings
                    </Text>
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity
                onPress={() => { navigation.navigate('ChangePassword') }}
                style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    borderRadius: 10,
                    height: 50,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                }}>
                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>Change password</Text>
                <FA5 name={'chevron-right'} size={18} />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Address", { pin: { ...homeState.coords } })}
                style={{

                    width: '100%',
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    borderRadius: 10,
                    height: 50,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                }}>
                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>Manage Address</Text>
                <FA5 name={'chevron-right'} size={18} />

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('HistoryOrder') }}
                style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderWidth: 0,
                    borderRadius: 10,
                    height: 50,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                }}>
                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>Your Order</Text>
                <FA5 name={'chevron-right'} size={18} />

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => { navigation.navigate('About') }}
                style={{
                    width: '30%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    height: 40,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                }}>
                <FA5 name={'info-circle'} size={16} />

                <Text style={{ ...fonts.type1, fontSize: 14, }}>About</Text>

            </TouchableOpacity>

            <View style={{ width: '100%', marginTop: 20, }}>
                <TouchableOpacity
                    style={{ width: '30%', height: 40, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => { logOutHandler() }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, fontWeight: 'bold', color: colors.default }}>
                        Log Out
                    </Text>
                </TouchableOpacity>

            </View>


            {/* Modal select image */}
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
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            padding: '3%',
                            borderBottomWidth: 1,
                            borderColor: '#adaba3'
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold', }}>
                                Select Image
                            </Text>

                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => { setModalVisible(!modalVisible) }}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', padding: '3%', }}>
                            <TouchableOpacity
                                onPress={() => { onPressTakePhoto() }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 14,
                                    borderRadius: 10,
                                    backgroundColor: colors.default
                                }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                                    Take photo
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', padding: '3%', }}>
                            <TouchableOpacity
                                onPress={() => { onPressChoosePhoto() }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 14,
                                    borderRadius: 10,
                                    backgroundColor: colors.default
                                }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                                    Choose form library
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', padding: '3%', }}>
                            <TouchableOpacity
                                onPress={() => { setModalVisible(!modalVisible) }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 14,
                                    borderRadius: 10,
                                    backgroundColor: colors.default
                                }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', fontWeight: 'bold' }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>

            </Modal>

            {/* Modal confirm image */}
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisibleConfirmPhoto}
                onRequestClose={() => {
                    setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto);
                }}
            >
                <View style={{ justifyContent: 'flex-end', height: windowHeight, backgroundColor: modalVisibleConfirmPhoto ? 'rgba(0,0,0,0.5)' : '' }}>
                    <View style={{ height: windowHeight / 2.2, backgroundColor: '#fff', }}>
                        <View style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            padding: '3%',
                            borderBottomWidth: 1,
                            borderColor: '#adaba3'
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold', }}>
                                Confirm image
                            </Text>

                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => {
                                setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto);
                            }}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: windowHeight / 4, width: windowWidth / 3.5, resizeMode: 'contain' }} source={{ uri: image }} />
                        </View>
                        <View style={{ width: '100%', padding: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisibleConfirmPhoto(!modalVisibleConfirmPhoto)
                                    setImage(checkImage)
                                }}
                                style={{
                                    width: '46%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 14,
                                    borderRadius: 10,
                                    backgroundColor: colors.default
                                }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { uploadImage() }}
                                style={{
                                    width: '46%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderRadius: 10,
                                    backgroundColor: colors.default
                                }}>
                                <Text style={{ ...fonts.type1, fontSize: 20, color: '#fff', }}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>

            </Modal>
            {
                isLoading ?
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={true}
                    >
                        <View style={{ justifyContent: 'flex-end', height: windowHeight, backgroundColor: modalVisibleConfirmPhoto ? 'rgba(0,0,0,0.5)' : '' }}>
                            <View style={{ height: windowHeight / 2.2, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="grey" />
                            </View>

                        </View>

                    </Modal>
                    : null
            }


        </SafeAreaView>

    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '3%',
    }

})
