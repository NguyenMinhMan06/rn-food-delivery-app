import firebase from '@react-native-firebase/auth'
import { select, call, put, take } from 'redux-saga/effects'
import * as ActionTypes from '../action/actionType'
import * as Firebase from '../middleware/Firebase'
import * as Firestore from '../middleware/Firestore'



export function* loginWithEmail(action) {
  try {
    const response = yield call(Firebase.User.loginWithEmail, action);
    console.log('User Saga Response', JSON.stringify(response))
    yield put({ type: ActionTypes.LOGIN_SUCCESS, response })
  } catch (error) {
    console.log('UserSaga', error)
    yield put({ type: ActionTypes.LOGIN_FAIL, error })
  }
}

export function* registerWithEmail(action) {
  try {
    const response = yield call(Firebase.User.registerWithEmail, action);
    console.log('User Saga Response', JSON.stringify(response))
    yield put({ type: ActionTypes.REGISTER_SUCCESS, response })
  } catch (error) {
    console.log('UserSaga', error)
    yield put({ type: ActionTypes.REGISTER_FAIL, error })
  }
}

export function* LogOutEmail() {
  try {
    const response = yield call(Firebase.User.logOutEmail);
    console.log('saga logout')
    yield put({ type: ActionTypes.LOGOUT_SUCCESS })
  } catch (error) {
    console.log('UserSaga', error)
  }
}

export function* getUser(action) {
  try {
    const response = yield call(Firestore.getFirestoreUser, action);
    yield put({ type: ActionTypes.GET_USER_SUCCESS, response })
  } catch (error) {
    console.log('UserSaga', error)
    yield put({ type: ActionTypes.GET_USER_FAIL, error })
  }
}

export function* addUserLocation(action) {
  try {
    const response = yield call(Firestore.firestoreUser.addLocation, action);
    yield put({ type: ActionTypes.ADD_LOCATION_SUCCESS, response })
  } catch (error) {
    console.log('UserSaga', error)
    yield put({ type: ActionTypes.GET_USER_FAIL, error })
  }
}

export function* addUserPhone(action) {
  try {
    const response = yield call(Firestore.firestoreUser.addPhone, action);
    yield put({ type: ActionTypes.ADD_USERPHONE_SUCCESS, response })
  } catch (error) {
    console.log('UserSaga', error)
    yield put({ type: ActionTypes.GET_USER_FAIL, error })
  }
}

