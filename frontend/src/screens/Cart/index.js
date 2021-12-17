import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { addToCartAction, getItemCartAction, getUserAction, logOutAction, removeFromCart } from '../../redux/action'
import auth from '@react-native-firebase/auth';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, fonts } from '../../../assets/style'
import { arrayIsEmpty, distance, numberWithCommas } from '../../../utils/function'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import firestore from '@react-native-firebase/firestore';


const Cart = ({ navigation, route }) => {
    const cartItem = useSelector(state => state.cartItem)
    const homeState = useSelector(state => state.user)
    const locList = useSelector(state => state.locList)

    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);

    const getCurrentTime = (min = 0, date = Date.now()) => {
        const newDate = new Date(date)
        newDate.setMinutes(newDate.getMinutes() + min)
        return moment(newDate).format('lll')
    }


    const [timer, setTimer] = useState(() => getCurrentTime())
    const [estimateTime, setEstimateTime] = useState(() => getCurrentTime(30))


    const dispatch = useDispatch()

    useEffect(() => {
        if (route.params) {
            if (!(route.params.timeDelivery == undefined)) {
                setTimer(getCurrentTime(0, route.params.timeDelivery))
                setEstimateTime(getCurrentTime(30, route.params.timeDelivery))
            }
        }
    }, [route.params])

    // useEffect(() => {
    //     if (user) {
    //         console.log(user.uid)
    //         const action = getUserAction(user.uid)
    //         dispatch(action)
    //     }
    // }, [user])

    const onPressRemoveFromCart = (item) => {
        console.log(item)
        const itemRemove = { item: item, userId: homeState.response.id }
        const action = removeFromCart(itemRemove)
        dispatch(action)

    }

    console.log(cartItem)
    const [shippPrice, setShippPrice] = useState()
    const [shipDistance, setShipDistance] = useState()
    const [nameShop, setNameShop] = useState()
    const [nameAddress, setNameAddress] = useState()
    const [addressId, setAddressId] = useState()

    const calculateNearestDistance = () => {
        const coordsUser = {
            latitude: homeState.response.coords.latitude,
            longitude: homeState.response.coords.longitude
        }
        let distanceCal = 0
        let nameLoc = ''
        let nameAddress = ''

        locList.response.map((item, index) => {
            const dis = distance(coordsUser.latitude, coordsUser.longitude, item.coords.latitude, item.coords.longitude)
            // console.log(dis)
            if (index == 0) {
                distanceCal = dis
                nameLoc = item.name
                nameAddress = { address: item.address, coords: item.coords }
            }
            if (distanceCal >= dis) {
                distanceCal = dis
                nameLoc = item.name
                nameAddress = { address: item.address, coords: item.coords, id: item.id }
            }
        })
        let count = distanceCal.toFixed(1) * 10000
        // console.log('distancecal', distanceCal)
        setShipDistance(distanceCal.toFixed(1))
        setShippPrice(count)
        setNameShop(nameLoc)
        setNameAddress(nameAddress)
    }

    useEffect(() => {
        calculateNearestDistance()
        const action = getItemCartAction(homeState.response.id)
        dispatch(action)
    }, [])

    const onPressAddToCart = (item) => {
        console.log(item)
        const itemAdd = { item: item, userId: homeState.response.id }
        const action = addToCartAction(itemAdd)
        dispatch(action)
    }

    const calculateTotal = () => {
        let total = 0;
        const item = cartItem.response
        for (let index = 0; index < item.length; index++) {
            total = total + item[index].price * item[index].quantity
        }
        total = total + shippPrice
        console.log(total)
        setTotalCartPrice(total);
    }



    useEffect(() => {
        if (cartItem?.response) {
            calculateTotal()
        }
    }, [cartItem])
    console.log(cartItem.response)

    const onPressConfirmPaymentCOD = async () => {
        try {
            const orderItem = cartItem.response
            await firestore().collection('users')
                .doc(homeState.response?.id)
                .collection('orders')
                .add({
                    shopName: nameShop,
                    shopAddress: nameAddress,
                    itemPrice: totalCartPrice - shippPrice,
                    shipPrice: shippPrice,
                    totalPrice: totalCartPrice,
                    receiverAddress: { coords: homeState.response?.coords, address: homeState.response?.address ? homeState.response?.address : '' },
                    createAt: timer,
                    orderItem: orderItem,
                    orderStatus: 0

                }).then((docref) => {
                    firestore()
                        .collection('orders')
                        .doc(`${docref.id}`)
                        .set({
                            shopName: nameShop,
                            shopAddress: nameAddress,
                            itemPrice: totalCartPrice - shippPrice,
                            shipPrice: shippPrice,
                            totalPrice: totalCartPrice,
                            receiverAddress: { coords: homeState.response?.coords, address: homeState.response?.address ? homeState.response?.address : '' },
                            createAt: timer,
                            orderItem: orderItem,
                            orderStatus: 0,
                            userId: homeState.response?.id
                        }).then(() => {
                            console.log('add to order successfully')
                        })
                    firestore()
                        .collection('users')
                        .doc(homeState.response.id)
                        .collection('cart').get()
                        .then(querySnapShot => {
                            Promise.all(querySnapShot.docs.map(d => d.ref.delete())).then(() => {
                                const action = getItemCartAction()
                                dispatch(action)
                                setModalVisible(!modalVisible)
                                console.log('delete cart successfully')
                            })
                        })
                    Alert.alert('Order created!', 'Create order successfully')
                    // alert('Create order successfully')
                    console.log('create success')
                })
        } catch (error) {
            console.log(error)
        }
    }

    if (cartItem.isLoading) {
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
        <SafeAreaView style={styles.container}>
            {/* <Text>Welcome to list food {CartState._data.name ? CartState._data.name : CartState._data.email}</Text> */}
            <View style={{ width: '100%', paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '3%', alignItems: 'center' }}>
                <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 18 }}>
                    Confirm order
                </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('HistoryOrder') }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, color: colors.default }}>
                        History
                    </Text>
                </TouchableOpacity>
            </View>
            {!arrayIsEmpty(cartItem.response) ?
                <ScrollView style={{ width: '100%', }}>
                    <TouchableOpacity disabled style={{ justifyContent: 'flex-start', width: '100%', paddingHorizontal: '3%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.grey, paddingBottom: 20, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={'location-outline'} size={20} color={colors.default} style={{ paddingRight: 10, }} />
                            <View>
                                <Text style={{ ...fonts.type1 }}>
                                    Delivery address
                                </Text>
                                <Text style={{ ...fonts.type1 }}>
                                    {homeState?.response?.name} - {homeState?.response?.phoneNumber}
                                </Text>
                                <Text style={{ ...fonts.type1 }}>
                                    {homeState?.response?.address}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity disabled style={{ justifyContent: 'flex-start', width: '100%', paddingHorizontal: '3%', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.grey, paddingVertical: 10, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={'time-outline'} size={20} color={colors.default} style={{ paddingRight: 10, }} />
                            <View>
                                <Text>
                                    Delivery - {timer}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <CartRenderItem
                        data={cartItem.response}
                        onPressRemove={onPressRemoveFromCart}
                        onPressAdd={onPressAddToCart}
                    />
                    <View style={{ paddingTop: 10, }}>
                        <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', borderColor: colors.grey, justifyContent: 'space-between', borderBottomWidth: 1, }}>
                            <Text>
                                Subtotal ({cartItem.length} item{cartItem.length >= 2 ? 's' : null})
                            </Text>
                            <Text>
                                {numberWithCommas(totalCartPrice - shippPrice)} VND
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', borderColor: colors.grey, justifyContent: 'space-between', borderBottomWidth: 1, }}>
                            <Text>
                                Shipping Fee(distance)
                            </Text>
                            <Text>
                                {shippPrice} VND
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10, paddingHorizontal: '3%', justifyContent: 'space-between', }}>
                            <Text style={{ ...fonts.type1, fontSize: 18, fontWeight: 'bold' }}>
                                Total
                            </Text>
                            <Text style={{ ...fonts.type1, fontSize: 18, color: colors.default, fontWeight: 'bold' }}>
                                {numberWithCommas(totalCartPrice)} VND
                            </Text>
                        </View>

                    </View>
                    <View style={{ height: 50 }}>

                    </View>
                </ScrollView>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} key={0}>
                    <FontAwesome5Icon name={'shopping-cart'} size={120} color={colors.default} />
                    {/* <Image source={require('../../../assets/images/cart.png')} style={{ width: 150, height: 150 }} resizeMode="contain" /> */}
                    <Text style={{ ...fonts.type1, fontSize: 20, padding: 10, }}>Have you ordered?</Text>
                    <Text style={{ ...fonts.type1, color: colors.grey, fontSize: 16, padding: 10, paddingHorizontal: 80, textAlign: 'center' }}>Add your item to cart then you can complete your order and track your delivery!</Text>
                    <TouchableOpacity style={{ width: 100, height: 40, justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate("Discover") }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: colors.default }}>
                            Go to order?
                        </Text>
                    </TouchableOpacity>
                </View>

            }

            {!arrayIsEmpty(cartItem.response) &&
                <TouchableOpacity
                    onPress={() => { setModalVisible(!modalVisible) }}
                    style={{ position: 'absolute', bottom: 10, backgroundColor: 'cyan', width: '94%', marginHorizontal: '3%', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, }}>
                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                        Checkout - {totalCartPrice} VNĐ
                    </Text>
                </TouchableOpacity>

            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ justifyContent: 'flex-end', height: windowHeight, backgroundColor: modalVisible ? 'rgba(0,0,0,0.5)' : '' }}>
                    <View style={{ height: windowHeight / 2, backgroundColor: '#fff', }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3' }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold' }}>
                                Confirm your order
                            </Text>
                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => { setModalVisible(!modalVisible) }}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={{ ...fonts.type1, fontSize: 16 }}>
                                Total price:{" "}
                                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>
                                    {totalCartPrice} VND
                                </Text>
                            </Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={{ ...fonts.type1, fontSize: 16 }}>
                                Ship price:{" "}
                                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>
                                    {shippPrice} VND
                                </Text>
                            </Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={{ ...fonts.type1, fontSize: 16 }}>
                                Distance:{" "}
                                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>
                                    {shipDistance}(km)
                                </Text>
                            </Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={{ ...fonts.type1, fontSize: 16 }}>
                                Delivery at:{" "}
                                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>
                                    {moment(timer).format('LLL')}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={{ ...fonts.type1, fontSize: 16 }}>
                                Time delivery:{" "}
                                <Text style={{ ...fonts.type1, fontSize: 16, fontWeight: 'bold' }}>
                                    {moment(estimateTime).format('LLL')}
                                </Text>
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', padding: '3%', position: 'absolute', bottom: 10, }}>
                            <TouchableOpacity disabled style={{ backgroundColor: colors.grey, width: '48%', padding: 10, alignItems: 'center', borderRadius: 10, }}>
                                <Text style={{ ...fonts.type1, fontSize: 16, color: '#fff' }}>
                                    Payment(On develop)
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { onPressConfirmPaymentCOD() }}
                                style={{ backgroundColor: colors.default, width: '48%', padding: 10, borderRadius: 10, alignItems: 'center' }}>
                                <Text style={{ ...fonts.type1, fontSize: 16, color: '#fff' }}>
                                    Cash on delivery
                                </Text>
                            </TouchableOpacity>
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
                        <Image source={item.image ? { uri: item.image } : require('../../../assets/images/pizza.jpg')} style={{ width: 65, height: 65 }} resizeMode={'contain'} />

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
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => { props.onPressRemove(item) }} style={{ paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.grey }}>
                                    <FontAwesome5Icon name={'minus'} size={18} />
                                </TouchableOpacity>

                                <Text style={{ paddingHorizontal: 14, fontSize: 18, color: colors.default, }}>
                                    {item.quantity}
                                </Text>
                                <TouchableOpacity onPress={() => { props.onPressAdd(item) }} style={{ paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.grey }}>
                                    <FontAwesome5Icon name={'plus'} size={18} />
                                </TouchableOpacity>
                            </View>
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


export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }

})
