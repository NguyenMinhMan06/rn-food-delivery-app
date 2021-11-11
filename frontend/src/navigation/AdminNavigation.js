import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminHome from '../screens/Admin/AdminHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../assets/style';
import Product from '../screens/Admin/ProductManager/Product';
import AddProduct from '../screens/Admin/ProductManager/AddProduct';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
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
              <FontAwesome5Icon name={"home"} style={{ color: focused ? colors.default : '#748c94' }} size={25} />


              <Text style={{
                color: focused ? colors.default : '#748c94',
                fontSize: 12,
              }}>
                Admin
              </Text>
            </View>
          )
        }}
        component={AdminHome}
      />
    </Tab.Navigator>
  )
}

export default function AdminNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminHome" component={TabsScreen}
        options={{ title: "Admin Manager", headerBackTitle: "" }}
      />
      <Stack.Screen name="Product" component={Product}
        options={{ title: "Product Manager", headerBackTitle: "" }}
      />
      <Stack.Screen name="AddProduct" component={AddProduct}
        options={{ title: "Add Product", headerBackTitle: "" }}
      />
    </Stack.Navigator>
  )
}


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
