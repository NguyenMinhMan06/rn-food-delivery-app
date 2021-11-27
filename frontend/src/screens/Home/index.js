import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Animated, Keyboard, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors, fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { categoryList, foodList, resLocation } from '../../../assets/Data/FlatlistCategory'
import { arrayIsEmpty, objectIsNull } from '../../../utils/function'
import Carousel from 'react-native-snap-carousel'
import CartList from '../../components/CartList'
import ListTabSelection from '../../components/ListTabSelection'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import polyline from '@mapbox/polyline'
import SearchDropDown from '../../components/SearchDropDown'
import auth from '@react-native-firebase/auth';

import { foodItem } from '../../redux/middleware/Firestore'
import { addLocationUserAction, getItemAction, getItemCartAction, getItemCatAction, getItemFavAction, getLocationListAction } from '../../redux/action'
import AntDesign from 'react-native-vector-icons/AntDesign'




const Home = ({ navigation }) => {
    const homeState = useSelector(state => state.user)
    const itemState = useSelector(state => state.item)
    const catState = useSelector(state => state.itemCat)
    const itemFavState = useSelector(state => state.itemFav)
    // const cartItem = useSelector(state => state.cartItem)
    const locList = useSelector(state => state.locList)

    const [isSelectedTab, setIsSelectedTab] = useState(1)
    const [listTab, setListTab] = useState([
        {
            id: "1",
            title: "Pick-up",
            isSelected: true
        },
        {
            id: "2",
            title: "Delivery",
            isSelected: false,
        },
    ])
    const [pin, setPin] = useState({
        latitude: null,
        longitude: null
    })
    const [desLocation, setDesLocation] = useState({
        desLatitude: null,
        desLongitude: null,
    })
    const [locations, setLocations] = useState(resLocation)
    const [granted, setGranted] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    const _map = useRef(null)
    const _scrollView = useRef(null)
    const ref = useRef(null)

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

    // run to fetch data
    useEffect(() => {
        if (auth().currentUser?.phoneNumber == null) {
            setModalVisible(true)
        }
        locationPermission()
        const action1 = getItemAction()
        const action2 = getItemCatAction()
        const action3 = getLocationListAction()
        dispatch(action1)
        dispatch(action2)
        dispatch(action3)
    }, [])

    async function mergeCoords() {
        const {
            latitude,
            longitude,
        } = pin
        const { desLatitude, desLongitude } = desLocation

        const hasStartAndEnd = latitude !== null && desLatitude !== null

        if (hasStartAndEnd) {
            const concatStart = `${latitude},${longitude}`
            const concatEnd = `${desLatitude},${desLongitude}`
            try {
                const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${concatStart}&destination=${concatEnd}&key=AIzaSyDqKrIUwkzhnJ9HZuIp9mxYP_pBD1XQTH8`)
                const respJson = await resp.json();
                console.log(`RESPJSONNNNNNNNNNNN`, respJson)
                const response = respJson.routes[0]
                const distanceTime = response.legs[0]
                const distance = distanceTime.distance.text
                const time = distanceTime.duration.text
                const points = polyline.decode(respJson.routes[0].overview_polyline.points);
                const coords = points.map(point => {
                    return {
                        latitude: point[0],
                        longitude: point[1]
                    }
                })
                // console.log(coords)
                setPin({ ...pin, coords: coords, })
                setDesLocation({ ...desLocation, distance: distance, time: time, })
            } catch (error) {
                console.log('Error: ', error)
            }
        }
    }

    const onPressMarker = (mapEventData, locations) => {
        const markerID = mapEventData._targetInst.return.key;
        console.log(markerID)
        let x = (markerID * (windowWidth * 0.8)) + (markerID * 20);

        _scrollView.current.scrollTo({ x: x, y: 0, animated: false });
    }

    const onPressSearchDropDown = (item) => {
        const markerID = locations.findIndex((marker) => marker.address == item.address)
        let x = (markerID * (windowWidth * 0.8)) + (markerID * 20);
        console.log(x)
        setAnimatedValue(x)
        _scrollView.current.scrollTo({ x: x, y: 0, animated: false })
    }

    async function locationPermission() {
        try {
            console.log('take location permit')
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log("You can use the location")
                setGranted(true)
                Geolocation.getCurrentPosition((pos) => {
                    console.log('pos:              ', pos)
                    setPin({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    })
                }, (error) => {
                    console.log('err: ', error)
                })
            }
            else {
                setGranted(false)
                console.log("Location permission denied")
            }
        }
        catch (err) {
            console.warn(err)
        }
    }

    const [animatedValue, setAnimatedValue] = useState(0)
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(animatedValue);

    //check status of map run like a loop
    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / (windowWidth * 0.8) + 0.3); // animate 30% away from landing on the next item
            if (index >= locations.length) {
                index = locations.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            console.log(`index:${index}, mapindex: ${mapIndex}, loc length: ${locations.length}, value: ${value}`)
            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coords } = locations[index];
                    _map.current.animateToRegion(
                        {
                            ...coords,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                        350
                    )
                }
            }, 10)
        })
    })

    // calculate the time and distance when user select location
    useEffect(() => {
        mergeCoords()
    }, [desLocation.desLatitude || desLocation.desLongitude])

    const interpolations = locations.map((marker, index) => {
        const inputRange = [
            (index - 1) * windowWidth * 0.8,
            index * windowWidth * 0.8,
            ((index + 1) * windowWidth * 0.8),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    })

    const onPressTracking = (marker, index) => {
        setDesLocation({ desLatitude: marker.coords.latitude, desLongitude: marker.coords.longitude })
        setAnimatedValue(mapAnimation.__getValue())
        // console.log(mapAnimation.__getValue())
    }

    const [listFood, setListFood] = useState(null)
    const [listCategory, setListCategory] = useState(null)
    const [idSelected, setIdSelected] = useState(-1)
    const [listSelection, setListSelection] = useState(null)

    // run after dispatch action complete
    useEffect(() => {
        if (catState.response && itemState.response) {
            setListCategory(catState.response)
            setListFood(itemState.response)
            setListSelection(itemState.response)
            // setFavList(itemFavState.response)
        }
    }, [catState, itemState])

    const onPressFoodItem = (item) => {
        // console.log('homeitem: ', item)
        const found = itemFavState.response.some(i => i.id == item.id)
        navigation.navigate('FoodDetail', { item: item, isFavorite: found })
    }

    useEffect(() => {
        if (!homeState.isLoading) {
            const action = getItemFavAction(homeState.response.id)
            // const action1 = getItemCartAction(homeState.response.id)
            dispatch(action)
            // dispatch(action1)
            if (homeState.response.coords?.latitude != null) {
                setPin({
                    ...pin,
                    longitude: homeState.response.coords.longitude,
                    latitude: homeState.response.coords.latitude
                })
            }
            else {
                const data = { coords: { latitude: pin.latitude, longitude: pin.longitude }, userId: homeState.response.id }
                console.log(data)
                const action2 = addLocationUserAction(data)
                dispatch(action2)
            }
        }
    }, [homeState])

    // console.log(homeState)
    // console.log(itemFavState.response)
    // console.log('fav list: ', favList)


    //check category of user on press, will render the other food item
    useEffect(() => {
        if (!arrayIsEmpty(listFood)) {
            if (idSelected != -1) {
                const newList = [];
                const indexId = listCategory[idSelected].id
                listFood.map(item => {
                    if (item.catId === indexId) return newList.push(item)
                })
                setListSelection(newList)
            }
            else {
                setListSelection(listFood)
            }

            // setFlag(true)
        }
    }, [idSelected])

    const [filtered, setFiltered] = useState(locations)
    const [searching, setSearching] = useState(false)
    const [onChangeText, setOnChangeText] = useState('')
    const onSearch = (text) => {
        setOnChangeText(text)

        if (text) {
            setSearching(true)
            const temp = text.toLowerCase()

            const tempList = locations.filter(item => {
                return item.name.toLowerCase().includes(temp)
            })
            setFiltered(tempList)
        }
        else {
            setSearching(false)
            setFiltered(locations)
        }

    }

    // console.log(cartItem)

    const __scrollView = useRef(null)
    if (itemState.isLoading || catState.isLoading || homeState.isLoading || locList.isLoading) {
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
            <ListTabSelection listTab={listTab} onPressTab={(id) => onPressTab(id)} />
            {isSelectedTab == 1 &&
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{
                        flex: 1,
                    }}
                        disabled
                        onPress={() => navigation.navigate("Address", { granted: granted, pin: pin })}
                    >
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            flex: 1,
                            width: '90%',
                            marginHorizontal: '3%'

                        }}>
                            {/* <FontAwesome5Icon style={{ paddingRight: '2%' }} name={'map-marker-alt'} size={20} color={'#e32f45'} /> */}
                            <Text style={{ ...fonts.type1, fontSize: 16 }} numberOfLines={1}>Right now ● <Text style={{ fontWeight: 'bold' }}> TP. Ho Chi Minh</Text>  </Text>

                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                        <CarouselAutoPlay
                            reff={ref}
                            data={[{ id: 1, title: 'Frenzy Friday', des: 'Freeship for drink deals above', des2: ' 80.000 VND' },
                            { id: 2, title: 'Black Friday', des: 'Free ship for all deal and 15% OFF' }]
                            }
                        />
                    </View>
                    <View style={{ flex: 15, width: '100%', }}>

                        {!arrayIsEmpty(listCategory) && (
                            <View
                                style={{ height: windowHeight / 12 }}
                            >
                                <ScrollView
                                    style={{ paddingVertical: '3%', height: windowHeight / 20 }}
                                    contentContainerStyle={{ paddingLeft: '3%', height: windowHeight / 6 }}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}

                                >
                                    <TouchableOpacity
                                        key={-1}
                                        onPress={() => {
                                            setIdSelected(-1)
                                            // setFlag(false)
                                        }}
                                        style={{
                                            width: windowWidth / 5,
                                            height: windowHeight / 20,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderColor: colors.default,
                                            marginRight: 20,
                                            paddingBottom: 10,
                                            borderBottomWidth: -1 == idSelected ? 1 : null
                                        }}>
                                        {/* <Image source={item.img} style={{width:'80%', height:'80%', }} resizeMode={'contain'} /> */}
                                        <Text style={{ color: -1 == idSelected ? colors.default : colors.grey }}>
                                            Total
                                        </Text>
                                    </TouchableOpacity>
                                    {listCategory.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={item.id}
                                                onPress={() => {
                                                    setIdSelected(index)
                                                    __scrollView.current.scrollTo({ x: 0, y: 0, animated: false });
                                                    // setFlag(false)
                                                }}
                                                style={{
                                                    width: windowWidth / 5,
                                                    height: windowHeight / 20,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderColor: colors.default,
                                                    marginRight: 20,
                                                    paddingBottom: 10,
                                                    borderBottomWidth: index == idSelected ? 1 : null
                                                }}>
                                                {/* <Image source={item.img} style={{width:'80%', height:'80%', }} resizeMode={'contain'} /> */}
                                                <Text style={{ color: index == idSelected ? colors.default : colors.grey }}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </ScrollView>
                            </View>
                        )}
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: '2%' }}>
                            <Text style={{ width: '75%', paddingLeft: '3%', ...fonts.type1, fontSize: 20, }}>
                                Recommended foods
                            </Text>
                            <TouchableOpacity style={{ width: '25%', paddingRight: '3%', justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => { navigation.navigate('Discover', { typeName: (idSelected == -1) ? '' : listCategory[idSelected].name }) }}>
                                <Text style={{ ...fonts.type1, fontSize: 14, color: 'red', borderBottomWidth: 1, borderColor: 'red' }}>
                                    View all({listSelection ? listSelection.length : -1})
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {!arrayIsEmpty(listSelection) && (
                            <View style={{ flex: 1 }}>
                                <CartList reff={__scrollView} data={listSelection} onPressFoodItem={onPressFoodItem} seeMore={true} horizontal={true} />
                            </View>
                        )}
                    </View>
                </View>
            }
            {
                isSelectedTab == 2 &&
                    granted ? pin.latitude && pin.longitude &&
                <View style={styles.containerMap}>
                    <MapView
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: pin.latitude,
                            longitude: pin.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}

                    >
                        <Marker
                            coordinate={{
                                latitude: pin.latitude,
                                longitude: pin.longitude
                            }}
                        >
                            <FontAwesome5Icon name={'male'} size={20} color={'blue'} />
                        </Marker>
                        {locations.map((marker, index) => {
                            const scaleStyle = {
                                transform: [
                                    {
                                        scale: interpolations[index].scale,
                                    },
                                ],
                            };
                            return (
                                <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: marker.coords.latitude,
                                        longitude: marker.coords.longitude
                                    }}
                                    title={desLocation.desLatitude == marker.coords.latitude ? `${desLocation.distance}, time: ${desLocation.time}` : null}
                                    onPress={(e) => { onPressMarker(e, marker) }}
                                >
                                    <Animated.View style={[styles.markerWrap]}>
                                        <Animated.Image
                                            source={require('../../../assets/images/map_marker.png')}
                                            style={[styles.marker, scaleStyle]}
                                            resizeMode="cover"
                                        />

                                    </Animated.View>
                                </Marker>
                            )
                        }
                        )}
                        {pin.coords &&
                            <Polyline strokeWidth={2} strokeColor="red" coordinates={pin.coords} />
                        }

                    </MapView>
                    <View style={styles.searchBox}>
                        <TextInput
                            placeholder="Search here"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            style={{ flex: 1, padding: 0 }}
                            onChangeText={onSearch}
                            value={onChangeText}
                        />
                        <TouchableOpacity
                            onPress={() => { { Keyboard.dismiss() } }}

                        >
                            <FontAwesome5Icon name="search" size={20} />
                        </TouchableOpacity>
                    </View>
                    {
                        searching &&
                        <SearchDropDown
                            onPressItem={(item) => {
                                setOnChangeText(item.name)
                                onPressSearchDropDown(item)
                                setSearching(false)
                            }}
                            dataSource={filtered} />
                    }

                    <Animated.ScrollView
                        ref={_scrollView}
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollView}
                        pagingEnabled
                        snapToInterval={windowWidth * 0.8 + 20}
                        snapToAlignment="center"
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: mapAnimation,
                                        }
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}

                    >
                        {locations.map((marker, index) => (
                            <View style={styles.card} key={index}>
                                <Image
                                    source={{ uri: marker.image_url }}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View
                                    style={styles.textContent}
                                >
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                                    <Text numberOfLines={2} style={{ ...styles.cardDescription, height: 30, }}>{marker.address}</Text>
                                    <View style={styles.button}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                onPressTracking(marker, index)
                                            }}
                                            style={{
                                                ...styles.signIn,
                                                borderColor: colors.default,
                                                borderWidth: 1
                                            }}
                                        >
                                            <Text style={{
                                                ...styles.textSign,
                                                color: colors.default
                                            }}>Tracking now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        )
                        )}
                    </Animated.ScrollView>
                </View>
                    :
                    <View style={{ ...styles.containerMap, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...fonts.type1, paddingBottom: 10, }}>
                            Please grant us permission to use your location
                        </Text>
                        <TouchableOpacity style={{ padding: 10, backgroundColor: colors.default, }} onPress={() => { locationPermission() }}>
                            <Text style={{ ...fonts.type1, color: '#fff', fontSize: 18, }}>
                                Press here to give us permission
                            </Text>
                        </TouchableOpacity>
                    </View>

            }
            <Modal
                transparent={true}
                visible={modalVisible}

            >
                <View style={{ justifyContent: 'flex-end', height: windowHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: modalVisible ? 'rgba(0,0,0,0.5)' : '' }}>
                    <View style={{
                        height: windowHeight / 6,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        width: windowWidth / 1.5
                    }}>
                        <View style={{
                            width: '100%', justifyContent: 'center', alignItems: 'center', padding: '3%', borderBottomWidth: 1, borderColor: '#adaba3'
                        }}>
                            <Text style={{ ...fonts.type1, fontSize: 20, fontWeight: 'bold' }}>
                                Confirm your information
                            </Text>
                        </View>
                        <View style={{
                            width: '100%',
                            justifyContent: 'center', alignItems: 'center',
                            margin: 10,
                        }}>
                            <View style={{ padding: 12, backgroundColor: colors.default, }}>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(false)
                                    navigation.replace('VerifyPhone')
                                }}
                                >
                                    <Text style={{ ...fonts.type1, fontSize: 18, color: '#fff' }}>
                                        Verify Phone Number
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

            </Modal>


        </SafeAreaView >

    )
}

//////////////////////////////////////
//
//         CAROUSEL AUTO PLAY
//
/////////////////////////////////////

const CarouselAutoPlay = (props) => {
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flex: 1, width: '100%', paddingHorizontal: '3%', paddingTop: 10 }} onPress={() => alert(item.title)}>
                <ImageBackground style={{ width: '100%', height: '100%', flexDirection: 'row' }} imageStyle={{ borderRadius: 14 }} source={require('../../../assets/images/bg_linear1.png')} >
                    <View style={{ width: '60%', paddingLeft: 20, paddingTop: 4 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>
                            {item.title}
                        </Text>
                        <Text style={{ color: '#fff' }}>
                            {item.des}
                        </Text>
                        <Text style={{ ...fonts.type1, fontSize: 40, color: colors.default }}>
                            {item.des2}
                        </Text>
                    </View>
                    <View style={{ width: '40%', justifyContent: 'flex-start', height: '90%' }}>
                        <Image source={require('../../../assets/images/promo1.png')} style={{ width: '100%', height: '80%' }} resizeMode={'contain'} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '10%' }}>
                            <FontAwesome5Icon name={'chevron-right'} size={14} color="#fff" />
                            <Text style={{ color: '#fff' }}>
                                {"  "} SUPPER FRIDAY
                            </Text>
                        </View>

                    </View>
                </ImageBackground>

            </TouchableOpacity>
        );
    }
    return (<Carousel
        autoplay
        loopClonesPerSide={10}
        loop={true}
        ref={props.reff}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        data={props.data}
        renderItem={_renderItem}
    />)

}


export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    containerMap: {
        height: windowHeight - windowHeight / 7,
        width: windowWidth,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    searchBox: {
        position: 'absolute',
        marginTop: 10,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '94%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        alignItems: 'center'
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 220,
        width: windowWidth * 0.8,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
})
