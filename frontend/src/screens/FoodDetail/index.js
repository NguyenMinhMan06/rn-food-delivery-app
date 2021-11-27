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
import { addItemFavAction, addToCartAction, getItemAction, removeItemFavAction } from '../../redux/action'
import firestore from '@react-native-firebase/firestore';

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
    ])
    const [isScrollToEnd, setIsScrollToEnd] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPickTime, setModalPickTime] = useState(false)
    const [selectedDelivery, setSelectedDelivery] = useState(1)
    const [datePicker, setDatePicker] = useState(new Date(Date.now()))
    const [date, setDate] = useState(new Date())
    const [isFavorite, setIsFavorite] = useState(route.params.isFavorite)
    const [rating, setRating] = useState(route.params.item.rating)

    // console.log(route.params)
    // console.log(homeState.response)
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
        console.log(itemAdd)
        const action = addToCartAction(itemAdd)
        dispatch(action)
        navigation.navigate('Cart', { timeDelivery: `${date}` })
    }

    const onConfirmDate = (date) => {
        setDate(date)
        setDatePicker(date)
        setModalPickTime(!modalPickTime)
    }
    const [listComment, setListComment] = useState([])

    const getCommentItem = async (isAdd) => {
        try {
            const commentList = []
            await firestore()
                .collection('foods')
                .doc('foodDetail')
                .collection('food')
                .doc(`${route.params.item.id}`)
                .collection('comments')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        const { comment, createAt, userEmail, userName, rating } = doc.data()
                        commentList.push({ comment: comment, createAt: createAt, userEmail, userName: userName, rating: rating })
                    })
                })

            console.log(commentList)
            setListComment(commentList)
            getInfoComment(commentList, isAdd)
        } catch (error) {
            console.log(error)
        }
    }

    const [numComment, setNumComment] = useState(0)
    const [avgRating, setAvgRating] = useState(0)
    const [ratingList, setRatingList] = useState('')


    const getInfoComment = async (commentlist, isAdd) => {
        setNumComment(commentlist.length)
        let rating = {
            oneStar: 0,
            twoStar: 0,
            threeStar: 0,
            fourStar: 0,
            fiveStar: 0,
        }
        let totalRating = 0
        let avgR = 0
        commentlist.map(item => {
            totalRating = totalRating + item.rating
            switch (item.rating) {
                case 1:
                    rating.oneStar = rating.oneStar + 1
                    break;
                case 2:
                    rating.twoStar = rating.twoStar + 1
                    break;
                case 3:
                    rating.threeStar = rating.threeStar + 1
                    break;
                case 4:
                    rating.fourStar = rating.fourStar + 1
                    break;
                case 5:
                    rating.fiveStar = rating.fiveStar + 1
                    break;
                default:
                    break;
            }
        })
        if (commentlist.length != 0) avgR = (totalRating / (commentlist.length)).toFixed(1)
        else avgR = totalRating
        setAvgRating(avgR)
        setRating(avgR)
        setNumComment(commentlist.length)
        setRatingList(rating)

        if (isAdd) {
            try {
                await firestore()
                    .collection('foods')
                    .doc('foodDetail')
                    .collection('food')
                    .doc(`${route.params.item.id}`)
                    .update({
                        rating: avgR
                    }).then(() => {
                        console.log('update rating complete')
                        setCommentContent('')
                        setRatingComment(1)
                        setModalVisibleComment(!modalVisibleComment)
                        const action = getItemAction()
                        dispatch(action)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        // console.log('avg rating', avgR)
        // console.log('cmt legnth', commentlist.length)
        // console.log('rating:', rating)
    }
    // console.log(avgRating)

    useEffect(() => {
        getCommentItem()
    }, [])

    // console.log('comment:', listComment)

    const addCommentItem = async () => {
        if (commentContent == '' || ratingComment == '') {
            alert('Please input your comment')
            return
        }
        try {
            const response = await firestore()
                .collection('foods')
                .doc('foodDetail')
                .collection('food')
                .doc(`${route.params.item.id}`)
                .collection('comments')
                .add({
                    comment: commentContent,
                    createAt: Date.now(),
                    userId: homeState.response.id,
                    userName: homeState.response.name,
                    userEmail: homeState.response.email,
                    rating: ratingComment,
                })
            console.log(response)
            if (response?.id) {
                getCommentItem(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // useEffect(() => {
    //     updateFoodDetail()
    //     // const action = getItemAction()
    //     // dispatch(action)
    // }, [listComment])

    const [modalVisibleComment, setModalVisibleComment] = useState(false)
    const [commentContent, setCommentContent] = useState('')
    const [ratingComment, setRatingComment] = useState(1)




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
                <Image source={route.params.item.image ? { uri: route.params.item.image } : require('../../../assets/images/pizza.jpg')} style={{ width: '100%', height: 220, position: 'absolute', top: 0, }} resizeMode='contain' />
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
                                    defaultRating={Math.round(rating)}
                                />
                                <Text style={{ ...fonts.type1, paddingLeft: 4, }}>
                                    {rating} ({numComment} Comment(s))
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
                            {route.params.item.description}
                        </Text>
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
                isSelectedTab == 2 ?
                    < View style={{ flex: 2, marginBottom: 60, }}>
                        <CommentList numComment={numComment} avgRating={avgRating} listComment={listComment} ratingList={ratingList} />
                    </View>
                    : null
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
                    <TouchableOpacity onPress={() => { setModalVisibleComment(!modalVisibleComment) }} style={{ width: '94%', marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                        <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                            Add comment
                        </Text>
                    </TouchableOpacity>
                }
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleComment}
                onRequestClose={() => {
                    setModalVisibleComment(!modalVisibleComment)
                }}
            >
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', height: windowHeight, backgroundColor: modalVisibleComment ? 'rgba(0,0,0,0.5)' : '' }}>
                    <View style={{ flex: 1, }}>

                    </View>
                    <View style={{ flex: 1, backgroundColor: '#fff', width: '96%' }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3' }}>
                            <Text style={{ ...fonts.type1, fontSize: 24, fontWeight: 'bold' }}>
                                Comment and rating
                            </Text>
                            <TouchableOpacity style={{ position: 'absolute', right: '3%' }} onPress={() => { setModalVisibleComment(!modalVisibleComment) }}>
                                <AntDesign name={'close'} size={26} color={'#8f9094'} />
                            </TouchableOpacity>

                        </View>
                        <View style={{}}>
                            <View style={{ padding: 10, }}>
                                <View style={{
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#dfdee4',
                                    borderRadius: 6,
                                    color: '#000',
                                    fontSize: 14,
                                    paddingLeft: 14
                                }}>
                                    <TextInput
                                        placeholder="Comment"
                                        value={commentContent}
                                        onChangeText={setCommentContent}
                                    />
                                </View>

                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, }}>
                                <AirbnbRating
                                    count={5}
                                    size={28}
                                    showRating={false}
                                    onFinishRating={(rating) => { setRatingComment(rating) }}
                                    defaultRating={ratingComment}
                                    ratingContainerStyle={{ alignItems: 'flex-start' }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { addCommentItem() }} style={{ width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.default, paddingVertical: 10, borderRadius: 10, }}>
                                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>

                    </View>
                    <View style={{ flex: 1, }}>

                    </View>

                </View>

            </Modal>

        </View >

    )
}

export default FoodDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})
