import { AnyAction, Reducer } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { RootState } from '../bootstrap/App.reducers'
import { AUTH_LOGOUT } from '../constants/AuthAction'

const hookReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === AUTH_LOGOUT) {
    storage.removeItem('persist:root')

    state = {} as RootState
  }

  return { state, action }
}

export default hookReducer
