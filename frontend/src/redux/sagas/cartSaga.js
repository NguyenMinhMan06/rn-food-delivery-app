import { call, put } from 'redux-saga/effects';
import * as ActionTypes from '../action/actionType';
import * as Firestore from '../middleware/Firestore';

export function* getItemCart(action) {
    try {
        const response = yield call(Firestore.firestoreCart.getCart, action);
        yield put({ type: ActionTypes.GET_ITEM_CART_SUCCESS, response })
    } catch (error) {
        console.log('itemcartSaga', error)
        yield put({ type: ActionTypes.GET_ITEM_CART_FAIL, error })
    }
}

export function* addItemCart(action) {
    try {
        const response = yield call(Firestore.firestoreCart.addCart, action);
        yield put({ type: ActionTypes.ADD_TO_CART_SUCCESS, response })
    } catch (error) {
        console.log('itemcartSaga', error)
        yield put({ type: ActionTypes.GET_ITEM_CART_FAIL, error })
    }
}

export function* removeItemCart(action) {
    try {
        const response = yield call(Firestore.firestoreCart.removeCart, action);
        yield put({ type: ActionTypes.REMOVE_FROM_CART_SUCCESS, response })
    } catch (error) {
        console.log('itemcartSaga', error)
        yield put({ type: ActionTypes.GET_ITEM_CART_FAIL, error })
    }
}