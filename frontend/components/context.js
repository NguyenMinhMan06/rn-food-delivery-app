import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useMemo, useReducer } from 'react';
import loginReducer from '../redux/reducers/loginReducer';


export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {

  const initialState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }
  // console.log('im running in authcontext')

  const [loginState, dispatch] = useReducer(loginReducer, initialState)
  const signIn = async (userName, password) => {
    // setUserToken('sdlfnaskdf');
    // setIsLoading(false)
    let userToken;
    userToken = null;
    if (userName == 'user' && password == 'pass') {
      try {
        userToken = 'adsfhas'
        await AsyncStorage.setItem('userToken', userToken)
      } catch (error) {
        console.log(error)
      }
    }
    dispatch({ type: 'LOGIN', id: userName, token: userToken })
  }


  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
    } catch (error) {
      console.log(error)
    }
    dispatch({ type: 'LOGOUT' })
  }

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

  const authContextData = {
    signIn,
    signOut,
    loginState,
    dispatch,
  }

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider

