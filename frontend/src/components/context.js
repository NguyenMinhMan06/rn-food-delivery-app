// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useMemo, useReducer, useState } from 'react';
// import loginReducer from '../redux/reducers/loginReducer';
// import auth from '@react-native-firebase/auth';

// export const AuthContext = React.createContext();

// const AuthContextProvider = ({ children }) => {

//   const initialState = {
//     isLoading: true,
//     userEmail: null,
//     userToken: null,
//   }

//   const [user, setUser] = useState(null)
//   // console.log('im running in authcontext')

//   const [loginState, dispatch] = useReducer(loginReducer, initialState)
//   const signIn = async (userEmail, password) => {
//     // setUserToken('sdlfnaskdf');
//     // setIsLoading(false)

//     try {
//       await auth().signInWithEmailAndPassword(userEmail, password);
//     } catch (e) {
//       console.log(e);
//     }
//     // let userToken;
//     // userToken = null;
//     // if (userEmail == 'user' && password == 'pass') {
//     //   try {
//     //     userToken = 'adsfhas'
//     //     await AsyncStorage.setItem('userToken', userToken)
//     //   } catch (error) {
//     //     console.log(error)
//     //   }
//     // }
//     // dispatch({ type: 'LOGIN', id: userEmail, token: userToken })
//   }

//   const signUp = async (userEmail, password) => {
//     // setUserToken('sdlfnaskdf');
//     // setIsLoading(false)

//     try {
//       await auth().createUserWithEmailAndPassword(userEmail, password);
//     } catch (e) {
//       console.log(e);
//     }
//     // let userToken;
//     // userToken = null;
//     // if (userEmail == 'user' && password == 'pass') {
//     //   try {
//     //     userToken = 'adsfhas'
//     //     await AsyncStorage.setItem('userToken', userToken)
//     //   } catch (error) {
//     //     console.log(error)
//     //   }
//     // }
//     // dispatch({ type: 'LOGIN', id: userEmail, token: userToken })
//   }


//   const signOut = async () => {

//     try {
//       await auth().signOut();
//     } catch (e) {
//       console.error(e);
//     }

//     // try {
//     //   await AsyncStorage.removeItem('userToken')
//     // } catch (error) {
//     //   console.log(error)
//     // }
//     // dispatch({ type: 'LOGOUT' })
//   }
//   const authContextData = {
//     signIn,
//     signOut,
//     loginState,
//     dispatch,
//     user,
//     setUser,
//   }

//   return (
//     <AuthContext.Provider value={authContextData}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
// export default AuthContextProvider

