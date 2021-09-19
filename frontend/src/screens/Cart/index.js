import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { getUserAction, logOutAction, removeFromCart } from '../../redux/action'
import auth from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'


const Cart = ({ navigation }) => {
    const cartItem = useSelector(state => state.cartItem)
    console.log(cartItem)
    const dispatch = useDispatch()


    const logOutHandler = () => {
        const action = logOutAction()
        dispatch(action)
    }

    // useEffect(() => {
    //     if (user) {
    //         console.log(user.uid)
    //         const action = getUserAction(user.uid)
    //         dispatch(action)
    //     }
    // }, [user])
    const onPressCartItem = (cartItem) => {
        const action = removeFromCart(cartItem)
        dispatch(action)
    }
    // useEffect(() => {


    // }, [cartItem])


    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>Welcome to list food {CartState._data.name ? CartState._data.name : CartState._data.email}</Text> */}

            <View>
                <CartRenderItem data={cartItem}
                    onPress={onPressCartItem} />
            </View>

        </SafeAreaView>

    )
}

const CartRenderItem = (props) => {
    const cartList = []
    if (props.data === null || props.data === undefined || props.data.length === 0) cartList.push(
        <View style={{ flex: 1 }}>
            <Text> NO DATA</Text>
        </View>
    ); else {
        props.data.map((item, index) => {
            return cartList.push(
                <TouchableOpacity
                    onPress={() => {
                        props.onPress(item)
                    }}
                    style={{
                        width: windowWidth / 4,
                        height: windowHeight / 10,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#000',
                        marginRight: 10,
                    }}>
                    <Text>
                        {item.name}
                    </Text>
                </TouchableOpacity>)
        }
        )
    }
    return (
        <View>
            {cartList}
        </View>
    )
}


export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
