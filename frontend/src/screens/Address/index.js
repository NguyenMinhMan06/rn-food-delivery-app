import React, { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { colors, fonts } from '../../../assets/style';
import { addLocationUserAction } from '../../redux/action';

const Address = ({ navigation, route }) => {
    console.log(route.params)
    const [region, setRegion] = useState(route.params.pin)
    const [granted, setGranted] = useState(route.params.granted)
    const dispatch = useDispatch()

    async function locationPermission() {
        try {
            console.log('take location permit')
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log("You can use the location")
                Geolocation.getCurrentPosition((pos) => {
                    console.log('pos:              ', pos.coords)
                    setGranted(true)
                    setRegion({
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
    const ref = useRef();

    const onPressUpdateLocation = () => {
        const action = addLocationUserAction(data)
        dispatch(action)
    }

    useEffect(() => {
        ref.current?.setAddressText('Some Text');
    }, []);


    useEffect(() => {
        if (route.params?.pin == null) locationPermission()
        else setRegion(route.params.pin)
    }, [])
    if (!granted) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...fonts.type1, paddingBottom: 10, }}>
                Please grant us permission to use your location
            </Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: colors.default, }} onPress={() => { locationPermission() }}>
                <Text style={{ ...fonts.type1, color: '#fff', fontSize: 18, }}>
                    Press here to give us permission
                </Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, width: '100%', padding: '3%', height: 400, }}>
                <GooglePlacesAutocomplete
                    ref={ref}
                    placeholder='Search'
                    fetchDetails={true}
                    onFail={error => console.error(error)}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance'
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log('item', data)
                        setRegion({
                            ...region,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        })
                    }}
                    query={{
                        key: 'AIzaSyC2ZpQKR3DYiAYB8FOcoQrJi-5cf727rbQ',
                        language: 'en',
                        components: 'country:vn',
                        type: 'establishment',
                    }}
                />
            </View>
            <View style={{ width: '100%', padding: '3%' }}>
                {/* <Text>
                    Your location {region.latitude}   {"  "}  {region.longitude}
                </Text> */}
                <View style={{ padding: 10, backgroundColor: colors.default, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        onPressUpdateLocation()
                    }}>
                        <Text style={{ color: '#fff' }}>
                            Save location
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}

export default Address

const styles = StyleSheet.create({})
