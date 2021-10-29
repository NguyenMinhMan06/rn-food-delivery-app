import React, { useEffect, useState } from 'react'
import { PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';

const resLocation = [

    {
        "name": "Independence Palace",
        "address": "135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Hồ Chí Minh 700000",
        "coords": {
            "latitude": 10.7747201,
            "longitude": 106.69930120000004
        },
        "image_url": "https://media.glassdoor.com/l/de/cd/ae/b6/the-face-shop.jpg"
    },
    {
        "name": "Turtle Lake",
        "address": "Turtle Lake, phường 6, District 3, Ho Chi Minh City",
        "coords": {
            "latitude": 10.780060,
            "longitude": 106.693410
        },
        "image_url": "http://dreamercosmetic.com/uploads/source/chekd101/trangdiem/bomyphamchanel5moncaocap11600x450.jpg"
    },
    {
        "name": "Landmark 81",
        "address": "208 Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, Hồ Chí Minh 700000",
        "coords": {
            "latitude": 10.7951612,
            "longitude": 106.7195944
        },
        "image_url": "https://www.vinpearl.com/landmark81/wp-content/uploads/sites/39/2018/09/VP-Luxury-Landmark-81-22-bot.jpg"
    },
]


const Delivery = ({ navigation }) => {
    const [pin, setPin] = useState({
        latitude: null,
        longitude: null,
    })
    const [location, setLocation] = useState(resLocation)
    const handleLocation = () => {
        Geolocation.getCurrentPosition((pos) => {
            setPin({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            })
            console.log('pos:', pos)
        }, (error) => {
            console.log('err: ', error)
        })
    }
    useEffect(() => {

        async function locationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    alert("You can use the location")
                    handleLocation()
                }
                else {
                    alert("Location permission denied")
                }
            }
            catch (err) {
                console.warn(err)
            }
        }
        locationPermission()
    })
    return (
        <View style={styles.container}>
            {pin.latitude && pin.longitude &&
                <MapView
                    showsUserLocation
                    style={styles.map}
                    initialRegion={{
                        latitude: pin.latitude,
                        longitude: pin.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                >
                </MapView>
            }
        </View>
    )
}

export default Delivery

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

})
