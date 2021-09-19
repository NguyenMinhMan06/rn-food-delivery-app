import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { addToCartAction, getUserAction, logOutAction } from '../../redux/action'
import auth from '@react-native-firebase/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { categoryList, listSelection } from '../../../assets/Data/FlatlistCategory'
import { arrayIsEmpty } from '../../../utils/function'


const Home = ({ navigation }) => {
    // const homeState = useSelector(state => state ? state.login.response ? state.login.response : state.register.response : null)
    const homeState = useSelector(state => state.user.response)
    console.log('my state user', homeState)
    const [isLoading, setIsLoading] = useState(true)
    const [idSelected, setIdSelected] = useState(1)
    const dispatch = useDispatch()

    const logOutHandler = () => {
        const action = logOutAction()
        dispatch(action)
    }

    const onPressFoodItem = (item) => {
        const action = addToCartAction(item)
        dispatch(action)
    }

    useEffect(() => {
        if (homeState) {
            setIsLoading(false)
        }
    }, [homeState])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{
                width: '100%',
                flex: 1,
                borderBottomWidth: 1,
                borderColor: '#00000066'
            }}>
                <Text style={{ ...fonts.type1, paddingLeft: '3%', paddingVertical: '1%' }}>Delivery to:</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: '3%'

                }}>
                    <FontAwesome5Icon style={{ paddingRight: '2%' }} name={'map-marker-alt'} size={16} color={'#e32f45'} />
                    <Text style={{ width: '90%', ...fonts.type1, fontSize: 16 }} numberOfLines={1}>394, KP.Đông Tân, thị xã Dĩ An, huyện Dĩ An, TP.Dĩ An, tỉnh Bình Dương</Text>
                    <Image style={{ width: 24, height: 24, }} resizeMode={'contain'} source={require('../../../assets/icons/icon_forward.png')} />
                </View>
            </TouchableOpacity>
            <View style={{ flex: 12, width: '100%', }}>
                <Text style={{ paddingLeft: '3%', ...fonts.type1, fontSize: 18, paddingTop: 10 }}>
                    Categories
                </Text>
                {!arrayIsEmpty(categoryList) && (
                    <View
                        style={{ height: windowHeight / 8 }}
                    >
                        <TabItemCat
                            data={categoryList}
                            onPress={itemId => {
                                console.log(itemId)
                                setIdSelected(itemId)
                            }}
                        />
                    </View>
                )}
                {!arrayIsEmpty(listSelection) && (
                    <View style={{ flex: 1 }}>
                        <TabItemFood
                            idSelected={idSelected}
                            data={listSelection}
                            onPress={item => {
                                onPressFoodItem(item)
                            }}
                            homeState={homeState}
                        />
                    </View>
                )}


            </View>

        </SafeAreaView >

    )
}

//////////////////////////////////////
//
//         TAB ITEM CATEGORY
//
/////////////////////////////////////

const TabItemCat = (props) => {
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    props.onPress(item.id)
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
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: '3%', height: windowHeight / 10 }}
            contentContainerStyle={{ paddingLeft: '3%', height: windowHeight / 10 }}
            keyExtractor={item => `key-${item.id}`} />
    )
}


//////////////////////////////////////
//
//         TAB ITEM FOOD
//
/////////////////////////////////////

const TabItemFood = (props) => {
    const renderItem = ({ item, index }) => {
        if (item.idType === props.idSelected)
            return (
                <TouchableOpacity
                    onPress={() => { props.onPress(item) }}
                    style={{
                        width: windowWidth / 4,
                        height: windowHeight / 10,
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#000',
                        marginBottom: 10,
                    }}>
                    <Text>
                        {item.name}
                    </Text>
                </TouchableOpacity>)
    }
    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            style={{ paddingVertical: '3%', }}
            contentContainerStyle={{ paddingLeft: '3%', }}
            keyExtractor={item => `keyTabItem-${item.id}`}
            ListFooterComponent={<View>
                <Text>Welcome {props.homeState._data.name ? props.homeState._data.name : props.homeState._data.email}</Text>
                <Text>Welcome to homePage</Text>

                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('Food Detail') }}>
                        <Text>
                            Move to Detail
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { logOutHandler() }}>
                        <Text>
                            Log out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>}
        />
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    }

})
