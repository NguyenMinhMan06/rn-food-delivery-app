import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
import { fonts } from '../../../assets/style';

const HistoryOrder = ({ navigation }) => {
    const stateUser = useSelector(state => state.user)
    const [order, setOrder] = useState()

    const [isLoading, setIsLoading] = useState(true)

    const getAllHistoryOrder = async () => {
        try {
            const listOrder = []
            await firestore().collection('users')
                .doc(`${stateUser.response.id}`)
                .collection('orders')
                .get()
                .then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        const orderItem = doc.data()
                        listOrder.push(orderItem)
                    })
                }).then(() => {
                    setIsLoading(false)
                })
            setOrder(listOrder)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllHistoryOrder()
    }, [])

    console.log(order)

    const renderOrderItem = () => {
        const renderList = []
        order.map((item, index) => {
            return renderList.push(
                <TouchableOpacity onPress={() => { navigation.navigate('HistoryOrderDetail', { item }) }} key={index}>
                    <View style={{ padding: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 16, }}>
                            Total item: <Text style={{ fontWeight: 'bold' }}>{item.orderItem.length}</Text>
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 16 }}>
                            Total price:<Text style={{ fontWeight: 'bold' }}> {item.totalPrice}</Text> VND
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 16 }}>
                            Delivery at: <Text style={{ fontWeight: 'bold' }}>{item.createAt}</Text>
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
        <SafeAreaView>
            {order ? renderOrderItem() : null}
        </SafeAreaView>
    )
}

export default HistoryOrder

const styles = StyleSheet.create({})
