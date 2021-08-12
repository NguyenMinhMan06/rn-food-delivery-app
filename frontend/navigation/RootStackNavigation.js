import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Resgiter';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SignInScreen" component={Login}/>
        <RootStack.Screen name="SignUpScreen" component={Register}/>
    </RootStack.Navigator>
);

export default RootStackScreen;