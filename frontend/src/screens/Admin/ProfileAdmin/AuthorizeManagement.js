import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { fonts } from '../../../../assets/style';
import { arrayIsEmpty } from '../../../../utils/function';
import { useIsFocused } from '@react-navigation/core';


const AuthorizeManagement = ({ navigation }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const isFocused = useIsFocused();

    useEffect(() => {
        getAllUser()
    }, [isFocused]);

    const getAllUser = async () => {
        try {
            await firestore().collection('users')
                .get().then(querySnapshot => {
                    const listUser = []
                    querySnapshot.forEach(doc => {
                        const user = doc.data()
                        listUser.push({ ...user, id: doc.id })
                    })
                    setUser(listUser)
                    setDataFiltered(listUser)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(user)

    useEffect(() => {
        getAllUser()
    }, [])

    const [search, setSearch] = useState('')

    const [dataFiltered, setDataFiltered] = useState(null)

    const searchItemFood = (value) => {
        setSearch(value)
        if (value == '') {
            setDataFiltered(user)
            return
        }
        const newData = user.filter(i => {
            return i.email.toLowerCase().includes(value.toLowerCase())
        })
        setDataFiltered(newData)
    }

    const renderUser = ({ navigation }) => {
        const renderList = []
        dataFiltered.map((item, index) => {
            return renderList.push(
                <View key={index} style={{ paddingVertical: 10, }} >
                    <TouchableOpacity onPress={() => { navigation.navigate('AddAuthorize', { item }) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                            <Text style={{ ...fonts.type1, }}>
                                Name: <Text style={{ ...fonts.type1, fontWeight: 'bold' }}>{item.name}</Text>
                            </Text>
                            <Text style={{ ...fonts.type1, width: '30%' }}>
                                Role: {item?.role ? item.role : 'user'}
                            </Text>

                        </View>
                        <Text style={{ ...fonts.type1 }}>
                            Email: <Text style={{ ...fonts.type1, fontWeight: 'bold' }}>{item.email}</Text>
                        </Text>
                        <Text style={{ ...fonts.type1 }}>
                            Phone: <Text style={{ ...fonts.type1, fontWeight: 'bold' }}>{item.phoneNumber}</Text>
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

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 10, }}>
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
                        placeholder="Search"
                        value={search}
                        onChangeText={(value) => { searchItemFood(value) }}
                    />
                </View>
            </View>
            {!arrayIsEmpty(user) ? renderUser({ navigation }) : null}
        </SafeAreaView>
    )
}

export default AuthorizeManagement

const styles = StyleSheet.create({})
