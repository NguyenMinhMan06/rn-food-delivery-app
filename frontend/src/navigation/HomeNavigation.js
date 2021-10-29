import 'react-native-gesture-handler';
import React from 'react'
import FoodDetail from '../screens/FoodDetail';
import Home from '../screens/Home';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator
export default function HomeNavigation() {
  return (
    <Stack.Navigator tabBarOptions={{
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
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Food Detail" component={FoodDetail} />
    </Stack.Navigator>
  )
}
