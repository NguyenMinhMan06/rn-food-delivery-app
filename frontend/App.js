import React from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Routes from './src/navigation/Routes';
import store from './src/redux/store';

LogBox.ignoreLogs(['Reanimated 2']);



export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}
