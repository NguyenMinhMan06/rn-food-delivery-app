import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'


import rootSaga from './sagas/rootSaga'
import allReducers from './reducers/index'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(allReducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
export default store;