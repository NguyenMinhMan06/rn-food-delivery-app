import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationListAction } from '../../../redux/action';
import { fonts } from '../../../../assets/style';

const Branch = ({ navigation }) => {
    const locationState = useSelector(state => state.locList)

    const [dataFiltered, setDataFiltered] = useState(locationState.response ? locationState.response : null)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const searchBranchName = (value) => {
        setSearch(value)
        if (value == '') {
            setDataFiltered(locationState.response)
            return
        }
        const newData = locationState.response.filter(i => {
            return i.name.toLowerCase().includes(value.toLowerCase())
        })
        setDataFiltered(newData)
    }

    useEffect(() => {
        const action = getLocationListAction()
        dispatch(action)
    }, [])

    useEffect(() => {
        setDataFiltered(locationState.response)
    }, [locationState])

    const renderList = ({ navigation }) => {
        const renderList = []
        dataFiltered.map((item, index) => {
            return renderList.push(
                <View key={index} style={{ paddingVertical: 10, borderBottomWidth: 1, }} >
                    <TouchableOpacity style={{ paddingHorizontal: 20, }} onPress={() => { navigation.navigate('EditBranch', { item }) }}>
                        <Text style={{ ...fonts.type1, paddingBottom: 4, }}>
                            Name: <Text style={{ ...fonts.type1, fontWeight: 'bold', }}>{item.name}</Text>
                        </Text>
                        <Text style={{ ...fonts.type1 }}>
                            Address: <Text style={{ ...fonts.type1, fontWeight: 'bold' }}>{item.address}</Text>

                        </Text>
                    </TouchableOpacity>
                </View>
            )
        })
        return (
            <ScrollView style={{}}>
                {renderList}
            </ScrollView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
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
                        onChangeText={(value) => { searchBranchName(value) }}
                    />
                </View>
            </View>
            {locationState.response ? renderList({ navigation }) : null}
        </SafeAreaView>
    )
}

export default Branch

const styles = StyleSheet.create({})
