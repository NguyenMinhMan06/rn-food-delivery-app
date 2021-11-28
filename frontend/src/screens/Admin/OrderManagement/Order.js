import React, { useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { arrayIsEmpty } from '../../../../utils/function';

const Order = ({ navigation }) => {
    const stateUser = useSelector(state => state.user)
    console.log(stateUser)

    const [branchListOrder, setBranchListOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getOrderFromBranch = async () => {
        if (stateUser.response.branch == '' && stateUser.response.role == 'manager') {
            alert('you have not got a branch yet. Please ask permission and try later')
            setIsLoading(false)
            setBranchListOrder([])
            return
        }
        try {
            const newList = []
            if (stateUser.response.role == 'admin') {
                await firestore().collection('orders')
                    .get()
                    .then(querySnapShot => {
                        querySnapShot.forEach(doc => {
                            newList.push({ ...doc.data() })
                        })
                    }).then(() => {
                        setIsLoading(false)
                        setBranchListOrder(newList)
                    })
            }
            else {
                await firestore().collection('orders')
                    .get()
                    .then(querySnapShot => {
                        querySnapShot.forEach(doc => {
                            const { shopAddress } = doc.data()
                            if (shopAddress.id == stateUser.response.branch) {
                                newList.push({ ...doc.data() })
                            }
                        })
                    }).then(() => {
                        setIsLoading(false)
                        setBranchListOrder(newList)
                    })
            }

        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getOrderFromBranch()
    }, [])

    console.log(branchListOrder)
    // useEffect(() => {

    // }, [isLoading])

    // console.log(branchListOrder)

    const renderOrderItem = ({ navigation }) => {
        const renderList = []
        branchListOrder.map((item, index) => {
            return renderList.push(
                <TouchableOpacity onPress={() => { navigation.navigate('OrderInfo', { item }) }} key={index}>
                    <View style={{ padding: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 16, }}>
                            Total item: <Text style={{ fontWeight: 'bold' }}>{item.orderItem.length}</Text>
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 16 }}>
                            Total price:<Text style={{ fontWeight: 'bold' }}> {item.totalPrice} VND</Text>
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 16 }}>
                            Create at: <Text style={{ fontWeight: 'bold' }}>{item.createAt}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>

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
        <SafeAreaView style={{ flex: 1, }}>
            {!arrayIsEmpty(branchListOrder) ? renderOrderItem({ navigation }) :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                        You do not have branch please ask permission
                    </Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default Order

const styles = StyleSheet.create({})
