import React, { useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors, fonts } from '../../assets/style'
import { windowHeight, windowWidth } from '../../utils/Dimentions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { numberWithCommas } from '../../utils/function'

const CartItem = (props) => {
    // const [mark, setMark] = useState(false)
    const onPressFoodItem = (item) => {
        // console.log('cartitem: ', item)
        props.onPressFoodItem(item)
    }

    // const onPressFavorites = (item) => {
    //     if (!mark) props.onPressAddToFavorite(item)
    //     else props.onPressRemoveToFavorite(item)
    //     // props.onPressRemoveToFavorite(item)
    //     setMark(!mark)
    // }
    return (
        <TouchableOpacity
            key={props.item.id}
            onPress={() => { onPressFoodItem(props.item); }}
            style={props.styleCartItem ? props.styleCartItem : {
                width: windowWidth / 1.5,
                height: windowHeight / 2.2,
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.grey,
                marginRight: 20,
            }}>
            <ImageBackground source={require('../../assets/images/kolo-mee.jpg')} imageStyle={{ width: '100%', height: '100%', borderRadius: 10, }} style={{ width: '100%', height: '50%', borderRadius: 10, borderColor: '#000', }} resizeMode='cover'>
                {/* <View style={{ alignItems: 'flex-end', paddingTop: 6, paddingRight: 6 }}>
                    <TouchableOpacity onPress={() => onPressFavorites(props.item)} style={{ borderRadius: 10, backgroundColor: '#fff', padding: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5Icon name={'heart'} solid={mark} color={colors.default} size={28} />
                    </TouchableOpacity>
                </View> */}
                {/* <View style={{ backgroundColor: 'cyan',  }}>
                    <Text>
                        sale 10%
                    </Text>
                </View> */}

            </ImageBackground>
            {/* <Image source={require('../../assets/images/ramen.png')} style={{ width: '90%', height: '40%', borderBottomWidth: 1, borderColor: '#000', backgroundColor: 'cyan' }} resizeMode='contain' /> */}
            <View style={{ width: '100%', alignItems: 'center', }}>

                <View style={{ width: '90%', paddingVertical: 4, paddingBottom: 4, borderBottomWidth: 1, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4, paddingTop: 4, }}>
                        <Text style={props.horizontal ? { ...fonts.type1, fontSize: 16, width: '80%', height: 40, fontWeight: 'bold', } : { ...fonts.type1, fontSize: 16, width: '80%', fontWeight: 'bold' }} numberOfLines={2}>
                            {props.item.foodName}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, borderRadius: 10, borderWidth: 1, paddingHorizontal: 6, borderColor: colors.default }}>
                            <Text style={{ color: colors.default, fontWeight: 'bold' }}>
                                {props.item.rating}{" "}
                            </Text>
                            <FontAwesome5Icon name={'star'} solid color={'#F5A62E'} size={14} />

                        </View>

                    </View>

                    <Text numberOfLines={2} style={{ ...fonts.type1, height: 40, }}>
                        Nulla veniam officia aliqua mollit laboris do qui dolor fugiat ut.
                    </Text>
                </View>
                <View style={props.horizontal ? { width: '90%', justifyContent: 'space-between', paddingTop: '2%', } : { width: '90%', justifyContent: 'space-between', paddingTop: '2%', flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                        <Text numberOfLines={1} style={{ ...fonts.type1, color: colors.default, fontSize: 16 }}>
                            {numberWithCommas(props.item.price)} VND
                        </Text>

                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 6, alignItems: 'center', }}>
                        <MaterialCommunityIcons name={'ticket-confirmation'} size={20} color={'green'} />
                        <Text numberOfLines={1} style={{ ...fonts.type1, color: colors.grey, }}>
                            {" "}• Fee ship 30.000 VND
                        </Text>
                    </View>


                </View>
            </View>

        </TouchableOpacity>
    )
}

export default CartItem

const styles = StyleSheet.create({})
