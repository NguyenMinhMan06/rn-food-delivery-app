import * as Firestore from '../middleware/Firestore'
import { select, call, put, take } from 'redux-saga/effects'
import * as ActionTypes from '../action/actionType'



export function* getItem() {
  try {
    // In ra các data được dispatch qua action
    // const state = yield select()
    // console.log('UserSaga state-- ', state)
    // In ra các data đang có trong store
    const response = yield call(Firestore.foodItem.getFoodItem);
    yield put({ type: ActionTypes.GET_ITEM_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga', error)
    yield put({ type: ActionTypes.GET_ITEM_FAIL, error })
  }
}

export function* getItemCat() {
  try {
    // In ra các data được dispatch qua action
    // const state = yield select()
    // console.log('UserSaga state-- ', state)
    // In ra các data đang có trong store
    const response = yield call(Firestore.foodItem.getFoodCat);
    yield put({ type: ActionTypes.GET_ITEM_CAT_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga', error)
    yield put({ type: ActionTypes.GET_ITEM_CAT_FAIL, error })
  }
}

export function* getItemFav(action) {
  try {
    // In ra các data được dispatch qua action
    // const state = yield select()
    // console.log('UserSaga state-- ', state)
    // In ra các data đang có trong store
    const response = yield call(Firestore.favoriteItem.getFavItem, action);
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga', error)
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_FAIL, error })
  }
}

export function* addItemFav(action) {
  try {
    // In ra các data được dispatch qua action
    // const state = yield select()
    // console.log('UserSaga state-- ', state)
    // In ra các data đang có trong store
    const response = yield call(Firestore.favoriteItem.addFavItem, action);
    yield put({ type: ActionTypes.ADD_ITEM_FAVORITE_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga', error)
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_FAIL, error })
  }
} 

export function* removeItemFav(action) {
  try {
    // In ra các data được dispatch qua action
    // const state = yield select()
    // console.log('UserSaga state-- ', state)
    // In ra các data đang có trong store
    const response = yield call(Firestore.favoriteItem.removeFavItem, action);
    yield put({ type: ActionTypes.REMOVE_ITEM_FAVORITE_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga', error)
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_FAIL, error })
  }
} 