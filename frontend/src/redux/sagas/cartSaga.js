import * as Firestore from '../middleware/Firestore'
import { select, call, put, take } from 'redux-saga/effects'
import * as ActionTypes from '../action/actionType'

export function* getItemCart(action) {
    try {
        // In ra các data được dispatch qua action
        // const state = yield select()
        // console.log('UserSaga state-- ', state)
        // In ra các data đang có trong store
        const response = yield call(Firestore.firestoreCart.getCart, action);
        yield put({ type: ActionTypes.GET_ITEM_CART_SUCCESS, response })
    } catch (error) {
        console.log('itemcartSaga', error)
        yield put({ type: ActionTypes.GET_ITEM_CART_FAIL, error })
    }
}

export function* addItemCart(action) {
    try {
        // In ra các data được dispatch qua action
        // const state = yield select()
        // console.log('cart state-- ', state)
        // In ra các data đang có trong store
        const response = yield call(Firestore.firestoreCart.addCart, action);
        yield put({ type: ActionTypes.ADD_TO_CART_SUCCESS, response })
    } catch (error) {
        console.log('itemcartSaga', error)
        yield put({ type: ActionTypes.GET_ITEM_CART_FAIL, error })
    }
}

export function* removeItemCart(action) {
    try {
        // In ra các data được dispatch qua action
        // const state = yield select()
        // console.log('cart state-- ', state)
        // In ra các data đang có trong store
        const response = yield call(Firestore.firestoreCart.removeCart, action);
        yield put({ type: ActionTypes.REMOVE_FROM_CART_SUCCESS, response })
    } catch (error) {
        console.log('itemcartSaga', error)
        yield put({ type: ActionTypes.GET_ITEM_CART_FAIL, error })
    }
}