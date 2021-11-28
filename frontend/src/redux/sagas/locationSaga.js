
import * as Firestore from '../middleware/Firestore'
import { select, call, put, take } from 'redux-saga/effects'
import * as ActionTypes from '../action/actionType'

export function* getLocList() {
    try {
        // In ra các data được dispatch qua action
        const state = yield select()
        console.log('UserSaga state-- ', state)
        // In ra các data đang có trong store
        const response = yield call(Firestore.firestoreBranch.getLocationList);
        yield put({ type: ActionTypes.GET_LOCATION_LIST_SUCCESS, response })
    } catch (error) {
        console.log('itemSaga loc', error)
        yield put({ type: ActionTypes.GET_LOCATION_LIST_ERROR, error })
    }
}