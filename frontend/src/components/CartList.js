import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import CartItem from './CartItem'

const CartList = (props) => {
    return (
        <ScrollView
            horizontal={props.horizontal}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={props.reff}
            style={props.horizontal ? { paddingVertical: '3%' } : { marginBottom: 30 }}
            contentContainerStyle={props.horizontal ?
                {
                    paddingBottom: '3%', paddingLeft: '3%',
                } :
                {
                    paddingBottom: '6%',
                    paddingHorizontal: '3%',
                }}
        >
            {props.data.map((item, index) => {
                if (index >= 7) return
                else {
                    return <CartItem {...props} key={item.id} item={item} styleCartItem={props.styleCartItem} />

                }
            })}
        </ScrollView>
    )
}

export default CartList

const styles = StyleSheet.create({})
