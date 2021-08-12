import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './navigation/HomeNavigation';
import RootStackScreen from './navigation/RootStackNavigation';
import AuthContextProvider, { AuthContext } from './components/context';
import loginReducer from './redux/reducers/loginReducer';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthenNavigation from './navigation/AuthenNavigation';



export default function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
  // const initialState = {
  //   isLoading: true,
  //   userName: null,
  //   userToken: null,
  // }


  // const [loginState, dispatch] = useReducer(loginReducer, initialState)

  // const authContext = useMemo(() => ({
  //   SignIn: async (userName, password) => {
  //     // setUserToken('sdlfnaskdf');
  //     // setIsLoading(false)
  //     let userToken;
  //     userToken = null;
  //     if (userName == 'user' && password == 'pass') {
  //       try {
  //         userToken = 'adsfhas'
  //         await AsyncStorage.setItem('userToken', userToken)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //     dispatch({ type: 'LOGIN', id: userName, token: userToken })
  //   },
  //   SignOut: async () => {
  //     try {
  //       await AsyncStorage.removeItem('userToken')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     dispatch({ type: 'LOGOUT' })
  //   },
  //   SignUp: () => {
  //     setUserToken('sdlfnaskdf');
  //     setIsLoading(false)
  //   }
  // }))

  // useEffect(() => {
  //   setTimeout(async () => {
  //     // setIsLoading(false)
  //     let userToken = null;
  //     try {
  //       userToken = await AsyncStorage.getItem('userToken')
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
  //   }, 1000);
  // }, []);

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
  //       <ActivityIndicator size="large" color="grey" />
  //     </View>
  //   );
  // }

  return (
    <AuthContextProvider>
      <NavigationContainer>
      {/* { loginState.userToken !== null ? <HomeNavigation /> : <RootStackScreen /> } */}
        <AuthenNavigation />
      </NavigationContainer>
    </AuthContextProvider>

  )
}
