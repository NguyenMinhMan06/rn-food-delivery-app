import React, { useEffect, useState } from 'react'
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../assets/style'
import ListTabSelection from '../../components/ListTabSelection'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { addDays, arrayIsEmpty, dateNow, numberWithCommas, objectIsNull } from '../../../utils/function'
import CommentList from '../../components/CommentList'
import { TextInput } from 'react-native-gesture-handler'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { windowHeight } from '../../../utils/Dimentions'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { addItemFavAction, addToCartAction, removeItemFavAction } from '../../redux/action'
import firestore from '@react-native-firebase/firestore';



const COMMENTDATA = {
    numComment: 12,
    avgRating: 3.5,
    rating: {
        oneStar: 2,
        twoStar: 2,
        threeStar: 5,
        fourStar: 10,
        fiveStar: 4,
    },
    commentArray: [
        {
            username: 'Man',
            commentDate: '1',
            commentDetail: 'Cillum amet Lorem est laborum magna esse ex culpa laboris.',
            rating: 3
        },
        {
            username: 'Man',
            commentDate: '2',
            commentDetail: 'Ad ad in adipisicing consequat aliqua.',
            rating: 4
        },
        {
            username: 'Man',
            commentDate: '3',
            commentDetail: 'Ut labore cillum anim sit amet ipsum anim nostrud veniam mollit laboris officia reprehenderit deserunt.',
            rating: 2
        },
        {
            username: 'Man',
            commentDate: '4',
            commentDetail: 'Esse esse enim sunt commodo ex exercitation occaecat quis.',
            rating: 5
        },
        {
            username: 'Man',
            commentDate: '5',
            commentDetail: 'Officia ad aliqua aliquip anim deserunt sint duis.',
            rating: 3
        },
        {
            username: 'Man',
            commentDate: '6',
            commentDetail: 'Magna et voluptate duis aliquip voluptate.',
            rating: 3
        },
        {
            username: 'Man',
            commentDate: '7',
            commentDetail: 'Do anim reprehenderit reprehenderit duis cillum exercitation.',
            rating: 1
        },
        {
            username: 'Man',
            commentDate: '8',
            commentDetail: 'Culpa proident ex deserunt eu tempor sunt occaecat officia.',
            rating: 2
        },
        {
            username: 'Man',
            commentDate: '9',
            commentDetail: 'Elit tempor non incididunt eu.',
            rating: 4
        },
        {
            username: 'Man',
            commentDate: '10',
            commentDetail: 'Occaecat labore ea aute officia id.',
            rating: 5
        },
        {
            username: 'Man',
            commentDate: '11',
            commentDetail: 'Labore Lorem in cupidatat deserunt non do minim pariatur amet minim excepteur velit ex nulla.',
            rating: 3
        },
        {
            username: 'Man',
            commentDate: '22',
            commentDetail: 'Velit non nisi excepteur do magna labore dolor ullamco fugiat.',
            rating: 4
        },
    ]
}

