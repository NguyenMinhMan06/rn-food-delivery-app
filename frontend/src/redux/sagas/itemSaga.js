import * as Firestore from '../middleware/Firestore'
import { select, call, put, take } from 'redux-saga/effects'
import * as ActionTypes from '../action/actionType'



export function* getItem() {
  try {
    const response = yield call(Firestore.foodItem.getFoodItem);
    yield put({ type: ActionTypes.GET_ITEM_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga get', error)
    yield put({ type: ActionTypes.GET_ITEM_FAIL, error })
  }
}

export function* addItem(action) {
  try {
    const response = yield call(Firestore.foodItem.addFoodItem, action);
    yield put({ type: ActionTypes.ADD_ITEM_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga add', error)
    yield put({ type: ActionTypes.GET_ITEM_FAIL, error })
  }
}


export function* getItemCat() {
  try {
    const response = yield call(Firestore.foodItem.getFoodCat);
    yield put({ type: ActionTypes.GET_ITEM_CAT_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga catget', error)
    yield put({ type: ActionTypes.GET_ITEM_CAT_FAIL, error })
  }
}

export function* getItemFav(action) {
  try {
    const response = yield call(Firestore.favoriteItem.getFavItem, action);
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga favget', error)
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_FAIL, error })
  }
}

export function* addItemFav(action) {
  try {
    const response = yield call(Firestore.favoriteItem.addFavItem, action);
    yield put({ type: ActionTypes.ADD_ITEM_FAVORITE_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga addfav', error)
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_FAIL, error })
  }
}

export function* removeItemFav(action) {
  try {
    const response = yield call(Firestore.favoriteItem.removeFavItem, action);
    yield put({ type: ActionTypes.REMOVE_ITEM_FAVORITE_SUCCESS, response })
  } catch (error) {
    console.log('itemSaga rmvfav', error)
    yield put({ type: ActionTypes.GET_ITEM_FAVORITE_FAIL, error })
  }
}