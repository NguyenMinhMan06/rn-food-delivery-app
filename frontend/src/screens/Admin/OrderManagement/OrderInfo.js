import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { windowHeight, windowWidth } from '../../../../utils/Dimentions';
import { colors, fonts } from '../../../../assets/style';
import { numberWithCommas } from '../../../../utils/function';
import Ionicons from 'react-native-vector-icons/Ionicons'


const OrderInfo = ({ navigation, route }) => {
    const stateUser = useSelector(state => state.user)

    const [item, setItem] = useState(route.params.item)
    console.log(route.params.item)

    const [modalCancelOrder, setModalCancelOrder] = useState(false)
    const [modalConfirmOrder, setModalConfirmOrder] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
    const onPressCancelOrder = async () => {
        setIsLoading(true)
        try {
            const response = await firestore().collection('users')
                .doc(`${item.userId}`)
                .collection('orders')
                .doc(`${item.id}`)
                .update({
                    orderStatus: 2
                }).then(() => {
                    firestore()
                        .collection('orders')
                        .doc(`${item.id}`)
                        .update({
                            orderStatus: 2
                        }).then(() => {
                            console.log('update succeccfully')
                            setItem({ ...item, orderStatus: 2 })
                            setIsLoading(false)
                            setModalCancelOrder(!modalCancelOrder)
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }

    const onPressConfirmOrder = async () => {
        setIsLoading(true)
        try {
            const response = await firestore().collection('users')
                .doc(`${item.userId}`)
                .collection('orders')
                .doc(`${item.id}`)
                .update({
                    orderStatus: 1
                }).then(() => {
                    firestore()
                        .collection('orders')
                        .doc(`${item.id}`)
                        .update({
                            orderStatus: 1
                        }).then(() => {
                            console.log('update succeccfully')
                            setItem({ ...item, orderStatus: 1 })
                            setIsLoading(false)
                            setModalConfirmOrder(!modalConfirmOrder)
                        })
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ width: '100%', }}>

                <TouchableOpacity disabled style={{ justifyContent: 'flex-start', width: '100%', paddingHorizontal: '3%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.grey, paddingVertical: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name={'time-outline'} size={20} color={colors.default} style={{ paddingRight: 10, }} />
                        <View>
                            <Text>
                                Delivery - {item.createAt}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <CartRenderItem
                    data={item.orderItem}
                />
                <View style={{ paddingTop: 10, }}>
                    <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', borderColor: colors.grey, justifyContent: 'space-between', borderBottomWidth: 1, }}>
                        <Text>
                            Subtotal ({item.orderItem.length} item{item.orderItem.length >= 2 ? 's' : null})
                        </Text>
                        <Text>
                            {numberWithCommas(item.totalPrice - item.shipPrice)} VND
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', borderColor: colors.grey, justifyContent: 'space-between', borderBottomWidth: 1, }}>
                        <Text>
                            Shipping Free(distance)
                        </Text>
                        <Text>
                            {item.shipPrice} VND
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', justifyContent: 'space-between', }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, fontWeight: 'bold' }}>
                            Total
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: colors.default, fontWeight: 'bold' }}>
                            {numberWithCommas(item.totalPrice)} VND
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', justifyContent: 'space-between', }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, fontWeight: 'bold' }}>
                            Status
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: item.orderStatus == 1 ? 'green' : colors.default, fontWeight: 'bold' }}>
                            {checkOrderStatus(item.orderStatus)}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: 50 }}></View>
            {item.orderStatus == 0 ?
                <View style={{ paddingHorizontal: '3%', flexDirection: 'row', width: '100%', justifyContent: 'space-between', position: 'absolute', bottom: 10, }}>
                    <TouchableOpacity
                        onPress={() => { setModalCancelOrder(!modalCancelOrder) }}
                        style={{ width: '48%', alignItems: 'center', backgroundColor: colors.default, padding: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                            Cancel order
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setModalConfirmOrder(!modalConfirmOrder) }}
                        style={{ width: '48%', alignItems: 'center', backgroundColor: colors.default, padding: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                            Confirm order
                        </Text>
                    </TouchableOpacity>
                </View>
                : null}

            {/* Modal cancel Order */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalCancelOrder}
                onRequestClose={() => {
                    setModalCancelOrder(!modalCancelOrder)
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
                        height: isLoading ? windowHeight / 4 : windowHeight / 5,
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
                                Confirm cancel order
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...fonts.type1 }}>
                                You sure you want to cancel this order?
                            </Text>
                        </View>

                        {isLoading ?
                            <View>
                                <View style={{ padding: 10 }}>
                                    <ActivityIndicator size="large" color="grey" />
                                </View>
                            </View>
                            : null
                        }

                        <View style={{ flexDirection: 'row', width: '100%', padding: 6, justifyContent: 'space-evenly' }}>
                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{
                                        width: '80%',
                                        borderRadius: 10,
                                        padding: 12,
                                    }}
                                    onPress={() => { setModalCancelOrder(!modalCancelOrder) }}>
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
                                }} onPress={() => { onPressCancelOrder() }} >
                                    <Text style={{ ...fonts.type1, color: '#fff', textAlign: 'center' }}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal confirm Order */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalConfirmOrder}
                onRequestClose={() => {
                    setModalConfirmOrder(!modalConfirmOrder)
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
                        height: isLoading ? windowHeight / 4 : windowHeight / 5,
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
                                Confirm order
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...fonts.type1 }}>
                                Ship this order?
                            </Text>
                        </View>

                        {isLoading ?
                            <View>
                                <View style={{ padding: 10 }}>
                                    <ActivityIndicator size="large" color="grey" />
                                </View>
                            </View>
                            : null
                        }

                        <View style={{ flexDirection: 'row', width: '100%', padding: 6, justifyContent: 'space-evenly' }}>
                            <View style={{ width: '40%', justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity
                                    style={{
                                        width: '80%',
                                        borderRadius: 10,
                                        padding: 12,
                                    }}
                                    onPress={() => {
                                        setModalConfirmOrder(!modalConfirmOrder)
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
                                <TouchableOpacity style={{
                                    backgroundColor: 'green',
                                    width: '80%',
                                    borderRadius: 10,
                                    padding: 12,
                                }} onPress={() => { onPressConfirmOrder() }} >
                                    <Text style={{ ...fonts.type1, color: '#fff', textAlign: 'center' }}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const CartRenderItem = (props) => {
    const cartList = []
    props.data.map((item, index) => {
        return cartList.push(
            <TouchableOpacity
                onPress={() => {
                    console.log(item)
                }}
                key={item.id}
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',

                    flexDirection: 'row',
                    height: windowHeight / 8,
                    width: windowWidth,
                    borderBottomWidth: 1,
                    borderColor: colors.grey
                }}>
                <View style={{
                    flexDirection: 'row', paddingHorizontal: '3%'
                }}>
                    <View style={{ width: '20%', }}>
                        <Image source={item.image ? { uri: item.image } : require('../../../../assets/images/pizza.jpg')} style={{ width: 65, height: 65 }} resizeMode={'contain'} />

                    </View>
                    <View style={{ width: '80%', height: 65, height: 65, justifyContent: 'space-between', }}>
                        <View style={{}}>
                            <Text style={{ ...fonts.type1, fontSize: 14, fontWeight: 'bold', paddingLeft: 10, }} numberOfLines={2}>
                                {item.quantity} x  {item.foodName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold', paddingLeft: 10, color: 'green' }}>
                                {numberWithCommas(item.price * item.quantity)} VND
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >)
    }
    )
    return (
        <ScrollView style={{}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {cartList}
        </ScrollView>
    )
}

export default OrderInfo

const styles = StyleSheet.create({})
