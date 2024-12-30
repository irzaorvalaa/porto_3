import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import logger from 'redux-logger'

import reduxReducer from './App.reducers'
import reduxSaga from './App.sagas'
import reduxPersist from '../config/ReduxPersist'
import { isDevelopment, isLocal } from '../utilities/getEnvironment'

let finalReducers = reduxReducer

if (reduxPersist.active) {
  const persistConfig = reduxPersist.storeConfig
  finalReducers = persistReducer(persistConfig, reduxReducer)
}

const sagaMiddleware = createSagaMiddleware()

const Store = configureStore({
  reducer: finalReducers,
  devTools: isLocal() || isDevelopment(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .prepend(sagaMiddleware)
      .concat(...(isLocal() || isDevelopment() ? [logger] : [])),
})

sagaMiddleware.run(reduxSaga)

const Persistor = persistStore(Store)

export type AppDispatch = typeof Store.dispatch

export { Persistor, Store }
