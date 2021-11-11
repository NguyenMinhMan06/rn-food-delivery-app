import { all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from '../action/actionType'
import * as UserSaga from '../sagas/userSaga'
import * as itemSaga from '../sagas/itemSaga'
import * as cartSaga from '../sagas/cartSaga'


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

    yield all([
        yield takeLatest(ActionTypes.GET_ITEM, itemSaga.getItem)
    ])

    yield all([
        yield takeLatest(ActionTypes.GET_ITEM_CAT, itemSaga.getItemCat)
    ])

    yield all([
        yield takeLatest(ActionTypes.GET_ITEM_FAVORITE, itemSaga.getItemFav)
    ])

    yield all([
        yield takeLatest(ActionTypes.ADD_ITEM_FAVORITE, itemSaga.addItemFav)
    ])

    yield all([
        yield takeLatest(ActionTypes.REMOVE_ITEM_FAVORITE, itemSaga.removeItemFav)
    ])

    yield all([
        yield takeLatest(ActionTypes.ADD_LOCATION, UserSaga.addUserLocation)
    ])

    yield all([
        yield takeLatest(ActionTypes.GET_ITEM_CART, cartSaga.getItemCart)
    ])

    yield all([
        yield takeLatest(ActionTypes.ADD_TO_CART, cartSaga.addItemCart)
    ])

    yield all([
        yield takeLatest(ActionTypes.REMOVE_FROM_CART, cartSaga.removeItemCart)
    ])

    yield all([
        yield takeLatest(ActionTypes.ADD_USERPHONE, UserSaga.addUserPhone)
    ])

}
