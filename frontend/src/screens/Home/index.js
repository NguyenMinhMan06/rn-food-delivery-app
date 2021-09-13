import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../navigation/AuthProvider'
import { getUserAction, logOutAction } from '../../redux/action'
import auth from '@react-native-firebase/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { fonts } from '../../../assets/style'


const Home = ({ navigation }) => {
    // const homeState = useSelector(state => state ? state.login.response ? state.login.response : state.register.response : null)
    const homeState = useSelector(state => state.user.response)
    console.log('my state user', homeState)
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    const logOutHandler = () => {
        const action = logOutAction()
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
                width: '96%',
                flex: 1,
            }}>
                <Text style={fonts.type1}>Delivery to:</Text>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center'

                }}>
                    <FontAwesome5Icon style={{ paddingRight: '2%' }} name={'map-marker-alt'} size={16} color={'#e32f45'} />
                    <Text style={{ width: '90%', ...fonts.type1 }} numberOfLines={1}>394, KP.Đông Tân, thị xã Dĩ An, huyện Dĩ An, TP.Dĩ An, tỉnh Bình Dương</Text>
                    <Image style={{ width: 24, height: 24, }} resizeMode={'contain'} source={require('../../../assets/icons/icon_forward.png')} />
                </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', flex: 12, backgroundColor: 'cyan' }}>
                <Text>Welcome {homeState._data.name ? homeState._data.name : homeState._data.email}</Text>
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

            </View>


        </SafeAreaView>

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
