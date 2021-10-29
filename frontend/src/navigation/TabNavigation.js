import React from 'react';

import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Favorites from '../screens/Favorites';
import Discover from '../screens/Discover';
import FA5 from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../../assets/style';
import FoodDetail from '../screens/FoodDetail';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Delivery from '../screens/Home/Delivery';
import TopTab from '../components/TopTab';
import Address from '../screens/Address'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const TopTabStack = createStackNavigator()
const MaterialTab = createMaterialTopTabNavigator();

const TopTabMaterial = ({ navigation }) => {
    return (
        <MaterialTab.Navigator
            swipeEnabled={false}
            tabBar={props =>
                <View style={{ width: '100%', height: '6%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TopTab {...props} />
                </View>
            }
        >
            <MaterialTab.Screen name="Delivery" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Text>
                            HELLO WORLD
                        </Text>
                    )
                }}

            />
            <MaterialTab.Screen name="Pick-up" component={Delivery}
            />
        </MaterialTab.Navigator>
    )
}

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 45,
            height: 45,
            borderRadius: 35,
            backgroundColor: colors.default
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const TabsScreen = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            keyboardHidesTabBar: true,
            style: {
                // position: 'absolute',
                // bottom: 25,
                // left: 20,
                // right: 20,
                elevation: 0,
                backgroundColor: "#FFFFFF",
                // borderRadius: 15,
                // height: 60,
                ...styles.shadow
            }
        }} >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                            {/* <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}> */}
                            {/* <Image source={require('../../assets/icons/pin.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? colors.default : '#748c94'
                                }}
                            /> */}
                            <FA5 name={"home"} style={{ color: focused ? colors.default : '#748c94' }} size={25} />


                            <Text style={{
                                color: focused ? colors.default : '#748c94',
                                fontSize: 12,
                            }}>
                                HOME
                            </Text>
                        </View>
                    )
                }}
                component={Home}
            />
            <Tab.Screen name="Discover" component={Discover}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}> */}
                            <Image source={require('../../assets/icons/search.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? colors.default : '#748c94'
                                }}
                            />
                            <Text style={{
                                color: focused ? colors.default : '#748c94',
                                fontSize: 12,
                            }}>
                                DISCOVER
                            </Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen name="Cart" component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/icons/shopping-basket.png')}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: '#FFF'
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    )
                }}
            />
            <Tab.Screen name="Favorite" component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}> */}
                            <Image source={require('../../assets/icons/like.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? colors.default : '#748c94'
                                }}
                            />
                            <Text style={{
                                color: focused ? colors.default : '#748c94',
                                fontSize: 12,
                            }}>
                                FAVORITES
                            </Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="ProfileTab" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}> */}
                            <Image source={require('../../assets/icons/user.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? colors.default : '#748c94'
                                }}
                            />
                            <Text style={{
                                color: focused ? colors.default : '#748c94',
                                fontSize: 12,
                            }}>
                                PROFILE
                            </Text>
                        </View>
                    )
                }}
            />


        </Tab.Navigator>
    )
}



const StackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName={'Main'} >
            <Stack.Screen name="Main" component={TabsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FoodDetail" component={FoodDetail} options={{ headerShown: false }} />
            <Stack.Screen name="Address" component={Address} />
        </Stack.Navigator>
    )
}
export default StackScreen;




const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    }
})
