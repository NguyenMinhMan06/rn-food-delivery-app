import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../assets/style'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { arrayIsEmpty, numberWithCommas } from '../../../utils/function'
import CartList from '../../components/CartList'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { addToCartAction, getItemAction, getItemFavAction, removeItemFavAction } from '../../redux/action'
import { objectIsNull } from '../../../utils/function'


const Favorites = ({ navigation, route }) => {
    const itemFavState = useSelector(state => state.itemFav)
    const homeState = useSelector(state => state.user)

    const [allProduct, setAllProduct] = useState([])

    console.log(itemFavState)

    useEffect(() => {
        setAllProduct(itemFavState.response)
    }, [itemFavState])
    useEffect(() => {
        setAllProduct(itemFavState.response)
    }, [])
    const dispatch = useDispatch()

    const onPressFoodItem = (item) => {
        const found = itemFavState.response.some(i => i.id == item.id)
        navigation.navigate('FoodDetail', { item: item, isFavorite: found })
    }
    const onPressFavorite = (item) => {
        if (homeState.response.id) {
            const data = { itemId: item.id, userId: homeState.response.id }
            console.log(data)
            const action = removeItemFavAction(data)
            dispatch(action)
        }
    }
    const addItemToCartHandler = (item) => {
        console.log(item)
        const action = addToCartAction(item)
        dispatch(action)
    }


    if (itemFavState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: '100%', flex: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '3%' }}>
                <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 18 }}>
                    Favorites
                </Text>
            </View>

            <View style={{ width: '100%', flex: 20 }}>


                {!arrayIsEmpty(allProduct) ?
                    <ScrollView
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        // ref={props.reff}
                        // style={props.horizontal ? { paddingVertical: '3%' } : { marginBottom: 30 }}
                        contentContainerStyle={
                            {
                                paddingBottom: '6%',
                            }}
                    >
                        {allProduct.map((item, index) => {
                            return (<TouchableOpacity
                                key={item.id}
                                onPress={() => { onPressFoodItem(item); }}
                                style={{
                                    width: '100%',
                                    // height: windowHeight / 5,
                                    backgroundColor: '#fff',
                                    paddingHorizontal: '3%',
                                }}>
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                    borderBottomColor: colors.grey,
                                    borderBottomWidth: 1,
                                }}>
                                    <Image
                                        source={require('../../../assets/images/honey-mustard-chicken-burger.jpg')}
                                        style={{ height: 120, width: '30%', }}
                                        resizeMode='contain'
                                    />
                                    <View style={{ width: '70%', paddingLeft: '3%' }}>
                                        <View style={{ width: '100%', }}>
                                            <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 16, height: 40, }} numberOfLines={2}>
                                                {item.foodName}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10, borderRightWidth: 1, borderRightColor: colors.grey }}>
                                                <FontAwesome5Icon name={'star'} solid color={'#F5A62E'} size={14} />
                                                <Text style={{ color: colors.grey }}>
                                                    {" "}{item.rating}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10, }}>
                                                <Text style={{ color: colors.grey }}>
                                                    {" "}{numberWithCommas(item.price)} VND
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    addItemToCartHandler(item)
                                                }}
                                                style={{ backgroundColor: colors.default, width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                                                <Text style={{ ...fonts.type1, color: '#fff' }}>
                                                    ADD TO CART
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    onPressFavorite(item)
                                                }}
                                                style={{ justifyContent: 'flex-end', alignItems: 'center', padding: 10, }}>
                                                <FontAwesome5Icon name={'heart'} size={24} color={colors.default} solid={true} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>


                            </TouchableOpacity>)

                        })}
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome5Icon name={'shopping-basket'} size={100} color={colors.default} solid={true} />
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                            <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 20, padding: 20, }}>
                                GIve some love!
                            </Text>
                            <Text style={{ ...fonts.type1, fontSize: 14, textAlign: 'center' }}>
                                They say a heart fills an empty stomach! Tap on the heart to save your favorites food into your Favorites list!
                            </Text>
                        </View>


                    </View>

                }



            </View>
        </SafeAreaView>

    )
}

export default Favorites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    }

})
