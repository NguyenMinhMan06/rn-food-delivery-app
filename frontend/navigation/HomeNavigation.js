import 'react-native-gesture-handler';
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FoodDetail from '../screens/FoodDetail';
import Home from '../screens/Home';


const Drawer = createDrawerNavigator()
export default function HomeNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Food Detail" component={FoodDetail} />          
        </Drawer.Navigator>
    )
}
