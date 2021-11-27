import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { colors, fonts } from '../../../assets/style'
import { windowHeight, windowWidth } from '../../../utils/Dimentions'
import { getItemAction, getItemCatAction, getLocationListAction, logOutAction } from '../../redux/action'

const AdminHome = ({ navigation }) => {

    const homeState = useSelector(state => state.user)
    // const itemState = useSelector(state => state.item)

    const dispatch = useDispatch()
    // console.log(itemState)

    useEffect(() => {
        const action1 = getItemAction()
        const action2 = getItemCatAction()
        const action3 = getLocationListAction()
        dispatch(action3)
        dispatch(action1)
        dispatch(action2)
    }, [])

    if (homeState.isLoading) {
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
                                    Getting data please wait...
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
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                homeState.response.role == 'admin' ?
                    <View style={{ padding: 10, width: 200 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Branch') }}>
                            <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                                Branch management
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }
            {homeState.response.role == 'admin' ?
                <View style={{ padding: 10, width: 200 }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('AddBranch') }}>
                        <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                            Add branch
                        </Text>
                    </TouchableOpacity>
                </View>
                : null
            }

            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Product') }}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Product management
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('AddProduct')}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Add item product
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Category') }}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Category management
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, width: 200 }}>
                <TouchableOpacity onPress={() => { navigation.navigate('AddCategory') }}>
                    <Text style={{ ...fonts.type1, color: '#fff', padding: 10, backgroundColor: colors.default, textAlign: 'center' }}>
                        Add category
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AdminHome

const styles = StyleSheet.create({})
