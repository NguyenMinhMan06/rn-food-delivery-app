
import { call, put } from 'redux-saga/effects';
import * as ActionTypes from '../action/actionType';
import * as Firestore from '../middleware/Firestore';

export function* getLocList() {
    try {
        const response = yield call(Firestore.firestoreBranch.getLocationList);
        yield put({ type: ActionTypes.GET_LOCATION_LIST_SUCCESS, response })
    } catch (error) {
        console.log('itemSaga loc', error)
        yield put({ type: ActionTypes.GET_LOCATION_LIST_ERROR, error })
    }
}