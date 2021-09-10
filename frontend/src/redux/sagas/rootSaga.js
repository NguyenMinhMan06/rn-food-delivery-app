import {all, takeLatest, takeEvery} from 'redux-saga/effects';
import * as ActionTypes from '../action/actionType'
import * as UserSaga from '../sagas/userSaga'

 export default function* rootSaga() {
    yield all([
        yield takeLatest(ActionTypes.LOGIN, UserSaga.loginWithEmail)
    ])

    yield all([
        yield takeLatest(ActionTypes.REGISTER, UserSaga.registerWithEmail)
    ])

    
    yield all([
        yield takeLatest(ActionTypes.LOGOUT, UserSaga.LogOutEmail)
    ])

    yield all([
        yield takeLatest(ActionTypes.GET_USER, UserSaga.getUser)
    ])
}
