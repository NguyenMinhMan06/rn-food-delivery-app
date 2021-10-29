import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import RootStackScreen from './src/navigation/RootStackNavigation';

import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);



export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
