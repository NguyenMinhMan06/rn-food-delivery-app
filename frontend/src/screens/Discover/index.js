import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../assets/style'
import { TextInput } from 'react-native-gesture-handler'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { arrayIsEmpty } from '../../../utils/function'
import CartList from '../../components/CartList'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { getItemAction, getItemFavAction } from '../../redux/action'
import { objectIsNull } from '../../../utils/function'
const Discover = ({ navigation, route }) => {
    const itemState = useSelector(state => state.item)
    const homeState = useSelector(state => state.user)
    const itemFavState = useSelector(state => state.itemFav)

    const [allProduct, setAllProduct] = useState(null)
    const [productFiltered, setProductFiltered] = useState([])
    const [search, setSearch] = useState('')
    console.log(homeState.response.id)

    useEffect(() => {
        if (!arrayIsEmpty(itemState.response)) {
            setAllProduct(itemState.response)
            setProductFiltered(itemState.response)
        }
    }, [itemState])

    useEffect(() => {
        if (!objectIsNull(route.params)) {
            const newData = itemState.response.filter(i => {
                return i.catName.toLowerCase().includes(route.params.typeName.toLowerCase())
            })
            setProductFiltered(newData)
            setSearch(route.params.typeName)
        }
    }, [route.params])

    const searchProductFilter = (textToSearch) => {
        if (textToSearch) {
            const newData = allProduct.filter(i => {
                return i.foodName.toLowerCase().includes(textToSearch.toLowerCase()) || i.catName.toLowerCase().includes(textToSearch.toLowerCase())
            })
            setProductFiltered(newData)
            setSearch(textToSearch)
        }
        else {
            setProductFiltered(allProduct)
            setSearch(textToSearch)
        }

    }

    const onPressFoodItem = (item) => {
        const found = itemFavState.response.some(i => i.id == item.id)
        navigation.navigate('FoodDetail', { item: item, isFavorite: found })
    }

    if (itemState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: '94%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 1,
                flexDirection: 'row',
                marginVertical: 10

            }}>
                <FontAwesome5Icon name={'search'} size={20} />
                <TextInput
                    value={search}
                    style={{
                        paddingLeft: 10,
                        width: '90%'
                    }}
                    placeholder={'Food, cake, desert,...'}
                    onChangeText={(value) => { searchProductFilter(value) }}
                />
            </View>

            {/* <Text style={{ ...fonts.type1, color: colors.grey }}>Danh mục hàng đầu</Text> */}
            <View style={{ width: '100%' }}>

                {!arrayIsEmpty(allProduct) && (

                    <CartList data={productFiltered} onPressFoodItem={onPressFoodItem} seeMore={false} horizontal={false}
                        styleCartItem={{
                            width: '100%',
                            height: windowHeight / 2.5,
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.grey,
                            marginBottom: 20,

                        }}
                    />
                )}
            </View>
        </SafeAreaView>

    )
}

export default Discover

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    }

})
