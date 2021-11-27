import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowHeight, windowWidth } from '../../../../utils/Dimentions';
import { colors, fonts } from '../../../../assets/style';
import { numberWithCommas } from '../../../../utils/function';
import Ionicons from 'react-native-vector-icons/Ionicons'


const OrderInfo = ({ navigation, route }) => {
    const stateUser = useSelector(state => state.user)

    const [item, setItem] = useState(route.params.item)

    // const [isLoading, setIsLoading] = useState(true)




    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    //             <Modal
    //                 transparent={true}
    //                 visible={true}
    //             >
    //                 <View style={{
    //                     justifyContent: 'flex-end',
    //                     height: windowHeight,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                     backgroundColor: 'rgba(0, 0, 0, 0.5)'
    //                 }}>
    //                     <View style={{
    //                         height: windowHeight / 6,
    //                         justifyContent: 'space-between',
    //                         alignItems: 'center',
    //                         backgroundColor: '#fff',
    //                         width: windowWidth / 1.5
    //                     }}>
    //                         <View style={{
    //                             width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3'
    //                         }}>
    //                             <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold' }}>
    //                                 Loading data please wait...
    //                             </Text>
    //                         </View>
    //                         <View style={{ padding: 20 }}>
    //                             <ActivityIndicator size="large" color="grey" />

    //                         </View>
    //                     </View>
    //                 </View>

    //             </Modal>
    //         </View>
    //     );
    // }

    return (
        <View>
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

                </View>
                <View style={{ height: 50 }}>

                </View>
            </ScrollView>
        </View>
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