const FoodDetail = ({ navigation, route }, props) => {
    const homeState = useSelector(state => state.user)
    const itemFavState = useSelector(state => state.itemFav)

    const [isSelectedTab, setIsSelectedTab] = useState(1)
    const [listTab, setListTab] = useState([
        {
            id: "1",
            title: "Detail",
            isSelected: true
        },
        {
            id: "2",
            title: "Review",
            isSelected: false
        },
        {
            id: "3",
            title: "Location",
            isSelected: false
        },
    ])
    const [isScrollToEnd, setIsScrollToEnd] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPickTime, setModalPickTime] = useState(false)
    const [selectedDelivery, setSelectedDelivery] = useState(1)
    const [datePicker, setDatePicker] = useState(new Date(Date.now()))
    const [date, setDate] = useState(new Date())
    const [isFavorite, setIsFavorite] = useState(route.params.isFavorite)

    // console.log(route.params)
    // console.log('state on food detail: ', itemFavState)

    const dispatch = useDispatch()
    const onPressTab = (id) => {
        let list = listTab.map((item) => {
            if (item.id == id) {
                return Object.assign({}, item, { isSelected: true })
            } else {
                return Object.assign({}, item, { isSelected: false })
            }
        })
        setListTab(list)
        console.log(list)
        setIsSelectedTab(id)
    }


    const onPressFavorite = (item) => {
        // console.log(item)
        if (isFavorite) {
            if (homeState.response.id) {
                setIsFavorite(!isFavorite)
                const data = { itemId: item.id, userId: homeState.response.id }
                console.log(data)
                const action = removeItemFavAction(data)
                dispatch(action)
            }
        }
        else {
            if (homeState.response.id) {
                setIsFavorite(!isFavorite)
                const data = { item, userId: homeState.response.id }
                console.log(data)
                const action = addItemFavAction(data)
                dispatch(action)
            }
        }
    }
    const addItemToCartHandler = () => {
        const itemAdd = { item: route.params.item, userId: homeState.response.id }
        const action = addToCartAction(itemAdd)
        dispatch(action)
        navigation.navigate('Cart', { timeDelivery: moment(date).format('lll') })
    }

    const onConfirmDate = (date) => {
        setDate(date)
        setDatePicker(date)
        setModalPickTime(!modalPickTime)
    }

    const RenderTopBar = ({ navigation }) => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: '3%' }}>
                <TouchableOpacity style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                    onPress={() => { navigation.goBack() }}
                >
                    <FontAwesome5 name={'chevron-left'} size={24} color="#000"

                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', width: 80, justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => { onPressFavorite(route.params.item) }}
                    >
                        <FontAwesome5 name={'heart'} size={24} color={colors.default} solid={isFavorite}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                        onPress={() => { navigation.navigate('Cart') }}
                    >
                        <FontAwesome5 name={'shopping-cart'} size={24} color="#000"

                        />
                    </TouchableOpacity>
                </View>


            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView
                stickyHeaderIndices={[0]}
                style={{ flex: 1 }}
            >

                <RenderTopBar navigation={navigation} />
                <Image source={require('../../../assets/images/pizza.jpg')} style={{ width: '100%', height: 220, position: 'absolute', top: 0, }} resizeMode='cover' />
                <View style={{ height: 160, }}>
                </View>
            </ScrollView>
            <ListTabSelection {...props} listTab={listTab} onPressTab={(id) => onPressTab(id)} />


            {isSelectedTab == 1 &&
                <View style={{
                    flex: 2,
                    width: '100%',
                    marginBottom: 60,

                }}>
                    <View style={{
                        paddingHorizontal: '3%',
                        borderBottomWidth: 1,
                        borderColor: colors.grey
                    }}>
                        <View style={{ paddingBottom: 10, }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold', paddingVertical: 4, }}>
                                {route.params.item.foodName}
                            </Text>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
                                    defaultRating={5}
                                    size={16}
                                    showRating={false}
                                    isDisabled={true}
                                    defaultRating={Math.round(route.params.item.rating)}
                                />
                                <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                    {route.params.item.rating} (99+ Comments)
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {route.params.item.desription &&
                        <View style={{
                            padding: '3%',
                            borderBottomWidth: 1,
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 16, }} numberOfLines={3}>
                                {route.params.item.desription}
                            </Text>
                        </View>
                    }
                    <View style={{
                        padding: '3%',
                        borderBottomWidth: 1,
                        borderColor: colors.grey
                    }}>
                        <Text style={{ ...fonts.type1, fontSize: 16, }} numberOfLines={3}>
                            Aliquip officia aliquip laboris nostrud.
                        </Text>
                    </View>



                    <View style={{ borderBottomWidth: 1, borderColor: colors.grey, padding: '3%' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name={'location-arrow'} size={20} style={{ paddingRight: 10 }} color={'#1a73e8'} />
                            <Text style={{ ...fonts.type1, fontSize: 16, }}>
                                137, 11 Street, Linh Xuan, Thu Duc, TP HCM Ea ea eu ullamco pariatur aute dolore sint aute sint commodo.
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.grey, padding: '3%' }}>
                        <FontAwesome5 name={'dollar-sign'} size={20} style={{ paddingRight: 20 }} color={'#1a73e8'} />

                        <Text style={{ ...fonts.type1, fontSize: 16, }}>
                            {numberWithCommas(route.params.item.price)} VND
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.grey, padding: '3%' }}>
                        <View style={{ width: '80%' }}>
                            <Text style={{ ...fonts.type1, fontWeight: 'bold', fontSize: 18, paddingVertical: 6 }}>
                                Standal delivery
                            </Text>
                            <Text style={{ ...fonts.type1, fontSize: 16, paddingVertical: 4 }}>
                                Order will be delivery on
                            </Text>
                            <Text style={{ ...fonts.type1, fontSize: 16, paddingVertical: 4 }}>
                                {moment(date).format('lll')}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{}}>
                            <Text style={{ ...fonts.type1, color: colors.default }}>
                                Change
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View >
            }
            <Modal
                animationType="slide"
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
                                Change
                            </Text>
                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => setModalVisible(!modalVisible)}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ padding: '3%' }}>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, }}
                                onPress={() => {
                                    setSelectedDelivery(1)
                                    setDate(dateNow())
                                    setModalVisible(!modalVisible)
                                }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ paddingRight: 10, }}>
                                        {selectedDelivery === 1 ?
                                            <MaterialIcons name={'radio-button-on'} size={24} color={colors.default} />
                                            :
                                            <MaterialIcons name={'radio-button-off'} size={24} />}
                                    </View>
                                    <Text style={{ ...fonts.type1, fontSize: 20, }}>
                                        Delivery now
                                    </Text>
                                </View>
                                {selectedDelivery === 1 ? null : <MaterialIcons name={'chevron-right'} size={30} />}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, }}
                                onPress={() => {
                                    setSelectedDelivery(2)
                                    setModalPickTime(!modalPickTime)
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ paddingRight: 10, }}>
                                        {selectedDelivery === 2 ?
                                            <MaterialIcons name={'radio-button-on'} size={24} color={colors.default} />
                                            :
                                            <MaterialIcons name={'radio-button-off'} size={24} />}
                                    </View>
                                    <Text style={{ ...fonts.type1, fontSize: 20, }}>
                                        Schedule Delivery
                                    </Text>
                                </View>
                                {selectedDelivery === 2 ? null : <MaterialIcons name={'chevron-right'} size={30} />}

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40, }}
                                onPress={() => {
                                    setSelectedDelivery(3)
                                    setModalPickTime(!modalPickTime)
                                    setModalVisible(!modalVisible)
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ paddingRight: 10, }}>
                                        {selectedDelivery === 3 ?
                                            <MaterialIcons name={'radio-button-on'} size={24} color={colors.default} />
                                            :
                                            <MaterialIcons name={'radio-button-off'} size={24} />}
                                    </View>
                                    <Text style={{ ...fonts.type1, fontSize: 20, }}>
                                        Pick Up
                                    </Text>
                                </View>
                                {selectedDelivery === 3 ? null : <MaterialIcons name={'chevron-right'} size={30} />}

                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPickTime}
                onRequestClose={() => {
                    setModalPickTime(!modalPickTime);
                }}>
                <View style={{ justifyContent: 'flex-end', height: windowHeight, backgroundColor: modalPickTime ? 'rgba(0,0,0,0.5)' : '' }}>
                    <View style={{ height: windowHeight / 2, backgroundColor: '#fff', }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3' }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold' }}>
                                Pick time
                            </Text>
                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => {
                                setModalPickTime(!modalPickTime)
                                setDatePicker(date)
                            }}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                            <DatePicker
                                androidVariant="nativeAndroid"
                                date={datePicker}
                                onDateChange={setDatePicker}
                                maximumDate={addDays(dateNow(), 2)}
                                minimumDate={dateNow()}
                            />
                        </View>
                        <View style={{ position: 'absolute', bottom: 20, width: '94%', marginHorizontal: '3%' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    onConfirmDate(datePicker)
                                }}
                                style={{ backgroundColor: colors.default, justifyContent: 'center', alignItems: 'center', borderRadius: 10, paddingVertical: 10, }}

                            >
                                <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </Modal>
            {
                isSelectedTab == 2 &&
                <View style={{ flex: 2, marginBottom: 60, }}>
                    <CommentList data={COMMENTDATA} />
                </View>


            }
            {
                isSelectedTab == 3 &&
                <View style={{
                    flex: 2,
                    paddingBottom: 60,
                }}>

                </View>

            }


            <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', bottom: 10, width: '100%', }}>
                {isSelectedTab == 1 &&

                    <TouchableOpacity onPress={() => { addItemToCartHandler() }} style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                }

                {isSelectedTab == 2 &&
                    <View style={{ flexDirection: 'row', backgroundColor: colors.default, width: '94%', marginHorizontal: '3%', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, }}>
                        <TextInput style={{ paddingLeft: 10, width: '90%', justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 10, color: '#ffffff', ...fonts.type1, fontSize: 16, }} placeholderTextColor="#ffffff" placeholder='Comment' onFocus={() => { setIsScrollToEnd(true) }}>

                        </TextInput>
                        <TouchableOpacity>
                            <FontAwesome5 name={'paper-plane'} size={20} style={{ paddingRight: 5 }} color={'#ffffff'} />
                        </TouchableOpacity>
                    </View>

                }
            </View>





        </View >

    )
}

export default FoodDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
