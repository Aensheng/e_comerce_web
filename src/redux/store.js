import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-redux'
import rootsaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

export const store =  createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootsaga)


export const persistor = persistStore(store)

export default { store, persistor }