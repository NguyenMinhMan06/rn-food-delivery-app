import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminHome from '../screens/Admin/AdminHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from '../../assets/style';
import Product from '../screens/Admin/ProductManager/Product';
import AddProduct from '../screens/Admin/ProductManager/AddProduct';
import EditProduct from '../screens/Admin/ProductManager/EditProduct';
import Category from '../screens/Admin/CategoryManager/Category';
import AddCategory from '../screens/Admin/CategoryManager/AddCategory';
import EditCategory from '../screens/Admin/CategoryManager/EditCategory';
import ProfileAdmin from '../screens/Admin/ProfileAdmin/ProfileAdmin';
import AuthorizeManagement from '../screens/Admin/ProfileAdmin/AuthorizeManagement';
import AddAuthorize from '../screens/Admin/ProfileAdmin/AddAuthorize';
import ChangePassword from '../screens/Profile/ChangePassword';
import AddBranch from '../screens/Admin/BranchManagement/AddBranch';
import Branch from '../screens/Admin/BranchManagement/Branch';
import EditBranch from '../screens/Admin/BranchManagement/EditBranch';
import Order from '../screens/Admin/OrderManagement/Order';
import OrderInfo from '../screens/Admin/OrderManagement/OrderInfo';


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
                Home
              </Text>
            </View>
          )
        }}
        component={AdminHome}
      />
      <Tab.Screen
        name="Admin"
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
                Admin
              </Text>
            </View>
          )
        }}
        component={ProfileAdmin}
      />
    </Tab.Navigator>
  )
}

export default function AdminNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminHome" component={TabsScreen}
        options={{ title: "Manager", headerBackTitle: "" }}
      />
      <Stack.Screen name="Product" component={Product}
        options={{ title: "Product Manager", headerBackTitle: "" }}
      />
      <Stack.Screen name="AddProduct" component={AddProduct}
        options={{ title: "Add Product", headerBackTitle: "" }}
      />
      <Stack.Screen name="EditProduct" component={EditProduct}
        options={{ title: "Edit Product", headerBackTitle: "" }}
      />
      <Stack.Screen name="Category" component={Category}
        options={{ title: "Category Manager", headerBackTitle: "" }}
      />
      <Stack.Screen name="AddCategory" component={AddCategory}
        options={{ title: "Add Category", headerBackTitle: "" }}
      />
      <Stack.Screen name="EditCategory" component={EditCategory}
        options={{ title: "Edit Category", headerBackTitle: "" }}
      />
      <Stack.Screen name="AuthManagement" component={AuthorizeManagement}
        options={{ title: "Authorize Management", headerBackTitle: "" }}
      />
      <Stack.Screen name="AddAuthorize" component={AddAuthorize}
        options={{ title: "Update Authorize", headerBackTitle: "" }}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword}
        options={{ title: "Change Password", headerBackTitle: "" }}
      />
      <Stack.Screen name="AddBranch" component={AddBranch}
        options={{ title: "Add Branch", headerBackTitle: "" }}
      />
      <Stack.Screen name="Branch" component={Branch}
        options={{ title: "Branch Management", headerBackTitle: "" }}
      />
      <Stack.Screen name="EditBranch" component={EditBranch}
        options={{ title: "Edit Branch", headerBackTitle: "" }}
      />
      <Stack.Screen name="Order" component={Order}
        options={{ title: "Order Management", headerBackTitle: "" }}
      />
      <Stack.Screen name="OrderInfo" component={OrderInfo}
        options={{ title: "Order Information", headerBackTitle: "" }}
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
