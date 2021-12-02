import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { colors, fonts } from '../../../assets/style';
import { windowHeight, windowWidth } from '../../../utils/Dimentions';
import { useIsFocused } from '@react-navigation/core'

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
                        const docid = doc.id
                        listOrder.push({ ...orderItem, id: docid })
                    })
                }).then(() => {
                    setIsLoading(false)
                })
            setOrder(listOrder)
        } catch (error) {
            console.log(error)
        }
    }
    const checkOrderStatus = (orderStatus) => {
        switch (orderStatus) {
            case 0:
                return 'On going'
            case 1:
                return 'Confirmed'
            case 2:
                return 'Store Cancel'
            case -1:
                return 'User Cancel'
            default:
                break;
        }
    }
    const colorStatusOrder = (orderstatus) => {
        switch (orderstatus) {
            case 0:
                return '#000'
            case 1:
                return 'green'
            case 2:
                return 'red'
            case -1:
                return colors.grey
            default:
                break;
        }
    }

    useEffect(() => {
        getAllHistoryOrder()
    }, [])

    console.log(order)

    const isFocused = useIsFocused()


    useEffect(() => {
        getAllHistoryOrder()
    }, [isFocused]);

    const renderOrderItem = () => {
        const renderList = []
        order.map((item, index) => {
            return renderList.push(
                <TouchableOpacity style={{ borderBottomWidth: 1 }} onPress={() => { navigation.navigate('HistoryOrderDetail', { item }) }} key={index}>
                    <View style={{ paddingHorizontal: 20, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...fonts.type1, fontSize: 16, padding: 6, width: '40%' }}>
                                Total item: <Text style={{ fontWeight: 'bold' }}>{item.orderItem.length}</Text>
                            </Text>
                            <Text style={{ ...fonts.type1, fontSize: 16, padding: 6 }}>
                                Status: <Text style={{ fontWeight: 'bold', color: colorStatusOrder(item.orderStatus) }}>{checkOrderStatus(item.orderStatus)}</Text>
                            </Text>
                        </View>
                        <Text style={{ ...fonts.type1, fontSize: 16, padding: 6 }}>
                            Total price:<Text style={{ fontWeight: 'bold' }}> {item.totalPrice} VND</Text>
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 16, padding: 6 }}>
                            Delivery at: <Text style={{ fontWeight: 'bold' }}>{item.createAt}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>

            )
        })
        return (
            <ScrollView style={{}}>
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
