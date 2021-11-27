import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../../assets/style'
import firestore from '@react-native-firebase/firestore';
import { getUserAction } from '../../../redux/action'

const AddAuthorize = ({ navigation, route }) => {

    const stateUser = useSelector(state => state.user)
    const locationState = useSelector(state => state.locList)


    console.log(route.params.item)
    const roleValue = [
        { label: 'User', value: '' },
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' }
    ]

    console.log(stateUser)

    const [user, setUser] = useState(route.params.item)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // useEffect(() => {
    //     setUser(route.params.item)
    // }, [])
    const [open, setOpen] = useState(false);
    const [roleSelect, setRoleSelect] = useState(route.params.item.role)
    const [Item, setItem] = useState(roleValue)

    const onPressUpdateRole = async () => {
        if (roleSelect == null) {
            alert('Please choose role to update')
            return
        }
        if (user.id == stateUser.response.id) {
            Alert.alert('Conflict', 'You can not update your own. Conflict will happen')
            return
        }
        setIsLoading(true)

        try {
            await firestore().collection('users')
                .doc(`${user.id}`)
                .update({
                    role: roleSelect,
                    branch: branchSelect
                }).then(() => {
                    setMessage({ mess: 'Update successfully', success: true })
                    setIsLoading(false)
                    alert('update success')
                })
        } catch (error) {
            console.log(error)
            setMessage({ mess: 'Update failed please try again later', success: false })
            setIsLoading(false)
        }

    }

    const [open2, setOpen2] = useState(false)

    const [branchSelect, setBranchSelect] = useState(route.params.item.branch)
    const [BranchItem, setBranchItem] = useState('')

    const branchValue = () => {
        const newList = []
        locationState.response.map(item => {
            return newList.push({ value: item.id, label: item.name })
        })
        setBranchItem(newList)
    }

    useEffect(() => {
        branchValue()
    }, [])
    console.log(locationState)

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
                        Email
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
                        style={{ color: '#000' }}
                        value={user.email}
                        editable={false}
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
                        Name
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
                        style={{ color: '#000' }}
                        value={user.name}
                        editable={false}
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
                        Location
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
                        style={{ color: '#000' }}
                        value={`${user.coords.latitude}, ${user.coords.longitude}`}
                        editable={false}
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
                        Phone
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
                        style={{ color: '#000' }}
                        value={user.phoneNumber}
                        editable={false}
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
                        Category
                    </Text>
                </View>
                {stateUser.response.role == 'admin' ?
                    <DropDownPicker
                        placeholder="Select Role"
                        open={open}
                        value={roleSelect}
                        items={Item}
                        setOpen={setOpen}
                        setValue={setRoleSelect}
                        setItems={setItem}
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
                        zIndex={2000}
                    />
                    :
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
                            style={{ color: '#000' }}
                            value={user.role}
                            editable={false}
                        />
                    </View>
                }

            </View>

            <View style={{ padding: '2%' }}>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#324b68'
                    }}>
                        Branch
                    </Text>
                </View>
                {stateUser.response.role == 'admin' && BranchItem ?
                    <DropDownPicker
                        placeholder="Select branch"
                        open={open2}
                        value={branchSelect}
                        items={BranchItem}
                        setOpen={setOpen2}
                        setValue={setBranchSelect}
                        setItems={setBranchItem}
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
                    :
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
                            style={{ color: '#000' }}
                            value={user.branch}
                            editable={false}
                        />
                    </View>
                }

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

            {isLoading ?
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="grey" />
                </View>
                : null
            }
            {stateUser.response.role == 'admin' ?
                <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', bottom: 10, width: '100%', }}>
                    <TouchableOpacity onPress={() => { onPressUpdateRole() }} style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                            Update role
                        </Text>
                    </TouchableOpacity>

                </View>
                : null
            }

        </SafeAreaView>
    )
}

export default AddAuthorize

const styles = StyleSheet.create({})
