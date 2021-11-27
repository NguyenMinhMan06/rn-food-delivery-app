import React, { useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { colors, fonts } from '../../../../assets/style'
import { windowHeight, windowWidth } from '../../../../utils/Dimentions'
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux'
import { getLocationListAction } from '../../../redux/action'


const AddBranch = () => {
    const [branchName, setBranchName] = useState('')
    const [address, setAddress] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const onPressAddBranch = async () => {
        if (branchName == '' || address == '' || lat == '' || long == '') {
            Alert.alert('Data empty', 'There are empty data in field. Please fill and try again!')
            return
        }
        setIsLoading(true)
        try {
            await firestore().collection('branch')
                .add({
                    address: address,
                    name: branchName,
                    coords: {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(long)
                    }
                }).then(() => {
                    // Alert.alert('Add success', 'New branch added')
                    setBranchName('')
                    setAddress('')
                    setLat('')
                    setLong('')
                    setIsLoading(false)
                    setMessage({ mess: 'Add successfully', success: true })
                    const action = getLocationListAction()
                    dispatch(action)
                    console.log('add successfully')
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setMessage({ mess: 'Add failed. Please try again later', success: false })
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
                        value={branchName}
                        onChangeText={setBranchName}
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
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#dfdee4',
                    borderRadius: 6,
                    color: '#000',
                    fontSize: 14,
                    paddingLeft: 14
                }}>
                    <TextInput
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
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
                        value={lat}
                        onChangeText={setLat}
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
                        Longitude:
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
                        value={long}
                        onChangeText={setLong}
                    />
                </View>
            </View>

            {isLoading ?
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
                : null
            }

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
                <TouchableOpacity onPress={() => { onPressAddBranch() }}
                    style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                        Add Branch
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default AddBranch

const styles = StyleSheet.create({
    containerMap: {
        height: windowHeight - windowHeight / 7,
        width: windowWidth,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
