import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Favorites from '../screens/Favorites';
import Discover from '../screens/Discover';
import FA5 from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -25,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const TabsScreen = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            style: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: "#FFFFFF",
                borderRadius: 15,
                height: 80,
                ...styles.shadow
            }
        }} >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            {/* <Image source={require('../../assets/icons/pin.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            /> */}
                            <FA5 name={"home"} style={{ color: focused ? '#e32f45' : '#748c94' }} size={25} />


                            <Text style={{
                                color: focused ? '#e32f45' : '#748c94',
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
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image source={require('../../assets/icons/search.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{
                                color: focused ? '#e32f45' : '#748c94',
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
                                height: 30,
                                width: 30,
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
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image source={require('../../assets/icons/like.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{
                                color: focused ? '#e32f45' : '#748c94',
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
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Image source={require('../../assets/icons/user.png')}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{
                                color: focused ? '#e32f45' : '#748c94',
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

export default TabsScreen;

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
