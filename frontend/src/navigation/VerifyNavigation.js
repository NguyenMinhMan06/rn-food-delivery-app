import 'react-native-gesture-handler';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import InputPhone from '../screens/PhoneVerify/InputPhone';
import InputOTP from '../screens/PhoneVerify/InputOTP';


const Stack = createStackNavigator()
export default function VerifyNavigation(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VerifyPhone" component={InputPhone}
        options={{ title: "Verify Phone Number", headerBackTitle: "" }}
      />
      <Stack.Screen name="InputOTP" component={InputOTP}
        options={{ title: "Input OTP", headerBackTitle: "" }}
      />
    </Stack.Navigator>
  )
}
