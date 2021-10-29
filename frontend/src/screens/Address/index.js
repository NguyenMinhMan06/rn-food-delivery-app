import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from 'react-native-geolocation-service';
import { colors, fonts } from '../../../assets/style';

const Address = ({ navigation, route }) => {
    console.log(route.params)
    const [region, setRegion] = useState(route.params.pin)
    const [granted, setGranted] = useState(route.params.granted)

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

    useEffect(() => {
        if (route.params.pin.latitude == null) locationPermission()
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
            <View style={{ flex: 1, }}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance'
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        console.log('dataaaaaaaaaaaa:      ', data)
                        setRegion({
                            ...region,
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng
                        })
                    }}
                    query={{
                        key: 'AIzaSyDqKrIUwkzhnJ9HZuIp9mxYP_pBD1XQTH8',
                        language: 'en',
                        components: 'country:vn',
                        type: 'establishment',
                    }}
                />
            </View>
            <View style={{ flex: 1, }}>
                <Text>
                    Your current location:
                </Text>
            </View>

        </View>
    )
}

export default Address

const styles = StyleSheet.create({})
